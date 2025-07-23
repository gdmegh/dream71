'use client';

import { Braces } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

// Make sure to declare VANTA globally, or import it if you have types
declare const VANTA: any;

export default function Hero() {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (typeof VANTA !== 'undefined' && !vantaEffect) {
      setVantaEffect(VANTA.HALO({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        baseColor: 0x11304,
        backgroundColor: 0x11304,
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
                src="/images/hero2.png" 
                alt="Code editor screenshot"
                width={1200}
                height={600}
                className="rounded-t-lg shadow-2xl transition-transform duration-500 ease-in-out group-hover:scale-105"
                data-ai-hint="code editor"
            />
        </div>
      </div>
    </section>
  );
}
