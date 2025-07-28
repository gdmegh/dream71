
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { collection, query, where, getDocs, limit, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, CheckCircle } from 'lucide-react';
import * as Icons from 'lucide-react';
import type { Metadata } from 'next';
import PortfolioChart from '@/components/charts/portfolio-chart';

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

                
                <aside className="lg:col-span-4 sticky top-24 space-y-8">
                    <PortfolioChart chartData={chartData} />
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
