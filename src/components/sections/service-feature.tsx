import { type LucideIcon } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Card } from '../ui/card';

interface ServiceFeatureProps {
  Icon: LucideIcon;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  reverse?: boolean;
}

export default function ServiceFeature({ Icon, title, description, imageUrl, imageHint, reverse = false }: ServiceFeatureProps) {
  return (
    <div className={cn("grid md:grid-cols-2 gap-8 md:gap-12 items-center")}>
        <div className={cn("relative", reverse && "md:order-last")}>
            <Image
                src={imageUrl}
                alt={title}
                width={600}
                height={400}
                data-ai-hint={imageHint}
                className="rounded-lg shadow-xl w-full h-auto"
            />
        </div>
        <div>
            <div className='flex items-center gap-4 mb-4'>
                <div className="bg-primary/10 text-primary rounded-lg p-3">
                    <Icon className="h-8 w-8" />
                </div>
                <h3 className="font-headline text-2xl font-bold text-foreground">{title}</h3>
            </div>
            <p className="text-muted-foreground font-body">{description}</p>
        </div>
    </div>
  );
}
