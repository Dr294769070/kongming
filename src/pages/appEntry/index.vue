<template>
  <div class="appEntry">
    <div class="item" v-for="(item, index) in appList" :key="index" @click="toPage(item.path)">
      <img class="icon" :src="item.icon" />
      <div class="name">{{ item.name }}</div>
    </div>
  </div>
</template>
<script>
import { appList } from './index.json'

export default {
  data () {
    return {
      appList
    }
  },
  methods: {
    toPage(path) {
      wx.navigateTo({
        url: path
      })
    }
  },
  onLoad() {
  }
}
</script>

<style scoped>
.appEntry{
  box-sizing: border-box;
  padding: 20rpx;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
}
.appEntry .item{
  width: 150rpx;
  padding: 20rpx;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  border: 2rpx solid#E4E7ED;
  border-radius: 10rpx;
  margin: 10rpx;
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, .12), 0 0 6rpx rgba(0, 0, 0, .04)
}
.item .icon {
  width: 96rpx;
  height: 96rpx;
  margin-bottom: 20rpx;
}
.item .name{
  height: 30rpx;
  line-height: 30rpx;
  text-align: center;
  font-size: 24rpx;
}
</style>
