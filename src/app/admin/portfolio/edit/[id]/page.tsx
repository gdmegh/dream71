
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
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
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { MultiSelect } from "@/components/ui/multi-select";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  subtitle: z.string().optional(),
  slug: z.string().min(2, "Slug must be at least 2 characters.").refine(s => !s.includes(' '), "Slug cannot contain spaces."),
  overview: z.string().min(20, "Overview must be at least 20 characters."),
  problemStatement: z.string().min(20, "Problem statement is required."),
  solutionMethodology: z.string().min(20, "Solution methodology is required."),
  impact: z.string().min(20, "Impact summary is required."),
  clientInfo: z.string().min(2, "Client info is required."),
  projectTimeline: z.string().min(2, "Timeline is required."),
  repositoryUrl: z.string().url("Please enter a valid URL.").optional().or(z.literal('')),
  demoUrl: z.string().url("Please enter a valid URL.").optional().or(z.literal('')),
  isPublic: z.boolean().default(true),
  imageUrl: z.string().optional(),
  techStackIds: z.array(z.string()).optional(),
  serviceId: z.string().optional(),
});

type TechStack = {
  value: string;
  label: string;
};

type Service = {
  id: string;
  title: string;
};

export default function EditPortfolioProject() {
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [techStack, setTechStack] = useState<TechStack[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      techStackIds: [],
    },
  });

   useEffect(() => {
    const fetchTechStack = async () => {
      const querySnapshot = await getDocs(collection(db, 'TechStack'));
      setTechStack(querySnapshot.docs.map(doc => ({ value: doc.id, label: doc.data().name })));
    };
     const fetchServices = async () => {
        const querySnapshot = await getDocs(collection(db, 'Service'));
        setServices(querySnapshot.docs.map(doc => ({ id: doc.id, title: doc.data().title })));
    };
    fetchTechStack();
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
          ...data,
          techStackIds: data.techStackIds || [],
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
      const dataToUpdate: any = {
        ...values,
        imageUrl,
        updatedAt: serverTimestamp(),
      };

      if (!dataToUpdate.serviceId) {
        dataToUpdate.serviceId = null;
      }

      await updateDoc(docRef, dataToUpdate);
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
    <Card>
      <CardHeader>
        <CardTitle>Edit Portfolio Project</CardTitle>
        <CardDescription>Update the details for this project.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            <FormField
              control={form.control}
              name="isPublic"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Public</FormLabel>
                    <FormDescription>
                     Make this project visible to everyone.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Project Title</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Megh Gallery" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="subtitle"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Subtitle</FormLabel>
                        <FormControl>
                            <Input placeholder="A short, catchy subtitle" {...field} />
                        </FormControl>
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
                        <Input placeholder="e.g., megh-gallery" {...field} />
                    </FormControl>
                    <FormDescription>
                        A unique, URL-friendly identifier. No spaces allowed.
                    </FormDescription>
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
                name="serviceId"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Related Service</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a related service" />
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

            <Controller
                control={form.control}
                name="techStackIds"
                render={({ field: { onChange, value } }) => (
                    <FormItem>
                        <FormLabel>Tech Stack</FormLabel>
                        <MultiSelect
                            options={techStack}
                            selected={value || []}
                            onChange={onChange}
                        />
                        <FormDescription>Associate this project with one or more technologies.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="grid md:grid-cols-2 gap-8">
                 <FormField
                    control={form.control}
                    name="clientInfo"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Client Information</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., A client from the arts industry" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="projectTimeline"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Project Timeline</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., 3 Months" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <FormField
                    control={form.control}
                    name="repositoryUrl"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Repository URL</FormLabel>
                        <FormControl>
                            <Input placeholder="https://github.com/user/repo" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="demoUrl"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Demo URL</FormLabel>
                        <FormControl>
                            <Input placeholder="https://your-demo.com" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <FormField
              control={form.control}
              name="overview"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Overview</FormLabel>
                  <FormControl>
                    <Textarea placeholder="A detailed overview of the project." rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="problemStatement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Problem Statement</FormLabel>
                  <FormControl>
                    <Textarea placeholder="What was the core problem the client was facing?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="solutionMethodology"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Solution Methodology</FormLabel>
                  <FormControl>
                    <Textarea placeholder="How did you approach solving the problem?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="impact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Impact</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Summarize the positive impact of the project." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" size="lg" disabled={form.formState.isSubmitting || isUploading}>
                {isUploading ? "Uploading..." : form.formState.isSubmitting ? "Updating..." : "Update Project"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
