<!-- eslint-disable max-len -->
<template>
  <div class=" center">
    <div class="width padding-top">
        <h4 >颁发证书</h4>
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item required label="学生姓名" prop="studentName">
              <el-input v-model="ruleForm2.studentName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item required prop="studentEmail" label="学生邮箱">
            <el-input v-model="ruleForm2.studentEmail" ></el-input>
            </el-form-item>
            <el-form-item required label="大学名称" prop="name">
              <el-input v-model="ruleForm2.name" auto-complete="off" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="大学邮箱">
            <el-input v-model="ruleForm2.email"  :disabled="true"></el-input>
            </el-form-item>
            <el-form-item required label="专业" prop="major">
              <el-input v-model="ruleForm2.major" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item required label="学院" prop="department">
              <el-input v-model="ruleForm2.department" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item required label="GPA" prop="cgpa">
              <el-input v-model="ruleForm2.cgpa" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="submitForm()">颁发</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
    </div>
</template>

<script>
// eslint-disable-next-line import/no-cycle
import university from '../api/university';

export default {
  data() {
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
        studentEmail: '',
        studentName: '',
        name: '',
        email: '',
        major: '',
        department: '',
        cgpa: '',
      },
      rules2: {
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' },
        ],
        studentEmail: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' },
        ],
      },
      dialogVisible: false,
    };
  },
  mounted() {
    this.ruleForm2.name = this.$store.state.data.name;
    this.ruleForm2.email = this.$store.state.data.email;
  },
  methods: {
    submitForm() {
      this.ruleForm2.date = this.getDate();
      const that = this;
      university.Issue(this.ruleForm2).then((res) => {
        if (res.status === 200) {
          that.$router.push({ path: '/university/issue-success' });
        }
      });
    },
    getDate() {
      const date = new Date();
      let nowMonth = date.getMonth() + 1;
      let strDate = date.getDate();
      const seperator = '.';
      if (nowMonth >= 1 && nowMonth <= 9) {
        nowMonth = `0${nowMonth}`;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = `0${strDate}`;
      }
      const nowDate = date.getFullYear() + seperator + nowMonth + seperator + strDate;
      return nowDate;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
