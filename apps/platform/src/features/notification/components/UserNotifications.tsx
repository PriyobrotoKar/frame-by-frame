import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getNotifications } from '../actions/getNotifications';
import NotificationList from './NotificationList';
import { Button } from '@/components/ui/button';
import { IconBell } from '@tabler/icons-react';
import MarkAllAsReadButton from './MarkAsRead';
import NotificationCount from './NotificationCount';

const UserNotifications = async () => {
  const notifications = await getNotifications();
  const isAllRead =
    notifications.notifications.length === 0 ||
    notifications.notifications.every((n) => n.isRead);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            title="Notifications"
            size={'icon'}
            className="relative"
            variant={'secondary'}
          >
            <IconBell />
            <NotificationCount notifications={notifications.notifications} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-96 space-y-5">
          <div className="flex items-center justify-between px-6 pt-6">
            <h2 className="text-lg">Notifications</h2>
            <MarkAllAsReadButton isAllRead={isAllRead} />
          </div>
          <NotificationList
            className="p-6 pt-0"
            notifications={notifications.notifications}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserNotifications;
