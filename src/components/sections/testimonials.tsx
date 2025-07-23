
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "John Doe",
    title: "CEO, Tech Innovators",
    avatar: "https://placehold.co/100x100.png",
    testimonial: "Dream71's team is incredibly talented. They delivered our project on time and exceeded our expectations with their quality and professionalism.",
    dataAiHint: "man face"
  },
  {
    name: "Jane Smith",
    title: "Product Manager, Creative Solutions",
    avatar: "https://placehold.co/100x100.png",
    testimonial: "Working with Dream71 was a fantastic experience. Their communication was clear, and they were always responsive to our needs. Highly recommended!",
    dataAiHint: "woman face"
  },
  {
    name: "Samuel Green",
    title: "CTO, Future Corp",
    avatar: "https://placehold.co/100x100.png",
    testimonial: "The mobile app they developed for us is a masterpiece of design and functionality. It has significantly boosted our user engagement.",
    dataAiHint: "person portrait"
  },
];

export default function Testimonials() {
  return (
    <section 
      id="testimonials" 
      className="relative py-20 md:py-32 bg-cover bg-fixed bg-center bg-no-repeat"
      style={{ backgroundImage: `url('https://placehold.co/1920x1080.png')` }}
      data-ai-hint="happy clients"
    >
      <div className="absolute inset-0 bg-primary/80"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary-foreground">What Our Clients Say</h2>
          <p className="font-body text-lg text-primary-foreground/80 mt-4 max-w-2xl mx-auto">
            We are proud to have earned the trust of our clients.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((item, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="h-full bg-background/90 backdrop-blur-sm">
                      <CardContent className="flex flex-col items-center text-center p-8 md:p-12 h-full">
                          <p className="text-muted-foreground font-body text-lg mb-8 flex-grow">"{item.testimonial}"</p>
                          <div className="flex items-center">
                              <Avatar className="h-16 w-16 mr-4">
                                  <AvatarImage src={item.avatar} alt={item.name} data-ai-hint={item.dataAiHint} />
                                  <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                  <p className="font-headline text-xl font-semibold">{item.name}</p>
                                  <p className="text-md text-muted-foreground">{item.title}</p>
                              </div>
                          </div>
                      </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-foreground bg-background/50 hover:bg-background/80 border-none"/>
          <CarouselNext className="text-foreground bg-background/50 hover:bg-background/80 border-none"/>
        </Carousel>
      </div>
    </section>
  );
}
