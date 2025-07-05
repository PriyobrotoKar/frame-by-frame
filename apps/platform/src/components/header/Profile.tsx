'use client';

import React from 'react';
import {
  IconBrandGoogleFilled,
  IconLogout,
  IconMail,
  IconPencil,
  IconPhone,
  IconUser,
  IconUserShield,
} from '@tabler/icons-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Input } from '../ui/input';
import { removeSession, Session } from '@/lib/session';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
} from '../ui/dropdown-menu';
import { logout } from '@/features/auth/actions/logout';
import useMediaQuery from '@/hooks/useMediaQuery';
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';
import { Label } from '../ui/label';
import Link from 'next/link';

const Profile = ({ session }: { session: Session }) => {
  const isDesktop = useMediaQuery('(min-width: 640px)');

  const handleLogout = async () => {
    await removeSession();
    await logout();
  };

  if (!isDesktop) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <div className="flex cursor-pointer items-center gap-3">
            <Avatar>
              <AvatarImage
                src={session.user.image}
                referrerPolicy="no-referrer"
              />
              <AvatarFallback>
                <IconUser />
              </AvatarFallback>
            </Avatar>
            <span className="hidden sm:inline-block">
              {session.user.name.split(' ')[0]}
            </span>
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <div className="space-y-7 px-6 py-7">
            <div className="space-y-3">
              <DrawerTitle className="text-left">User Settings</DrawerTitle>
              <Avatar className="size-24">
                <AvatarImage
                  src={session.user.image}
                  referrerPolicy="no-referrer"
                />
                <AvatarFallback>
                  <IconUser />
                </AvatarFallback>
              </Avatar>
              <div className="relative">
                <Input defaultValue={session.user.name} />
                <IconPencil className="absolute right-3 top-1/2 size-3 -translate-y-1/2" />
              </div>
              <div className="relative">
                <Input disabled value={session.user.email} />
                <IconBrandGoogleFilled className="absolute right-3 top-1/2 size-3 -translate-y-1/2 opacity-50" />
              </div>
            </div>

            <div className="space-y-3">
              <Label>Support</Label>
              <div className="hover:bg-muted flex items-center gap-2 p-2">
                <IconMail /> framebyframe@gmail.com
              </div>
              <div className="hover:bg-muted flex items-center gap-2 p-2">
                <IconPhone /> +91 94778 42017
              </div>
            </div>

            <div className="space-y-3">
              <Label>My Account</Label>
              <div
                className="hover:bg-muted flex items-center gap-2 p-2"
                onClick={handleLogout}
              >
                <IconLogout /> Logout
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer items-center gap-3">
          <Avatar>
            <AvatarImage
              src={session.user.image}
              referrerPolicy="no-referrer"
            />
            <AvatarFallback>
              <IconUser />
            </AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline-block">
            {session.user.name.split(' ')[0]}
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 space-y-5 px-4 py-7">
        <h2 className="text-lg">User Settings</h2>
        <div className="space-y-7">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Profile</DropdownMenuLabel>
            <Avatar className="size-24">
              <AvatarImage
                src={session.user.image}
                referrerPolicy="no-referrer"
              />
              <AvatarFallback>
                <IconUser />
              </AvatarFallback>
            </Avatar>
            <div className="relative">
              <Input defaultValue={session.user.name} />
              <IconPencil className="absolute right-3 top-1/2 size-3 -translate-y-1/2" />
            </div>
            <div className="relative">
              <Input disabled value={session.user.email} />
              <IconBrandGoogleFilled className="absolute right-3 top-1/2 size-3 -translate-y-1/2 opacity-50" />
            </div>
          </DropdownMenuGroup>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Support</DropdownMenuLabel>
            <DropdownMenuItem>
              <IconMail /> framebyframe@gmail.com
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconPhone /> +91 94778 42017
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuGroup>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            {session.user.role === 'ADMIN' && (
              <DropdownMenuItem asChild>
                <Link href="/admin">
                  <IconUserShield /> Admin Dashboard
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem variant="destructive" onClick={handleLogout}>
              <IconLogout /> Logout
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
