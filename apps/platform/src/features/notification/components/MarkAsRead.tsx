'use client';

import { Button } from '@/components/ui/button';
import { IconChecks } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { markAllAsRead } from '../actions/markAsRead';
import { toast } from 'sonner';

interface MarkAllAsReadButtonProps {
  isAllRead: boolean;
}

const MarkAllAsReadButton = ({ isAllRead }: MarkAllAsReadButtonProps) => {
  const [isRead, setIsRead] = useState<boolean>(isAllRead);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => {
      return await markAllAsRead();
    },
    onError: (error) => {
      console.error('Error marking all notifications as read:', error);
      toast.error(
        'Failed to mark all notifications as read. Please try again later.',
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notifications'],
      });
      setIsRead(true);
    },
  });

  useEffect(() => {
    setIsRead(isAllRead);
  }, [isAllRead]);

  return (
    <Button
      onClick={() => mutate()}
      size={'icon'}
      variant={'ghost'}
      className={isRead ? '[&_svg]:text-muted-foreground' : ''}
    >
      <IconChecks />
    </Button>
  );
};

export default MarkAllAsReadButton;
