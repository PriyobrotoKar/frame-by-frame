import Image from 'next/image';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export default function Header() {
  return (
    <header className="mt-16 flex items-center justify-center md:mx-16 md:mt-16 md:justify-between lg:mx-28">
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
        <Tooltip>
          <TooltipTrigger>
            <Button variant={'outline'} size={'sm'} disabled>
              Join Community
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Coming Soon</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
}
