
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
  name: z.string().min(2, "Name must be at least 2 characters."),
  title: z.string().min(2, "Title must be at least 2 characters."),
  testimonial: z.string().min(10, "Testimonial must be at least 10 characters."),
  avatar: z.string().url("Please enter a valid URL for the avatar.").optional().or(z.literal('')),
});

export default function EditTestimonial() {
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [loading, setLoading] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  useEffect(() => {
    if (!id) return;
    const fetchTestimonial = async () => {
      setLoading(true);
      const docRef = doc(db, "Testimonial", id as string);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        form.reset(docSnap.data());
      } else {
        toast({ title: "Error", description: "Testimonial not found.", variant: "destructive" });
        router.push("/admin/testimonials");
      }
      setLoading(false);
    };
    fetchTestimonial();
  }, [id, form, router, toast]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!id) return;

    try {
      const docRef = doc(db, "Testimonial", id as string);
      await updateDoc(docRef, {
        ...values,
        updatedAt: serverTimestamp(),
      });
      toast({
        title: "Testimonial Updated!",
        description: "The testimonial has been successfully updated.",
      });
      router.push('/admin/testimonials');
    } catch (e) {
      console.error("Error updating document: ", e);
      toast({
        title: "Error",
        description: "There was an error updating the testimonial.",
        variant: "destructive",
      });
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
            <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Testimonial</CardTitle>
        <CardDescription>Update the details for this client testimonial.</CardDescription>
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
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://placehold.co/100x100.png" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                {form.formState.isSubmitting ? "Updating..." : "Update Testimonial"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
