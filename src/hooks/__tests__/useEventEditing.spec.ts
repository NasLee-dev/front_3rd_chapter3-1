import { renderHook } from '@testing-library/react';

import { EventCategory } from '../../types/event';
import { useEventEditing } from '../useEventEditing';

describe('useEventEditing', () => {
  it('초기 값은 null 이어야 한다', () => {
    const { result } = renderHook(() => useEventEditing());
    expect(result.current.editingEvent).toBeNull();
  });

  it('수정하기가 끝났으면 setEditing이 null이어야 한다', () => {
    const { result } = renderHook(() => useEventEditing());
    const event = {
      id: '1',
      title: 'Test Event',
      date: '2024-07-01',
      startTime: '09:00',
      endTime: '10:00',
      description: '',
      location: '',
      category: '업무' as EventCategory,
      repeat: { type: 'none' as 'none', interval: 0, endDate: '' },
      notificationTime: 0,
    };
    result.current.startEditing(event);
    result.current.stopEditing();
    expect(result.current.editingEvent).toBeNull();
  });
});
