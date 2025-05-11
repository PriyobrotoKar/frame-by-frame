'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IconLoader2 } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { createCourse } from '../actions/createCourse';

const CreateCourseForm = () => {
  const [name, setName] = useState<string>('');
  const router = useRouter();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (name: string) => {
      return await createCourse({
        title: name,
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      router.push(`/admin/course/${data.slug}/content`);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) {
      return;
    }

    mutate(name);
  };

  if (isPending || isSuccess) {
    return <WorkspaceLoading />;
  }

  return (
    <div className="bg-background space-y-8 rounded-xl p-16">
      <div className="space-y-2">
        <h1 className="text-primary text-2xl">
          Lets start by creating your first course
        </h1>
        <p>Give it a name, don’t worry you can change it later.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2">
          <Label>Course Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <Button className="w-full">Continue</Button>
      </form>
    </div>
  );
};

const WorkspaceLoading = () => {
  return (
    <div className="bg-background space-y-8 rounded-xl p-16">
      <div className="space-y-2">
        <h1 className="text-primary text-2xl">
          Great, setting up your workspace
        </h1>
        <p>Configure your course by adding in chapters and modules.</p>
      </div>

      <IconLoader2 className="text-primary mx-auto size-7 animate-spin" />
    </div>
  );
};

export default CreateCourseForm;
