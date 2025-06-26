import Activity from '@/components/Activity';
import Banner from '@/components/Banner';
import CourseCard from '@/components/card/CourseCard';
import { getCourses } from '@/features/course/actions/getCourse';

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="space-y-10">
      <Activity />
      <Banner
        title="From Basics to Advanced, Taught by Experts."
        subtitle="Digital Courses"
        image="/illustrations/courses.svg"
        link={{ href: '/', label: 'Learn More' }}
      />

      <section className="space-y-4">
        <h2 className="text-lg">New Launches</h2>
        <div className="grid grid-cols-2 gap-4">
          {courses?.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
}
