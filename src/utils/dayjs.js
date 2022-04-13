import Vue from 'vue'
import dayjs from 'dayjs'

// 默认为英文  我们配置为中文 加载语言中文包
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)

// 配置全局使用中文语言包
dayjs.locale('zh-cn')
// 全局过滤器：处理相对时间
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
});