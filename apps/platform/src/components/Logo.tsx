import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface LogoProps {
  width?: number;
  height?: number;
}

const Logo = ({ width = 90, height = 33 }: LogoProps) => {
  return (
    <Link href={'/'} className="inline-block">
      <Image src={'/logo.svg'} alt="logo" width={width} height={height} />
    </Link>
  );
};

export default Logo;
