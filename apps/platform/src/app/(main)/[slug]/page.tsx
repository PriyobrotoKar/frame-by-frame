import CourseInfoSidebar from '@/components/sidebar/CourseInfoSidebar';
import CourseContent from '@/features/course/components/CourseContent';
import CourseLearnings from '@/features/course/components/CourseLearnings';
import Instructor from '@/features/course/components/Instructor';
import VideoPlayer from '@/features/course/components/VideoPlayer';
import { demoCourse } from '@/lib/mocks';

export default function CoursePage() {
  return (
    <div>
      <CourseInfoSidebar course={demoCourse} />
      <div className="mr-[19.25rem] space-y-4">
        <VideoPlayer title={demoCourse.title} subtitle={demoCourse.subtitle} />
        <CourseLearnings />
        <CourseContent />
        <Instructor />
      </div>
    </div>
  );
}
