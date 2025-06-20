import { describe, expect } from 'vitest';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateSequenceFormSchema } from '@/features/create-sequence/create-sequence.contracts.ts';
import { SequenceStepsUi } from '@/features/create-sequence/ui/sequence-steps.ui.tsx';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const SequenceStepsWithFormProvider: React.FC<{
  onNext?: () => void;
  onPrev?: () => void;
}> = ({ onNext }) => {
  const methods = useForm({
    resolver: zodResolver(CreateSequenceFormSchema),
    defaultValues: {
      name: '',
      productId: '',
      steps: [{ subject: '', content: '' }],
    },
  });

  return (
    <FormProvider {...methods}>
      <SequenceStepsUi onNext={onNext} />
    </FormProvider>
  );
};

const fillStep = async (
  index: number,
  { subject = '', content = '' }: { subject?: string; content?: string },
) => {
  const step = screen.getByTestId(`sequence-steps-form-step-${index}`);
  const subjectInput = within(
    screen.getByTestId(`sequence-steps-form-step-${index}-subject`),
  ).getByRole('textbox');

  const contentInput = within(step).getByTestId(`react-quill-mock`);

  if (subject) {
    await userEvent.type(subjectInput, subject);
  }

  if (content) {
    await userEvent.type(contentInput, content);
  }
};

describe('SequenceSteps', () => {
  it('Should render first step as initial email', () => {
    const $ = render(<SequenceStepsWithFormProvider />);

    const title = $.getByTestId('sequence-steps-form-step-0-title');

    expect(title).toHaveTextContent(/Initial email/gi);
  });

  it('Should not proceed without subject for initial email', async () => {
    const onNextMock = vi.fn();
    const $ = render(<SequenceStepsWithFormProvider onNext={onNextMock} />);
    const addNewStepButton = $.getByTestId('add-new-step-button');

    await fillStep(0, { content: 'content' });

    await userEvent.click(addNewStepButton);

    expect(
      $.queryByTestId(`sequence-steps-form-step-1`),
    ).not.toBeInTheDocument();

    const next = $.getByRole('button', { name: /next/i });

    await userEvent.click(next);

    expect(onNextMock).toHaveBeenCalledTimes(0);
  });

  it('Can skip entering subject for second step', async () => {
    const onNextMock = vi.fn();
    const $ = render(<SequenceStepsWithFormProvider onNext={onNextMock} />);

    await fillStep(0, { subject: 'someSubject', content: 'content' });
    const addNewStepButton = $.getByTestId('add-new-step-button');

    await userEvent.click(addNewStepButton);

    await fillStep(1, { subject: '', content: 'content' });

    const next = $.getByRole('button', { name: /next/i });

    await userEvent.click(next);

    expect(onNextMock).toHaveBeenCalledTimes(1);
  });

  it('Should create multiple steps', async () => {
    const $ = render(<SequenceStepsWithFormProvider />);

    await fillStep(0, { subject: 'someSubject', content: 'content' });
    const addNewStepButton = $.getByTestId('add-new-step-button');

    await userEvent.click(addNewStepButton);

    await fillStep(1, { subject: '', content: 'content' });
    await userEvent.click(addNewStepButton);

    await fillStep(2, { subject: 'someSubject', content: 'content' });
    await userEvent.click(addNewStepButton);

    await fillStep(3, { subject: '', content: 'content' });

    expect($.queryAllByTestId(/^sequence-steps-form-step-\d+$/)).toHaveLength(
      4,
    );
  });
});
