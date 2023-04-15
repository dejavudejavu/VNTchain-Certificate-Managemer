// const Axios = require('../config'); // 导入配置好的axios文件

// console.log('Axios: ', Axios);
import Axios from '../config';

const root = '/student';

function Dashboard(data) {
  return Axios({
    url: `${root}/dashboard`,
    method: 'get',
    params: data,
  });
}

function Logout(data) {
  return Axios({
    url: `${root}/logout`,
    method: 'get',
    data,
  });
}

function RegisterSubmit(data) {
  return Axios({
    url: `${root}/register/submit`,
    method: 'post',
    data,
  });
}

function LoginSubmit(data) {
  return Axios({
    url: `${root}/login/submit`,
    method: 'post',
    data,
  });
}

export default {
  Dashboard,
  Logout,
  RegisterSubmit,
  LoginSubmit,
};
