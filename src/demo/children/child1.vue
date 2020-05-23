<template>
  <div style="float: left;;width:600px;height:500px; border:1px solid blue">子组件1
      <ul>
          <li v-for="(item, index) in list" :key="index">{{item.name}} ---{{item.age}}</li>
      </ul>
      <button @click="getData">点我获取数据</button>
  </div>
</template>

<script>
export default {
    props:{
        list:{
            type:Array
        }
    },
    data() {
        return {
            name:'俊辉'
        }
    },
    methods: {
        getData(){
            this.$emit('aA',this.name)
        }
    },
};
</script>

<style>

</style>