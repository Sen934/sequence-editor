import { render } from '@testing-library/react';
import { SequenceStepper } from '@/features/create-sequence/ui/create-sequence.ui.tsx';

describe('App', () => {
  it('renders the demo Vite text', () => {
    render(<SequenceStepper />);
  });
});
