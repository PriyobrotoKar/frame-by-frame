import Banner from '@/components/Banner';
import CourseCard, { Course } from '@/components/card/CourseCard';

export const demoCourse: Course = {
  title: 'The Capcut Video Editing Masterclass',
  subtitle: 'Video Editing on Phone',
  price: 100,
  originalPrice: 200,
  currency: 'INR',
  duration: '2hrs 30mins',
  lessons: 10,
  imageUrl:
    'https://futurevisioncomputers.com/wp-content/uploads/2023/09/Adobe-Premiere-Pro-course-Adobe-Premiere-Pro.jpg',
};

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
