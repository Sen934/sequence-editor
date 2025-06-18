import { describe } from 'vitest';
import { render, within } from '@testing-library/react';
import { CreateSequence } from '@/features/create-sequence/ui/create-sequence.ui.tsx';
import userEvent from '@testing-library/user-event';

describe('NameProductStep', () => {
  it('should get to the "Sequence steps" step', async () => {
    const $ = render(<CreateSequence />);
    // Name step
    const productIdInput = $.getByTestId('product-id-input');
    const nameInput = $.getByTestId('name-input');
    await userEvent.type(productIdInput, 'product');
    await userEvent.type(nameInput, 'name');
    const button = $.getByRole('button', { name: /next/i });
    await userEvent.click(button);

    const progressBar = $.getByTestId('progress-bar');

    const progressBarStepTitle =
      within(progressBar).getByText('Sequence steps');

    expect(progressBarStepTitle).toHaveAttribute('data-is-current', 'true');
  });
});
