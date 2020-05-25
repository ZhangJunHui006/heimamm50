<template>
  <div class="enterprice">
    <el-dialog :visible.sync="dialogVisible" width="600px">
      <div slot="title" class="title">{{mode === "add" ? "新增用户" : "修改用户"}}</div>
      <span>
        <el-form
          :rules="rules"
          :model="enterproiseForm"
          ref="enterproiseFormRef"
          label-width="100px"
        >
          <el-form-item label="企业编号" prop="eid">
            <el-input v-model="enterproiseForm.eid"></el-input>
          </el-form-item>
          <el-form-item label="企业名称" prop="name">
            <el-input v-model="enterproiseForm.name"></el-input>
          </el-form-item>
          <el-form-item label="企业简称" prop="short_name">
            <el-input v-model="enterproiseForm.short_name"></el-input>
          </el-form-item>
          <el-form-item label="企业简介" prop="intro">
            <el-input v-model="enterproiseForm.intro"></el-input>
          </el-form-item>
          <el-form-item label="企业备注" prop="remark">
            <el-input v-model="enterproiseForm.remark"></el-input>
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
  data() {
    return {
      dialogVisible: false,
      mode: "",
      page: 1, //页码
      limit: 2, //页容量

      enterproiseForm: {
        eid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      rules: {
        eid: [{ required: true, message: "企业编号不能为空", trigger: "blur" }],
        name: [
          { required: true, message: "企业名称不能为空", trigger: "blur" }
        ],
        short_name: [
          { required: true, message: "企业简称不能为空", trigger: "blur" }
        ],
        intro: [
          { required: true, message: "企业简介不能为空", trigger: "blur" }
        ],
        remark: [
          { required: true, message: "企业备注不能为空", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    dialogVisible(newValue) {
      console.log(newValue);

      //当值等于false 就是关闭的时候  
      // 规则验证关闭
      if (!newValue) {
        this.$nextTick(() => {
          this.$refs.enterproiseFormRef.clearValidate();
        });
      }
    }
  },
  methods: {
    submit() {
      this.$refs.enterproiseFormRef.validate(async valid => {
        if (!valid) return;

        let res = null;
        if (this.mode == "add") {
          res = await this.$axios.post("/enterprise/add", this.enterproiseForm);
        } else {
          res = await this.$axios.post(
            "/enterprise/edit",
            this.enterproiseForm
          );
        }

        if (res.data.code == 200) {
          // 提示
          this.$message({
            type: "success",
            message: this.mode === "add" ? "新增成功~" : "修改成功~"
          });

          // 关闭当前窗口
          this.dialogVisible = false;
          // 方式2，通过 $parent
          this.$parent.search();
        }
      });
    }
  }
};
</script>

<style lang="less">
.enterprice {
  .title {
    text-align: center;
    color: #fff;
    background-color: #0e9ff9;
    height: 53px;
    line-height: 53px;
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__close {
    color: #fff;
  }
}
</style>