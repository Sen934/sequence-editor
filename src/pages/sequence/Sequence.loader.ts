import type { LoaderFunctionArgs } from 'react-router';

export default async function sequencePageLoader(args: LoaderFunctionArgs) {
  // we can add any requests here queryClient.prefetchQuery
  return args;
}
