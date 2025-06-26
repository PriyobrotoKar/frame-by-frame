import React from 'react';
import { IconBell, IconSettings } from '@tabler/icons-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import Image from 'next/image';
import Navbar from './Navbar';
import Login from './Login';
import { getSession } from '@/lib/session';
import Profile from './Profile';
import SearchBox from './SearchBox';
import CourseSelector from './CourseSelector';
import { cn } from '@/lib/utils';

interface HeaderProps {
  showLogo?: boolean;
  showNavbar?: boolean;
  className?: string;
}

export async function Header({
  showLogo = true,
  showNavbar = true,
  className,
}: HeaderProps) {
  const session = await getSession();

  return (
    <div className="bg-background sticky top-0 z-20 border-b">
      <header className={cn('flex items-center gap-6 px-8 py-5', className)}>
        {showLogo && (
          <Image src={'/logo.svg'} alt="logo" width={90} height={33} />
        )}

        <CourseSelector />
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

      {showNavbar && <Navbar className={className} />}
    </div>
  );
}
