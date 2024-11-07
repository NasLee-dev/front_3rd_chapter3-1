import { useState } from 'react';

import { Event, EventCategory, RepeatType } from '../types/event';

interface EventFormState {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  location: string;
  category: EventCategory | string;
  repeat: {
    isRepeating: boolean;
    type: RepeatType;
    interval: number;
    endDate: string;
  };
  notificationTime: number;
}

const initialFormState: EventFormState = {
  title: '',
  date: '',
  startTime: '',
  endTime: '',
  description: '',
  location: '',
  category: '',
  repeat: {
    isRepeating: false,
    type: 'none',
    interval: 1,
    endDate: '',
  },
  notificationTime: 10,
};

export const useEventFormState = (initialEvent?: Event) => {
  const [formState, setFormState] = useState<EventFormState>(() => {
    if (!initialEvent) return initialFormState;

    return {
      title: initialEvent.title,
      date: initialEvent.date,
      startTime: initialEvent.startTime,
      endTime: initialEvent.endTime,
      description: initialEvent.description,
      location: initialEvent.location,
      category: initialEvent.category,
      repeat: {
        isRepeating: initialEvent.repeat.type !== 'none',
        type: initialEvent.repeat.type,
        interval: initialEvent.repeat.interval || 1,
        endDate: initialEvent.repeat.endDate || '',
      },
      notificationTime: initialEvent.notificationTime,
    };
  });

  const updateField = <K extends keyof EventFormState>(field: K, value: EventFormState[K]) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormState(initialFormState);
  };

  return {
    formState,
    setFormState,
    updateField,
    resetForm,
  };
};
