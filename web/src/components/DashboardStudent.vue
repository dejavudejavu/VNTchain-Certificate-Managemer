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
            prop="universityName"
            label="大学"
            >
          </el-table-column>
          <el-table-column
            prop="universityEmail"
            label="大学邮箱"
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
        </el-table>
        <div class="padding-top">
          <el-button type="primary" v-if="share!==index" @click="shareCert(index)">分享证书</el-button>
          <div v-if="share===index" >
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
            <div class="padding-top">
              <el-button type="primary" @click="open(index)">生成证明</el-button>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>

</template>

<script>
// eslint-disable-next-line import/no-cycle
import common from '../api/common';
import student from '../api/student';

const cityOptions = ['大学', 'GPA', '学院', '专业'];
const att = ['universityName', 'cgpa', 'departmentName', 'major'];

export default {
  data() {
    return {
      // tableData: [{
      //   universityName: '武汉理工大学',
      //   universityEmail: '11@qq.com',
      //   cgpa: 1.1,
      //   departmentName: '计算机学院',
      //   dateOfIssuing: '2016-05-02',
      //   major: '软件工程',
      //   certUUID: '2648q29814646924916298126597126',
      // }].map((e) => [e]),
      tableData: [],
      checkAll: false,
      share: -1,
      checkedCities: ['大学', 'GPA'],
      cities: cityOptions,
      isIndeterminate: true,
    };
  },
  mounted() {
    const { email } = this.$store.state.data;
    student.Dashboard({ email }).then((res) => {
      if (res.status === 200) {
        this.tableData = res.data.map((e) => [e]);
      }
    });
  },
  methods: {
    shareCert(index) {
      this.share = index;
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
    open(index) {
      const selectedAtts = this.checkedCities.map((e) => att[cityOptions.indexOf(e)]);
      const that = this;
      common.GenerateProof({
        sharedAttributes: selectedAtts,
        certUUID: that.tableData[index][0].certUUID,
        email: that.$store.state.data.email,
      }).then((res) => {
        if (res.status === 200) {
          const { proof } = res.data;
          that.$alert(`<div style="word-break: break-all;">${proof}</div>`, '证明已生成，请注意保存', {
            confirmButtonText: '确定',
            center: true,
            dangerouslyUseHTMLString: true,
            callback: () => {
              that.share = -1;
            },
          });
        }
      });
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
