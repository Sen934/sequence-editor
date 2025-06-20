// src/setupTests.ts
import * as matchers from '@testing-library/jest-dom/matchers';
import { expect, vi } from 'vitest';

expect.extend(matchers);

vi.mock('react-quill-new', async () => {
  const mock = await import('@/../__mocks__/react-quill-new.tsx');
  return { default: mock.default };
});

vi.mock('react-quill-new/dist/quill.snow.css', async () => {
  return { default: '' };
});
