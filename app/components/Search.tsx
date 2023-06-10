'use client'
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation'
import { useDebounce } from 'use-debounce';
import { z } from 'zod';

const dataSchema = z.object({
  descriptions: z.array(z.string()),
});

export const geocodingResponseSchema = z.object({
  results: z.array(
    z.object({
      geometry: z.object({
        location: z.object({
          lat: z.number(),
          lng: z.number(),
        }),
      }),
    })
  ),
});

type geocodingSchema = typeof geocodingResponseSchema;

const SearchBar = () => {
  const router = useRouter()
  const AUTOCOMPLETE_API_URL = '/api/autocomplete?query=';
  const GEOCODING_API_URL = '/api/geocode?city=';
  
  const [inputValue, setInputValue] = useState<string>('');
  const [predictions, setPredictions] = useState<string[]>([]);
  const [debouncedText] = useDebounce(inputValue, 500);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [highlightedPrediction, setHighlightedPrediction] = useState<string>('');
  const [hasText, setHasText] = useState<boolean>(false);
  const [searchLink, setSearchLink] = useState('/information?city=')

  const handlePredictionMouseEnter = (prediction: string) => {
    setHighlightedPrediction(prediction);
  };
  
  const handlePredictionMouseLeave = () => {
    setHighlightedPrediction('');
  };

  const fetchPredictions = useCallback(async () => {
    if (debouncedText.trim().length > 0) {
      const response = await fetch(`${AUTOCOMPLETE_API_URL}${debouncedText.trim()}`);
      const data = await response.json() as { descriptions: string[] };

      const validatedData = dataSchema.parse(data);

      setPredictions(validatedData.descriptions);
    } else {
      setPredictions([]);
    }
  }, [debouncedText]);

  useEffect(() => {
    void fetchPredictions();
  }, [fetchPredictions]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
    setHighlightedIndex(-1);
    setHighlightedPrediction('');
    setHasText(value.trim().length > 0);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : predictions.length - 1
      );
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex < predictions.length - 1 ? prevIndex + 1 : 0
      );
    } else if (event.key === 'Enter' && highlightedIndex !== -1) {
      event.preventDefault();
      const selectedPrediction = predictions[highlightedIndex];
      if (selectedPrediction) {
        setInputValue(selectedPrediction);
        setPredictions([]);
  
        fetchGeocode(selectedPrediction).catch((error) => {
          console.error(error);
        });
      }
    }
  };

  const handlePredictionClick = (selectedPrediction: string) => {
    setInputValue(selectedPrediction);
    setPredictions([]);
  
    fetchGeocode(selectedPrediction).catch((error) => {
      console.error(error);
    });
  };  
 
  const fetchGeocode = async (city: string) => {
    try {
      // Step 1: Fetch latitude and longitude using geocoding
      const geocodingApiUrl = `${GEOCODING_API_URL}${encodeURIComponent(city)}`;
      const geocodingResponse = await fetch(geocodingApiUrl);
      const geocodingData = await geocodingResponse.json() as geocodingSchema;
  
      // Step 2: Validate the response data using the schema
      const validatedData = geocodingResponseSchema.parse(geocodingData);
  
      // Step 3: Extract latitude and longitude from the validated data
      const lat = validatedData.results[0]?.geometry.location.lat as number;
      const lng = validatedData.results[0]?.geometry.location.lng as number;
  
      // Check if lat and lng are defined
      if (typeof lat === 'number' && typeof lng === 'number') {
        
        // Update the search link
        const searchLink = `/information?city=${encodeURIComponent(city)}&lat=${lat}&lng=${lng}`;
        setSearchLink(searchLink);
  
        // Route to the search link
        router.push(searchLink);
      } else {
        console.error('Invalid latitude or longitude');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleClearInput = () => {
    setInputValue('');
    setPredictions([]);
    setHasText(false);
  };  

  const updateHighlightedPrediction = useCallback(() => {
    if (highlightedIndex !== -1) {
      const selectedPrediction = predictions[highlightedIndex];
      if (selectedPrediction) {
        setHighlightedPrediction(selectedPrediction);
      }
    } else {
      setHighlightedPrediction('');
    }
  }, [highlightedIndex, predictions]);
  
  useEffect(() => {
    updateHighlightedPrediction();
  }, [updateHighlightedPrediction]);  
  
  return (
    <div className="relative">
      <input
        aria-label="enter the name of your city"
        type="text"
        placeholder="Enter Location"
        required
        className="rounded-lg px-4 py-2 text-black caret-black"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />

      {predictions.length > 0 && (
        <ul className="absolute w-full mt-1 bg-white rounded-lg">
        {predictions.map((prediction, index) => (
          <li
            key={prediction}
            className={`p-2 ${
              index !== predictions.length - 1 ? 'border-b border-gray-300' : ''
            } text-black text-sm font-semibold ${
              prediction === highlightedPrediction ? 'bg-gray-200 rounded-lg' : ''
            } ${prediction === highlightedPrediction ? 'cursor-pointer hover:bg-gray-300' : ''}`}
            onClick={() => handlePredictionClick(prediction)}
            onMouseEnter={() => handlePredictionMouseEnter(prediction)}
            onMouseLeave={handlePredictionMouseLeave}
          >
            {prediction}
          </li>
        ))}
      </ul>         
      )}
      {hasText && (
      <button className='absolute right-2 pb-2 w-10 text-2xl h-full text-black' onClick={handleClearInput}>×</button>
      )}
    </div>
  );
};

export default SearchBar;