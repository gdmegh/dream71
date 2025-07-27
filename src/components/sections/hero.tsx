
"use client";

import { Braces } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import AnimatedIcons from '../ui/animated-icons';

const heroImages = [
    { src: "https://placehold.co/1200x600.png", alt: "Hero Image", dataAiHint: "team meeting" },
];

export default function Hero() {
    const plugin = React.useRef(
      Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: false })
    );
    
    const [text] = useTypewriter({
        words: ['Software Development', 'Technology Advice', 'DevOps Solution'],
        loop: true,
        typeSpeed: 120,
        deleteSpeed: 80,
    });


    return (
        <section
            id="home"
            className="relative flex flex-col items-center justify-center text-center overflow-hidden bg-background min-h-screen py-20"
        >
            <AnimatedIcons />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center flex-grow">
                <div className="max-w-4xl mx-auto flex-grow flex flex-col justify-center items-center">
                    <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
                        The full <span className="inline-flex items-center gap-2">Stack <Braces className="h-10 w-10 text-primary" /></span> <br />
                        <span className="text-primary">{text}</span>
                        <Cursor cursorStyle='|' />
                    </h1>
                </div>
            </div>
            <div className="w-full max-w-7xl mx-auto mt-16 group z-10">
               <Carousel
                    plugins={[plugin.current]}
                    className="w-full"
                    opts={{ loop: true }}
                >
                    <CarouselContent>
                        {heroImages.map((image, index) => (
                            <CarouselItem key={index} className="relative h-[300px] sm:h-[400px] md:h-[600px]">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="rounded-[20px] shadow-2xl transition-transform duration-500 ease-in-out group-hover:scale-105 object-cover"
                                    data-ai-hint={image.dataAiHint}
                                    priority={index === 0}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-4" />
                    <CarouselNext className="right-4" />
                </Carousel>
            </div>
        </section>
    );
}
