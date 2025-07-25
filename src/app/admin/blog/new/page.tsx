
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
import { generateImage } from "@/ai/flows/generate-image-flow";
import { useState } from "react";
import Image from "next/image";
import { Wand2 } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  slug: z.string().min(2, "Slug must be at least 2 characters.").refine(s => !s.includes(' '), "Slug cannot contain spaces."),
  summary: z.string().min(10, "Summary must be at least 10 characters.").max(200, "Summary must be less than 200 characters."),
  content: z.string().min(20, "Content must be at least 20 characters."),
  imagePrompt: z.string().optional(),
  imageUrl: z.string().optional(),
  author: z.string().min(2, "Author name is required."),
  authorImage: z.string().url("Please enter a valid URL for author image.").optional().or(z.literal('')),
});

export default function NewBlogPost() {
  const { toast } = useToast();
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      summary: "",
      content: "",
      imagePrompt: "",
      imageUrl: "",
      author: "",
      authorImage: "",
    },
  });

  const handleGenerateImage = async () => {
    const prompt = form.getValues("imagePrompt");
    if (!prompt) {
        toast({ title: "Error", description: "Please enter a prompt for the image.", variant: "destructive" });
        return;
    }
    setIsGenerating(true);
    try {
        const result = await generateImage({ prompt });
        if (result.dataUri) {
            setGeneratedImageUrl(result.dataUri);
            form.setValue("imageUrl", result.dataUri);
            toast({ title: "Image Generated!", description: "The image has been successfully generated." });
        }
    } catch (error) {
        console.error("Image generation failed:", error);
        toast({ title: "Error", description: "Failed to generate image.", variant: "destructive" });
    } finally {
        setIsGenerating(false);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        const { imagePrompt, ...postData } = values;
        await addDoc(collection(db, "Blog"), {
            ...postData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        toast({
            title: "Post Submitted!",
            description: "The new blog post has been added.",
        });
        form.reset();
        router.push('/admin/blog');
    } catch (e) {
        console.error("Error adding document: ", e);
        toast({
            title: "Error",
            description: "There was an error submitting the post.",
            variant: "destructive",
        });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Blog Post</CardTitle>
        <CardDescription>Fill out the details for the new blog post.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., The Future of Web Development" {...field} />
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
                    <Input placeholder="e.g., future-of-web-development" {...field} />
                  </FormControl>
                  <FormDescription>A unique, URL-friendly identifier. No spaces.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="imagePrompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Featured Image Prompt</FormLabel>
                   <FormDescription>Describe the image you want to generate for the post.</FormDescription>
                  <div className="flex gap-2">
                    <FormControl>
                        <Input placeholder="e.g., A futuristic cityscape at sunset" {...field} />
                    </FormControl>
                    <Button type="button" onClick={handleGenerateImage} disabled={isGenerating}>
                        <Wand2 className="mr-2 h-4 w-4" />
                        {isGenerating ? "Generating..." : "Generate"}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {generatedImageUrl && (
                <div className="relative w-full h-64 rounded-lg overflow-hidden border">
                    <Image src={generatedImageUrl} alt="Generated preview" fill className="object-cover" />
                </div>
            )}
            
             <div className="grid md:grid-cols-2 gap-8">
                <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Author Name</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="authorImage"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Author Image URL</FormLabel>
                        <FormControl>
                            <Input placeholder="https://placehold.co/100x100.png" {...field} />
                        </FormControl>
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
                    <Textarea placeholder="A short summary of the post..." rows={3} {...field} />
                  </FormControl>
                   <FormDescription>This appears on the blog listing page. Max 200 characters.</FormDescription>
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
                    <Textarea placeholder="The full content of the post. HTML is supported." rows={10} {...field} />
                  </FormControl>
                  <FormDescription>You can use HTML tags for formatting.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Publishing..." : "Publish Post"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
