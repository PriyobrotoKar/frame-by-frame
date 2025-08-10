'use client';
import { Notification } from '@frame-by-frame/db';
import { IconBell, IconGift } from '@tabler/icons-react';
import React from 'react';
import {
  getNotifications,
  NotificationWithReadStatus,
} from '../actions/getNotifications';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';

interface NotificationListProps {
  notifications: Notification[] | NotificationWithReadStatus[];
  className?: string;
}

const NotificationList = ({
  notifications,
  className,
}: NotificationListProps) => {
  const { data } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const notfications = await getNotifications();
      return notfications.notifications;
    },
    initialData: notifications,
  });

  if (!data || data.length === 0) {
    return (
      <div className="text-muted-foreground px-6 pb-20 pt-12 text-center text-sm">
        No notifications available.
      </div>
    );
  }

  return (
    <div className={cn('max-h-64 space-y-3 overflow-y-auto px-6', className)}>
      {data.map((notification) => {
        return (
          <NotificationItem key={notification.id} notification={notification} />
        );
      })}
    </div>
  );
};

interface NotificationItemProps {
  notification: Notification & {
    isRead?: boolean;
  };
}

const NotificationItem = ({ notification }: NotificationItemProps) => {
  return (
    <div
      className={cn(
        'text-muted-foreground flex gap-3 px-4 py-3',
        notification.isRead !== undefined &&
          !notification.isRead &&
          'bg-muted text-primary rounded-md',
      )}
    >
      {notification.type === 'ALERT' ? <IconBell /> : <IconGift />}
      <div>
        <h3 className="text-sm-md">{notification.message}</h3>
        <span className="text-sm">
          {new Date(notification.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </div>
  );
};

export default NotificationList;
