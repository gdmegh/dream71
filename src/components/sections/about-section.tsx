import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function AboutSection() {
  return (
    <section id="about" className="relative bg-background overflow-hidden py-20 md:py-32">
       <div className="absolute inset-0 bg-primary/5"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <p className="font-headline text-primary font-semibold mb-2 text-center md:text-left">About</p>
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground mb-4 text-center md:text-left">
                Welcome to Dream71 Bangladesh Limited.
            </h2>
            <p className="font-body text-lg text-muted-foreground mb-8 max-w-xl mx-auto md:mx-0 text-center md:text-left">
              A leading Software Company from Bangladesh Focusing on E-Governance System, Web Applications, Mobile Applications, Game Development, Artificial intelligence , IOT and Blockchain Technologies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild size="lg" variant="outline">
                <Link href="/about">
                  Learn More <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
           <div className='lg:order-last'>
                <Image
                    src="/images/Office.png"
                    alt="About Us Image"
                    width={800}
                    height={600}
                    className="rounded-lg shadow-xl mx-auto"
                    data-ai-hint="team brainstorming"
                />
            </div>
        </div>
      </div>
    </section>
  );
}
