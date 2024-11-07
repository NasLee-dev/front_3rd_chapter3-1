import { useState } from 'react';

import { RepeatType } from '../types';

interface RepeatSettings {
  isRepeating: boolean;
  type: RepeatType;
  interval: number;
  endDate: string;
}

export const useRepeatSettings = (initialSettings?: RepeatSettings) => {
  const [repeatSettings, setRepeatSettings] = useState<RepeatSettings>(() => ({
    isRepeating: initialSettings?.isRepeating || false,
    type: initialSettings?.type || 'none',
    interval: initialSettings?.interval || 1,
    endDate: initialSettings?.endDate || '',
  }));

  const updateRepeatSetting = <K extends keyof RepeatSettings>(
    field: K,
    value: RepeatSettings[K]
  ) => {
    setRepeatSettings((prev) => ({ ...prev, [field]: value }));
  };

  return {
    repeatSettings,
    updateRepeatSetting,
  };
};
