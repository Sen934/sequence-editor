import { describe, expect } from 'vitest';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateSequenceFormSchema } from '@/features/create-sequence/create-sequence.contracts.ts';
import { SequenceSteps } from '@/features/create-sequence/ui/sequence-steps.tsx';
import { render } from '@testing-library/react';

const SequenceStepsWithFormProvider: React.FC<{
  onNext?: () => void;
  onPrev?: () => void;
}> = ({ onNext }) => {
  const methods = useForm({
    resolver: zodResolver(CreateSequenceFormSchema),
    defaultValues: {
      name: '',
      productId: '',
      steps: [{ subject: '', content: '', daysToWait: 0 }],
    },
  });

  return (
    <FormProvider {...methods}>
      <SequenceSteps onNext={onNext} />
    </FormProvider>
  );
};

describe('SequenceSteps', () => {
  it('Should render first step as initial email', () => {
    const $ = render(<SequenceStepsWithFormProvider />);

    const title = $.getByTestId('sequence-steps-form-step-0-title');

    expect(title).toHaveTextContent(/Initial email/gi);
  });
});
