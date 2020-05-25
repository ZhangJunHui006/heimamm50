<template>
  <div class="subjectAdd">
    <el-dialog :visible.sync="dialogVisible" width="600px">
      <div slot="title" class="title">{{mode == 'add' ? '新增学科' : '编辑学科'}}</div>
      <span>
        <el-form label-width="80px" :rules="rules" :model="subjectForm" ref="subjectFormRef">
          <el-form-item label="学科编号" prop="rid">
            <el-input v-model="subjectForm.rid"></el-input>
          </el-form-item>
          <el-form-item label="学科名称" prop="name">
            <el-input v-model="subjectForm.name"></el-input>
          </el-form-item>
          <el-form-item label="学科简称" prop="short_name">
            <el-input v-model="subjectForm.short_name"></el-input>
          </el-form-item>
          <el-form-item label="学科简介" prop="intro">
            <el-input v-model="subjectForm.intro"></el-input>
          </el-form-item>
          <el-form-item label="学科备注" prop="remark">
            <el-input v-model="subjectForm.remark"></el-input>
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
      subjectForm: {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      rules: {
        rid: [{ required: true, message: "学科编号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "学科名称不能为空", trigger: "blur" }]
      },
      dialogVisible: false,
      mode: ""
    };
  },
  watch: {
    'dialogVisible'(newValue) {
        if(!newValue){
            this.$nextTick(()=>{
                this.$refs.subjectFormRef.clearValidate()
            })
        }
    }
  },
  methods: {
    submit() {
      //提交
      this.$refs.subjectFormRef.validate(async valid => {
        //表单验证
        if (!valid) return;

        //请求
        let res;
        // console.log(this.mode);

        if (this.mode == "add") {
          console.log(111);

          res = await this.$axios.post("/subject/add", this.subjectForm);
        } else {
          console.log(222);

          res = await this.$axios.post("/subject/edit", this.subjectForm);
        }

        console.log(res);
        if (res.data.code == 200) {
          //成功提示
          this.$message({
            message: this.mode == "add" ? "添加成功" : "编辑成功",
            type: "success"
          });
          //关闭弹框
          this.dialogVisible = false;
          //刷新页面
          this.$parent.search();
        }
      });
    }
  }
};
</script>

<style lang="less">
.subjectAdd {
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
  .el-dialog__footer {
    text-align: center;
  }
}
</style>