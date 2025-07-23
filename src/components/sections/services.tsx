
'use client';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import { cn } from '@/lib/utils';


const services = [
  {
    title: "e-Governance Solutions",
    description: "e-Governance solutions use digital platforms to streamline government operations, enhance public services, and increase transparency and citizen engagement.",
    points: [
        "25% reduction in administrative processing times.",
        "40% increase in citizen engagement through digital portals.",
        "15% decrease in operational costs for public services."
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
        "30% increase in workflow efficiency with AI-driven automation.",
        "50% reduction in manual data entry errors.",
        "20% cost savings through automated resource allocation."
    ],
    image: "https://placehold.co/800x600.png",
    imageHint: "artificial intelligence",
    link: "/services",
    isChart: true,
  },
  {
    title: "Web Development",
    description: "Robust, scalable, and high-performance web applications tailored to your specific business needs.",
    points: [
      "Improve user engagement with responsive and intuitive design.",
      "Ensure security and reliability with industry best practices.",
      "Achieve faster load times and better performance."
    ],
    image: "https://placehold.co/800x600.png",
    imageHint: "web development",
    link: "/services",
    isChart: true,
  },
  {
    title: "iOS App Development",
    description: "Creating seamless and engaging native iOS applications for Apple's ecosystem.",
    points: [
        "Optimized for performance on all iPhone and iPad models.",
        "Adherence to Apple's Human Interface Guidelines for a true native feel.",
        "Integration with Apple services like Apple Pay and HealthKit."
    ],
    image: "https://placehold.co/800x600.png",
    imageHint: "ios app",
    link: "/services",
    isChart: true,
  },
  {
    title: "Android App Development",
    description: "Building versatile and powerful native Android applications for a wide range of devices.",
    points: [
        "Broad device compatibility, from smartphones to tablets and wearables.",
        "Leveraging Material Design for an intuitive user experience.",
        "Integration with Google services like Google Maps and Firebase."
    ],
    image: "https://placehold.co/800x600.png",
    imageHint: "android app",
    link: "/services",
    isChart: true,
  },
  {
    title: "Game Development",
    description: "Developing immersive and interactive games for mobile and web platforms.",
    points: [
        "Cross-platform development using engines like Unity or Unreal.",
        "Engaging gameplay mechanics and stunning 2D/3D graphics.",
        "Monetization strategies including in-app purchases and ads."
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

const ServiceFeature = ({ title, description, points, link, reverse = false, isChart = false, chartType, index }: { title: string, description: string, points?: string[], link: string, reverse?: boolean, isChart?: boolean, chartType: 'area' | 'bar' | 'line', index: number }) => {
    
    const renderChart = () => {
        switch (chartType) {
            case 'area':
                return (
                    <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="desktop" stackId="1" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" />
                        <Area type="monotone" dataKey="mobile" stackId="1" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" />
                    </AreaChart>
                );
            case 'bar':
                return (
                    <BarChart data={chartData} margin={{ left: 12, right: 12 }}>
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="desktop" fill="hsl(var(--chart-1))" />
                        <Bar dataKey="mobile" fill="hsl(var(--chart-2))" />
                    </BarChart>
                );
            case 'line':
                 return (
                    <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
                        <XAxis dataKey="year" />
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
        'grid md:grid-cols-2 items-center justify-center gap-8 lg:gap-16 py-8'
      )}>
        <div className={cn("md:w-full", reverse && "md:order-last")}>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                {renderChart()}
            </ChartContainer>
        </div>
        <div className="md:w-full flex flex-col gap-4 items-start text-left">
            <h3 className="text-3xl font-bold">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
            {points && (
                <ul className="space-y-2 text-left">
                    {points.map((point, i) => (
                        <li key={i} className="flex items-center text-muted-foreground">
                            <CheckCircle className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                            {point}
                        </li>
                    ))}
                </ul>
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
  const chartTypes: ('area' | 'bar' | 'line')[] = ['area', 'bar', 'line', 'area', 'bar', 'line'];
  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-primary/5">
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
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-1 md:gap-12 lg:max-w-none">
          {services.map((service, index) => (
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
          ))}
        </div>
      </div>
    </section>
  );
}
