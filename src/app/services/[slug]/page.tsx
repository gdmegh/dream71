
'use client'

import Image from 'next/image';
import { notFound } from 'next/navigation';
import CtaSection from '@/components/sections/cta-section';
import Portfolio from '@/components/sections/portfolio';
import { CheckCircle, Landmark, Workflow, Search, DraftingCompass, Code, TestTubeDiagonal, Rocket, LifeBuoy, MonitorCheck, FileDigit, Award, Building, ArrowRight, AppWindow } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const InfoSection = ({ title, description, items, image, imageHint, reverse = false }: { title: string, description?: string, items: {title: string, description: string}[], image: string, imageHint: string, reverse?: boolean }) => (
    <div className="grid md:grid-cols-2 gap-12 items-center py-8">
        <div className={reverse ? 'md:order-last' : ''}>
            <Image
                src={image}
                alt={title}
                width={800}
                height={600}
                className="rounded-[20px] shadow-xl"
                data-ai-hint={imageHint}
            />
        </div>
        <div>
            <h3 className="font-headline text-3xl font-bold text-foreground mb-4">{title}</h3>
            {description && <p className="font-body text-muted-foreground mb-6">{description}</p>}
            <ul className="space-y-4">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-bold text-lg text-foreground">{item.title}</h4>
                            <p className="text-muted-foreground">{item.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

const methodologySteps = [
    { icon: Search, title: "Discovery", description: "We begin by understanding your vision, goals, and challenges." },
    { icon: DraftingCompass, title: "Planning & Design", description: "Crafting blueprints and visual designs to map out the solution." },
    { icon: Code, title: "Development", description: "Building the core application with clean, efficient code." },
    { icon: TestTubeDiagonal, title: "Testing", description: "Rigorous QA to ensure a bug-free, reliable product." },
    { icon: Rocket, title: "Deployment", description: "Launching the solution and making it available to your users." },
    { icon: LifeBuoy, title: "Support", description: "Providing ongoing maintenance and support to ensure success." },
];

const MethodologySection = () => (
    <section className="space-y-12 text-center py-16">
        <div className="space-y-2">
            <Workflow className="h-10 w-10 text-primary mx-auto" />
            <h2 className="font-headline text-3xl font-bold">Our Methodology</h2>
            <p className="font-body text-muted-foreground max-w-3xl mx-auto">
                We follow a proven methodology to ensure project success, from initial discovery and planning through to deployment and ongoing support. Our process is transparent, collaborative, and focused on delivering value at every stage.
            </p>
        </div>
        <div className="relative w-full py-8">
             <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
                {methodologySteps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                        <div className="p-4 bg-primary/10 rounded-full text-primary mb-4">
                            <step.icon className="h-8 w-8" />
                        </div>
                        <h4 className="font-headline text-lg font-bold">{step.title}</h4>
                        <p className="text-muted-foreground text-sm">{step.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const featureIcons = {
    'Public Service Portals': MonitorCheck,
    'Digital Document Management': FileDigit,
    'Online Licensing & Permits': Award,
    'Smart City Solutions': Building
};

const KeyFeatures = ({ features }: { features: { title: string, description: string }[] }) => (
    <div className="text-center py-8">
        <h3 className="font-headline text-3xl font-bold text-foreground mb-12">Key Features</h3>
        <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
                const Icon = featureIcons[feature.title as keyof typeof featureIcons] || CheckCircle;
                return (
                    <div key={index} className="flex flex-col items-center text-center p-6 bg-primary/5 rounded-[20px]">
                        <div className="p-3 bg-primary/10 rounded-full text-primary mb-4">
                            <Icon className="h-8 w-8" />
                        </div>
                        <h4 className="font-headline text-xl font-bold text-foreground mb-2">{feature.title}</h4>
                        <p className="text-muted-foreground font-body">{feature.description}</p>
                    </div>
                );
            })}
        </div>
    </div>
);


const EGovernancePage = ({ service }: { service: any }) => {
    
    const chartData = service.chartData.map((d: any) => ({...d, year: d.year.toString()}));
    
    const valueFormatter = (number: number) => `${new Intl.NumberFormat("us").format(number).toString()}`;

    return (
        <>
            <section className="bg-primary/5 pt-20 pb-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex justify-center items-center gap-4 mb-4">
                        <div className="p-3 bg-primary/10 rounded-full text-primary">
                            <Landmark className="h-8 w-8" />
                        </div>
                    </div>
                    <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground">{service.title}</h1>
                    <p className="font-body mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                        {service.description}
                    </p>
                </div>
            </section>

             <section className="py-16 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative h-[300px] md:h-[500px] w-full overflow-hidden rounded-[20px] shadow-2xl mb-16">
                        <Image
                            src={service.image || service.imageUrl}
                            alt={service.title}
                            fill
                            className="object-cover"
                            data-ai-hint={service.imageHint}
                        />
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-8 space-y-12">
                            <Card>
                                <CardHeader>
                                    <CardTitle className='font-headline text-3xl'>Service Details</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-body text-muted-foreground">{service.longDescription || service.content}</p>
                                </CardContent>
                            </Card>

                            <KeyFeatures features={service.points} />
                            
                            <InfoSection 
                                title="What Makes Us Different"
                                items={service.differentiators}
                                image="https://placehold.co/800x600.png"
                                imageHint="team collaboration"
                                reverse={true}
                            />

                            <MethodologySection />
                        </div>

                        <div className="lg:col-span-4">
                            <div className="sticky top-24 space-y-8">
                                <Card rounded="20px">
                                    <CardHeader>
                                        <CardTitle className="font-headline text-2xl">Success Statistics</CardTitle>
                                        <CardDescription>Our track record in e-governance.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className='grid grid-cols-3 gap-4 text-center'>
                                            {service.stats.map((stat:any) => (
                                                <div key={stat.name} className='p-2 bg-primary/5 rounded-lg'>
                                                    <p className='text-3xl font-bold text-primary'>{stat.value}</p>
                                                    <p className='text-sm text-muted-foreground'>{stat.name}</p>
                                                </div>
                                            ))}
                                        </div>
                                         <div className="h-72 mt-4">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                                    <defs>
                                                        <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                                        </linearGradient>
                                                        <linearGradient id="colorAdoption" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.8}/>
                                                            <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                                                        </linearGradient>
                                                    </defs>
                                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                                    <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                                                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={valueFormatter} />
                                                    <Tooltip
                                                        contentStyle={{
                                                            backgroundColor: 'hsl(var(--card))',
                                                            borderColor: 'hsl(var(--border))',
                                                            color: 'hsl(var(--card-foreground))'
                                                        }}
                                                    />
                                                    <Area type="monotone" dataKey="Projects" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorProjects)" />
                                                    <Area type="monotone" dataKey="Adoption Rate" stroke="hsl(var(--accent))" fillOpacity={1} fill="url(#colorAdoption)" />
                                                </AreaChart>
                                            </ResponsiveContainer>
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
            
            <Portfolio />
        </>
    );
}

