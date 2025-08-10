import Image from 'next/image';
import { Button } from './ui/button';

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
        <a href="https://discord.gg/devgotmoney">
          <Button variant={'outline'} size={'sm'}>
            Join Discord
          </Button>
        </a>
      </div>
    </header>
  );
}
