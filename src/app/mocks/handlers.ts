import { delay, http, HttpResponse } from 'msw';

export const handlers = [
  http.post(`${import.meta.env.VITE_API_URL}/sequence/new`, async () => {
    await delay(500);

    return HttpResponse.json('New new-sequence created');
  }),
];
