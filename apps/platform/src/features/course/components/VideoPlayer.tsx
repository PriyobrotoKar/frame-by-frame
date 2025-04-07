'use client';
import React from 'react';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
  type DefaultLayoutIcons,
} from '@vidstack/react/player/layouts/default';
import {
  IconPlayerPause,
  IconPlayerPlay,
  IconRestore,
  IconVolume,
  IconVolume2,
  IconVolumeOff,
} from '@tabler/icons-react';

const icons: Partial<DefaultLayoutIcons> = {
  PlayButton: {
    Play: () => <IconPlayerPlay />,
    Pause: () => <IconPlayerPause />,
    Replay: () => <IconRestore />,
  },
  MuteButton: {
    Mute: () => <IconVolumeOff />,
    VolumeLow: () => <IconVolume2 />,
    VolumeHigh: () => <IconVolume />,
  },
};

const VideoPlayer = () => {
  return (
    <div>
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
    </div>
  );
};

export default VideoPlayer;
