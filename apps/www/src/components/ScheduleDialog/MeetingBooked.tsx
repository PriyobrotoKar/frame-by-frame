import Image from 'next/image';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

export default function MeetingBooked() {
  return (
    <DialogContent className="w-[90%] gap-5 rounded-lg p-10 md:p-20">
      <DialogHeader>
        <Image
          className="mx-auto"
          src={'/meeting-booked.png'}
          alt="Meeting Booked"
          width={135}
          height={135}
        />
        <DialogTitle>
          <span className="text-secondary"> Congratulations</span>, meeting
          booked.
        </DialogTitle>
        <DialogDescription>
          Please check your mail for confirmation & further details regarding
          the meeting.
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}
