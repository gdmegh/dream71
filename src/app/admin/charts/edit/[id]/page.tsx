
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
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

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

export default function EditChartData() {
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
    const fetchChartData = async () => {
      setLoading(true);
      const docRef = doc(db, "ChartData", id as string);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        form.reset({
            name: data.name,
            dataPoints: JSON.stringify(data.dataPoints, null, 2)
        });
      } else {
        toast({ title: "Error", description: "Chart data not found.", variant: "destructive" });
        router.push("/admin/charts");
      }
      setLoading(false);
    };
    fetchChartData();
  }, [id, form, router, toast]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!id) return;
    try {
      const dataPoints = JSON.parse(values.dataPoints);
      const docRef = doc(db, "ChartData", id as string);
      await updateDoc(docRef, {
        name: values.name,
        dataPoints,
      });
      toast({
        title: "Chart Data Updated!",
        description: "The chart dataset has been successfully updated.",
      });
      router.push('/admin/charts');
    } catch (e) {
      console.error("Error updating document: ", e);
      toast({
        title: "Error",
        description: "There was an error updating the chart data.",
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
            <Skeleton className="h-40 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Chart Dataset</CardTitle>
        <CardDescription>Update the details for this chart dataset.</CardDescription>
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
              {form.formState.isSubmitting ? "Updating..." : "Update Dataset"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
