

'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { cn } from '@/lib/utils';


const services = [
  {
    title: "e-Governance Solutions",
    description: "e-Governance solutions use digital platforms to streamline government operations, enhance public services, and increase transparency and citizen engagement.",
    image: "/images/e_gov.jpeg",
    imageHint: "government building",
    link: "/services",
    isChart: true,
  },
  {
    title: "Business Automation Based on Artificial Intelligence",
    description: "Leverage AI to automate complex business processes, improve efficiency, and drive innovation across your organization.",
    image: "https://placehold.co/800x600.png",
    imageHint: "artificial intelligence",
    link: "/services",
    isChart: true,
  },
  {
    title: "Web Development",
    description: "Robust, scalable, and high-performance web applications tailored to your specific business needs.",
    image: "https://placehold.co/800x600.png",
    imageHint: "web development",
    link: "/services",
    isChart: true,
  }
];

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
};

const ServiceFeature = ({ title, description, link, reverse = false, isChart = false, chartType, index }: { title: string, description: string, link: string, reverse?: boolean, isChart?: boolean, chartType: 'area' | 'bar' | 'line', index: number }) => {
    
    const renderChart = () => {
        switch (chartType) {
            case 'area':
                return (
                    <AreaChart data={chartData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="desktop" stackId="1" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" />
                        <Area type="monotone" dataKey="mobile" stackId="1" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" />
                    </AreaChart>
                );
            case 'bar':
                return (
                    <BarChart data={chartData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="desktop" fill="hsl(var(--chart-1))" />
                        <Bar dataKey="mobile" fill="hsl(var(--chart-2))" />
                    </BarChart>
                );
            case 'line':
                 return (
                    <LineChart data={chartData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="desktop" stroke="hsl(var(--chart-1))" />
                        <Line type="monotone" dataKey="mobile" stroke="hsl(var(--chart-2))" />
                    </LineChart>
                );
            default:
                return null;
        }
    }
    
    return (
      <div className={cn(
        'flex flex-col md:flex-row items-center gap-8',
        reverse && 'md:flex-row-reverse'
      )}>
        <div className="md:w-1/2">
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                {renderChart()}
            </ChartContainer>
        </div>
        <div className="md:w-1/2 flex flex-col items-center text-center gap-4">
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
            <Button asChild>
                <Link href={link}>
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
      </div>
    );
};

export default function Services() {
  const chartTypes: ('area' | 'bar' | 'line')[] = ['area', 'bar', 'line'];
  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto space-y-12 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-muted-foreground">
              Our Services
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Solutions for a Modern World</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We offer a wide range of services to help you achieve your goals. From e-governance to AI-powered automation and web development, we have you covered.
            </p>
          </div>
        </div>
        <div className="space-y-12">
          {services.map((service, index) => (
            <ServiceFeature
              key={index}
              title={service.title}
              description={service.description}
              link={service.link}
              reverse={index % 2 !== 0}
              isChart={service.isChart}
              chartType={chartTypes[index % chartTypes.length]}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
