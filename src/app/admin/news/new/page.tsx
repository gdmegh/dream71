
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

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  slug: z.string().min(2, "Slug must be at least 2 characters.").refine(s => !s.includes(' '), "Slug cannot contain spaces."),
  summary: z.string().min(10, "Summary must be at least 10 characters.").max(200, "Summary must be less than 200 characters."),
  content: z.string().min(20, "Content must be at least 20 characters."),
  imageUrl: z.string().url("Please enter a valid URL for the image.").optional().or(z.literal('')),
});

export default function NewNewsArticle() {
  const { toast } = useToast();
  const router = useRouter();
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      summary: "",
      content: "",
      imageUrl: "",
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
        await addDoc(collection(db, "News"), {
            ...values,
            imageUrl,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        toast({
            title: "Article Submitted!",
            description: "The new news article has been added.",
        });
        form.reset();
        router.push('/admin/news');
    } catch (e) {
        console.error("Error adding document: ", e);
        toast({
            title: "Error",
            description: "There was an error submitting the article.",
            variant: "destructive",
        });
    } finally {
        setIsUploading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New News Article</CardTitle>
        <CardDescription>Fill out the details for the new article.</CardDescription>
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
                    <Input placeholder="e.g., Dream71 Launches New Initiative" {...field} />
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
                    <Input placeholder="e.g., dream71-launches-initiative" {...field} />
                  </FormControl>
                  <FormDescription>A unique, URL-friendly identifier. No spaces.</FormDescription>
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
              <FormDescription>Upload the main image for the article.</FormDescription>
              <FormMessage />
            </FormItem>

            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <Textarea placeholder="A short summary of the article..." rows={3} {...field} />
                  </FormControl>
                  <FormDescription>This appears on the news listing page. Max 200 characters.</FormDescription>
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
                    <Textarea placeholder="The full content of the article. HTML is supported." rows={10} {...field} />
                  </FormControl>
                  <FormDescription>You can use HTML tags for formatting.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" disabled={form.formState.isSubmitting || isUploading}>
              {isUploading ? "Uploading..." : form.formState.isSubmitting ? "Publishing..." : "Publish Article"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
