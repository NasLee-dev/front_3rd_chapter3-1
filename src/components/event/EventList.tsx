import { SearchIcon } from '@chakra-ui/icons';
import { VStack, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react';

import { EventItem } from './EventItem';
import { Event } from '../../types';

interface EventListProps {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
  searchTerm: string;
  onSearch: (term: string) => void;
}

export const EventList = ({ events, onEdit, onDelete, searchTerm, onSearch }: EventListProps) => {
  return (
    <VStack spacing={4} w="500px" h="full" overflowY="auto">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.400" />
        </InputLeftElement>
        <Input
          placeholder="일정 검색"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
        />
      </InputGroup>

      {events.length === 0 ? (
        <Text color="gray.500" textAlign="center">
          일정이 없습니다.
        </Text>
      ) : (
        events.map((event) => (
          <EventItem
            key={event.id}
            event={event}
            onEdit={() => onEdit(event)}
            onDelete={() => onDelete(event.id)}
          />
        ))
      )}
    </VStack>
  );
};
