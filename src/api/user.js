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
