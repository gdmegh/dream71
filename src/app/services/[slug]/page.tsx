
import { services } from '@/lib/services-data';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import CtaSection from '@/components/sections/cta-section';
import { notFound } from 'next/navigation';
import Portfolio from '@/components/sections/portfolio';

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services.find(s => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <section className="bg-primary/5 py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground">{service.title}</h1>
          <p className="font-body mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            {service.description}
          </p>
        </div>
      </section>
      
      <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                      <h2 className="font-headline text-3xl font-bold text-foreground mb-4">About the Service</h2>
                      <p className="font-body text-muted-foreground mb-6">
                          {service.longDescription}
                      </p>
                  </div>
                  <div className="md:order-last">
                      <Image
                          src={service.image}
                          alt={service.title}
                          width={800}
                          height={600}
                          className="rounded-lg shadow-xl"
                          data-ai-hint={service.imageHint}
                      />
                  </div>
              </div>
          </div>
      </section>

      <section id="features" className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">Key Features</h2>
                <p className="font-body text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                    Explore the core features that make our {service.title} stand out.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {service.points.map((feature, index) => (
                    <Card key={index} className="text-center">
                        <CardContent className="p-6">
                           <div className="bg-primary/10 text-primary p-3 rounded-full w-fit mx-auto mb-4">
                               <feature.icon className="h-8 w-8" />
                           </div>
                            <h3 className="font-headline text-lg font-semibold">{feature.title}</h3>
                            <p className="text-muted-foreground text-sm mt-2">{feature.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </section>

      <Portfolio />

      <CtaSection />
    </>
  );
}
