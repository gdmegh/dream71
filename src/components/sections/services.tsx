
'use client';
import { CircleCheckBig } from 'lucide-react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Tooltip, ComposedChart, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis } from 'recharts';
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

const eGovernanceChartData = [
  { year: '2020', digitalServices: 150, citizenSatisfaction: 65 },
  { year: '2021', digitalServices: 220, citizenSatisfaction: 72 },
  { year: '2022', digitalServices: 300, citizenSatisfaction: 78 },
  { year: '2023', digitalServices: 380, citizenSatisfaction: 85 },
  { year: '2024', digitalServices: 450, citizenSatisfaction: 92 },
];

const aiAutomationChartData = [
  { department: 'HR', before: 80, after: 20 },
  { department: 'Finance', before: 120, after: 30 },
  { department: 'Operations', before: 200, after: 50 },
  { department: 'Support', before: 150, after: 40 },
];

const customSoftwareChartData = [
  { month: 'Jan', web: 30, mobile: 20 },
  { month: 'Feb', web: 45, mobile: 35 },
  { month: 'Mar', web: 60, mobile: 50 },
  { month: 'Apr', web: 75, mobile: 65 },
  { month: 'May', web: 90, mobile: 80 },
];

const gameDevPieChartData = [
    { name: 'Action', value: 400, fill: 'hsl(var(--chart-1))' },
    { name: 'Strategy', value: 300, fill: 'hsl(var(--chart-2))' },
    { name: 'RPG', value: 250, fill: 'hsl(var(--chart-3))' },
    { name: 'Puzzle', value: 200, fill: 'hsl(var(--chart-4))' },
    { name: 'Sports', value: 150, fill: 'hsl(var(--chart-5))' },
];

const chartConfig = {
  digitalServices: { label: 'Digital Services', color: 'hsl(var(--chart-1))' },
  citizenSatisfaction: { label: 'Citizen Satisfaction (%)', color: 'hsl(var(--chart-2))' },
  before: { label: 'Hours (Before)', color: 'hsl(var(--chart-4))' },
  after: { label: 'Hours (After)', color: 'hsl(var(--chart-1))' },
  web: { label: 'Web Apps', color: 'hsl(var(--chart-1))' },
  mobile: { label: 'Mobile Apps', color: 'hsl(var(--chart-2))' },
  Action: { label: 'Action', color: 'hsl(var(--chart-1))' },
  Strategy: { label: 'Strategy', color: 'hsl(var(--chart-2))' },
  RPG: { label: 'RPG', color: 'hsl(var(--chart-3))' },
  Puzzle: { label: 'Puzzle', color: 'hsl(var(--chart-4))' },
  Sports: { label: 'Sports', color: 'hsl(var(--chart-5))' },
};

const ServiceFeature = ({ title, description, points, link, reverse = false, isChart = false, chartType, index }: { title: string, description: string, points?: string[], link: string, reverse?: boolean, isChart?: boolean, chartType: 'area' | 'bar' | 'line' | 'pie', index: number }) => {
    
    const renderChart = () => {
        switch (index) {
            case 0: // e-Governance Solutions
                return (
                    <AreaChart data={eGovernanceChartData} margin={{ left: 12, right: 12 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} />
                        <YAxis />
                        <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                        <Legend />
                        <Area type="monotone" dataKey="digitalServices" stackId="1" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" />
                        <Area type="monotone" dataKey="citizenSatisfaction" stackId="2" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" />
                    </AreaChart>
                );
            case 1: // Business Automation Based on AI
                return (
                    <BarChart data={aiAutomationChartData} margin={{ left: 12, right: 12 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="department" tickLine={false} axisLine={false} tickMargin={8} />
                        <YAxis />
                        <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                        <Legend />
                        <Bar dataKey="before" fill="hsl(var(--chart-4))" radius={4} />
                        <Bar dataKey="after" fill="hsl(var(--chart-1))" radius={4} />
                    </BarChart>
                );
            case 2: // Custom Software Development
                 return (
                    <LineChart data={customSoftwareChartData} margin={{ left: 12, right: 12 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                        <YAxis />
                        <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                        <Legend />
                        <Line type="monotone" dataKey="web" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="mobile" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} />
                    </LineChart>
                );
            case 3: // Game Development
                return (
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Tooltip content={<ChartTooltipContent nameKey="name" />} />
                            <Pie
                                data={gameDevPieChartData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label
                            >
                                {gameDevPieChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                );
            default:
                return null;
        }
    }
    
    return (
      <div className={cn(
        'grid md:grid-cols-2 items-center justify-center gap-8 lg:gap-16 py-12'
      )}>
        <div className={cn(
            "md:w-full",
            reverse ? "md:order-first" : "md:order-last",
            "md:hidden"
        )}>
            <div className='md:hidden'>
                 <h3 className="text-3xl font-bold">{title}</h3>
                <p className="text-muted-foreground mt-4">{description}</p>
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
            </div>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full mt-8 md:mt-0">
                {renderChart()}
            </ChartContainer>
             <Button asChild className="mt-4 w-full md:hidden">
                <Link href={link}>
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
        <div className={cn(
            "hidden md:flex md:w-full flex-col gap-4 items-start text-left",
            reverse && "md:order-last"
        )}>
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
        <div className={cn("hidden md:flex", reverse ? 'md:order-first' : 'md:order-last')}>
             <ChartContainer config={chartConfig} className="min-h-[200px] w-full mt-8 md:mt-0">
                {renderChart()}
            </ChartContainer>
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
