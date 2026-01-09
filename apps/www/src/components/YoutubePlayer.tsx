'use client';
import { useScroll, useTransform, motion } from 'motion/react';
import MuxPlayer from '@mux/mux-player-react';
import React, { useRef } from 'react';

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
      className="relative aspect-video w-full"
      ref={playerRef}
    >
      <div className="animated-border-box-glow"></div>
      <div className="animated-border-box flex items-center justify-center">
        <div
          style={{ width: 'calc(100% - 10px)', height: 'calc(100% - 10px)' }}
          className="flex items-center justify-center overflow-hidden rounded-lg"
        >
          <MuxPlayer
            style={
              {
                '--bottom-controls': 'none',
              } as React.CSSProperties
            }
            className="block h-[103%]"
            playsInline
            defaultHiddenCaptions={true}
            playbackId="ojsqNncHjLj01SEVP4z7bo1P2kGnf02500JCBNEBvFccvs"
            poster="https://image.mux.com/ojsqNncHjLj01SEVP4z7bo1P2kGnf02500JCBNEBvFccvs/thumbnail.png?width=800&height=400&time=9"
            accentColor="#2F1D17"
          />
        </div>
      </div>
    </motion.div>
  );
}
