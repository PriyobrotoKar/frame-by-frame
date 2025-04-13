import {
  IconCalendarShare,
  IconTrendingUp,
  IconUsers,
} from '@tabler/icons-react';
import Image from 'next/image';
import React from 'react';

interface Stats {
  icon: React.ReactNode;
  stat: string;
}

interface Instructor {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  stats: Stats[];
}

const demoInstructor: Instructor = {
  name: 'Dev Choudhury',
  role: 'Viral Editor Instructor',
  description:
    'An 18-year-old entrepreneuAs a YouTube automation master and social media strategist, I help brands and individuals scale their online presence and unlock massive growth opportunities',
  imageUrl: '/avatars/dev.jpg',
  stats: [
    { icon: <IconCalendarShare />, stat: '5 years of experience' },
    { icon: <IconUsers />, stat: '23,452 global followers' },
    { icon: <IconTrendingUp />, stat: '$20,000+ revenue generated' },
  ],
};

const Instructor = () => {
  return (
    <section className="bg-card space-y-5 rounded-2xl border p-4">
      <h2 className="text-xl">Instructor</h2>
      <div>
        <div>
          <h3 className="text-body-semibold text-primary">
            {demoInstructor.name}
          </h3>
          <p className="text-muted-foreground">{demoInstructor.role}</p>
        </div>

        <div className="text-muted-foreground mt-4 flex items-center gap-5">
          <div className="size-20 overflow-hidden rounded-full">
            <Image
              src={demoInstructor.imageUrl}
              alt={demoInstructor.name}
              width={100}
              height={100}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="space-y-2">
            {demoInstructor.stats.map((stat, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm [&>svg]:size-4"
              >
                {stat.icon}
                <span>{stat.stat}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 text-sm">{demoInstructor.description}</p>
      </div>
    </section>
  );
};

export default Instructor;
