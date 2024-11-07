export interface Notification {
  id: string;
  message: string;
  date: string;
  time: string;
  read: boolean;
  type: 'info' | 'warning' | 'error';
}
