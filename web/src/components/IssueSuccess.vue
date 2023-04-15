<template>
  <div class="padding-top center">
    <el-card class="width">
    <div class="text item">
        证书颁发成功
    </div>
    <el-button type="primary" @click="toDashboard">回到看板</el-button>
    </el-card>
    </div>

</template>
<script>
export default {
  methods: {
    toDashboard() {
      this.$router.push({ path: '/university/dashboard' });
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
