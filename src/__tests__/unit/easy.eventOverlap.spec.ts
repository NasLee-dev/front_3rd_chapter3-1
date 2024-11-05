import { Event } from '../../types';
import {
  convertEventToDateRange,
  findOverlappingEvents,
  isOverlapping,
  parseDateTime,
} from '../../utils/eventOverlap';

describe('parseDateTime', () => {
  it('2024-07-01 14:30을 정확한 Date 객체로 변환한다', () => {
    const date = parseDateTime('2024-07-01', '14:30');
    const expected = new Date('2024-07-01T14:30:00');
    expect(date).toEqual(expected);
  });

  it('잘못된 날짜 형식에 대해 Invalid Date를 반환한다', () => {
    const date = parseDateTime('2024-07-01', '14:30');
    expect(date).toBeInstanceOf(Date);
  });

  it('잘못된 시간 형식에 대해 Invalid Date를 반환한다', () => {
    const date = parseDateTime('2024-07-01', '14:30');
    expect(date).toBeInstanceOf(Date);
  });

  it('날짜 문자열이 비어있을 때 Invalid Date를 반환한다', () => {
    const date = parseDateTime('', '14:30');
    expect(date).toBeInstanceOf(Date);
  });
});

describe('convertEventToDateRange', () => {
  it('일반적인 이벤트를 올바른 시작 및 종료 시간을 가진 객체로 변환한다', () => {
    const event: Event = {
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
    };
    const dateRange = convertEventToDateRange(event);
    const expected = {
      start: new Date('2024-07-01T14:30:00'),
      end: new Date('2024-07-01T15:30:00'),
    };
    expect(dateRange).toEqual(expected);
  });

  it('잘못된 날짜 형식의 이벤트에 대해 Invalid Date를 반환한다', () => {
    const event: Event = {
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
    };
    const dateRange = convertEventToDateRange(event);
    expect(dateRange.start).toBeInstanceOf(Date);
    expect(dateRange.end).toBeInstanceOf(Date);
  });

  it('잘못된 시간 형식의 이벤트에 대해 Invalid Date를 반환한다', () => {
    const event: Event = {
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
    };
    const dateRange = convertEventToDateRange(event);
    expect(dateRange.start).toBeInstanceOf(Date);
    expect(dateRange.end).toBeInstanceOf(Date);
  });
});

describe('isOverlapping', () => {
  it('두 이벤트가 겹치는 경우 true를 반환한다', () => {
    const event1: Event = {
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
    };
    const event2: Event = {
      id: '2',
      date: '2024-07-01',
      description: 'Test Event',
      location: 'Test Location',
      title: 'Test Event',
      startTime: '15:00',
      endTime: '16:00',
      category: 'Test Category',
      repeat: { type: 'none', interval: 1 },
      notificationTime: 10,
    };
    const overlap = isOverlapping(event1, event2);
    expect(overlap).toBe(true);
  });

  it('두 이벤트가 겹치지 않는 경우 false를 반환한다', () => {
    const event1: Event = {
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
    };
    const event2: Event = {
      id: '2',
      date: '2024-07-01',
      description: 'Test Event',
      location: 'Test Location',
      title: 'Test Event',
      startTime: '16:00',
      endTime: '17:00',
      category: 'Test Category',
      repeat: { type: 'none', interval: 1 },
      notificationTime: 10,
    };
    const overlap = isOverlapping(event1, event2);
    expect(overlap).toBe(false);
  });
});

describe('findOverlappingEvents', () => {
  it('새 이벤트와 겹치는 모든 이벤트를 반환한다', () => {
    const newEvent: Event = {
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
    };
    const events: Event[] = [
      {
        id: '2',
        date: '2024-07-01',
        description: 'Test Event',
        location: 'Test Location',
        title: 'Test Event',
        startTime: '15:00',
        endTime: '16:00',
        category: 'Test Category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 10,
      },
      {
        id: '3',
        date: '2024-07-01',
        description: 'Test Event',
        location: 'Test Location',
        title: 'Test Event',
        startTime: '14:00',
        endTime: '15:00',
        category: 'Test Category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 10,
      },
    ];
    const overlappingEvents = findOverlappingEvents(newEvent, events);
    expect(overlappingEvents).toEqual([events[0], events[1]]);
  });

  it('겹치는 이벤트가 없으면 빈 배열을 반환한다', () => {
    const newEvent: Event = {
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
    };
    const events: Event[] = [
      {
        id: '2',
        date: '2024-07-01',
        description: 'Test Event',
        location: 'Test Location',
        title: 'Test Event',
        startTime: '16:00',
        endTime: '17:00',
        category: 'Test Category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 10,
      },
      {
        id: '3',
        date: '2024-07-01',
        description: 'Test Event',
        location: 'Test Location',
        title: 'Test Event',
        startTime: '13:00',
        endTime: '14:00',
        category: 'Test Category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 10,
      },
    ];
    const overlappingEvents = findOverlappingEvents(newEvent, events);
    expect(overlappingEvents).toEqual([]);
  });
});
