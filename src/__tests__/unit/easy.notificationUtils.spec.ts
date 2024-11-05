import { Event } from '../../types';
import { createNotificationMessage, getUpcomingEvents } from '../../utils/notificationUtils';

describe('getUpcomingEvents', () => {
  it('알림 시간이 정확히 도래한 이벤트를 반환한다', () => {
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
        description: 'Test Event',
        location: 'Test Location',
        title: 'Test Event',
        startTime: '15:00',
        endTime: '16:00',
        category: 'Test Category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 10,
      },
    ];
    const upcomingEvents = getUpcomingEvents(events, new Date('2024-07-01T14:20:00'), []);
    expect(upcomingEvents).toEqual([events[0]]);
  });

  it('이미 알림이 간 이벤트는 제외한다', () => {
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
        description: 'Test Event',
        location: 'Test Location',
        title: 'Test Event',
        startTime: '15:00',
        endTime: '16:00',
        category: 'Test Category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 30,
      },
    ];
    const testDate = new Date('2024-07-01T14:35:00');
    const upcomingEvents = getUpcomingEvents(events, testDate, ['1']);
    expect(upcomingEvents).toEqual([
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
        notificationTime: 30,
      },
    ]);
  });

  it('알림 시간이 아직 도래하지 않은 이벤트는 반환하지 않는다', () => {
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
        description: 'Test Event',
        location: 'Test Location',
        title: 'Test Event',
        startTime: '15:00',
        endTime: '16:00',
        category: 'Test Category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 10,
      },
    ];
    const upcomingEvents = getUpcomingEvents(events, new Date('2024-07-01T14:05:00'), []);
    expect(upcomingEvents).toEqual([]);
  });

  it('알림 시간이 지난 이벤트는 반환하지 않는다', () => {
    const events: Event[] = [
      {
        id: '1',
        date: '2024-07-01',
        description: 'Test Event',
        location: 'Test Location',
        title: 'Test Event',
        startTime: '14:00',
        endTime: '15:30',
        category: 'Test Category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 10,
      },
      {
        id: '2',
        date: '2024-07-01',
        description: 'Test Event',
        location: 'Test Location',
        title: 'Test Event',
        startTime: '14:30',
        endTime: '16:00',
        category: 'Test Category',
        repeat: { type: 'none', interval: 1 },
        notificationTime: 10,
      },
    ];
    const upcomingEvents = getUpcomingEvents(events, new Date('2024-07-01T14:45:00'), []);
    expect(upcomingEvents).toEqual([]);
  });
});

describe('createNotificationMessage', () => {
  it('올바른 알림 메시지를 생성해야 한다', () => {
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
    const notificationMessage = createNotificationMessage(event);
    expect(notificationMessage).toBe('10분 후 Test Event 일정이 시작됩니다.');
  });
});
