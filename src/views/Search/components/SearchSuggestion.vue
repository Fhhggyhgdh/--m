<template>
  <!-- 搜索建议 -->
  <div>
    <van-cell
      v-for="(item, index) in hightLightSuggestions"
      :key="index"
      icon="search"
      @click="$emit('change-keywords', suggestions[index])"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { getSuggestionsAPI } from '@/api'
export default {
  props: {
    keywords: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      suggestions: []
    }
  },
  watch: {
    keywords: {
      immediate: true,
      handler: 'getSuggestions'
    }
  },
  computed: {
    hightLightSuggestions() {
      // 动态正则
      // /angluar/字面量形式的正则-----里面不能写变量
      // new RegExp(变量/字符串，修饰符'ig')-----可以写变量
      const reg = new RegExp(this.keywords, 'ig')
      return this.suggestions.map((str) => {
        return str.replace(
          reg,
          // match是匹配上的结构，它的返回值作为替换的结果
          (match) => `<span style="color:red">${match}</span>`
        )
      })
    }
  },
  methods: {
    getSuggestions: debounce(async function () {
      try {
        const { data } = await getSuggestionsAPI(this.keywords)
        // this.suggestions = data.data.options.filter((item)=>Boolean(item))
        this.suggestions = data.data.options.filter(Boolean)
      } catch (error) {
        if (error.response) {
          this.$toast.fail('获取搜索建议失败')
        } else {
          throw error
        }
      }
    }, 300)
  }
}
</script>

<style></style>
