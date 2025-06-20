import {
  type DefaultError,
  useMutation,
  type UseMutationOptions,
} from '@tanstack/react-query';
import { queryClient } from '@/shared/queryClient';
import { transformCreateSequenceToCreateSequenceDto } from '@/features/create-sequence/create-sequence.lib.ts';
import type { CreateSequenceForm } from '@/features/create-sequence/create-sequence.types.ts';
import type { Sequence } from '@/entities/sequence/sequence.types.ts';
import { createSequence } from '@/shared/api/api.service.ts';
import { transformSequenceDtoToSequence } from '@/entities/sequence/sequence.lib.ts';

export function useCreateSequenceMutation(
  options: Pick<
    UseMutationOptions<Sequence, DefaultError, CreateSequenceForm, unknown>,
    'mutationKey' | 'onMutate' | 'onSuccess' | 'onError' | 'onSettled'
  > = {},
) {
  const { mutationKey = [], onMutate, onSuccess, onError, onSettled } = options;

  return useMutation({
    mutationKey: ['sequence', 'create', ...mutationKey],

    mutationFn: async (createSequenceData: CreateSequenceForm) => {
      const createSequenceDto =
        transformCreateSequenceToCreateSequenceDto(createSequenceData);
      const { data } = await createSequence(createSequenceDto);
      return transformSequenceDtoToSequence(data);
    },

    onMutate,

    onSuccess: async (data, variables, context) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['SOME_SEQUENCES_KEY'],
        }),
        onSuccess?.(data, variables, context),
      ]);
    },

    onError,

    onSettled,
  });
}
