import { mediaUrl } from '@/lib/utils';
import { Instructor as IInstructor } from '@frame-by-frame/db';
import { IconCalendarUp, IconTrendingUp, IconUsers } from '@tabler/icons-react';
import Image from 'next/image';
import React from 'react';

interface InstructorProps {
  instructors: IInstructor[];
}

const Instructor = ({ instructors }: InstructorProps) => {
  return (
    <section className="bg-card space-y-5 rounded-2xl border p-4">
      <h2 className="text-xl">Instructor</h2>
      {instructors.map((instructor) => (
        <div key={instructor.id}>
          <div>
            <h3 className="text-body-semibold text-primary">
              {instructor.name}
            </h3>
            <p className="text-muted-foreground">{instructor.specialization}</p>
          </div>

          <div className="text-muted-foreground mt-4 flex items-center gap-5">
            {instructor.profilePic && (
              <div className="size-20 overflow-hidden rounded-full">
                <Image
                  src={mediaUrl(instructor.profilePic)}
                  alt={instructor.name}
                  width={120}
                  height={120}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <IconCalendarUp size={16} />
                <span>{instructor.experienceYears} years of experience</span>
              </div>
              <div className="flex items-center gap-2">
                <IconUsers size={16} />
                <span>{instructor.followers} global followers</span>
              </div>
              <div className="flex items-center gap-2">
                <IconTrendingUp size={16} />
                <span>${instructor.revenue}+ revenue generated</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Instructor;
