
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

const chartData = {
    eGovernance: [
      { year: '2020', projects: 5, efficiencyGain: 10 },
      { year: '2021', projects: 8, efficiencyGain: 15 },
      { year: '2022', projects: 12, efficiencyGain: 25 },
      { year: '2023', projects: 20, efficiencyGain: 35 },
      { year: '2024', projects: 25, efficiencyGain: 45 },
    ],
    aiAutomation: [
      { name: 'Manual', hours: 40, fill: 'hsl(var(--chart-2))' },
      { name: 'AI Automated', hours: 8, fill: 'hsl(var(--chart-1))' },
    ],
    customSoftware: [
      { name: 'Web Apps', value: 85, fill: 'hsl(var(--chart-1))' },
      { name: 'Mobile Apps', value: 60, fill: 'hsl(var(--chart-2))' },
      { name: 'Desktop Apps', value: 25, fill: 'hsl(var(--chart-3))' }
    ],
    gameDev: [
      { name: 'Mobile', downloads: 5000000, fill: 'hsl(var(--chart-1))' },
      { name: 'Web', downloads: 1200000, fill: 'hsl(var(--chart-2))' },
      { name: 'PC', downloads: 800000, fill: 'hsl(var(--chart-3))' }
    ]
};

const chartConfig = {
  projects: { label: 'Projects', color: 'hsl(var(--chart-1))' },
  efficiencyGain: { label: 'Efficiency Gain (%)', color: 'hsl(var(--chart-2))' },
  hours: { label: 'Weekly Hours' },
  value: { label: 'Projects' },
  downloads: { label: 'Total Downloads' },
  satisfaction: { label: 'Satisfaction Rate (%)', color: 'hsl(var(--chart-3))' },
};

const ServiceFeature = ({ title, description, points, link, reverse = false, isChart = false, index }: { title: string, description: string, points?: string[], link: string, reverse?: boolean, isChart?: boolean, index: number }) => {
    
    const renderChart = () => {
        switch (index) {
            case 0:
                return (
                    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                        <AreaChart data={chartData.eGovernance} margin={{ left: 12, right: 12 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} />
                            <YAxis />
                            <Tooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Area dataKey="projects" type="monotone" fill="var(--color-projects)" fillOpacity={0.4} stroke="var(--color-projects)" />
                            <Area dataKey="efficiencyGain" type="monotone" fill="var(--color-efficiencyGain)" fillOpacity={0.4} stroke="var(--color-efficiencyGain)" />
                        </AreaChart>
                    </ChartContainer>
                );
            case 1:
                return (
                    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                         <BarChart data={chartData.aiAutomation} layout="vertical" margin={{ left: 12, right: 12 }}>
                            <XAxis type="number" dataKey="hours" />
                            <YAxis type="category" dataKey="name" />
                            <Tooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Bar dataKey="hours" radius={5} />
                        </BarChart>
                    </ChartContainer>
                );
            case 2:
                return (
                     <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                        <ComposedChart data={chartData.customSoftware}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Bar dataKey="value" fill="var(--color-value)" />
                        </ComposedChart>
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
      <div className={cn(
        'grid md:grid-cols-2 items-center justify-center gap-8 lg:gap-16 py-12'
      )}>
        <div className={cn(
            "md:w-full flex flex-col items-center",
            reverse ? "md:order-last" : "md:order-first"
        )}>
            <div className='text-center md:text-left'>
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
            <Button asChild className="mt-4 md:hidden w-auto px-8">
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

    