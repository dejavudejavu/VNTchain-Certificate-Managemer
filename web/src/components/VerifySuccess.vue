<template>
  <div class=" padding-top center">
    <el-card class="width">
    <div class="text item">
        证书验证成功
    </div>
    <el-button type="primary" @click="toHomepage">回到主页</el-button>
    </el-card>
    </div>
</template>
<script>
export default {
  methods: {
    toHomepage() {
      this.$router.push({ path: '/homepage' });
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

</style>
