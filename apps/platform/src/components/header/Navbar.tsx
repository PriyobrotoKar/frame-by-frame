'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

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

export default Navbar;
