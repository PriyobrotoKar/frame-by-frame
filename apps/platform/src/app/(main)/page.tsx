import Activity from '@/components/Activity';
import Banner from '@/components/Banner';
import CourseCard from '@/components/card/CourseCard';
import { getCourses } from '@/features/course/actions/getCourse';
import { getSession } from '@/lib/session';
import Link from 'next/link';

export default async function CoursesPage() {
  const courses = await getCourses();
  const session = await getSession();

  return (
    <div className="space-y-10">
      {session ? (
        <Activity />
      ) : (
        <Banner
          title="From Basics to Advanced,Taught by Experts."
          subtitle="Digital Courses"
          image="/illustrations/courses.svg"
          link={{ href: '/', label: 'Learn More' }}
        />
      )}

      <section className="space-y-4">
        <h2 className="text-lg">New Launches</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses?.map((course) => (
            <Link key={course.id} href={`/${course.slug}`}>
              <CourseCard course={course} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
