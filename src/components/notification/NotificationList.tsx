import { VStack, Alert, AlertIcon, AlertTitle, CloseButton } from '@chakra-ui/react';

import { Notification } from './NotificationItem';

interface NotificationListProps {
  notifications: Notification[];
  onClose: (index: number) => void;
}

export const NotificationList = ({ notifications, onClose }: NotificationListProps) => {
  if (notifications.length === 0) return null;

  return (
    <VStack
      position="fixed"
      top={4}
      right={4}
      spacing={2}
      align="flex-end"
      maxWidth="400px"
      zIndex={1000}
    >
      {notifications.map((notification, index) => (
        <Alert key={index} status="info" variant="solid" width="auto" borderRadius="md">
          <AlertIcon />
          <AlertTitle fontSize="sm">{notification.message}</AlertTitle>
          <CloseButton onClick={() => onClose(index)} position="absolute" right={1} top={1} />
        </Alert>
      ))}
    </VStack>
  );
};
