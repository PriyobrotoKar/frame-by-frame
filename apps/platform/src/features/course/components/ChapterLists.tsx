'use client';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getAllChapters } from '../actions/getChapters';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import EditChapter from './EditChapter';
import { useState } from 'react';
import ChapterActionDropdown from './ChapterActionDropdown';
import DeleteChapter from './DeleteChapter';

const ChapterLists = () => {
  const { slug } = useParams<{ slug: string }>();
  const [openDialog, setOpenDialog] = useState<'EDIT' | 'DELETE' | undefined>();
  const [chapter, setChapter] = useState<
    { name: string; slug: string } | undefined
  >();

  const { data, isLoading } = useQuery({
    queryKey: ['course', slug, 'chapters'],
    queryFn: async () => {
      return await getAllChapters(slug);
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="pr-6">
      <Accordion type="multiple" className="space-y-2">
        {data?.map((chapter) => {
          return (
            <AccordionItem
              className="data-[state=open]:bg-muted group"
              key={chapter.id}
              value={chapter.id}
            >
              <AccordionTrigger asChild className="text-md items-center gap-1">
                <div>
                  {chapter.title}
                  <ChapterActionDropdown
                    chapter={chapter}
                    setChapter={setChapter}
                    setOpenDialog={setOpenDialog}
                  />
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-5"></AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
      <EditChapter
        setChapter={setChapter}
        chapter={openDialog === 'EDIT' ? chapter : undefined}
      />
      <DeleteChapter
        setChapter={setChapter}
        chapter={openDialog === 'DELETE' ? chapter : undefined}
      />
    </div>
  );
};

export default ChapterLists;
