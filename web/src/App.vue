<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <NavBar></NavBar>
    <router-view  :key="key"></router-view>

    <!-- <IssueSuccess></IssueSuccess> -->
    <!-- <IssueUniversity></IssueUniversity> -->
    <!-- <HomePage></HomePage> -->
    <!-- <DasboardStudent></DasboardStudent> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
import NavBar from './components/NavBar.vue';
// import IssueSuccess from './components/IssueSuccess.vue';
// import IssueUniversity from './components/IssueUniversity.vue';
// import HomePage from './components/HomePage.vue';
// import DasboardStudent from './components/DashboardStudent.vue';

export default {
  name: 'App',
  components: {
    // HelloWorld,
    NavBar,
    // IssueSuccess,
    // IssueUniversity,
    // HomePage,
    // DasboardStudent,
  },
  mounted() {

  },
  computed: {
    key() {
      return this.$route.path + Math.random();
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
