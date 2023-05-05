import express from 'express';
import axios from 'axios';
import apicache from 'apicache'
const router = express.Router()

// Env vars
const apiKey = process.env.GOOGLE_PLACES_API_KEY;

// init cache
const cache = apicache.middleware;

router.get('/', cache('60 minutes'), async (req, res) => {
  const query = req.query.q;

  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${query}`);
    const predictions = response.data.predictions;
    res.json(predictions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching data from the Google Places API'});
  }
})

module.exports = router