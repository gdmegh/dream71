
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
});

export default function NewNewsArticle() {
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
        const { imagePrompt, ...articleData } = values;
        await addDoc(collection(db, "News"), {
            ...articleData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        toast({
            title: "Article Submitted!",
            description: "The new news article has been added.",
        });
        form.reset();
        setGeneratedImageUrl(null);
        router.push('/admin/news');
    } catch (e) {
        console.error("Error adding document: ", e);
        toast({
            title: "Error",
            description: "There was an error submitting the article.",
            variant: "destructive",
        });
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

            <FormField
              control={form.control}
              name="imagePrompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Featured Image Prompt</FormLabel>
                   <FormDescription>Describe the image you want to generate for the article.</FormDescription>
                  <div className="flex gap-2">
                    <FormControl>
                        <Input placeholder="e.g., A modern office building with a logo" {...field} />
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
            <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Publishing..." : "Publish Article"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
