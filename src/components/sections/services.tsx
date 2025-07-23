
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
    link: "/services/e-governance",
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
    link: "/services/business-automation",
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
    link: "/services/custom-software",
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
    link: "/services/game-development",
    isChart: true,
  }
];

const chartData = {
    eGovernance: [
      { year: '2020', projects: 5, satisfaction: 85 },
      { year: '2021', projects: 8, satisfaction: 88 },
      { year: '2022', projects: 12, satisfaction: 92 },
      { year: '2023', projects: 20, satisfaction: 95 },
      { year: '2024', projects: 25, satisfaction: 97 },
    ],
    aiAutomation: [
      { year: '2021', costSavings: 50, efficiencyGain: 20 },
      { year: '2022', costSavings: 75, efficiencyGain: 35 },
      { year: '2023', costSavings: 120, efficiencyGain: 50 },
      { year: '2024', costSavings: 200, efficiencyGain: 65 },
    ],
    customSoftware: [
      { name: 'Web Apps', completed: 85, successRate: 95 },
      { name: 'Mobile Apps', completed: 60, successRate: 98 },
      { name: 'Desktop Apps', completed: 25, successRate: 92 }
    ],
    gameDev: [
      { name: 'Mobile', downloads: 5000000, rating: 4.8 },
      { name: 'Web', downloads: 1200000, rating: 4.5 },
      { name: 'PC', downloads: 800000, rating: 4.2 }
    ]
};

const chartConfig = {
  projects: { label: 'Projects Completed', color: 'hsl(var(--chart-1))' },
  satisfaction: { label: 'Satisfaction Rate (%)', color: 'hsl(var(--chart-2))' },
  costSavings: { label: 'Cost Savings ($k)', color: 'hsl(var(--chart-1))' },
  efficiencyGain: { label: 'Efficiency Gain (%)', color: 'hsl(var(--chart-2))' },
  completed: { label: 'Projects Completed' },
  successRate: { label: 'Success Rate (%)', color: 'hsl(var(--chart-3))' },
  downloads: { label: 'Total Downloads', color: 'hsl(var(--chart-1))' },
  rating: { label: 'Average Rating', color: 'hsl(var(--chart-2))' }
};

const ServiceFeature = ({ title, description, points, link, reverse = false, isChart = false, index }: { title: string, description: string, points?: string[], link: string, reverse?: boolean, isChart?: boolean, index: number }) => {
    
    const renderChart = () => {
        switch (index) {
            case 0:
                return (
                    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                        <AreaChart accessibilityLayer data={chartData.eGovernance} margin={{ left: 12, right: 12 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(0, 4)} />
                            <YAxis />
                            <Tooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Area dataKey="projects" type="monotone" fill="var(--color-projects)" fillOpacity={0.4} stroke="var(--color-projects)" />
                            <Area dataKey="satisfaction" type="monotone" fill="var(--color-satisfaction)" fillOpacity={0.4} stroke="var(--color-satisfaction)" />
                        </AreaChart>
                    </ChartContainer>
                );
            case 1:
                return (
                    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                        <ComposedChart data={chartData.aiAutomation}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="year" />
                            <YAxis yAxisId="left" orientation="left" label={{ value: 'Cost Savings ($k)', angle: -90, position: 'insideLeft' }} />
                            <YAxis yAxisId="right" orientation="right" label={{ value: 'Efficiency Gain (%)', angle: -90, position: 'insideRight' }} />
                            <Tooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Bar yAxisId="left" dataKey="costSavings" fill="var(--color-costSavings)" />
                            <Line yAxisId="right" dataKey="efficiencyGain" stroke="var(--color-efficiencyGain)" type="monotone" />
                        </ComposedChart>
                    </ChartContainer>
                );
            case 2:
                return (
                     <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                        <BarChart accessibilityLayer data={chartData.customSoftware}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Bar dataKey="completed" fill="var(--color-completed)" radius={5}>
                               {chartData.customSoftware.map((entry, idx) => (
                                    <Cell key={`cell-${idx}`} fill={entry.fill} />
                                ))}
                            </Bar>
                             <Bar dataKey="successRate" fill="var(--color-successRate)" radius={5} />
                        </BarChart>
                    </ChartContainer>
                );
            case 3:
                return (
                    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                         <PieChart>
                            <Tooltip content={<ChartTooltipContent nameKey="name" />} />
                            <Pie
                                data={chartData.gameDev}
                                dataKey="downloads"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label
                            >
                                {chartData.gameDev.map((entry, idx) => (
                                    <Cell key={`cell-${idx}`} fill={entry.fill} />
                                ))}
                            </Pie>
                            <Legend />
                        </PieChart>
                    </ChartContainer>
                );
            default:
                return null;
        }
    }
    
    return (
        <div className={cn('grid md:grid-cols-2 items-center justify-center gap-8 lg:gap-16 py-12')}>
            <div className={cn("md:w-full flex flex-col items-center", reverse ? "md:order-last" : "md:order-first")}>
                <div className='text-center md:text-left'>
                    <h3 className="text-3xl font-bold">{title}</h3>
                    <p className="text-muted-foreground mt-4">{description}</p>
                    {points && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mt-4">
                            {points.map((point, i) => (
                                <div key={i} className="flex items-center text-muted-foreground">
                                    <CircleCheckBig className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                                    <span>{point}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    <Button asChild className="mt-6 hidden md:inline-flex">
                        <Link href={link}>
                            Learn More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
            
            <div className={cn("flex flex-col items-center w-full", reverse ? 'md:order-first' : 'md:order-last')}>
                <div className="w-full">
                    {renderChart()}
                </div>
                <Button asChild className="mt-4 md:hidden w-full max-w-xs">
                    <Link href={link}>
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default function Services() {
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
                index={index}
                />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
