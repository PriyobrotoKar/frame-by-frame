import Image from "next/image";
import Animate from "./Animate";
import { Button } from "./ui/button";
import YoutubePlayer from "./YoutubePlayer";

export default function HeroSection() {
  return (
    <section className="max-w-screen-md mx-auto text-center  px-6 lg:px-0">
      <div className="absolute inset-0 w-full overflow-hidden -z-20 h-[150vh] md:h-[200vh] flex justify-between">
        <div className="bg-accent w-[40rem] h-[30rem] md:h-[65rem] -translate-x-3/4 rounded-[50%] blur-3xl md:blur-4xl"></div>
        <div className="bg-accent translate-y-full md:translate-y-1/2 w-[40rem] h-[30rem] md:h-[65rem] right-0 relative translate-x-1/2 rounded-[50%] blur-3xl md:blur-4xl"></div>
      </div>

      <Animate className="space-y-10 pt-14 md:pt-0">
        <h1 className="text-primary text-h1 md:text-display max-w-md mx-auto md:max-w-none">
          Become More Profitable as a Video Editor
        </h1>
        <p className="max-w-80 mx-auto md:max-w-none">
          The Editing Workflow That Keeps Viewers Hooked and Clients Paying
        </p>
        <div className="block md:hidden ">
          <YoutubePlayer />
        </div>
        <Button>Enroll Now</Button>
        <div className="flex gap-4 justify-center">
          <div className="flex">
            {new Array(4).fill(0).map((_, i) => (
              <div
                className="size-6 overflow-hidden rounded-full -ml-2 "
                key={i}
              >
                <Image
                  src={`/people${i + 1}.jpg`}
                  alt="Profile Picture"
                  className="object-cover w-full h-full"
                  width={24}
                  height={24}
                />
              </div>
            ))}
          </div>
          <div className="text-sm tracking-widest">
            <span className="text-sm-semibold mr-2">150+</span>
            worldwide enrolled
          </div>
        </div>
        <div className="hidden md:block pt-20">
          <YoutubePlayer />
        </div>
      </Animate>
    </section>
  );
}
