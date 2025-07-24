
import { projects } from '@/lib/portfolio-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export default function PortfolioDetailPage({ params }: { params: { slug: string } }) {
  const project = projects.all.find(p => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Button asChild variant="outline" className="mb-8">
                <Link href="/portfolio">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Portfolio
                </Link>
            </Button>
          <div className="text-center">
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground">{project.title}</h1>
            <p className="font-body mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Carousel className="w-full max-w-4xl mx-auto">
              <CarouselContent>
                {project.gallery.map((img, index) => (
                  <CarouselItem key={index}>
                    <Image
                      src={img.src}
                      alt={`${project.title} screenshot ${index + 1}`}
                      width={1200}
                      height={800}
                      className="rounded-lg shadow-xl w-full"
                      data-ai-hint={img.dataAiHint}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
        </div>
      </section>

      <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-3 gap-12">
                  <div className="md:col-span-2">
                      <h2 className="font-headline text-3xl font-bold text-foreground mb-4">About The Project</h2>
                      <div className="prose prose-invert max-w-none font-body text-muted-foreground" dangerouslySetInnerHTML={{ __html: project.longDescription }} />
                  </div>
                  <div>
                      <h3 className="font-headline text-2xl font-bold text-foreground mb-4">Tech Stack</h3>
                      <div className="flex flex-wrap gap-2 mb-8">
                          {project.tags.map((tag) => (
                              <Badge key={tag} variant="secondary">{tag}</Badge>
                          ))}
                      </div>

                      {project.link && (
                          <div>
                            <h3 className="font-headline text-2xl font-bold text-foreground mb-4">Live Demo</h3>
                            <Button asChild>
                                <a href={project.link} target="_blank" rel="noopener noreferrer">
                                    Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                                </a>
                            </Button>
                          </div>
                      )}
                  </div>
              </div>
          </div>
      </section>
    </>
  );
}
