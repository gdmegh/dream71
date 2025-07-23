import Image from 'next/image';

const clientLogos = [
    { src: "https://placehold.co/150x60.png?text=Client+A", alt: "Client A", dataAiHint: "logo" },
    { src: "https://placehold.co/150x60.png?text=Client+B", alt: "Client B", dataAiHint: "logo" },
    { src: "https://placehold.co/150x60.png?text=Client+C", alt: "Client C", dataAiHint: "logo" },
    { src: "https://placehold.co/150x60.png?text=Client+D", alt: "Client D", dataAiHint: "logo" },
    { src: "https://placehold.co/150x60.png?text=Client+E", alt: "Client E", dataAiHint: "logo" },
    { src: "https://placehold.co/150x60.png?text=Client+F", alt: "Client F", dataAiHint: "logo" },
];

export default function FeaturedClients() {
    return (
        <section className="py-12 bg-primary/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h3 className="text-center font-headline text-2xl font-semibold text-foreground mb-8">
                    Trusted by Industry Leaders
                </h3>
                <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 md:gap-x-12">
                    {clientLogos.map((logo, index) => (
                        <div key={index} className="flex justify-center">
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                width={150}
                                height={60}
                                data-ai-hint={logo.dataAiHint}
                                className="w-auto h-10 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
