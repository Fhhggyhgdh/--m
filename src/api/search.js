import request from '@/utils/request'

/**
 *搜索建议
 * @param {*} q 关键词
 * @returns Promise
 */
export const getSuggestionsAPI = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

/**
 *获取搜索结果
 * @param {Number} page 页数，非必传
 * @param {Number} per_page 每页数据的数量
 * @param {String} q 关键词
 * @returns Promise
 */
export const getResultAPI = (/* eslint-disable-line */ page, per_page, q) => {
  return request({
    url: '/v1_0/search',
    params: {
      page,
      per_page,
      q
    }
  })
}
