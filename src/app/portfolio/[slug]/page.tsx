
'use client';

import { projects } from '@/lib/portfolio-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Calendar, User, MessageSquare, Target, Puzzle, GitBranch, BarChart2, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import React from 'react';

const chartConfig = {
  'Conversion Rate': { label: 'Conversion Rate (%)', color: 'hsl(var(--chart-1))' },
  'Page Load (s)': { label: 'Page Load (s)', color: 'hsl(var(--chart-2))' },
  'User Adoption': { label: 'User Adoption', color: 'hsl(var(--chart-1))' },
  'Transaction Volume': { label: 'Transaction Volume', color: 'hsl(var(--chart-2))' },
  'Retrieval Time (min)': { label: 'Retrieval Time (min)', color: 'hsl(var(--chart-1))' },
  'Admin Errors (%)': { label: 'Admin Errors (%)', color: 'hsl(var(--chart-2))' },
  'Resolution Time (min)': { label: 'Resolution Time (min)', color: 'hsl(var(--chart-1))' },
  'Cost per query ($)': { label: 'Cost per query ($)', color: 'hsl(var(--chart-2))' },
};

export default function PortfolioDetailPage({ params }: { params: { slug: string } }) {
  const project = projects.all.find(p => p.slug === params.slug);
  const relatedProjects = projects.all.filter(p => p.category === project?.category && p.slug !== project?.slug).slice(0, 2);

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: false })
  );

  if (!project) {
    notFound();
  }

  const renderChart = (project: typeof projects.all[0]) => {
    if (!project.impact?.chartData) return null;

    const keys = Object.keys(project.impact.chartData[0]).filter(key => key !== 'name');

    return (
      <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
        <BarChart data={project.impact.chartData}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
          <YAxis />
          <Tooltip content={<ChartTooltipContent />} />
          <Legend />
          {keys.map((key, index) => (
             <Bar key={key} dataKey={key} fill={`hsl(var(--chart-${index + 1}))`} radius={4} />
          ))}
        </BarChart>
      </ChartContainer>
    )
  }

  return (
    <>
      <section className="bg-primary/5 pt-20 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground">{project.title}</h1>
            <p className="font-body mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              {project.description}
            </p>
        </div>
      </section>

      <section className="pb-12 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Carousel
                plugins={[plugin.current]}
                className="w-full"
                opts={{ loop: true }}
            >
                <CarouselContent>
                    {project.gallery.map((image, index) => (
                        <CarouselItem key={index} className="relative h-[300px] sm:h-[400px] md:h-[600px]">
                            <Image
                                src={image.src}
                                alt={`${project.title} gallery image ${index + 1}`}
                                fill
                                className="rounded-lg shadow-2xl object-cover"
                                data-ai-hint={image.dataAiHint}
                                priority={index === 0}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
            </Carousel>
        </div>
      </section>

      <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-3 gap-12 items-start">
                  <div className="lg:col-span-2 space-y-12">
                      <Card rounded="20px">
                        <CardHeader>
                            <CardTitle className="font-headline text-3xl flex items-center gap-3"><GitBranch /> Project Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="prose prose-invert max-w-none font-body text-muted-foreground" dangerouslySetInnerHTML={{ __html: project.longDescription }} />
                        </CardContent>
                      </Card>
                       <Card rounded="20px">
                        <CardHeader>
                            <CardTitle className="font-headline text-3xl flex items-center gap-3"><Puzzle /> Problem & Objective</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="font-headline text-xl font-semibold text-foreground mb-2">Problem Statement</h3>
                                <p className="font-body text-muted-foreground">{project.problemStatement}</p>
                            </div>
                            <div>
                                <h3 className="font-headline text-xl font-semibold text-foreground mb-2">Core Objective</h3>
                                <p className="font-body text-muted-foreground">{project.coreObjective}</p>
                            </div>
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
                            <CardTitle className="font-headline text-3xl flex items-center gap-3"><BarChart2 /> Impact Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <p className="font-body text-muted-foreground mb-6">{project.impact.summary}</p>
                           {renderChart(project)}
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
                                    <p className='text-muted-foreground'>{project.client}</p>
                                </div>
                              </div>
                               <div className='flex items-center gap-3'>
                                <Calendar className='h-5 w-5 text-primary' />
                                <div>
                                    <p className='font-semibold'>Timeline</p>
                                    <p className='text-muted-foreground'>{project.timeline}</p>
                                </div>
                              </div>
                               <div className='flex items-center gap-3'>
                                <Puzzle className='h-5 w-5 text-primary' />
                                <div>
                                    <p className='font-semibold'>Tech Stack</p>
                                     <div className="flex flex-wrap gap-1 mt-1">
                                          {project.tags.map((tag) => (
                                              <Badge key={tag} variant="secondary">{tag}</Badge>
                                          ))}
                                      </div>
                                </div>
                              </div>
                               {project.link && (
                                 <Button asChild className="w-full mt-4">
                                     <a href={project.link} target="_blank" rel="noopener noreferrer">
                                         Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                                     </a>
                                 </Button>
                               )}
                          </CardContent>
                      </Card>

                       <Card rounded="20px">
                          <CardHeader><CardTitle className="font-headline text-xl flex items-center gap-2"><MessageSquare /> Client Testimonial</CardTitle></CardHeader>
                          <CardContent>
                              <div className="flex flex-col items-center text-center">
                                  <p className="text-muted-foreground italic">"{project.testimonial.text}"</p>
                                  <p className="font-bold mt-4">{project.testimonial.author}</p>
                                  <p className="text-sm text-muted-foreground">{project.testimonial.title}</p>
                              </div>
                          </CardContent>
                      </Card>
                  </aside>
              </div>
          </div>
      </section>

      {relatedProjects.length > 0 && (
          <section className="py-16 bg-primary/5">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <h2 className="font-headline text-3xl font-bold text-foreground mb-8 text-center">Related Projects</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                      {relatedProjects.map((related) => (
                           <Link key={related.slug} href={`/portfolio/${related.slug}`} className="group block">
                                <Card rounded="20px" className="overflow-hidden group w-full h-full bg-card text-card-foreground">
                                  <CardContent className="p-0 flex flex-col h-full">
                                    <div className="relative h-56">
                                      <Image
                                        src={related.image}
                                        alt={related.title}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        data-ai-hint={related.dataAiHint}
                                        className="transition-transform duration-500 group-hover:scale-105"
                                      />
                                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                      <h3 className="font-headline text-xl font-bold mb-2 text-foreground">{related.title}</h3>
                                      <p className="text-muted-foreground font-body text-sm flex-grow">{related.description}</p>
                                      <div className="flex flex-wrap gap-2 my-4">
                                        {related.tags.slice(0, 3).map((tag) => (
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
                      ))}
                  </div>
              </div>
          </section>
      )}
    </>
  );
}
