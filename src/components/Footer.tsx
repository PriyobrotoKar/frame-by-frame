import Image from "next/image";
import { Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="space-y-12 max-w-screen-sm mx-auto text-center">
      <div>
        <Image
          className="mx-auto"
          src={"/logo.svg"}
          alt="Logo"
          width={125}
          height={38}
        />
      </div>
      <div className="space-y-6 text-xs">
        <p>
          Note: The program doesn&apos;t guarantee success, it is up to students
          to implement and assess to attain desired results.
        </p>
        <div className="flex justify-center gap-5">
          <Mail />
          <Phone />
        </div>
        <p>© Copyright 2025 · All rights reserved</p>
      </div>
    </footer>
  );
}
