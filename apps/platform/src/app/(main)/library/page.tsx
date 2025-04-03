import LibraryCard from '@/components/card/LibraryCard';
import { demoCourse } from '../page';

export default function LibraryPage() {
  return (
    <div>
      <section className="space-y-4">
        <h2 className="text-lg">My Courses</h2>
        <div className="flex gap-4 [&>*]:flex-1">
          <LibraryCard course={demoCourse} />
          <LibraryCard course={demoCourse} />
        </div>
      </section>
    </div>
  );
}
