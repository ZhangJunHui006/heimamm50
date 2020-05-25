<template>
  <div>
    <el-card>
      <el-form :inline="true" :model="quertionForm">
        <el-row>
          <el-col :span="6">
            <el-form-item label="学科">
              <el-select v-model="quertionForm.subject" placeholder="请选择学科">
                <el-option
                  v-for="item in subjectList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="阶段">
              <el-select v-model="quertionForm.step" placeholder="请选择阶段">
                <el-option v-for="(value,name) in stepObj" :key="name" :label="value" :value="name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="企业">
              <el-select v-model="quertionForm.enterprise" placeholder="请选择企业">
                <el-option
                  v-for="item in enterpriseList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="题型">
              <el-select v-model="quertionForm.type" placeholder="请选择题型">
                <el-option v-for="(value,name) in typeObj" :key="name" :label="value" :value="name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="难度">
              <el-select v-model="quertionForm.difficulty" placeholder="请选择难度">
                <el-option
                  v-for="(value,name) in difficultyObj"
                  :key="name"
                  :label="value"
                  :value="name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="作者">
              <el-input style="width:220px" v-model="quertionForm.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态">
              <el-select v-model="quertionForm.status" placeholder="请选择状态">
                <el-option label="启用" value="1"></el-option>
                <el-option label="禁用" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="日期">
              <el-date-picker v-model="quertionForm.create_date" type="date" placeholder="请选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="标题">
              <el-input style="width:570px" v-model="quertionForm.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-button type="primary">搜素</el-button>
            <el-button>清除</el-button>
            <el-button type="primary">+新增试题</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "question",
  data() {
    return {
      subjectList: [], //学科列表
      enterpriseList: [], //企业列表
      stepObj: {
        1: "初级",
        2: "中级",
        3: "高级"
      },
      typeObj: {
        1: "单选",
        2: "多选",
        3: "简答"
      },
      difficultyObj: {
        1: "简单",
        2: "一般",
        3: "困难"
      },
      quertionForm: {
        subject: "",
        step: "",
        enterprise: "",
        type: "",
        difficulty: "",
        username: "",
        status: "",
        create_date: "",
        title: ""
      }
    };
  },
  created() {
    this.getSubjectListData();
    this.getEnterpriseListData();
  },
  methods: {
    async getSubjectListData() {
      const res = await this.$axios.get("/subject/list");

      // console.log(res);
      if (res.data.code == 200) {
        this.subjectList = res.data.data.items;
      }
    },
    async getEnterpriseListData() {
      const res = await this.$axios.get("/enterprise/list");

      // console.log(res);
      if (res.data.code == 200) {
        this.enterpriseList = res.data.data.items;
      }
    }
  }
};
</script>

<style>
</style>