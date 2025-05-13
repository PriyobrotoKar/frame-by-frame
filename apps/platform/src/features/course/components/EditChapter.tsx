import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateChapter } from '../actions/updateChapter';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

interface EditChapterProps {
  chapter: { name: string; slug: string } | undefined;
  setChapter: (data: { name: string; slug: string } | undefined) => void;
}

const EditChapter = ({ chapter, setChapter }: EditChapterProps) => {
  const [name, setName] = useState<string>('');
  const [open, setOpen] = useState(false);
  const { slug } = useParams<{ slug: string }>();

  const queryClient = useQueryClient();

  console.log(open, chapter);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: { name: string; chapterSlug: string }) => {
      return await updateChapter(slug, data.chapterSlug, {
        title: data.name,
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['course', slug, 'chapters'],
      });
      toast.success('Chapter updated');
      setOpen(false);
      setChapter(undefined);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !chapter) {
      return;
    }

    mutate({ name, chapterSlug: chapter.slug });
  };

  useEffect(() => {
    setOpen(!!chapter);
    setName(chapter?.name ?? '');
  }, [chapter]);

  return (
    <Dialog open={open} onOpenChange={(open) => !open && setChapter(undefined)}>
      <DialogContent className="sm:max-w-80">
        <DialogTitle>Edit chapter</DialogTitle>

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

export default EditChapter;
