import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CtaSection() {
  return (
    <section className="bg-primary/5 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground mb-4">
          Have a Project in Mind?
        </h2>
        <p className="font-body text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Let's collaborate to create something truly remarkable. Reach out to us today to discuss your ideas, and let's explore how we can help you achieve your business goals and bring your vision to life.
        </p>
        <Button asChild size="lg">
          <Link href="/contact">
            Get a Free Quote <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
