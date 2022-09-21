import request from '@/utils/request'

/**
 *获取文章的详细信息
 * @param {Number} id 获取文章的id
 * @returns Promise
 */
export const getArticleDetailAPI = (id) => {
  return request({
    url: `/v1_0/articles/${id}`
  })
}

/**
 *收藏文章
 * @param {*} id 收藏的目标文章id
 * @returns Promise
 */
export const collectedArticleAPI = (target) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target
    }
  })
}

/**
 *取消收藏
 * @param {*} id 取消收藏的文章
 * @returns Promise
 */
export const deleteCollectedArticleAPI = (id) => {
  return request({
    url: `/v1_0/article/collections/${id}`,
    method: 'DELETE'
  })
}
