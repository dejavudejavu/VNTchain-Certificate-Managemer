import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// eslint-disable-next-line prefer-const
let loginType = sessionStorage.getItem('loginType');
let data = null;
if (loginType) {
  data = JSON.parse(sessionStorage.getItem('info'));
}
console.log('loginType: ', loginType);
console.log('data: ', data);

// 用来存储数据
const state = {
  loginType,
  data,
};
// 响应组件中的事件
const actions = {

};
// 操作数据
const mutations = {

};
// 用来将state数据进行加工
const getters = {

};
// 新建并暴露store
export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
});
