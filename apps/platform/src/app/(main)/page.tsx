import Banner from '@/components/Banner';
import CourseCard from '@/components/card/CourseCard';
import { demoCourse } from '@/lib/mocks';

export default function CoursesPage() {
  return (
    <div className="space-y-10">
      <Banner
        title="From Basics to Advanced, Taught by Experts."
        subtitle="Digital Courses"
        image="/illustrations/courses.svg"
        link={{ href: '/', label: 'Learn More' }}
      />

      <section className="space-y-4">
        <h2 className="text-lg">New Launches</h2>
        <div className="flex gap-4 [&>*]:flex-1">
          <CourseCard course={demoCourse} />
          <CourseCard course={demoCourse} />
        </div>
      </section>
    </div>
  );
}
