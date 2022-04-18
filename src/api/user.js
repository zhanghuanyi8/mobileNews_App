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

// 关注用户
export const addFollow = (target) => request({
  method: 'POST',
  url: '/v1_0/user/followings',
  data: {
    target
  }
})

//取消关注
export const DeleteFollow = (target) => request({
  method: 'DELETE',
  url: `/v1_0/user/followings/${target}`,

})
// 获取用户资料
export const getUser = (target) => request({
  method: 'GET',
  url: `/v1_0/user/profile`,

})

// 更新用户资料
export const updateUser = (data) => request({
  method: 'PATCH',
  url: `/v1_0/user/profile`,
  data
})
//更新用户头像

export const upphoto = (data) => request({
  method: 'PATCH',
  url: `/v1_0/user/photo`,
  data
})