'use client';

import React, { useState } from 'react';
import { Input } from './ui/input';
import {
  IconBell,
  IconBrandDiscordFilled,
  IconBrandGoogleFilled,
  IconSearch,
  IconSettings,
} from '@tabler/icons-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

const navLinks = [
  {
    title: 'All Courses',
    href: '/',
  },
  {
    title: 'Library',
    href: '/library',
  },
  {
    title: 'Free Courses',
    href: '/free',
  },
  {
    title: 'Certificates',
    href: '/certificates',
  },
];

interface HeaderProps {
  showLogo?: boolean;
  showNavbar?: boolean;
}

export default function Header({
  showLogo = true,
  showNavbar = true,
}: HeaderProps) {
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
        <Login />
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

// const Profile = () => {
//   return (
//     <div className="flex items-center gap-3">
//       <Avatar>
//         <AvatarFallback>
//           <IconUser />
//         </AvatarFallback>
//       </Avatar>
//       Priyobroto
//     </div>
//   );
// };

const Navbar = () => {
  const path = usePathname();

  return (
    <div className="wrapper py-2">
      <nav>
        <ul className="space-x-4">
          {navLinks.map((link, index) => {
            const isActive = path === link.href;

            return (
              <li
                key={index}
                className={cn(
                  'text-body-md inline-flex p-2',
                  isActive && 'text-primary',
                )}
              >
                <Link href={link.href}>{link.title}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

const Login = () => {
  const [selectedMethod, setSelectedMethod] = useState<
    'google' | 'discord' | null
  >(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'}>Login</Button>
      </DialogTrigger>
      <DialogContent className="gap-12 px-10 py-12 sm:max-w-md">
        <DialogHeader className="sm:text-center">
          <DialogTitle className="text-xl">
            Create an account or login to an existing one
          </DialogTitle>
          <DialogDescription>
            View library and personalized content
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Button
            variant={selectedMethod === 'google' ? 'outline' : 'secondary'}
            onClick={() => setSelectedMethod('google')}
          >
            <IconBrandGoogleFilled /> Sign in with Google
          </Button>
          <Button
            variant={selectedMethod === 'discord' ? 'outline' : 'secondary'}
            onClick={() => setSelectedMethod('discord')}
          >
            <IconBrandDiscordFilled /> Sign in with Discord
          </Button>
        </div>

        <DialogFooter className="sm:flex-col sm:items-center">
          <Button disabled={!selectedMethod} className="w-full">
            Continue
          </Button>
          <p className="text-sm">
            By signing in you agree to the terms and conditions
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
