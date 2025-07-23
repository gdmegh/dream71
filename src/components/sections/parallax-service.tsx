import { type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ParallaxServiceProps {
  Icon: LucideIcon;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  isHomePage?: boolean;
}

export default function ParallaxService({ Icon, title, description, imageUrl, imageHint, isHomePage = false }: ParallaxServiceProps) {
  return (
    <section 
      className="relative py-20 md:py-32 bg-cover bg-fixed bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${imageUrl})` }}
      data-ai-hint={imageHint}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          className={cn(
            "p-8 rounded-xl", 
            !isHomePage && "bg-background/80 shadow-2xl"
          )}
        >
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1 text-center md:text-left flex flex-col items-center md:items-start text-white">
              <div className="bg-primary/20 text-white rounded-full p-4 w-fit mb-4">
                  <Icon className="h-12 w-12" />
              </div>
              <h2 className="font-headline text-3xl md:text-4xl font-bold">{title}</h2>
            </div>
            <div className="md:col-span-2 text-white">
              <p className="font-body text-lg mb-6">{description}</p>
              <Button asChild size="lg" variant={isHomePage ? "outline" : "default"}>
                  <Link href="/contact">
                      Get a Quote <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
