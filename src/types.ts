import { EventCategory } from './types/event';

export type RepeatType = 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface RepeatInfo {
  type: RepeatType;
  interval: number;
  endDate?: string;
}

export interface EventFormProps {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  location: string;
  category: EventCategory;
  repeat: RepeatInfo;
  notificationTime: number;
}

export interface Event extends EventFormProps {
  id: string;
}
