import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const services = [
  {
    title: "e-Governance Solutions",
    description: "e-Governance solutions use digital platforms to streamline government operations, enhance public services, and increase transparency and citizen engagement.",
    image: "https://placehold.co/800x600.png",
    imageHint: "government building",
    link: "/services"
  },
  {
    title: "Business Automation Based on Artificial Intelligence",
    description: "Leverage AI to automate complex business processes, improve efficiency, and drive innovation across your organization.",
    image: "https://placehold.co/800x600.png",
    imageHint: "artificial intelligence",
    link: "/services"
  },
  {
    title: "Web Development",
    description: "Robust, scalable, and high-performance web applications tailored to your specific business needs.",
    image: "https://placehold.co/800x600.png",
    imageHint: "web development",
    link: "/services"
  }
];

const ServiceFeature = ({ title, description, image, imageHint, link, reverse = false }: { title: string, description: string, image: string, imageHint: string, link: string, reverse?: boolean }) => {
    return (
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className={cn("flex flex-col items-start text-left", reverse && "md:order-last")}>
                <h3 className="font-headline text-3xl font-bold text-foreground mb-4">{title}</h3>
                <p className="text-muted-foreground mb-6 font-body">{description}</p>
                <Button asChild variant="outline">
                    <Link href={link}>
                        Explore More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
            <div>
                <Image
                    src={image}
                    alt={title}
                    width={800}
                    height={600}
                    className="rounded-lg shadow-xl"
                    data-ai-hint={imageHint}
                />
            </div>
        </div>
    );
}


export default function Services() {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">Our Core Services</h2>
            <p className="font-body text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                We provide a wide range of services to turn your ideas into powerful digital solutions.
            </p>
        </div>
        <div className="space-y-16 md:space-y-24">
            {services.map((service, index) => (
                <ServiceFeature 
                    key={index}
                    {...service}
                    reverse={index % 2 === 0}
                />
            ))}
        </div>
        <div className="text-center pt-16">
            <Button asChild size="lg">
                <Link href="/services">
                    View All Services <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
