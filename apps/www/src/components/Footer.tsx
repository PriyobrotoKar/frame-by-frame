import Image from 'next/image';
import { Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mx-auto max-w-screen-sm space-y-12 text-center">
      <div>
        <Image
          className="mx-auto"
          src={'/logo.svg'}
          alt="Logo"
          width={125}
          height={38}
        />
      </div>
      <div className="space-y-6 text-xs">
        <p className="mx-auto max-w-80 md:max-w-none">
          A 100% refund, $1K in cash and a free pizza delivered to your doorstep
          if we fail to deliver a month worth of content.
        </p>
        <a
          className="mx-auto block w-fit"
          href="mailto:moneyprojectd@gmail.com"
        >
          <Mail />
        </a>
        <p>© Copyright 2025 · All rights reserved</p>
      </div>
    </footer>
  );
}
