import Image from 'next/image';
import SectionTitle from './SectionTitle';
import { Bethaine } from '@/fonts';
import Animate from './Animate';
import { Button } from './ui/button';
import { Dialog, DialogTrigger } from './ui/dialog';
import WaitlistDialogContent from './WaitlistDialogConent';
import Paralax from './Parallax';

interface Program {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  price: string;
}

const programs: Program[] = [
  {
    title: 'Learn Basic of Video Editing & Sound Designing',
    subtitle: 'THE FOUNDATION',
    description:
      'Essential skills for stunning videos and high-paying clients. Composing, color grading, sound design, and basic animation.',
    image: '/programs/video-editing.jpg',
    price: '₹ 60,000',
  },
  {
    title: 'Learn Advanced Animation & Motion Graphics',
    subtitle: 'THE MASTERY',
    description:
      'High impact visuals using Adobe After Effects. Advanced animations. motion graphics and 3D editing.',
    image: '/programs/animation.jpg',
    price: '₹ 1,50,000',
  },
];

export default function Program() {
  return (
    <section className="relative space-y-16 md:space-y-60">
      <div className="space-y-20">
        <SectionTitle
          title="We handle everything for you."
          subtitle="THE SERVICE"
          className="px-6"
        />
        <div className="absolute inset-0 -z-20 h-full w-full overflow-y-visible">
          <div className="bg-accent md:blur-4xl h-[30rem] w-[20rem] -translate-x-3/4 translate-y-0 rounded-[50%] blur-3xl md:h-[65rem]"></div>
          <div className="bg-accent/60 blur-4xl relative left-1/2 top-0 hidden h-[65rem] w-[40rem] -translate-x-1/2 -translate-y-2/3 rounded-[50%] md:block"></div>
        </div>

        <div className="flex justify-center gap-6 md:gap-6">
          <Paralax
            inputRange={[0, 1]}
            outputRangeY={[100, -50]}
            outputRangeX={[0, -50]}
            offset={['start end', 'end start']}
          >
            <div className="relative w-36 -rotate-2 overflow-hidden rounded-lg md:w-60">
              <Image
                src={'/instructor2.jpg'}
                alt="Instructor 2"
                width={340}
                height={500}
              />
              <div
                className={`${Bethaine.className} text-h1 md:text-display from-primary via-primary/40 text-primary-foreground absolute inset-0 flex h-full w-full items-end justify-center bg-gradient-to-t to-50% font-normal md:font-normal`}
              >
                foundation
              </div>
            </div>
          </Paralax>
          <Paralax
            inputRange={[0, 1]}
            outputRangeY={[100, -100]}
            axis="y"
            offset={['start end', 'end start']}
          >
            <div className="relative w-36 rotate-2 overflow-hidden rounded-lg md:w-60">
              <Image
                src={'/instructor1.jpg'}
                alt="Instructor 1"
                className="rounded-lg"
                width={340}
                height={500}
              />
              <div
                className={`${Bethaine.className} text-h1 md:text-display text-primary-foreground absolute inset-0 flex h-full w-full items-end justify-center bg-gradient-to-t from-red-600 via-red-600/40 to-50% font-normal md:font-normal`}
              >
                mastery
              </div>
            </div>
          </Paralax>
        </div>
      </div>
      <Animate
        hidden={{
          opacity: 0,
          y: 20,
          scale: 0.95,
        }}
        className="space-y-28 px-10 pt-28 md:pt-0"
      >
        {programs.map((program) => {
          return (
            <div
              key={program.title}
              className="mx-auto flex max-w-4xl flex-col justify-center gap-16 md:flex-row"
            >
              <div className="flex-1 space-y-4 md:space-y-6">
                <div className="space-y-2 md:space-y-4">
                  <p className="text-primary font-semibold tracking-widest">
                    {program.subtitle}
                  </p>
                  <h3 className="md:text-h1 text-lg">{program.title}</h3>
                </div>
                <p>{program.description}</p>
                <p className="text-primary text-xs">{program.price} Value</p>
              </div>
              <div className="flex-1">
                <Image
                  className="h-full w-full rounded-lg object-cover"
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
        <div className="bg-accent/50 absolute bottom-28 left-1/2 top-1/2 -z-20 h-[10rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-3xl"></div>
        <Animate className="mx-auto max-w-md space-y-6 px-6 py-20 text-center md:max-w-screen-md">
          <h2 className="text-display">Beginner to Advanced Coverage</h2>
          <p className="mx-auto max-w-80 md:max-w-screen-md">
            From beginner to advanced—master the skills, build your brand, and
            start closing high-paying clients with confidence
          </p>
          <Dialog>
            <DialogTrigger asChild className="mt-6">
              <Button>Take Action</Button>
            </DialogTrigger>

            <WaitlistDialogContent />
          </Dialog>
        </Animate>
      </div>
    </section>
  );
}
