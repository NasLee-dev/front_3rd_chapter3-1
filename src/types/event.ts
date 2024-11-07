export type RepeatType = 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';
export type EventCategory = '업무' | '개인' | '가족' | '기타';

export interface Event {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  location: string;
  category: EventCategory;
  repeat: {
    type: RepeatType;
    interval?: number;
    endDate?: string;
  };
  notificationTime: number;
}
