import { EditIcon, DeleteIcon, BellIcon } from '@chakra-ui/icons';
import { Box, HStack, VStack, Text, IconButton, Badge } from '@chakra-ui/react';

import { NOTIFICATION_OPTIONS } from '../../constants/calendar';
import { Event } from '../../types/event';

interface EventItemProps {
  event: Event;
  onEdit: () => void;
  onDelete: () => void;
  isNotified?: boolean;
}

export const EventItem = ({ event, onEdit, onDelete, isNotified = false }: EventItemProps) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case '업무':
        return 'blue';
      case '개인':
        return 'green';
      case '가족':
        return 'purple';
      case '기타':
        return 'gray';
      default:
        return 'gray';
    }
  };

  const getNotificationLabel = (value: number) => {
    return NOTIFICATION_OPTIONS.find((option) => option.value === value)?.label;
  };

  return (
    <Box w="100%" borderWidth={1} borderRadius="lg" p={3} _hover={{ boxShadow: 'sm' }}>
      <HStack justify="space-between">
        <VStack align="start" spacing={1}>
          <HStack>
            {isNotified && <BellIcon color="red.500" />}
            <Text
              fontWeight={isNotified ? 'bold' : 'normal'}
              color={isNotified ? 'red.500' : 'inherit'}
            >
              {event.title}
            </Text>
            <Badge colorScheme={getCategoryColor(event.category)}>{event.category}</Badge>
          </HStack>

          <Text fontSize="sm" color="gray.600">
            {event.date} {event.startTime} - {event.endTime}
          </Text>

          {event.location && (
            <Text fontSize="sm" color="gray.600">
              📍 {event.location}
            </Text>
          )}

          {event.description && (
            <Text fontSize="sm" noOfLines={2}>
              {event.description}
            </Text>
          )}

          {event.repeat.type !== 'none' && (
            <Text fontSize="sm" color="blue.600">
              🔄 {event.repeat.interval}
              {event.repeat.type === 'daily' && '일'}
              {event.repeat.type === 'weekly' && '주'}
              {event.repeat.type === 'monthly' && '월'}
              {event.repeat.type === 'yearly' && '년'}
              마다
              {event.repeat.endDate && ` (종료: ${event.repeat.endDate})`}
            </Text>
          )}

          <Text fontSize="sm" color="gray.500">
            ⏰ {getNotificationLabel(event.notificationTime)}
          </Text>
        </VStack>

        <HStack>
          <IconButton
            aria-label="Edit event"
            icon={<EditIcon />}
            size="sm"
            variant="ghost"
            onClick={onEdit}
          />
          <IconButton
            aria-label="Delete event"
            icon={<DeleteIcon />}
            size="sm"
            variant="ghost"
            colorScheme="red"
            onClick={onDelete}
          />
        </HStack>
      </HStack>
    </Box>
  );
};
