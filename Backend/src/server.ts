import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import axios from 'axios';

dotenv.config();

const app: express.Application = express();

app.use(cors());

app.get('/', async (req, res) => {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const query = req.query.q;

  try {
    const response =await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${query}`);
    const predictions = response.data.predictions;
    res.json(predictions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching data from the Google Places API'});
  }
})

app.listen(3000, () => console.log('Server is running on port 3000'));