import { Button } from '@/components/ui/button';
import { IconPdf, IconPlus, IconZip } from '@tabler/icons-react';
import React from 'react';

const ModuleLoadingSkeleton = () => {
  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-6">
        <div className="bg-muted h-4 w-28 animate-pulse rounded-sm"></div>

        <div className="space-y-2">
          <div className="bg-muted h-4 w-10 animate-pulse rounded-sm"></div>
          <div className="bg-muted h-8 w-full animate-pulse rounded-sm"></div>
        </div>

        <div className="space-y-2">
          <div className="bg-muted h-4 w-10 animate-pulse rounded-sm"></div>
          <div className="bg-muted h-40 w-full animate-pulse rounded-sm"></div>
        </div>

        <div className="space-y-2">
          <div className="bg-muted h-4 w-20 animate-pulse rounded-sm"></div>
          <Button
            variant={'outline'}
            className="text-muted-foreground/30 border-muted-foreground/30 animate-pulse"
          >
            <IconPlus className="!text-muted-foreground/30" /> New
          </Button>
        </div>
      </div>
      <div className="border-border/50 min-w-72 space-y-4 rounded-lg border p-4">
        <div className="bg-primary-foreground space-y-4 rounded-md p-4">
          <div className="bg-muted h-40 w-full animate-pulse rounded-md"></div>

          <div className="bg-muted h-4 w-20 animate-pulse rounded-md"></div>

          <div className="space-y-1">
            <div className="bg-muted h-4 animate-pulse rounded-md"></div>
            <div className="bg-muted h-4 animate-pulse rounded-md"></div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-muted h-4 w-20 animate-pulse rounded-md"></div>

          <div className="space-y-1">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                className="bg-muted h-4 animate-pulse rounded-md"
                key={index}
              ></div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="bg-primary-foreground flex items-center gap-4 rounded-md p-4">
            <IconPdf className="text-muted-foreground/30" />
            <div className="bg-muted h-4 flex-1 animate-pulse rounded-md"></div>
            <div className="bg-muted h-4 min-w-8 animate-pulse rounded-md"></div>
          </div>

          <div className="bg-primary-foreground flex items-center gap-4 rounded-md p-4">
            <IconZip className="text-muted-foreground/30" />
            <div className="bg-muted h-4 flex-1 animate-pulse rounded-md"></div>
            <div className="bg-muted h-4 min-w-8 animate-pulse rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleLoadingSkeleton;
