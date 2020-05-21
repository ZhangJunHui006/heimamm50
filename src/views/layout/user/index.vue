<template>
  <div class="user">
    <!-- 搜索部分 -->
    <el-card shadow="always">
      <el-form inline :model="ruleForm" ref="searchFormRef">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="ruleForm.role_id" placeholder="请选择">
            <el-option label="超级管理员" value="1"></el-option>
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button type="default" @click="clear">清除</el-button>
          <el-button type="primary" @click="add">+新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top:20px;">
      <el-table :data="userList">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0" style="color:red;">禁用</span>
            <span v-if="scope.row.status === 1" style="color:#6ac144;">启用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-button type="primary">编辑</el-button>
            <el-button
              @click="changeStatus(scope.row.id)"
              :type="scope.row.status === 0 ? 'success' : 'info'"
            >
              {{
              scope.row.status === 0 ? "启用" : "禁用"
              }}
            </el-button>
            <el-button type="default" @click="deleteUser(scope.row.id, scope.row.username)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:15px;text-align:center;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next,jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
    <UserEdit ref="userEditRef"></UserEdit>
  </div>
</template>

<script>
import UserEdit from "./user-add-or-update";
export default {
  name: "user",
  components: {
    UserEdit
  },
  data() {
    return {
      ruleForm: {
        username: "",
        email: "",
        role_id: ""
      },
      page: 1,
      limit: 2,
      userList: [],
      total: 0 // 总条数，分页时候用得着
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$axios.get("/user/list", {
        params: {
          ...this.ruleForm,
          page: this.page,
          limit: this.limit
        }
      });
      console.log(res);
      if (res.data.code === 200) {
        this.userList = res.data.data.items;
        this.total = res.data.data.pagination.total;
      }
    },
    search() {
      this.page = 1; // 从第一页开始搜索
      this.getData();
    },
    // 清除
    clear() {
      // this.searchForm.username = ''
      // this.searchForm.email = ''
      // this.searchForm.role_id = ''
      // 重置表单项的内容
      this.$refs.searchFormRef.resetFields();
      this.search();
    },
    handleSizeChange(val) {
      this.limit = val;
      this.search();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getData();
    },
    // 更改当前行的状态
    async changeStatus(id) {
      const res = await this.$axios.post("/user/status", { id });
      if (res.data.code === 200) {
        this.$message({
          message: "更改状态成功~",
          type: "success"
        });
        // 重新查询
        this.search();
      }
    },
    //删除
    deleteUser(id, username) {
      this.$confirm(`确定删除 ${username} 该用户吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$axios.post("/user/remove", { id });
          if (res.data.code === 200) {
            this.$message({
              message: "删除成功~",
              type: "success"
            });
            // 重新查询
            this.search();
          }
        })
        .catch(() => {});
    },
    add() {
      // 让新增用户的对话框显示出来
      this.$refs.userEditRef.dialogVisible = true;
      this.$refs.userEditRef.mode = "add";
    }
  }
};
</script>

<style>
</style>