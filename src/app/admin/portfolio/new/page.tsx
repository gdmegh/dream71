
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  slug: z.string().min(2, "Slug must be at least 2 characters."),
  category: z.enum(["web", "mobile", "ai"], { required_error: "Please select a category." }),
  client: z.string().min(2, "Client name is required."),
  timeline: z.string().min(2, "Timeline is required."),
  link: z.string().url("Please enter a valid URL.").optional().or(z.literal('')),
  description: z.string().min(10, "Short description must be at least 10 characters."),
  longDescription: z.string().min(20, "Long description must be at least 20 characters."),
  problemStatement: z.string().min(20, "Problem statement is required."),
  coreObjective: z.string().min(20, "Core objective is required."),
  solutionMethodology: z.string().min(20, "Solution methodology is required."),
  impactSummary: z.string().min(20, "Impact summary is required."),
  testimonialText: z.string().min(20, "Testimonial text is required."),
  testimonialAuthor: z.string().min(2, "Testimonial author is required."),
  testimonialTitle: z.string().min(2, "Testimonial author's title is required."),
  tags: z.string().min(2, "Please provide at least one tag."),
  image: z.string().url("Please enter a valid image URL."),
  galleryImage1: z.string().url("Please enter a valid image URL."),
  galleryImage2: z.string().url("Please enter a valid image URL."),
  galleryImage3: z.string().url("Please enter a valid image URL."),
});

export default function NewPortfolioProject() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      client: "",
      timeline: "",
      link: "",
      description: "",
      longDescription: "",
      problemStatement: "",
      coreObjective: "",
      solutionMethodology: "",
      impactSummary: "",
      testimonialText: "",
      testimonialAuthor: "",
      testimonialTitle: "",
      tags: "",
      image: "",
      galleryImage1: "",
      galleryImage2: "",
      galleryImage3: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, you'd send this to a server
    console.log(values);
    toast({
      title: "Project Submitted!",
      description: "The new project has been added (console only).",
    });
    form.reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Portfolio Project</CardTitle>
        <CardDescription>Fill out the details for the new project.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Project Title</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., E-commerce Platform" {...field} />
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
                            <Input placeholder="e.g., ecommerce-platform" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a project category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="web">Web App</SelectItem>
                      <SelectItem value="mobile">Mobile App</SelectItem>
                      <SelectItem value="ai">AI/ML</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-8">
                 <FormField
                    control={form.control}
                    name="client"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Client</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Global Retail Inc." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="timeline"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Timeline</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., 6 Months" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

             <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Live URL</FormLabel>
                    <FormControl>
                        <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="A brief summary of the project." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

             <FormField
              control={form.control}
              name="longDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Overview (Long Description)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="A detailed overview of the project. You can use HTML here." rows={5} {...field} />
                  </FormControl>
                   <FormDescription>
                    You can use basic HTML tags like {'<p> and <strong>'} for formatting.
                  </FormDescription>
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
              name="coreObjective"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Core Objective</FormLabel>
                  <FormControl>
                    <Textarea placeholder="What was the main goal of the project?" {...field} />
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
              name="impactSummary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Impact Analysis Summary</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Summarize the positive impact of the project." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-xl">Client Testimonial</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <FormField
                    control={form.control}
                    name="testimonialText"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Testimonial Text</FormLabel>
                        <FormControl>
                            <Textarea placeholder="The client's feedback." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <div className="grid md:grid-cols-2 gap-8">
                        <FormField
                            control={form.control}
                            name="testimonialAuthor"
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
                            name="testimonialTitle"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Author Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., CEO, Example Inc." {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </CardContent>
            </Card>

             <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Tech Stack / Tags</FormLabel>
                    <FormControl>
                        <Input placeholder="React, Node.js, AWS" {...field} />
                    </FormControl>
                     <FormDescription>
                        Enter a comma-separated list of technologies or tags.
                      </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
            />

             <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Main Project Image URL</FormLabel>
                    <FormControl>
                        <Input placeholder="https://placehold.co/600x400.png" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-xl">Image Gallery</CardTitle>
                    <CardDescription>Provide URLs for 3 gallery images.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                     <FormField
                        control={form.control}
                        name="galleryImage1"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Gallery Image 1</FormLabel>
                            <FormControl>
                                <Input placeholder="https://placehold.co/1200x800.png" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="galleryImage2"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Gallery Image 2</FormLabel>
                            <FormControl>
                                <Input placeholder="https://placehold.co/1200x800.png" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="galleryImage3"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Gallery Image 3</FormLabel>
                            <FormControl>
                                <Input placeholder="https://placehold.co/1200x800.png" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </CardContent>
            </Card>


            <Button type="submit" size="lg">Create Project</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
