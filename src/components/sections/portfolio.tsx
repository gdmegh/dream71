

'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Skeleton } from '../ui/skeleton';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from '../ui/button';

const ProjectCard = ({ project }: { project: any }) => (
    <Link href={`/portfolio/${project.slug}`} className="group block h-full">
        <Card rounded="20px" className="overflow-hidden group w-full h-full bg-card text-card-foreground flex flex-col">
          <div className="relative h-56">
              <Image
                src={(project.imageUrls && project.imageUrls[0]) || project.imageUrl || 'https://placehold.co/600x400.png'}
                alt={project.title}
                fill
                style={{ objectFit: 'cover' }}
                data-ai-hint={'project image'}
                className="transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
          </div>
          <CardContent className="p-6 flex flex-col flex-grow">
              <h3 className="font-headline text-xl font-bold mb-2 text-foreground line-clamp-2">{project.title}</h3>
              <div className="flex-grow"></div>
              <span className="inline-flex items-center font-semibold text-primary group-hover:underline font-body text-sm mt-4">
                View Case Study <ArrowUpRight className="ml-1 h-4 w-4" />
              </span>
          </CardContent>
        </Card>
    </Link>
);


const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[...Array(3)].map((_, i) => (
       <Card key={i} rounded="20px" className="overflow-hidden group w-full h-full bg-card text-card-foreground">
          <CardContent className="p-0 flex flex-col h-full">
            <Skeleton className="h-56 w-full" />
            <div className="p-6 space-y-4">
               <Skeleton className="h-6 w-3/4" />
               <Skeleton className="h-4 w-full" />
               <Skeleton className="h-4 w-1/2" />
            </div>
            </CardContent>
        </Card>
    ))}
  </div>
);

export default function Portfolio() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
   const plugin = useRef(
      Autoplay({ delay: 3000, stopOnInteraction: true })
    );

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const q = query(
        collection(db, "Project"), 
        where("isPublic", "==", true),
        orderBy("createdAt", "desc"),
        limit(9)
      );
      const querySnapshot = await getDocs(q);
      const projectsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(projectsData);
      setLoading(false);
    };

    fetchProjects();
  }, []);


  return (
    <section id="portfolio" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">Our Portfolio</h2>
          <p className="font-body text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Take a closer look at the innovative solutions and successful partnerships that define our legacy. Here’s a brief insight into some of our most impactful projects.
          </p>
        </div>

        {loading ? <LoadingSkeleton /> : projects.length > 0 ? (
            <Carousel
                plugins={[plugin.current]}
                opts={{
                    align: "start",
                    loop: true,
                }}
                 onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
                className="w-full"
            >
                <CarouselContent className="-ml-8">
                    {projects.map((project) => (
                      <CarouselItem key={project.id} className="pl-8 md:basis-1/2 lg:basis-1/3">
                          <div className="h-full">
                           <ProjectCard project={project} />
                          </div>
                      </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
            </Carousel>
        ) : (
            <p className="text-center text-muted-foreground">No projects found.</p>
        )}

        <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg">
                <Link href="/portfolio">
                    View All Projects <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
        </div>
        
      </div>
    </section>
  );
}
