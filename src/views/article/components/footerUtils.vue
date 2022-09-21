<template>
  <div class="footerUtils">
    <van-tabbar>
      <!-- 发表评论 -->
      <van-tabbar-item>
        <van-button
          type="default"
          round
          size="mini"
          @click="isShowComment = true"
          >写评论</van-button
        >
      </van-tabbar-item>
      <!-- 发表评论的弹出层 -->
      <van-popup
        v-model="isShowComment"
        position="bottom"
        :style="{ height: '120px' }"
      >
        <bullet-frame
          @publish="publish"
          :target="articleDetail.art_id"
        ></bullet-frame>
      </van-popup>

      <van-tabbar-item
        icon="comment-o"
        :badge="articleDetail.comm_count"
      ></van-tabbar-item>
      <!-- 已收藏 -->
      <van-tabbar-item
        icon="star"
        class="isCollected"
        v-if="articleDetail.is_collected"
        @click="deleteCollectedArticle"
      ></van-tabbar-item>
      <!-- 未收藏 -->
      <van-tabbar-item
        icon="star-o"
        v-else
        @click="collectedArticle"
      ></van-tabbar-item>
      <van-tabbar-item icon="good-job-o"></van-tabbar-item>
      <van-tabbar-item icon="share-o"></van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import bulletFrame from './bulletFrame.vue'
import { collectedArticleAPI, deleteCollectedArticleAPI } from '@/api'

export default {
  props: {
    articleDetail: Object,
    commentsinfo: Array
  },
  components: { bulletFrame },
  data() {
    return {
      isShowComment: false
    }
  },
  methods: {
    async collectedArticle() {
      try {
        const id = this.$route.params.articleId
        const res = await collectedArticleAPI(id)
        if (res.status === 201) {
          this.$toast.success('收藏成功')
          this.$parent.articleDetail.is_collected = true
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
    async deleteCollectedArticle() {
      try {
        const id = this.$route.params.articleId
        const res = await deleteCollectedArticleAPI(id)
        if (res.status === 204) {
          this.$toast.success('取消收藏')
          this.$parent.articleDetail.is_collected = false
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
    publish(data) {
      /* eslint-disable*/
      this.commentsinfo.unshift(data.new_obj)
    }
  }
}
</script>

<style scoped lang="less">
.footerUtils {
  .isCollected {
    color: #009bfa;
  }
  .van-button {
    margin-bottom: 0.3rem;
    width: 3rem;
    height: 0.61333rem;
    margin-left: 0.5rem;
    border: 0.02667rem solid #eee;
    font-size: 0.4rem;
    line-height: 0.61333rem;
    color: #a7a7a7;
  }
}
</style>
