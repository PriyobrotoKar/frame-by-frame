import CourseSidebar from '@/components/sidebar/CourseSidebar';
import React from 'react';

export default async function CourseLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ courseSlug: string; details: string[] }>;
}>) {
  const { details, courseSlug } = await params;

  return (
    <div className="flex">
      <CourseSidebar courseSlug={courseSlug} details={details} />
      <div className="flex-1">
        <div className="wrapper py-3">{children}</div>
      </div>
    </div>
  );
}
