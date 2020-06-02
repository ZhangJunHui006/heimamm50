import Vue from 'vue'
import App from './App.vue'

import './pligins/element'
import router from './router/index'
//导入axios
import './util/request.js'
Vue.config.productionTip = false


//导入vuex
import store from './store/index'
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
