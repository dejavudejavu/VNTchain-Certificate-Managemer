<!-- eslint-disable max-len -->
<template>
    <div style="z-index: 100;">
        <el-menu
            :default-active="activeIndex2"
            key="0"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="6">主页</el-menu-item>
            <el-menu-item index="1" v-if="loginType!==''">看板</el-menu-item>
            <el-menu-item index="5">验证</el-menu-item>
            <el-menu-item index="3"
            v-if="loginType==='university'">颁发</el-menu-item>
            <el-submenu index="2" v-if="loginType===''">
            <template slot="title">登录</template>
            <el-menu-item index="2-1">学生</el-menu-item>
            <el-menu-item index="2-2">大学</el-menu-item>
            </el-submenu>
            <el-menu-item index="4" v-if="loginType!==''" >退出</el-menu-item>
           <div class = " info el-submenu" v-if="loginType!==''">{{ email}}</div>
        </el-menu>
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%">
        <span>确定退出吗</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="logout">确 定</el-button>
        </span>
      </el-dialog>
    </div>

</template>

<script>
export default {
  name: 'NacBar',
  data() {
    return {
      path: '',
      root: '',
      loginType: '',
      activeIndex2: '1',
      dialogVisible: false,
      email: '',
    };
  },
  mounted() {
    [, this.root] = this.$route.path.split('/');
    try {
      this.email = this.$store.state.data.email;
      this.loginType = this.$store.state.loginType;
    } catch (e) {
      console.log('e: ', e);
    }
  },
  methods: {
    handleSelect(key) {
      if (key === '4') {
        this.dialogVisible = true;
      } else {
        let path;
        switch (key) {
          case '1':
            if (this.loginType === 'student') {
              path = '/student/dashboard';
            } else {
              path = '/university/dashboard';
            }
            break;
          case '3':
            path = '/university/issue';
            break;
          case '2-1':
            path = '/student/login';
            break;
          case '2-2':
            path = '/university/login';
            break;
          case '5':
            path = '/verify';
            break;
          case '6':
            path = '/homepage';
            break;
          default:
            break;
        }
        this.$router.push({ path });
      }
    },
    logout() {
      this.dialogVisible = false;
      this.$store.state.loginType = '';
      this.$store.state.data = null;
      sessionStorage.setItem('info', '');
      sessionStorage.setItem('loginType', '');
      this.$router.push({ path: '/homepage' });
    },
  },
  computed: {
    loginStatus() {
      return this.$store.state.loginType;
    },
  },
  watch: {
    loginStatus(newVal) {
      console.log('newVal: ', newVal);
      this.loginType = newVal;
      this.email = this.$store.state.data.email;
      console.log('this.email : ', this.email);
    },
    $route(to) {
      switch (to.path) {
        case '/student/dashboard':
        case '/university/dashboard':
          this.activeIndex2 = '1';
          break;
        case '/university/issue':
          this.activeIndex2 = '3';
          break;
        case '/student/login':
          this.activeIndex2 = '2-1';
          break;
        case '/university/login':
          this.activeIndex2 = '2-2';
          break;
        case '/verify':
          this.activeIndex2 = '5';
          break;
        case '/homepage':
          this.activeIndex2 = '6';
          break;
        default:
          break;
      }
    },
  },
};
</script>
<style>
.info{
  line-height: 60px;
  color: white;
  font-size: 14px;
  float: right !important;
  padding: 0 20px;
}
</style>
