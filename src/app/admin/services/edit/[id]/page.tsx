
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
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash } from "lucide-react";
import { generateSlug } from "@/lib/utils";

const pointSchema = z.object({
  title: z.string().min(1, "Title cannot be empty."),
  description: z.string().min(1, "Description cannot be empty."),
});

const statSchema = z.object({
  name: z.string().min(1, "Name cannot be empty."),
  value: z.string().min(1, "Value cannot be empty."),
});

const faqSchema = z.object({
  question: z.string().min(1, "Question cannot be empty."),
  answer: z.string().min(1, "Answer cannot be empty."),
});

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  slug: z.string().min(2, "Slug must be at least 2 characters.").refine(s => !s.includes(' '), "Slug cannot contain spaces."),
  displayOrder: z.coerce.number().optional(),
  description: z.string().min(10, "Overview must be at least 10 characters.").max(200, "Overview must be less than 200 characters."),
  content: z.string().min(20, "Content must be at least 20 characters."),
  imageUrl: z.string().optional(),
  points: z.array(pointSchema).optional(),
  stats: z.array(statSchema).optional(),
  faqs: z.array(faqSchema).optional(),
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

export default function EditService() {
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      displayOrder: 0,
      description: "",
      content: "",
      imageUrl: "",
      points: [],
      stats: [],
      faqs: [],
      chartData: "[]"
    },
  });

  const { fields: pointFields, append: appendPoint, remove: removePoint } = useFieldArray({ control: form.control, name: "points" });
  const { fields: statFields, append: appendStat, remove: removeStat } = useFieldArray({ control: form.control, name: "stats" });
  const { fields: faqFields, append: appendFaq, remove: removeFaq } = useFieldArray({ control: form.control, name: "faqs" });

  const titleValue = form.watch("title");
  useEffect(() => {
    if (titleValue) {
      const slug = generateSlug(titleValue);
      form.setValue("slug", slug, { shouldValidate: true });
    }
  }, [titleValue, form]);


  useEffect(() => {
    if (!id) return;
    const fetchService = async () => {
      setLoading(true);
      const docRef = doc(db, "Service", id as string);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        form.reset({
          ...form.getValues(),
          ...data,
          chartData: data.chartData ? JSON.stringify(data.chartData, null, 2) : "[]",
          faqs: data.faqs || [],
        });
        setCurrentImageUrl(data.imageUrl);
      } else {
        toast({ title: "Error", description: "Service not found.", variant: "destructive" });
        router.push("/admin/services");
      }
      setLoading(false);
    };
    fetchService();
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
      const docRef = doc(db, "Service", id as string);
      await updateDoc(docRef, {
        ...values,
        imageUrl,
        template: "default",
        chartData: values.chartData ? JSON.parse(values.chartData) : [],
        updatedAt: serverTimestamp(),
      });
      toast({
        title: "Service Updated!",
        description: "The service has been successfully updated.",
      });
      router.push('/admin/services');
    } catch (e) {
      console.error("Error updating document: ", e);
      toast({
        title: "Error",
        description: "There was an error updating the service.",
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
            <CardTitle>Edit Service</CardTitle>
            <CardDescription>Update the details for this service.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                            <Input placeholder="e.g., Cloud Solutions" {...field} />
                            </FormControl>
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
                name="slug"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>URL Slug</FormLabel>
                    <FormControl>
                    <Input placeholder="e.g., cloud-solutions" {...field} />
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
            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Service Overview</FormLabel>
                    <FormControl>
                    <Textarea placeholder="A short overview of the service..." rows={3} {...field} />
                    </FormControl>
                    <FormDescription>This appears on the service listing page. Max 200 characters.</FormDescription>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Main Content</FormLabel>
                    <FormControl>
                    <Textarea placeholder="The full content for the service. HTML is supported." rows={10} {...field} />
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
                <CardTitle>Key Features / Points</CardTitle>
                <CardDescription>Manage the key features or bullet points for this service.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {pointFields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border p-4 rounded-md">
                        <FormField
                            control={form.control}
                            name={`points.${index}.title`}
                            render={({ field }) => (
                                <FormItem><FormLabel>Point Title</FormLabel><FormControl><Input {...field} placeholder="Feature Title" /></FormControl><FormMessage /></FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name={`points.${index}.description`}
                            render={({ field }) => (
                                <FormItem><FormLabel>Point Description</FormLabel><FormControl><Input {...field} placeholder="Feature Description" /></FormControl><FormMessage /></FormItem>
                            )}
                        />
                        <Button type="button" variant="destructive" onClick={() => removePoint(index)} className="mt-6">
                           <Trash className="mr-2 h-4 w-4" /> Remove
                        </Button>
                    </div>
                ))}
                <Button type="button" variant="outline" onClick={() => appendPoint({ title: "", description: "" })}>
                    Add Feature Point
                </Button>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Manage FAQs for this service.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {faqFields.map((field, index) => (
                     <div key={field.id} className="space-y-4 border p-4 rounded-md relative">
                        <Button type="button" variant="destructive" size="icon" className="absolute top-4 right-4 h-7 w-7" onClick={() => removeFaq(index)}>
                           <Trash className="h-4 w-4" />
                        </Button>
                        <FormField
                            control={form.control}
                            name={`faqs.${index}.question`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Question</FormLabel>
                                    <FormControl><Input {...field} placeholder="e.g., What is the main benefit?" /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name={`faqs.${index}.answer`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Answer</FormLabel>
                                    <FormControl><Textarea {...field} placeholder="Provide a clear and concise answer." /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                ))}
                <Button type="button" variant="outline" onClick={() => appendFaq({ question: "", answer: "" })}>
                    Add FAQ
                </Button>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Statistics</CardTitle>
                <CardDescription>Manage key statistics for this service.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {statFields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border p-4 rounded-md">
                        <FormField
                            control={form.control}
                            name={`stats.${index}.name`}
                            render={({ field }) => (
                                <FormItem><FormLabel>Stat Name</FormLabel><FormControl><Input {...field} placeholder="e.g. Projects Delivered" /></FormControl><FormMessage /></FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name={`stats.${index}.value`}
                            render={({ field }) => (
                                <FormItem><FormLabel>Stat Value</FormLabel><FormControl><Input {...field} placeholder="e.g. 150+" /></FormControl><FormMessage /></FormItem>
                            )}
                        />
                        <Button type="button" variant="destructive" onClick={() => removeStat(index)} className="mt-6">
                            <Trash className="mr-2 h-4 w-4" /> Remove
                        </Button>
                    </div>
                ))}
                <Button type="button" variant="outline" onClick={() => appendStat({ name: "", value: "" })}>
                    Add Statistic
                </Button>
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
                          placeholder='[{"year": "2020", "Projects": 10}]'
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
        
        <Button type="submit" size="lg" disabled={form.formState.isSubmitting || isUploading} className="w-auto">
            {isUploading ? "Uploading..." : form.formState.isSubmitting ? "Updating..." : "Update Service"}
        </Button>
        </form>
    </Form>
  );
}
