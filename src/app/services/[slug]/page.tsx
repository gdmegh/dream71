import Image from 'next/image';
import { notFound } from 'next/navigation';
import CtaSection from '@/components/sections/cta-section';
import Portfolio from '@/components/sections/portfolio';
import { services } from '@/lib/services';
import { CheckCircle } from 'lucide-react';

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
                       <h3 className="font-headline text-2xl font-bold text-foreground mb-4">Key Areas</h3>
                        <ul className="space-y-3">
                            {service.points.map((point, index) => (
                                <li key={index} className="flex items-start font-body text-muted-foreground">
                                    <CheckCircle className="h-5 w-5 mr-3 mt-1 text-primary flex-shrink-0" />
                                    <div>
                                        <span className="font-bold text-foreground">{point.title}:</span> {point.description}
                                    </div>
                                </li>
                            ))}
                        </ul>
                  </div>
                  <div className="md:order-last">
                      <Image
                          src={service.image}
                          alt={service.title}
                          width={800}
                          height={600}
                          className="rounded-[20px] shadow-xl"
                          data-ai-hint={service.imageHint}
                      />
                  </div>
              </div>
          </div>
      </section>

      <Portfolio />

      <CtaSection />
    </>
  );
}
