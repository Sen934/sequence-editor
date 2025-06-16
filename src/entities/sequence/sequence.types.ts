import { z } from 'zod';
import { SequenceSchema } from '@/entities/sequence/sequence.contracts.ts';

export type Sequence = z.infer<typeof SequenceSchema>;
