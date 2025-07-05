import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IconBellPlus } from '@tabler/icons-react';
import React from 'react';
import CreateNotificationForm from './CreateNotificationForm';
import { getNotificationHistory } from '../actions/getNotificationHistory';
import NotificationList from './NotificationList';

const AdminNotification = async () => {
  const notifications = await getNotificationHistory();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button title="Notifications" size={'icon'} variant={'secondary'}>
          <IconBellPlus />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-96 space-y-5 p-6">
        <h2 className="text-lg">Customer Notification</h2>
        <CreateNotificationForm />
        <div className="space-y-4 rounded-lg border">
          <h2 className="text-md p-4 pb-0">Notification History</h2>
          <NotificationList notifications={notifications} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AdminNotification;
