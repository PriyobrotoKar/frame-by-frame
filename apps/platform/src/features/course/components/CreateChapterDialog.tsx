'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { createChapter } from '../actions/createChapter';
import { IconCirclePlus } from '@tabler/icons-react';

const CreateChapterDialog = () => {
  const [name, setName] = useState<string>('');
  const [open, setOpen] = useState(false);
  const { slug } = useParams<{ slug: string }>();

  const { mutate, isPending } = useMutation({
    mutationFn: async (name: string) => {
      return await createChapter(slug, {
        title: name,
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success('New chapter created');
      setOpen(false);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) {
      return;
    }

    mutate(name);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={'icon'} variant={'ghost'}>
          <IconCirclePlus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-80">
        <DialogTitle>Create new chapter</DialogTitle>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Chapter Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <Button className="w-full" disabled={isPending}>
            Continue
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChapterDialog;
