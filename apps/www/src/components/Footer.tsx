import Image from 'next/image';
import { Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="space-y-12 max-w-screen-sm mx-auto text-center">
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
        <p className="max-w-80 md:max-w-none mx-auto">
          Note: The program doesn&apos;t guarantee success, it is up to students
          to implement and assess to attain desired results.
        </p>
        <a
          className="block w-fit mx-auto"
          href="mailto:moneyprojectd@gmail.com"
        >
          <Mail />
        </a>
        <p>© Copyright 2025 · All rights reserved</p>
      </div>
    </footer>
  );
}
