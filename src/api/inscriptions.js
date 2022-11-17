import http from './http';

export function createInscription(payload) {
  return http.post('/inscriptions', payload).then((response) => {
    const { data: json } = response;
    return {
      data: json.data,
    };
  });
}
