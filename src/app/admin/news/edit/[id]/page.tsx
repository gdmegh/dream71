
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  slug: z.string().min(2, "Slug must be at least 2 characters.").refine(s => !s.includes(' '), "Slug cannot contain spaces."),
  summary: z.string().min(10, "Summary must be at least 10 characters.").max(200, "Summary must be less than 200 characters."),
  content: z.string().min(20, "Content must be at least 20 characters."),
  imageUrl: z.string().optional(),
});

export default function EditNewsArticle() {
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
    defaultValues: {},
  });

  useEffect(() => {
    if (!id) return;
    const fetchArticle = async () => {
      setLoading(true);
      const docRef = doc(db, "News", id as string);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        form.reset(data);
        setCurrentImageUrl(data.imageUrl);
      } else {
        toast({ title: "Error", description: "Article not found.", variant: "destructive" });
        router.push("/admin/news");
      }
      setLoading(false);
    };
    fetchArticle();
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
      const docRef = doc(db, "News", id as string);
      await updateDoc(docRef, {
        ...values,
        imageUrl,
        updatedAt: serverTimestamp(),
      });
      toast({
        title: "Article Updated!",
        description: "The news article has been successfully updated.",
      });
      router.push('/admin/news');
    } catch (e) {
      console.error("Error updating document: ", e);
      toast({
        title: "Error",
        description: "There was an error updating the article.",
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
        <CardTitle>Edit News Article</CardTitle>
        <CardDescription>Update the details for this article.</CardDescription>
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
              {isUploading ? "Uploading..." : form.formState.isSubmitting ? "Updating..." : "Update Article"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
