import CourseInfoSidebar from '@/components/sidebar/CourseInfoSidebar';
import { getOrderByCourse } from '@/features/analytics/actions/getCourseOrders';
import { getCourseBySlug } from '@/features/course/actions/getCourse';
import CourseContent from '@/features/course/components/CourseContent';
import CourseLearnings from '@/features/course/components/CourseLearnings';
import Instructor from '@/features/course/components/Instructor';
import VideoPlayer from '@/features/course/components/VideoPlayer';
import { getSession } from '@/lib/session';

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await getSession();
  const course = await getCourseBySlug(slug);
  const isEnrolled =
    session &&
    (await getOrderByCourse(course.courseId))?.status === 'COMPLETED';

  return (
    <div className="flex flex-col-reverse gap-8 md:flex-row">
      <div className="flex-1 space-y-4">
        <VideoPlayer src={course.trailer?.url} />
        <CourseLearnings learnings={course.learnings} />
        <CourseContent chapters={course.chapters} />
        <Instructor instructors={course.instructors} />
      </div>
      <CourseInfoSidebar isEnrolled={!!isEnrolled} course={course} />
    </div>
  );
}
