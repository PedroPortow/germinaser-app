import api from './api';

const login = (email, password) => {
  return api.post('/auth/login', {
    auth: {
      email,
      password,
    },
  });
};

const register = (userData) => {
  return api.post('/auth/register', userData);
};

export default auth = {
  login,
  register,
};
