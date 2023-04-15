<!-- eslint-disable max-len -->
<template>
  <div>
  <div class="center padding-top" v-for="(item,index) in tableData" :key="index">
    <el-card class="width">
        <el-table
          :data="item"
          border
          style="width: 100%">
          <el-table-column
            prop="studentName"
            label="姓名"
            >
          </el-table-column>
          <el-table-column
            prop="studentEmail"
            label="邮箱"
            >
          </el-table-column>
          <el-table-column
            prop="cgpa"
            label="GPA"
            >
          </el-table-column>
          <el-table-column
            prop="departmentName"
            label="学院"
            >
          </el-table-column>
          <el-table-column
            prop="dateOfIssuing"
            label="颁发日期"
            >
          </el-table-column>
          <el-table-column
            prop="major"
            label="专业"
            >
          </el-table-column>
          <el-table-column
            prop="certUUID"
            label="证书UUID"
            >
          </el-table-column>
          <el-table-column
            prop="hash"
            label="证书Hash"
            >
          </el-table-column>
        </el-table>

      </el-card>
  </div>
  </div>

</template>

<script>
// eslint-disable-next-line import/no-cycle
import university from '../api/university';

export default {
  data() {
    return {
      tableData: [].map((e) => [e]),
    };
  },
  mounted() {
    const { name, email } = this.$store.state.data;
    university.Dashboard({ name, email }).then((res) => {
      if (res.status === 200) {
        this.tableData = res.data.map((e) => [e]);
      }
    });
  },
};
</script>
  <style>
    .box-card {
      width: 480px;
    }
  </style>
