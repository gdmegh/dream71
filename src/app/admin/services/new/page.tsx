
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  slug: z.string().min(2, "Slug must be at least 2 characters.").refine(s => !s.includes(' '), "Slug cannot contain spaces."),
  description: z.string().min(10, "Description must be at least 10 characters.").max(200, "Description must be less than 200 characters."),
  content: z.string().min(20, "Content must be at least 20 characters."),
  imageUrl: z.string().url("Please enter a valid URL for the image.").optional().or(z.literal('')),
  template: z.string().min(2, "Please select a template."),
});

export default function NewService() {
  const { toast } = useToast();
  const router = useRouter();
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      content: "",
      imageUrl: "",
      template: "default",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
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
        await addDoc(collection(db, "Service"), {
            ...values,
            imageUrl,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        toast({
            title: "Service Submitted!",
            description: "The new service has been added.",
        });
        form.reset();
        router.push('/admin/services');
    } catch (e) {
        console.error("Error adding document: ", e);
        toast({
            title: "Error",
            description: "There was an error submitting the service.",
            variant: "destructive",
        });
    } finally {
        setIsUploading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Service</CardTitle>
        <CardDescription>Fill out the details for the new service.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., cloud-solutions" {...field} />
                  </FormControl>
                  <FormDescription>A unique, URL-friendly identifier. No spaces.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="template"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Template</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a template for the detail page" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="egovernance">E-Governance</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the layout for the service detail page.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Featured Image</FormLabel>
              <FormControl>
                <Input 
                  type="file" 
                  onChange={(e) => setFeaturedImageFile(e.target.files?.[0] || null)}
                  accept="image/*"
                />
              </FormControl>
              <FormDescription>Upload the main image for the service.</FormDescription>
              <FormMessage />
            </FormItem>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="A short description of the service..." rows={3} {...field} />
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
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea placeholder="The full content for the service. HTML is supported." rows={10} {...field} />
                  </FormControl>
                  <FormDescription>You can use HTML tags for formatting.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" disabled={form.formState.isSubmitting || isUploading}>
              {isUploading ? "Uploading..." : form.formState.isSubmitting ? "Publishing..." : "Publish Service"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
