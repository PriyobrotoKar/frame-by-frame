import Image from "next/image";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="mt-16 mx-28 flex items-center justify-between">
      <div>
        <Image src={"/logo.svg"} alt="Logo" width={150} height={80} />
      </div>
      <nav></nav>
      <div>
        <Button variant={"ghost"} size={"sm"}>
          Visit Youtube
        </Button>
        <Button variant={"outline"} size={"sm"}>
          Join Discord
        </Button>
      </div>
    </header>
  );
}
