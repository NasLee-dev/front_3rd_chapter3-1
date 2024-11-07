import { FormControl, FormLabel, Select, Input, HStack, VStack } from '@chakra-ui/react';

import { RepeatType } from '../../types/event';

interface RepeatOptionsProps {
  value: {
    type: RepeatType;
    interval?: number;
    endDate?: string;
  };
  onChange: (value: { type: RepeatType; interval?: number; endDate?: string }) => void;
}

export const RepeatOptions = ({ value, onChange }: RepeatOptionsProps) => {
  return (
    <VStack spacing={4}>
      <FormControl>
        <FormLabel>반복 유형</FormLabel>
        <Select
          value={value.type}
          onChange={(e) => onChange({ ...value, type: e.target.value as RepeatType })}
        >
          <option value="daily">매일</option>
          <option value="weekly">매주</option>
          <option value="monthly">매월</option>
          <option value="yearly">매년</option>
        </Select>
      </FormControl>

      <HStack width="100%">
        <FormControl>
          <FormLabel>반복 간격</FormLabel>
          <Input
            type="number"
            value={value.interval || 1}
            onChange={(e) => onChange({ ...value, interval: parseInt(e.target.value) || 1 })}
            min={1}
          />
        </FormControl>

        <FormControl>
          <FormLabel>반복 종료일</FormLabel>
          <Input
            type="date"
            value={value.endDate || ''}
            onChange={(e) => onChange({ ...value, endDate: e.target.value })}
          />
        </FormControl>
      </HStack>
    </VStack>
  );
};
