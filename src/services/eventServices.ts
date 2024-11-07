import axios from 'axios';

export const eventService = {
  getEvents: async () => {
    const response = await axios.get('/api/events');
    return response.data;
  },
  createEvent: async (eventData: Omit<Event, 'id'>) => {
    const response = await axios.post('/api/events', eventData);
    return response.data;
  },

  updateEvent: async (id: string, eventData: Partial<Event>) => {
    const response = await axios.put(`/api/events/${id}`, eventData);
    return response.data;
  },

  deleteEvent: async (id: string) => {
    await axios.delete(`/api/events/${id}`);
  },
};
