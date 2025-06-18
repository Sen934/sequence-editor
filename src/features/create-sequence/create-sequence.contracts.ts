import { z } from 'zod';

const CreateSequenceStepSchema = z.object({
  subject: z.string().min(1, 'Subject should contain at least 1 letter'),
  content: z.string().min(1, 'Subject should contain at least 1 letter'),
});

export const CreateSequenceFormSchema = z.object({
  name: z.string().min(1, 'Sequence name should contain at least 1 letter'),
  productId: z
    .string()
    .min(1, 'Sequence product id should contain at least 1 letter'),
  steps: z.array(CreateSequenceStepSchema),
});
