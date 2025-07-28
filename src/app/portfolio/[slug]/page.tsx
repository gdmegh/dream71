
'use client';

import { useEffect, useState, use } from 'react';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import * as Icons from 'lucide-react';

const CoreFeatures = ({ features }: { features: { icon: string, title: string, description: string }[] }) => {
    if (!features || features.length === 0) return null;

    return (
        <section className="space-y-8">
            <h2 className="font-headline text-3xl font-bold text-foreground">Core Modules & Features</h2>
            <div className="grid md:grid-cols-2 gap-8">
                {features.map((feature, index) => {
                    const Icon = (Icons as any)[feature.icon] || Icons.CheckCircle;
                    return (
                        <div key={index} className="flex items-start gap-4">
                            <div className="bg-primary/10 text-primary p-3 rounded-full mt-1">
                                <Icon className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-headline text-xl font-semibold text-foreground">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

const DetailSection = ({ title, content }: { title: string, content: string | undefined }) => {
    if (!content) return null;
    return (
        <section className="space-y-4">
            <h2 className="font-headline text-3xl font-bold text-foreground">{title}</h2>
            <div className="prose dark:prose-invert max-w-none font-body text-lg text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </section>
    );
};

export default function PortfolioDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      if (!slug) {
        setLoading(false);
        setError(true);
        return;
      }
      setLoading(true);
      setError(false);
      try {
        const q = query(
          collection(db, 'Project'),
          where('slug', '==', slug),
          limit(1)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setProject(null);
        } else {
          const projectData = {
            id: querySnapshot.docs[0].id,
            ...querySnapshot.docs[0].data(),
          };
          setProject(projectData);
        }
      } catch (e) {
        console.error("Error fetching project:", e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
        <Skeleton className="h-6 w-1/4 mx-auto mb-8" />
        <Skeleton className="h-[500px] w-full rounded-lg mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
        </div>
      </div>
    );
  }

  if (error || !project) {
    return notFound();
  }

  return (
    <>
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground">
            {project.title}
          </h1>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 items-start">
                {/* Left Main Content */}
                <div className="lg:col-span-8 space-y-12">
                     <div className="relative h-[300px] md:h-[500px] w-full mb-8">
                      <Image
                        src={project.imageUrl || 'https://placehold.co/1200x600.png'}
                        alt={project.title}
                        fill
                        className="object-cover rounded-[20px]"
                        data-ai-hint="project image"
                      />
                    </div>
                    
                    <DetailSection title="Project Overview" content={project.content} />
                    <CoreFeatures features={project.features} />
                    <DetailSection title="Problem Statement" content={project.problemStatement} />
                    <DetailSection title="Our Solution" content={project.solution} />
                    <DetailSection title="Impact" content={project.impact} />

                </div>

                {/* Right Sticky Sidebar */}
                <aside className="lg:col-span-4 sticky top-24 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Client Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                           <p><strong>Name:</strong> {project.clientName || 'N/A'}</p>
                           {project.clientWebsite && (
                                <p><strong>Website:</strong> <a href={project.clientWebsite} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{project.clientWebsite}</a></p>
                           )}
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Timeline</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <p>{project.timeline || 'N/A'}</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Technology Stack</CardTitle>
                        </CardHeader>
                        <CardContent>
                             {project.techStack && project.techStack.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech: string) => (
                                  <Badge key={tech} variant="secondary">{tech}</Badge>
                                ))}
                              </div>
                            )}
                        </CardContent>
                    </Card>
                    {project.demoUrl && (
                         <Button asChild className="w-full" size="lg">
                            <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                View Live Demo <ExternalLink className="ml-2 h-4 w-4"/>
                            </Link>
                         </Button>
                    )}
                </aside>
            </div>
        </div>
      </section>
    </>
  );
}

    