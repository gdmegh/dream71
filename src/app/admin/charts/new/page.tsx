
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

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  dataPoints: z.string().refine((val) => {
    try {
      const parsed = JSON.parse(val);
      return Array.isArray(parsed) && parsed.length > 0;
    } catch (e) {
      return false;
    }
  }, {
    message: "Must be a valid, non-empty JSON array.",
  }),
});

export default function NewChartData() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      dataPoints: '[\n  {\n    "year": "2020",\n    "Projects": 10,\n    "Adoption Rate": 20\n  },\n  {\n    "year": "2021",\n    "Projects": 25,\n    "Adoption Rate": 45\n  }\n]',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const dataPoints = JSON.parse(values.dataPoints);
      await addDoc(collection(db, "ChartData"), {
        name: values.name,
        dataPoints,
        createdAt: serverTimestamp(),
      });
      toast({
        title: "Chart Data Added!",
        description: "The new chart dataset has been added.",
      });
      form.reset();
      router.push('/admin/charts');
    } catch (e) {
      console.error("Error adding document: ", e);
      toast({
        title: "Error",
        description: "There was an error adding the chart data.",
        variant: "destructive",
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Chart Dataset</CardTitle>
        <CardDescription>Add a new dataset for use in charts.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dataset Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., E-Governance Growth" {...field} />
                  </FormControl>
                  <FormDescription>A unique name to identify this dataset.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dataPoints"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data Points (JSON)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter JSON array of data points"
                      rows={15}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide the data as a JSON array of objects. Each object is a point on the graph.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Adding..." : "Add Dataset"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
