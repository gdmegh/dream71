
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
  { year: '2020', projectsCompleted: 15, satisfactionRate: 88 },
  { year: '2021', projectsCompleted: 22, satisfactionRate: 91 },
  { year: '2022', projectsCompleted: 30, satisfactionRate: 94 },
  { year: '2023', projectsCompleted: 38, satisfactionRate: 96 },
  { year: '2024', projectsCompleted: 45, satisfactionRate: 97 },
];

const aiAutomationChartData = [
    { name: 'Projects Delivered', value: 120, fill: 'hsl(var(--chart-1))' },
    { name: 'Success Rate', value: 98, fill: 'hsl(var(--chart-2))' },
    { name: 'Client Satisfaction', value: 96, fill: 'hsl(var(--chart-3))' },
];


const customSoftwareChartData = [
  { platform: 'Web', projects: 85, successRate: 95 },
  { platform: 'iOS', projects: 60, successRate: 98 },
  { platform: 'Android', projects: 70, successRate: 96 },
];

const gameDevPieChartData = [
    { name: 'Projects Completed', value: 50, fill: 'hsl(var(--chart-1))' },
    { name: 'Success Rate', value: 92, fill: 'hsl(var(--chart-2))' },
    { name: 'Player Satisfaction', value: 94, fill: 'hsl(var(--chart-4))' },
];

const chartConfig = {
  projectsCompleted: { label: 'Projects Completed', color: 'hsl(var(--chart-1))' },
  satisfactionRate: { label: 'Satisfaction Rate (%)', color: 'hsl(var(--chart-2))' },
  projects: { label: 'Projects Completed', color: 'hsl(var(--chart-1))' },
  successRate: { label: 'Success Rate (%)', color: 'hsl(var(--chart-2))' },
  value: { label: 'Value', color: 'hsl(var(--chart-1))' },
  _projectsDelivered: { label: 'Projects Delivered', color: 'hsl(var(--chart-1))' },
  _successRate: { label: 'Success Rate', color: 'hsl(var(--chart-2))' },
  _clientSatisfaction: { label: 'Client Satisfaction', color: 'hsl(var(--chart-3))' },
  _projectsCompleted: { label: 'Projects Completed', color: 'hsl(var(--chart-1))' },
  _playerSatisfaction: { label: 'Player Satisfaction', color: 'hsl(var(--chart-4))' },
};

const ServiceFeature = ({ title, description, points, link, reverse = false, isChart = false, chartType, index }: { title: string, description: string, points?: string[], link: string, reverse?: boolean, isChart?: boolean, chartType: 'area' | 'bar' | 'line' | 'pie', index: number }) => {
    
    const renderChart = () => {
        switch (index) {
            case 0: // e-Governance Solutions - Composed Chart
                return (
                    <ComposedChart data={eGovernanceChartData} margin={{ left: 0, right: 0 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} />
                        <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--chart-1))" />
                        <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--chart-2))" />
                        <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                        <Legend />
                        <Bar dataKey="projectsCompleted" yAxisId="left" fill="hsl(var(--chart-1))" radius={4} />
                        <Line type="monotone" dataKey="satisfactionRate" yAxisId="right" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} />
                    </ComposedChart>
                );
            case 1: // Business Automation Based on AI - Pie Chart
                 return (
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Tooltip content={<ChartTooltipContent nameKey="name" />} />
                            <Pie
                                data={aiAutomationChartData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label
                            >
                                {aiAutomationChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                );
            case 2: // Custom Software Development - Bar Chart
                 return (
                    <BarChart data={customSoftwareChartData} margin={{ left: 0, right: 0 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="platform" tickLine={false} axisLine={false} tickMargin={8} />
                        <YAxis />
                        <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                        <Legend />
                        <Bar dataKey="projects" fill="hsl(var(--chart-1))" radius={4} />
                        <Bar dataKey="successRate" fill="hsl(var(--chart-2))" radius={4} />
                    </BarChart>
                );
            case 3: // Game Development - Area Chart
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
                                innerRadius={60}
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
