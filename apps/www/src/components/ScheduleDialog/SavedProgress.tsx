import { useAtom, useSetAtom } from 'jotai';
import { Button } from '../ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { scheduleMeetingAtom, stepAtom } from '@/lib/store';

interface SavedProgressProps {
  setStep: (step: number) => void;
  setHasSavedProgress: (hasSavedProgress: boolean) => void;
}

export default function SavedProgress({
  setStep,
  setHasSavedProgress,
}: SavedProgressProps) {
  const setScheduleMeeting = useSetAtom(scheduleMeetingAtom);
  const [lastStep, setLastStep] = useAtom(stepAtom);

  return (
    <DialogContent className="w-[90%] gap-10 rounded-lg p-10 md:gap-5 md:p-20">
      <DialogHeader>
        <DialogTitle>Hey we saved your progress!</DialogTitle>
        <DialogDescription>
          Do you want to continue where you left off or start new?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button
          onClick={() => {
            setScheduleMeeting(null);
            setLastStep(0);
          }}
          type="button"
          size={'sm'}
          variant={'ghost'}
        >
          Start New
        </Button>
        <Button
          onClick={() => {
            setStep(lastStep);
            setHasSavedProgress(false);
          }}
          size={'sm'}
        >
          Continue
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
