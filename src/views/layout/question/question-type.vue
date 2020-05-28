<template>
  <div>
    <div v-if="questionForm.type == 1">
      <div v-for="(item) in questionForm.select_options" :key="item.label" class="item">
        <el-radio v-model="questionForm.single_select_answer" :label="item.label">{{item.label}}</el-radio>
        <el-input v-model="item.text"></el-input>
      </div>
    </div>
    <div v-if="questionForm.type == 2">
      <div v-for="(item) in questionForm.select_options" :key="item.label" class="item">
        <el-checkbox v-model="questionForm.multiple_select_answer" :label="item.label"></el-checkbox>
        <el-input v-model="item.text"></el-input>
      </div>
    </div>
    <div v-if="questionForm.type == 3">
      <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="questionForm.short_answer"></el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "types",
  props: ["questionForm"]
};
</script>

<style lang="less">
.item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
</style>