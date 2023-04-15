<!-- eslint-disable max-len -->
<template>
  <div class=" center">
    <div class="width padding-top">
        <h4 >学生登录</h4>
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item prop="email" label="邮箱">
            <el-input v-model="ruleForm2.email" ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="submitForm()">登录</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
            没有账户？<el-button type="primary" @click="toRegist">去注册</el-button>
            </el-form-item>

        </el-form>
    </div>
    </div>
</template>

<script>
// eslint-disable-next-line import/no-cycle
import student from '../api/student';
import clone from '../tool';

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass');
        }
        callback();
      }
    };
    function isEmail(s) {
      return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s);
    }
    const validateEmail = (rule, value, callback) => {
      if (!isEmail(value)) {
        callback(new Error('邮箱格式错误'));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        password: '',
        email: '',
      },
      rules2: {
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' },
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      const that = this;
      student.LoginSubmit(that.ruleForm2).then((res) => {
        if (res.status === 200) {
          that.$store.state.loginType = 'student';
          const data = clone(that.ruleForm2);
          that.$store.state.data = data;
          that.$router.push({ path: '/student/dashboard' });
          sessionStorage.setItem('loginType', 'student');
          sessionStorage.setItem('info', JSON.stringify(data));
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toRegist() {
      this.$router.push({ path: '/student/register' });
    },
  },
};
</script>
