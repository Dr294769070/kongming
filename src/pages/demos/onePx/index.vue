<template>
    <div class="onePx">
        <div class="item"></div>
        <!-- 
            设计稿给的是物理像素 1px
            css写的是逻辑像素 1px
            如果设备的分辨率很高，比如视网膜屏幕 1px用物理两个像素点显示（DRP）
            那么就需要对其进行缩放 使用伪元素和scale
            这里实现了四个边框，如果只有一个边要显示，就用border-top等即可
            考虑到不同设备的DPR不一样，还可以用css3的@media多媒体查询功能，针对不同屏幕应用不同样式
         -->
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
};
</script>
<style lang="scss" scoped>
@import '../../../styles/common.scss';

.onePx {
    height: 100vh;
    .item {
        margin: 20rpx;
        width: 100rpx;
        height: 100rpx;
        @include m-r1b(#d5d5d5, 10rpx);
    }
    // .onePxBorder {
    //     position: relative;
    //     &::after {
    //         content: "";
    //         position: absolute;
    //         left: 0;
    //         top: 0;
    //         width: 200%;
    //         height: 200%;
    //         box-sizing: border-box;
    //         border: 1px solid #d5d5d5;
    //         border-radius: 10rpx;
    //         transform: scale(0.5); // 2d方向x、y等比缩小为0.5倍
    //     }
    // }
}
</style>