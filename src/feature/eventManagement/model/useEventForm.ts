import { useEventEdit } from './useEventEdit';
import { useEventFormBasic } from './useEventFormBasic';
import { useEventNotification } from './useEventNotification';
import { useEventRepeat } from './useEventRepeat';
import { useEventTime } from './useEventTime';
import { Event } from '../../../types';
import { EventForm } from '../types';

export const useEventForm = (initialEvent?: Event) => {
  const basicForm = useEventFormBasic(initialEvent);
  const timeForm = useEventTime(initialEvent);
  const repeatForm = useEventRepeat(initialEvent);
  const notificationForm = useEventNotification(initialEvent);

  const updateFormData = (event: Event) => {
    basicForm.setTitle(event.title);
    basicForm.setDate(event.date);
    basicForm.setDescription(event.description);
    basicForm.setLocation(event.location);
    basicForm.setCategory(event.category);

    timeForm.setStartTime(event.startTime);
    timeForm.setEndTime(event.endTime);

    repeatForm.setIsRepeating(event.repeat.type !== 'none');
    repeatForm.setRepeatType(event.repeat.type);
    repeatForm.setRepeatInterval(event.repeat.interval);
    repeatForm.setRepeatEndDate(event.repeat.endDate || '');

    notificationForm.setNotificationTime(event.notificationTime);
  };
  const { editingEvent, setEditingEvent, editEvent } = useEventEdit({
    onEventEdit: updateFormData,
  });

  const resetBasicForm = () => {
    basicForm.setTitle('');
    basicForm.setDate('');
    basicForm.setDescription('');
    basicForm.setLocation('');
    basicForm.setCategory('');
  };

  const resetTimeForm = () => {
    timeForm.setStartTime('');
    timeForm.setEndTime('');
  };

  const resetRepeatForm = () => {
    repeatForm.setIsRepeating(false);
    repeatForm.setRepeatType('none');
    repeatForm.setRepeatInterval(1);
    repeatForm.setRepeatEndDate('');
  };

  const resetNotificationForm = () => {
    notificationForm.setNotificationTime(10);
  };

  const resetForm = () => {
    resetBasicForm();
    resetTimeForm();
    resetRepeatForm();
    resetNotificationForm();
    setEditingEvent(null);
  };

  const getFormData = (): EventForm => ({
    title: basicForm.title,
    date: basicForm.date,
    startTime: timeForm.startTime,
    endTime: timeForm.endTime,
    description: basicForm.description,
    location: basicForm.location,
    category: basicForm.category,
    repeat: {
      type: repeatForm.repeatType,
      interval: repeatForm.repeatInterval,
      endDate: repeatForm.repeatEndDate,
    },
    notificationTime: notificationForm.notificationTime,
  });

  const isFormValid = (): boolean => {
    return (
      basicForm.title.trim() !== '' &&
      basicForm.date !== '' &&
      timeForm.startTime !== '' &&
      timeForm.endTime !== '' &&
      !timeForm.startTimeError &&
      !timeForm.endTimeError
    );
  };

  return {
    ...basicForm,
    ...timeForm,
    ...repeatForm,
    ...notificationForm,
    editingEvent,
    setEditingEvent,
    editEvent,
    resetForm,
    getFormData,
    isFormValid,
  };
};
