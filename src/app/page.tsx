import Hero from '@/components/sections/hero';
import Services from '@/components/sections/services';
import Portfolio from '@/components/sections/portfolio';
import Testimonials from '@/components/sections/testimonials';
import WhyChooseUs from '@/components/sections/why-choose-us';
import FeaturedClients from '@/components/sections/featured-clients';
import CtaSection from '@/components/sections/cta-section';
import AboutSection from '@/components/sections/about-section';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <Services />
      <WhyChooseUs />
      <Portfolio />
      <Testimonials />
      <CtaSection />
      <FeaturedClients />
    </>
  );
}
