
'use client';

import React from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const clientLogos = [
    { src: "https://placehold.co/150x60/000000/FFFFFF?text=Client+A", alt: "Client A", dataAiHint: "logo" },
    { src: "https://placehold.co/150x60/000000/FFFFFF?text=Client+B", alt: "Client B", dataAiHint: "logo" },
    { src: "https://placehold.co/150x60/000000/FFFFFF?text=Client+C", alt: "Client C", dataAiHint: "logo" },
    { src: "https://placehold.co/150x60/000000/FFFFFF?text=Client+D", alt: "Client D", dataAiHint: "logo" },
    { src: "https://placehold.co/150x60/000000/FFFFFF?text=Client+E", alt: "Client E", dataAiHint: "logo" },
    { src: "https://placehold.co/150x60/000000/FFFFFF?text=Client+F", alt: "Client F", dataAiHint: "logo" },
    { src: "https://placehold.co/150x60/000000/FFFFFF?text=Client+G", alt: "Client G", dataAiHint: "logo" },
    { src: "https://placehold.co/150x60/000000/FFFFFF?text=Client+H", alt: "Client H", dataAiHint: "logo" },
    { src: "https://placehold.co/150x60/000000/FFFFFF?text=Client+I", alt: "Client I", dataAiHint: "logo" },
    { src: "https://placehold.co/150x60/000000/FFFFFF?text=Client+J", alt: "Client J", dataAiHint: "logo" },
];

export default function FeaturedClients() {
    const plugin = React.useRef(
      Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: false })
    );

    return (
        <section className="py-12 bg-white w-full overflow-hidden">
             <Carousel
                plugins={[plugin.current]}
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-8">
                    {clientLogos.map((logo, index) => (
                      <CarouselItem key={index} className="pl-8 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6">
                          <Image
                              src={logo.src}
                              alt={logo.alt}
                              width={150}
                              height={60}
                              data-ai-hint={logo.dataAiHint}
                              className="w-auto h-10 object-contain"
                          />
                      </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </section>
    )
}
