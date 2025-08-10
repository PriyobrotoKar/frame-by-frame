import { z } from 'zod';

export const waitlistFormSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
});

export type WaitlistForm = z.infer<typeof waitlistFormSchema>;
