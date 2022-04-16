import request from "@/utils/request";
// 请求文章详情
export const getArticle = (id) => request({
  url: `/v1_0/articles/${id}`

})

// 收藏

export const addCollect = (target) => request({
  method: 'POST',
  url: `/v1_0/article/collections`,
  data: {
    target
  }

})

// 取消收藏
export const delCollect = (target) => request({
  method: 'DELETE',
  url: `/v1_0/article/collections/${target}`,
})

// 点赞

export const addLiked = (target) => request({
  method: 'POST',
  url: `/v1_0/article/likings`,
  data: {
    target
  }
})
// 取消点赞
export const delLiked = (target) => request({
  method: 'DELETE',
  url: `/v1_0/article/likings/${target}`,
})

