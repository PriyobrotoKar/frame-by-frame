'use client';
import React, { useEffect, useRef } from 'react';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import {
  isHLSProvider,
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider,
  MediaProviderAdapter,
  useStore,
} from '@vidstack/react';
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default';
import icons from './playerIcons';
import { cn } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface VideoPlayerProps {
  title?: string;
  subtitle?: string | null;
  src?: string | null;
  className?: string;
  token?: string;
  updateProgressFn?: (progress: number) => Promise<unknown>;
  revalidateQueryKey?: string[];
  progress?: number;
}

const VideoPlayer = ({
  title,
  subtitle,
  src,
  className,
  token,
  updateProgressFn,
  revalidateQueryKey,
  progress,
}: VideoPlayerProps) => {
  const baseUrl = token
    ? `${process.env.NEXT_PUBLIC_API_URL}/api`
    : 'https://framebyframe-dev.s3.ap-south-1.amazonaws.com/';

  const ref = useRef<MediaPlayerInstance>(null);
  const currentProgress = useRef(progress || 0);
  const queryClient = useQueryClient();
  const { playing, currentTime } = useStore(MediaPlayerInstance, ref);

  const { mutate } = useMutation({
    mutationFn: async () => {
      if (!updateProgressFn) return;
      return await updateProgressFn(Math.round(currentTime));
    },
    onError: (error) => {
      console.error('Error updating lesson progress:', error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: revalidateQueryKey,
      });
    },
  });

  function onProviderChange(provider: MediaProviderAdapter | null) {
    if (isHLSProvider(provider)) {
      if (!token) {
        // If the video is not secure, we can use the default src without any auth
        provider.config = {};
        return;
      }
      provider.config = {
        xhrSetup(xhr, url) {
          // if the url is for segments, wo don't need to set the auth header
          if (url.includes('.ts')) return;
          xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        },
      };
    }
  }

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (playing) {
      interval = setInterval(mutate, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [playing, mutate]);

  if (!src) {
    return (
      <div
        className={cn('bg-card space-y-4 rounded-2xl border p-4', className)}
      >
        <p className="text-muted-foreground text-sm">Video not available</p>
      </div>
    );
  }

  return (
    <div className={cn('bg-card space-y-4 rounded-2xl border p-4', className)}>
      <MediaPlayer
        playsInline
        crossOrigin
        currentTime={currentProgress.current}
        ref={ref}
        onProviderChange={onProviderChange}
        src={baseUrl + src}
        keyTarget="document"
      >
        <MediaProvider />
        <DefaultVideoLayout
          icons={{
            ...defaultLayoutIcons,
            ...icons,
          }}
        />
      </MediaPlayer>

      {(title || subtitle) && (
        <div className="space-y-2">
          {subtitle && (
            <p className="text-muted-foreground text-sm">{subtitle}</p>
          )}
          {title && <h2 className="text-lg">{title}</h2>}
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
