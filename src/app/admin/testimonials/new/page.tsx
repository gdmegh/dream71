
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
  name: z.string().min(2, "Name must be at least 2 characters."),
  title: z.string().min(2, "Title must be at least 2 characters."),
  testimonial: z.string().min(10, "Testimonial must be at least 10 characters."),
  imagePrompt: z.string().optional(),
  avatar: z.string().optional(),
});

export default function NewTestimonial() {
  const { toast } = useToast();
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      title: "",
      testimonial: "",
      imagePrompt: "",
      avatar: "",
    },
  });

  const handleGenerateImage = async () => {
    const prompt = form.getValues("imagePrompt");
    if (!prompt) {
        toast({ title: "Error", description: "Please enter a prompt for the avatar.", variant: "destructive" });
        return;
    }
    setIsGenerating(true);
    try {
        const result = await generateImage({ prompt });
        if (result.dataUri) {
            setGeneratedImageUrl(result.dataUri);
            form.setValue("avatar", result.dataUri);
            toast({ title: "Avatar Generated!", description: "The avatar image has been successfully generated." });
        }
    } catch (error) {
        console.error("Image generation failed:", error);
        toast({ title: "Error", description: "Failed to generate avatar.", variant: "destructive" });
    } finally {
        setIsGenerating(false);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        const { imagePrompt, ...testimonialData } = values;
        await addDoc(collection(db, "Testimonial"), {
            ...testimonialData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        toast({
            title: "Testimonial Submitted!",
            description: "The new testimonial has been added.",
        });
        form.reset();
        setGeneratedImageUrl(null);
        router.push('/admin/testimonials');
    } catch (e) {
        console.error("Error adding document: ", e);
        toast({
            title: "Error",
            description: "There was an error submitting the testimonial.",
            variant: "destructive",
        });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Testimonial</CardTitle>
        <CardDescription>Fill out the details for the new client testimonial.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            <div className="grid md:grid-cols-2 gap-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Client Name</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Client Title / Company</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., CEO, Tech Innovators" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <FormField
              control={form.control}
              name="imagePrompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar Prompt</FormLabel>
                   <FormDescription>Describe the person whose avatar you want to generate.</FormDescription>
                  <div className="flex gap-2">
                    <FormControl>
                        <Input placeholder="e.g., A friendly-looking CEO in a suit" {...field} />
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
                <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary/20 mx-auto">
                    <Image src={generatedImageUrl} alt="Generated avatar preview" fill className="object-cover" />
                </div>
            )}

            <FormField
              control={form.control}
              name="testimonial"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Testimonial</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter the client's testimonial here." rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Creating..." : "Create Testimonial"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
