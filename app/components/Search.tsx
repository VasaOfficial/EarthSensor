'use client'

import { useState, useEffect, useCallback } from 'react';
import { useDebounce } from 'use-debounce';
import { z } from 'zod';

const dataSchema = z.object({
  descriptions: z.array(z.string()),
});

const SearchBar = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [predictions, setPredictions] = useState<string[]>([]);
  const [text] = useDebounce(inputValue, 500);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [highlightedPrediction, setHighlightedPrediction] = useState<string>('');
  const [hasText, setHasText] = useState<boolean>(false);

  const handleFetchPredictions = useCallback(async () => {
    if (text.trim().length > 0) {
      const response = await fetch(`/api/autocomplete?query=${text.trim()}`);
      const data = await response.json() as { descriptions: string[] };

      const validatedData = dataSchema.parse(data);

      setPredictions(validatedData.descriptions);
    } else {
      setPredictions([]);
    }
  }, [text]);

  useEffect(() => {
    void handleFetchPredictions();
  }, [handleFetchPredictions]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setHighlightedIndex(-1);
    setHighlightedPrediction('');
    setHasText(value.trim().length > 0);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : predictions.length - 1));
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlightedIndex((prevIndex) => (prevIndex < predictions.length - 1 ? prevIndex + 1 : 0));
    } else if (event.key === 'Enter' && highlightedIndex !== -1) {
      event.preventDefault();
      const selectedPrediction = predictions[highlightedIndex];
      if (selectedPrediction) {
        setInputValue(selectedPrediction);
        setPredictions([]);
      }
    }
  };  

  const handleClearInput = () => {
    setInputValue('');
    setPredictions([]);
  };  

  useEffect(() => {
    if (highlightedIndex !== -1) {
      const selectedPrediction = predictions[highlightedIndex];
      if (selectedPrediction) {
        setHighlightedPrediction(selectedPrediction);
      }
    } else {
      setHighlightedPrediction('');
    }
  }, [highlightedIndex, predictions]);
  
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
              } text-black text-sm font-semibold ${prediction === highlightedPrediction ? 'bg-gray-200 rounded-lg' : ''}`} 
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