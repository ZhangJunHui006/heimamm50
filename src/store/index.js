//导包
import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

//代码
const store = new Vuex.Store({
    //保存到仓库的数据
    state: {
        userInfo: {}
    },
    mutations: {
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo
        }
    },
    getters: {
        getUserInfo(state) {
            return state.userInfo
        }
    }
})

//导出
export default store

