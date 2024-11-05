import { act, renderHook } from '@testing-library/react';

import { useSearch } from '../../hooks/useSearch.ts';
import { Event } from '../../types.ts';

it('검색어가 비어있을 때 모든 이벤트를 반환해야 한다', () => {
  const events: Event[] = [
    {
      id: '1',
      date: '2024-07-01',
      description: 'Test Event',
      location: 'Test Location',
      title: 'Test Event',
      startTime: '14:30',
      endTime: '15:30',
      category: 'Test Category',
      repeat: { type: 'none', interval: 1 },
      notificationTime: 10,
    },
    {
      id: '2',
      date: '2024-07-01',
      description: 'Test Event 2',
      location: 'Test Location 2',
      title: 'Test Event 2',
      startTime: '16:30',
      endTime: '20:30',
      category: 'Test Category 2',
      repeat: { type: 'none', interval: 1 },
      notificationTime: 10,
    },
  ];
  const currentDate = new Date('2024-07-01');
  const { result } = renderHook(() => useSearch(events, currentDate, 'week'));
  act(() => {
    result.current.setSearchTerm('');
  });
  expect(result.current.filteredEvents).toEqual(events);
});

it('검색어에 맞는 이벤트만 필터링해야 한다', () => {
  const events: Event[] = [
    {
      id: '1',
      date: '2024-07-01',
      description: 'Test Event 1',
      location: 'Test Location',
      title: 'Test Event',
      startTime: '14:30',
      endTime: '15:30',
      category: 'Test Category',
      repeat: { type: 'none', interval: 1 },
      notificationTime: 10,
    },
    {
      id: '2',
      date: '2024-07-01',
      description: 'Test Event 2',
      location: 'Test Location 2',
      title: 'Test Event 2',
      startTime: '16:30',
      endTime: '20:30',
      category: 'Test Category 2',
      repeat: { type: 'none', interval: 1 },
      notificationTime: 10,
    },
  ];
  const currentDate = new Date('2024-07-01');
  const { result } = renderHook(() => useSearch(events, currentDate, 'week'));
  act(() => {
    result.current.setSearchTerm('Test Event 1');
  });
  expect(result.current.filteredEvents).toEqual([events[0]]);
});

it('검색어가 제목, 설명, 위치 중 하나라도 일치하면 해당 이벤트를 반환해야 한다', () => {
  const events: Event[] = [
    {
      id: '1',
      date: '2024-07-01',
      description: 'Test Event 1',
      location: 'Test Location 1',
      title: 'Test Event',
      startTime: '14:30',
      endTime: '15:30',
      category: 'Test Category',
      repeat: { type: 'none', interval: 1 },
      notificationTime: 10,
    },
    {
      id: '2',
      date: '2024-07-01',
      description: 'Test Event 2',
      location: 'Test Location 2',
      title: 'Test Event 2',
      startTime: '16:30',
      endTime: '20:30',
      category: 'Test Category 2',
      repeat: { type: 'none', interval: 1 },
      notificationTime: 10,
    },
  ];
  const currentDate = new Date('2024-07-01');
  const { result } = renderHook(() => useSearch(events, currentDate, 'week'));
  act(() => {
    result.current.setSearchTerm('Test Location 1');
  });
  expect(result.current.filteredEvents).toEqual([events[0]]);
});

it('현재 뷰(주간/월간)에 해당하는 이벤트만 반환해야 한다', () => {
  const events: Event[] = [
    {
      id: '1',
      date: '2024-07-01',
      description: 'Test Event 1',
      location: 'Test Location 1',
      title: 'Test Event',
      startTime: '14:30',
      endTime: '15:30',
      category: 'Test Category',
      repeat: { type: 'none', interval: 1 },
      notificationTime: 10,
    },
    {
      id: '2',
      date: '2024-07-30',
      description: 'Test Event 2',
      location: 'Test Location 2',
      title: 'Test Event 2',
      startTime: '16:30',
      endTime: '20:30',
      category: 'Test Category 2',
      repeat: { type: 'none', interval: 1 },
      notificationTime: 10,
    },
  ];
  const currentDate = new Date('2024-07-01');
  const { result } = renderHook(() => useSearch(events, currentDate, 'week'));
  act(() => {
    result.current.setSearchTerm('Test Event 1');
  });
  expect(result.current.filteredEvents).toEqual([events[0]]);
});

it("검색어를 '회의'에서 '점심'으로 변경하면 필터링된 결과가 즉시 업데이트되어야 한다", () => {
  const events: Event[] = [
    {
      id: '1',
      date: '2024-07-01',
      description: 'Test Event 1',
      location: 'Test Location 1',
      title: '회의',
      startTime: '14:30',
      endTime: '15:30',
      category: 'Test Category',
      repeat: { type: 'none', interval: 1 },
      notificationTime: 10,
    },
    {
      id: '2',
      date: '2024-07-01',
      description: 'Test Event 2',
      location: 'Test Location 2',
      title: '점심',
      startTime: '16:30',
      endTime: '20:30',
      category: 'Test Category 2',
      repeat: { type: 'none', interval: 1 },
      notificationTime: 10,
    },
  ];
  const currentDate = new Date('2024-07-01');
  const { result } = renderHook(() => useSearch(events, currentDate, 'week'));
  act(() => {
    result.current.setSearchTerm('회의');
  });
  expect(result.current.filteredEvents).toEqual([events[0]]);
  act(() => {
    result.current.setSearchTerm('점심');
  });
  expect(result.current.filteredEvents).toEqual([events[1]]);
});
