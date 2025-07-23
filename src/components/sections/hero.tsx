import { Braces } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
    return (
        <section
            id="home"
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
                        className="rounded-lg shadow-2xl transition-transform duration-500 ease-in-out group-hover:scale-105 w-full"
                        data-ai-hint="software development"
                    />
                </div>
            </div>
        </section>
    );
}
