import Image from "next/image";
import SectionTitle from "./SectionTitle";
import { Bethaine } from "@/fonts";
import Animate from "./Animate";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";
import WaitlistDialogContent from "./WaitlistDialogConent";

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
    <section className="space-y-16 relative md:space-y-44">
      <SectionTitle
        title="Practical Lessons from Industry Experts"
        subtitle="THE PROGRAM"
        className="px-6"
      />
      <div className="absolute inset-0 w-full -z-20 h-full   overflow-y-visible">
        <div className="bg-accent w-[20rem] h-[30rem] md:h-[65rem] -translate-x-3/4 translate-y-0 rounded-[50%] blur-3xl md:blur-4xl"></div>
        <div className="hidden md:block bg-accent/60  w-[40rem] h-[65rem] left-1/2 relative top-0 -translate-x-1/2 -translate-y-2/3  rounded-[50%] blur-4xl"></div>
      </div>

      <div className="flex justify-center gap-6 md:gap-12">
        <Animate
          hidden={{
            x: 60,
            rotate: -3,
          }}
          once={false}
          margin="-20%"
          className="relative z-20"
        >
          <div className="rounded-lg w-36 md:w-60 overflow-hidden relative">
            <Image
              src={"/instructor2.jpg"}
              alt="Instructor 2"
              width={340}
              height={500}
            />
            <div
              className={`${Bethaine.className} text-h1 md:text-display font-normal absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-50% flex items-end justify-center text-primary-foreground w-full h-full`}
            >
              foundation
            </div>
          </div>
        </Animate>
        <Animate
          once={false}
          margin="-20%"
          hidden={{
            x: -60,
            rotate: 3,
          }}
        >
          <div className="rounded-lg w-36 md:w-60 overflow-hidden relative">
            <Image
              src={"/instructor1.jpg"}
              alt="Instructor 1"
              className="rounded-lg"
              width={340}
              height={500}
            />
            <div
              className={`${Bethaine.className} text-h1 md:text-display font-normal absolute inset-0 bg-gradient-to-t from-red-600 via-red-600/40 to-50% flex items-end justify-center text-primary-foreground w-full h-full`}
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
        className="space-y-28 px-6"
      >
        {programs.map((program) => {
          return (
            <div
              key={program.title}
              className="flex flex-col md:flex-row max-w-4xl mx-auto justify-center gap-16"
            >
              <div className="flex-1 space-y-4 md:space-y-6">
                <div className="space-y-2 md:space-y-4">
                  <p className="tracking-widest text-primary font-semibold">
                    {program.subtitle}
                  </p>
                  <h3 className="text-lg md:text-h1">{program.title}</h3>
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
      <div className="relative overflow-hidden py-8">
        <div className="bg-accent/50 -z-20 w-[20rem] h-[10rem] top-1/2 -translate-y-1/2 absolute -translate-x-1/2 bottom-28 left-1/2 rounded-[50%] blur-3xl"></div>
        <Animate className="text-center max-w-md md:max-w-screen-md mx-auto space-y-6 py-20 px-6">
          <h2 className="text-h1">Beginner to Advanced Coverage</h2>
          <p className="max-w-80 md:max-w-screen-md mx-auto">
            From beginner to advanced—master the skills, build your brand, and
            start closing high-paying clients with confidence
          </p>
          <Dialog>
            <DialogTrigger asChild className="mt-4">
              <Button>Join Waitlist</Button>
            </DialogTrigger>

            <WaitlistDialogContent />
          </Dialog>
        </Animate>
      </div>
    </section>
  );
}
