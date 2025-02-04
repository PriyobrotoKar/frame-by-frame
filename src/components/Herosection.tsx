import Animate from "./Animate";
import { Button } from "./ui/button";
import YoutubePlayer from "./YoutubePlayer";

export default function HeroSection() {
  return (
    <section className="max-w-screen-md mx-auto text-center space-y-28">
      <Animate className="space-y-10">
        <h1 className="text-primary text-display">
          Become More Profitable as a Video Editor
        </h1>
        <p>The Editing Workflow That Keeps Viewers Hooked and Clients Paying</p>
        <Button>Enroll Now</Button>
        <div className="text-sm tracking-widest">
          <span className="text-sm-semibold mr-2">150+</span>
          worldwide enrolled
        </div>
        <div className="pt-20">
          <YoutubePlayer />
        </div>
      </Animate>
    </section>
  );
}
