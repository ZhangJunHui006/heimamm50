<template>
  <div>
    <el-card>
      <!-- inline一行显示 -->
      <el-form :inline="true" label-width="80px" :model="searchForm" ref="searchFormRef">
        <el-form-item label="企业编号" prop="eid">
          <el-input style="width:150px;" v-model="searchForm.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input style="width:150px;" v-model="searchForm.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input style="width:150px;" v-model="searchForm.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select placeholder="请选择状态" style="width:150px;" v-model="searchForm.status">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜素</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button type="primary" @click="add">+新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="marginTop:20px">
      <!-- data="请求的数据" -->
      <el-table :data="tableData" border stripe>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="eid" label="企业编号"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span
              :style="{color : scope.row.status == 0 ? 'red' : 'green' }"
            >{{scope.row.status == 0 ? '禁用': '启用' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)">编辑</el-button>
            <el-button
              @click="changeStatus(scope.row.id)"
              :type="scope.row.status === 0 ? 'success' : 'info'"
            >禁用</el-button>
            <el-button @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:15px;text-align:center;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[2, 3, 10, 20]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background
        ></el-pagination>
      </div>
    </el-card>
    <enterproise ref="enterproiseRef"></enterproise>
  </div>
</template>

<script>
import enterproise from "./enterproise-add-or-update";
export default {
  components: {
    enterproise
  },
  data() {
    return {
      searchForm: {
        eid: "",
        name: "",
        username: "",
        status: ""
      },
      tableData: [],
      page: 1, //页码
      limit: 2, //页容量
      total: 0 //总条数
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$axios.get("/enterprise/list", {
        params: {
          ...this.searchForm,
          page: this.page,
          limit: this.limit
        }
      });
      console.log(res);
      if (res.data.code == 200) {
        this.tableData = res.data.data.items;
        this.total = res.data.data.pagination.total;
        // console.log(this.total);
        // console.log(this.limit);
      }
    },
    search() {
      this.page = 1;
      this.getData();
    },
    clear() {
      this.$refs.searchFormRef.resetFields();
    },
    async changeStatus(id) {
      console.log(id);
      const res = await this.$axios.post("/enterprise/status", { id });
      if (res.data.code == 200) {
        this.$message({
          message: "状态修改成功",
          type: "success"
        });
        this.getData();
      }
    },
    del(id) {
      this.$confirm("确定删除吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$axios.post("/enterprise/remove", { id });
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.search();
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
      console.log(`每页 ${val} 条`);
      this.limit = val;
      this.search();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.getData();
    },
    add() {
      this.$refs.enterproiseRef.mode = "add";
      //q清空内容
      this.$refs.enterproiseRef.enterproiseForm = {
        eid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      };
      // this.$nextTick(() => {
      //   this.$refs.enterproiseRef.$refs.enterproiseFormRef.clearValidate();
      // });
      this.$refs.enterproiseRef.dialogVisible = true;
    },
    edit(row) {
      // console.log(id);
      const { id,eid, name, tag, short_name, intro, remark } = row;
      this.$refs.enterproiseRef.enterproiseForm = {
        id,
        eid,
        name,
        tag,
        short_name,
        intro,
        remark
      };
      this.$refs.enterproiseRef.mode = "edit";
      // this.$nextTick(() => {
      //   this.$refs.enterproiseRef.$refs.enterproiseFormRef.clearValidate();
      // });
      this.$refs.enterproiseRef.dialogVisible = true;
    }
  }
};
</script>

<style>
</style>