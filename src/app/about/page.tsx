import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle } from 'lucide-react';

const teamMembers = [
    { name: "Rashid Ahmed", role: "Founder & CEO", image: "https://placehold.co/100x100.png", dataAiHint: "man portrait" },
    { name: "Fatima Khan", role: "Chief Technology Officer", image: "https://placehold.co/100x100.png", dataAiHint: "woman portrait" },
    { name: "Zayn Malik", role: "Head of Product", image: "https://placehold.co/100x100.png", dataAiHint: "man face" },
    { name: "Aisha Begum", role: "Lead UI/UX Designer", image: "https://placehold.co/100x100.png", dataAiHint: "woman face" },
];

const values = [
    "Innovation at our core",
    "Customer-centric approach",
    "Commitment to quality",
    "Integrity and transparency",
    "Collaborative teamwork"
];

export default function AboutPage() {
    return (
        <>
            <section className="bg-primary/5 py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground">About Dream71</h1>
                    <p className="font-body mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                        We are a passionate team of developers, designers, and strategists dedicated to building exceptional digital products that drive growth and success for our clients.
                    </p>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="font-headline text-3xl font-bold text-foreground mb-4">Our Mission</h2>
                            <p className="font-body text-muted-foreground mb-6">
                                Our mission is to empower businesses with transformative technology. We strive to be a trusted partner for our clients, providing them with innovative and reliable software solutions that solve real-world problems and create lasting value. We are committed to fostering a culture of learning and growth, both for our team and our clients.
                            </p>
                            <h3 className="font-headline text-2xl font-bold text-foreground mb-4">Our Core Values</h3>
                            <ul className="space-y-3">
                                {values.map((value, index) => (
                                    <li key={index} className="flex items-center font-body text-muted-foreground">
                                        <CheckCircle className="h-5 w-5 mr-3 text-primary" />
                                        {value}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <Image
                                src="https://placehold.co/600x450.png"
                                alt="Dream71 team in a meeting"
                                width={600}
                                height={450}
                                className="rounded-lg shadow-xl"
                                data-ai-hint="team meeting"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section id="team" className="py-20 bg-primary/5">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">Meet Our Leadership</h2>
                        <p className="font-body text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                            The driving force behind our innovation and success.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member) => (
                            <Card key={member.name} className="text-center">
                                <CardContent className="p-6">
                                    <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/20">
                                        <AvatarImage src={member.image} alt={member.name} data-ai-hint={member.dataAiHint} />
                                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <h3 className="font-headline text-lg font-semibold">{member.name}</h3>
                                    <p className="text-primary font-medium">{member.role}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
