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
import { CurrentIncome, scheduleMeetingAtom } from '@/lib/store';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

const schema = z.object({
  currentIncome: z.nativeEnum(CurrentIncome),
});

interface CurrentIncomeFormProps {
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

export default function CurrentIncomeForm({
  goToNextStep,
  goToPreviousStep,
}: CurrentIncomeFormProps) {
  const [scheduleMeeting, setScheduleMeeting] = useAtom(scheduleMeetingAtom);
  const form = useForm({
    // @ts-expect-error -- Ignore type error for now
    resolver: zodResolver(schema),
    defaultValues: {
      currentIncome: scheduleMeeting?.currentIncome ?? undefined,
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
            How much revenue is your current business generating?
          </DialogTitle>
          <DialogDescription>
            This helps us understand your current situation.
          </DialogDescription>
        </div>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="space-y-5">
            <FormField
              name="currentIncome"
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
                              value={CurrentIncome.VeryLow}
                              className="peer"
                              hidden
                            />
                          </FormControl>
                          <FormLabel className="w-full bg-transparent px-4 py-3 focus-within:ring-0">
                            {CurrentIncome.VeryLow}
                          </FormLabel>
                        </FormItem>

                        <FormItem className="bg-input has-[:checked]:bg-primary/20 has-[:checked]:ring-primary w-full rounded-lg p-0 has-[:checked]:ring-1">
                          <FormControl>
                            <RadioGroupItem
                              hidden
                              value={CurrentIncome.Low}
                              className="peer"
                            />
                          </FormControl>
                          <FormLabel className="w-full bg-transparent px-4 py-3 focus-within:ring-0">
                            {CurrentIncome.Low}
                          </FormLabel>
                        </FormItem>

                        <FormItem className="bg-input has-[:checked]:bg-primary/20 has-[:checked]:ring-primary w-full rounded-lg p-0 has-[:checked]:ring-1">
                          <FormControl>
                            <RadioGroupItem
                              hidden
                              value={CurrentIncome.Medium}
                              className="peer"
                            />
                          </FormControl>
                          <FormLabel className="w-full bg-transparent px-4 py-3 focus-within:ring-0">
                            {CurrentIncome.Medium}
                          </FormLabel>
                        </FormItem>

                        <FormItem className="bg-input has-[:checked]:bg-primary/20 has-[:checked]:ring-primary w-full rounded-lg p-0 has-[:checked]:ring-1">
                          <FormControl>
                            <RadioGroupItem
                              hidden
                              value={CurrentIncome.High}
                              className="peer"
                            />
                          </FormControl>
                          <FormLabel className="w-full bg-transparent px-4 py-3 focus-within:ring-0">
                            {CurrentIncome.High}
                          </FormLabel>
                        </FormItem>

                        <FormItem className="bg-input has-[:checked]:bg-primary/20 has-[:checked]:ring-primary w-full rounded-lg p-0 has-[:checked]:ring-1">
                          <FormControl>
                            <RadioGroupItem
                              hidden
                              value={CurrentIncome.VeryHigh}
                              className="peer"
                            />
                          </FormControl>
                          <FormLabel className="w-full bg-transparent px-4 py-3 focus-within:ring-0">
                            {CurrentIncome.VeryHigh}
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
