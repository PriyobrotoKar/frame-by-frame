import CourseInfoSidebar from '@/components/sidebar/CourseInfoSidebar';
import { getCourseBySlug } from '@/features/course/actions/getCourse';
import CourseContent from '@/features/course/components/CourseContent';
import CourseLearnings from '@/features/course/components/CourseLearnings';
import Instructor from '@/features/course/components/Instructor';
import VideoPlayer from '@/features/course/components/VideoPlayer';
import { mediaUrl } from '@/lib/utils';

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-4">
        <VideoPlayer
          title={course.title}
          src={mediaUrl(course.trailer?.url)}
          subtitle={course.subtitle}
        />
        <CourseLearnings learnings={course.learnings} />
        <CourseContent chapters={course.chapters} />
        <Instructor instructors={course.instructors} />
      </div>
      <CourseInfoSidebar course={course} />
    </div>
  );
}
