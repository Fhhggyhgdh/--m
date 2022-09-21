<template>
  <div class="discuss">
    <van-cell>
      <!-- 左侧头像 -->
      <template #icon
        ><van-image
          round
          width="0.93333rem"
          height="0.93333rem"
          :src="params.aut_photo"
      /></template>
      <!-- 左侧title内容 -->
      <template #title>
        <div class="autName">{{ params.aut_name }}</div>
        <p>{{ params.content }}</p>
        <div class="time">
          <span>{{ pubdate }}</span> &nbsp;
          <van-button round type="default"
            >回复 {{ params.reply_count }}</van-button
          >
        </div>
      </template>
      <!-- 右侧内容 -->
      <van-icon name="good-job-o" /> &nbsp;<span>赞</span>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'

export default {
  props: {
    params: Object
  },
  computed: {
    pubdate() {
      return dayjs(this.params.pubdate).fromNow()
    }
  }
}
</script>

<style scoped lang="less">
.discuss {
  .van-cell__title {
    text-align: left;
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
