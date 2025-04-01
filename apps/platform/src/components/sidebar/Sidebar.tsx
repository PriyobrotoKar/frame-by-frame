'use client';

import Image from 'next/image';
import {
  IconBooks,
  IconCertificate,
  IconGift,
  IconLogout,
  IconSettings,
  IconShoppingCart,
} from '@tabler/icons-react';
import React, { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button, buttonVariants } from '../ui/button';

interface NavLink {
  icon: ReactNode;
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  {
    icon: <IconShoppingCart />,
    label: 'All Courses',
    href: '/',
  },
  {
    icon: <IconBooks />,
    label: 'Library',
    href: '/library',
  },
  {
    icon: <IconGift />,
    label: 'Free Courses',
    href: '/free',
  },
  {
    icon: <IconCertificate />,
    label: 'Certificates',
    href: '/certificates',
  },
];

const Sidebar = () => {
  return (
    <aside className="bg-card flex w-56 flex-col justify-between self-stretch border-r px-7 py-10">
      <div className="space-y-20">
        <Image src={'/logo.svg'} alt="logo" width={127} height={46} />

        <nav>
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.label}>
                <MenuLink link={link} />
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="space-y-3">
        <MenuLink
          link={{
            icon: <IconSettings />,
            label: 'Settings',
            href: '/settings',
          }}
        />
        <Button variant={'ghost'} className="w-full justify-start">
          <IconLogout />
          Logout
        </Button>
      </div>
    </aside>
  );
};

const MenuLink = ({ link }: { link: NavLink }) => {
  const path = usePathname();
  const isActive = path === link.href;

  return (
    <Link
      href={link.href}
      className={buttonVariants({
        variant: isActive ? 'default' : 'ghost',
        className: 'w-full justify-start',
      })}
    >
      <span>{link.icon}</span>
      {link.label}
    </Link>
  );
};

export default Sidebar;
