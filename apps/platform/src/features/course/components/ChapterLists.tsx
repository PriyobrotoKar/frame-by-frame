'use client';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { ChapterWithDocuments, getAllChapters } from '../actions/getChapters';
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
import AddModule from './AddModule';
import { IconFileDescription } from '@tabler/icons-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ChapterListsProps {
  chapters: ChapterWithDocuments[];
}

const ChapterLists = ({ chapters }: ChapterListsProps) => {
  const { slug, details } = useParams<{
    slug: string;
    details: string[] | undefined;
  }>();
  const [chapterSlug, lessonSlug] = details ?? [];

  const [openDialog, setOpenDialog] = useState<
    'EDIT' | 'DELETE' | 'ADD' | undefined
  >();
  const [chapter, setChapter] = useState<
    { name: string; slug: string } | undefined
  >();

  const { data, isLoading } = useQuery({
    queryKey: ['course', slug, 'chapters'],
    initialData: chapters,
    queryFn: async () => {
      return await getAllChapters(slug);
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="pr-6">
      <Accordion
        type="multiple"
        defaultValue={[chapterSlug ?? '']}
        className="space-y-2"
      >
        {data?.map((chapter) => {
          return (
            <AccordionItem
              className="data-[state=open]:bg-muted group"
              key={chapter.id}
              value={chapter.slug}
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
              <AccordionContent className="space-y-5">
                {chapter.documents.map((document) => {
                  const isActive = lessonSlug === document.slug;

                  return (
                    <Link
                      href={`/admin/course/${slug}/content/${chapter.slug}/${document.slug}`}
                      className={cn(
                        'flex items-center gap-2',
                        isActive && 'text-primary',
                      )}
                      key={document.id}
                    >
                      <IconFileDescription className="shrink-0" />
                      <span className="line-clamp-2">{document.title}</span>
                    </Link>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
      <AddModule
        chapter={chapter}
        open={openDialog === 'ADD'}
        setOpen={setOpenDialog}
      />
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
