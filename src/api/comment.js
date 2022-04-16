
import request from "@/utils/request"

// 获取评论
export const getComments = (params) => request({
  url: '/v1_0/comments',
  params
})

// 对评论点赞
export const addCommentLike = (target) => request({
  method: 'POST',
  url: `/v1_0/comment/likings`,
  data: {
    target
  }
})
// 取消点赞
export const deleteCommentLike = (target) => request({
  method: 'POST',
  url: `/v1_0/comment/likings/${target}`
})

export const artpost = (data) => request({
  method: 'POST',
  url: `/v1_0/comments`,
  data
})