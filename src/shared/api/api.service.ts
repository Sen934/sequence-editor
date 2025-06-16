import { api } from './api.instance.ts';
import type { AxiosRequestConfig } from 'axios';
import { responseContract } from './api.lib.ts';
import type { CreateSequenceDto } from '@/shared/api/api.types.ts';
import {
  CreateSequenceDtoSchema,
  SequenceDtoSchema,
} from '@/shared/api/api.contracts.ts';

export function createSequence(
  createSequenceDto: CreateSequenceDto,
  config?: AxiosRequestConfig<CreateSequenceDto>,
) {
  const data = CreateSequenceDtoSchema.parse(createSequenceDto);
  return api
    .post('/sequence/new', data, config)
    .then(responseContract(SequenceDtoSchema));
}
