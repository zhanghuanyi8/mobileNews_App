import axios from 'axios'
import store from '@/store'
import { Toast } from 'vant'
// 为啥用create  因为后期可能请求的基本路径不一样 这样可以创建多个axios  配置多个不同的axios去使用
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})

// 请求拦截器
request.interceptors.request.use(config => {
  if (store.state.user && store.state.user.token) {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }

  return config
}, (err) => {
  console.log('我是请求的错误');
  return Promise.reject(err)
})
// 响应拦截器
request.interceptors.response.use(response => {
  return response
}, err => {
  if (err.response.status === 400) {
    return Toast.fail("登录失败");
  }
  return Promise.reject(err)
})
export default request
