import type {
  CreateSequenceForm,
  StepComponent,
} from '@/features/create-sequence/create-sequence.types.ts';
import { useFormContext } from 'react-hook-form';
import { FormInput } from '@/shared/ui/form-input.ui.tsx';

const NameProductStep: StepComponent = ({ onNext }) => {
  const { trigger } = useFormContext<CreateSequenceForm>();

  const handleNext = async () => {
    const isValid = await trigger(['name', 'productId']);

    if (isValid) {
      onNext();
    }
  };

  return (
    <>
      <div className="border-bottom flex justify-between items-center">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Sequence steps
          </h2>
          <p className="text-sm text-gray-500">
            Create steps for your sequence
          </p>
        </div>

        <button
          onClick={handleNext}
          className="px-4 h-8 rounded-md bg-violet-600 text-white font-medium hover:bg-violet-700 transition cursor-pointer"
        >
          Next
        </button>
      </div>
      <div className="border border-gray-200 rounded-lg px-4 py-5">
        <FormInput<CreateSequenceForm>
          namePath="name"
          label="Name"
          data-testid="name-input"
        />
        <FormInput<CreateSequenceForm>
          namePath="productId"
          label="Product id"
          data-testid="product-id-input"
        />
      </div>
    </>
  );
};

export { NameProductStep };
