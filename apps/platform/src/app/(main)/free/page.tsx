import Banner from '@/components/Banner';
import YoutubePlaylistCard, {
  Playlist,
} from '@/components/card/YoutubePlaylistCard';

const demoPlaylist: Playlist = {
  title: 'The Desktop Video Editing Masterclass',
  imageUrl:
    'https://futurevisioncomputers.com/wp-content/uploads/2023/09/Adobe-Premiere-Pro-course-Adobe-Premiere-Pro.jpg',
  videos: 10,
  channel: 'Devgotmoney',
};

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
