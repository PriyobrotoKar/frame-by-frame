import HeroSection from "@/components/Herosection";
import Program from "@/components/Program";
import Stats from "@/components/Stats";

export default function Home() {
  return (
    <div className="my-36 space-y-40">
      <HeroSection />
      <Stats />
      <Program />
    </div>
  );
}
