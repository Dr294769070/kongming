<template>
    <div class="sharePoster">
        <!-- <canvas type="2d" id="myCanvas"></canvas> -->
        <img
            v-if="createdImgUrl"
            :src="createdImgUrl"
            class="mycard"
            mode="aspectFit"
        />
        <canvas
            canvas-id="myCanvas"
            :style="canvasStyle"
            class="myCanvas"
        ></canvas>
        <button
            v-if="albumAuthority == 'refuse'"
            open-type="openSetting"
            @opensetting="handleSetting"
        >
            保存
        </button>
        <button type="primary" v-else @click="handleSave">保存</button>
    </div>
</template>
<script>
// 要求
// 1、绘图功能
// 2、卡片分享功能
// 绘图分2d 与 原生
export default {
    data() {
        return {
            bgUrl:
                "https://frank-1302698468.cos.ap-beijing.myqcloud.com/KM/images/myCardBg.jpeg",
            avatarUrl:
                "https://iconfont.alicdn.com/t/6489d7d0-58ea-4de2-8c5c-066c4d7a2361.png",
            canvasStyle: "",
            createdImgUrl: "",
            albumAuthority: "", // 是否已授权相册
        };
    },
    onReady() {
        // this.init2Dcanvas()
        // 先使用原生组件形式，不使用同层渲染
        // 判断当前的授权状态，显示不同的按钮
        // 未授权时点击按钮触发授权、已授权则直接保存、拒绝授权则显示open-type="openSetting"按钮，可以再次选择授权
        this.getAuthStatus();
        this.initNativeCanvas();
    },
    methods: {
        async initNativeCanvas() {
            // 初始化native canvas
            const rpx = this.getRpx(); // 比例尺 将逻辑像素rpx转为物理像素px
            this.canvasStyle = `width:${500 * rpx}px;height:${300 * rpx}px;`;
            const ctx = wx.createCanvasContext("myCanvas");
            const bgImg = await this.downLoadNetPicture(this.bgUrl);
            ctx.drawImage(bgImg, 0, 0, 500 * rpx, 300 * rpx);
            const avatarImg = await this.downLoadNetPicture(this.avatarUrl);
            ctx.drawImage(avatarImg, 10, 10, 200 * rpx, 200 * rpx);
            ctx.strokeRect(10, 10, 200 * rpx, 200 * rpx);
            // 绘制姓名
            ctx.setFontSize(16);
            ctx.fillText("Frank", 250 * rpx, 50 * rpx);
            // 绘制签名
            ctx.fillText("BE YOURSELF", 250 * rpx, 100 * rpx);
            ctx.draw(true, () => {
                this.canvasToImg();
            });
        },
        getAuthStatus() {
            wx.getSetting({
                success: (res) => {
                    // 三个值 true-授权 false-拒绝 undefined-首次
                    if (
                        res.authSetting["scope.writePhotosAlbum"] == undefined
                    ) {
                        this.albumAuthority = ""; // 代表从未请求授权
                    } else {
                        this.albumAuthority = res.authSetting[
                            "scope.writePhotosAlbum"
                        ]
                            ? "allow"
                            : "refuse";
                    }
                },
            });
        },
        authorize() {
            wx.authorize({
                scope: "scope.writePhotosAlbum",
                success: () => {
                    this.albumAuthority = "allow";
                    this.saveImgToLocal();
                },
                fail: () => {
                    this.albumAuthority = "refuse";
                },
            });
        },
        saveImgToLocal() {
            const tempFilePath = this.createdImgUrl;
            wx.saveImageToPhotosAlbum({
                filePath: tempFilePath,
                success: () => {
                    wx.showToast({
                        title: "保存成功",
                    });
                },
            });
        },
        handleSave() {
            if (this.albumAuthority == "allow") this.saveImgToLocal();
            else this.authorize();
        },
        canvasToImg() {
            const rpx = this.getRpx();
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 500 * rpx,
                height: 300 * rpx,
                destWidth: 500,
                destHeight: 300,
                canvasId: "myCanvas",
                fileType: "png",
                success: (res) => {
                    this.createdImgUrl = res.tempFilePath;
                    console.log("this.createdImgUrl", this.createdImgUrl);
                },
            });
        },
        downLoadNetPicture(url) {
            const promise = new Promise((resolve, reject) => {
                wx.downloadFile({
                    url,
                    success: (res) => {
                        if (res.statusCode == 200) resolve(res.tempFilePath);
                        else reject();
                    },
                    fail: () => {
                        reject();
                    },
                });
            });
            return promise;
        },
        getImgObj(canvas, path) {
            return new Promise((resolve) => {
                const img = canvas.createImage();
                img.src = path;
                img.onload = () => {
                    resolve(img);
                };
            });
        },
        getImg(canvas, url) {
            return new Promise((resolve) => {
                this.downLoadNetPicture(url).then((tempFilePath) => {
                    this.getImgObj(canvas, tempFilePath).then((img) => {
                        resolve(img);
                    });
                });
            });
        },
        getRpx() {
            return wx.getSystemInfoSync().windowWidth / 750;
        },
        init2Dcanvas() {
            const rpx = this.getRpx();
            const query = wx.createSelectorQuery();
            query
                .select("#myCanvas")
                .fields({ node: true, size: true })
                .exec(async (res) => {
                    const canvas = res[0].node;
                    const bgImg = await this.getImg(canvas, this.bgUrl);
                    const avatarImg = await this.getImgObj(
                        canvas,
                        this.avatarUrl
                    );
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(bgImg, 0, 0, 500 * rpx, 500 * rpx); // 相较于旧版本的API 这里的bgImg不可以是个图片路径 而是图片对象
                    // ctx.drawImage(avatarImg, 100, 100, 100, 100)
                    // 绘制文本 姓名和个性签名
                    ctx.font = "24px Arial";
                    // ctx.fillText('Frank', 150, 100)
                    ctx.draw();
                });
        },
        handleSetting(res) {
            if (res.mp.detail.authSetting["scope.writePhotosAlbum"]) {
                this.albumAuthority = "allow";
            } else {
                this.albumAuthority = "refuse";
                wx.showToast({
                    title: "授权失败",
                    icon: "none",
                });
            }
        },
    },
};
</script>

<style scoped>
.sharePoster {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.avatar {
    width: 200rpx;
    height: 200rpx;
    margin-bottom: 20rpx;
    border-radius: 50%;
    overflow: hidden;
}
.mycard {
    width: 400rpx;
    height: 300rpx;
    border-radius: 5rpx;
    border: 2rpx solid salmon;
    margin-bottom: 20rpx;
}
#myCanvas {
    width: 400rpx;
    height: 300rpx;
    border: 1rpx solid black;
    display: none;
}
.myCanvas {
    position: fixed;
    top: -1000px;
}
</style>
