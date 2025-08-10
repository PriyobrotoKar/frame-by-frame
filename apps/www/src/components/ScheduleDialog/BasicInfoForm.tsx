import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Instagram, MailIcon, UserIcon } from 'lucide-react';
import Image from 'next/image';
import { useAtom } from 'jotai';
import { scheduleMeetingAtom } from '@/lib/store';
import { getContact } from '@/app/actions/contact';

const schema = z.object({
  name: z.string().min(2).max(100),
  instagram: z.string().min(2).max(100),
  email: z.string().email(),
});

interface BasicInfoFormProps {
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  setIsAlreadyContacted: (value: boolean) => void;
}

export default function BasicInfoForm({
  goToNextStep,
  setIsAlreadyContacted,
}: BasicInfoFormProps) {
  const [scheduleMeeting, setScheduleMeeting] = useAtom(scheduleMeetingAtom);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: scheduleMeeting?.name || '',
      instagram: scheduleMeeting?.instagram || '',
      email: scheduleMeeting?.email || '',
    },
  });

  async function fetchContact() {
    if (!scheduleMeeting?.email) return;

    try {
      const res = await getContact(scheduleMeeting.email);
      if (res.data) {
        setIsAlreadyContacted(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = form.handleSubmit(async (data) => {
    await fetchContact();
    setScheduleMeeting((prev) => ({
      ...prev,
      ...data,
    }));
    goToNextStep();
  });

  return (
    <div className="space-y-4 md:space-y-10">
      <DialogHeader className="md:gap-10">
        <div className="space-y-2 text-center">
          <div>
            <Image
              src={'/logo.svg'}
              alt="Logo"
              className="mx-auto w-24 md:w-32"
              width={150}
              height={80}
            />
          </div>
          <p>Grow on socials & print money on autopilot.</p>
        </div>
        <div className="space-y-3">
          <DialogTitle>
            To help us <span className="text-secondary">tailor</span> to your
            needs.
          </DialogTitle>
          <DialogDescription>
            Enter your name, Instagram username & email to help us stay in touch
            and communicate.
          </DialogDescription>
        </div>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-10">
          <div className="space-y-5">
            <FormField
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>
                      <UserIcon />
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Joshua Brown" />
                    </FormControl>
                  </FormItem>
                );
              }}
            />

            <FormField
              name="instagram"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>
                      <Instagram />
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="joshua" />
                    </FormControl>
                  </FormItem>
                );
              }}
            />

            <FormField
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>
                      <MailIcon />
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="joshua@example.com" />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" size={'sm'} variant={'ghost'}>
                Go Back
              </Button>
            </DialogClose>

            <Button type="submit" size={'sm'}>
              Continue
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}
