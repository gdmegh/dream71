"use client";

import { useRef } from 'react';
import { Braces } from 'lucide-react';
import HALO from 'vanta/dist/vanta.halo.min';
import * as THREE from 'three';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Hero() {
    const vantaRef = useRef(null);
    const [vantaEffect, setVantaEffect] = useState<any>(0);

    useEffect(() => {
        if (!vantaEffect && vantaRef.current) {
            setVantaEffect(HALO({
                el: vantaRef.current,
                THREE: THREE,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                backgroundColor: 0x011304,
                size: 1.5,
            }));
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect]);

    return (
        <section
            id="home"
            ref={vantaRef}
            className="relative flex flex-col items-center justify-center text-center overflow-hidden bg-background min-h-screen py-20"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center flex-grow">
                <div className="max-w-4xl mx-auto flex-grow flex flex-col justify-center items-center">
                    <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
                        The full <span className="inline-flex items-center gap-2">Stack <Braces className="h-12 w-12 text-primary" /></span> Software Development Solutions
                    </h1>
                </div>
                <div className="w-full max-w-6xl mt-16 group">
                   <Image
                        src="/images/heroimage.png"
                        alt="Hero Image"
                        width={1200}
                        height={600}
                        className="rounded-t-lg shadow-2xl transition-transform duration-500 ease-in-out group-hover:scale-105 w-full"
                        data-ai-hint="software development"
                    />
                </div>
            </div>
        </section>
    );
}
