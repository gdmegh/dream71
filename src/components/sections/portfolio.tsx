
'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { collection, getDocs, query, orderBy, limit, where } from 'firebase/firestore';
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
import { Badge } from '../ui/badge';

const PortfolioCard = ({ project }: { project: any }) => (
    <Link href={`/portfolio/${project.slug}`} className="group block h-full">
        <Card rounded="20px" className="overflow-hidden group w-full h-full bg-card text-card-foreground">
          <CardContent className="p-0 flex flex-col h-full">
            <div className="relative h-56">
              <Image
                src={project.imageUrl || 'https://placehold.co/600x400.png'}
                alt={project.title}
                fill
                style={{ objectFit: 'cover' }}
                data-ai-hint={'portfolio project image'}
                className="transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-headline text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                </h3>
                <p className="text-muted-foreground font-body text-sm mb-4 line-clamp-2 flex-grow">
                    {project.summary}
                </p>
                 {project.techStack && project.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                        {project.techStack.slice(0, 3).map((tech: string) => (
                            <Badge key={tech} variant="secondary">{tech}</Badge>
                        ))}
                    </div>
                )}
                <div className="mt-auto">
                     <span className="inline-flex items-center font-semibold text-primary group-hover:underline font-body text-sm">
                        View Project <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                </div>
            </div>
          </CardContent>
        </Card>
    </Link>
);


const LoadingSkeleton = () => (
    <Carousel className="w-full">
        <CarouselContent className="-ml-8">
            {[...Array(4)].map((_, i) => (
                <CarouselItem key={i} className="pl-8 md:basis-1/2">
                    <Card rounded="20px" className="overflow-hidden group w-full h-full bg-card text-card-foreground">
                        <CardContent className="p-0 flex flex-col h-full">
                            <Skeleton className="h-56 w-full" />
                            <div className="p-6 space-y-4">
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        </CardContent>
                    </Card>
                </CarouselItem>
            ))}
        </CarouselContent>
    </Carousel>
);

export default function Portfolio() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
   const plugin = useRef(
      Autoplay({ delay: 5000, stopOnInteraction: true })
    );

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const q = query(
        collection(db, "Project"), 
        where("displayOrder", ">", 0),
        orderBy("displayOrder", "asc"),
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
    <section id="portfolio" className="py-20 bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">Our Recent Work</h2>
          <p className="font-body text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Explore a selection of our finest projects, showcasing our expertise in creating impactful digital solutions.
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
                      <CarouselItem key={project.id} className="pl-8 md:basis-1/2">
                          <div className="h-full">
                           <PortfolioCard project={project} />
                          </div>
                      </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
            </Carousel>
        ) : (
            <p className="text-center text-muted-foreground">No projects to display.</p>
        )}

        <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg" width="auto">
                <Link href="/portfolio">
                    View All Projects <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
        </div>
        
      </div>
    </section>
  );
}
