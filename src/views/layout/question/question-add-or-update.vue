<template>
  <div class="questionEdit">
    <el-dialog :visible.sync="dialogVisible" fullscreen>
      <div slot="title" class="title">{{mode == 'add' ? '新增试题' : '编辑试题'}}</div>
      <el-form
        ref="questionFormRef"
        :rules="rules"
        :model="questionForm"
        class="form"
        label-position="left"
        label-width="120px"
      >
        <el-form-item label="学科" prop="subject">
          <el-select v-model="questionForm.subject" placeholder="请选择学科" class="selectWidth">
            <el-option
              v-for="item in subjectList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段" prop="step">
          <el-select v-model="questionForm.step" placeholder="请选择阶段" class="selectWidth">
            <el-option v-for="(value,name) in stepObj" :key="name" :label="value" :value="+name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业" prop="enterprise">
          <el-select v-model="questionForm.enterprise" placeholder="请选择企业" class="selectWidth">
            <el-option
              v-for="item in enterpriseList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <!-- props="{value : ''}"  默认是value 是编号 更改为城市名label -->
          <el-cascader
            size="large"
            :props="{ value: 'label' }"
            :options="optionCity"
            v-model="questionForm.city"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="题型" prop="type">
          <el-radio-group v-model="questionForm.type">
            <el-radio v-for="(value, name) in typeObj" :label="+name" :key="name">{{value}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="难度" prop="difficulty">
          <el-radio-group v-model="questionForm.difficulty">
            <el-radio :label="+name" v-for="(value, name) in difficultyObj" :key="name">{{value}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <hr class="hrMargin" />
        <el-form-item label="试题标题" class="setMargin" prop="title">
          <quill-editor
            :options="{placeholder:'请输入内容...'}"
            v-model="questionForm.title"
            @change="onEditorChange('title')"
          ></quill-editor>
        </el-form-item>

        <!-- 插眼 规则验证 -->
        <el-form-item
          :label="typeObj[questionForm.type]"
          :prop="questionTypeObj[questionForm.type]"
        >
          <questionType :questionForm="questionForm" @childchange="Valuechildchange"></questionType>
        </el-form-item>
        <hr class="hrMargin" />
        <el-form-item label="解析视频">
          <questionUpload type="video" v-model="questionForm.video"></questionUpload>
        </el-form-item>
        <el-form-item label="答案解析" class="setMargin" prop="answer_analyze">
          <quill-editor
            :options="{placeholder:'请输入答案解析...'}"
            v-model="questionForm.answer_analyze"
            @change="onEditorChange('answer_analyze')"
          ></quill-editor>
        </el-form-item>
        <el-form-item label="试题备注" prop="remark">
          <el-input v-model="questionForm.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button>取消</el-button>
          <el-button type="primary" @click="submit">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { regionData } from "element-china-area-data";

import { quillEditor } from "vue-quill-editor"; // 调用富文本编辑器
import "quill/dist/quill.snow.css"; // 富文本编辑器外部引用样式  三种样式三选一引入即可
//import 'quill/dist/quill.core.css'
//import 'quill/dist/quill.bubble.css'
import * as Quill from "quill"; // 富文本基于quill

//题型组件
import questionType from "./question-type";
import questionUpload from "./question-upload";
export default {
  name: "questions",
  components: {
    quillEditor,
    questionType,
    questionUpload
  },
  props: {
    subjectList: Array, //  学科
    enterpriseList: Array, //企业
    stepObj: Object, //阶段
    typeObj: Object, //题型
    difficultyObj: Object //难度
  },
  data() {
    return {
      dialogVisible: false, //控制彈框
      mode: "", //新增还是编辑
      optionCity: regionData, //城市
      questionTypeObj: {
        1: "single_select_answer",
        2: "multiple_select_answer",
        3: "short_answer"
      },
      questionForm: {
        subject: "",
        step: "", //阶段
        enterprise: "", //企业
        city: [], //城市
        type: "1", //题型
        difficulty: "1", //难度
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
      },
      rules: {
        subject: [{ required: true, message: "请选择学科", trigger: "change" }],
        step: [{ required: true, message: "请选择阶段", trigger: "change" }],
        enterprise: [
          { required: true, message: "请选择企业", trigger: "change" }
        ],
        city: [{ required: true, message: "请选择城市", trigger: "change" }],
        type: [{ required: true, message: "请选择题型", trigger: "change" }],
        difficulty: [
          { required: true, message: "请选择难度", trigger: "change" }
        ],
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        answer_analyze: [
          { required: true, message: "请输入答案解析", trigger: "change" }
        ],
        single_select_answer: [
          { required: true, message: "单选题答案不能为空", trigger: "change" }
        ],
        multiple_select_answer: [
          { required: true, message: "多选题答案不能为空", trigger: "change" }
        ],
        short_answer: [
          { required: true, message: "简答题答案不能为空", trigger: "change" }
        ],
        remark: [
          { required: true, message: "请输入试题备注", trigger: "change" }
        ]
      }
    };
  },
  watch: {
    dialogVisible(newValue) {
      if (!newValue) {
        this.$refs.questionFormRef.clearValidate();
      }
    }
  },
  methods: {
    onEditorChange(value) {
      this.$refs.questionFormRef.validateField(value);
    },
    Valuechildchange() {
      this.$refs.questionFormRef.validateField([
        "single_select_answer",
        "multiple_select_answer",
        "short_answer"
      ]);
    },
    submit() {
      this.$refs.questionFormRef.validate(async valid => {
        //规则验证
        if (!valid) return;

        //验证成功处理的事情
        let res;
        if (this.$parent.mode == "add") {
          res = await this.$axios.post("/question/add", this.questionForm);
        } else {
          this.questionForm.city = this.questionForm.city.join(",");
          res = await this.$axios.post("/question/edit", this.questionForm);
        }
        // console.log(res);

        //成功
        if (res.data.code == 200) {
          //1, 提示成功
          this.$message({
            message: this.$parent.mode == "add" ? "新增成功" : "编辑成功",
            type: "success"
          });
          //2, 关闭弹框
          this.dialogVisible = false;
          //3, 刷新
          this.$parent.search();
        }
      });
    }
  }
};
</script>

<style lang='less'>
.questionEdit {
  .title {
    color: #fff;
    padding-left: 15px;
    height: 54px;
    line-height: 54px;
    background-color: #04bcfa;
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .form {
    width: 832px;
    margin: 0 auto;
  }
  .selectWidth {
    width: 300px;
  }
  .hrMargin {
    margin-bottom: 20px;
  }
  .setMargin {
    .el-form-item__content {
      margin-left: 0px !important;
      margin-top: 40px;
    }
  }
  .ql-editor {
    height: 200px;
  }
}
</style>