import Vue from 'vue'
import VueTouter from 'vue-router'

//导入组件
import layout from '../views/layout/index.vue'
import login from '../views/login/index.vue'
//全局注册
Vue.use(VueTouter)

//配置项
let router = new VueTouter({
    routes: [
        { path: '*', redirect: '/' },
        { path: '/', component: layout },
        { path: '/layout', component: layout },
        { path: '/login', component: login }
    ]
})

export default router