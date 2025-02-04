import Image from "next/image";
import SectionTitle from "./SectionTitle";
import Animate from "./Animate";

export default function Stats() {
  return (
    <section className="space-y-10 py-40 relative">
      <Animate
        duration={2}
        hidden={{
          opacity: 0,
          rotate: 40,
        }}
        className="absolute top-1/2 -translate-y-1/4 overflow-hidden max-w-screen-2xl mx-auto left-0 right-0 aspect-square -z-10"
      >
        <div>
          <div className="bg-background blur-3xl rounded-full translate-y-[20%] w-full scale-125 h-[200vh] absolute inset-0"></div>
          <Image
            src={"/earth.png"}
            className="w-full opacity-40 h-full object-cover scale-125 -z-10 relative"
            alt="Earth"
            width={1980}
            height={1980}
          />
        </div>
      </Animate>
      <SectionTitle
        title={"Our Students are revolutionizing digital growth"}
        subtitle={"150+ GLOBAL STUDENTS"}
      />
      <Animate delay={0.4}>
        <p className="max-w-screen-sm mx-auto text-center">
          Learn the industry-standard editing workflow that makes you
          indispensable and puts you in control of your income.
        </p>
      </Animate>
    </section>
  );
}
