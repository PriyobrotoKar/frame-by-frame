import Animate from './Animate';
import { Button } from './ui/button';
import { Dialog, DialogTrigger } from './ui/dialog';
import WaitlistDialogContent from './WaitlistDialogConent';

export default function Cta() {
  return (
    <div className="relative overflow-hidden py-8">
      <div className="bg-accent/50 absolute bottom-28 left-1/2 top-1/2 -z-20 h-[10rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-3xl"></div>
      <Animate className="mx-auto max-w-md space-y-6 px-6 py-20 text-center md:max-w-screen-md">
        <h2 className="text-display text-primary-foreground">
          Beginner to Advanced Coverage
        </h2>
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
  );
}
