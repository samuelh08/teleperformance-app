import http from './http';

// Interaction with API to login with an existing user
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

// Interaction with API to create an user
export function signup(payload) {
  return http.post('/users/signup', payload).then((response) => {
    const { data: json } = response;

    return {
      data: json.data,
    };
  });
}
