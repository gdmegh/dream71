
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight } from 'lucide-react';

const ServiceCard = ({ service }: { service: any }) => (
    <Card className="overflow-hidden group flex flex-col" rounded="20px">
        <Link href={`/services/${service.slug}`} className="block">
            <div className="relative h-56">
                <Image
                    src={service.imageUrl || 'https://placehold.co/600x400.png'}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint="service image"
                />
            </div>
        </Link>
        <CardContent className="p-6 flex flex-col flex-grow">
            <Link href={`/services/${service.slug}`} className="block">
                <h3 className="font-headline text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                </h3>
                <p className="text-muted-foreground font-body text-sm mb-4 line-clamp-3 flex-grow">
                    {service.description}
                </p>
            </Link>
            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border">
                <Button variant="link" asChild className="p-0 h-auto">
                    <Link href={`/services/${service.slug}`} className="text-primary">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </CardContent>
    </Card>
);

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      const q = query(collection(db, 'Service'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const servicesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setServices(servicesData);
      setLoading(false);
    };

    fetchServices();
  }, []);

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="overflow-hidden" rounded="20px">
          <Skeleton className="h-56 w-full" />
          <CardContent className="p-6 space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-10 w-32" />
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <>
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground">Our Expertise</h1>
            <p className="font-body mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Explore our comprehensive suite of services designed to transform your visionary ideas into robust digital realities. Each service is powered by a dedicated team of seasoned experts committed to excellence.
            </p>
        </div>
      </section>
      
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <LoadingSkeleton />
          ) : services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No services found.</p>
          )}
        </div>
      </section>
    </>
  );
}
