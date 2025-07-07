import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { IconAlertCircle } from '@tabler/icons-react';
import { deleteChapter } from '../actions/deleteChapter';

interface DeleteChapterProps {
  chapter: { name: string; slug: string } | undefined;
  setChapter: (data: { name: string; slug: string } | undefined) => void;
}

const DeleteChapter = ({ chapter, setChapter }: DeleteChapterProps) => {
  const [value, setValue] = useState<string>('');
  const [open, setOpen] = useState(false);
  const { slug: courseSlug } = useParams<{ slug: string }>();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (slug: string) => {
      return await deleteChapter(courseSlug, slug);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['course', courseSlug, 'chapters'],
      });
      toast.success('Chapter deleted successfully');
      setOpen(false);
      setChapter(undefined);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value || !chapter || value !== 'confirm') {
      return;
    }

    mutate(chapter.slug);
  };

  useEffect(() => {
    setOpen(!!chapter);
  }, [chapter]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-fit">
        <DialogTitle>Delete chapter</DialogTitle>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>
              Type<strong>confirm</strong>below to delete the chapter
            </Label>
            <Input value={value} onChange={(e) => setValue(e.target.value)} />
          </div>

          <div className="bg-muted text-destructive flex items-center gap-2 rounded-md p-2 text-sm">
            <IconAlertCircle />
            This action cannot be undone, are you sure?
          </div>

          <Button
            className="w-full"
            disabled={isPending || value !== 'confirm'}
          >
            Continue
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteChapter;
