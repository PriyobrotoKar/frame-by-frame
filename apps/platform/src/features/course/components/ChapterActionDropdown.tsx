import React, { useState } from 'react';
import { IconDotsVertical, IconPencil, IconTrash } from '@tabler/icons-react';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Chapter } from '@frame-by-frame/db';

const ChapterActionDropdown = ({
  chapter,
  setChapter,
  setOpenDialog,
}: {
  chapter: Chapter;
  setChapter: (data: { name: string; slug: string } | undefined) => void;
  setOpenDialog: (data: 'EDIT' | 'DELETE' | undefined) => void;
}) => {
  const [openMenu, setOpenMenu] = useState(false);

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
