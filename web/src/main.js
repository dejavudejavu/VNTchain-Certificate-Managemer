/* eslint-disable import/no-extraneous-dependencies */
import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App.vue';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import store from './store/index';
// import Axios from './api/config';

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  // Axios,
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
