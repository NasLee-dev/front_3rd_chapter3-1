import { useState } from 'react';

import { Event } from '../types';

export const useEventEditing = () => {
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const startEditing = (event: Event) => {
    setEditingEvent(event);
  };

  const stopEditing = () => {
    setEditingEvent(null);
  };

  return {
    editingEvent,
    startEditing,
    stopEditing,
  };
};
