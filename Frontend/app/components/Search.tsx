'use client';

import {  useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { env } from 'app/env.mjs';

const SearchBar = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: env.NEXT_PUBLIC_GOOGLE_MAP_API ? env.NEXT_PUBLIC_GOOGLE_MAP_API : '',
      version: 'weekly',
      libraries: ['places'],
    });
  
    loader.load().then(() => {
      const input = inputRef.current;
      if (input) {
        const autocomplete = new google.maps.places.Autocomplete(input);
  
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
        });
      }
    }).catch((err) => {
      console.error(err);
    });
  
  }, []);  

  return <input type="search" placeholder="Enter Location" className="next-input rounded-lg px-4 py-2 text-black" ref={inputRef} />
};

export default SearchBar;
