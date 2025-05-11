'use client';

import { IconSearch } from '@tabler/icons-react';
import React from 'react';
import { Input } from '../ui/input';
import { usePathname } from 'next/navigation';

const SearchBox = () => {
  const path = usePathname();

  if (path.startsWith('/admin')) return null;

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

export default SearchBox;
