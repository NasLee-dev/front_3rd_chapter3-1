import { BellIcon } from '@chakra-ui/icons';
import { Box, HStack, Text } from '@chakra-ui/react';

import { Event, EventCategory } from '../../types/event';
import { getCategoryColorScheme } from '../../utils/categoryUtils';

interface EventCellProps {
  event: Event;
  isNotified?: boolean;
  onClick?: () => void;
}

export const EventCell = ({ event, isNotified = false, onClick }: EventCellProps) => {
  const colorScheme = getCategoryColorScheme(event.category as EventCategory);

  return (
    <Box
      p={1}
      my={1}
      bg={`${colorScheme}.50`}
      borderLeft={`3px solid`}
      borderLeftColor={`${colorScheme}.500`}
      borderRadius="sm"
      cursor="pointer"
      transition="all 0.2s"
      _hover={{
        bg: `${colorScheme}.100`,
        transform: 'translateX(2px)',
      }}
      onClick={onClick}
    >
      <HStack spacing={1}>
        {isNotified && <BellIcon color="red.500" boxSize={3} />}
        <Text
          fontSize="xs"
          color={`${colorScheme}.700`}
          noOfLines={1}
          fontWeight={isNotified ? 'bold' : 'normal'}
        >
          {event.startTime.slice(0, 5)} {event.title}
        </Text>
      </HStack>
    </Box>
  );
};
