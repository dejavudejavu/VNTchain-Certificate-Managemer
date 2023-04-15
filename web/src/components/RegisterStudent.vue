<!-- eslint-disable max-len -->
<template>
  <div class=" center">
    <div class="width padding-top">
        <h4 >学生注册</h4>
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="ruleForm2.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="邮箱">
            <el-input v-model="ruleForm2.email" ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="submitForm()">注册</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
            已有账户？<el-button type="primary" @click="toLogin">去登录</el-button>
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
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm2.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
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
        name: '',
        password: '',
        checkPass: '',
        email: '',

      },
      rules2: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' },
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' },
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      const form = clone(this.ruleForm2);
      delete form.checkPass;
      const that = this;
      student.RegisterSubmit(form).then((res) => {
        console.log('res: ', res);
        if (res.status === 200) {
          that.$router.push({ path: '/student/register-success' });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toLogin() {
      this.$router.push({ path: '/student/login' });
    },
  },
};
</script>
