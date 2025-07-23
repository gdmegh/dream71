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
    <section id="testimonials" className="py-20 bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">What Our Clients Say</h2>
          <p className="font-body text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
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
                  <Card className="h-full">
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
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
