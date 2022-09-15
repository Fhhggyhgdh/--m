<template>
  <div class="results">
    <van-list
      v-model="loading"
      @load="getResults"
      :finished="finished"
      finished-text="没有更多了~"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        v-for="item in results"
        :key="item.art_id"
        :title="item.title"
        @click="
          $router.push({
            path: '/detail',
            query: { articleId: item.art_id }
          })
        "
      ></van-cell>
    </van-list>
  </div>
</template>

<script>
import { getResultAPI } from '@/api'
export default {
  props: {
    keywords: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      loading: false, // 用于加载下一页
      finished: false,
      error: false,
      page: 1,
      perPage: 10,
      results: []
    }
  },
  methods: {
    async getResults() {
      try {
        // 发起请求
        const { data } = await getResultAPI(
          this.page++,
          this.perPage,
          this.keywords
        )

        const results = data.data.results
        if (results.length === 0) {
          this.finished = true
        }
        // 保存数据
        this.results = [...this.results, ...results]
      } catch {
        this.error = true
      } finally {
        // 关闭loading
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.results {
  height: calc(100vh - 108px);
  overflow: overlay;
}
</style>
