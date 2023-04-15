<template>
  <div class="padding-top center">
    <el-card class="width">
    <div class="text item">
        注册成功
    </div>
    <el-button type="primary" @click="toLogin">去登录</el-button>
    </el-card>
    </div>

</template>
<script>
export default {
  methods: {
    toLogin() {
      let url = this.$route.path;
      url = url.split('/').filter((element) => element !== '');
      this.$router.push({ path: `/${url[0]}/login` });
    },
  },
};
</script>
<style>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }
</style>
