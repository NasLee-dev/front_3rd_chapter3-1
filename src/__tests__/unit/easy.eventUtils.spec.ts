import { Event } from '../../types';
import { getFilteredEvents } from '../../utils/eventUtils';

describe('getFilteredEvents', () => {
  it("검색어 '이벤트 2'에 맞는 이벤트만 반환한다", () => {
    const events: Event[] = [
      {
        id: '1',
        date: '2024-07-01',
        description: 'Test Event 1',
        location: 'Test Location',
        title: 'Test Event 1',
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
        location: 'Test Location',
        title: '이벤트 2',
        startTime: '15:00',
        endTime: '16:00',
        category: 'Test Category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 10,
      },
    ];
    const testDate = new Date('2024-07-01');
    const matchingEvents = getFilteredEvents(events, '이벤트 2', testDate, 'week');
    expect(matchingEvents).toEqual([events[1]]);
  });

  it('주간 뷰에서 2024-07-01 주의 이벤트만 반환한다', () => {
    const events: Event[] = [
      {
        id: '1',
        date: '2024-06-25',
        description: 'Test Event 1',
        location: 'Test Location',
        title: 'Test Event 1',
        startTime: '14:30',
        endTime: '15:30',
        category: 'Test Category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 10,
      },
      {
        id: '2',
        date: '2024-07-01',
        description: 'Test Event 1',
        location: 'Test Location',
        title: 'Test Event 1',
        startTime: '15:00',
        endTime: '16:00',
        category: 'Test Category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 10,
      },
    ];
    const testDate = new Date('2024-07-01');
    const matchingEvents = getFilteredEvents(events, 'Test Event 1', testDate, 'week');
    expect(matchingEvents).toEqual([events[1]]);
  });

  it('월간 뷰에서 2024년 7월의 모든 이벤트를 반환한다', () => {
    const events: Event[] = [
      {
        id: '1',
        date: '2024-06-25',
        description: 'Test Event 1',
        location: 'Test Location',
        title: 'Test Event 1',
        startTime: '14:30',
        endTime: '15:30',
        category: 'Test Category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 10,
      },
      {
        id: '2',
        date: '2024-07-01',
        description: 'Test Event 1',
        location: 'Test Location',
        title: 'Test Event 1',
        startTime: '15:00',
        endTime: '16:00',
        category: 'Test Category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 10,
      },
    ];
    const testDate = new Date('2024-07-01');
    const matchingEvents = getFilteredEvents(events, 'Test Event 1', testDate, 'month');
    expect(matchingEvents).toEqual([events[1]]);
  });

  it("검색어 '이벤트'와 주간 뷰 필터링을 동시에 적용한다", () => {
    const events: Event[] = [
      {
        id: '1',
        date: '2024-06-25',
        description: 'Test Event 1',
        location: 'Test Location',
        title: 'Test Event 1',
        startTime: '14:30',
        endTime: '15:30',
        category: 'Test Category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 10,
      },
      {
        id: '2',
        date: '2024-07-01',
        description: 'Test Event 1',
        location: 'Test Location',
        title: 'Test Event 1',
        startTime: '15:00',
        endTime: '16:00',
        category: 'Test Category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 10,
      },
      {
        id: '3',
        date: '2024-07-01',
        description: 'Test Event 2',
        location: 'Test Location',
        title: '이벤트 2',
        startTime: '15:00',
        endTime: '16:00',
        category: 'Test Category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 10,
      },
    ];
    const testDate = new Date('2024-07-01');
    const matchingEvents = getFilteredEvents(events, '이벤트', testDate, 'week');
    expect(matchingEvents).toEqual([events[2]]);
  });

  it('검색어가 없을 때 모든 이벤트를 반환한다', () => {
    const events: Event[] = [
      {
        id: '1',
        date: '2024-06-25',
        description: 'Test Event 1',
        location: 'Test Location',
        title: 'Test Event 1',
        startTime: '14:30',
        endTime: '15:30',
        category: 'Test Category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 10,
      },
      {
        id: '2',
        date: '2024-07-01',
        description: 'Test Event 1',
        location: 'Test Location',
        title: 'Test Event 1',
        startTime: '15:00',
        endTime: '16:00',
        category: 'Test Category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 10,
      },
      {
        id: '3',
        date: '2024-07-01',
        description: 'Test Event 2',
        location: 'Test Location',
        title: '이벤트 2',
        startTime: '15:00',
        endTime: '16:00',
        category: 'Test Category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 10,
      },
    ];
    const testDate = new Date('2024-07-01');
    const matchingEvents = getFilteredEvents(events, '', testDate, 'week');
    expect(matchingEvents).toEqual([events[1], events[2]]);
  });

  it('검색어가 대소문자를 구분하지 않고 작동한다', () => {
    const events: Event[] = [
      {
        id: '1',
        date: '2024-06-25',
        description: 'Test Event 1',
        location: 'Test Location',
        title: 'Test Event 1',
        startTime: '14:30',
        endTime: '15:30',
        category: 'Test Category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 10,
      },
      {
        id: '2',
        date: '2024-07-01',
        description: 'Test Event 1',
        location: 'Test Location',
        title: 'Test Event 1',
        startTime: '15:00',
        endTime: '16:00',
        category: 'Test Category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 10,
      },
      {
        id: '3',
        date: '2024-07-01',
        description: 'Test Event 2',
        location: 'Test Location',
        title: '이벤트 2',
        startTime: '15:00',
        endTime: '16:00',
        category: 'Test Category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 10,
      },
    ];
    const testDate = new Date('2024-07-01');
    const matchingEvents = getFilteredEvents(events, '이벤트', testDate, 'week');
    expect(matchingEvents).toEqual([events[2]]);
  });

  it('월의 경계에 있는 이벤트를 올바르게 필터링한다', () => {
    const events: Event[] = [
      {
        id: '1',
        date: '2024-06-25',
        description: 'Test Event 1',
        location: 'Test Location',
        title: 'Test Event 1',
        startTime: '14:30',
        endTime: '15:30',
        category: 'Test Category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 10,
      },
      {
        id: '2',
        date: '2024-07-01',
        description: 'Test Event 1',
        location: 'Test Location',
        title: 'Test Event 1',
        startTime: '15:00',
        endTime: '16:00',
        category: 'Test Category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 10,
      },
    ];
    const testDate = new Date('2024-07-01');
    const matchingEvents = getFilteredEvents(events, 'Test Event 1', testDate, 'month');
    expect(matchingEvents).toEqual([events[1]]);
  });

  it('빈 이벤트 리스트에 대해 빈 배열을 반환한다', () => {
    const events: Event[] = [];
    const testDate = new Date('2024-07-01');
    const matchingEvents = getFilteredEvents(events, 'Test Event 1', testDate, 'week');
    expect(matchingEvents).toEqual([]);
  });
});
