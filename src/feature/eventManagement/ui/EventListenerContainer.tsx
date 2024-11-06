import { Dispatch, SetStateAction } from 'react';

import { useEventOperations } from '../../../hooks/useEventOperations';
import { useSearch } from '../../../hooks/useSearch';
import { Event } from '../../../types';

interface EventListenerContainerProps {
  editingEvent: Event | null;
  setEditingEvent: Dispatch<SetStateAction<Event | null>>;
  currentDate: Date;
  view: 'week' | 'month';
}

export const EventListenerContainer = ({
  editingEvent,
  setEditingEvent,
  currentDate,
  view,
}: EventListenerContainerProps) => {
  const { events, deleteEvent } = useEventOperations(Boolean(editingEvent), () =>
    setEditingEvent(null)
  );

  const { searchTerm, filteredEvents, setSearchTerm } = useSearch(events, currentDate, view);

  return <></>;
};
