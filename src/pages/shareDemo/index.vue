<template>
  <div class="sharePage">
      <i-button open-type="share" type="primary">分享</i-button>
      <div class="text">分享页面</div>
  </div>
</template>
<script>

export default {
    data() {
        return {}
    },
    onShareAppMessage() {
        return {
            title: '分享卡片从此开始',
            path: 'pages/shareDemo/main', // 这里是否带/开头都可以
            imageUrl: 'https://iconfont.alicdn.com/t/03381326-e7d2-428c-b714-e64ac38fda35.png'
        }
    }
}
</script>

<style scoped>
.sharePage{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}
.sharePage .text{
    line-height: 50rpx;
    height: 50rpx;
    width: 100%;
    text-align: center;
    font-size: 16px;
}
</style>
