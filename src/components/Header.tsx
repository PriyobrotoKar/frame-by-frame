import Image from "next/image";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="mt-28 md:mt-16 md:mx-16 lg:mx-28 flex items-center justify-center md:justify-between">
      <div>
        <Image
          src={"/logo.svg"}
          alt="Logo"
          className="w-24 md:w-36"
          width={150}
          height={80}
        />
      </div>
      <div className="hidden md:block">
        <Button variant={"ghost"} size={"sm"}>
          Join Waitlist
        </Button>
        <Button variant={"outline"} size={"sm"}>
          Join Discord
        </Button>
      </div>
    </header>
  );
}
