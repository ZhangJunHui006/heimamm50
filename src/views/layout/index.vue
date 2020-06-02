<template>
  <div class="layout">
    <el-container>
      <el-header class="header">
        <div class="left">
          <i style="font-size: 20px;" @click="isCollapse=!isCollapse" class="el-icon-s-fold"></i>
          <img src="@/assets/layout_icon.png" class="marginlr" alt />
          <span class="title">黑马面面</span>
        </div>
        <div class="right">
          <img :src="avatar" alt />
          <span class="name">{{ username }} 欢迎您</span>
          <el-button type="primary" @click="open">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="auto">
          <el-menu
            router
            :default-active="defaultActive"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
          >
            <el-menu-item
              v-for="(item,index) in $router.options.routes[2].children"
              :key="index"
              :index="item.meta.fullPath"
              v-show="item.meta.roles.includes($store.getters.getUserInfo.role)"
            >
              <i :class="item.meta.icon"></i>
              <span slot="title">{{item.meta.title}}</span>
            </el-menu-item>
            <!--
            <el-menu-item index="/layout/personal">
              <i class="el-icon-pie-chart"></i>
              <span slot="title">个人信息</span>
            </el-menu-item>
            <el-menu-item index="/layout/chart">
              <i class="el-icon-pie-chart"></i>
              <span slot="title">数据预览</span>
            </el-menu-item>
            <el-menu-item index="/layout/user">
              <i class="el-icon-user"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
            <el-menu-item index="/layout/enterproise">
              <i class="el-icon-office-building"></i>
              <span slot="title">企业列表</span>
            </el-menu-item>
            <el-menu-item index="/layout/question">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">题库列表</span>
            </el-menu-item>
            <el-menu-item index="/layout/subject">
              <i class="el-icon-notebook-2"></i>
              <span slot="title">学科列表</span>
            </el-menu-item>-->
          </el-menu>
        </el-aside>
        <el-main style="background-color:#e8e9ec">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { removeToken, getToken } from "../../util/token";
export default {
  data() {
    return {
      username: "",
      avatar: "",
      isCollapse: false,
      defaultActive: ""
    };
  },
  created() {
    // console.log('1',this.$route.fullPath);
    // this.defaultActive = this.$route.fullPath;
    this.getData();
    if (this.$route.fullPath == "/layout") {
      this.defaultActive = "/layout/user";
      this.$router.push("/layout/user");
    } else {
      this.defaultActive = this.$route.fullPath;
    }

    console.log(this.$router);
  },
  methods: {
    //登录获取信息
    async getData() {
      const res = await this.$axios({
        methods: "get",
        url: "/info"
      });
      // console.log(res);
      if (res.data.code == 200) {
        this.username = res.data.data.username;
        this.avatar = process.env.VUE_APP_BASEURL + "/" + res.data.data.avatar;

        this.$store.commit("setUserInfo", res.data.data);
      }
    },
    //退出登录
    open() {
      this.$confirm("是否退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$message({
          type: "success",
          message: "退出成功!"
        });
        //删除token
        removeToken();
        //跳转页面
        this.$router.push("/login");
      });
      // .catch(() => {
      //   this.$message({
      //     type: "info"
      //     // message: "已取消删除"
      //   });
      // });
    }
  }
};
</script>

<style lang="less">
.layout {
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #f3f3f3;
    .left {
      display: flex;
      align-items: center;
      .marginlr {
        margin-left: 10px;
        margin-right: 10px;
      }
      .title {
        font-size: 22px;
        color: #49a1ff;
      }
    }
    .right {
      display: flex;
      align-items: center;
      img {
        width: 43px;
        height: 43px;
        margin-right: 9px;
        border-radius: 50%;
      }
      .name {
        margin-right: 38px;
      }
    }
  }
  .el-menu {
    border-right: solid 0px #e6e6e6;
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
    background-color: #fff;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>