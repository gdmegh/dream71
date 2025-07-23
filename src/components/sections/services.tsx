import ParallaxService from './parallax-service';
import { Code, Smartphone, Palette, ShieldCheck, Rocket, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "We specialize in creating robust, scalable, and high-performance web applications tailored to your specific business needs. From custom e-commerce platforms and content management systems to complex enterprise-level web portals, our team leverages the latest technologies to build solutions that are both powerful and easy to use. We focus on clean code, responsive design, and a seamless user experience to ensure your web presence stands out.",
    imageUrl: "https://placehold.co/1920x1080.png",
    imageHint: "web application dashboard"
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile apps that deliver seamless user experiences on iOS and Android.",
    imageUrl: "https://placehold.co/1920x1081.png",
    imageHint: "mobile app interface"
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Intuitive and beautiful user interfaces that are a joy to use, enhancing user engagement and satisfaction.",
    imageUrl: "https://placehold.co/1920x1082.png",
    imageHint: "design wireframe"
  },
  {
    icon: ShieldCheck,
    title: "QA & Testing",
    description: "Rigorous quality assurance processes to ensure your software is reliable, secure, and bug-free.",
    imageUrl: "https://placehold.co/1920x1083.png",
    imageHint: "quality assurance check"
  },
  {
    icon: Rocket,
    title: "DevOps",
    description: "Streamlining development and operations to deliver high-quality software faster and more reliably.",
    imageUrl: "https://placehold.co/1920x1084.png",
    imageHint: "server deployment"
  },
  {
    icon: BrainCircuit,
    title: "AI & ML Solutions",
    description: "Integrating artificial intelligence and machine learning to build intelligent, data-driven applications.",
    imageUrl: "https://placehold.co/1920x1085.png",
    imageHint: "artificial intelligence brain"
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">Our Services</h2>
        <p className="font-body text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
          We provide a wide range of services to turn your ideas into powerful digital solutions.
        </p>
      </div>
      <div>
        {services.map((service, index) => (
            <ParallaxService
                key={index}
                Icon={service.icon}
                title={service.title}
                description={service.description}
                imageUrl={service.imageUrl}
                imageHint={service.imageHint}
                isHomePage={true}
            />
        ))}
      </div>
      <div className="text-center py-20 bg-background">
          <Button asChild size="lg" variant="default">
              <Link href="/services">
                  View All Services <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
          </Button>
      </div>
    </section>
  );
}
