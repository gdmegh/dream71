
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, Landmark, Workflow, Search, DraftingCompass, Code, TestTubeDiagonal, Rocket, LifeBuoy, MonitorCheck, FileDigit, Award, Building, ArrowRight, AppWindow, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ServiceChart from '@/components/charts/service-chart';


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

const FaqSection = ({ faqs }: { faqs: { question: string, answer: string }[] }) => {
    if (!faqs || faqs.length === 0) {
        return null;
    }

    return (
        <section className="space-y-12 py-16">
            <div className="space-y-2 text-center">
                <HelpCircle className="h-10 w-10 text-primary mx-auto" />
                <h2 className="font-headline text-3xl font-bold">Frequently Asked Questions</h2>
                <p className="font-body text-muted-foreground max-w-3xl mx-auto">
                    Find answers to common questions about this service.
                </p>
            </div>
            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
                {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-lg font-semibold text-left">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-base text-muted-foreground">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
};


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
                        <div className="lg:col-span-8 space-y-12">
                            <div className="relative h-[300px] md:h-[500px] w-full overflow-hidden rounded-[20px] shadow-2xl">
                                <Image
                                    src={service.image || service.imageUrl}
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
                                    <p className="font-body text-muted-foreground">{service.longDescription || service.content}</p>
                                </CardContent>
                            </Card>

                            {service.points && <KeyFeatures features={service.points} />}
                            
                            {service.differentiators && <InfoSection 
                                title="What Makes Us Different"
                                items={service.differentiators}
                                image="https://placehold.co/800x600.png"
                                imageHint="team collaboration"
                                reverse={true}
                            />}

                            <MethodologySection />
                            
                            <FaqSection faqs={service.faqs} />
                        </div>

                        <div className="lg:col-span-4">
                            <div className="sticky top-24 space-y-8">
                                <Card rounded="20px">
                                    <CardHeader>
                                        <CardTitle className="font-headline text-2xl">Success Statistics</CardTitle>
                                        <CardDescription>Our track record in e-governance.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        {service.stats && <div className='grid grid-cols-3 gap-4 text-center'>
                                            {service.stats.map((stat:any) => (
                                                <div key={stat.name} className='p-2 bg-primary/5 rounded-lg'>
                                                    <p className='text-3xl font-bold text-primary'>{stat.value}</p>
                                                    <p className='text-sm text-muted-foreground'>{stat.name}</p>
                                                </div>
                                            ))}
                                        </div>}
                                        <ServiceChart chartData={service.chartData} />
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
            
            <section className="py-16 bg-background">
                 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="grid lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-8 space-y-12">
                            <div className="relative h-[300px] md:h-[500px] w-full overflow-hidden rounded-[20px] shadow-2xl">
                                <Image
                                    src={service.image || service.imageUrl}
                                    alt={service.title}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={service.imageHint || 'service image'}
                                />
                            </div>
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
                                        dangerouslySetInnerHTML={{ __html: service.content || service.longDescription || '' }}
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
                            
                            <FaqSection faqs={service.faqs} />
                        </div>
                        
                        <div className="lg:col-span-4">
                            <div className="sticky top-24 space-y-8">
                               <Card rounded="20px">
                                    <CardHeader>
                                        <CardTitle className="font-headline text-2xl">Success Statistics</CardTitle>
                                        <CardDescription>Project growth over the years.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                         <ServiceChart chartData={service.chartData} />
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
        </>
    )
}

export default function ServiceClientPage({ service }: { service: any }) {
    if (service.template === 'egovernance') {
      return <EGovernancePage service={service} />;
    }
  
    return <DefaultServicePage service={service} />;
}
