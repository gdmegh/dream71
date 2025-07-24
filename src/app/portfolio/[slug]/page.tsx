
'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Calendar, User, GitBranch, Puzzle, Target, BarChart2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';

const LoadingScreen = () => (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <Skeleton className="h-12 w-1/2 mx-auto" />
        <Skeleton className="h-8 w-3/4 mx-auto" />
        <Skeleton className="h-96 w-full" />
        <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2 space-y-12">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
            </div>
            <aside className="lg:col-span-1 space-y-8 sticky top-24">
                 <Skeleton className="h-96 w-full" />
            </aside>
        </div>
    </div>
);


export default function PortfolioDetailPage({ params: { slug } }: { params: { slug: string } }) {
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      const q = query(collection(db, "Project"), where("slug", "==", slug), where("isPublic", "==", true));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        notFound();
      }
      
      const projectData = { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };
      setProject(projectData);
      setLoading(false);
    };

    fetchProject();
  }, [slug]);


  if (loading) {
    return <LoadingScreen />;
  }

  if (!project) {
    return notFound();
  }

  return (
    <>
      <section className="bg-primary/5 pt-20 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground">{project.title}</h1>
            <p className="font-body mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              {project.subtitle}
            </p>
        </div>
      </section>

      <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-3 gap-12 items-start">
                  <div className="lg:col-span-2 space-y-12">
                      <Card rounded="20px">
                        <CardHeader>
                            <CardTitle className="font-headline text-3xl flex items-center gap-3"><GitBranch /> Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <p className="font-body text-muted-foreground">{project.overview}</p>
                        </CardContent>
                      </Card>
                       <Card rounded="20px">
                        <CardHeader>
                            <CardTitle className="font-headline text-3xl flex items-center gap-3"><Puzzle /> Problem Statement</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="font-body text-muted-foreground">{project.problemStatement}</p>
                        </CardContent>
                      </Card>
                       <Card rounded="20px">
                        <CardHeader>
                            <CardTitle className="font-headline text-3xl flex items-center gap-3"><Target /> Solution Methodology</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="font-body text-muted-foreground">{project.solutionMethodology}</p>
                        </CardContent>
                      </Card>
                       <Card rounded="20px">
                        <CardHeader>
                            <CardTitle className="font-headline text-3xl flex items-center gap-3"><BarChart2 /> Impact</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <p className="font-body text-muted-foreground mb-6">{project.impact}</p>
                        </CardContent>
                      </Card>
                  </div>
                  <aside className="lg:col-span-1 space-y-8 sticky top-24">
                      <Card rounded="20px">
                          <CardHeader><CardTitle className="font-headline text-xl">Project Info</CardTitle></CardHeader>
                          <CardContent className="space-y-4">
                              <div className='flex items-center gap-3'>
                                <User className='h-5 w-5 text-primary' />
                                <div>
                                    <p className='font-semibold'>Client</p>
                                    <p className='text-muted-foreground'>{project.clientInfo}</p>
                                </div>
                              </div>
                               <div className='flex items-center gap-3'>
                                <Calendar className='h-5 w-5 text-primary' />
                                <div>
                                    <p className='font-semibold'>Timeline</p>
                                    <p className='text-muted-foreground'>{project.projectTimeline}</p>
                                </div>
                              </div>
                               {project.demoUrl && (
                                 <Button asChild className="w-full mt-4">
                                     <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                         Visit Demo <ExternalLink className="ml-2 h-4 w-4" />
                                     </a>
                                 </Button>
                               )}
                                {project.repositoryUrl && (
                                 <Button asChild className="w-full" variant="secondary">
                                     <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">
                                         View Repository <ExternalLink className="ml-2 h-4 w-4" />
                                     </a>
                                 </Button>
                               )}
                          </CardContent>
                      </Card>
                  </aside>
              </div>
          </div>
      </section>
    </>
  );
}
