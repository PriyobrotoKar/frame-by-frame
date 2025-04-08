'use client';
import React from 'react';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default';
import icons from './playerIcons';

interface VideoPlayerProps {
  lessonName: string;
  moduleName: string;
}

const VideoPlayer = ({ lessonName, moduleName }: VideoPlayerProps) => {
  return (
    <div className="bg-card space-y-5 rounded-2xl border p-4">
      <MediaPlayer
        title="Thunderbolts Official Teaser Trailer"
        src="https://brightpath-dev.s3.ap-south-1.amazonaws.com/hls/thunderbolts.mp4/index.m3u8"
      >
        <MediaProvider />
        <DefaultVideoLayout
          icons={{
            ...defaultLayoutIcons,
            ...icons,
          }}
        />
      </MediaPlayer>

      <div className="space-y-2">
        <p className="text-muted-foreground text-sm">{moduleName}</p>
        <h2 className="text-xl">{lessonName}</h2>
      </div>
    </div>
  );
};

export default VideoPlayer;
