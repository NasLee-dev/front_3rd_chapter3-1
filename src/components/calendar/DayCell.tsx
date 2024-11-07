import { Box, Td, Text, VStack, HStack } from '@chakra-ui/react';
import React from 'react';

import { Event } from '../../types';
import { getCategoryColorScheme } from '../../utils/categoryUtils';
import { getEventsForDay } from '../../utils/dateUtils';

interface DayCellProps {
  currentDate: Date;
  day: number | null;
  events: Event[];
  onEventClick?: (event: Event) => void;
  isCurrentMonth?: boolean;
}

export const DayCell: React.FC<DayCellProps> = ({ currentDate, day, events, onEventClick }) => {
  if (!day) {
    return <Td />;
  }

  const todayDate = new Date();
  const isToday =
    todayDate.getDate() === day &&
    todayDate.getMonth() === currentDate.getMonth() &&
    todayDate.getFullYear() === currentDate.getFullYear();

  const dayEvents = getEventsForDay(events, day);

  return (
    <Td height="100px" p={0} verticalAlign="top" width="14.28%">
      <Text fontSize="sm" fontWeight={isToday ? 'bold' : 'normal'} textAlign="right" mb={2}>
        {day}
      </Text>

      <VStack align="stretch" spacing={1} maxH="calc(100% - 24px)" overflow="hidden">
        {dayEvents.map((event, index) => {
          if (index >= 3 && dayEvents.length > 3) {
            if (index === 3) {
              return (
                <Text
                  key="more"
                  fontSize="xs"
                  color="gray.500"
                  textAlign="center"
                  cursor="pointer"
                  _hover={{ color: 'gray.700' }}
                >
                  +{dayEvents.length - 3}개 더보기
                </Text>
              );
            }
            return null;
          }

          const colorScheme = getCategoryColorScheme(event.category);

          return (
            <Box
              key={event.id}
              px={1}
              py={1}
              bg={colorScheme.light}
              borderLeft="3px solid"
              borderLeftColor={colorScheme.border}
              borderRadius="md"
              cursor="pointer"
              onClick={() => onEventClick?.(event)}
              _hover={{
                bg: `${colorScheme.badge}.100`,
                transform: 'translateX(2px)',
              }}
              transition="all 0.2s"
            >
              <HStack spacing={1} overflow="hidden">
                <Text fontSize="xs" color="gray.500" flexShrink={0}>
                  {event.startTime.slice(0, 5)}
                </Text>
                <Text fontSize="xs" color={colorScheme.text} noOfLines={1}>
                  {event.title}
                </Text>
              </HStack>
            </Box>
          );
        })}
      </VStack>
    </Td>
  );
};
