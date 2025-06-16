import React from 'react';
import { CreateSequenceSchema } from '@/features/create-sequence/create-sequence.contracts.ts';
import { z } from 'zod';

type StepComponentProps = {
  onNext: () => void;
};

type StepComponent = React.FC<StepComponentProps>;

type SequenceStep = {
  title: string;
  subTitle: string;
  component: StepComponent;
};

type CreateSequence = z.infer<typeof CreateSequenceSchema>;

export type { SequenceStep, StepComponent, CreateSequence };
