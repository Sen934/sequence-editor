import type {
  CreateSequenceForm,
  StepComponent,
} from '@/features/create-sequence/create-sequence.types.ts';
import { useFormContext } from 'react-hook-form';

const Summary: StepComponent = ({ onPrev }) => {
  const { watch } = useFormContext<CreateSequenceForm>();

  const [name, productId, steps] = watch(['name', 'productId', 'steps']);

  return (
    <>
      <div className="border-b border-gray-200 flex justify-between items-center">
        <div className="mb-6">
          <h2
            className="text-lg font-semibold text-gray-900"
            data-testid="sequence-summary-title"
          >
            Sequence Summary
          </h2>
          <p className="text-sm text-gray-500">Summary of your sequence</p>
        </div>

        <div className="flex justify-between gap-2">
          <button
            className="px-4 h-8 border border-gray-300 text-gray-800 font-medium rounded-md hover:bg-gray-100 transition cursor-pointer"
            onClick={onPrev}
          >
            Previous
          </button>
          <button
            className="px-4 h-8 rounded-md bg-violet-600 text-white font-medium hover:bg-violet-700 transition cursor-pointer"
            type="submit"
          >
            Submit
          </button>
        </div>
      </div>

      <div
        className="flex gap-4 items-center"
        data-testid="summary-sequence-name"
      >
        <h4 className="font-medium text-sm text-gray-700">Name:</h4>
        <span>{name}</span>
      </div>

      <div
        className="flex gap-4 items-center"
        data-testid="summary-sequence-product-id"
      >
        <h4 className="font-medium text-sm text-gray-700">Product Id:</h4>
        <span>{productId}</span>
      </div>

      <div className="flex gap-8">
        <h4 className="font-medium text-sm text-gray-700">
          Sequence steps and details
        </h4>

        <div className="flex flex-wrap gap-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="space-y-2"
              data-testid={`summary-sequence-step-${index}`}
            >
              <div className="flex justify-between items-center font-medium text-sm text-gray-900">
                <span>Step - {index}</span>
              </div>
              <div className="text-sm text-gray-700">
                <p>Subject: {step.subject}</p>
                <p>Content: {step.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export { Summary };
