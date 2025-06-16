import type { SequenceDto } from '@/shared/api/api.types.ts';
import type { Sequence } from '@/entities/sequence/sequence.types.ts';

export function transformSequenceDtoToSequence(
  sequenceDto: SequenceDto,
): Sequence {
  return {
    ...sequenceDto.sequence,
    productId: sequenceDto.sequence.product,
  };
}
