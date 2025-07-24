

'use client'

import Image from 'next/image';
import { notFound } from 'next/navigation';
import CtaSection from '@/components/sections/cta-section';
import Portfolio from '@/components/sections/portfolio';
import { services } from '@/lib/services';
import { CheckCircle, Landmark, Workflow, Search, DraftingCompass, Code, TestTubeDiagonal, Rocket, LifeBuoy } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

const MethodologyProcess = () => (
    <div className="relative">
        {/* The connecting line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block"></div>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
            {methodologySteps.map((step, index) => {
                const isLeft = index % 2 === 0;
                return (
                    <div key={index} className={`relative flex items-center gap-6 ${isLeft ? '' : 'md:flex-row-reverse'}`}>
                        {/* The circle on the line */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background hidden md:block"></div>
                        <div className="p-4 bg-primary/10 rounded-full text-primary">
                            <step.icon className="h-8 w-8" />
                        </div>
                        <div className={isLeft ? 'text-left' : 'md:text-right'}>
                            <h4 className="font-headline text-xl font-bold">{step.title}</h4>
                            <p className="text-muted-foreground">{step.description}</p>
                        </div>
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
                     <div className="grid lg:grid-cols-12 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-8 space-y-12">
                            <div className="relative h-[300px] md:h-[500px] w-full overflow-hidden rounded-[20px] shadow-2xl">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={service.imageHint}
                                />
                            </div>

                             <Card>
                                <CardHeader>
                                    <CardTitle className='font-headline text-3xl'>Service Details</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-body text-muted-foreground">{service.longDescription}</p>
                                </CardContent>
                            </Card>

                            <InfoSection 
                                title="Key Features"
                                items={service.points}
                                image="https://placehold.co/800x600.png"
                                imageHint="digital services"
                            />
                            
                            <InfoSection 
                                title="What Makes Us Different"
                                items={service.differentiators}
                                image="https://placehold.co/800x600.png"
                                imageHint="team collaboration"
                                reverse={true}
                            />

                             <section className="space-y-12 text-center">
                                <div className="space-y-2">
                                    <Workflow className="h-10 w-10 text-primary mx-auto" />
                                    <h2 className="font-headline text-3xl font-bold">Our Methodology</h2>
                                    <p className="font-body text-muted-foreground max-w-3xl mx-auto">
                                        We follow a proven methodology to ensure project success, from initial discovery and planning through to deployment and ongoing support. Our process is transparent, collaborative, and focused on delivering value at every stage.
                                    </p>
                                </div>
                                <div className="relative w-full py-8">
                                    <MethodologyProcess />
                                </div>
                            </section>

                        </div>

                        {/* Right Sidebar */}
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
                            </div>
                        </div>
                     </div>
                </div>
            </section>
            
            <Portfolio />

            <CtaSection />
        </>
    );
}

const DefaultServicePage = ({ service }: { service: any }) => {
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
            
            <section className="py-20 md:py-32">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="font-headline text-3xl font-bold text-foreground mb-4">About the Service</h2>
                            <p className="font-body text-muted-foreground mb-6">
                                {service.longDescription}
                            </p>
                            <h3 className="font-headline text-2xl font-bold text-foreground mb-4">Key Areas</h3>
                                <ul className="space-y-3">
                                    {service.points.map((point: any, index: number) => (
                                        <li key={index} className="flex items-start font-body text-muted-foreground">
                                            <CheckCircle className="h-5 w-5 mr-3 mt-1 text-primary flex-shrink-0" />
                                            <div>
                                                <span className="font-bold text-foreground">{point.title}:</span> {point.description}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                        </div>
                        <div className="md:order-last">
                            <Image
                                src={service.image}
                                alt={service.title}
                                width={800}
                                height={600}
                                className="rounded-[20px] shadow-xl"
                                data-ai-hint={service.imageHint}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <Portfolio />

            <CtaSection />
        </>
    )
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services.find(s => s.slug === params.slug);

  if (!service) {
    notFound();
  }
  
  if (service.slug === 'e-governance') {
    return <EGovernancePage service={service} />;
  }
  
  return <DefaultServicePage service={service} />;

}
