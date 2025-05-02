import React from 'react';
import { IconBell, IconSearch, IconSettings } from '@tabler/icons-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import Image from 'next/image';
import Navbar from './Navbar';
import Login from './Login';
import { Input } from '../ui/input';
import { getSession } from '@/lib/session';
import Profile from './Profile';

interface HeaderProps {
  showLogo?: boolean;
  showNavbar?: boolean;
}

export async function Header({
  showLogo = true,
  showNavbar = true,
}: HeaderProps) {
  const session = await getSession();

  console.log('session', session);

  return (
    <div className="bg-background sticky top-0 z-20 border-b">
      <header className="wrapper flex items-center gap-6 py-5">
        {showLogo && (
          <Image src={'/logo.svg'} alt="logo" width={90} height={33} />
        )}

        <SearchBox />
        <Button title="Settings" size={'icon'} variant={'secondary'}>
          <IconSettings />
        </Button>
        <Button title="Notifications" size={'icon'} variant={'secondary'}>
          <IconBell />
        </Button>
        <Separator
          className="data-[orientation=vertical]:h-5"
          orientation="vertical"
        />
        {session ? <Profile session={session} /> : <Login />}
      </header>

      {showNavbar && <Navbar />}
    </div>
  );
}

const SearchBox = () => {
  return (
    <div className="relative flex-1">
      <IconSearch className="text-input absolute left-3 top-2" />
      <Input
        placeholder="Discover a course..."
        className="bg-card rounded-full pl-10"
      />
    </div>
  );
};
