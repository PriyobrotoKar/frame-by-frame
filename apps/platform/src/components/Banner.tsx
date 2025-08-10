import Image from 'next/image';
import React from 'react';

interface BannerProps {
  subtitle: string;
  title: string;
  link: {
    href: string;
    label: string;
  };
  image: string;
}

const Banner = ({ title, subtitle, image, link }: BannerProps) => {
  return (
    <div className="bg-linear-75 from-primary to-primary/80 text-primary-foreground relative h-52 rounded-2xl p-7">
      <div className="flex h-full flex-col justify-between">
        <div className="space-y-3">
          <p className="text-md">{subtitle}</p>
          <h2 className="max-w-96 text-2xl">{title}</h2>
        </div>

        <p className="text-sm">{link.label}</p>
      </div>

      <Image
        src={image}
        alt="Banner"
        width={225}
        height={197}
        className="absolute bottom-0 right-0"
      />
    </div>
  );
};

export default Banner;
