import type {
  CreateSequence,
  SequenceStep,
} from '@/features/create-sequence/create-sequence.types.ts';
import type { ProgressBarStep } from '@/shared/ui/progress-bar.types.ts';
import type { CreateSequenceDto } from '@/shared/api/api.types.ts';

const mapSequenceStepsToProgressBarSteps = (
  steps: SequenceStep[],
): ProgressBarStep[] =>
  steps.map(({ title, subTitle }) => ({
    title,
    subTitle,
  }));

const transformCreateSequenceToCreateSequenceDto = (
  createSequence: CreateSequence,
): CreateSequenceDto => ({ sequence: createSequence });

export {
  mapSequenceStepsToProgressBarSteps,
  transformCreateSequenceToCreateSequenceDto,
};
