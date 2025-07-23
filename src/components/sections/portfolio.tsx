import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: "E-commerce Platform",
    description: "A scalable online marketplace for a major retail brand.",
    image: "https://placehold.co/600x400.png",
    tags: ["React", "Node.js", "PostgreSQL"],
    link: "#",
    dataAiHint: "ecommerce shopping"
  },
  {
    title: "Fintech Mobile App",
    description: "A secure mobile banking application with biometric authentication.",
    image: "https://placehold.co/600x400.png",
    tags: ["Flutter", "Firebase", "Biometrics"],
    link: "#",
    dataAiHint: "finance app"
  },
  {
    title: "Healthcare Management System",
    description: "An EHR system for hospitals to manage patient data efficiently.",
    image: "https://placehold.co/600x400.png",
    tags: ["Angular", ".NET Core", "Azure"],
    link: "#",
    dataAiHint: "healthcare system"
  },
  {
    title: "Logistics & Supply Chain Portal",
    description: "A real-time tracking and management portal for a global logistics company.",
    image: "https://placehold.co/600x400.png",
    tags: ["Vue.js", "Python/Django", "AWS"],
    link: "#",
    dataAiHint: "logistics truck"
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">Our Portfolio</h2>
          <p className="font-body text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            A glimpse into some of our successful projects and partnerships.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden group">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    data-ai-hint={project.dataAiHint}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="font-headline text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 font-body">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                   <Link href={project.link} className="inline-flex items-center font-semibold text-primary hover:underline font-body">
                    View Case Study <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
