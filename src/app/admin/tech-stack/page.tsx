
'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
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


export default function TechStackCMS() {
  const [techStack, setTechStack] = useState<any[]>([]);
  const [newTechName, setNewTechName] = useState('');
  const [editingTech, setEditingTech] = useState<any>(null);
  const { toast } = useToast();

  const fetchTechStack = async () => {
    const querySnapshot = await getDocs(collection(db, "TechStack"));
    const techStackData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTechStack(techStackData);
  };

  useEffect(() => {
    fetchTechStack();
  }, []);

  const handleAddOrUpdateTech = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTechName.trim()) {
      toast({ title: "Error", description: "Tech Stack name cannot be empty.", variant: "destructive" });
      return;
    }

    if (editingTech) {
      // Update existing tech stack
      const docRef = doc(db, "TechStack", editingTech.id);
      await updateDoc(docRef, { name: newTechName });
      toast({ title: "Success", description: "Tech Stack updated successfully." });
    } else {
      // Add new tech stack
      await addDoc(collection(db, "TechStack"), {
        name: newTechName,
        createdAt: serverTimestamp(),
      });
      toast({ title: "Success", description: "Tech Stack added successfully." });
    }
    setNewTechName('');
    setEditingTech(null);
    fetchTechStack();
  };

  const handleDeleteTech = async (id: string) => {
    try {
      await deleteDoc(doc(db, "TechStack", id));
      toast({ title: "Success", description: "Tech Stack deleted successfully." });
      fetchTechStack();
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete tech stack.", variant: "destructive" });
    }
  };

  const startEditing = (tech: any) => {
    setEditingTech(tech);
    setNewTechName(tech.name);
  };

  const cancelEditing = () => {
    setEditingTech(null);
    setNewTechName('');
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingTech ? 'Edit Tech Stack' : 'Add New Tech Stack'}</CardTitle>
          <CardDescription>
            {editingTech ? `Update the name for the "${editingTech.name}" tech.` : 'Add a new technology to organize your projects.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddOrUpdateTech} className="flex gap-4">
            <Input
              value={newTechName}
              onChange={(e) => setNewTechName(e.target.value)}
              placeholder="Tech Name (e.g. React)"
              className="flex-grow"
            />
            <Button type="submit">{editingTech ? 'Update' : 'Add'}</Button>
            {editingTech && <Button type="button" variant="outline" onClick={cancelEditing}>Cancel</Button>}
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Manage Tech Stack</CardTitle>
          <CardDescription>View, edit, or delete your existing technologies.</CardDescription>
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
              {techStack.map((tech) => (
                <TableRow key={tech.id}>
                  <TableCell className="font-medium">{tech.name}</TableCell>
                  <TableCell>{tech.createdAt?.toDate().toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => startEditing(tech)}>Edit</DropdownMenuItem>
                          <AlertDialogTrigger asChild>
                             <DropdownMenuItem
                              className="text-destructive"
                              onSelect={(e) => e.preventDefault()}
                            >
                              Delete
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <AlertDialogContent>
                          <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete this tech stack item.
                          </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteTech(tech.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                          </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
