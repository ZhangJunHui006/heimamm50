import Vue from 'vue'
import axios from 'axios'


//设置基准路径
axios.defaults.baseURL = process.env.VUE_APP_BASEURL
//携带cookies
axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios