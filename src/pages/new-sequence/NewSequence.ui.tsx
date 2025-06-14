import { SequenceStepper } from '@/widgets/sequence-stepper/SequenceStepper.ui.tsx';

export function NewSequencePage() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <header>
        <h2 className="text-gray-900 font-semibold text-3xl">New sequence</h2>
      </header>
      <main>
        <SequenceStepper />
      </main>
    </div>
  );
}
