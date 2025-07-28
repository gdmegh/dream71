import Hero from '@/components/sections/hero';
import Services from '@/components/sections/services';
import Testimonials from '@/components/sections/testimonials';
import WhyChooseUs from '@/components/sections/why-choose-us';
import FeaturedClients from '@/components/sections/featured-clients';
import CtaSection from '@/components/sections/cta-section';
import AboutSection from '@/components/sections/about-section';
import HomeNews from '@/components/sections/home-news';
import HomeBlog from '@/components/sections/home-blog';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <Services />
      <WhyChooseUs />
      <HomeNews />
      <HomeBlog />
      <Testimonials />
      <CtaSection />
      <FeaturedClients />
    </>
  );
}
