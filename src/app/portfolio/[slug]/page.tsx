
'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
          <div className="flex items-center justify-center gap-2 mt-4 text-muted-foreground">
            <Calendar className="h-5 w-5" />
            <span>{new Date(project.createdAt?.toDate()).toLocaleDateString()}</span>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="relative h-[300px] md:h-[500px] w-full mb-8">
              <Image
                src={project.imageUrl || 'https://placehold.co/1200x600.png'}
                alt={project.title}
                fill
                className="object-cover rounded-[20px]"
                data-ai-hint="project image"
              />
            </div>
             {project.techStack && project.techStack.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {project.techStack.map((tech: string) => (
                  <Badge key={tech} variant="secondary">{tech}</Badge>
                ))}
              </div>
            )}
            <div
              className="prose dark:prose-invert max-w-none font-body text-lg text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: project.content }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
