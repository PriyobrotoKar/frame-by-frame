import React from 'react';
import { Separator } from '../ui/separator';
import Navbar from './Navbar';
import Login from './Login';
import { getSession } from '@/lib/session';
import Profile from './Profile';
import SearchBox from './SearchBox';
import CourseSelector from './CourseSelector';
import { cn } from '@/lib/utils';
import { Role } from '@frame-by-frame/db';
import AdminNotification from '@/features/notification/components/AdminNotification';
import UserNotifications from '@/features/notification/components/UserNotifications';
import Logo from '../Logo';

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
      <header
        className={cn(
          'flex items-center justify-between gap-6 px-5 py-5 sm:px-8',
          className,
        )}
      >
        {showLogo && <Logo />}

        {session?.user.role === Role.ADMIN && (
          <>
            <Separator
              orientation="vertical"
              className="!h-auto self-stretch"
            />
            <CourseSelector />
          </>
        )}

        <div className="flex flex-1 items-center justify-end gap-6">
          <div className="hidden sm:block">
            <SearchBox />
          </div>
          {session &&
            (session.user.role === Role.ADMIN ? (
              <AdminNotification />
            ) : (
              <UserNotifications />
            ))}
          <Separator
            className="data-[orientation=vertical]:h-5"
            orientation="vertical"
          />
          {session ? <Profile session={session} /> : <Login />}
        </div>
      </header>

      <div className="px-5 sm:hidden sm:px-8">
        <SearchBox />
      </div>

      {showNavbar && <Navbar session={session} className={className} />}
    </div>
  );
}
