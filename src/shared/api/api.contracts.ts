import { z } from 'zod';

export const CreateSequenceDtoSchema = z.object({
  sequence: z.object({
    name: z.string(),
    productId: z.string(),
    step: z.array(
      z.object({
        subject: z.string(),
        content: z.string(),
      }),
    ),
  }),
});

export const SequenceDtoSchema = z.object({
  sequence: z.object({
    id: z.string(),
    name: z.string(),
    product: z.string(),
    step: z.array(
      z.object({
        subject: z.string(),
        content: z.string(),
      }),
    ),
  }),
});

export const ApiErrorDataDtoSchema = z.object({
  errors: z.record(z.string(), z.array(z.string())),
});

export const ApiErrorDataSchema = z.array(z.string());
