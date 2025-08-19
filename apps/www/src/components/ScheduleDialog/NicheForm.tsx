import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { Input } from '../ui/input';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { ScheduleMeeting, scheduleMeetingAtom } from '@/lib/store';

const schema = z.object({
  niche: z.string().min(2).max(500),
});

interface NicheFormProps {
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

export default function NicheForm({
  goToNextStep,
  goToPreviousStep,
}: NicheFormProps) {
  const [scheduleMeeting, setScheduleMeeting] = useAtom(scheduleMeetingAtom);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      niche: scheduleMeeting?.niche || '',
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    setScheduleMeeting((prev: ScheduleMeeting | null) => ({
      ...prev,
      ...data,
    }));
    goToNextStep();
  });

  return (
    <div className="flex min-h-[32rem] flex-col justify-center space-y-10">
      <DialogHeader className="gap-10">
        <div className="space-y-3">
          <DialogTitle>Which niche are you in?</DialogTitle>
          <DialogDescription>
            Explain which niche you are currently in or desire to be in.
          </DialogDescription>
        </div>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="space-y-5">
            <FormField
              name="niche"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Video Editing, Finance, Fitness"
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
          </div>

          <DialogFooter>
            <Button
              onClick={goToPreviousStep}
              type="button"
              size={'sm'}
              variant={'ghost'}
            >
              Go Back
            </Button>

            <Button type="submit" size={'sm'}>
              Continue
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}
