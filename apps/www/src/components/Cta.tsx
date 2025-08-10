import Animate from './Animate';
import { Button } from './ui/button';
import { Dialog, DialogTrigger } from './ui/dialog';
import ScheduleDialog from './ScheduleDialog';

export default function Cta() {
  return (
    <div className="relative overflow-hidden py-8">
      <div className="bg-accent/50 absolute bottom-28 left-1/2 top-1/2 -z-20 h-[10rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-3xl"></div>
      <Animate className="mx-auto max-w-md space-y-6 px-6 py-20 text-center md:max-w-screen-md">
        <h2 className="md:text-display text-primary-foreground text-h1">
          Built for Hustlers. Trusted by Titans.
        </h2>
        <p className="mx-auto max-w-80 md:max-w-screen-md">
          Whether you&apos;re just starting out or scaling to eight figures, we
          give you the tools, strategy, and edge to dominate your market.
        </p>
        <Dialog>
          <DialogTrigger asChild className="mt-6">
            <Button>Take Action</Button>
          </DialogTrigger>

          <ScheduleDialog />
        </Dialog>
      </Animate>
    </div>
  );
}
