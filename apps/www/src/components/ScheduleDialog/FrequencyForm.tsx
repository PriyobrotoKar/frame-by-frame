import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import {
  ContentFrequency,
  ScheduleMeeting,
  scheduleMeetingAtom,
} from '@/lib/store';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

const schema = z.object({
  contentFrequency: z.nativeEnum(ContentFrequency),
});

interface FrequencyFormProps {
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

export default function FrequencyForm({
  goToNextStep,
  goToPreviousStep,
}: FrequencyFormProps) {
  const [scheduleMeeting, setScheduleMeeting] = useAtom(scheduleMeetingAtom);

  const form = useForm({
    // @ts-expect-error -- Ignore type error
    resolver: zodResolver(schema),
    defaultValues: {
      contentFrequency: scheduleMeeting?.contentFrequency || undefined,
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
          <DialogTitle>Are you currently creating content?</DialogTitle>
          <DialogDescription>
            Explain which niche are currently in or desire to be in.
          </DialogDescription>
        </div>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="space-y-5">
            <FormField
              name="contentFrequency"
              render={({ field }) => {
                return (
                  <FormItem className="bg-transparent p-0 focus-within:ring-0 [&:has([aria-invalid='true'])]:ring-0">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="w-full"
                      >
                        <FormItem className="bg-input has-[:checked]:bg-primary/20 has-[:checked]:ring-primary w-full rounded-lg p-0 has-[:checked]:ring-1">
                          <FormControl>
                            <RadioGroupItem
                              value={ContentFrequency.Consistent}
                              className="peer"
                              hidden
                            />
                          </FormControl>
                          <FormLabel className="w-full bg-transparent px-4 py-3 focus-within:ring-0">
                            Yes, consistently
                          </FormLabel>
                        </FormItem>

                        <FormItem className="bg-input has-[:checked]:bg-primary/20 has-[:checked]:ring-primary w-full rounded-lg p-0 has-[:checked]:ring-1">
                          <FormControl>
                            <RadioGroupItem
                              hidden
                              value={ContentFrequency.Occasional}
                              className="peer"
                            />
                          </FormControl>
                          <FormLabel className="w-full bg-transparent px-4 py-3 focus-within:ring-0">
                            Yes, but not regularly
                          </FormLabel>
                        </FormItem>

                        <FormItem className="bg-input has-[:checked]:bg-primary/20 has-[:checked]:ring-primary w-full rounded-lg p-0 has-[:checked]:ring-1">
                          <FormControl>
                            <RadioGroupItem
                              hidden
                              value={ContentFrequency.GettingStarted}
                              className="peer"
                            />
                          </FormControl>
                          <FormLabel className="w-full bg-transparent px-4 py-3 focus-within:ring-0">
                            No, just getting started
                          </FormLabel>
                        </FormItem>

                        <FormItem className="bg-input has-[:checked]:bg-primary/20 has-[:checked]:ring-primary w-full rounded-lg p-0 has-[:checked]:ring-1">
                          <FormControl>
                            <RadioGroupItem
                              hidden
                              value={ContentFrequency.Never}
                              className="peer"
                            />
                          </FormControl>
                          <FormLabel className="w-full bg-transparent px-4 py-3 focus-within:ring-0">
                            Never created content before
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
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
