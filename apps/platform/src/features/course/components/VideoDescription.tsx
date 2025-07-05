import { Attachment } from '@frame-by-frame/db';
import { IconPdf, IconZip } from '@tabler/icons-react';
import React from 'react';

interface VideoDescriptionProps {
  description: string | null;
  attachments: Attachment[];
}

const VideoDescription = ({
  description,
  attachments,
}: VideoDescriptionProps) => {
  return (
    <div className="bg-card space-y-4 rounded-2xl border p-4">
      <h3 className="text-lg">Description</h3>
      <p className="text-muted-foreground whitespace-pre-wrap">{description}</p>
      <div>
        {attachments.map((attachment) => {
          return (
            <div
              key={attachment.id}
              className="bg-muted flex items-center gap-2 rounded-lg border px-4 py-3 md:max-w-60"
            >
              <div>{attachment.type === 'PDF' ? <IconPdf /> : <IconZip />}</div>
              <div className="flex flex-col">
                <span className="text-sm-md line-clamp-1 break-all">
                  {attachment.name}
                </span>
                <span className="text-muted-foreground text-sm">
                  {(attachment.size / Math.pow(2, 20)).toFixed(2)} MB
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VideoDescription;
