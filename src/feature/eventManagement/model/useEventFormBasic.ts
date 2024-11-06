import { useState } from 'react';

import { Event } from '../../../types';

export const useEventFormBasic = (initialEvent?: Event) => {
  const [title, setTitle] = useState(initialEvent?.title || '');
  const [date, setDate] = useState(initialEvent?.date || '');
  const [description, setDescription] = useState(initialEvent?.description || '');
  const [location, setLocation] = useState(initialEvent?.location || '');
  const [category, setCategory] = useState(initialEvent?.category || '');

  return {
    title,
    setTitle,
    date,
    setDate,
    description,
    setDescription,
    location,
    setLocation,
    category,
    setCategory,
  };
};
