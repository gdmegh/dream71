
'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';


const services = [
  {
    slug: "e-governance",
    title: "Pioneering Digital Transformation in Public Services Through Advanced e-Governance Solutions",
    description: "We develop and implement cutting-edge digital platforms designed to streamline government operations, enhance the delivery of public services, and foster greater transparency and citizen engagement across all sectors.",
    link: "/services/e-governance",
  },
  {
    slug: "business-automation",
    title: "Driving Business Growth and Unprecedented Efficiency with Intelligent Automation and AI",
    description: "We empower your business to thrive in a competitive landscape by leveraging the transformative power of Artificial Intelligence to automate complex processes, uncover actionable insights from your data, and foster a culture of continuous innovation and sustained success.",
    link: "/services/business-automation",
  },
  {
    slug: "custom-software",
    title: "Architecting and Engineering Bespoke Software Solutions to Propel Your Business into the Future",
    description: "We specialize in the design, development, and deployment of high-quality, scalable, and secure custom software applications. Each solution is meticulously crafted to align with your unique operational workflows, strategic business objectives, and long-term goals, ensuring a perfect technological fit for your organization.",
    link: "/services/custom-software",
  },
  {
    slug: "game-development",
    title: "Creating Immersive and Captivating Gaming Experiences for a Global Audience",
    description: "Our passion lies in the creation of high-quality, interactive games for mobile, web, and desktop platforms. We focus on delivering engaging gameplay, breathtaking visuals, and memorable narratives that captivate and entertain players of all ages, all around the world.",
    link: "/services/game-development",
  }
];

const ServiceFeature = ({ title, description, link, reverse = false }: { title: string, description: string, link: string, reverse?: boolean }) => {
    
    return (
        <div className={cn('grid md:grid-cols-2 items-center justify-center gap-8 lg:gap-16 py-12')}>
            <div className={cn("flex flex-col md:w-full items-start text-left", reverse ? "md:order-last" : "md:order-first")}>
                <h3 className="text-3xl font-bold">{title}</h3>
                <p className="text-muted-foreground mt-4">{description}</p>
                 <Button asChild className="mt-6" variant="outline">
                    <Link href={link}>
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
            
            <div className={cn("flex flex-col items-center w-full", reverse ? 'md:order-first' : 'md:order-last')}>
                <div className="w-full bg-muted rounded-lg h-64 flex items-center justify-center">
                   <p className="text-muted-foreground">Chart or Image Placeholder</p>
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
                    link={service.link}
                    reverse={index % 2 !== 0}
                />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
