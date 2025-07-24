
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

export default function TestimonialsCMS() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const { toast } = useToast();

  const fetchTestimonials = async () => {
    const q = query(collection(db, "Testimonial"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const testimonialsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTestimonials(testimonialsData);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);
  
  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "Testimonial", id));
      toast({ title: "Success", description: "Testimonial deleted successfully." });
      fetchTestimonials(); // Refresh list
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete testimonial.", variant: "destructive" });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle>Client Testimonials</CardTitle>
            <CardDescription>Manage your client testimonials here.</CardDescription>
        </div>
        <Button asChild size="sm" className="gap-1">
            <Link href="/admin/testimonials/new">
                <PlusCircle className="h-4 w-4" />
                Add New Testimonial
            </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Avatar</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.map((testimonial) => (
              <TableRow key={testimonial.id}>
                <TableCell>
                   <Avatar>
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint="person face"/>
                        <AvatarFallback>{testimonial.name.split(' ').map((n:string) => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                </TableCell>
                <TableCell className="font-medium">{testimonial.name}</TableCell>
                <TableCell>{testimonial.title}</TableCell>
                <TableCell>
                    {testimonial.createdAt?.toDate().toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem disabled>Edit</DropdownMenuItem>
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
                                        This action cannot be undone. This will permanently delete this testimonial.
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(testimonial.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
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
