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
import personal from '../views/layout/personal'
//全局注册
Vue.use(VueTouter)


import parent from '../demo/parent.vue'
//配置项
let router = new VueTouter({
    routes: [
        { path: '*', redirect: '/' },
        { path: '/', component: login },
        {
            path: '/layout', component: layout, meta: { roles: ["超级管理员", "管理员", "老师", "学生"] }, children: [
                {
                    path: 'personal', component: personal,
                    meta: {
                        roles: ["超级管理员", "管理员", "老师", "学生"],
                        icon: "el-icon-date",
                        fullPath: "/layout/personal",
                        title: "个人信息",
                    },
                },
                {
                    path: 'chart', component: chart,
                    meta: {
                        roles: ["超级管理员", "管理员", "老师"],
                        icon: "el-icon-pie-chart",
                        fullPath: "/layout/chart",
                        title: "数据预览",
                    },
                },
                {
                    path: 'user', component: user,
                    meta: {
                        roles: ["超级管理员", "管理员", "老师"],
                        icon: "el-icon-user",
                        fullPath: "/layout/user",
                        title: "用户列表",
                    },
                },
                {
                    path: 'enterproise', component: enterproise,
                    meta: {
                        roles: ["超级管理员", "管理员", "老师"],
                        icon: "el-icon-office-building",
                        fullPath: "/layout/enterproise",
                        title: "企业列表",
                    },
                },
                {
                    path: 'question', component: question,
                    meta: {
                        roles: ["超级管理员", "管理员", "老师", "学生"],
                        icon: "el-icon-edit-outline",
                        fullPath: "/layout/question",
                        title: "题库列表",
                    },
                },
                {
                    path: 'subject', component: subject,
                    meta: {
                        roles: ["超级管理员", "管理员", "老师"],
                        icon: "el-icon-notebook-2",
                        fullPath: "/layout/subject",
                        title: "学科列表",
                    },
                },

            ]
        },
        { path: '/login', component: login, meta: { title: "登录" } },
        { path: '/parent', component: parent },
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

router.afterEach((to, from) => {
    console.log(to.meta.title);

    document.title = to.meta.title || '黑马面面'
})

export default router