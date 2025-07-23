

'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';


const services = [
  {
    title: "e-Governance Solutions",
    description: "e-Governance solutions use digital platforms to streamline government operations, enhance public services, and increase transparency and citizen engagement.",
    image: "/images/e_gov.jpeg",
    imageHint: "government building",
    link: "/services",
  },
  {
    title: "Business Automation Based on Artificial Intelligence",
    description: "Leverage AI to automate complex business processes, improve efficiency, and drive innovation across your organization.",
    image: "https://placehold.co/800x600.png",
    imageHint: "artificial intelligence",
    link: "/services",
  },
  {
    title: "Web Development",
    description: "Robust, scalable, and high-performance web applications tailored to your specific business needs.",
    image: "https://placehold.co/800x600.png",
    imageHint: "web development",
    link: "/services",
  }
];

const ServiceFeature = ({ title, description, image, imageHint, link, reverse = false }: { title: string, description: string, image: string, imageHint: string, link: string, reverse?: boolean }) => {
    return (
      <div className={cn(
        'flex flex-col md:flex-row items-center gap-8',
        reverse && 'md:flex-row-reverse'
      )}>
        <div className="md:w-1/2">
            <div className="overflow-hidden rounded-md">
              <Image
                src={image}
                alt={imageHint}
                width={800}
                height={600}
                className="object-cover"
                data-ai-hint={imageHint}
              />
            </div>
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
  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container space-y-12 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
              Our Services
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/loose">Solutions for a Modern World</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
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
              image={service.image}
              imageHint={service.imageHint}
              link={service.link}
              reverse={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
