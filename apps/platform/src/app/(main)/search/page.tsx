import CourseCard from '@/components/card/CourseCard';
import { searchCourses } from '@/features/course/actions/searchCourses';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;

  if (!q) {
    notFound();
  }

  const courses = await searchCourses(q);

  return (
    <div className="space-y-10">
      <h1 className="text-lg">Search Results for {q}</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses?.map((course) => (
          <Link key={course.id} href={`/${course.slug}`}>
            <CourseCard course={course} />
          </Link>
        ))}
      </div>
    </div>
  );
}
