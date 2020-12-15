<template>
  <div class="index">
    <open-data type="userAvatarUrl" class="avatar"></open-data>
    <open-data type="userNickName" class="name"></open-data>
  </div>
</template>
<script>

export default {
  data () {
    return {
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      },
      showBtn: true
    }
  },
  methods: {
    init() {
      const userInfo = wx.getStorageSync('userInfo')
      if (userInfo.nickName) this.showBtn = false
      this.userInfo = userInfo
    },
    onGetUserInfo(e) {
      const userInfo = e.mp.detail.userInfo
      this.userInfo = {
        nickName: userInfo.nickName,
        avatarUrl: userInfo.avatarUrl
      }
      wx.setStorageSync('userInfo', this.userInfo)
      this.showBtn = false
    },
    h5Web() {
      wx.navigateTo({
        url: '/pages/webView/main'
      })
    }
  },
  onLoad() {
    this.init()
  }
}
</script>

<style scoped>
.index{
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.index .avatar{
    width: 200rpx;
    height: 200rpx;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 20rpx;
}
.index .name {
    line-height: 20rpx;
    height: 20rpx;
    text-align: center;
}
</style>
