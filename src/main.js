import Vue from 'vue'
import App from './App.vue'

import './pligins/element'
import router from './router/index'
//导入axios
import './util/request.js'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
