import React, { useState } from 'react';
import {
  IconCirclePlus,
  IconDotsVertical,
  IconPencil,
  IconTrash,
} from '@tabler/icons-react';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Chapter } from '@frame-by-frame/db';
import { useParams, useRouter } from 'next/navigation';

const ChapterActionDropdown = ({
  chapter,
  setChapter,
  setOpenDialog,
}: {
  chapter: Chapter;
  setChapter: (data: { name: string; slug: string } | undefined) => void;
  setOpenDialog: (data: 'EDIT' | 'DELETE' | 'ADD' | undefined) => void;
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter();
  const { slug: courseSlug } = useParams<{ slug: string }>();

  return (
    <DropdownMenu open={openMenu} onOpenChange={setOpenMenu}>
      <DropdownMenuTrigger
        onClick={(e) => e.stopPropagation()}
        className="pointer-events-none opacity-0 group-data-[state=open]:pointer-events-auto group-data-[state=open]:opacity-100"
      >
        <IconDotsVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
        <DropdownMenuItem
          onSelect={(e) => {
            e.stopPropagation();
            setOpenMenu(false);
            router.push(`/admin/course/${courseSlug}/content/new`);
            setChapter({
              name: chapter.title,
              slug: chapter.slug,
            });
            setOpenDialog('ADD');
          }}
        >
          <IconCirclePlus /> Add Module
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(e) => {
            e.stopPropagation();
            setOpenMenu(false);
            setChapter({
              name: chapter.title,
              slug: chapter.slug,
            });
            setOpenDialog('EDIT');
          }}
        >
          <IconPencil /> Edit Chapter
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(e) => {
            e.stopPropagation();
            setOpenMenu(false);
            setChapter({
              name: chapter.title,
              slug: chapter.slug,
            });
            setOpenDialog('DELETE');
          }}
        >
          <IconTrash /> Delete Chapter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChapterActionDropdown;
