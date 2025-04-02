import React from 'react';
import { Input } from './ui/input';
import {
  IconBell,
  IconSearch,
  IconSettings,
  IconUser,
} from '@tabler/icons-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback } from './ui/avatar';

export default function Header() {
  return (
    <header className="flex items-center gap-6 px-8 py-5">
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
      <Profile />
    </header>
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

const Profile = () => {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarFallback>
          <IconUser />
        </AvatarFallback>
      </Avatar>
      Priyobroto
    </div>
  );
};
