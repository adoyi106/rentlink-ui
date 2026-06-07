import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import HowItWorks from "@/components/home/HowItWorks";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import CTABanner from "@/components/home/CTABanner";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <StatsBar />
      <FeaturedProperties />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <CTABanner />
    </main>
  );
}
