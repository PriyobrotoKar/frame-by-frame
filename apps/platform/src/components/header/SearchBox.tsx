'use client';

import { IconSearch } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { useRouter } from 'nextjs-toploader/app';

const SearchBox = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const path = usePathname();
  const router = useRouter();

  if (path.startsWith('/admin')) return null;

  const handleSearch = () => {
    if (query.trim() === '') {
      setIsExpanded(!isExpanded);
      return;
    }

    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="relative">
      <Button
        size={'icon'}
        onClick={handleSearch}
        variant={isExpanded ? 'default' : 'secondary'}
        className="absolute right-1 top-1/2 z-10 size-8 -translate-y-1/2 border-0 sm:relative sm:right-0 sm:size-9 sm:-translate-y-0 sm:border"
      >
        <IconSearch className="" />
      </Button>
      <Input
        placeholder="Discover a course..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSearch();
        }}
        className={cn(
          'bg-card rounded-full transition-all ease-in-out sm:absolute sm:-right-0.5 sm:top-1/2 sm:h-10 sm:w-9 sm:-translate-y-1/2 sm:opacity-0',
          isExpanded && 'sm:w-sm border-primary sm:opacity-100',
        )}
      />
    </div>
  );
};

export default SearchBox;
