import React from 'react';
import { ProgressBar } from '@/shared/ui/progress-bar.ui.tsx';
import { NameProductStep } from '@/features/create-sequence/ui/name-product.tsx';
import type {
  CreateSequenceForm,
  SequenceStep,
} from '@/features/create-sequence/create-sequence.types.ts';
import { mapSequenceStepsToProgressBarSteps } from '@/features/create-sequence/create-sequence.lib.ts';
import { useForm, FormProvider } from 'react-hook-form';
import { type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateSequenceFormSchema } from '@/features/create-sequence/create-sequence.contracts.ts';
import { SequenceStepsUi } from '@/features/create-sequence/ui/sequence-steps.ui.tsx';

const steps: SequenceStep[] = [
  {
    title: 'Name & Product',
    subTitle: 'Provide sequence name & product',
    component: NameProductStep,
  },
  {
    title: 'Sequence steps',
    subTitle: 'Create sequence steps for your sequence',
    component: SequenceStepsUi,
  },
  {
    title: 'Summary',
    subTitle: 'Summary of your sequence',
    component: () => <></>,
  },
];

const progressBarSteps = mapSequenceStepsToProgressBarSteps(steps);

const CreateSequence: React.FC = () => {
  // TODO: Set 0
  const [currentStep, setCurrentStep] = React.useState<number>(1);
  const methods = useForm<CreateSequenceForm>({
    mode: 'onTouched',
    resolver: zodResolver(CreateSequenceFormSchema),
    defaultValues: {
      name: '',
      productId: '',
      steps: [{ subject: '', content: '' }],
    },
  });

  const onSubmit: SubmitHandler<CreateSequenceForm> = (data) =>
    console.log(data);

  const StepComponent = steps[currentStep]?.component;

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-8 justify-center"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <ProgressBar steps={progressBarSteps} currentStepIndex={currentStep} />
        <StepComponent
          onNext={
            currentStep < steps.length - 1
              ? () => setCurrentStep((prev) => prev + 1)
              : undefined
          }
          onPrev={
            currentStep > 0
              ? () => setCurrentStep((prev) => prev - 1)
              : undefined
          }
        />
      </form>
    </FormProvider>
  );
};

export { CreateSequence };
