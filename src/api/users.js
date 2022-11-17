import http from './http';

export function login({ employeeId, password }) {
  return http
    .post('/users/login', { employeeId, password })
    .then((response) => {
      const { data: json } = response;

      // save token in local storage
      if (json.meta?.token) {
        localStorage.setItem('token', json.meta.token);
      }

      return {
        data: json.data,
      };
    });
}

export function signup(payload) {
  return http.post('/users/signup', payload).then((response) => {
    const { data: json } = response;

    return {
      data: json.data,
    };
  });
}
