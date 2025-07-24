
import Image from 'next/image';
import { notFound } from 'next/navigation';
import CtaSection from '@/components/sections/cta-section';
import Portfolio from '@/components/sections/portfolio';

// Dummy data for services, as the original file was removed.
// In a real application, this would also come from a database.
const services = [
    {
        slug: "web-development",
        title: "Web Development",
        description: "Building modern, responsive, and scalable web applications.",
        longDescription: "We craft beautiful and functional web experiences, from simple landing pages to complex enterprise applications. Our team uses the latest technologies to ensure your project is fast, secure, and ready to scale.",
        image: "https://placehold.co/800x600.png",
        imageHint: "web development code",
        points: [
            { title: "Frontend", description: "React, Next.js" },
            { title: "Backend", description: "Node.js, Python" },
            { title: "Databases", description: "PostgreSQL, MongoDB" },
            { title: "DevOps", description: "Docker, Kubernetes" },
        ]
    }
]


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

      <Portfolio />

      <CtaSection />
    </>
  );
}
