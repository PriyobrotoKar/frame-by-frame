import Image from "next/image";
import SectionTitle from "./SectionTitle";
import { Bethaine } from "@/fonts";
import Animate from "./Animate";
import { Button } from "./ui/button";

interface Program {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  price: string;
}

const programs: Program[] = [
  {
    title: "Learn Basic of Video Editing & Sound Designing",
    subtitle: "THE FOUNDATION",
    description:
      "Essential skills for stunning videos and high-paying clients. Composing, color grading, sound design, and basic animation.",
    image: "/programs/video-editing.jpg",
    price: "₹ 60,000",
  },
  {
    title: "Learn Advanced Animation & Motion Graphics",
    subtitle: "THE MASTERY",
    description:
      "High impact visuals using Adobe After Effects. Advanced animations. motion graphics and 3D editing.",
    image: "/programs/animation.jpg",
    price: "₹ 1,50,000",
  },
];

export default function Program() {
  return (
    <section className="space-y-44">
      <SectionTitle
        title="Practical Lessons from Industry Experts"
        subtitle="THE PROGRAM"
      />
      <div className="flex justify-center gap-4">
        <Animate
          hidden={{
            x: 70,
            rotate: -10,
          }}
          margin="-40%"
          className="relative z-20"
        >
          <div className="rounded-lg overflow-hidden relative">
            <Image
              src={"/instructor2.jpg"}
              alt="Instructor 2"
              width={240}
              height={400}
            />
            <div
              className={`${Bethaine.className} text-display font-normal absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-50% flex items-end justify-center text-primary-foreground w-full h-full`}
            >
              foundation
            </div>
          </div>
        </Animate>
        <Animate
          margin="-40%"
          hidden={{
            x: -70,
            rotate: 10,
          }}
        >
          <div className="rounded-lg overflow-hidden relative">
            <Image
              src={"/instructor1.jpg"}
              alt="Instructor 1"
              className="rounded-lg"
              width={240}
              height={400}
            />
            <div
              className={`${Bethaine.className} text-display font-normal absolute inset-0 bg-gradient-to-t from-red-600 via-red-600/40 to-50% flex items-end justify-center text-primary-foreground w-full h-full`}
            >
              mastery
            </div>
          </div>
        </Animate>
      </div>
      <Animate
        hidden={{
          opacity: 0,
          y: 20,
          scale: 0.95,
        }}
        className="space-y-28"
      >
        {programs.map((program) => {
          return (
            <div
              key={program.title}
              className="flex max-w-4xl mx-auto justify-center gap-16"
            >
              <div className="flex-1 space-y-6">
                <div className="space-y-4">
                  <p className="tracking-widest text-primary font-semibold">
                    {program.subtitle}
                  </p>
                  <h3 className="text-h1">{program.title}</h3>
                </div>
                <p>{program.description}</p>
                <p className="text-primary text-xs">{program.price} Value</p>
              </div>
              <div className="flex-1">
                <Image
                  className="w-full rounded-lg h-full object-cover"
                  src={program.image}
                  alt={program.title}
                  width={240}
                  height={160}
                />
              </div>
            </div>
          );
        })}
      </Animate>
      <Animate className="text-center max-w-screen-md mx-auto space-y-6">
        <h2 className="text-h1">Beginner to Advance Coverage</h2>
        <p>
          From beginner to advanced—master the skills, build your brand, and
          start closing high-paying clients with confidence
        </p>
        <Button>Pre-enroll & save</Button>
      </Animate>
    </section>
  );
}
