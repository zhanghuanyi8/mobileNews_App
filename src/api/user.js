import request from '@/utils/request'

// 登录接口
export const login = data => request({
  method: 'POST',
  url: '/v1_0/authorizations',
  data
})
// 验证码接口
export const code = params => request({
  methods: 'get',
  url: `/v1_0/sms/codes/${params}`,

})
// 用户资料
export const getUserInfo = () => request({
  methods: 'get',
  url: `/v1_0/user`,
})

// 频道列表
export const getUserChannels = () => request({
  methods: 'get',
  url: `/v1_0/user/channels`,
})
