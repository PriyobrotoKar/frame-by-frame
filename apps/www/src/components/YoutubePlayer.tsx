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
      className="aspect-video overflow-hidden rounded-lg"
      ref={playerRef}
    >
      <ReactPlayer
        width={'100%'}
        height={'100%'}
        src={'https://youtu.be/Bfh3WL4dRA4?si=rQ2y8YPTE-yqbwFS'}
      />
    </motion.div>
  );
}
