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
  {
    title: 'Free Courses',
    href: '/free',
  },
  {
    title: 'Certificates',
    href: '/certificates',
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
    title: 'Sales',
    href: `/admin/course/${slug}/sales`,
  },
  {
    title: 'Certificates',
    href: `/admin/course/${slug}/certificates`,
  },
];

const Navbar = () => {
  const path = usePathname();
  const { slug } = useParams<{ slug: string }>();

  const isAdmin = path.startsWith('/admin');
  const links = isAdmin ? adminNavLinks(slug) : navLinks;

  return (
    <div className="wrapper py-2">
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
