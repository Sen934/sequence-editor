import React from 'react';
import { ProgressBar } from '@/shared/ui/ProgressBar.ui.tsx';
import { NameProductStep } from '@/features/create-sequence/ui/NameProductStep.ui.tsx';
import type {
  CreateSequence,
  SequenceStep,
} from '@/features/create-sequence/create-sequence.types.ts';
import { mapSequenceStepsToProgressBarSteps } from '@/features/create-sequence/create-sequence.lib.ts';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateSequenceSchema } from '@/features/create-sequence/create-sequence.contracts.ts';

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
  const [currentStep, setCurrentStep] = React.useState<number>(0);
  const { handleSubmit } = useForm<CreateSequence>({
    mode: 'onTouched',
    resolver: zodResolver(CreateSequenceSchema),
    defaultValues: { name: '', productId: '', steps: [] },
  });

  const onSubmit: SubmitHandler<CreateSequence> = (data) => console.log(data);

  const StepComponent = steps[currentStep]?.component;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ProgressBar steps={progressBarSteps} currentStepIndex={1} />
      <StepComponent onNext={() => setCurrentStep((prev) => prev + 1)} />
    </form>
  );
};

export { SequenceStepper };
