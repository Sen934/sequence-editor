import type { SequenceStep } from '@/widgets/sequence-stepper/SequenceStepper.types.ts';
import type { ProgressBarStep } from '@/shared/ui/ProgressBar.types.ts';

const mapSequenceStepsToProgressBarSteps = (
  steps: SequenceStep[],
): ProgressBarStep[] =>
  steps.map(({ title, subTitle }) => ({
    title,
    subTitle,
  }));

export { mapSequenceStepsToProgressBarSteps };
