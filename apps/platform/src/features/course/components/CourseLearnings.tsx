import { CourseLearnings as ICourseLearnings } from '@frame-by-frame/db';
import { IconInfoCircle } from '@tabler/icons-react';
import React from 'react';

interface CourseLearningsProps {
  learnings: ICourseLearnings[];
}

const CourseLearnings = ({ learnings }: CourseLearningsProps) => {
  return (
    <section className="bg-card space-y-6 rounded-2xl border p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl">What you will learn</h2>

        <div className="text-muted-foreground hidden items-center gap-1.5 text-sm md:flex">
          <IconInfoCircle className="size-4" />
          Beginner friendly
        </div>
      </div>

      <div className="grid gap-x-11 gap-y-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
        {learnings.map((learning, index) => (
          <div key={index} className="text-sm-md space-y-2">
            <h3 className="text-md">
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
