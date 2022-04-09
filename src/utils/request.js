import axios from 'axios'
import store from '@/store'
// 为啥用create  因为后期可能请求的基本路径不一样 这样可以创建多个axios  配置多个不同的axios去使用
const request = axios.create({
    baseURL: 'http://toutiao.itheima.net'
})
request.interceptors.request.use(config => {
    if (store.state.user && store.state.user.token) {
        config.headers.Authorization = `Bearer ${store.state.user.token}`
    }

    return config
}, (err) => {
    return Promise.reject(err)
})
export default request
