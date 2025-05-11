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

interface HeaderProps {
  showLogo?: boolean;
  showNavbar?: boolean;
}

export async function Header({
  showLogo = true,
  showNavbar = true,
}: HeaderProps) {
  const session = await getSession();

  return (
    <div className="bg-background sticky top-0 z-20 border-b">
      <header className="wrapper flex items-center gap-6 py-5">
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

      {showNavbar && <Navbar />}
    </div>
  );
}
