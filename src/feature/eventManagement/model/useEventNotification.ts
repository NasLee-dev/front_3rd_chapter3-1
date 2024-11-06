import { useState } from 'react';

import { Event } from '../../../types';

export const useEventNotification = (initialEvent?: Event) => {
  const [notificationTime, setNotificationTime] = useState(initialEvent?.notificationTime || 10);

  return {
    notificationTime,
    setNotificationTime,
  };
};
