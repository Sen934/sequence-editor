import { describe } from 'vitest';
import { render, within, screen } from '@testing-library/react';
import { CreateSequence } from '@/features/create-sequence/ui/create-sequence.ui.tsx';
import userEvent from '@testing-library/user-event';

const fillNameProductStep = async () => {
  const productIdInput = within(screen.getByTestId('product-id')).getByRole(
    'textbox',
  );
  const nameInput = within(screen.getByTestId('name')).getByRole('textbox');
  await userEvent.type(productIdInput, 'product');
  await userEvent.type(nameInput, 'name');
  const button = screen.getByRole('button', { name: /next/i });
  await userEvent.click(button);

  const sequenceStepsForm = screen.getByTestId('sequence-steps-form');

  expect(sequenceStepsForm).toHaveTextContent(/Sequence steps/gi);
};

describe('CreateSequence', () => {
  it('should get to the "Sequence steps" step', async () => {
    const $ = render(<CreateSequence />);

    await fillNameProductStep();

    const progressBar = $.getByTestId('progress-bar');

    const progressBarStepTitle =
      within(progressBar).getByText('Sequence steps');

    expect(progressBarStepTitle).toHaveAttribute('data-is-current', 'true');
  });

  it('should be able to go back to "NameProduct" step from "Sequence steps"', async () => {
    const $ = render(<CreateSequence />);

    await fillNameProductStep();

    const button = screen.getByRole('button', { name: /prev/i });
    await userEvent.click(button);

    expect($.getByTestId('name-product-form')).toHaveTextContent(
      /Name & Product/gi,
    );
  });
});
