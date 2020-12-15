<template>
  <div class="sharePoster">
      <open-data type="userAvatarUrl" class="avatar"></open-data>
      <!-- <canvas type="2d" id="myCanvas"></canvas> -->
      <button @click="createPic">生成我的名片</button>
  </div>
</template>
<script>

// 要求
// 1、绘图功能
// 2、卡片分享功能
export default {
  data () {
    return {
        bgUrl: 'https://frank-1302698468.cos.ap-beijing.myqcloud.com/KM/images/myCardBg.jpeg',
        avatarUrl: 'https://iconfont.alicdn.com/t/6489d7d0-58ea-4de2-8c5c-066c4d7a2361.png'
    }
  },
  onReady() {
      // this.init2Dcanvas()
      // 先使用原生组件形式，不使用同层渲染
  },
  methods: {
      downLoadNetPicture(url) {
          const promise = new Promise((resolve, reject) => {
              wx.downloadFile({
                  url,
                  success: (res) => {
                      if (res.statusCode == 200) resolve(res.tempFilePath)
                      else reject()
                  },
                  fail: () => {
                      reject()
                  }
              })
          })   
          return promise
      },
      getImgObj(canvas, path) {
          return new Promise(resolve => {
                const img = canvas.createImage()
                img.src = path
                img.onload = () => {
                    resolve(img)
                }
          })
      },
      getImg(canvas, url) {
          return new Promise((resolve) => {
                this.downLoadNetPicture(url).then(tempFilePath => {
                    this.getImgObj(canvas, tempFilePath).then(img => {
                        resolve(img)
                    })
                })
          })
      },
      getRpx() {
          return wx.getSystemInfoSync().windowWidth / 750
      },
      drawImage() {
          // 创建canvas画笔
          // 绘制背景图
          // 绘制头像
          // 绘制姓名
          // 绘制个性签名
          // 绘制小程序码 扫码跳转到小程序主页
          // 绘制成图片，显示在页面中，同时将图片保存到本地
      },
      init2Dcanvas() {
      const rpx = this.getRpx()
      const query = wx.createSelectorQuery()
      query.select('#myCanvas')
        .fields({ node: true, size: true })
        .exec(async (res) => {
            const canvas = res[0].node
            const bgImg = await this.getImg(canvas, this.bgUrl)
            const avatarImg = await this.getImgObj(canvas, this.avatarUrl)
            const ctx = canvas.getContext('2d')
            ctx.drawImage(bgImg, 0, 0, 500 * rpx, 500 * rpx) // 相较于旧版本的API 这里的bgImg不可以是个图片路径 而是图片对象
            // ctx.drawImage(avatarImg, 100, 100, 100, 100)
            // 绘制文本 姓名和个性签名
            ctx.font = '24px Arial';
            // ctx.fillText('Frank', 150, 100)
            ctx.draw()
        })
      }
  }
}
</script>

<style scoped>
.sharePoster{
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.avatar{
    width: 200rpx;
    height: 200rpx;
    margin-bottom: 20rpx;
    border-radius: 50%;
    overflow: hidden;
}
#myCanvas {
    width: 500rpx;
    height: 500rpx;
    border: 1rpx solid black;
    display: none;
}
</style>
