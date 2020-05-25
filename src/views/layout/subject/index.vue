<template>
  <div>
    <el-card>
      <el-form :inline="true" :model="formInline" ref="formInlineRef">
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="formInline.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科姓名" prop="name">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="formInline.status">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button type="primary" @click="add">+新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top:20px">
      <el-table :data="tableData">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="rid" label="学科编号" width="180"></el-table-column>
        <el-table-column prop="name" label="学科名称" width="180"></el-table-column>
        <el-table-column prop="short_name" label="简称" width="180"></el-table-column>
        <el-table-column prop="username" label="创建者" width="180"></el-table-column>
        <el-table-column prop="create_time" label="创建日期" width="180"></el-table-column>
        <el-table-column label="状态" width="180">
          <template slot-scope="scope">
            <span
              :style="{color :scope.row.status == 0 ? 'red' :'#85ce61' }"
            >{{scope.row.status == 0 ? '禁用' :'启用'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)">编辑</el-button>
            <el-button
              @click="changeStatus(scope.row.id)"
              :type="scope.row.status == 0 ? 'success' : 'info' "
            >{{scope.row.status==0 ? '启用' : '禁用'}}</el-button>
            <el-button @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:15px;text-align: center">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[2, 3, 5, 10]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
    <subjects ref="subjectRef"></subjects>
  </div>
</template>

<script>
import subjects from "./subject-add-or-update";
export default {
  name: "subject",
  components: {
    subjects
  },
  data() {
    return {
      formInline: {
        rid: "",
        name: "",
        username: "",
        status: ""
      },
      tableData: [],
      page: 1,
      limit: 2,
      total: 1
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$axios.get("/subject/list", {
        params: {
          page: this.page,
          limit: this.limit,
          ...this.formInline
        }
      });
      // console.log(res);
      if (res.data.code == 200) {
        this.tableData = res.data.data.items;
        this.total = res.data.data.pagination.total;
      }
    },
    search() {
      //搜索
      //1 把page当前页设置为1  从第一页开始搜素
      //2 调用getAata方法 发送请求
      this.page = 1;
      this.getData();
    },
    clear() {
      this.$refs.formInlineRef.resetFields();
    },
    del(id) {
      console.log(id);

      this.$confirm("确定删除吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          //发送请求
          const res = await this.$axios.post("/subject/remove", { id });
          console.log(res);

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
    async changeStatus(id) {
      console.log(id);

      const res = await this.$axios.post("/subject/status", { id });
      // console.log(res);
      if ((res.data.code = 200)) {
        //成功
        this.$message({
          message: "状态修改成功",
          type: "success"
        });
        //刷新数据
        this.getData();
      }
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.limit = val;
      this.search();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = val;
      this.getData();
    },
    add() {
      this.$refs.subjectRef.mode = "add";
      this.$refs.subjectRef.subjectForm = {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      };
      this.$refs.subjectRef.dialogVisible = true;
    },
    edit(row) {
      this.$refs.subjectRef.mode = "edit";
      //深拷贝
      this.$refs.subjectRef.subjectForm = JSON.parse(JSON.stringify(row));
      this.$refs.subjectRef.dialogVisible = true;
    }
  }
};
</script>

<style>
</style>