import { CreateSequence } from '@/features/create-sequence/ui/create-sequence.ui.tsx';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import { ErrorHandler } from '@/shared/ui/error-handler/error-handler.ui.tsx';
import { logError } from '@/shared/ui/error-handler/error-handler.lib.ts';

export default function NewSequencePage() {
  return (
    <ErrorBoundary FallbackComponent={ErrorHandler} onError={logError}>
      <Suspense fallback={<div>SomeSkeleton</div>}>
        <BaseNewSequencePage />
      </Suspense>
    </ErrorBoundary>
  );
}

function BaseNewSequencePage() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <header>
        <h2 className="text-gray-900 font-semibold text-3xl">New sequence</h2>
      </header>
      <main>
        <CreateSequence />
      </main>
    </div>
  );
}
