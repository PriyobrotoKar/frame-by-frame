import Image from 'next/image';
import { Button } from './ui/button';
import { Dialog } from '@radix-ui/react-dialog';
import { DialogTrigger } from './ui/dialog';
import WaitlistDialogContent from './WaitlistDialogConent';

export default function Header() {
  return (
    <header className="mt-28 md:mt-16 md:mx-16 lg:mx-28 flex items-center justify-center md:justify-between">
      <div>
        <Image
          src={'/logo.svg'}
          alt="Logo"
          className="w-24 md:w-32"
          width={150}
          height={80}
        />
      </div>
      <div className="hidden md:block">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={'ghost'} size={'sm'}>
              Join Waitlist
            </Button>
          </DialogTrigger>
          <WaitlistDialogContent />
        </Dialog>
        <a href="https://discord.gg/devgotmoney">
          <Button variant={'outline'} size={'sm'}>
            Join Discord
          </Button>
        </a>
      </div>
    </header>
  );
}
