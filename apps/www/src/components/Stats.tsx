import Image from 'next/image';
import SectionTitle from './SectionTitle';
import Animate from './Animate';
import { Button } from './ui/button';

export default function Stats() {
  return (
    <section className="space-y-10 px-6 lg:px-0 py-16 md:py-32 relative overflow-hidden">
      <SectionTitle
        title={'Our Students are revolutionizing digital growth'}
        subtitle={'150+ GLOBAL STUDENTS'}
        className="mt-32"
      />
      <Animate className="text-center space-y-12" delay={0.4}>
        <p className="max-w-72 md:max-w-screen-sm mx-auto text-center">
          Learn the industry-standard editing workflow that makes you
          indispensable and puts you in control of your income.
        </p>
        <a href="https://discord.gg/devgotmoney">
          <Button variant={'outline'} size={'sm'}>
            Join Discord
          </Button>
        </a>
      </Animate>

      <div className="bg-gradient-to-t -z-10 from-background  w-full h-1/2 absolute bottom-0 "></div>
      <Animate
        duration={2}
        hidden={{
          opacity: 0,
          rotate: 40,
        }}
        className="absolute top-1/2 -translate-y-1/2 sm:-translate-y-[20%] md:-translate-y-1/4  max-w-screen-2xl mx-auto left-0 right-0 aspect-square -z-20"
      >
        <div>
          <div className="bg-background blur-3xl rounded-full translate-y-1/3 md:translate-y-[20%] w-full scale-[1.8] md:scale-125 h-[60vh] md:h-[200vh] absolute inset-0"></div>
          <Image
            src={'/earth.png'}
            className="w-full opacity-40 h-full object-cover scale-[1.6] md:scale-125 -z-10 relative"
            alt="Earth"
            width={1980}
            height={1980}
            priority
          />
        </div>
      </Animate>
    </section>
  );
}
