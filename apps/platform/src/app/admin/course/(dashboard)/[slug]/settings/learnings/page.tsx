import { Button } from '@/components/ui/button';
import { getCourseBySlug } from '@/features/course/actions/getCourse';
import { getLearnings } from '@/features/course/actions/getLearnings';
import LearningCard from '@/features/course/components/LearningCard';
import LearningDialog from '@/features/course/components/LearningDialog';
import { IconNewSection } from '@tabler/icons-react';
import React from 'react';

export default async function LearningsSettings({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug, true);
  const learnings = await getLearnings(slug);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl">User&apos;s Learnings</h2>
        <div className="flex gap-2">
          <LearningDialog
            trigger={
              <Button variant={'secondary'}>
                <IconNewSection />
                New Field
              </Button>
            }
            courseSlug={course.slug}
            type="create"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {learnings.map((learning, i) => {
          return (
            <LearningCard
              courseSlug={course.slug}
              learning={learning}
              key={learning.id}
              index={i}
            />
          );
        })}
      </div>
    </div>
  );
}
