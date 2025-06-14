import type { LoaderFunctionArgs } from 'react-router';

export async function newSequencePageLoader(args: LoaderFunctionArgs) {
  // we can add any requests here queryClient.prefetchQuery
  return args;
}
