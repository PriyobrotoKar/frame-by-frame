import CourseCard from '@/components/card/CourseCard';
import { getLibraryCourses } from '@/features/course/actions/GetLibraryCourses';
import Link from 'next/link';

export default async function LibraryPage() {
  const library = await getLibraryCourses();

  return (
    <div>
      <section className="space-y-4">
        <h2 className="text-lg">My Courses</h2>
        {library.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {library?.map((course) => (
              <Link key={course.id} href={`/${course.slug}`}>
                <CourseCard course={course} isEnrolled />
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex min-h-[20rem] items-center justify-center">
            <p className="text-muted-foreground max-w-80 text-center">
              You have not enrolled in any courses yet. Explore our
              <Link href="/" className="text-primary mx-1">
                courses
              </Link>
              to start learning.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
