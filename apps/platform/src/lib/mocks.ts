import { Certificate } from '@/components/card/CertificateCard';
import { Course } from '@/components/card/CourseCard';
import { Playlist } from '@/components/card/YoutubePlaylistCard';

export const demoCourse: Course = {
  id: '1',
  title: 'The Capcut Video Editing Masterclass',
  slug: 'the-capcut-video-editing-masterclass',
  subtitle: 'Video Editing on Phone',
  price: 100,
  originalPrice: 200,
  currency: 'INR',
  duration: '2hrs 30mins',
  lessons: 10,
  imageUrl:
    'https://futurevisioncomputers.com/wp-content/uploads/2023/09/Adobe-Premiere-Pro-course-Adobe-Premiere-Pro.jpg',
  modules: [
    {
      id: '1',
      title: 'Basics of Capcut',
      slug: 'basics-of-capcut',
      lessons: [
        {
          id: '1',
          title: 'Introduction to Capcut',
          slug: 'introduction-to-capcut',
          duration: '10 mins',
        },
        {
          id: '2',
          title: 'Basic Editing Techniques',
          slug: 'basic-editing-techniques',
          duration: '20 mins',
        },
      ],
    },
    {
      id: '2',
      title: 'Advanced Techniques',
      slug: 'advanced-techniques',
      lessons: [
        {
          id: '3',
          title: 'Transitions and Effects',
          slug: 'transitions-and-effects',
          duration: '15 mins',
        },
        {
          id: '4',
          title: 'Color Grading',
          slug: 'color-grading',
          duration: '25 mins',
        },
      ],
    },
  ],
};

export const demoPlaylist: Playlist = {
  title: 'The Desktop Video Editing Masterclass',
  imageUrl:
    'https://futurevisioncomputers.com/wp-content/uploads/2023/09/Adobe-Premiere-Pro-course-Adobe-Premiere-Pro.jpg',
  videos: 10,
  channel: 'Devgotmoney',
};

export const demoCertificate: Certificate = {
  title: 'Certificate of Completion',
  certificateUrl:
    'https://img.freepik.com/free-vector/vintage-achievement-certificate-template-vector-professional-design-blue_53876-157583.jpg?t=st=1743690053~exp=1743693653~hmac=494c633e65e700b731252cd292a9edf4522e08cdef726ce62eb0b6d2b22a57e2&w=1800',
};
