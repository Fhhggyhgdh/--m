<template>
  <div class="bullerFrame">
    <van-field
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    >
      <template #extra>
        <span class="publish" @click="pubComment">发布</span>
      </template></van-field
    >
  </div>
</template>

<script>
import { pubCommentAPI } from '@/api'

export default {
  inject: {
    articleId: {
      type: [String, Number, Object],
      default: null
    }
  },
  props: {
    target: {
      type: [String, Number, Object],
      required: true
    }
  },
  data() {
    return {
      message: ''
    }
  },
  methods: {
    async pubComment() {
      try {
        if (this.message.length === 0) return
        const res = await pubCommentAPI(
          this.target,
          this.message,
          this.articleId ? this.articleId : null
        )
        // console.log(res)
        if (res.status === 201) {
          this.$toast.success('评论成功')
          this.$emit('publish', res.data.data)
          this.message = ''
          this.$parent.$parent.$parent.isShowComment = false
        }
      } catch (error) {
        this.$parent.$parent.$parent.isShowComment = false
        if (!error.response) {
          throw error
        }
        if (error.response && error.response.status === 400) {
          console.log('请求参数错误')
        }
        if (error.response && error.response.status === 401) {
          this.$toast.fail('登陆过期，请重新登录')
        }
        if (error.response && error.response.status === 403) {
          this.$toast.fail('文章已关闭评论')
        }
        if (error.response && error.response.status === 400) {
          console.log('数据库错误')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.bullerFrame {
  /deep/.van-cell {
    margin-top: 20px !important;
    padding: 15px 0 15px 32px;
  }
  /deep/.van-cell__value {
    padding: 20px 32px;
    background-color: #f5f7f9;
  }
  .publish {
    display: inline-block;
    width: 1.5rem;
    line-height: 176px;
    color: #6ba3d8;
    text-align: center;
  }
}
</style>
