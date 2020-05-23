<template>
  <div style="width:1400px;height:600px; border:1px solid red">
    我是父组件
    {{name}}
    <br />
    <br />
    <br />
    <br />
    <div>
      <child1 :list="msg" @aA="getChildData"></child1>
    </div>
    <div>
      <child2></child2>
    </div>
  </div>
</template>

<script>
import child1 from "./children/child1";
import child2 from "./children/child2";
export default {
  components: {
    child1,
    child2
  },
  data() {
    return {
      msg: [
        { name: "波波", age: 12 },
        { name: "俊辉", age: 21 },
        { name: "哈哈", age: 32 }
      ],
      name: ""
    };
  },
  methods: {
    getChildData(a) {
      this.name = a;
    }
  }
};
</script>

<style>
</style>