const DefaultServicePage = ({ service }: { service: any }) => {
    
    const chartData = service.chartData?.map((d: any) => ({...d, year: d.year.toString()}));
    const valueFormatter = (number: number) => `${new Intl.NumberFormat("us").format(number).toString()}`;

    return (
         <>
            <section className="bg-primary/5 py-20 md:py-32">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground">{service.title}</h1>
                    <p className="font-body mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                        {service.description}
                    </p>
                </div>
            </section>
            
            <section className="py-16 bg-background">
                 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="relative h-[300px] md:h-[500px] w-full overflow-hidden rounded-[20px] shadow-2xl mb-16">
                        <Image
                            src={service.image || service.imageUrl}
                            alt={service.title}
                            fill
                            className="object-cover"
                            data-ai-hint={service.imageHint || 'service image'}
                        />
                    </div>
                    
                    <div className="grid lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-8 space-y-12">
                             <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-primary/10 rounded-full text-primary">
                                            <AppWindow className="h-8 w-8" />
                                        </div>
                                        <CardTitle className='font-headline text-3xl'>About the Service</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="prose dark:prose-invert max-w-none font-body text-lg text-muted-foreground"
                                        dangerouslySetInnerHTML={{ __html: service.content || service.longDescription }}
                                    />
                                </CardContent>
                            </Card>

                           {service.points &&
                            <div className="space-y-4">
                                <h3 className="font-headline text-2xl font-bold text-center">Key Areas</h3>
                                <ul className="grid md:grid-cols-2 gap-6">
                                    {service.points.map((point: any, index: number) => (
                                        <li key={index} className="flex items-start font-body text-muted-foreground p-4 bg-primary/5 rounded-lg">
                                            <CheckCircle className="h-5 w-5 mr-3 mt-1 text-primary flex-shrink-0" />
                                            <div>
                                                <span className="font-bold text-foreground">{point.title}:</span> {point.description}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                           }
                           
                            <MethodologySection />
                        </div>
                        
                        <div className="lg:col-span-4">
                            <div className="sticky top-24 space-y-8">
                               {chartData && <Card rounded="20px">
                                    <CardHeader>
                                        <CardTitle className="font-headline text-2xl">Success Statistics</CardTitle>
                                        <CardDescription>Project growth over the years.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                         <div className="h-72 mt-4">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                                    <defs>
                                                        <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                                        </linearGradient>
                                                    </defs>
                                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                                    <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                                                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={valueFormatter} />
                                                    <Tooltip
                                                        contentStyle={{
                                                            backgroundColor: 'hsl(var(--card))',
                                                            borderColor: 'hsl(var(--border))',
                                                            color: 'hsl(var(--card-foreground))'
                                                        }}
                                                    />
                                                    <Area type="monotone" dataKey="Projects" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorProjects)" />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </CardContent>
                                </Card>}
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
            
            <Portfolio />
        </>
    )
}

export default function ServiceDetailPage({ params: { slug } }: { params: { slug: string } }) {
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    
    const fetchService = async () => {
      setLoading(true);
      try {
          const res = await fetch(`/api/services/${slug}`);
          if (!res.ok) {
              throw new Error('Service not found');
          }
          const data = await res.json();
          setService(data);
      } catch (error) {
          setService(null);
      } finally {
          setLoading(false);
      }
    };

    fetchService();
  }, [slug]);

  if (loading) {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-6 w-1/2 mx-auto mb-8" />
            <Skeleton className="h-[500px] w-full rounded-lg mb-8" />
            <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
            </div>
        </div>
    );
  }

  if (!service) {
    notFound();
  }
  
  if (service.template === 'egovernance') {
    return <EGovernancePage service={service} />;
  }
  
  return <DefaultServicePage service={service} />;
}
