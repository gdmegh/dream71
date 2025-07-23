import ServiceFeature from './service-feature';
import { Code, Smartphone, Palette, ShieldCheck, Rocket, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Cutting-edge web solutions, from corporate websites to complex enterprise applications.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "web development interface",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile apps that deliver seamless user experiences on iOS and Android.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "mobile app screen"
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Intuitive and beautiful user interfaces that are a joy to use, enhancing user engagement and satisfaction.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "design wireframes"
  },
  {
    icon: ShieldCheck,
    title: "QA & Testing",
    description: "Rigorous quality assurance processes to ensure your software is reliable, secure, and bug-free.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "quality assurance testing"
  },
  {
    icon: Rocket,
    title: "DevOps",
    description: "Streamlining development and operations to deliver high-quality software faster and more reliably.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "devops pipeline"
  },
  {
    icon: BrainCircuit,
    title: "AI & ML Solutions",
    description: "Integrating artificial intelligence and machine learning to build intelligent, data-driven applications.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "ai brain circuit"
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">Our Services</h2>
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
         <div className="text-center mt-16">
            <Button asChild size="lg" variant="default">
                <Link href="/services">
                    Learn More About Our Services <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
