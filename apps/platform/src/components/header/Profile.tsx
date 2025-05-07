'use client';

import React from 'react';
import {
  IconBrandGoogleFilled,
  IconLogout,
  IconMail,
  IconPencil,
  IconPhone,
  IconTrash,
  IconUser,
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
import { deleteSelf } from '@/features/user/actions/delete';

const Profile = ({ session }: { session: Session }) => {
  const handleLogout = async () => {
    await removeSession();
    await logout();
  };

  const handleDeleteAccount = async () => {
    await deleteSelf();
    await removeSession();
  };

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
          {session.user.name.split(' ')[0]}
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
            <DropdownMenuItem onClick={handleLogout}>
              <IconLogout /> Logout
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              onClick={handleDeleteAccount}
            >
              <IconTrash /> Delete Account
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
