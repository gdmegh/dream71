import Contact from '@/components/sections/contact';
import Image from 'next/image';

export default function ContactPage() {
  return(
    <>
      <section className="bg-primary/5 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground">Contact Us</h1>
              <p className="font-body mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                  We are here to assist with any questions you may have and are eager to hear from you. Whether it's a new project idea or a simple inquiry, our team is ready to provide you with the support you need.
              </p>
          </div>
      </section>
      <Contact />
      <section className='py-20 bg-background'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className="relative h-[500px] w-full">
                <Image
                    src="https://placehold.co/1200x500.png"
                    alt="Map showing office location"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-[20px]"
                    data-ai-hint="map"
                />
            </div>
        </div>
      </section>
    </>
  );
}
