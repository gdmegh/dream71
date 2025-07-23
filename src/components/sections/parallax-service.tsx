import { type LucideIcon } from 'lucide-react';

interface ParallaxServiceProps {
  Icon: LucideIcon;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
}

export default function ParallaxService({ Icon, title, description, imageUrl, imageHint }: ParallaxServiceProps) {
  return (
    <section 
      className="relative py-20 md:py-32 bg-cover bg-fixed bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${imageUrl})` }}
      data-ai-hint={imageHint}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center bg-background/80 text-foreground p-8 rounded-xl shadow-2xl">
            <div className="mx-auto bg-primary/10 text-primary rounded-full p-4 w-fit mb-4">
                <Icon className="h-10 w-10" />
            </div>
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="font-body text-lg text-muted-foreground">{description}</p>
        </div>
      </div>
    </section>
  );
}
