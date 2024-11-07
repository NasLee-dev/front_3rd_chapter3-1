import { Box, Flex, useToast } from '@chakra-ui/react';
import { useState } from 'react';

import { CalendarGrid } from './components/calendar/CalendarGrid.tsx';
import { EventForm } from './components/event/EventForm.tsx';
import { EventList } from './components/event/EventList.tsx';
import { EventOverlapDialog } from './components/event/EventOverlapDialog.tsx';
import { NotificationList } from './components/notification/NotificationList.tsx';
import { useCalendarView } from './hooks/useCalendarView.ts';
import { useEventForm } from './hooks/useEventForm.ts';
import { useEventOperations } from './hooks/useEventOperation.ts';
import { useNotifications } from './hooks/useNotifications.ts';
import { useSearch } from './hooks/useSearch.ts';
import { Event, EventFormProps } from './types';
import { EventCategory } from './types/event.ts';
import { findOverlappingEvents } from './utils/eventOverlap.ts';

function App() {
  const {
    title,
    setTitle,
    date,
    setDate,
    startTime,
    endTime,
    description,
    setDescription,
    location,
    setLocation,
    category,
    setCategory,
    isRepeating,
    setIsRepeating,
    repeatType,
    setRepeatType,
    repeatInterval,
    setRepeatInterval,
    repeatEndDate,
    setRepeatEndDate,
    notificationTime,
    setNotificationTime,
    startTimeError,
    endTimeError,
    editingEvent,
    setEditingEvent,
    handleStartTimeChange,
    handleEndTimeChange,
    resetForm,
    editEvent,
  } = useEventForm();

  const { events, saveEvent, deleteEvent } = useEventOperations(Boolean(editingEvent), () =>
    setEditingEvent(null)
  );

  const { notifications, setNotifications } = useNotifications(events);
  const { view, setView, currentDate, navigate } = useCalendarView();
  const { searchTerm, filteredEvents, setSearchTerm } = useSearch(events, currentDate, view);

  const [isOverlapDialogOpen, setIsOverlapDialogOpen] = useState(false);
  const [overlappingEvents, setOverlappingEvents] = useState<Event[]>([]);

  const toast = useToast();

  const addOrUpdateEvent = async () => {
    if (!title || !date || !startTime || !endTime) {
      console.log(title, date, startTime, endTime);
      toast({
        title: '필수 정보를 모두 입력해주세요.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (startTimeError || endTimeError) {
      toast({
        title: '시간 설정을 확인해주세요.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const eventData: Event | EventFormProps = {
      id: editingEvent ? editingEvent.id : '',
      title,
      date,
      startTime,
      endTime,
      description,
      location,
      category: category as EventCategory,
      repeat: {
        type: isRepeating ? repeatType : 'none',
        interval: repeatInterval,
        endDate: repeatEndDate || undefined,
      },
      notificationTime,
    };

    const overlapping = findOverlappingEvents(eventData, events);
    if (overlapping.length > 0) {
      setOverlappingEvents(overlapping);
      setIsOverlapDialogOpen(true);
    } else {
      await saveEvent(eventData);
      resetForm();
    }
  };

  return (
    <Box w="full" h="100vh" m="auto" p={5}>
      <Flex gap={6} h="full">
        <EventForm
          title={title}
          setTitle={setTitle}
          date={date}
          setDate={setDate}
          startTime={startTime}
          endTime={endTime}
          description={description}
          setDescription={setDescription}
          location={location}
          setLocation={setLocation}
          category={category}
          setCategory={setCategory}
          isRepeating={isRepeating}
          setIsRepeating={setIsRepeating}
          repeatType={repeatType}
          setRepeatType={setRepeatType}
          repeatInterval={repeatInterval}
          setRepeatInterval={setRepeatInterval}
          repeatEndDate={repeatEndDate}
          setRepeatEndDate={setRepeatEndDate}
          notificationTime={notificationTime}
          setNotificationTime={setNotificationTime}
          timeErrors={{ startTimeError, endTimeError }}
          editingEvent={editingEvent}
          onSubmit={addOrUpdateEvent}
          handleEndTimeChange={handleEndTimeChange}
          handleStartTimeChange={handleStartTimeChange}
        />

        {/* 캘린더 그리드  */}
        <CalendarGrid
          currentDate={currentDate}
          view={view}
          events={events}
          onEventClick={editEvent}
          onViewChange={setView}
          onNavigate={navigate}
        />
        <EventList
          events={filteredEvents}
          onEdit={editEvent}
          onDelete={deleteEvent}
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
        />
      </Flex>

      <EventOverlapDialog
        isOpen={isOverlapDialogOpen}
        onClose={() => setIsOverlapDialogOpen(false)}
        overlappingEvents={overlappingEvents}
        onConfirm={() => {
          if (editingEvent) {
            saveEvent({
              ...editingEvent,
              id: editingEvent.id,
              title: editingEvent.title || '',
              date: editingEvent.date || '',
              startTime: editingEvent.startTime || '',
              endTime: editingEvent.endTime || '',
              description: editingEvent.description || '',
              location: editingEvent.location || '',
              category: editingEvent.category,
              repeat: editingEvent.repeat,
              notificationTime: editingEvent.notificationTime,
            });
            resetForm();
            setIsOverlapDialogOpen(false);
          }
          resetForm();
          setIsOverlapDialogOpen(false);
        }}
      />

      <NotificationList
        notifications={notifications}
        onClose={(index) => {
          setNotifications((prev) => prev.filter((_, i) => i !== index));
        }}
      />
    </Box>
  );
}

export default App;
