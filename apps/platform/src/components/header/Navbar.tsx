'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
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
];

const adminNavLinks = (slug: string) => [
  {
    title: 'Content',
    href: `/admin/course/${slug}/content`,
  },
  {
    title: 'Analytics',
    href: `/admin/course/${slug}/analytics`,
  },
  {
    title: 'Settings',
    href: `/admin/course/${slug}/settings/appearance`,
  },
];

interface NavbarProps {
  className?: string;
}

const Navbar = ({ className }: NavbarProps) => {
  const path = usePathname();
  const { slug } = useParams<{ slug: string }>();

  const isAdmin = path.startsWith('/admin');
  const links = isAdmin ? adminNavLinks(slug) : navLinks;

  return (
    <div className={cn('px-5 py-2 sm:px-8', className)}>
      <nav>
        <ul className="space-x-4">
          {links.map((link, index) => {
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
