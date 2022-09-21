<template>
  <div class="comment">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(comment, index) in commentsinfo" :key="index">
        <!-- 左侧头像 -->
        <template #icon
          ><van-image
            round
            width="0.93333rem"
            height="0.93333rem"
            :src="comment.aut_photo"
        /></template>
        <!-- 左侧title内容 -->
        <template #title>
          <div class="autName">{{ comment.aut_name }}</div>
          <p>{{ comment.content }}</p>
          <div class="time">
            <span>{{ comment.pubdate | pubdate }}</span> &nbsp;
            <van-button
              round
              type="default"
              @click="$emit('reply-click', comment)"
              >回复 {{ comment.reply_count }}</van-button
            >
          </div>
        </template>
        <!-- 右侧内容 -->
        <van-icon name="good-job-o" /> &nbsp;<span>赞</span>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
import { getCommentsListAPI } from '@/api'

export default {
  props: {
    source: {
      type: String
    },
    type: {
      type: String,
      // 用于验证传入的参数，只能是a或者c
      validator(value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      offset: null, // 用来获取下一页数据参数
      limit: 5,
      commentsinfo: []
    }
  },
  filters: {
    pubdate(time) {
      return dayjs(time).fromNow()
    }
  },
  methods: {
    // 获取文章的评论
    async onLoad() {
      try {
        const res = await getCommentsListAPI(
          this.type,
          this.source,
          this.offset,
          this.limit
        )
        if (res.status === 200) {
          this.commentsinfo.push(...res.data.data.results)
          this.$emit('commentsinfo', this.commentsinfo)
          this.loading = false
          if (res.data.data.results.length) {
            this.offset = res.data.data.last_id
          } else {
            this.finished = true
          }
        }
      } catch (error) {
        this.error = true
        this.loading = false
        if (!error.response) {
          throw error
        }
        if (error.response && error.response.status === 400) {
          console.log('请求参数错误')
        }
        if (error.response && error.response.status === 507) {
          console.log('服务器数据异常')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment {
  .van-cell__title {
    margin-left: 0.33333rem;
  }
  .autName {
    color: #406599;
  }
  .time {
    font-size: 0.25333rem;
    color: #222;
    .van-button--normal {
      width: 1.8rem;
      height: 0.64rem;
      line-height: 0.64rem;
      font-size: 0.28rem;
      color: #222;
    }
  }
}
</style>
