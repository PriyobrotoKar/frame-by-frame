'use client';
import React from 'react';
import { Separator } from '../ui/separator';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const navlinks = [
  { name: 'Appearance & Pricing', href: '/appearance' },
  { name: 'Users’ learning', href: '/learnings' },
  {
    name: 'Instructor Infomation',
    href: '/instructor',
  },
];

export default function AdminSettingsSidebar({ slug }: { slug: string }) {
  const path = usePathname();

  return (
    <aside className="h-full w-72 shrink-0 space-y-4 border-r py-6">
      <h2 className="px-6 py-1.5 text-xl">Course Settings</h2>
      <Separator />
      <nav className="space-y-2 px-6">
        {navlinks.map((link) => {
          const isActive = path.endsWith(link.href);
          return (
            <Link
              key={link.name}
              href={`/admin/course/${slug}/settings${link.href}`}
              className={cn(
                'text-md hover:bg-muted block rounded-md px-4 py-2 transition-colors',
                isActive && 'bg-muted',
              )}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
