import axios from '@/libs/api.request';

export const login = ({ userName, password }) => {
  const data = {
    userName,
    password
  };
  return axios.request({
    url: 'login',
    data,
    method: 'post'
  });
};

export const getUserInfo = token => {
  return axios.request({
    url: '/user/profile',
    method: 'get'
  });
};

export const logout = token => {
  return axios.request({
    url: '/logout2',
    method: 'get'
  });
};
