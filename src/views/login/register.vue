<template>
  <div class="register">
    <el-dialog center :visible.sync="dialogVisible" width="600px">
      <div slot="title" class="title">注册</div>
      <span>
        <el-form label-width="100px" :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item label="头像" prop="avatar">
            <el-upload
              class="avatar-uploader"
              :action="uploadAction"
              name="image"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="昵称" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input show-password v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item label="图形码" prop="code">
            <el-row>
              <el-col :span="16">
                <el-input v-model="ruleForm.code"></el-input>
              </el-col>
              <el-col :span="7" style="margin-left:10px">
                <img @click="getCode" class="captcha" :src="codeUrl" alt />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="验证码" prop="rcode">
            <el-row>
              <el-col :span="17">
                <el-input v-model.number="ruleForm.rcode"></el-input>
              </el-col>
              <el-col style="margin-left:10px" :span="6">
                <el-button @click="getRcode">获取用户验证码</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      codeUrl: process.env.VUE_APP_BASEURL + "/captcha?type=sendsms",
      dialogVisible: false,
      imageUrl: "",
      uploadAction: process.env.VUE_APP_BASEURL + "/uploads",
      ruleForm: {
        username: "",
        phone: "",
        email: "",
        avatar: "",
        password: "",
        code: "",
        rcode: ""
      },
      rules: {
        avatar: [
          { required: true, message: "头像不能为空", trigger: "blur" }
        ],
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        phone: [
          {
            required: true,
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
        email: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("邮箱不能为空"));
              }
              const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
              if (!reg.test(value)) {
                return callback(new Error("邮箱格式错误"));
              }
              callback();
            },
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ],
        code: [
          { required: true, message: "图形码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "图形码必须是4位", trigger: "blur" }
        ],
        rcode: [
          // { required: true, message: "验证码不能为空", trigger: "blur" },
          // { min: 4, max: 4, message: "验证码必须是4位", trigger: "blur" },
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("验证码不能为空"));
              }
              if (!Number.isInteger(value)) {
                return callback(new Error("验证码必须是数字"));
              }
              callback();
            },
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    getCode() {
      this.codeUrl =
        process.env.VUE_APP_BASEURL +
        "/captcha?type=sendsms&r=" +
        Math.random();
    },
    async getRcode() {
      //发送请求
      const res = await this.$axios({
        method: "post",
        url: "/sendsms",
        data: {
          code: this.ruleForm.code,
          phone: this.ruleForm.phone
        }
      });
      if (res.data.code == 200) {
        // console.log(res);
        this.ruleForm.rcode = res.data.data.captcha;
      } else {
        this.$message.error(res.data.message);
      }
    },

    // 图片真正上传之前的回调函数
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/png/gif 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      //如果要进行上传文件的请求，我们必须返回true，它才会进行文件上传
      return isJPG && isLt2M;
    },
    // 上传成功之后的回调函数
    handleAvatarSuccess(res, file) {
      // console.log("1", res);
      // console.log("1", file);
      //设置显示图片
      this.imageUrl = process.env.VUE_APP_BASEURL + "/" + res.data.file_path;
      //保存图片的值
      this.ruleForm.avatar = res.data.file_path;
    },
    submit() {
      this.$refs.ruleForm.validate(async valid => {
        if (!valid) return;

        const res = await this.$axios.post("/register", this.ruleForm);
        console.log(res);

        if (res.data.code == 200) {
          //成功 弹出成功提示
          this.$message({
            message: "注册成功",
            type: "success"
          });
          //关闭弹出框
          this.dialogVisible = false;
        } else {
          //弹出失败框
          this.$message.error(res.data.message);
        }
      });
    }
  }
};
</script >

<style lang="less">
.register {
  .title {
    background: linear-gradient(270deg, #01c6fa, #1493fa);
    height: 53px;
    color: #fff;
    text-align: center;
    line-height: 53px;
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .captcha {
    width: 100%;
    height: 40px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>