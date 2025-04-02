import Banner from '@/components/Banner';

export default function LibraryPage() {
  return (
    <div>
      <Banner
        title="Developing a Skill has Never been Easier."
        subtitle="Digital Courses"
        image="/illustrations/library.svg"
        link={{ href: '/', label: 'Explore paid courses' }}
      />
    </div>
  );
}
