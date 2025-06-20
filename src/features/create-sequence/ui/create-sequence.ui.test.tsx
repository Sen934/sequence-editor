import { describe } from 'vitest';
import { render, within, screen } from '@testing-library/react';
import { CreateSequence } from '@/features/create-sequence/ui/create-sequence.ui.tsx';
import userEvent from '@testing-library/user-event';

const goThroughNameProductStep = async ({
  name = 'name',
  productId = 'productId',
}: {
  name?: string;
  productId?: string;
} = {}) => {
  const productIdInput = within(screen.getByTestId('product-id')).getByRole(
    'textbox',
  );
  const nameInput = within(screen.getByTestId('name')).getByRole('textbox');
  await userEvent.type(productIdInput, productId);
  await userEvent.type(nameInput, name);
  const button = screen.getByRole('button', { name: /next/i });
  await userEvent.click(button);

  const sequenceStepsForm = screen.getByTestId('sequence-steps-form');

  expect(sequenceStepsForm).toHaveTextContent(/Sequence steps/gi);
};

const goThroughSequenceStepForm = async ({
  subject = 'subject',
  content = 'content',
}: {
  subject?: string;
  content?: string;
} = {}) => {
  const step = screen.getByTestId(`sequence-steps-form-step-0`);
  const subjectInput = within(
    screen.getByTestId(`sequence-steps-form-step-0-subject`),
  ).getByRole('textbox');

  const contentInput = within(step).getByTestId(`react-quill-mock`);

  await userEvent.type(subjectInput, subject);

  await userEvent.type(contentInput, content);

  const button = screen.getByRole('button', { name: /next/i });
  await userEvent.click(button);
};

describe('CreateSequence', () => {
  it('should get to the "Sequence steps" step', async () => {
    const $ = render(<CreateSequence />);

    await goThroughNameProductStep();

    const progressBar = $.getByTestId('progress-bar');

    const progressBarStepTitle =
      within(progressBar).getByText('Sequence steps');

    expect(progressBarStepTitle).toHaveAttribute('data-is-current', 'true');
  });

  it('should be able to go back to "NameProduct" step from "Sequence steps"', async () => {
    const $ = render(<CreateSequence />);

    await goThroughNameProductStep();

    const button = screen.getByRole('button', { name: /prev/i });
    await userEvent.click(button);

    expect($.getByTestId('name-product-form')).toHaveTextContent(
      /Name & Product/gi,
    );
  });

  it('Summary page should reflect entered data', async () => {
    const $ = render(<CreateSequence />);

    await goThroughNameProductStep({
      name: 'mySequenceName',
      productId: 'myProductId',
    });
    await goThroughSequenceStepForm({
      subject: 'MySequenceStepSubject',
      content: 'MySequenceStepContent',
    });

    expect($.getByTestId(`summary-sequence-step-0`)).toHaveTextContent(
      /MySequenceStepSubject/g,
    );
    expect($.getByTestId(`summary-sequence-step-0`)).toHaveTextContent(
      /MySequenceStepContent/g,
    );

    expect($.getByTestId(`summary-sequence-name`)).toHaveTextContent(
      /mySequenceName/g,
    );

    expect($.getByTestId(`summary-sequence-product-id`)).toHaveTextContent(
      /myProductId/g,
    );
  });
});
