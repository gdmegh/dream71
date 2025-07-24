import ParallaxService from '@/components/sections/parallax-service';
import { services } from '@/lib/services';


export default function ServicesPage() {
  return (
    <>
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground">Our Expertise</h1>
            <p className="font-body mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Explore our comprehensive suite of services designed to transform your visionary ideas into robust digital realities. Each service is powered by a dedicated team of seasoned experts committed to excellence.
            </p>
        </div>
      </section>
      {services.map((service, index) => (
        <ParallaxService 
          key={index}
          Icon={service.icon}
          title={service.title}
          description={service.description}
          imageUrl={service.imageUrl}
          imageHint={service.imageHint}
          isHomePage={false}
        />
      ))}
    </>
  );
}
