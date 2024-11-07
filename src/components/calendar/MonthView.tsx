import { Table, Thead, Tbody, Tr, Th, Td, Box } from '@chakra-ui/react';

import { DayCell } from './DayCell';
import { Event } from '../../types';
import { getWeeksAtMonth } from '../../utils/dateUtils';

interface MonthViewProps {
  currentDate: Date;
  events: Event[];
  onEventClick?: (event: Event) => void;
}

export const MonthView = ({ currentDate, events, onEventClick }: MonthViewProps) => {
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
  const weeks = getWeeksAtMonth(currentDate);

  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            {weekDays.map((day) => (
              <Th key={day} width="14.28%" textAlign="center">
                {day}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {weeks.map((week, weekIndex) => (
            <Tr key={weekIndex} height="120px">
              {week.map((day, dayIndex) => {
                const currentDateCopy = new Date(currentDate);
                if (day) {
                  currentDateCopy.setDate(day);
                }

                return (
                  <Td key={`${weekIndex}-${dayIndex}`} padding={0} verticalAlign="top">
                    <DayCell
                      currentDate={currentDateCopy}
                      day={day}
                      events={events.filter((event) => {
                        if (!day) return false;
                        const eventDate = new Date(event.date);
                        return (
                          eventDate.getDate() === day &&
                          eventDate.getMonth() === currentDate.getMonth() &&
                          eventDate.getFullYear() === currentDate.getFullYear()
                        );
                      })}
                      onEventClick={onEventClick}
                      isCurrentMonth={true}
                    />
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
