<template>
  <div class="login-container">
    <div class="left">
      <div class="title-box">
        <img src="../../assets/login_icon.png" alt />
        <span class="title">黑马面面</span>
        <span class="line"></span>
        <span class="sub-title">用户登录</span>
      </div>
      <el-form class="login-form" :model="ruleForm" ref="ruleForm" :rules="rules" status-icon>
        <el-form-item prop="phone">
          <el-input v-model="ruleForm.phone" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row :gutter="20">
            <el-col :span="16">
              <el-input v-model="ruleForm.code" prefix-icon="el-icon-key" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="8">
              <img class="captcha" :src="codeUrl" @click="getCodeUrl" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="checked">
          <el-checkbox v-model="ruleForm.checked"></el-checkbox>我已阅读并同意
          <el-link type="primary">主要链接</el-link>和
          <el-link type="primary">主要链接</el-link>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary" @click="loginClick">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <img src="../../assets/login_bg.png" alt />
    </div>
  </div>
</template>

<script>
import { setToken } from "../../util/token.js";
export default {
  data() {
    return {
      codeUrl: process.env.VUE_APP_BASEURL + "/captcha?type=login",
      ruleForm: {
        phone: "",
        password: "",
        code: "",
        checked: false
      },
      rules: {
        phone: [
          // { required: true, message: "必须输入手机号", trigger: "blur" },
          // { min: 11, max: 11, message: "手机长度必须是11位", trigger: "blur" }
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("手机号不能为空"));
              }
              const reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
              if (!reg.test(value)) {
                return callback(new Error("手机号格式错误"));
              }
              callback();
            },
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "必须输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ],
        code: [
          { required: true, message: "必须输入手机号", trigger: "blur" },
          { min: 4, max: 4, message: "长度必须是4位", trigger: "blur" }
        ],
        checked: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("必须勾选用户协议"));
              }
              callback();
            },
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    getCodeUrl() {
      this.codeUrl =
        process.env.VUE_APP_BASEURL + "/captcha?type=login&r" + Math.random();
    },
    loginClick() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) return;

        //执行到这成功, 请求axios
        this.$axios({
          method: "post",
          url: "/login",
          data: {
            phone: this.ruleForm.phone,
            password: this.ruleForm.password,
            code: this.ruleForm.code
          }
        }).then(res => {
          console.log(res);

          if (res.data.code == 200) {
            //按需导入token
            setToken(res.data.data.token);

            //跳转页面
            this.$router.push({
              path:'/layout'
            })
          }
        });
      });
    }
  }
};
</script>

<style lang="less">
.login-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(225deg, #1493fa, #01c6fa);
  .left {
    width: 478px;
    height: 550px;
    background: #f5f5f5;
    padding: 48px;
    .title-box {
      display: flex;
      align-items: center;
      img {
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }
      .title {
        font-size: 24px;
        margin-right: 14px;
      }
      .line {
        width: 1px;
        background-color: #c7c7c7;
        height: 27px;
        margin-right: 12px;
      }
      .sub-title {
        font-size: 22px;
      }
    }
    .login-form {
      margin-top: 29px;
      .captcha {
        width: 100%;
        height: 40px;
      }
    }
  }
}
</style>