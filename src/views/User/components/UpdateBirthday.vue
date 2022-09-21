<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  props: {
    birthday: String
  },
  data() {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.birthday)
    }
  },
  methods: {
    onConfirm(value) {
      const newBirthday = dayjs(value).format('YYYY-MM-DD')
      // console.log(m)
      this.$emit('update-birthday', newBirthday)
      this.$toast.success('更新成功')
      this.$parent.$parent.isShowBirthday = false
    },
    onCancel() {
      this.$parent.$parent.isShowBirthday = false
    }
  }
}
</script>

<style></style>
