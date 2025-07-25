
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import { PlusCircle, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function ChartsCMS() {
  const [charts, setCharts] = useState<any[]>([]);
  const { toast } = useToast();

  const fetchCharts = async () => {
    const q = query(collection(db, "ChartData"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const chartsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCharts(chartsData);
  };

  useEffect(() => {
    fetchCharts();
  }, []);
  
  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "ChartData", id));
      toast({ title: "Success", description: "Chart data deleted successfully." });
      fetchCharts();
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete chart data.", variant: "destructive" });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2 flex-grow">
            <CardTitle>Chart Datasets</CardTitle>
            <CardDescription>Manage your chart data here.</CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
            <Link href="/admin/charts/new">
                <PlusCircle className="h-4 w-4" />
                Add New Chart
            </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {charts.map((chart) => (
              <TableRow key={chart.id}>
                <TableCell className="font-medium">{chart.name}</TableCell>
                <TableCell>
                    {chart.createdAt?.toDate().toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                                <Link href={`/admin/charts/edit/${chart.id}`}>Edit</Link>
                            </DropdownMenuItem>
                            <AlertDialog>
                               <AlertDialogTrigger asChild>
                                    <button className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full text-destructive">
                                        Delete
                                    </button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete this chart dataset.
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(chart.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
