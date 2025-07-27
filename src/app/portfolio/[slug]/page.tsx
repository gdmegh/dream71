
'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ExternalLink, GitBranch, Puzzle, Target, BarChart2, Briefcase, Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

const LoadingScreen = () => (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <Skeleton className="h-12 w-1/2 mx-auto" />
        <Skeleton className="h-8 w-3/4 mx-auto" />
        <Skeleton className="h-[500px] w-full rounded-[20px]" />
        
        <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-8">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
            </div>
            <div className="lg:col-span-4">
                 <Skeleton className="h-64 w-full" />
            </div>
        </div>
    </div>
);


export default function PortfolioDetailPage({ params: { slug } }: { params: { slug: string } }) {
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (!slug) {
        setLoading(false);
        return;
      };
      setLoading(true);
      const q = query(collection(db, "Project"), where("slug", "==", slug), where("isPublic", "==", true), limit(1));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        setProject(null);
      } else {
        const projectData = { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };
        setProject(projectData);
      }
      setLoading(false);
    };

    fetchProject();
  }, [slug]);


  if (loading) {
    return <LoadingScreen />;
  }

  if (!project) {
    if (!slug) {
        return <div className="container mx-auto py-20 text-center">Error: No project slug provided.</div>;
    }
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
             <div className="relative h-[300px] md:h-[500px] w-full overflow-hidden rounded-[20px] shadow-2xl mb-16">
                <Image
                    src={project.imageUrl || 'https://placehold.co/1200x600.png'}
                    alt={project.title}
                    layout="fill"
                    objectFit="contain"
                    data-ai-hint={'project image'}
                />
            </div>

              <div className="grid lg:grid-cols-12 gap-12">
                
                {/* Main Content */}
                <div className="lg:col-span-8 space-y-12">
                    <div className="space-y-4">
                        <GitBranch className="h-10 w-10 text-primary mx-auto" />
                        <h2 className="font-headline text-3xl font-bold text-center">Project Overview</h2>
                        <p className="font-body text-lg text-muted-foreground max-w-4xl mx-auto">{project.overview}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        <Card className="bg-primary/5 border-primary/20 h-full" rounded="20px">
                            <CardHeader>
                                <CardTitle className="font-headline text-2xl flex items-center gap-3"><Puzzle /> The Challenge</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="font-body text-muted-foreground">{project.problemStatement}</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-primary/5 border-primary/20 h-full" rounded="20px">
                            <CardHeader>
                                <CardTitle className="font-headline text-2xl flex items-center gap-3"><Target /> The Solution</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="font-body text-muted-foreground">{project.solutionMethodology}</p>
                            </CardContent>
                        </Card>
                    </div>
              
                    <Separator />

                    <div className="space-y-4">
                        <BarChart2 className="h-10 w-10 text-primary mx-auto" />
                        <h2 className="font-headline text-3xl font-bold text-center">Results & Impact</h2>
                        <p className="font-body text-lg text-muted-foreground max-w-4xl mx-auto">{project.impact}</p>
                    </div>

                </div>

                {/* Right Sidebar */}
                <div className="lg:col-span-4">
                    <div className="sticky top-24 space-y-8">
                        <Card rounded="20px">
                            <CardHeader>
                                <CardTitle className="font-headline text-2xl">Project Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className='flex items-start gap-4'>
                                    <Briefcase className='h-6 w-6 text-primary mt-1' />
                                    <div>
                                        <p className='font-semibold text-lg'>Client</p>
                                        <p className='text-muted-foreground'>{project.clientInfo}</p>
                                    </div>
                                </div>
                                <div className='flex items-start gap-4'>
                                    <Clock className='h-6 w-6 text-primary mt-1' />
                                    <div>
                                        <p className='font-semibold text-lg'>Timeline</p>
                                        <p className='text-muted-foreground'>{project.projectTimeline}</p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex flex-col gap-4">
                                {project.demoUrl && (
                                    <Button asChild size="lg" className="w-full">
                                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                            Visit Demo <ExternalLink className="ml-2 h-4 w-4" />
                                        </a>
                                    </Button>
                                )}
                                {project.repositoryUrl && (
                                    <Button asChild size="lg" className="w-full" variant="secondary">
                                        <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">
                                            View Repository <ExternalLink className="ml-2 h-4 w-4" />
                                        </a>
                                    </Button>
                                )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card rounded="20px" className="bg-primary/5">
                             <CardContent className="p-6 text-center">
                                <h3 className="font-headline text-xl font-bold mb-2">Have a Project in Mind?</h3>
                                <p className="text-muted-foreground text-sm mb-4">
                                  Let's discuss how we can bring your vision to life.
                                </p>
                                <Button asChild size="lg" className="w-full">
                                    <Link href="/contact">
                                        Get a Free Quote <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                             </CardContent>
                        </Card>
                    </div>
                </div>

              </div>
          </div>
      </section>
    </>
  );
}
