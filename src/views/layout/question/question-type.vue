<template>
  <div>
    <div v-if="questionForm.type == 1">
      <div v-for="(item) in questionForm.select_options" :key="item.label" class="item">
        <el-radio
          v-model="questionForm.single_select_answer"
          :label="item.label"
          @change="changeValue"
        >{{item.label}}</el-radio>
        <el-input v-model="item.text"></el-input>
        <questionUpload style="margin-left:15px" v-model="item.image"></questionUpload>
      </div>
    </div>
    <div v-if="questionForm.type == 2">
      <div v-for="(item) in questionForm.select_options" :key="item.label" class="item">
        <el-checkbox
          v-model="questionForm.multiple_select_answer"
          :label="item.label"
          @change="changeValue"
        ></el-checkbox>
        <el-input v-model="item.text"></el-input>
        <questionUpload style="margin-left:15px" v-model="item.image"></questionUpload>
      </div>
    </div>
    <div v-if="questionForm.type == 3">
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        v-model="questionForm.short_answer"
        @change="changeValue"
      ></el-input>
    </div>
  </div>
</template>

<script>
import questionUpload from "./question-upload";
export default {
  name: "types",
  components: {
    questionUpload
  },
  props: ["questionForm"],
  methods: {
    changeValue() {
      this.$emit('childchange')
    }
  }
};
</script>

<style lang="less">
.item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
</style>