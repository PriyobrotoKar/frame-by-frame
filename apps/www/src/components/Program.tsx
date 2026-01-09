import Image from 'next/image';
import Animate from './Animate';
import { Button } from './ui/button';
import { Dialog, DialogTrigger } from './ui/dialog';
import Paralax from './Parallax';
import ScheduleDialog from './ScheduleDialog';

interface Service {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

const services: Service[] = [
  {
    subtitle: 'Tactical Guidance',
    title: 'Founder-to-Founder Strategy Call',
    description:
      'You sit down weekly with a content strategist who’s been in the trenches, mapping growth, refining brand tone, building offers for your brand.',
    image: '/services/image-1.png',
  },
  {
    subtitle: '30 Viral-Ready Reels',
    title: 'Short-form content, done for you.',
    description:
      'We produce 20-30 professionally edited, platform-optimized reels every month, designed to hook, retain, and convert your audience.',
    image: '/services/image-2.png',
  },
  {
    title: 'You pick, we execute.',
    subtitle: '50+ Battle-Tested Idea',
    description:
      'A pool of 50 proven, trend-backed, and niche-tuned content ideas served monthly. So you stay relevant, without ever asking, “What should I post today?”',
    image: '/services/image-3.png',
  },
  {
    title: 'Conversion-Ready Scripting',
    subtitle: 'Impossible to Ignore',
    description:
      'We dissect your ideas and rebuild them using psychology, retention science, and storytelling frameworks.',
    image: '/services/image-4.png',
  },
  {
    title: 'Cinematic Cuts That Sell',
    subtitle: 'Visuals Built for ViralitY',
    description:
      'You get high-end, scroll-stopping edits that blend storytelling with trend-savvy visuals built to elevate your personal brand.',
    image: '/services/image-5.png',
  },
  {
    title: 'Don’t Guess. Optimize.',
    subtitle: 'Tactical Data Review',
    description:
      'Weekly data breakdowns showing what’s hitting, what’s missing, and how we pivot. Strategic insight to refine and scale what actually converts.',
    image: '/services/image-6.png',
  },
];

export default function Program() {
  return (
    <section className="relative space-y-16 overflow-hidden md:space-y-24">
      <div className="space-y-10 md:space-y-20">
        <Animate
          className={
            'mx-auto mt-32 max-w-md space-y-5 text-center md:max-w-screen-md md:space-y-8'
          }
        >
          <p className="text-sm-semibold from-secondary via-primary to-secondary bg-gradient-to-r bg-clip-text tracking-widest text-transparent md:text-xl">
            THE SERVICE
          </p>
          <h2 className="text-h1 text-primary-foreground md:text-display">
            We handle{' '}
            <span className="from-primary via-secondary to-primary bg-gradient-to-r via-20% bg-clip-text text-transparent">
              everything
            </span>{' '}
            for you.
          </h2>
        </Animate>

        <div className="absolute inset-0 -z-20 h-full w-full overflow-y-visible">
          <div className="bg-accent md:blur-4xl h-[30rem] w-[20rem] -translate-x-3/4 translate-y-0 rounded-[50%] blur-3xl md:h-[65rem]"></div>
          <div className="bg-accent/60 blur-4xl relative left-1/2 top-0 hidden h-[65rem] w-[40rem] -translate-x-1/2 -translate-y-2/3 rounded-[50%] md:block"></div>
        </div>

        <div className="flex justify-center gap-0 pb-40 md:gap-16">
          <Paralax
            inputRange={[0, 1]}
            outputRangeY={[150, -50]}
            axis="y"
            offset={['start end', 'end start']}
            className="z-0"
          >
            <div className="relative flex aspect-[3/5] w-32 -rotate-3 items-center justify-center overflow-hidden rounded-lg shadow-lg md:w-60">
              <video
                src={'/reels/reel-1.mp4'}
                autoPlay
                playsInline
                loop
                muted
                width={300}
                height={600}
              />
            </div>
          </Paralax>
          <Paralax
            inputRange={[0, 1]}
            outputRangeY={[150, 50]}
            axis="y"
            offset={['start end', 'end start']}
            className="z-10 shadow-xl"
          >
            <div className="relative flex aspect-[3/5] w-32 rotate-[4deg] items-center justify-center overflow-hidden rounded-lg shadow-lg md:w-60">
              <video
                src={'/reels/reel-2.mp4'}
                loop
                autoPlay
                playsInline
                muted
                width={300}
                height={600}
              />
            </div>
          </Paralax>
          <Paralax
            inputRange={[0, 1]}
            outputRangeY={[150, -100]}
            axis="y"
            offset={['start end', 'end start']}
            className="z-0"
          >
            <div className="relative flex aspect-[3/5] w-32 -rotate-2 items-center justify-center overflow-hidden rounded-lg shadow-lg md:w-60">
              <video
                src={'/reels/reel-3.mp4'}
                autoPlay
                playsInline
                loop
                muted
                width={300}
                height={600}
              />
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
        className="space-y-10 px-10 pt-4 md:pt-0"
      >
        {services.map((service, i) => {
          return (
            <div key={i}>
              <div className="md:hidden">
                <ServiceCard service={service} size="sm" />
              </div>
              <div className="hidden md:block">
                <ServiceCard service={service} size="lg" />
              </div>
            </div>
          );
        })}
      </Animate>
      <div className="relative !mt-8 py-20">
        <div className="bg-accent/50 absolute bottom-40 left-1/2 top-1/2 -z-20 h-[10rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-3xl"></div>
        <Animate className="mx-auto max-w-md space-y-6 px-6 text-center md:max-w-screen-md md:py-20">
          <p className="mx-auto max-w-80 md:max-w-xl">
            Master the exact systems elite creators use to scale fast and
            monetize their brands without chasing trends.
          </p>
          <Dialog>
            <DialogTrigger asChild className="mt-6">
              <Button>Get in touch now</Button>
            </DialogTrigger>

            <ScheduleDialog />
          </Dialog>
        </Animate>
      </div>
    </section>
  );
}

const ServiceCard = ({
  service,
  size = 'lg',
}: {
  service: Service;
  size: 'sm' | 'lg';
}) => {
  if (size === 'sm') {
    return (
      <div
        key={service.title}
        className="from-accent mx-auto max-w-4xl justify-center space-y-2 rounded-xl border bg-gradient-to-r p-6"
      >
        <div className="flex flex-col gap-4">
          <div className="shrink-0">
            <Image
              className="rounded-lg object-cover"
              src={service.image}
              alt={service.title}
              width={68}
              height={68}
            />
          </div>
          <div className="space-y-2 md:space-y-2">
            <p className="text-primary text-xs font-semibold uppercase tracking-widest">
              {service.subtitle}
            </p>
            <h3 className="text-primary-foreground text-lg md:text-xl">
              {service.title}
            </h3>
          </div>
        </div>

        <p>{service.description}</p>
      </div>
    );
  }

  return (
    <div
      key={service.title}
      className="from-accent mx-auto flex max-w-4xl flex-col justify-center gap-5 rounded-xl border bg-gradient-to-r p-8 md:flex-row"
    >
      <div className="shrink-0">
        <Image
          className="rounded-lg object-cover"
          src={service.image}
          alt={service.title}
          width={135}
          height={135}
        />
      </div>
      <div className="flex-1 space-y-4 md:space-y-6">
        <div className="space-y-2 md:space-y-2">
          <p className="text-primary font-semibold uppercase tracking-widest">
            {service.subtitle}
          </p>
          <h3 className="text-primary-foreground text-lg md:text-xl">
            {service.title}
          </h3>
        </div>
        <p>{service.description}</p>
      </div>
    </div>
  );
};
