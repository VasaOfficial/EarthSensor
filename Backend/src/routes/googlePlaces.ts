import axios from 'axios';
import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

export const googlePlacesRouter = router({
  autocomplete: publicProcedure
  .input(z.string())
  .query( async ({ input }) => {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    try {
      const validatedInput = z.string().parse(input);
      const response = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${input}`);
      console.log(response.data);
      const predictions = response.data.predictions;
      return predictions;
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while fetching data from the Google Places API');
    }
  }),
});

export type AppRouter = typeof googlePlacesRouter;
