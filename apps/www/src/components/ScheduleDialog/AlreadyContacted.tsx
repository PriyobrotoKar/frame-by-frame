import Image from 'next/image';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

export default function AlreadyContacted() {
  return (
    <DialogContent className="w-[90%] gap-10 rounded-lg p-10 md:gap-5 md:p-20">
      <Image
        src="/already-contacted.png"
        alt="Already Contacted"
        className="mx-auto"
        width={135}
        height={135}
      />
      <DialogHeader>
        <DialogTitle>
          <span className="text-secondary"> Oops!</span> Looks like you have
          scheduled a meeting before.
        </DialogTitle>
        <DialogDescription>
          Please search your previous mail for meeting details.
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}
