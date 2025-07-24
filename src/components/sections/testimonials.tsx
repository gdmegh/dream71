
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Skeleton } from '../ui/skeleton';

const LoadingSkeleton = () => (
    <div className="w-full max-w-4xl mx-auto">
        <Card className="h-full bg-white text-gray-800" rounded="20px">
            <CardContent className="flex flex-col items-center text-center p-8 md:p-12 h-full">
                <Skeleton className="h-20 w-20 rounded-full mb-6" />
                <Skeleton className="h-6 w-3/4 mb-6" />
                <Skeleton className="h-5 w-1/4 mb-1" />
                <Skeleton className="h-4 w-1/3" />
            </CardContent>
        </Card>
    </div>
);


export default function Testimonials() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );
  
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoading(true);
      const q = query(collection(db, "Testimonial"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const testimonialsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTestimonials(testimonialsData);
      setLoading(false);
    };

    fetchTestimonials();
  }, []);

  return (
    <section 
      id="testimonials" 
      className="relative py-20 md:py-32 bg-cover bg-fixed bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/images/Office.png')` }}
      data-ai-hint="happy clients"
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-white">What Our Clients Say</h2>
          <p className="font-body text-lg text-white/80 mt-4 max-w-2xl mx-auto">
            We are proud to have earned the trust of our clients, and we are excited to share their experiences with you. Their feedback is a testament to our commitment to excellence and our passion for delivering outstanding results.
          </p>
        </div>

        {loading ? (
            <LoadingSkeleton />
        ) : testimonials.length > 0 ? (
            <Carousel
                plugins={[plugin.current]}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full max-w-4xl mx-auto"
            >
            <CarouselContent>
                {testimonials.map((item, index) => (
                <CarouselItem key={index}>
                    <div className="p-1">
                    <Card className="h-full bg-white text-gray-800" rounded="20px">
                        <CardContent className="flex flex-col items-center text-center p-8 md:p-12 h-full">
                            <Avatar className="h-20 w-20 mb-6 border-4 border-primary/20">
                                <AvatarImage src={item.avatar || 'https://placehold.co/100x100.png'} alt={item.name} data-ai-hint="person face" />
                                <AvatarFallback>{item.name.split(' ').map((n:string) => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <p className="text-lg mb-6 flex-grow">"{item.testimonial}"</p>
                            <div className="flex flex-col items-center">
                                <p className="font-headline text-xl font-semibold">{item.name}</p>
                                <p className="text-md text-gray-600">{item.title}</p>
                            </div>
                        </CardContent>
                    </Card>
                    </div>
                </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="text-white bg-white/20 hover:bg-white/30 border-none"/>
            <CarouselNext className="text-white bg-white/20 hover:bg-white/30 border-none"/>
            </Carousel>
        ) : (
             <div className="text-center text-white/80 font-body">No testimonials yet.</div>
        )}
      </div>
    </section>
  );
}
