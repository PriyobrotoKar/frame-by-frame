import React from 'react';
import Card from '../ui/card';
import Image from 'next/image';
import {
  IconPlayerPlay,
  IconStack2,
  IconUserCircle,
} from '@tabler/icons-react';
import { Button } from '../ui/button';

export interface Playlist {
  title: string;
  imageUrl: string;
  videos: number;
  channel: string;
}

interface YoutubePlaylistCardProps {
  playlist: Playlist;
}

const YoutubePlaylistCard = ({ playlist }: YoutubePlaylistCardProps) => {
  return (
    <Card>
      <div>
        <Image
          src={playlist.imageUrl}
          alt="playlist Image"
          width={277}
          height={162}
          className="w-full rounded-lg"
        />
      </div>

      <Card.Content>
        <Card.Header>
          <Card.Title>{playlist.title}</Card.Title>
        </Card.Header>

        <div className="space-x-6">
          <Card.Info>
            <IconStack2 /> {playlist.videos} Videos
          </Card.Info>
          <Card.Info>
            <IconUserCircle /> {playlist.channel}
          </Card.Info>
        </div>

        <Card.Footer>
          <Button variant={'outline'} className="w-full">
            <IconPlayerPlay />
            Watch
          </Button>
        </Card.Footer>
      </Card.Content>
    </Card>
  );
};

export default YoutubePlaylistCard;
