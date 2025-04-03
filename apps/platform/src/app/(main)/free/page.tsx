import Banner from '@/components/Banner';
import YoutubePlaylistCard from '@/components/card/YoutubePlaylistCard';
import { demoPlaylist } from '@/lib/mocks';

export default function FreeCoursesPage() {
  return (
    <div className="space-y-10">
      <Banner
        title="Developing a Skill has Never been Easier."
        subtitle="Digital Courses"
        image="/illustrations/library.svg"
        link={{ href: '/', label: 'Explore paid courses' }}
      />

      <section className="space-y-4">
        <h2 className="text-lg">Youtube Playlist Library</h2>
        <div className="flex gap-4 [&>*]:flex-1">
          <YoutubePlaylistCard playlist={demoPlaylist} />
          <YoutubePlaylistCard playlist={demoPlaylist} />
          <YoutubePlaylistCard playlist={demoPlaylist} />
        </div>
      </section>
    </div>
  );
}
