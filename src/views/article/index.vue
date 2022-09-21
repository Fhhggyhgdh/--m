<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar
      title="黑马头条"
      left-arrow
      @click-left="$router.back()"
      class="navbar"
    />
    <!-- 文章详情 -->
    <div class="articleItem">
      <!-- 文章标题 -->
      <p class="title">{{ articleDetail.title }}</p>

      <!-- 作者 -->
      <author :articleDetail="articleDetail"></author>

      <!-- 文章内容 -->
      <article class="markdown-body">
        <span v-html="articleDetail.content" ref="article"></span>
      </article>
      <van-divider>正文结束</van-divider>
      <!-- 评论区 -->
      <comment
        :source="articleDetail.art_id"
        @commentsinfo="commentsinfo = $event"
        @reply-click="onReplyClick"
      ></comment>
    </div>

    <!-- 底部工具栏 -->
    <footer-utils
      :articleDetail="articleDetail"
      :commentsinfo="commentsinfo"
    ></footer-utils>

    <!-- 评论回复 -->
    <van-popup
      v-model="isShowreply"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <comment-reply
        v-if="isShowreply"
        :comment="currentComment"
        @close="isShowreply = false"
      ></comment-reply>
    </van-popup>
  </div>
</template>

<script>
import comment from './components/comment.vue'
import footerUtils from './components/footerUtils.vue'
import Author from './components/author.vue'
import commentReply from './components/commentReply.vue'
import { getArticleDetailAPI } from '@/api'
// 引入第三方插件的css
import 'github-markdown-css/github-markdown.css'
import { ImagePreview } from 'vant'

export default {
  components: { comment, footerUtils, Author, commentReply },
  // 给所有的后代组件提供数据
  provide: function () {
    return {
      articleId: this.$route.params.articleId
    }
  },
  data() {
    return {
      articleDetail: {}, // 文章的内容详情
      commentsinfo: [], // 对文章进行评论的列表
      isShowreply: false, // 展示回复评论的弹出层
      currentComment: {} // 当前点击回复的评论项
    }
  },
  created() {
    this.getArticleDetail()
  },
  methods: {
    // 获取文章的详细信息
    async getArticleDetail() {
      try {
        const articleId = this.$route.params.articleId
        const { data } = await getArticleDetailAPI(articleId)
        this.articleDetail = data.data
        // 初始化图片点击预览
        setTimeout(() => {
          this.previewImage()
        }, 0)
      } catch (error) {
        if (!error.response) {
          throw error
        }
        if (error.response && error.response.status === 404) {
          this.$toast.fail('文章不存在')
        }
        if (error.response && error.response.status === 507) {
          console.log('服务器数据异常')
        }
      }
    },

    previewImage() {
      // 得到所有的img节点
      const articleContent = this.$refs.article
      const imgs = articleContent.querySelectorAll('img')
      // 获取所有的img地址
      const images = []
      imgs.forEach((img, index) => {
        images.push(img.src)
        img.onclick = () => {
          ImagePreview({
            images,
            // 起始位置从0开始
            startPosition: index
          })
        }
      })
    },
    onReplyClick(comment) {
      this.currentComment = comment
      // 显示评论回复弹出层
      this.isShowreply = true
    }
  }
}
</script>

<style scoped lang="less">
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 30px;
  }
}
.title {
  padding: 30px;
}
:deep(.navbar) {
  background-color: #0098fa;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.articleItem {
  height: calc(100vh - 1.22667rem - 1.33333rem);
  overflow: auto;
}
</style>
