import axios from 'axios'
// 为啥用create  因为后期可能请求的基本路径不一样 这样可以创建多个axios  配置多个不同的axios去使用
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})
export default request
