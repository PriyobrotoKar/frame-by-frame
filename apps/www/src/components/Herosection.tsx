import Image from 'next/image';
import Animate from './Animate';
import { Button } from './ui/button';
import YoutubePlayer from './YoutubePlayer';
import { Dialog, DialogTrigger } from './ui/dialog';
import ScheduleDialog from './ScheduleDialog';

export default function HeroSection() {
  return (
    <section className="mx-auto max-w-screen-md px-6 text-center lg:px-0">
      <div className="absolute inset-0 -z-20 flex h-[150vh] w-full justify-between overflow-hidden md:h-[150rem]">
        <div className="bg-accent md:blur-4xl h-[30rem] w-[40rem] -translate-x-3/4 rounded-[50%] blur-3xl md:h-[65rem]"></div>
        <div className="bg-accent md:blur-4xl relative right-0 h-[30rem] w-[40rem] translate-x-1/2 translate-y-full rounded-[50%] blur-3xl md:h-[65rem] md:translate-y-1/2"></div>
      </div>

      <Animate className="pt-16 md:pt-0">
        <h1 className="text-h1 text-primary-foreground md:text-display mx-auto max-w-md tracking-tight md:max-w-none">
          Grow on socials & print money on{' '}
          <span className="from-primary via-secondary to-primary bg-gradient-to-r via-20% bg-clip-text text-transparent">
            autopilot.
          </span>
        </h1>
        <p className="mx-auto mt-10 max-w-80 text-lg md:max-w-xl">
          Master the exact systems elite creators use to scale fast and monetize
          their brands without chasing trends.
        </p>
        <div className="mt-12 block md:hidden">
          <YoutubePlayer />
        </div>
        <Dialog>
          <DialogTrigger asChild className="mt-12">
            <Button>Take Action</Button>
          </DialogTrigger>

          <ScheduleDialog />
        </Dialog>
        <div className="mt-12 flex justify-center gap-4">
          <div className="flex">
            {new Array(4).fill(0).map((_, i) => (
              <div
                className="-ml-2 size-6 overflow-hidden rounded-full"
                key={i}
              >
                <Image
                  src={`/people${i + 1}.jpg`}
                  alt="Profile Picture"
                  className="h-full w-full object-cover"
                  width={24}
                  height={24}
                />
              </div>
            ))}
          </div>
          <div className="text-sm tracking-wider">
            <span className="text-sm-semibold mr-2">350+</span>
            global joins
          </div>
        </div>
        <div className="hidden pt-20 md:block">
          <YoutubePlayer />
        </div>
      </Animate>
    </section>
  );
}
