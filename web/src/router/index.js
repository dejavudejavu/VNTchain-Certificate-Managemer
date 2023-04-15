import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';

// import NavBar from '../components/NavBar.vue';
import DasboardStudent from '../components/DashboardStudent.vue';
import DashboardUniversity from '../components/DashboardUniversity.vue';
import HomePage from '../components/HomePage.vue';
import IssueSuccess from '../components/IssueSuccess.vue';
import IssueUniversity from '../components/IssueUniversity.vue';
import LoginStudent from '../components/LoginStudent.vue';
import LoginUniversity from '../components/LoginUniversity.vue';
import RegisterStudent from '../components/RegisterStudent.vue';
import RegisterUniversity from '../components/RegisterUniversity.vue';
import RegisterSuccess from '../components/RegisterSuccess.vue';
import VerifyCertificate from '../components/VerifyCertificate.vue';
import VerifyFail from '../components/VerifyFail.vue';
import VerifySuccess from '../components/VerifySuccess.vue';
import HandleError from '../components/HandleError.vue';

Vue.use(VueRouter);
// 获取原型对象上的push函数
const originalPush = VueRouter.prototype.push;
// 修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
// console.log('router: ', router);

const routes = [
  {
    path: '/',
    redirect: '/homepage',
  },
  {
    path: '/homepage',
    component: HomePage,
  },
  {
    path: '/student/register',
    component: RegisterStudent,
  },
  {
    path: '/student/login',
    component: LoginStudent,
  },
  {
    path: '/student/dashboard',
    component: DasboardStudent,
  },
  {
    path: '/verify',
    component: VerifyCertificate,
  },
  {
    path: '/student/register-success',
    component: RegisterSuccess,
  },
  {
    path: '/verify-success',
    component: VerifySuccess,
  },
  {
    path: '/verify-fail',
    component: VerifyFail,
  },
  {
    path: '/university/register',
    component: RegisterUniversity,
  },
  {
    path: '/university/login',
    component: LoginUniversity,
  },
  {
    path: '/university/dashboard',
    component: DashboardUniversity,
  },
  {
    path: '/university/issue',
    component: IssueUniversity,
  },
  {
    path: '/university/register-success',
    component: RegisterSuccess,
  },
  {
    path: '/university/issue-success',
    component: IssueSuccess,
  },
  {
    path: '/error',
    name: 'error',
    component: HandleError,
  },

];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  // console.log('to, from, next: ', to, from, next);
  if (to.matched.length === 0) {
    router.push({
      name: 'error',
      params: {
        err: '无效地址',
      },
    });
  } else {
    switch (to.path) {
      case '/student/dashboard':
        if (store.state.loginType !== 'student') {
          router.push({
            name: 'error',
            params: {
              err: '未登录',
            },
          });
        }
        break;
      case '/university/dashboard':
      case '/university/issue':
      case '/university/issue-success':
        if (store.state.loginType !== 'university') {
          router.push({
            name: 'error',
            params: {
              err: '未登录',
            },
          });
        }
        break;
      default:
        break;
    }
    next();
  }
});

export default router;
