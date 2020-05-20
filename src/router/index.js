import Vue from 'vue'
import VueTouter from 'vue-router'

//导入组件
import layout from '../views/layout/index.vue'
import login from '../views/login/index.vue'
import chart from '../views/layout/chart'
import user from '../views/layout/user'
import enterproise from '../views/layout/enterproise'
import question from '../views/layout/question'
import subject from '../views/layout/subject'
//全局注册
Vue.use(VueTouter)

//配置项
let router = new VueTouter({
    routes: [
        { path: '*', redirect: '/' },
        { path: '/', component: login },
        {
            path: '/layout', component: layout, children: [
                { path: 'chart', component: chart },
                { path: 'user', component: user },
                { path: 'enterproise', component: enterproise },
                { path: 'question', component: question },
                { path: 'subject', component: subject }
            ]
        },
        { path: '/login', component: login }
    ]
})

//导航守卫
//按需导入 token 
import { getToken } from '../util/token'
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next()  //如果是login就放行
    } else {

        //保存token 
        const token = getToken()
        //判断token有没有值
        //有值就放行,说明可以通行
        if (token) {
            next()
        } else {  //没有token就给你强行打回打login页面, 让你登录
            next('/login')
        }
    }
})

export default router