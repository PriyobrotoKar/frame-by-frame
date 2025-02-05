import Footer from "@/components/Footer";
import HeroSection from "@/components/Herosection";
import Program from "@/components/Program";
import Stats from "@/components/Stats";
import Testimonial from "@/components/Testimonial";

export default function Home() {
  return (
    <div className="my-36 space-y-40">
      <HeroSection />
      <Stats />
      <Program />
      <Testimonial />
      <Footer />
    </div>
  );
}
