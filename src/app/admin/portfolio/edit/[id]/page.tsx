
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, serverTimestamp, collection, getDocs } from "firebase/firestore";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { generateSlug } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash } from "lucide-react";

const featureSchema = z.object({
  icon: z.string().min(1, "Icon name is required."),
  title: z.string().min(2, "Feature title is required."),
  description: z.string().min(10, "Feature description is required."),
});

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  slug: z.string().min(2, "Slug must be at least 2 characters.").refine(s => !s.includes(' '), "Slug cannot contain spaces."),
  summary: z.string().min(10, "Summary must be at least 10 characters.").max(200, "Summary must be less than 200 characters."),
  content: z.string().min(20, "Content (Project Overview) must be at least 20 characters."),
  imageUrl: z.string().optional(),
  serviceId: z.string().optional(),
  displayOrder: z.coerce.number().optional(),
  isPublished: z.boolean().default(true),
  clientName: z.string().optional(),
  clientWebsite: z.string().url().optional().or(z.literal('')),
  timeline: z.string().optional(),
  demoUrl: z.string().url().optional().or(z.literal('')),
  challenges: z.string().optional(),
  solution: z.string().optional(),
  impact: z.string().optional(),
  features: z.array(featureSchema).optional(),
  chartData: z.string().optional().refine(val => {
    if (!val) return true;
    try {
        JSON.parse(val);
        return true;
    } catch (e) {
        return false;
    }
  }, { message: "Invalid JSON format for Chart Data." }),
});


