import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section id="home" className="relative bg-background overflow-hidden py-20 md:py-32">
       <div className="absolute inset-0 bg-primary/5"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Leading Software Innovation in Bangladesh
            </h1>
            <p className="font-body text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto md:mx-0">
              We craft world-class digital products, web and mobile applications for clients worldwide. Our mission is to transform ideas into reality through technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild size="lg">
                <Link href="/portfolio">
                  Our Work <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/about">About Us</Link>
              </Button>
            </div>
          </div>
           <div>
                <Image
                    src="https://placehold.co/600x400.png"
                    alt="Hero Image"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-xl mx-auto"
                    data-ai-hint="team brainstorming"
                />
            </div>
        </div>
      </div>
    </section>
  );
}
