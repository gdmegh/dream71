import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Braces } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section 
      id="home" 
      className="relative flex flex-col items-center justify-center text-center overflow-hidden bg-background min-h-screen py-20"
    >
      <div 
        className="absolute inset-0 z-0"
        style={{
            backgroundImage: 'radial-gradient(circle at bottom right, hsl(var(--primary)/0.3), transparent 40%), radial-gradient(circle at bottom left, hsl(var(--accent)/0.2), transparent 50%)',
        }}
      ></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center flex-grow">
        <div className="max-w-4xl mx-auto flex-grow flex flex-col justify-center items-center">
          <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
            The full <span className="inline-flex items-center gap-2">stack <Braces className="w-12 h-12 text-blue-500" /></span> AI workspace
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
            Dream71 accelerates your entire development lifecycle with AI agents. Build backends, front ends, and mobile apps, all in one place.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">
              Try Dream71
            </Link>
          </Button>
        </div>
        <div className="w-full max-w-6xl mt-16">
            <Image 
                src="https://placehold.co/1200x600.png" 
                alt="Code editor screenshot"
                width={1200}
                height={600}
                className="rounded-t-lg shadow-2xl"
                data-ai-hint="code editor"
            />
        </div>
      </div>
    </section>
  );
}
