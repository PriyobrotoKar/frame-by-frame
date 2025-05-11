import { getCourses } from '@/features/course/actions/getCourse';
import { redirect } from 'next/navigation';

export default async function page() {
  const [course] = await getCourses();

  if (!course) {
    return redirect('/admin/course/create'); // Redirect to create a new course if none exist
  }

  redirect(`/admin/course/${course.slug}/content`); // Redirect to the first course
}
