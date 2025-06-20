import { z } from 'zod';

const CreateSequenceStepSchema = z.object({
  subject: z.string().optional(),
  content: z.string().min(1, 'Content should contain at least 1 letter'),
});

export const CreateSequenceFormSchema = z.object({
  name: z.string().min(1, 'Sequence name should contain at least 1 letter'),
  productId: z
    .string()
    .min(1, 'Sequence product id should contain at least 1 letter'),
  steps: z.array(CreateSequenceStepSchema).refine(
    (steps) => {
      const first = steps[0];

      return first.subject && first.subject.length > 0;
    },
    {
      message: 'Initial email must have subject',
      path: ['0.subject'],
    },
  ),
});
