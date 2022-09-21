import request from '@/utils/request'
import store from '@/store'

/**
 * 登录
 * @param {String} mobile 手机号
 * @param {Number} code 验证码
 * @returns Promise
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'post',
    data: {
      mobile,
      code
    }
  })
}

/**
 * 发送验证码
 * @param {String} mobile 手机号
 * @returns Promise
 */
export const sendCodeAPI = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

/**
 * 获取用户信息
 * @returns Promise
 */
export const getUserInfo = () => {
  return request({
    url: '/v1_0/user',
    headers: {
      Authorization: `Bearer ${store.state.tokenObj.token}`
    }
  })
}

/**
 *上传图片
 * @param {*} file 裁剪过后的图片的file对象
 * @returns
 */
export const uploadPhoto = (file) => {
  const fm = new FormData()
  fm.append('photo', file)
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fm
  })
}

/**
 * 获取用户个人资料
 * @returns Promise
 */
export const getUserPersonalInfoAPI = () => {
  return request({ url: '/v1_0/user/profile' })
}

/**
 *更新用户信息
 * @param {*} name 用户昵称
 * @param {*} gender 性别
 * @param {*} birthday 出生日期
 * @returns Promise
 */
export const updateUserPersonalInfoAPI = (data) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}

/**
 *关注用户
 * @param {*} target 关注用户的ID
 * @returns Promise
 */
export const followUserAPI = (target) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target
    }
  })
}

/**
 *取消关注
 * @param {*} target 取消关注用户的id
 * @returns Promise
 */
export const deleteFollowUserAPI = (target) => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE'
  })
}
