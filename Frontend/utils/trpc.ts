import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import { type AppRouter } from '../../Backend/src/routes/googlePlaces'

export const client = createTRPCNext<AppRouter>({
  config(opts) {
    return {
      links: [
        httpBatchLink({
          url: "http://localhost:5000/api",
        }),
      ],
    };
  },
  ssr: false,
});