import { Video, VideoStatus } from '@frame-by-frame/db';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

interface PollUploadStatusProps {
  fn: () => Promise<unknown>;
  status: VideoStatus;
  setStatus: (status: VideoStatus) => void;
}

export default function usePollUploadStatus({
  fn,
  status,
  setStatus,
}: PollUploadStatusProps): {
  data?: Video;
} {
  const { data } = useQuery({
    queryKey: ['pollUploadStatus'],
    queryFn: async () => {
      return (await fn()) as Video;
    },
    refetchInterval: () => {
      if (status === VideoStatus.NOT_STARTED || status === VideoStatus.READY)
        return false;

      return 5000;
    },
  });

  useEffect(() => {
    if (data) {
      setStatus(data.status);
    }
  }, [data, setStatus]);

  return { data };
}
