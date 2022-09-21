<template>
  <div class="comment-reply">
    <!-- 头部 -->
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'
      "
    >
      <template #left
        ><van-icon name="cross" @click="$emit('close')"
      /></template>
    </van-nav-bar>
    <div class="scroll-wrap">
      <!-- 当前评论项 -->
      <comment-item :params="comment"></comment-item>

      <!-- 评论的回复列表 -->
      <van-cell title="全部回复" />
      <comment
        @commentsinfo="replyList = $event"
        :source="comment.com_id"
        type="c"
      ></comment>
    </div>
    <!-- 发布评论 -->
    <div class="post-wrap">
      <van-button class="post-btn" @click="isPostShow = true" size="small" round
        >写评论</van-button
      >
    </div>
    <!-- 弹出层 -->
    <van-popup
      v-model="isPostShow"
      position="bottom"
      :style="{ height: '120px' }"
    >
      <bullet-frame @publish="publish" :target="comment.com_id"></bullet-frame>
    </van-popup>
  </div>
</template>

<script>
import commentItem from '@/components/comment-item.vue'
import Comment from './comment.vue'
import bulletFrame from './bulletFrame.vue'
export default {
  components: { commentItem, Comment, bulletFrame },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isPostShow: false,
      replyList: []
    }
  },
  methods: {
    publish(data) {
      /* eslint-disable*/
      this.comment.reply_count++
      this.isPostShow = false
      this.replyList.unshift(data.new_obj)
    }
  }
}
</script>

<style scoped lang="less">
.comment-reply {
  .scroll-wrap {
    height: calc(100vh - 92px - 88px);
    overflow: auto;
  }
  .post-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 88px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-top: 1px solid #d8d8d8;
    .post-btn {
      width: 80%;
    }
  }
}
</style>
