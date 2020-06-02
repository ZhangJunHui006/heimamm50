<template>
  <!-- action上传文件的路径 接口
    beforeAvatarUpload 上传之前的验证判断
    handleAvatarSuccess 上传成功后需要做的事情
    name 是后台上传文件需要的参数
  -->
  <el-upload
    class="avatar-uploader"
    name="file"
    :action="avatar + '/question/upload'"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <div v-if="type == 'video'">
      <video v-if="value" :src="avatar + '/' + value" controls ></video>
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </div>
    <div v-else>
      <img v-if="value" :src="avatar + '/' + value" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </div>
  </el-upload>
</template>

<script>
export default {
  name: "qupload",
  props: {
    type: {
      type: String,
      default: "image"
    },
    value: String
  },
  data() {
    return {
      avatar: process.env.VUE_APP_BASEURL
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      // console.log(res);
      //   this.imageUrl = URL.createObjectURL(file.raw);
      this.$emit("input", res.data.url);
    },
    beforeAvatarUpload(file) {
      if (this.type == "video") {
        console.log(111);

        const isMP4 = file.type === "video/mp4";
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isMP4) {
          this.$message.error("上传视频只能是 MP4 格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传视频大小不能超过 2MB!");
        }
        return isMP4 && isLt2M;
      } else {
        const isJPG = file.type === "image/jpeg";
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error("上传图片只能是 JPG 格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传图片大小不能超过 2MB!");
        }
        return isJPG && isLt2M;
      }
    }
  }
};
</script>

<style>
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
</style>