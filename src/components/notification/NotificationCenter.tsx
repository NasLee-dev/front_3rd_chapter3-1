import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  VStack,
  Text,
  Button,
  Box,
  HStack,
} from '@chakra-ui/react';

import { NotificationBadge } from './NotificationBadge';
import { NotificationItem } from './NotificationItem';
import { Notification } from './NotificationItem';

interface NotificationCenterProps {
  notifications: Notification[];
  onClearAll: () => void;
  onClose: (id: string) => void;
}

export const NotificationCenter = ({
  notifications,
  onClearAll,
  onClose,
}: NotificationCenterProps) => {
  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Box>
          <NotificationBadge count={notifications.length} />
        </Box>
      </PopoverTrigger>
      <PopoverContent width="400px">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <HStack justify="space-between" align="center">
            <Text fontWeight="bold">알림</Text>
            {notifications.length > 0 && (
              <Button size="xs" onClick={onClearAll}>
                모두 지우기
              </Button>
            )}
          </HStack>
        </PopoverHeader>
        <PopoverBody maxHeight="400px" overflowY="auto">
          <VStack spacing={2} align="stretch">
            {notifications.length === 0 ? (
              <Text color="gray.500" textAlign="center" py={4}>
                새로운 알림이 없습니다
              </Text>
            ) : (
              notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onClose={() => onClose(notification.id)}
                />
              ))
            )}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
