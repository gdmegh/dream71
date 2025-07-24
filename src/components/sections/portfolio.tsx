

'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { projects } from '@/lib/portfolio-data';

const ProjectCard = ({ project }: { project: typeof projects.all[0] }) => (
    <Link href={`/portfolio/${project.slug}`} className="group block">
        <Card className="overflow-hidden group w-full h-full bg-card text-card-foreground">
          <CardContent className="p-0 flex flex-col h-full">
            <div className="relative h-56">
              <Image
                src={project.image}
                alt={project.title}
                fill
                style={{ objectFit: 'cover' }}
                data-ai-hint={project.dataAiHint}
                className="transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="font-headline text-xl font-bold mb-2 text-foreground">{project.title}</h3>
              <p className="text-muted-foreground mb-4 font-body text-sm flex-grow">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
               <span className="inline-flex items-center font-semibold text-primary group-hover:underline font-body text-sm mt-auto">
                View Case Study <ArrowUpRight className="ml-1 h-4 w-4" />
              </span>
            </div>
          </CardContent>
        </Card>
    </Link>
);

export default function Portfolio() {
  const tabs = [
    { value: 'all', label: 'All Projects', projects: projects.all },
    { value: 'web', label: 'Web Apps', projects: projects.web() },
    { value: 'mobile', label: 'Mobile Apps', projects: projects.mobile() },
    { value: 'ai', label: 'AI/ML', projects: projects.ai() }
  ];

  return (
    <section id="portfolio" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">Our Portfolio</h2>
          <p className="font-body text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Take a closer look at the innovative solutions and successful partnerships that define our legacy. Here’s a brief insight into some of our most impactful projects.
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 md:max-w-xl mx-auto h-auto">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="py-2">{tab.label}</TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tab.projects.map((project, index) => (
                  <ProjectCard key={index} project={project} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
