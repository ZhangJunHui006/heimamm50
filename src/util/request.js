import Vue from 'vue'
import axios from 'axios'
import { getToken, removeToken } from '../util/token'
import router from '@/router'

//请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = getToken()
    if (token) {
        config.headers.token = token
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// http响应拦截器
axios.interceptors.response.use(res => {
    if (res.data.code == 206) {

        //退出登录
        removeToken()
        //跳转
        router.push('/login')
    }
    return res
},
    error => {
        alert('请求失败，请稍后重试！')
        return Promise.reject(error)
    }
)

//设置基准路径
axios.defaults.baseURL = process.env.VUE_APP_BASEURL
//携带cookies
axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios