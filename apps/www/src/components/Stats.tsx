import Image from 'next/image';
import Animate from './Animate';

export default function Stats() {
  return (
    <section className="relative space-y-10 overflow-hidden px-0 py-40 md:py-60 lg:px-0">
      <Animate
        className={
          'mx-auto mt-32 max-w-md space-y-8 text-center md:max-w-screen-md'
        }
      >
        <p className="text-sm-semibold from-secondary via-primary to-secondary bg-gradient-to-r bg-clip-text tracking-widest text-transparent md:text-xl">
          150+ GLOBAL STUDENTS
        </p>
        <h2 className="text-h1 text-primary-foreground md:text-display">
          Revolutionizing digital{' '}
          <span className="from-primary via-secondary to-primary bg-gradient-to-r via-20% bg-clip-text text-transparent">
            growth.
          </span>
        </h2>
      </Animate>
      <Animate className="space-y-12 text-center" delay={0.4}>
        <p className="mx-auto max-w-72 text-center md:max-w-screen-sm">
          Learn the industry-standard editing workflow that makes you
          indispensable and puts you in control of your income.
        </p>
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
          <div className="bg-background absolute inset-0 h-[60vh] w-full translate-y-1/3 scale-[1.8] rounded-full blur-3xl md:h-[130rem] md:translate-y-[20%] md:scale-125"></div>
          <Image
            src={'/earth.png'}
            className="relative -z-10 h-full w-full scale-[1.6] object-cover opacity-60 sepia-[60%] md:scale-125"
            alt="Earth"
            width={1980}
            height={1980}
            priority
          />
          <div className="bg-primary/60 absolute inset-0 left-1/2 -z-10 h-[60vh] w-3/4 -translate-x-1/2 translate-y-1/2 scale-[1.8] rounded-full blur-3xl md:h-[100rem] md:translate-y-[15%] md:scale-125"></div>
        </div>
      </Animate>
    </section>
  );
}
