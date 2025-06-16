import { z } from 'zod';

const SequenceStepSchema = z.object({
  subject: z.string(),
  content: z.string(),
});

export const SequenceSchema = z.object({
  id: z.string(),
  name: z.string(),
  productId: z.string(),
  step: z.array(SequenceStepSchema),
});
