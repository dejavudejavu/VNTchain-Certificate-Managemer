import Axios from '../config';// 导入配置好的axios文件

const root = '/university';

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
    params: data,
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

function Issue(data) {
  return Axios({
    url: `${root}/issue`,
    method: 'post',
    data,
  });
}

export default {
  Dashboard,
  Logout,
  RegisterSubmit,
  LoginSubmit,
  Issue,
};
