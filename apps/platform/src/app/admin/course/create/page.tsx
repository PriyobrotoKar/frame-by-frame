import CreateCourseForm from '@/features/course/components/CreateCourseForm';
import React from 'react';

export default function CreateCoursePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[url('/gradient-bg.jpg')] bg-cover">
      <div className="w-full max-w-md">
        <CreateCourseForm />
      </div>
    </div>
  );
}
