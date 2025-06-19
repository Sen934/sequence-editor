import React from 'react';
import { CreateSequenceFormSchema } from '@/features/create-sequence/create-sequence.contracts.ts';
import { z } from 'zod';

type StepComponentProps = {
  onNext?: () => void;
  onPrev?: () => void;
};

type StepComponent = React.FC<StepComponentProps>;

type SequenceStep = {
  title: string;
  subTitle: string;
  component: StepComponent;
};

type CreateSequenceForm = z.infer<typeof CreateSequenceFormSchema>;

export type { SequenceStep, StepComponent, CreateSequenceForm };
