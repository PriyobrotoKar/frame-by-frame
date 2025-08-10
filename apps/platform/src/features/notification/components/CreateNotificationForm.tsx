'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { NotificationType } from '@frame-by-frame/db';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconBell, IconGift } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createNotification } from '../actions/createNotification';
import { toast } from 'sonner';

const CreateNotificationSchema = z.object({
  message: z.string().min(1, 'Message is required'),
  type: z.nativeEnum(NotificationType),
});

const CreateNotificationForm = () => {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof CreateNotificationSchema>>({
    resolver: zodResolver(CreateNotificationSchema),
    defaultValues: {
      message: '',
      type: NotificationType.ALERT,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof CreateNotificationSchema>) => {
      return await createNotification(data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['notifications'],
      });
      form.reset();
    },
    onError: (error) => {
      console.error('Error creating notification:', error);
      toast.error('Failed to create notification. Please try again later.');
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    mutate(data);
  });

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <h3 className="text-md">New Alert</h3>
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-4">
          <FormField
            name="message"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Alert name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter alert name" {...field} />
                  </FormControl>
                </FormItem>
              );
            }}
          />

          <FormField
            name="type"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Alert type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      className="flex gap-4"
                    >
                      <FormItem>
                        <FormControl>
                          <RadioGroupItem
                            hidden
                            value={NotificationType.ALERT}
                            className="peer"
                          />
                        </FormControl>
                        <FormLabel className="peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary rounded-lg border p-3">
                          <IconBell />
                          Alert
                        </FormLabel>
                      </FormItem>
                      <FormItem>
                        <FormControl>
                          <RadioGroupItem
                            className="peer"
                            hidden
                            value={NotificationType.GIFT}
                          />
                        </FormControl>
                        <FormLabel className="peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary rounded-lg border p-3">
                          <IconGift />
                          Gift
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <Button disabled={isPending} className="w-full">
            Send Notification
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateNotificationForm;
