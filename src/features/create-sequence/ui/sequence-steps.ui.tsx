import type {
  CreateSequenceForm,
  StepComponent,
} from '@/features/create-sequence/create-sequence.types.ts';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { ReactComponent as MailIcon } from '@/shared/assets/mail.svg';
import { FormInput } from '@/shared/ui/form-input.ui.tsx';
import { RichTextEditor } from '@/shared/ui/rich-text-editor.ui.tsx';

const SequenceStepsUi: StepComponent = ({ onNext, onPrev }) => {
  const { trigger } = useFormContext<CreateSequenceForm>();

  const { fields, append } = useFieldArray<CreateSequenceForm>({
    name: 'steps',
  });

  const handleNext = async () => {
    const isValid = await trigger(['steps']);

    if (isValid && onNext) {
      onNext?.();
    }
  };

  const handleAddNextStep = async () => {
    const isValid = await trigger(['steps']);

    if (isValid) {
      append({ subject: '', content: '' });
    }
  };

  return (
    <>
      <div
        className="border-b border-gray-200 flex justify-between items-center"
        data-testid="sequence-steps-form"
      >
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Sequence steps
          </h2>
          <p className="text-sm text-gray-500">
            Create steps for your sequence
          </p>
        </div>

        <div className="flex justify-between gap-2">
          <button
            className="px-4 h-8 border border-gray-300 text-gray-800 font-medium rounded-md hover:bg-gray-100 transition cursor-pointer"
            onClick={onPrev}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="px-4 h-8 rounded-md bg-violet-600 text-white font-medium hover:bg-violet-700 transition cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
      {fields.map((stepField, index) => {
        const isInitialStep = index === 0;

        return (
          <section
            key={stepField.id}
            className="border border-gray-200 rounded-lg"
            data-testid={`sequence-steps-form-step-${index}`}
          >
            <header className="flex justify-between px-4 py-5 border-b border-gray-200">
              <h4
                className="text-base font-medium text-gray-900 inline-flex items-center"
                data-testid={`sequence-steps-form-step-${index}-title`}
              >
                <div className="border border-gray-200 rounded-lg p-2 inline-flex justify-center items-center shrink-1 mr-3">
                  <MailIcon />
                </div>
                {isInitialStep ? 'Initial email' : 'New step'}
              </h4>
            </header>
            <FormInput<CreateSequenceForm>
              className="pl-2 border-b border-gray-200"
              namePath={`steps.${index}.subject`}
              data-testid={`sequence-steps-form-step-${index}-subject`}
              inputProps={{
                placeholder: isInitialStep
                  ? 'Subject'
                  : "Leave empty to use previous step' subject",
                className: 'border-0 focus:ring-0',
              }}
            />

            <Controller
              name={`steps.${index}.content`}
              render={({
                field: contentField,
                fieldState: contentFieldState,
              }) => (
                <div className="h-50">
                  <RichTextEditor
                    id={stepField.id}
                    value={contentField.value}
                    onChange={contentField.onChange}
                  />
                  {contentFieldState.error && (
                    <p className="mt-1 text-sm text-red-600">
                      {contentFieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
          </section>
        );
      })}

      <button
        onClick={handleAddNextStep}
        data-testid="add-new-step-button"
        className="self-center flex items-center gap-1 px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 w-fit cursor-pointer"
      >
        <span className="text-lg">+</span> Add new step
      </button>
    </>
  );
};

export { SequenceStepsUi };
