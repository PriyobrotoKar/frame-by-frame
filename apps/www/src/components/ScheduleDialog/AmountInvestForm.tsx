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
import { AmountToInvest, scheduleMeetingAtom } from '@/lib/store';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

const schema = z.object({
  amountToInvest: z.nativeEnum(AmountToInvest),
});

interface AmountInvestFormProps {
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

export default function AmountInvestForm({
  goToNextStep,
  goToPreviousStep,
}: AmountInvestFormProps) {
  const [scheduleMeeting, setScheduleMeeting] = useAtom(scheduleMeetingAtom);

  const form = useForm({
    // @ts-expect-error -- Ignore type error for now
    resolver: zodResolver(schema),
    defaultValues: {
      amountToInvest: scheduleMeeting?.amountToInvest || undefined,
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
          <DialogTitle>What if we fail to deliver?</DialogTitle>
          <DialogDescription>
            A 100% refund, $1K in cash and a free pizza delivered to your
            doorstep. With this guarantee in place, how much would you be
            willing to invest in this solution?
          </DialogDescription>
        </div>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="space-y-5">
            <FormField
              name="amountToInvest"
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
                              value="$0"
                              className="peer"
                              hidden
                            />
                          </FormControl>
                          <FormLabel className="w-full bg-transparent px-4 py-3 focus-within:ring-0">
                            $0
                          </FormLabel>
                        </FormItem>

                        <FormItem className="bg-input has-[:checked]:bg-primary/20 has-[:checked]:ring-primary w-full rounded-lg p-0 has-[:checked]:ring-1">
                          <FormControl>
                            <RadioGroupItem
                              hidden
                              value="$1000-$2500"
                              className="peer"
                            />
                          </FormControl>
                          <FormLabel className="w-full bg-transparent px-4 py-3 focus-within:ring-0">
                            $1000-$2500
                          </FormLabel>
                        </FormItem>

                        <FormItem className="bg-input has-[:checked]:bg-primary/20 has-[:checked]:ring-primary w-full rounded-lg p-0 has-[:checked]:ring-1">
                          <FormControl>
                            <RadioGroupItem
                              hidden
                              value="$2500-$5000"
                              className="peer"
                            />
                          </FormControl>
                          <FormLabel className="w-full bg-transparent px-4 py-3 focus-within:ring-0">
                            $2500-$5000
                          </FormLabel>
                        </FormItem>

                        <FormItem className="bg-input has-[:checked]:bg-primary/20 has-[:checked]:ring-primary w-full rounded-lg p-0 has-[:checked]:ring-1">
                          <FormControl>
                            <RadioGroupItem
                              hidden
                              value="$5000-$7500"
                              className="peer"
                            />
                          </FormControl>
                          <FormLabel className="w-full bg-transparent px-4 py-3 focus-within:ring-0">
                            $5000-$7500
                          </FormLabel>
                        </FormItem>

                        <FormItem className="bg-input has-[:checked]:bg-primary/20 has-[:checked]:ring-primary w-full rounded-lg p-0 has-[:checked]:ring-1">
                          <FormControl>
                            <RadioGroupItem
                              hidden
                              value="$10000+"
                              className="peer"
                            />
                          </FormControl>
                          <FormLabel className="w-full bg-transparent px-4 py-3 focus-within:ring-0">
                            $10000+
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
              Schedule a call
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}
