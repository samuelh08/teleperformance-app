import http from './http';

// Interaction with API to create an event
export function createEvent({ date }) {
  return http.post('/events', { date }).then((response) => {
    const { data: json } = response;
    return {
      data: json.data,
    };
  });
}

// Interaction with API to update an event
export function updateEvent({ id, date }) {
  return http.put(`/events/${id}`, { date }).then((response) => {
    const { data: json } = response;
    return {
      data: json.data,
    };
  });
}

// Interaction with API to read all events
export function getEvents() {
  return http.get('/events').then((response) => {
    const { data: json } = response;
    return {
      data: json,
    };
  });
}

// Interaction with API to read an event
export function getEvent(id) {
  return http.get(`/events/${id}`).then((response) => {
    const { data: json } = response;
    return {
      data: json.data,
    };
  });
}
