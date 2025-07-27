
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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
import { addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash } from "lucide-react";

const pointSchema = z.object({
  title: z.string().min(1, "Title cannot be empty."),
  description: z.string().min(1, "Description cannot be empty."),
});

const statSchema = z.object({
  name: z.string().min(1, "Name cannot be empty."),
  value: z.string().min(1, "Value cannot be empty."),
});

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  slug: z.string().min(2, "Slug must be at least 2 characters.").refine(s => !s.includes(' '), "Slug cannot contain spaces."),
  description: z.string().min(10, "Description must be at least 10 characters.").max(200, "Description must be less than 200 characters."),
  content: z.string().min(20, "Content must be at least 20 characters."),
  imageUrl: z.string().optional(),
  template: z.string().min(2, "Please select a template."),
  chartId: z.string().optional(),
  points: z.array(pointSchema).optional(),
  stats: z.array(statSchema).optional(),
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

type ChartData = {
  id: string;
  name: string;
};

export default function NewService() {
  const { toast } = useToast();
  const router = useRouter();
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [charts, setCharts] = useState<ChartData[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      content: "",
      imageUrl: "",
      template: "default",
      points: [],
      stats: [],
      chartData: "[]"
    },
  });
  
  const { fields: pointFields, append: appendPoint, remove: removePoint } = useFieldArray({ control: form.control, name: "points" });
  const { fields: statFields, append: appendStat, remove: removeStat } = useFieldArray({ control: form.control, name: "stats" });


  useEffect(() => {
    const fetchCharts = async () => {
        const querySnapshot = await getDocs(collection(db, 'ChartData'));
        setCharts(querySnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name })));
    };
    fetchCharts();
  }, []);

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
        const dataToSave: any = {
            ...values,
            imageUrl,
            chartData: values.chartData ? JSON.parse(values.chartData) : [],
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        };

        if (!dataToSave.chartId) {
            dataToSave.chartId = null;
        }
        
        await addDoc(collection(db, "Service"), dataToSave);
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Add New Service</CardTitle>
            <CardDescription>Fill out the details for the new service.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
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
                  <FormLabel>Short Description</FormLabel>
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
                <CardDescription>Add the key features or bullet points for this service.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {pointFields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border p-4 rounded-md">
                        <FormField
                            control={form.control}
                            name={`points.${index}.title`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Point Title</FormLabel>
                                    <FormControl><Input {...field} placeholder="Feature Title" /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name={`points.${index}.description`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Point Description</FormLabel>
                                    <FormControl><Input {...field} placeholder="Feature Description" /></FormControl>
                                    <FormMessage />
                                </FormItem>
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
                <CardTitle>Statistics</CardTitle>
                <CardDescription>Add key statistics for this service.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {statFields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border p-4 rounded-md">
                        <FormField
                            control={form.control}
                            name={`stats.${index}.name`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Stat Name</FormLabel>
                                    <FormControl><Input {...field} placeholder="e.g. Projects Delivered" /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name={`stats.${index}.value`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Stat Value</FormLabel>
                                    <FormControl><Input {...field} placeholder="e.g. 150+" /></FormControl>
                                    <FormMessage />
                                </FormItem>
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
                 <CardDescription>Provide data as a JSON array of objects.</CardDescription>
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

        <Button type="submit" size="lg" disabled={form.formState.isSubmitting || isUploading}>
          {isUploading ? "Uploading..." : form.formState.isSubmitting ? "Publishing..." : "Publish Service"}
        </Button>
      </form>
    </Form>
  );
}
