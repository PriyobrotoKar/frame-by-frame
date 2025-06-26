import { getCourseBySlug } from '@/features/course/actions/getCourse';
import { getInstructors } from '@/features/course/actions/getInstructors';
import { AddInstructor } from '@/features/course/components/AddInstructor';
import EditInstructor from '@/features/course/components/EditInstructor';
import PublishButton from '@/features/course/components/PublishButton';
import React from 'react';

export default async function InstructorSettingsPage({
  params,
}: {
  params: Promise<{ slug: string; details: string[] }>;
}) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug, true);
  const instructors = await getInstructors(slug);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl">Instructor Information</h2>
        <div className="flex gap-2">
          <AddInstructor courseSlug={course.slug} />
          <PublishButton courseSlug={course.slug} />
        </div>
      </div>
      <div className="max-w-2xl space-y-6">
        {instructors.map((instructor) => {
          return (
            <EditInstructor
              courseSlug={course.slug}
              key={instructor.id}
              instructor={instructor}
            />
          );
        })}
      </div>
    </div>
  );
}
