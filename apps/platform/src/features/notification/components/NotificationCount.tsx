'use client';

import React from 'react';
import {
  getNotifications,
  NotificationWithReadStatus,
} from '../actions/getNotifications';
import { useQuery } from '@tanstack/react-query';

interface NotificationCountProps {
  notifications: NotificationWithReadStatus[];
}

const NotificationCount = ({ notifications }: NotificationCountProps) => {
  const { data } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const notfications = await getNotifications();
      return notfications.notifications;
    },
    initialData: notifications,
    refetchInterval: 5 * 60 * 1000, // 5 minutes
  });

  const unreadCount = data.filter(
    (notification) => !notification.isRead,
  ).length;

  if (unreadCount === 0) {
    return null;
  }

  return (
    <span className="bg-primary text-primary-foreground absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full text-sm">
      {unreadCount}
    </span>
  );
};

export default NotificationCount;
