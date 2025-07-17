'use client';
import { Input } from '@/components/ui/input';
import { Session, updateSession } from '@/lib/session';
import { IconArrowBack, IconPencil } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { updateUser } from '../actions/update';
import { toast } from 'sonner';

interface NameInputProps {
  session: Session;
}

const NameInput = ({ session }: NameInputProps) => {
  const [name, setName] = useState<string>(session.user.name || '');

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: { name: string }) => {
      return await updateUser(data);
    },
    onError: (error) => {
      toast.error('Failed to update user name. Please try again.');
      console.error('Error updating user:', error);
    },
    onSuccess: async (data) => {
      await updateSession(undefined, {
        name: data.name,
      });
    },
  });

  console.log(name !== session.user.name);

  const handleEnterKey = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;

    e.preventDefault();
    if (name.trim() === '') {
      return;
    }

    mutate({ name: name.trim() });
  };

  return (
    <div className="relative">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={handleEnterKey}
        disabled={isPending}
      />
      {name !== session.user.name ? (
        <IconArrowBack className="absolute right-3 top-1/2 size-3 -translate-y-1/2" />
      ) : (
        <IconPencil className="absolute right-3 top-1/2 size-3 -translate-y-1/2" />
      )}
    </div>
  );
};

export default NameInput;
