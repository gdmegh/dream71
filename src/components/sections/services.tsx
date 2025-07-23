

'use client';
import { CheckCircle, CircleCheckBig } from 'lucide-react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis, ComposedChart, PieChart, Pie, Cell } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { cn } from '@/lib/utils';


const services = [
  {
    title: "e-Governance Solutions",
    description: "e-Governance solutions use digital platforms to streamline government operations, enhance public services, and increase transparency and citizen engagement.",
    points: [
        "Digital Transformation",
        "Citizen Engagement",
        "Operational Efficiency",
        "Data Security"
    ],
    image: "/images/e_gov.jpeg",
    imageHint: "government building",
    link: "/services",
    isChart: true,
  },
  {
    title: "Business Automation Based on Artificial Intelligence",
    description: "Leverage AI to automate complex business processes, improve efficiency, and drive innovation across your organization.",
    points: [
        "Workflow Automation",
        "Reduced Errors",
        "Cost Savings",
        "Actionable Insights"
    ],
    image: "https://placehold.co/800x600.png",
    imageHint: "artificial intelligence",
    link: "/services",
    isChart: true,
  },
    {
    title: "Custom Software Development",
    description: "We build tailored software solutions, including web, iOS, and Android applications, designed to meet your unique business requirements and deliver a seamless user experience across all platforms.",
    points: [
        "Responsive Web Design",
        "Native Mobile Apps",
        "Scalable Architecture",
        "High Performance"
    ],
    image: "https://placehold.co/800x600.png",
    imageHint: "custom software",
    link: "/services",
    isChart: true,
  },
  {
    title: "Game Development",
    description: "Developing immersive and interactive games for mobile and web platforms.",
    points: [
        "Cross-Platform Support",
        "Engaging Gameplay",
        "Monetization Strategy",
        "Multiplayer Functionality"
    ],
    image: "https://placehold.co/800x600.png",
    imageHint: "video game",
    link: "/services",
    isChart: true,
  }
];

const chartData = [
  { year: '2014', desktop: 100, mobile: 60 },
  { year: '2015', desktop: 125, mobile: 75 },
  { year: '2016', desktop: 150, mobile: 90 },
  { year: '2017', desktop: 180, mobile: 110 },
  { year: '2018', desktop: 215, mobile: 135 },
  { year: '2019', desktop: 250, mobile: 160 },
  { year: '2020', desktop: 280, mobile: 185 },
  { year: '2021', desktop: 310, mobile: 210 },
  { year: '2022', desktop: 345, mobile: 235 },
  { year: '2023', desktop: 380, mobile: 260 },
  { year: '2024', desktop: 410, mobile: 285 },
  { year: '2025', desktop: 440, mobile: 310 },
];

const pieChartData = [
    { name: 'Action', value: 400, fill: 'hsl(var(--chart-1))' },
    { name: 'Strategy', value: 300, fill: 'hsl(var(--chart-2))' },
    { name: 'RPG', value: 300, fill: 'hsl(var(--chart-3))' },
    { name: 'Puzzle', value: 200, fill: 'hsl(var(--chart-4))' },
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
  Action: { label: 'Action', color: 'hsl(var(--chart-1))' },
  Strategy: { label: 'Strategy', color: 'hsl(var(--chart-2))' },
  RPG: { label: 'RPG', color: 'hsl(var(--chart-3))' },
  Puzzle: { label: 'Puzzle', color: 'hsl(var(--chart-4))' },
};

const ServiceFeature = ({ title, description, points, link, reverse = false, isChart = false, chartType, index }: { title: string, description: string, points?: string[], link: string, reverse?: boolean, isChart?: boolean, chartType: 'area' | 'bar' | 'line' | 'pie', index: number }) => {
    
    const renderChart = () => {
        switch (chartType) {
            case 'area':
                return (
                    <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} />
                        <YAxis />
                        <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                        <Area type="monotone" dataKey="desktop" stackId="1" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" />
                        <Area type="monotone" dataKey="mobile" stackId="1" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" />
                    </AreaChart>
                );
            case 'bar':
                return (
                    <BarChart data={chartData} margin={{ left: 12, right: 12 }}>
                         <CartesianGrid vertical={false} />
                        <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} />
                        <YAxis />
                        <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                        <Legend />
                        <Bar dataKey="desktop" fill="hsl(var(--chart-1))" radius={4} />
                        <Bar dataKey="mobile" fill="hsl(var(--chart-2))" radius={4} />
                    </BarChart>
                );
            case 'line':
                 return (
                    <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} />
                        <YAxis />
                        <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                        <Legend />
                        <Line type="monotone" dataKey="desktop" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="mobile" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} />
                    </LineChart>
                );
            case 'pie':
                return (
                    <PieChart>
                        <Tooltip content={<ChartTooltipContent nameKey="name" />} />
                        <Pie
                            data={pieChartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            label
                        >
                             {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>
                         <Legend />
                    </PieChart>
                );
            default:
                return null;
        }
    }
    
    return (
      <div className={cn(
        'grid md:grid-cols-2 items-center justify-center gap-8 lg:gap-16 py-12'
      )}>
        <div className={cn("md:w-full", reverse ? "md:order-first" : "md:order-last", "order-last md:order-none")}>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                {renderChart()}
            </ChartContainer>
        </div>
        <div className="md:w-full flex flex-col gap-4 items-start text-left">
            <h3 className="text-3xl font-bold">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
            {points && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mt-4">
                    {points.map((point, i) => (
                        <div key={i} className="flex items-start text-muted-foreground">
                            <CircleCheckBig className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-1 md:mt-0" />
                            <span>{point}</span>
                        </div>
                    ))}
                </div>
            )}
            <Button asChild className="mt-4">
                <Link href={link}>
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
      </div>
    );
};

export default function Services() {
  const chartTypes: ('area' | 'bar' | 'line' | 'pie')[] = ['area', 'bar', 'line', 'pie'];
  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-background">
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
        <div className="mx-auto grid max-w-5xl items-start gap-12 divide-y divide-border sm:grid-cols-1 md:gap-16 lg:max-w-none">
          {services.map((service, index) => (
            <div key={index} className="pt-16 first:pt-0">
                <ServiceFeature
                key={index}
                title={service.title}
                description={service.description}
                points={service.points}
                link={service.link}
                reverse={index % 2 !== 0}
                isChart={service.isChart}
                chartType={chartTypes[index % chartTypes.length]}
                index={index}
                />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
