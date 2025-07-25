import { Inter as InterFont } from 'next/font/google';
import localfont from 'next/font/local';

export const Inter = InterFont({
  subsets: ['latin'],
});

export const Bethaine = localfont({
  src: './Bethaine.ttf',
});
