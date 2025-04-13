import { IconInfoCircle } from '@tabler/icons-react';
import React from 'react';

interface Learning {
  title: string;
  description: string;
}

const demoLearnings: Learning[] = [
  {
    title: 'Get Started with Premere Pro & After Effects',
    description:
      'Learn how to set up Premiere Pro and After Effects (even the secret free way), and get comfortable with their interfaces.',
  },
  {
    title: 'Edit a Video from Start to Finish',
    description:
      'Learn how to edit a video from start to finish, including cutting, trimming, and adding effects.',
  },
  {
    title: 'Export Your Video for YouTube',
    description:
      'Learn how to export your video for YouTube, including the best settings and formats.',
  },
  {
    title: 'Add Text and Titles to Your Videos',
    description:
      'Learn how to add text and titles to your videos, including lower thirds and end screens.',
  },
  {
    title: 'Add Music and Sound Effects',
    description:
      'Learn how to add music and sound effects to your videos, including where to find royalty-free music.',
  },
];

const CourseLearnings = () => {
  return (
    <section className="bg-card space-y-6 rounded-2xl border p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl">What you will learn</h2>

        <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
          <IconInfoCircle className="size-4" />
          Beginner friendly
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-11 gap-y-6">
        {demoLearnings.map((learning, index) => (
          <div key={index} className="text-sm-md space-y-2">
            <h3>
              {index + 1}. {learning.title}
            </h3>
            <p className="text-muted-foreground">{learning.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CourseLearnings;
