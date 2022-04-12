import request from "@/utils/request";

export const getList = params => {
  return request({
    method: 'get',
    url: '/v1_0/articles',
    params,
  })
}