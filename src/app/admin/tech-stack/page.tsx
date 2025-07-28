
'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, serverTimestamp, orderBy, query } from 'firebase/firestore';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const techCategories = [
    "Frontend",
    "Backend",
    "Database",
    "Mobile",
    "DevOps",
    "CMS",
    "AI/ML"
];

export default function TechStackCMS() {
  const [techStack, setTechStack] = useState<any[]>([]);
  const [newTechName, setNewTechName] = useState('');
  const [newTechCategory, setNewTechCategory] = useState('');
  const [editingTech, setEditingTech] = useState<any>(null);
  const { toast } = useToast();

  const fetchTechStack = async () => {
    const q = query(collection(db, "TechStack"), orderBy("category"), orderBy("createdAt"));
    const querySnapshot = await getDocs(q);
    const techStackData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // Group by category
    const grouped = techStackData.reduce((acc, tech) => {
        const category = tech.category || 'Uncategorized';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(tech);
        return acc;
    }, {});

    setTechStack(Object.entries(grouped));
  };

  useEffect(() => {
    fetchTechStack();
  }, []);

  const handleAddOrUpdateTech = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTechName.trim() || !newTechCategory) {
      toast({ title: "Error", description: "Tech name and category are required.", variant: "destructive" });
      return;
    }

    if (editingTech) {
      const docRef = doc(db, "TechStack", editingTech.id);
      await updateDoc(docRef, { name: newTechName, category: newTechCategory });
      toast({ title: "Success", description: "Tech Stack updated successfully." });
    } else {
      await addDoc(collection(db, "TechStack"), {
        name: newTechName,
        category: newTechCategory,
        createdAt: serverTimestamp(),
      });
      toast({ title: "Success", description: "Tech Stack added successfully." });
    }
    cancelEditing();
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
    setNewTechCategory(tech.category);
  };

  const cancelEditing = () => {
    setEditingTech(null);
    setNewTechName('');
    setNewTechCategory('');
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingTech ? 'Edit Tech Stack' : 'Add New Tech Stack'}</CardTitle>
          <CardDescription>
            {editingTech ? `Update the details for "${editingTech.name}".` : 'Add a new technology and assign it to a category.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddOrUpdateTech} className="flex flex-col md:flex-row gap-4">
            <Input
              value={newTechName}
              onChange={(e) => setNewTechName(e.target.value)}
              placeholder="Tech Name (e.g. React)"
              className="flex-grow"
            />
            <Select value={newTechCategory} onValueChange={setNewTechCategory}>
                <SelectTrigger className="w-full md:w-[280px]">
                    <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                    {techCategories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <div className="flex gap-2">
                <Button type="submit" className="flex-grow">{editingTech ? 'Update' : 'Add'}</Button>
                {editingTech && <Button type="button" variant="outline" onClick={cancelEditing} className="flex-grow">Cancel</Button>}
            </div>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Manage Tech Stack</CardTitle>
          <CardDescription>View, edit, or delete your existing technologies, grouped by category.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {techStack.map(([category, techs]) => (
                <div key={category}>
                    <h3 className="text-lg font-semibold mb-2 pl-1">{category}</h3>
                    <div className="border rounded-md">
                        <Table>
                            <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead className="hidden md:table-cell">Created At</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                            </TableHeader>
                            <TableBody>
                            {techs.map((tech: any) => (
                                <TableRow key={tech.id}>
                                <TableCell className="font-medium">{tech.name}</TableCell>
                                <TableCell className="hidden md:table-cell">{tech.createdAt?.toDate().toLocaleDateString()}</TableCell>
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
                    </div>
                </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
