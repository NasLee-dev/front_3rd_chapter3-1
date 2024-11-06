import { RepeatType } from '../../../types';

export interface EventForm {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  location: string;
  category: string;
  repeat: {
    type: RepeatType;
    interval: number;
    endDate?: string;
  };
  notificationTime: number;
}
