import React from 'react';
import { ProgressBar } from '@/shared/ui/ProgressBar.ui.tsx';
import { NameProductStep } from '@/widgets/sequence-stepper/ui/NameProductStep.ui.tsx';
import type { SequenceStep } from '@/widgets/sequence-stepper/SequenceStepper.types.ts';
import { mapSequenceStepsToProgressBarSteps } from '@/widgets/sequence-stepper/SequenceStepper.lib.ts';

const steps: SequenceStep[] = [
  {
    title: 'Name & Product',
    subTitle: 'Provide sequence name & product',
    component: NameProductStep,
  },
  {
    title: 'Sequence steps',
    subTitle: 'Create sequence steps for your sequence',
    component: () => <></>,
  },
  {
    title: 'Summary',
    subTitle: 'Summary of your sequence',
    component: () => <></>,
  },
];

const progressBarSteps = mapSequenceStepsToProgressBarSteps(steps);

const SequenceStepper: React.FC = () => {
  const [currentStep, setCurrentStep] = React.useState<0 | 1 | 2>(0);

  const StepComponent = steps[currentStep].component;

  return (
    <div>
      <ProgressBar steps={progressBarSteps} currentStepIndex={1} />
      <StepComponent />
    </div>
  );
};

export { SequenceStepper };
