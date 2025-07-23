import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section 
      id="home" 
      className="relative h-screen flex items-center justify-center text-center overflow-hidden bg-primary"
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
            Leading Software Innovation in Bangladesh
          </h1>
          <p className="font-body text-lg md:text-xl text-primary-foreground/90 mb-8">
            We craft world-class digital products, web and mobile applications for clients worldwide. Our mission is to transform ideas into reality through technology.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
