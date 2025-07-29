
"use client";

import { Braces } from 'lucide-react';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import Script from 'next/script';

const heroImages = [
    { src: "/images/heroimage.png", alt: "Hero Image", dataAiHint: "team meeting" },
];

export default function Hero() {
    const [vantaEffect, setVantaEffect] = useState<any>(null);
    const vantaRef = useRef(null);
    
    const plugin = React.useRef(
      Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: false })
    );
    
    const [text] = useTypewriter({
        words: ['Software Development', 'Technology Advice', 'DevOps Solution'],
        loop: true,
        typeSpeed: 120,
        deleteSpeed: 80,
    });

    useEffect(() => {
        let effect: any;
        // Function to initialize Vanta
        const initVanta = () => {
            if (window.VANTA && !effect) {
                 effect = window.VANTA.TOPOLOGY({
                    el: vantaRef.current,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    scale: 1.00,
                    scaleMobile: 1.00,
                    color: 0x4fa83d,
                    backgroundColor: 0x0c1a17,
                });
                setVantaEffect(effect);
            }
        };

        // Delay initialization to improve TBT
        const timer = setTimeout(() => {
            if (window.VANTA) {
                initVanta();
            } else {
                // If Vanta script hasn't loaded, wait for it
                const script = document.querySelector('script[src*="vanta.topology.min.js"]');
                if (script) {
                    script.addEventListener('load', initVanta);
                }
            }
        }, 500); // 500ms delay

        return () => {
            if (vantaEffect) {
                vantaEffect.destroy();
            }
            if(effect) {
                effect.destroy();
            }
            clearTimeout(timer);
        };
    }, []);


    return (
        <>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js" strategy="lazyOnload" />
        <Script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.topology.min.js" strategy="lazyOnload" />
        <section
            id="home"
            ref={vantaRef}
            className="relative flex flex-col items-center justify-center text-center overflow-hidden bg-background min-h-screen py-20"
        >
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
        </>
    );
}
