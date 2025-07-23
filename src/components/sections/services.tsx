import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Smartphone, Palette, ShieldCheck, Rocket, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Cutting-edge web solutions, from corporate websites to complex enterprise applications.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile apps that deliver seamless user experiences on iOS and Android.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Intuitive and beautiful user interfaces that are a joy to use, enhancing user engagement and satisfaction.",
  },
  {
    icon: ShieldCheck,
    title: "QA & Testing",
    description: "Rigorous quality assurance processes to ensure your software is reliable, secure, and bug-free.",
  },
  {
    icon: Rocket,
    title: "DevOps",
    description: "Streamlining development and operations to deliver high-quality software faster and more reliably.",
  },
  {
    icon: BrainCircuit,
    title: "AI & ML Solutions",
    description: "Integrating artificial intelligence and machine learning to build intelligent, data-driven applications.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">Our Services</h2>
          <p className="font-body text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            We provide a wide range of services to turn your ideas into powerful digital solutions.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="text-center bg-background hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <CardHeader>
                <div className="mx-auto bg-primary/10 text-primary rounded-full p-4 w-fit mb-4">
                  <service.icon className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground font-body">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
         <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
                <Link href="/services">
                    Learn More About Our Services <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
