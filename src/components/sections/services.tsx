import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../ui/card';
import { Code, Smartphone, Palette } from 'lucide-react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Robust, scalable, and high-performance web applications tailored to your specific business needs."
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile apps that deliver seamless user experiences on iOS and Android."
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Intuitive and beautiful user interfaces that are a joy to use, enhancing user engagement and satisfaction."
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">Our Core Services</h2>
            <p className="font-body text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            We provide a wide range of services to turn your ideas into powerful digital solutions.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
                <Card key={index} className="text-center hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                        <div className="mx-auto bg-primary/10 text-primary rounded-full p-4 w-fit mb-4">
                           <service.icon className="h-8 w-8" />
                        </div>
                        <CardTitle className="font-headline">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="font-body">{service.description}</CardDescription>
                    </CardContent>
                </Card>
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
