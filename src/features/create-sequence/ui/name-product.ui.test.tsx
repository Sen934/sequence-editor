import { render } from '@testing-library/react';
import { NameProductStep } from '@/features/create-sequence/ui/name-product.tsx';
import userEvent from '@testing-library/user-event';
import { expect, vi } from 'vitest';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateSequenceFormSchema } from '@/features/create-sequence/create-sequence.contracts.ts';

const NameProductStepWithFormProvider: React.FC<{ onNext: () => void }> = ({
  onNext,
}) => {
  const methods = useForm({
    resolver: zodResolver(CreateSequenceFormSchema),
    defaultValues: { name: '', productId: '' },
  });

  return (
    <FormProvider {...methods}>
      <NameProductStep onNext={onNext} />
    </FormProvider>
  );
};

describe('NameProductStep', () => {
  it('Renders name and product id inputs', () => {
    const mockOnNext = vi.fn();
    const $ = render(<NameProductStepWithFormProvider onNext={mockOnNext} />);

    expect($.getByTestId('name-input')).toBeInTheDocument();
    expect($.getByTestId('product-id-input')).toBeInTheDocument();
  });

  it('Should not go to the next step without name and product id', async () => {
    const mockOnNext = vi.fn();
    const $ = render(<NameProductStepWithFormProvider onNext={mockOnNext} />);

    const button = $.getByRole('button', { name: /next/i });

    await userEvent.click(button);

    expect(mockOnNext).toHaveBeenCalledTimes(0);
  });

  it('Should not go to the next step without name', async () => {
    const mockOnNext = vi.fn();
    const $ = render(<NameProductStepWithFormProvider onNext={mockOnNext} />);
    const productIdInput = $.getByTestId('product-id-input');
    await userEvent.type(productIdInput, 'product');

    const button = $.getByRole('button', { name: /next/i });

    await userEvent.click(button);

    expect(mockOnNext).toHaveBeenCalledTimes(0);
  });

  it('Should not go to the next step without product id', async () => {
    const mockOnNext = vi.fn();
    const $ = render(<NameProductStepWithFormProvider onNext={mockOnNext} />);
    const productIdInput = $.getByTestId('name-input');
    await userEvent.type(productIdInput, 'name');

    const button = $.getByRole('button', { name: /next/i });

    await userEvent.click(button);

    expect(mockOnNext).toHaveBeenCalledTimes(0);
  });

  it('Should not go to the next step', async () => {
    const mockOnNext = vi.fn();
    const $ = render(<NameProductStepWithFormProvider onNext={mockOnNext} />);
    const productIdInput = $.getByTestId('name-input');
    await userEvent.type(productIdInput, 'name');

    const button = $.getByRole('button', { name: /next/i });

    await userEvent.click(button);

    expect(mockOnNext).toHaveBeenCalledTimes(0);
  });
});
