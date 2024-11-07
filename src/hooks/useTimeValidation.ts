import { useState, ChangeEvent } from 'react';

import { getTimeErrorMessage } from '../utils/timeValidation';

interface TimeErrors {
  startTimeError: string | null;
  endTimeError: string | null;
}

export const useTimeValidation = (
  startTime: string,
  endTime: string,
  onStartTimeChange: (time: string) => void,
  onEndTimeChange: (time: string) => void
) => {
  const [timeErrors, setTimeErrors] = useState<TimeErrors>({
    startTimeError: null,
    endTimeError: null,
  });

  const handleStartTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    onStartTimeChange(newTime);
    setTimeErrors(getTimeErrorMessage(newTime, endTime));
  };

  const handleEndTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    onEndTimeChange(newTime);
    setTimeErrors(getTimeErrorMessage(startTime, newTime));
  };

  return {
    timeErrors,
    handleStartTimeChange,
    handleEndTimeChange,
  };
};
