import { getCourseBySlug } from '@/features/course/actions/getCourse';
import AppearanceForm from '@/features/course/components/AppearanceForm';
import PublishButton from '@/features/course/components/PublishButton';
import React from 'react';

export default async function AppearanceSettings({
  params,
}: {
  params: Promise<{ slug: string; details: string[] }>;
}) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug, true);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl">Appearance & Pricing</h2>
        <PublishButton courseSlug={course.slug} />
      </div>
      <AppearanceForm course={course} trailer={course.trailer} />
    </div>
  );
}
