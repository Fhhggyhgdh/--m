<template>
  <div>
    <van-picker
      title="更新性别"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
      :default-index="gender"
    />
  </div>
</template>

<script>
export default {
  props: {
    gender: Number
  },
  data() {
    return {
      columns: ['男', '女']
    }
  },
  methods: {
    onConfirm(value, index) {
      this.$emit('update-gender', index)
      this.$toast.success('更新成功')
      this.$parent.$parent.isShowGender = false
    },
    onCancel() {
      this.$parent.$parent.isShowGender = false
    }
  }
}
</script>

<style></style>
