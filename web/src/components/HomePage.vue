<template>
  <div>
    <div class = "center padding-top">
      <el-card class="width">
      <div slot="header" class="clearfix">
          <span class="bold">基于区块链技术的大学学历证书管理系统</span>
      </div>
      <div>
          本网站是基于vnt-chain的大学学历证书管理系统
          <div class="padding-top">
            <el-button type="primary" @click="HandleClick(4)">去验证</el-button>
          </div>
      </div>
      </el-card>
    </div>
<div class = "center padding-top">
    <el-card class="width">
    <div slot="header" class="clearfix">
        <span  class="bold">学生</span>
    </div>
    <div>
        学生可以使用本平台管理和分享自己的证书
    </div>
    <div class="padding-top">
      <el-button type="primary" @click="HandleClick(0)">登录</el-button>
      <el-button type="primary" @click="HandleClick(1)">注册</el-button>
    </div>
    </el-card>
</div>
<div class = "center padding-top">
    <el-card class="width">
    <div slot="header" class="clearfix">
        <span  class="bold">大学</span>
    </div>
    <div>
        大学可以使用本平台将证书颁发给学生
    </div>
    <div class="padding-top">
      <el-button type="primary" @click="HandleClick(2)">登录</el-button>
      <el-button type="primary" @click="HandleClick(3)">注册</el-button>
    </div>
    </el-card>
</div>

  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  methods: {
    HandleClick(action) {
      let path;
      switch (action) {
        case 0:
          path = '/student/login';
          break;
        case 1:
          path = '/student/register';
          break;
        case 2:
          path = '/university/login';
          break;
        case 3:
          path = '/university/register';
          break;
        case 4:
          path = '/verify';
          break;
        default:
          break;
      }
      this.$router.push({ path });
    },
  },
};

</script>
<style >
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .width {
    width: 50%;
  }
  .center{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .padding-top{
    padding-top: 20px;
  }
  .bold{
    font-weight: bold;
  }
</style>
