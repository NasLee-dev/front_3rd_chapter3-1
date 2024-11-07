import { Table, Thead, Tbody, Tr, Th, Td, Heading, VStack } from '@chakra-ui/react';

import { DayCell } from './DayCell';
import { Event } from '../../types';
import { formatWeek, getWeekDates, isSameDay } from '../../utils/dateUtils';

interface WeekViewProps {
  currentDate: Date;
  events: Event[];
  onEventClick?: (event: Event) => void;
}

export const WeekView = ({ currentDate, events, onEventClick }: WeekViewProps) => {
  const weekDates = getWeekDates(currentDate);
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <VStack data-testid="week-view" align="stretch" w="full" spacing={4}>
      <Heading size="md">{formatWeek(currentDate)}</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            {weekDays.map((day) => (
              <Th key={day} width="14.28%">
                {day}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            {weekDates.map((date) => (
              <Td key={date.toISOString()} padding={0} verticalAlign="top">
                <DayCell
                  currentDate={date}
                  day={date.getDate()}
                  events={events.filter((event) => isSameDay(new Date(event.date), date))}
                  onEventClick={onEventClick}
                  isCurrentMonth={date.getMonth() === currentDate.getMonth()}
                />
              </Td>
            ))}
          </Tr>
        </Tbody>
      </Table>
    </VStack>
  );
};
