
'use client';
import Link from 'next/link';
import { ArrowRight, MonitorCheck, FileDigit, Award, Building, Workflow, Bot, FileCode, BrainCircuit, Search, Scaling, Puzzle, LifeBuoy, SwatchBook, ImageIcon as ImageIconLucide, Gamepad2, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Skeleton } from '../ui/skeleton';


const ServiceChart = ({ data }: { data: any[] }) => {
    if (!data || data.length === 0) {
        return (
            <div className="w-full bg-card rounded-[20px] h-80 p-4 flex items-center justify-center">
                <p className="text-muted-foreground">No chart data available.</p>
            </div>
        );
    }

    const chartData = data.map((d: any) => ({...d, year: d.year.toString()}));
    const valueFormatter = (number: number) => `${new Intl.NumberFormat("us").format(number).toString()}`;
    
    return (
        <div className="w-full bg-card rounded-[20px] h-80 p-4">
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
                            backgroundColor: 'hsl(var(--background))',
                            borderColor: 'hsl(var(--border))',
                            color: 'hsl(var(--card-foreground))'
                        }}
                    />
                    <Area type="monotone" dataKey="Projects" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorProjects)" />
                    {chartData[0]['Adoption Rate'] && <Area type="monotone" dataKey="Adoption Rate" stroke="hsl(var(--accent))" fillOpacity={1} fill="url(#colorAdoption)" />}
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

const featureIcons: { [key: string]: React.ElementType } = {
    'Public Service Portals': MonitorCheck,
    'Digital Document Management': FileDigit,
    'Online Licensing & Permits': Award,
    'Smart City Solutions': Building,
    'Workflow Analysis': Workflow,
    'RPA': Bot,
    'Custom Scripts': FileCode,
    'AI-Powered Automation': BrainCircuit,
    'Requirement Analysis': Search,
    'Scalable Architecture': Scaling,
    'Third-Party Integrations': Puzzle,
    'Ongoing Support': LifeBuoy,
    'Game Design': SwatchBook,
    '2D & 3D Art': ImageIconLucide,
    'Unity & Unreal Engine': Gamepad2,
    'Multiplayer Integration': Users,
};

const ServiceFeature = ({ service, reverse = false }: { service: any, reverse?: boolean }) => {
    
    return (
        <div className={cn('grid md:grid-cols-2 items-center justify-center gap-8 lg:gap-16 py-12')}>
            <div className={cn("flex flex-col md:w-full items-start text-left", reverse ? "md:order-last" : "md:order-first")}>
                <h3 className="text-3xl font-bold">{service.title}</h3>
                <p className="text-muted-foreground mt-4">{service.description}</p>
                 {service.points && service.points.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mt-6">
                        {service.points.map((feature: any, index: number) => {
                            const Icon = featureIcons[feature.title] || MonitorCheck;
                            return (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="bg-primary/10 text-primary p-2 rounded-full mt-1">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground">{feature.title}</h4>
                                        <p className="text-muted-foreground text-sm">{feature.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
                 <Button asChild className="mt-8" variant="outline">
                    <Link href={`/services/${service.slug}`}>
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
            
            <div className={cn("flex flex-col items-center w-full", reverse ? 'md:order-first' : 'md:order-last')}>
                <ServiceChart data={service.chartData} />
            </div>
        </div>
    );
};

const LoadingSkeleton = () => (
    <div className="mx-auto grid max-w-5xl items-start gap-12 divide-y divide-border sm:grid-cols-1 md:gap-16 lg:max-w-none">
        {[...Array(2)].map((_, index) => (
            <div key={index} className={cn('grid md:grid-cols-2 items-center justify-center gap-8 lg:gap-16 py-12 pt-16')}>
                <div className={cn("space-y-4", index % 2 !== 0 ? "md:order-last" : "md:order-first")}>
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-5/6" />
                    <Skeleton className="h-10 w-32 mt-4" />
                </div>
                 <div className={cn("flex flex-col items-center w-full", index % 2 !== 0 ? 'md:order-first' : 'md:order-last')}>
                    <Skeleton className="w-full bg-card rounded-[20px] h-80 p-4" />
                </div>
            </div>
        ))}
    </div>
);

export default function Services() {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            const q = query(collection(db, "Service"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const servicesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setServices(servicesData);
            setLoading(false);
        };

        fetchServices();
    }, []);

  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto space-y-12 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 text-center">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-muted-foreground">
              Our Services
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Innovative Solutions Tailored for a Modern, Dynamic, and Digital-First World</h2>
            <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
             From advanced e-governance systems and intelligent automation to captivating games and custom software, we deliver bespoke digital experiences that turn your vision into reality with a steadfast commitment to excellence.
            </p>
          </div>
        </div>
        
        {loading ? <LoadingSkeleton /> : (
            <div className="mx-auto grid max-w-5xl items-start gap-12 divide-y divide-border sm:grid-cols-1 md:gap-16 lg:max-w-none">
            {services.map((service, index) => (
                <div key={service.id} className="pt-16 first:pt-0">
                    <ServiceFeature service={service} reverse={index % 2 !== 0} />
                </div>
            ))}
            </div>
        )}

      </div>
    </section>
  );
}
