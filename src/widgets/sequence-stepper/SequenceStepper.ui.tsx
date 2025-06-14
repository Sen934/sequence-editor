import React from 'react';
import { ProgressBar } from '@/shared/ui/ProgressBar.ui.tsx';

const mockSteps = [
  {
    id: 'Name',
    title: 'Name & Product',
    subTitle: 'Provide sequence name & product',
  },
  {
    id: 'sequenceSteps',
    title: 'Sequence steps',
    subTitle: 'Create sequence steps for your sequence',
  },
  {
    id: 'Summary',
    title: 'Name & Product',
    subTitle: 'Summary of your sequence',
  },
];

const SequenceStepper: React.FC = () => {
  return (
    <div>
      <ProgressBar steps={mockSteps} currentStepIndex={1} />
    </div>
  );
};

export { SequenceStepper };
