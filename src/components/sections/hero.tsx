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
                        The full <span className="inline-flex items-center gap-2">Stack <Braces className="h-12 w-12 text-primary" /></span> Software{' '}
                        <span className="relative inline-block">
                            <span className="relative z-10 text-primary">Solutions</span>
                            <svg
                                viewBox="0 0 500 150"
                                preserveAspectRatio="none"
                                className="absolute -top-4 -left-6 w-[130%] h-[150%] text-primary z-0"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M8,83.2c6.2-28.2,24.4-48.4,51.8-59.5C108.3,10.2,168-3.6,227.1,1.8c66.9,6.1,130.1,32.8,185.3,71.7 c28,19.7,51.2,46.5,69.5,77.3"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </span>
                    </h1>
                </div>
                <div className="w-full max-w-6xl mt-16 group">
                   <Image
                        src="/images/heroimage.png"
                        alt="Hero Image"
                        width={1200}
                        height={600}
                        className="rounded-[50px] shadow-2xl transition-transform duration-500 ease-in-out group-hover:scale-105 w-full"
                        data-ai-hint="software development"
                    />
                </div>
            </div>
        </section>
    );
}
