<template>
  <div class="author">
    <!-- 作者 -->
    <van-cell>
      <!-- 左侧头像 -->
      <template #icon
        ><van-image
          round
          width="0.93333rem"
          height="0.93333rem"
          :src="articleDetail.aut_photo"
      /></template>
      <!-- 左侧title内容 -->
      <template #title>
        <div>
          <div>{{ articleDetail.aut_name }}</div>
          <span>{{ pubdate }}</span>
        </div>
      </template>
      <!-- 右侧内容 -->
      <van-button
        round
        type="info"
        v-if="articleDetail.is_followed"
        @click="followed"
        ><van-icon name="success" />已关注</van-button
      >
      <van-button round type="info" v-else @click="follow"
        ><van-icon name="plus" />关注</van-button
      >
    </van-cell>
  </div>
</template>

<script>
import { followUserAPI, deleteFollowUserAPI } from '@/api'
import dayjs from '@/utils/dayjs'

export default {
  props: {
    articleDetail: Object
  },
  computed: {
    pubdate() {
      return dayjs(this.articleDetail.pubdate).fromNow()
    }
  },
  methods: {
    // 点击关注时触发
    async follow() {
      try {
        const res = await followUserAPI(this.articleDetail.aut_id)
        if (res.status === 201) {
          /* eslint-disable */
          this.$toast.success('关注成功')
          this.articleDetail.is_followed = true
        }
      } catch (error) {
        if (!error.response) {
          throw error
        }
        if (error.response && error.response.status === 401) {
          this.$toast.fail('登陆过期，请重新登录')
        }
        if (error.response && error.response.status === 400) {
          console.log('请求参数错误')
        }
        if (error.response && error.response.status === 400) {
          console.log('数据库错误')
        }
      }
    },
    // 点击已关注时触发
    async followed() {
      try {
        const res = await deleteFollowUserAPI(this.articleDetail.aut_id)
        if (res.status === 204) {
          this.$toast.success('取消关注')
          this.articleDetail.is_followed = false
        }
      } catch (error) {
        if (!error.response) {
          throw error
        }
        if (error.response && error.response.status === 401) {
          this.$toast.fail('登陆过期，请重新登录')
        }
        if (error.response && error.response.status === 404) {
          console.log('访问路径错误')
        }
        if (error.response && error.response.status === 400) {
          console.log('数据库异常')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.author {
  .van-cell__title {
    margin-left: 0.33333rem;
  }
  .title {
    font-weight: 700;
    padding-left: 0.42667rem;
  }
  .van-button--normal {
    width: 2.35rem;
    height: 0.77333rem;
  }
}
</style>
