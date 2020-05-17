const key = 'heimamm_token'

const setToken = (token) => {
    return localStorage.setItem(key,token)
}

const getToken = () => {
    return localStorage.getItem(key)
}

const removeToken = () => {
    return localStorage.removeItem(key)
}

//按需导出
export {setToken,getToken,removeToken}