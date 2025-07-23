import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThumbsUp, Award, Users, Shield } from "lucide-react";

const features = [
    {
        icon: Award,
        title: "Proven Excellence",
        description: "We have a track record of delivering high-quality, award-winning software solutions that drive business growth.",
    },
    {
        icon: Users,
        title: "Expert Team",
        description: "Our team consists of experienced professionals who are passionate about technology and dedicated to your success.",
    },
    {
        icon: ThumbsUp,
        title: "Client-Centric Approach",
        description: "We work closely with you to understand your needs and deliver tailored solutions that exceed your expectations.",
    },
    {
        icon: Shield,
        title: "Reliability & Trust",
        description: "We build long-term partnerships with our clients based on transparency, integrity, and mutual trust.",
    },
];

export default function WhyChooseUs() {
    return (
        <section id="why-us" className="py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">Why Choose Dream71?</h2>
                    <p className="font-body text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                        We are more than just a software company. We are your partner in innovation and growth.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="text-center border-0 shadow-none bg-transparent">
                             <CardHeader className="items-center">
                                <div className="mx-auto bg-primary/10 text-primary rounded-full p-4 w-fit mb-4">
                                    <feature.icon className="h-8 w-8" />
                                </div>
                                <CardTitle className="font-headline">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground font-body">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
