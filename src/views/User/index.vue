<template>
  <div class="editUserInfo">
    <!-- 个人信息标题 -->
    <van-nav-bar
      class="navbar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 个人信息 -->
    <input
      type="file"
      ref="file"
      hidden
      accept=".jpg,.png,.pdf"
      @change="selectPhoto"
    />
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image round width="0.8rem" height="0.8rem" :src="avator" />
    </van-cell>

    <!-- 更新头像的弹出层 -->
    <van-popup
      v-model="isShowPhoto"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-avator
        v-if="isShowPhoto"
        :photo="photo"
        :avator.sync="avator"
      ></update-avator>
    </van-popup>

    <!-- 昵称 -->
    <van-cell title="昵称" is-link @click="isShowName = true">
      <span>{{ personalInfo.name }}</span>
    </van-cell>
    <!-- 昵称弹出层 -->
    <van-popup
      v-model="isShowName"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-name
        :userName="personalInfo.name"
        @update-name="personalInfo.name = $event"
      ></update-name>
    </van-popup>

    <!-- 性别 -->
    <van-cell title="性别" is-link @click="isShowGender = true">
      <span>{{ personalInfo.gender === 1 ? '女' : '男' }}</span>
    </van-cell>
    <!-- 性别弹出层 -->
    <van-popup
      v-model="isShowGender"
      position="bottom"
      :style="{ height: '45%' }"
    >
      <update-gender
        :gender="personalInfo.gender"
        @update-gender="personalInfo.gender = $event"
      ></update-gender>
    </van-popup>

    <!-- 生日 -->
    <van-cell title="生日" is-link @click="isShowBirthday = true">
      <span>{{ personalInfo.birthday }}</span>
    </van-cell>
    <!-- 生日弹出层 -->
    <van-popup
      v-model="isShowBirthday"
      position="bottom"
      :style="{ height: '45%' }"
    >
      <update-birthday
        :birthday="personalInfo.birthday"
        @update-birthday="personalInfo.birthday = $event"
      ></update-birthday>
    </van-popup>
  </div>
</template>

<script>
import UpdateAvator from './components/UpdateAvator.vue'
import UpdateName from './components/UpdateName.vue'
import UpdateGender from './components/UpdateGender.vue'
import UpdateBirthday from './components/UpdateBirthday.vue'

import { resolveToBase64 } from '@/utils'
import { getUserPersonalInfoAPI, updateUserPersonalInfoAPI } from '@/api'

export default {
  components: {
    UpdateAvator,
    UpdateName,
    UpdateGender,
    UpdateBirthday
  },
  data() {
    return {
      isShowPhoto: false,
      isShowName: false,
      isShowGender: false,
      isShowBirthday: false,
      photo: '',
      avator: '',
      personalInfo: {}
    }
  },
  watch: {
    personalInfo: {
      // immediate: true, // 立即执行
      deep: true, // 深度侦听复杂类型内变化
      handler: 'updateUserPersonalInfo'
    }
  },
  created() {
    this.getUserPersonalInfo()
  },
  methods: {
    async selectPhoto() {
      const file = this.$refs.file.files[0]
      // file对象转成base64
      const base64 = await resolveToBase64(file)
      this.photo = base64
      // 打开弹窗
      this.isShowPhoto = true
      // 解决不能连续选中同一张图片的bug
      this.$refs.file.value = ''
    },
    // 获取用户个人资料
    async getUserPersonalInfo() {
      try {
        const { data } = await getUserPersonalInfoAPI()
        // console.log(data)
        this.personalInfo = data.data
        this.avator = this.personalInfo.photo
      } catch (error) {
        if (!error.response) {
          throw error
        }
        if (error.response && error.response.status === 401) {
          this.$toast.fail('请重新登录再修改信息~')
        }
        if (
          error.response &&
          (error.response.status === 400 || error.response.status === 507)
        ) {
          console.log('请求参数错误或数据库错误')
        }
      }
    },
    // 更新用户信息
    async updateUserPersonalInfo() {
      // console.log(this.personalInfo)
      const { data } = await updateUserPersonalInfoAPI(this.personalInfo)
      console.log(data)
    }
  }
}
</script>

<style scoped lang="less">
.editUserInfo {
  background-color: #f4f7f9;
  height: 100vh;
  .navbar {
    background: #3296fa;
    :deep(.van-nav-bar__title) {
      color: #fff !important;
    }
    :deep(.van-icon) {
      color: #fff !important;
    }
  }
}
</style>
