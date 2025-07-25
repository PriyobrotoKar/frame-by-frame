import Image from 'next/image';
import SectionTitle from './SectionTitle';
import Animate from './Animate';
import { Button } from './ui/button';

export default function Stats() {
  return (
    <section className="relative space-y-10 overflow-hidden px-6 py-16 md:py-32 lg:px-0">
      <SectionTitle
        title={'Revolutionizing digital growth.'}
        subtitle={'150+ GLOBAL STUDENTS'}
        className="mt-32"
      />
      <Animate className="space-y-12 text-center" delay={0.4}>
        <p className="mx-auto max-w-72 text-center md:max-w-screen-sm">
          Learn the industry-standard editing workflow that makes you
          indispensable and puts you in control of your income.
        </p>
        <a href="https://discord.gg/devgotmoney" className="md:hidden">
          <Button variant={'outline'} size={'sm'}>
            Join Discord
          </Button>
        </a>
      </Animate>

      <div className="from-background absolute bottom-0 -z-10 h-1/2 w-full bg-gradient-to-t"></div>
      <Animate
        duration={2}
        hidden={{
          opacity: 0,
          rotate: 40,
        }}
        className="absolute left-0 right-0 top-1/2 -z-20 mx-auto aspect-square max-w-screen-2xl -translate-y-1/2 sm:-translate-y-[20%] md:-translate-y-1/4"
      >
        <div>
          <div className="bg-background absolute inset-0 h-[60vh] w-full translate-y-1/3 scale-[1.8] rounded-full blur-3xl md:h-[200vh] md:translate-y-[20%] md:scale-125"></div>
          <Image
            src={'/earth.png'}
            className="relative -z-10 h-full w-full scale-[1.6] object-cover opacity-40 md:scale-125"
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
