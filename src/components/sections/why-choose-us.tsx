
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';

const features = [
  "Proven track record of delivering high-quality software solutions.",
  "Dedicated team of experienced professionals passionate about technology.",
  "Client-centric approach, tailoring solutions to exceed expectations.",
  "Building long-term partnerships based on transparency and trust.",
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-20 bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground mb-4">
              Your Trusted Partner for Digital Innovation and Excellence
            </h2>
            <p className="font-body text-lg text-muted-foreground mb-8 max-w-xl mx-auto md:mx-0">
              We are more than just a software company. We are your dedicated partner in navigating the complexities of the digital landscape, committed to turning your ambitious vision into a tangible reality with solutions that are built to last.
            </p>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start md:items-center text-left">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-1 md:mt-0" />
                  <span className="text-muted-foreground font-body">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Image
              src="/images/whyus.jpg"
              alt="Team collaborating"
              width={800}
              height={600}
              className="rounded-lg shadow-xl mx-auto"
              data-ai-hint="team collaboration"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
