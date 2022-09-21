import request from '@/utils/request'

/**
 *获取评论或评论回复
 * @param {*} type 评论类型，a是对文章的评论,c是对评论的回复
 * @param {*} source  源id,文章id或评论id
 * @param {*} offset  获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
 * @param {*} limit  获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
 * @returns
 */
export const getCommentsListAPI = (type, source, offset, limit) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type,
      source,
      offset,
      limit
    }
  })
}

/**
 *对文章或者评论进行评论
 * @param {string} target 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
 * @param {string} content 评论内容
 * @param {string} artId 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
 * @returns
 */
export const pubCommentAPI = (target, content, artId) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: { target, content, art_id: artId }
  })
}
