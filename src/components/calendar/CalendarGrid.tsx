import { VStack } from '@chakra-ui/react';

import { CalendarHeader } from './CalendarHeader';
import { MonthView } from './MonthView';
import { WeekView } from './WeekView';
import { Event } from '../../types';

interface CalendarGridProps {
  currentDate: Date;
  view: 'week' | 'month';
  events: Event[];
  onEventClick?: (event: Event) => void;
  onViewChange: (view: 'week' | 'month') => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export const CalendarGrid = ({
  currentDate,
  view,
  events,
  onEventClick,
  onViewChange,
  onNavigate,
}: CalendarGridProps) => {
  return (
    <VStack flex={1} spacing={5} align="stretch">
      <CalendarHeader view={view} onViewChange={onViewChange} onNavigate={onNavigate} />

      {view === 'week' ? (
        <WeekView currentDate={currentDate} events={events} onEventClick={onEventClick} />
      ) : (
        <MonthView currentDate={currentDate} events={events} onEventClick={onEventClick} />
      )}
    </VStack>
  );
};
