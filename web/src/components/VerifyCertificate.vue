<!-- eslint-disable max-len -->
<template>
  <div class=" center">
    <div class="width padding-top">
        <h4 >验证证书真实性</h4>
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="请输入证明">
            <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="onSubmit">验证</el-button>
            </el-form-item>
        </el-form>
    </div>
  </div>

</template>

<script>
// eslint-disable-next-line import/no-cycle
import common from '../api/common';

export default {
  data() {
    return {
      form: {
        desc: '',
      },
    };
  },
  methods: {
    onSubmit() {
      console.log('this.form.desc: ', this.form.desc);
      common.Verify({ proofObject: this.form.desc }).then((res) => {
        if (res.status === 200) {
          let path;
          if (res.data === 'verify-success') {
            path = '/verify-success';
          } else {
            path = '/verify-fail';
          }
          this.$router.push({ path });
        }
      });
    },
  },
};
</script>