export default function EditPortfolioProject() {
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [services, setServices] = useState<any[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      summary: "",
      content: "",
      imageUrl: "",
      serviceId: "",
      displayOrder: 0,
      isPublished: true,
      clientName: "",
      clientWebsite: "",
      timeline: "",
      demoUrl: "",
      challenges: "",
      solution: "",
      impact: "",
      features: [],
      chartData: "[]",
    },
  });
  
  const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({
    control: form.control,
    name: "features"
  });

  const titleValue = form.watch("title");
  useEffect(() => {
    if (titleValue) {
      const slug = generateSlug(titleValue);
      form.setValue("slug", slug, { shouldValidate: true });
    }
  }, [titleValue, form]);

  useEffect(() => {
    const fetchServices = async () => {
        const serviceSnapshot = await getDocs(collection(db, "Service"));
        setServices(serviceSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchServices();
  }, []);

  useEffect(() => {
    if (!id) return;
    const fetchProject = async () => {
      setLoading(true);
      const docRef = doc(db, "Project", id as string);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        form.reset({
          ...form.getValues(),
          ...data,
          chartData: data.chartData ? JSON.stringify(data.chartData, null, 2) : "[]",
        });
        setCurrentImageUrl(data.imageUrl);
      } else {
        toast({ title: "Error", description: "Project not found.", variant: "destructive" });
        router.push("/admin/portfolio");
      }
      setLoading(false);
    };
    fetchProject();
  }, [id, form, router, toast]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!id) return;
    setIsUploading(true);
    let imageUrl = values.imageUrl;

    if (featuredImageFile) {
      const formData = new FormData();
      formData.append('file', featuredImageFile);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Image upload failed');
        }

        const { path } = await response.json();
        imageUrl = path;
      } catch (error) {
        console.error("Image upload error: ", error);
        toast({ title: "Error", description: "Could not upload image.", variant: "destructive" });
        setIsUploading(false);
        return;
      }
    }

    try {
      const docRef = doc(db, "Project", id as string);
      await updateDoc(docRef, {
        ...values,
        imageUrl,
        chartData: values.chartData ? JSON.parse(values.chartData) : [],
        updatedAt: serverTimestamp(),
      });
      toast({
        title: "Project Updated!",
        description: "The project has been successfully updated.",
      });
      router.push('/admin/portfolio');
    } catch (e) {
      console.error("Error updating document: ", e);
      toast({
        title: "Error",
        description: "There was an error updating the project.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
        </CardHeader>
        <CardContent className="space-y-8">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-40 w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Edit Portfolio Project</CardTitle>
            <CardDescription>Update the details for this project.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., E-Governance Platform" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., e-governance-platform" {...field} />
                  </FormControl>
                  <FormDescription>A unique, URL-friendly identifier. Auto-generated from title.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Featured Image</FormLabel>
              {currentImageUrl && (
                <div className="my-4">
                  <Image src={currentImageUrl} alt="Current featured image" width={200} height={100} className="rounded-md object-cover" />
                </div>
              )}
              <FormControl>
                <Input 
                  type="file" 
                  onChange={(e) => setFeaturedImageFile(e.target.files?.[0] || null)}
                  accept="image/*"
                />
              </FormControl>
              <FormDescription>Upload a new image to replace the current one.</FormDescription>
              <FormMessage />
            </FormItem>

            <div className="grid md:grid-cols-2 gap-8">
                 <FormField
                  control={form.control}
                  name="serviceId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Related Service</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {services.map(service => (
                            <SelectItem key={service.id} value={service.id}>{service.title}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>Link this project to a service.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="displayOrder"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Order</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 1" {...field} />
                      </FormControl>
                      <FormDescription>Order on the homepage (lower numbers appear first).</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>

            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <Textarea placeholder="A short summary of the project..." rows={3} {...field} />
                  </FormControl>
                  <FormDescription>This appears on the portfolio listing page. Max 200 characters.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Overview</FormLabel>
                  <FormControl>
                    <Textarea placeholder="The full content for the project. HTML is supported." rows={10} {...field} />
                  </FormControl>
                  <FormDescription>You can use HTML tags for formatting.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Case Study Details</CardTitle>
                <CardDescription>Fill out the details for the portfolio detail page.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                    <FormField control={form.control} name="clientName" render={({ field }) => (<FormItem><FormLabel>Client Name</FormLabel><FormControl><Input placeholder="e.g., Ministry of Health" {...field} value={field.value || ''} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="timeline" render={({ field }) => (<FormItem><FormLabel>Timeline</FormLabel><FormControl><Input placeholder="e.g., 6 Months" {...field} value={field.value || ''} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="clientWebsite" render={({ field }) => (<FormItem><FormLabel>Client Website</FormLabel><FormControl><Input placeholder="https://example.com" {...field} value={field.value || ''} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="demoUrl" render={({ field }) => (<FormItem><FormLabel>Demo URL</FormLabel><FormControl><Input placeholder="https://demo.example.com" {...field} value={field.value || ''} /></FormControl><FormMessage /></FormItem>)} />
                </div>
                 <FormField control={form.control} name="challenges" render={({ field }) => (<FormItem><FormLabel>Challenges</FormLabel><FormControl><Textarea placeholder="Describe the challenges this project solved." rows={4} {...field} value={field.value || ''} /></FormControl><FormMessage /></FormItem>)} />
                 <FormField control={form.control} name="solution" render={({ field }) => (<FormItem><FormLabel>Solution</FormLabel><FormControl><Textarea placeholder="Describe the solution provided." rows={4} {...field} value={field.value || ''} /></FormControl><FormMessage /></FormItem>)} />
                 <FormField control={form.control} name="impact" render={({ field }) => (<FormItem><FormLabel>Impact</FormLabel><FormControl><Textarea placeholder="Describe the impact of the solution." rows={4} {...field} value={field.value || ''} /></FormControl><FormMessage /></FormItem>)} />
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Core Features</CardTitle>
                <CardDescription>Manage the core features or modules for this project.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {featureFields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-4 items-end border p-4 rounded-md">
                        <FormField control={form.control} name={`features.${index}.icon`} render={({ field }) => (<FormItem><FormLabel>Icon Name</FormLabel><FormControl><Input {...field} placeholder="e.g., 'Users'" /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name={`features.${index}.title`} render={({ field }) => (<FormItem><FormLabel>Feature Title</FormLabel><FormControl><Input {...field} placeholder="Feature Title" /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name={`features.${index}.description`} render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Input {...field} placeholder="Feature Description" /></FormControl><FormMessage /></FormItem>)} />
                        <Button type="button" variant="destructive" onClick={() => removeFeature(index)}>
                           <Trash className="mr-2 h-4 w-4" /> Remove
                        </Button>
                    </div>
                ))}
                <Button type="button" variant="outline" onClick={() => appendFeature({ icon: "", title: "", description: "" })}>
                    Add Feature
                </Button>
                 <FormDescription>Use icon names from <a href="https://lucide.dev/icons/" target="_blank" rel="noopener noreferrer" className="underline">lucide.dev</a> (e.g., 'Users', 'BarChart').</FormDescription>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Chart Data</CardTitle>
                <CardDescription>Provide data as a JSON array of objects. You can edit the sample below.</CardDescription>
            </CardHeader>
            <CardContent>
                 <FormField
                  control={form.control}
                  name="chartData"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data Points (JSON)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='[{"year": "2020", "Users": 1000}]'
                          rows={10}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </CardContent>
        </Card>

        <Button type="submit" size="lg" disabled={form.formState.isSubmitting || isUploading}>
          {isUploading ? "Uploading..." : form.formState.isSubmitting ? "Updating..." : "Update Project"}
        </Button>
      </form>
    </Form>
  );
}
