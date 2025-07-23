import ParallaxService from './parallax-service';
import ServiceFeature from './service-feature';
import { Code, Smartphone, Palette, ShieldCheck, Rocket, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "We specialize in creating robust, scalable, and high-performance web applications tailored to your specific business needs. We focus on clean code, responsive design, and a seamless user experience.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "web application dashboard"
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile apps that deliver seamless user experiences on iOS and Android.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "mobile app interface"
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Intuitive and beautiful user interfaces that are a joy to use, enhancing user engagement and satisfaction.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "design wireframe"
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">Our Core Services</h2>
            <p className="font-body text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            We provide a wide range of services to turn your ideas into powerful digital solutions.
            </p>
        </div>
        <div className="space-y-16">
            {services.map((service, index) => (
                <ServiceFeature
                    key={index}
                    Icon={service.icon}
                    title={service.title}
                    description={service.description}
                    imageUrl={service.imageUrl}
                    imageHint={service.imageHint}
                    reverse={index % 2 !== 0}
                />
            ))}
        </div>
        <div className="text-center pt-16">
            <Button asChild size="lg" variant="default">
                <Link href="/services">
                    View All Services <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
