
'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Line, LineChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const governanceChartData = [
  { year: '2020', efficiency: 65, transparency: 40 },
  { year: '2021', efficiency: 70, transparency: 50 },
  { year: '2022', efficiency: 85, transparency: 65 },
  { year: '2023', efficiency: 90, transparency: 80 },
];

const governanceChartConfig = {
    efficiency: {
        label: "Efficiency (%)",
        color: "hsl(var(--chart-1))",
    },
    transparency: {
        label: "Transparency (%)",
        color: "hsl(var(--chart-2))",
    },
};

const automationChartData = [
  { month: "January", costs: 5000, revenue: 8000 },
  { month: "February", costs: 4800, revenue: 8500 },
  { month: "March", costs: 4500, revenue: 9000 },
  { month: "April", costs: 4200, revenue: 9500 },
  { month: "May", costs: 3800, revenue: 10000 },
  { month: "June", costs: 3500, revenue: 11000 },
];

const automationChartConfig = {
  costs: {
    label: "Operational Costs",
    color: "hsl(var(--chart-4))",
  },
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
};

const GovernanceChart = () => (
    <Card className='bg-card w-full'>
        <CardHeader>
            <CardTitle>Citizen Service Improvement</CardTitle>
            <CardDescription>Efficiency and Transparency Gains (2020-2023)</CardDescription>
        </CardHeader>
        <CardContent>
             <ChartContainer config={governanceChartConfig} className="min-h-[200px] w-full">
                <ResponsiveContainer width="100%" height={500}>
                    <BarChart data={governanceChartData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="year" tickLine={false} axisLine={false} />
                        <YAxis tickLine={false} axisLine={false} />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Legend />
                        <Bar dataKey="efficiency" fill="var(--color-efficiency)" radius={4} />
                        <Bar dataKey="transparency" fill="var(--color-transparency)" radius={4} />
                    </BarChart>
                </ResponsiveContainer>
             </ChartContainer>
        </CardContent>
    </Card>
);

const AutomationChart = () => (
    <Card className='bg-card w-full'>
        <CardHeader>
            <CardTitle>Business Process Optimization</CardTitle>
            <CardDescription>Costs vs. Revenue After AI Automation</CardDescription>
        </CardHeader>
        <CardContent>
             <ChartContainer config={automationChartConfig} className="min-h-[200px] w-full">
                <ResponsiveContainer width="100%" height={500}>
                    <LineChart data={automationChartData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} />
                        <YAxis tickLine={false} axisLine={false} unit="$" />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="costs" stroke="var(--color-costs)" strokeWidth={3} />
                        <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={3} />
                    </LineChart>
                </ResponsiveContainer>
             </ChartContainer>
        </CardContent>
    </Card>
);

const services = [
  {
    title: "e-Governance Solutions",
    description: "e-Governance solutions use digital platforms to streamline government operations, enhance public services, and increase transparency and citizen engagement.",
    image: "", // Image is replaced by chart
    imageHint: "government building",
    link: "/services",
    isChart: true,
    chartType: 'governance',
  },
  {
    title: "Business Automation Based on Artificial Intelligence",
    description: "Leverage AI to automate complex business processes, improve efficiency, and drive innovation across your organization.",
    image: "",
    imageHint: "artificial intelligence",
    link: "/services",
    isChart: true,
    chartType: 'automation',
  },
  {
    title: "Web Development",
    description: "Robust, scalable, and high-performance web applications tailored to your specific business needs.",
    image: "https://placehold.co/800x600.png",
    imageHint: "web development",
    link: "/services",
    isChart: false,
  }
];

const ServiceFeature = ({ title, description, image, imageHint, link, reverse = false, isChart = false, chartType }: { title: string, description: string, image: string, imageHint: string, link: string, reverse?: boolean, isChart?: boolean, chartType?: string }) => {
    return (
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className={cn("flex flex-col items-center text-center md:items-start md:text-left", reverse && "md:order-last")}>
                <h3 className="font-headline text-3xl font-bold text-foreground mb-4">{title}</h3>
                <p className="text-muted-foreground mb-6 font-body">{description}</p>
                <Button asChild variant="outline">
                    <Link href={link}>
                        Explore More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
            <div className='flex items-center justify-center w-full'>
                {isChart ? (
                    chartType === 'governance' ? <GovernanceChart /> : <AutomationChart />
                ) : (
                    <Image
                        src={image}
                        alt={title}
                        width={800}
                        height={600}
                        className="rounded-lg shadow-xl mx-auto"
                        data-ai-hint={imageHint}
                    />
                )}
            </div>
        </div>
    );
}


export default function Services() {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">Our Core Services</h2>
            <p className="font-body text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                We offer a diverse array of specialized services designed to convert your ambitious ideas into powerful, market-ready digital solutions.
            </p>
        </div>
        <div className="space-y-16 md:space-y-24">
            {services.map((service, index) => (
                <ServiceFeature 
                    key={index}
                    {...service}
                    reverse={index === 0 ? true : index === 1 ? true : index % 2 !== 0}
                />
            ))}
        </div>
        <div className="text-center pt-16">
            <Button asChild size="lg">
                <Link href="/services">
                    View All Services <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
