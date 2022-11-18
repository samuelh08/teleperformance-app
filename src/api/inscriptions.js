import http from './http';

// Interaction with API to create an inscription to an event
export function createInscription(payload) {
  return http.post('/inscriptions', payload).then((response) => {
    const { data: json } = response;
    return {
      data: json.data,
    };
  });
}
