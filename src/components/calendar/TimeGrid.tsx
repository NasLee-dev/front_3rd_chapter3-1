import { Box, VStack, Text, Divider } from '@chakra-ui/react';
import { useMemo } from 'react';

import { Event } from '../../types/event';
import { getCategoryColor } from '../../utils/categoryUtils';

interface TimeGridProps {
  events: Event[];
  date: Date;
}

export const TimeGrid = ({ events }: TimeGridProps) => {
  const hours = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => i);
  }, []);

  const getEventPosition = (event: Event) => {
    const [hours, minutes] = event.startTime.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const getEventDuration = (event: Event) => {
    const [startHours, startMinutes] = event.startTime.split(':').map(Number);
    const [endHours, endMinutes] = event.endTime.split(':').map(Number);
    return endHours * 60 + endMinutes - (startHours * 60 + startMinutes);
  };

  return (
    <VStack align="stretch" spacing={0} position="relative" h="1440px">
      {hours.map((hour) => (
        <Box key={hour} h="60px" position="relative">
          <Text fontSize="xs" color="gray.500" position="absolute" top={-2} left={0}>
            {`${String(hour).padStart(2, '0')}:00`}
          </Text>
          <Divider borderColor="gray.200" />
        </Box>
      ))}

      {events.map((event) => (
        <Box
          key={event.id}
          position="absolute"
          top={`${getEventPosition(event)}px`}
          left="60px"
          right={4}
          height={`${getEventDuration(event)}px`}
          bg={`${getCategoryColor(event.category as '업무' | '개인' | '가족' | '기타')}.100`}
          borderRadius="sm"
          p={2}
          overflow="hidden"
        >
          <Text fontSize="xs" fontWeight="bold">
            {event.title}
          </Text>
          <Text fontSize="xs">
            {event.startTime} - {event.endTime}
          </Text>
        </Box>
      ))}
    </VStack>
  );
};
