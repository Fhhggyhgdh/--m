import store from '@/store'
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 5000
})
request.interceptors.request.use(function (config) {
  const {
    getters: { isLogin },
    state: { tokenObj }
  } = store
  if (isLogin) {
    config.headers.Authorization = `Bearer ${tokenObj.token}`
  }
  return config
})
export default request
