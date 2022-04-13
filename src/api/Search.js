import request from "@/utils/request";

export const getSuggestion = (q) => request({
  url: '/v1_0/suggestion',
  method: 'GET',
  params: {
    q
  }
})
export const searchResult = (params) => request({
  method: "get",
  url: '/v1_0/search',
  params,
})
