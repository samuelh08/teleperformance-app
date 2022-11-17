import http from './http';

export function createEvent({ date }) {
  return http.post('/events', { date }).then((response) => {
    const { data: json } = response;
    return {
      data: json.data,
    };
  });
}

export function updateEvent({ id, date }) {
  return http.put(`/events/${id}`, { date }).then((response) => {
    const { data: json } = response;
    return {
      data: json.data,
    };
  });
}

export function getEvents() {
  return http.get('/events').then((response) => {
    const { data: json } = response;
    return {
      data: json,
    };
  });
}

export function getEvent(id) {
  return http.get(`/events/${id}`).then((response) => {
    const { data: json } = response;
    return {
      data: json.data,
    };
  });
}
