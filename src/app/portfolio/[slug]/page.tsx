
'use client';

import { projects } from '@/lib/portfolio-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Calendar, User, MessageSquare, Target, Puzzle, GitBranch, BarChart2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

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
      <section className="bg-primary/5 pt-12 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Button asChild variant="outline" className="mb-8">
                <Link href="/portfolio">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Portfolio
                </Link>
            </Button>
            <div className='grid md:grid-cols-5 gap-8'>
                <div className='md:col-span-3'>
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={1200}
                      height={800}
                      className="rounded-lg shadow-xl w-full"
                      data-ai-hint={project.dataAiHint}
                    />
                </div>
                <div className='md:col-span-2'>
                    <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground">{project.title}</h1>
                    <p className="font-body mt-4 text-lg text-muted-foreground">
                      {project.description}
                    </p>
                </div>
            </div>
        </div>
      </section>

      <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2 space-y-12">
                      <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-3xl flex items-center gap-3"><GitBranch /> Project Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="prose prose-invert max-w-none font-body text-muted-foreground" dangerouslySetInnerHTML={{ __html: project.longDescription }} />
                        </CardContent>
                      </Card>
                       <Card>
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
                       <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-3xl flex items-center gap-3"><Target /> Solution Methodology</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="font-body text-muted-foreground">{project.solutionMethodology}</p>
                        </CardContent>
                      </Card>
                       <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-3xl flex items-center gap-3"><BarChart2 /> Impact Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <p className="font-body text-muted-foreground mb-6">{project.impact.summary}</p>
                           {renderChart(project)}
                        </CardContent>
                      </Card>
                  </div>
                  <div className="space-y-8">
                      <Card>
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

                       <Card>
                          <CardHeader><CardTitle className="font-headline text-xl flex items-center gap-2"><MessageSquare /> Client Testimonial</CardTitle></CardHeader>
                          <CardContent>
                              <div className="flex flex-col items-center text-center">
                                  <p className="text-muted-foreground italic">"{project.testimonial.text}"</p>
                                  <p className="font-bold mt-4">{project.testimonial.author}</p>
                                  <p className="text-sm text-muted-foreground">{project.testimonial.title}</p>
                              </div>
                          </CardContent>
                      </Card>
                  </div>
              </div>
          </div>
      </section>

      {relatedProjects.length > 0 && (
          <section className="py-16 bg-primary/5">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <h2 className="font-headline text-3xl font-bold text-foreground mb-8 text-center">Related Projects</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                      {relatedProjects.map((related) => (
                          <Link key={related.slug} href={`/portfolio/${related.slug}`} className="group">
                             <Card className="overflow-hidden h-full">
                               <CardContent className="p-0">
                                 <div className="relative h-56">
                                   <Image
                                     src={related.image}
                                     alt={related.title}
                                     fill
                                     style={{ objectFit: 'cover' }}
                                     data-ai-hint={related.dataAiHint}
                                     className="transition-transform duration-500 group-hover:scale-105"
                                   />
                                 </div>
                                 <div className="p-6">
                                   <h3 className="font-headline text-xl font-bold mb-2">{related.title}</h3>
                                   <p className="text-muted-foreground font-body text-sm h-10">{related.description}</p>
                                    <div className="flex flex-wrap gap-2 my-4">
                                        {related.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary">{tag}</Badge>
                                        ))}
                                    </div>
                                    <span className="font-semibold text-primary group-hover:underline">View Case Study <ArrowLeft className="inline-block ml-1 h-4 w-4 transition-transform group-hover:-translate-x-1" /></span>
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
