<template>
  <div>
    <el-card>
      <el-form :inline="true" :model="quertionForm" ref="quertionFormRef">
        <el-row>
          <el-col :span="6">
            <el-form-item label="学科" prop="subject">
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
            <el-form-item label="阶段" prop="step">
              <el-select v-model="quertionForm.step" placeholder="请选择阶段">
                <el-option v-for="(value,name) in stepObj" :key="name" :label="value" :value="name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="企业" prop="enterprise">
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
            <el-form-item label="题型" prop="type">
              <el-select v-model="quertionForm.type" placeholder="请选择题型">
                <el-option v-for="(value,name) in typeObj" :key="name" :label="value" :value="name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="难度" prop="difficulty">
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
            <el-form-item label="作者" prop="username">
              <el-input style="width:220px" v-model="quertionForm.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态" prop="status">
              <el-select v-model="quertionForm.status" placeholder="请选择状态">
                <el-option label="启用" value="1"></el-option>
                <el-option label="禁用" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="日期" prop="create_date">
              <el-date-picker v-model="quertionForm.create_date" type="date" placeholder="请选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="标题" prop="title">
              <el-input style="width:530px" v-model="quertionForm.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-button type="primary" @click="search">搜素</el-button>
            <el-button @click="clear">清除</el-button>
            <el-button type="primary" @click="add">+新增试题</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card style="margin-top:20px">
      <el-table :data="questionList">
        <el-table-column label="日期" type="index"></el-table-column>
        <el-table-column label="题目" width="180">
          <template slot-scope="scope">
            <span v-html="scope.row.title"></span>
          </template>
        </el-table-column>
        <el-table-column label="学科.阶段" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.subject_name }}.{{stepObj[scope.row.step]}}</span>
          </template>
        </el-table-column>
        <el-table-column label="题型" width="120">
          <template slot-scope="scope">
            <span>{{typeObj[scope.row.type]}}</span>
          </template>
        </el-table-column>
        <el-table-column label="企业" prop="enterprise_name" width="110"></el-table-column>
        <el-table-column label="创建者" prop="username" width="140"></el-table-column>
        <el-table-column label="状态" width="120">
          <template slot-scope="scope">
            <span
              :style="{ color: scope.row.status === 0 ? 'red' : '#6ac144' }"
            >{{ scope.row.status === 0 ? "禁用" : "启用" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop>
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
            <el-button
              @click="changeStatus(scope.row.id)"
              :type="scope.row.status === 0 ? 'success' : 'info'"
            >{{ scope.row.status === 0 ? "启用" : "禁用" }}</el-button>
            <el-button @click="del(scope.row.id)" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:center">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
    <questionAdd
      ref="questionAddRef"
      :difficultyObj="difficultyObj"
      :typeObj="typeObj"
      :stepObj="stepObj"
      :subjectList="subjectList"
      :enterpriseList="enterpriseList"
    ></questionAdd>
  </div>
</template>

<script>
import questionAdd from "./question-add-or-update";
export default {
  components: {
    questionAdd
  },
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
      },
      questionList: [],
      total: 0,
      page: 1,
      limit: 2,
      mode: ""
    };
  },
  created() {
    this.getSubjectListData();
    this.getEnterpriseListData();
    this.getQuestionList();
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
    },
    async getQuestionList() {
      const res = await this.$axios.get("question/list", {
        params: {
          page: this.page,
          limit: this.limit,
          ...this.quertionForm
        }
      });
      if (res.data.code == 200) {
        this.questionList = res.data.data.items;
        this.total = res.data.data.pagination.total;
      }
    },
    search() {
      this.page = 1;
      this.getQuestionList();
    },
    clear() {
      this.$refs.quertionFormRef.resetFields();
    },
    async changeStatus(id) {
      const res = await this.$axios.post("/question/status", { id });
      if (res.data.code == 200) {
        this.$message({
          message: "状态更改成功",
          type: "success"
        });
        this.getQuestionList();
      }
    },
    del(id) {
      this.$confirm("确定删除吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$axios.post("/question/remove", { id });
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.limit = val;
      this.search();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = val;
      this.getQuestionList();
    },
    add() {
      this.mode = "add";
      //进入时不显示内容
      this.$refs.questionAddRef.questionForm = {
        subject: "",
        step: "", //阶段
        enterprise: "", //企业
        city: [], //城市
        type: 1, //题型
        difficulty: 1, //难度
        title: "", //标题
        answer_analyze: "", //答案解析
        remark: "", //试题备注
        single_select_answer: "", //单选题答案
        multiple_select_answer: [], //多选题答案
        short_answer: "", //简答题答案
        video: "", //解析视频地址
        select_options: [
          {
            label: "A",
            text: "shift",
            image: ""
          },
          {
            label: "B",
            text: "pop",
            image: ""
          },
          {
            label: "C",
            text: "splice",
            image: ""
          },
          {
            label: "D",
            text: "slice",
            image: ""
          }
        ]
      };
      this.$refs.questionAddRef.dialogVisible = true;
    },
    edit(row) {
      console.log(row);
      this.$refs.questionAddRef.questionForm = JSON.parse(JSON.stringify(row));
      if (row.city) {
        this.$refs.questionAddRef.questionForm.city = row.city.split(",");
      } else {
        this.$refs.questionAddRef.questionForm.city = [];
      }
      if (row.multiple_select_answer) {
        this.$refs.questionAddRef.questionForm.multiple_select_answer = row.multiple_select_answer.split(
          ","
        );
      } else {
        this.$refs.questionAddRef.questionForm.multiple_select_answer = [];
      }
      this.$refs.questionAddRef.dialogVisible = true;
    }
  }
};
</script>

<style>
</style>