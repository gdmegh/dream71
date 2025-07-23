import ParallaxService from '@/components/sections/parallax-service';
import { Code, Smartphone, Palette, ShieldCheck, Rocket, BrainCircuit } from 'lucide-react';

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Cutting-edge web solutions, from corporate websites to complex enterprise applications.",
    imageUrl: "https://placehold.co/1920x1080.png",
    imageHint: "web development code"
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile apps that deliver seamless user experiences on iOS and Android.",
    imageUrl: "https://placehold.co/1920x1080.png",
    imageHint: "mobile app interface"
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Intuitive and beautiful user interfaces that are a joy to use, enhancing user engagement and satisfaction.",
    imageUrl: "https://placehold.co/1920x1080.png",
    imageHint: "design wireframe"
  },
  {
    icon: ShieldCheck,
    title: "QA & Testing",
    description: "Rigorous quality assurance processes to ensure your software is reliable, secure, and bug-free.",
    imageUrl: "https://placehold.co/1920x1080.png",
    imageHint: "quality assurance check"
  },
  {
    icon: Rocket,
    title: "DevOps",
    description: "Streamlining development and operations to deliver high-quality software faster and more reliably.",
    imageUrl: "https://placehold.co/1920x1080.png",
    imageHint: "server deployment"
  },
  {
    icon: BrainCircuit,
    title: "AI & ML Solutions",
    description: "Integrating artificial intelligence and machine learning to build intelligent, data-driven applications.",
    imageUrl: "https://placehold.co/1920x1080.png",
    imageHint: "artificial intelligence brain"
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground">Our Expertise</h1>
            <p className="font-body mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                We provide a wide range of services to turn your ideas into powerful digital solutions, with each service backed by a dedicated team of experts.
            </p>
        </div>
      </section>
      {services.map((service, index) => (
        <ParallaxService 
          key={index}
          Icon={service.icon}
          title={service.title}
          description={service.description}
          imageUrl={service.imageUrl}
          imageHint={service.imageHint}
        />
      ))}
    </>
  );
}
