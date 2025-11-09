'use client';
import { useScroll, useTransform, motion } from 'motion/react';
import React, { useRef } from 'react';
import ReactPlayer from 'react-player';

export default function YoutubePlayer() {
  const playerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: playerRef,
    offset: ['start end', 'start 0.2'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <motion.div
      style={{ scale }}
      className="relative aspect-video"
      ref={playerRef}
    >
      <div className="from-background to-background animate-gradient absolute -inset-1 rounded-lg bg-[conic-gradient(from_var(--gradient-angle)_at_50%_45%,var(--tw-gradient-stops))] via-orange-400 to-70% blur-sm"></div>
      <ReactPlayer
        width={'100%'}
        height={'100%'}
        src={'https://youtu.be/Bfh3WL4dRA4?si=rQ2y8YPTE-yqbwFS'}
        className="overflow-hidden rounded-lg"
      />
    </motion.div>
  );
}
