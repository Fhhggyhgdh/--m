<template>
  <div>
    <!-- 标题 -->
    <van-nav-bar
      title="更新昵称"
      left-text="取消"
      right-text="保存"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <!-- 修改内容的输入框 -->
    <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="11"
      placeholder="请输入新的昵称"
      show-word-limit
    />
  </div>
</template>

<script>
export default {
  props: {
    userName: String
  },
  data() {
    return {
      message: this.userName
    }
  },
  methods: {
    onClickLeft() {
      this.$parent.$parent.isShowName = false
    },
    async onClickRight() {
      this.$emit('update-name', this.message)
      this.$toast.success('更新成功')
      this.$parent.$parent.isShowName = false
    }
  }
}
</script>

<style></style>
