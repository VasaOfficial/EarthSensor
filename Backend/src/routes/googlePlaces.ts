import axios from 'axios';
import { router, publicProcedure } from '../trpc';

export const googlePlacesRouter = router({
  autocomplete: publicProcedure.query(async ({ input }) => {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    try {
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
