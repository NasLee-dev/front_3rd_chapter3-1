import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Heading, HStack, IconButton, Select, VStack } from '@chakra-ui/react';

interface CalendarHeaderProps {
  view: 'week' | 'month';
  onViewChange: (view: 'week' | 'month') => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export const CalendarHeader = ({ view, onViewChange, onNavigate }: CalendarHeaderProps) => {
  return (
    <>
      <Heading>일정 보기</Heading>
      <HStack justify="space-between" w="full" mx="auto">
        <IconButton
          aria-label="Previous"
          icon={<ChevronLeftIcon />}
          onClick={() => onNavigate('prev')}
        />
        <Select
          value={view}
          onChange={(e) => onViewChange(e.target.value as 'week' | 'month')}
          aria-label="view"
        >
          <option value="week">Week</option>
          <option value="month">Month</option>
        </Select>
        <IconButton
          aria-label="Next"
          icon={<ChevronRightIcon />}
          onClick={() => onNavigate('next')}
        />
      </HStack>
    </>
  );
};
