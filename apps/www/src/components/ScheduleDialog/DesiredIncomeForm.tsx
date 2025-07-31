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
import { DesiredIncome, scheduleMeetingAtom } from '@/lib/store';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

const schema = z.object({
  desiredIncome: z.nativeEnum(DesiredIncome),
});

interface DesiredIncomeFormProps {
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

export default function DesiredIncomeForm({
  goToNextStep,
  goToPreviousStep,
}: DesiredIncomeFormProps) {
  const [scheduleMeeting, setScheduleMeeting] = useAtom(scheduleMeetingAtom);
  const form = useForm({
    // @ts-expect-error -- Ignore type error
    resolver: zodResolver(schema),
    defaultValues: {
      desiredIncome: scheduleMeeting?.desiredIncome || undefined,
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    setScheduleMeeting((prev) => ({
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
            Desired monthly income in the next 3-6 months?
          </DialogTitle>
          <DialogDescription>
            This helps us understand your vision.
          </DialogDescription>
        </div>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="space-y-5">
            <FormField
              name="desiredIncome"
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
                              value={DesiredIncome.Low}
                              className="peer"
                              hidden
                            />
                          </FormControl>
                          <FormLabel className="w-full bg-transparent px-4 py-3 focus-within:ring-0">
                            {DesiredIncome.Low}
                          </FormLabel>
                        </FormItem>

                        <FormItem className="bg-input has-[:checked]:bg-primary/20 has-[:checked]:ring-primary w-full rounded-lg p-0 has-[:checked]:ring-1">
                          <FormControl>
                            <RadioGroupItem
                              hidden
                              value={DesiredIncome.Medium}
                              className="peer"
                            />
                          </FormControl>
                          <FormLabel className="w-full bg-transparent px-4 py-3 focus-within:ring-0">
                            {DesiredIncome.Medium}
                          </FormLabel>
                        </FormItem>

                        <FormItem className="bg-input has-[:checked]:bg-primary/20 has-[:checked]:ring-primary w-full rounded-lg p-0 has-[:checked]:ring-1">
                          <FormControl>
                            <RadioGroupItem
                              hidden
                              value={DesiredIncome.High}
                              className="peer"
                            />
                          </FormControl>
                          <FormLabel className="w-full bg-transparent px-4 py-3 focus-within:ring-0">
                            {DesiredIncome.High}
                          </FormLabel>
                        </FormItem>

                        <FormItem className="bg-input has-[:checked]:bg-primary/20 has-[:checked]:ring-primary w-full rounded-lg p-0 has-[:checked]:ring-1">
                          <FormControl>
                            <RadioGroupItem
                              hidden
                              value={DesiredIncome.VeryHigh}
                              className="peer"
                            />
                          </FormControl>
                          <FormLabel className="w-full bg-transparent px-4 py-3 focus-within:ring-0">
                            {DesiredIncome.VeryHigh}
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
