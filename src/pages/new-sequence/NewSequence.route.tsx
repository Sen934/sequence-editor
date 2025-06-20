import { pathKeys } from '@/shared/router';
import type { RouteObject } from 'react-router';

export const newSequencePageRoute: RouteObject = {
  path: pathKeys.newSequence,
  lazy: async () => {
    const [loader, Component] = await Promise.all([
      import('./NewSequence.loader.ts').then(
        (module) => module.newSequencePageLoader,
      ),
      import('./NewSequence.ui.tsx').then((module) => module.default),
    ]);
    return { loader, Component };
  },
};
