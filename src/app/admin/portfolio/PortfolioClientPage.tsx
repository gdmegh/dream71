
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { PlusCircle, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useEffect, useState } from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
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
import Image from 'next/image';

type Project = {
  id: string;
  title: string;
  isPublic: boolean;
  createdAt: { seconds: number; nanoseconds: number };
  imageUrl?: string;
  imageUrls?: string[];
  slug: string;
  techStackIds?: string[];
};

type TechStack = {
  id: string;
  name: string;
};

export default function PortfolioClientPage({ initialProjects, initialTechStack }: { initialProjects: Project[], initialTechStack: TechStack[] }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [techStack] = useState<TechStack[]>(initialTechStack);
  const { toast } = useToast();

  useEffect(() => {
    setProjects(initialProjects);
  }, [initialProjects]);
  
  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "Project", id));
      toast({ title: "Success", description: "Project deleted successfully." });
      setProjects(projects.filter(p => p.id !== id));
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete project.", variant: "destructive" });
    }
  };

  const getTechStackNames = (techStackIds: string[] = []) => {
    if (!techStackIds || !techStack.length) return 'N/A';
    return techStackIds.map(id => techStack.find(c => c.id === id)?.name).filter(Boolean).join(', ') || 'N/A';
  };

  const formatDate = (timestamp: { seconds: number; nanoseconds: number }) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp.seconds * 1000).toLocaleDateString();
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2 flex-grow">
            <CardTitle>Portfolio Projects</CardTitle>
            <CardDescription>Manage your portfolio projects here.</CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
            <Link href="/admin/portfolio/new">
                <PlusCircle className="h-4 w-4" />
                Add New Project
            </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Tech Stack</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>
                  {project.imageUrls && project.imageUrls.length > 0 ? (
                    <Image src={project.imageUrls[0]} alt={project.title} width={40} height={40} className="rounded-md object-cover" />
                  ) : project.imageUrl ? (
                     <Image src={project.imageUrl} alt={project.title} width={40} height={40} className="rounded-md object-cover" />
                  ) : null}
                </TableCell>
                <TableCell className="font-medium">{project.title}</TableCell>
                <TableCell>{getTechStackNames(project.techStackIds)}</TableCell>
                <TableCell>
                    <Badge variant={project.isPublic ? "default" : "secondary"}>{project.isPublic ? "Public" : "Private"}</Badge>
                </TableCell>
                <TableCell>
                    {formatDate(project.createdAt)}
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
                               <Link href={`/portfolio/${project.slug}`} target="_blank">View</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href={`/admin/portfolio/edit/${project.id}`}>Edit</Link>
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
                                        This action cannot be undone. This will permanently delete this project.
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(project.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
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
