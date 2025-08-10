import React from 'react';
import Logo from './Logo';
import {
  IconBrandInstagram,
  IconBrandX,
  IconBrandYoutube,
} from '@tabler/icons-react';

const Footer = () => {
  return (
    <footer className="mt-auto border-t">
      <div className="wrapper flex items-end justify-between py-24">
        <div className="max-w-80 space-y-10">
          <Logo width={152} height={56} />
          <p className="text-sm-md">
            Disclaimer: All visual depictions are purely thematic and not
            intended to represent any real person, group, or event.
          </p>
          <p className="text-md">&copy; 2025 All rights reserved</p>
        </div>
        <div className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-md">Visit Official Website</h3>
            <a href="https://devgotmoney.com" className="text-lg">
              devgotmoney.com
            </a>
          </div>

          <div className="space-y-1">
            <h3 className="text-md">Email Us</h3>
            <a href="mailto:devgotmoney@gmail.com" className="text-lg">
              devgotmoney@gmail.com
            </a>
          </div>

          <div className="flex gap-2">
            <a href="https://www.youtube.com/@DevGotMoney">
              <IconBrandYoutube className="size-6" />
            </a>
            <a href="https://instagram.com/dev.gotmoney">
              <IconBrandInstagram className="size-6" />
            </a>
            <a href="https://x.com/DevGotMoney">
              <IconBrandX className="size-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
