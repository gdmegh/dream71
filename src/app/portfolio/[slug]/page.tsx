
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { collection, query, where, getDocs, limit, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, CheckCircle } from 'lucide-react';
import * as Icons from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Metadata } from 'next';

type PageProps = {
  params: {
    slug: string;
  };
};

async function getProject(slug: string) {
    if (!slug) return null;
    try {
        const q = query(
            collection(db, 'Project'),
            where('slug', '==', slug),
            limit(1)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return null;
        }

        const projectData = {
            id: querySnapshot.docs[0].id,
            ...querySnapshot.docs[0].data(),
        };
        return JSON.parse(JSON.stringify(projectData));
    } catch (e) {
        console.error("Error fetching project:", e);
        return null;
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = await getProject(params.slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | Dream71 Portfolio`,
    description: project.summary,
  };
}


const CoreFeaturesSection = ({ features }: { features: { icon: string, title: string, description: string }[] }) => {
    if (!features || features.length === 0) return null;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Core Modules &amp; Features</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8">
                 {features.map((feature, index) => {
                    const Icon = (Icons as any)[feature.icon] || CheckCircle;
                    return (
                        <div key={index} className="flex items-start gap-4">
                            <div className="bg-primary/10 text-primary p-3 rounded-full mt-1">
                                <Icon className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-headline text-lg font-semibold text-foreground">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </div>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
};

const DetailSection = ({ title, content }: { title: string, content?: string }) => {
    if (!content) return null;
    return (
        <Card className='h-full'>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="prose dark:prose-invert max-w-none font-body text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </CardContent>
        </Card>
    );
};

export default async function PortfolioDetailPage({ params }: PageProps) {
  const { slug } = params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }
  
  const chartData = project.chartData || [];
  const valueFormatter = (number: number) => `${new Intl.NumberFormat("us").format(number).toString()}`;
  const dataKey = Object.keys(chartData[0] || {}).find(key => key.toLowerCase() !== 'month' && key.toLowerCase() !== 'year' && key.toLowerCase() !== 'name');


  return (
    <>
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-headline text-3xl md:text-4xl font-bold text-foreground">
            {project.title}
          </h1>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 items-start">
                {/* Left Main Content */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="relative h-[300px] md:h-[500px] w-full">
                        <Image
                            src={project.imageUrl || 'https://placehold.co/1200x600.png'}
                            alt={project.title}
                            fill
                            className="object-cover rounded-[20px]"
                            data-ai-hint="project image"
                        />
                    </div>
                     <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl">Project Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="prose dark:prose-invert max-w-none font-body text-muted-foreground"
                                dangerouslySetInnerHTML={{ __html: project.content }}
                            />
                        </CardContent>
                    </Card>

                    <div className="grid md:grid-cols-2 gap-8">
                        <DetailSection title="Challenges" content={project.challenges} />
                        <DetailSection title="Our Solution" content={project.solution} />
                    </div>

                    <CoreFeaturesSection features={project.features} />
                                        
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl">Impact</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="prose dark:prose-invert max-w-none font-body text-muted-foreground"
                                dangerouslySetInnerHTML={{ __html: project.impact }}
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Right Sticky Sidebar */}
                <aside className="lg:col-span-4 sticky top-24 space-y-8">
                    {chartData.length > 0 && dataKey && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline text-2xl">Project Growth</CardTitle>
                                <CardDescription>Key metrics demonstrating the project's success over time.</CardDescription>
                            </CardHeader>
                            <CardContent className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={valueFormatter} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'hsl(var(--card))',
                                                borderColor: 'hsl(var(--border))',
                                                color: 'hsl(var(--card-foreground))'
                                            }}
                                        />
                                        <Area type="monotone" dataKey={dataKey} stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorMetric)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    )}
                    <Card>
                        <CardHeader>
                            <CardTitle>Client Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                           <p><strong>Name:</strong> {project.clientName || 'N/A'}</p>
                           {project.clientWebsite && (
                                <p><strong>Website:</strong> <a href={project.clientWebsite} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">{project.clientWebsite}</a></p>
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

