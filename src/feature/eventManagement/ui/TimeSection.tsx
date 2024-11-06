import { FormControl, FormLabel, HStack, Input, Tooltip } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

interface TimeSectionProps {
  startTime: string;
  endTime: string;
  errors: {
    startTimeError: string | null;
    endTimeError: string | null;
  };
  handleStartTimeChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleEndTimeChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const TimeSection = ({
  startTime,
  endTime,
  errors,
  handleStartTimeChange,
  handleEndTimeChange,
}: TimeSectionProps) => (
  <HStack width="100%">
    <FormControl isRequired>
      <FormLabel>시작 시간</FormLabel>
      <Tooltip label={errors.startTimeError} isOpen={!!errors.startTimeError} placement="top">
        <Input
          type="time"
          value={startTime}
          onChange={handleStartTimeChange}
          isInvalid={!!errors.startTimeError}
        />
      </Tooltip>
    </FormControl>
    <FormControl isRequired>
      <FormLabel>종료 시간</FormLabel>
      <Tooltip label={errors.endTimeError} isOpen={!!errors.endTimeError} placement="top">
        <Input
          type="time"
          value={endTime}
          onChange={handleEndTimeChange}
          isInvalid={!!errors.endTimeError}
        />
      </Tooltip>
    </FormControl>
  </HStack>
);
