import { Alert, AlertIcon, AlertTitle, CloseButton, Box } from '@chakra-ui/react';

export interface Notification {
  id: string;
  message: string;
  type?: 'info' | 'warning' | 'success' | 'error';
  eventId?: string;
}

interface NotificationItemProps {
  notification: Notification;
  onClose: () => void;
}

export const NotificationItem = ({ notification, onClose }: NotificationItemProps) => {
  return (
    <Alert status={notification.type || 'info'} variant="solid" borderRadius="md" pr={8}>
      <AlertIcon />
      <Box flex="1">
        <AlertTitle fontSize="sm">{notification.message}</AlertTitle>
      </Box>
      <CloseButton position="absolute" right={1} top={1} onClick={onClose} />
    </Alert>
  );
};
