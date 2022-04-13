import request from "@/utils/request";

export const getAllchannels = () => {
  return request({
    method: 'GET',
    url: 'v1_0/channels'
  })
}
// 添加频道接口
export const AddUserChannels = (channels) => {
  return request({
    method: 'PATCH',
    url: 'v1_0/user/channels',
    data: {
      channels: [channels]
    }
  })
}

// 删除频道接口

export const DeleteUserChannels = (data) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${data}`
  })
}