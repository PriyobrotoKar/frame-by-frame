import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { ScheduleMeeting, scheduleMeetingAtom } from '@/lib/store';
import { Textarea } from '../ui/textarea';

const schema = z.object({
  challenge: z.string().min(2).max(1000),
});

interface ChallengeFormProps {
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

export default function ChallengeForm({
  goToNextStep,
  goToPreviousStep,
}: ChallengeFormProps) {
  const [scheduleMeeting, setScheduleMeeting] = useAtom(scheduleMeetingAtom);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      challenge: scheduleMeeting?.challenge || '',
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
          <DialogTitle>
            What’s your biggest challenge right now with content creation?
          </DialogTitle>
          <DialogDescription>
            Be honest, these responses determine whether we would work together
            or not.
          </DialogDescription>
        </div>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="space-y-5">
            <FormField
              name="challenge"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="I am struggling with managing multiple aspects of content creation, particularly in ..."
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
