import Image from "next/image";
import Animate from "./Animate";
import { Button } from "./ui/button";
import YoutubePlayer from "./YoutubePlayer";
import { Dialog, DialogTrigger } from "./ui/dialog";
import WaitlistDialogContent from "./WaitlistDialogConent";

export default function HeroSection() {
  return (
    <section className="max-w-screen-md mx-auto text-center  px-6 lg:px-0">
      <div className="absolute inset-0 w-full overflow-hidden -z-20 h-[150vh] md:h-[150rem] flex justify-between">
        <div className="bg-accent w-[40rem] h-[30rem] md:h-[65rem] -translate-x-3/4 rounded-[50%] blur-3xl md:blur-4xl"></div>
        <div className="bg-accent translate-y-full md:translate-y-1/2 w-[40rem] h-[30rem] md:h-[65rem] right-0 relative translate-x-1/2 rounded-[50%] blur-3xl md:blur-4xl"></div>
      </div>

      <Animate className="pt-16 md:pt-0">
        <h1 className="text-primary text-h1 md:text-display max-w-md mx-auto md:max-w-none">
          Become More Profitable as a Video Editor
        </h1>
        <p className="max-w-80 mt-10 mx-auto md:max-w-screen-sm">
          Pay <span className="font-bold">60% less</span> & learn the editing
          workflow that keeps viewers hooked and clients paying
        </p>
        <div className="block md:hidden mt-12">
          <YoutubePlayer />
        </div>
        <Dialog>
          <DialogTrigger asChild className="mt-12">
            <Button>Join Waitlist</Button>
          </DialogTrigger>

          <WaitlistDialogContent />
        </Dialog>
        <div className="flex gap-4 justify-center mt-12">
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
          <div className="text-sm tracking-wider">
            <span className="text-sm-semibold mr-2">350+</span>
            global joins
          </div>
        </div>
        <div className="hidden md:block pt-20">
          <YoutubePlayer />
        </div>
      </Animate>
    </section>
  );
}
