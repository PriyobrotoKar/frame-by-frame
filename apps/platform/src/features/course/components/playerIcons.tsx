import {
  defaultLayoutIcons,
  type DefaultLayoutIcons,
} from '@vidstack/react/player/layouts/default';

import {
  IconCast,
  IconMaximize,
  IconMinimize,
  IconPictureInPicture,
  IconPictureInPictureOff,
  IconPlayerPause,
  IconPlayerPlay,
  IconRestore,
  IconSettings,
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
  Menu: {
    ...defaultLayoutIcons.Menu,
    Settings: () => <IconSettings />,
  },
  FullscreenButton: {
    Enter: () => <IconMaximize />,
    Exit: () => <IconMinimize />,
  },
  PIPButton: {
    Enter: () => <IconPictureInPicture />,
    Exit: () => <IconPictureInPictureOff />,
  },
  GoogleCastButton: {
    ...defaultLayoutIcons.GoogleCastButton,
    Default: () => <IconCast />,
  },
};

export default icons;
