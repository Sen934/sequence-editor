import { z } from 'zod';
import {
  ApiErrorDataDtoSchema,
  ApiErrorDataSchema,
  CreateSequenceDtoSchema,
  SequenceDtoSchema,
} from './api.contracts.ts';

export type CreateSequenceDto = z.infer<typeof CreateSequenceDtoSchema>;
export type SequenceDto = z.infer<typeof SequenceDtoSchema>;

export type ApiErrorDataDto = z.infer<typeof ApiErrorDataDtoSchema>;
export type ApiErrorData = z.infer<typeof ApiErrorDataSchema>;
