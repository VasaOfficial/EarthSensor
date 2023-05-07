import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { googlePlacesRouter } from './routes/googlePlaces';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
const rateLimit = require('express-rate-limit')
dotenv.config();

const PORT = process.env.PORT || 5000

const app: express.Application = express();

app.use(cors());

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 50 // 50 requests per windowMs
});
app.use(limiter)
app.set('trust proxy', 1)

// Routes 
app.use('/api', createExpressMiddleware({ router: googlePlacesRouter }))

app.listen(PORT, () => console.log('Server is running on port 5000'));