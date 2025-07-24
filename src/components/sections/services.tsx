
'use client';
import { CircleCheckBig, Aperture, Cpu } from 'lucide-react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, ComposedChart, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, YAxis, XAxis } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { cn } from '@/lib/utils';
import { services, chartData } from '@/lib/services-data';


const chartConfig = {
  projects: { label: 'Projects Completed', color: 'hsl(var(--chart-1))' },
  satisfaction: { label: 'Satisfaction Rate (%)', color: 'hsl(var(--chart-2))' },
  'Success Rate': { label: 'Success Rate (%)', color: 'hsl(var(--chart-1))' },
  costSavings: { label: 'Cost Savings ($k)', color: 'hsl(var(--chart-1))', icon: Cpu },
  efficiencyGain: { label: 'Efficiency Gain (%)', color: 'hsl(var(--chart-2))', icon: Aperture },
  web: { label: 'Web Projects', color: 'hsl(var(--chart-1))' },
  mobile: { label: 'Mobile Projects', color: 'hsl(var(--chart-2))' },
  'Desktop Game': { label: 'Desktop Game', color: 'hsl(var(--chart-5))' },
  'Online Game': { label: 'Online Game', color: 'hsl(var(--chart-1))' },
  'Mobile Game': { label: 'Mobile Game', color: 'hsl(var(--chart-2))' },
  value: {
    color: 'hsl(var(--foreground))',
  },
};


const ServiceFeature = ({ title, description, points, link, reverse = false, isChart = false, index }: { title: string, description: string, points?: { title: string, icon: React.ElementType, description: string }[], link: string, reverse?: boolean, isChart?: boolean, index: number }) => {
    
    const renderChart = () => {
        const serviceChartData = chartData[services[index].slug as keyof typeof chartData];
        if(!serviceChartData) return null;

        switch (services[index].slug) {
            case 'e-governance':
                return (
                    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                        <BarChart data={serviceChartData as any[]}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Bar dataKey="value" radius={4}>
                                {(serviceChartData as any[]).map((entry) => (
                                    <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                );
            case 'business-automation':
                return (
                    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                        <ComposedChart data={serviceChartData as any[]}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="year" />
                            <YAxis yAxisId="left" orientation="left" unit="k" />
                            <YAxis yAxisId="right" orientation="right" unit="%" />
                            <Tooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Area yAxisId="left" dataKey="costSavings" type="monotone" fill="var(--color-costSavings)" fillOpacity={0.4} stroke="var(--color-costSavings)" />
                            <Line yAxisId="right" dataKey="efficiencyGain" stroke="var(--color-efficiencyGain)" type="monotone" strokeWidth={2} dot={false} />
                        </ComposedChart>
                    </ChartContainer>
                );
            case 'custom-software':
                 return (
                    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                        <AreaChart accessibilityLayer data={serviceChartData as any[]} margin={{ left: 12, right: 12, top: 10 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                            <YAxis />
                            <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                            <Legend />
                            <Area dataKey="web" type="natural" fill="var(--color-web)" fillOpacity={0.4} stroke="var(--color-web)" stackId="a" />
                            <Area dataKey="mobile" type="natural" fill="var(--color-mobile)" fillOpacity={0.4} stroke="var(--color-mobile)" stackId="a" />
                        </AreaChart>
                    </ChartContainer>
                );
            case 'game-development':
                return (
                     <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                        <BarChart data={serviceChartData as any[]}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Bar dataKey="Online Game" fill="var(--color-Online Game)" radius={4} />
                            <Bar dataKey="Mobile Game" fill="var(--color-Mobile Game)" radius={4} />
                            <Bar dataKey="Desktop Game" fill="var(--color-Desktop Game)" radius={4} />
                        </BarChart>
                    </ChartContainer>
                );
            default:
                return null;
        }
    }
    
    return (
        <div className={cn('grid md:grid-cols-2 items-center justify-center gap-8 lg:gap-16 py-12')}>
            <div className={cn("flex flex-col md:w-full items-start text-left", reverse ? "md:order-last" : "md:order-first")}>
                <h3 className="text-3xl font-bold">{title}</h3>
                <p className="text-muted-foreground mt-4">{description}</p>
                {points && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mt-6 w-full">
                        {points.map((point, i) => (
                            <div key={i} className="flex items-start text-left">
                                <point.icon className="h-8 w-8 text-primary mr-4 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold">{point.title}</h4>
                                    <p className="text-sm text-muted-foreground">{point.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                 <Button asChild className="mt-6" variant="outline">
                    <Link href={link}>
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
            
            <div className={cn("flex flex-col items-center w-full", reverse ? 'md:order-first' : 'md:order-last')}>
                <div className="w-full">
                    {renderChart()}
                </div>
            </div>
        </div>
    );
};

export default function Services() {
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
