import { useState } from 'react';

import { Event } from '../../../types';

interface UseEventEditProps {
  onEventEdit: (event: Event) => void;
}

export const useEventEdit = ({ onEventEdit }: UseEventEditProps) => {
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const editEvent = (event: Event) => {
    setEditingEvent(event);
    onEventEdit(event);
  };

  return {
    editingEvent,
    setEditingEvent,
    editEvent,
  };
};
