import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

const worker = setupWorker(...handlers);

export async function enableMocking() {
  if (!import.meta.env.VITE_USE_MOCK) {
    return;
  }

  return worker.start();
}
