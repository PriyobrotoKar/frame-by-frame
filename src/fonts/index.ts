import { DM_Sans } from "next/font/google";
import localfont from "next/font/local";

export const DMSans = DM_Sans({
  subsets: ["latin"],
});

export const Bethaine = localfont({
  src: "./Bethaine.ttf",
});
