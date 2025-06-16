import React from 'react';

type StepComponent = React.FC<unknown>;

type SequenceStep = {
  title: string;
  subTitle: string;
  component: StepComponent;
};

export type { SequenceStep, StepComponent };
