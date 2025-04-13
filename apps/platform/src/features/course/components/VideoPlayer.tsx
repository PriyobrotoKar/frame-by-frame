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
  title: string;
  subtitle: string;
}

const VideoPlayer = ({ title, subtitle }: VideoPlayerProps) => {
  return (
    <div className="bg-card space-y-5 rounded-2xl border p-4">
      <MediaPlayer src="https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8">
        <MediaProvider />
        <DefaultVideoLayout
          icons={{
            ...defaultLayoutIcons,
            ...icons,
          }}
        />
      </MediaPlayer>

      <div className="space-y-2">
        <p className="text-muted-foreground text-sm">{subtitle}</p>
        <h2 className="text-xl">{title}</h2>
      </div>
    </div>
  );
};

export default VideoPlayer;
