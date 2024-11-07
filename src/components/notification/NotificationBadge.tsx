import { BellIcon } from '@chakra-ui/icons';
import { Badge, Box } from '@chakra-ui/react';

interface NotificationBadgeProps {
  count: number;
  onClick?: () => void;
}

export const NotificationBadge = ({ count, onClick }: NotificationBadgeProps) => {
  if (count === 0) return null;

  return (
    <Box position="relative" display="inline-block" cursor="pointer" onClick={onClick}>
      <BellIcon boxSize={6} />
      <Badge
        colorScheme="red"
        borderRadius="full"
        position="absolute"
        top="-2px"
        right="-2px"
        minW="1.5em"
        textAlign="center"
      >
        {count > 99 ? '99+' : count}
      </Badge>
    </Box>
  );
};
