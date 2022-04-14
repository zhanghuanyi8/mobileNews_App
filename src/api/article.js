import request from "@/utils/request";
// 请求文章详情
export const getArticle = (id) => request({
  url: `/v1_0/articles/${id}`

})