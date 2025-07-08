import {
  IconCertificate,
  IconDeviceMobile,
  IconInfinity,
  IconNotebook,
  IconPlayerPlay,
} from '@tabler/icons-react';
import CourseCard from '../card/CourseCard';
import { CourseWithChapters } from '@/features/course/actions/getCourse';

interface CourseInfoSidebarProps {
  course: CourseWithChapters;
  isEnrolled?: boolean;
}

const courseFeatures = [
  {
    icon: IconPlayerPlay,
    title: '3+ hours of on-demand content',
  },
  {
    icon: IconInfinity,
    title: 'Lifetime access',
  },
  {
    icon: IconCertificate,
    title: 'Certificate of completion',
  },
  {
    icon: IconDeviceMobile,
    title: 'Access on mobile and desktop',
  },
  {
    icon: IconNotebook,
    title: 'Valuable resources',
  },
];

export default function CourseInfoSidebar({
  course,
  isEnrolled = false,
}: CourseInfoSidebarProps) {
  return (
    <div className="h-fit w-full space-y-5 md:sticky md:top-40 md:max-w-80">
      <CourseCard
        className="bg-primary-foreground"
        isEnrolled={isEnrolled}
        course={course}
      />
      <CourseIncludes />
    </div>
  );
}

function CourseIncludes() {
  return (
    <div className="space-y-4 rounded-lg border p-4">
      <h2 className="text-lg">Course Includes</h2>
      <ul className="space-y-3">
        {courseFeatures.map((feature, index) => (
          <li key={index} className="text-sm-md flex items-center gap-2">
            <feature.icon />
            <span>{feature.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
