<template>
    <div class="guide" v-if="step < 3">
        <div v-show="step == 1" class="text text1" @click="step++">这是你的头像 下一步</div>
        <open-data type="userAvatarUrl" class="avatar" :style="step == 1 ? '' : 'opacity: 0'"></open-data>
        <open-data type="userNickName" class="name" :style="step == 2 ? '' : 'opacity: 0'"></open-data>
        <div v-show="step == 2" class="text text2" @click="step++">这是你的名字`~~~知道了</div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            step: 1
        }
    }
}
</script>
<style scoped>
.guide{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    background: rgba(0, 0, 0, .6);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.guide .avatar{
    width: 200rpx;
    height: 200rpx;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 50rpx;
}
.guide .name {
    line-height: 20rpx;
    height: 20rpx;
    text-align: center;
    color: red;
}
.guide .text{
    line-height: 100rpx;
    font-size: 36rpx;
    width: 500rpx;
    text-align: center;
    color: white;
    background: #80848f;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 10rpx;
}
.guide .text1{
    top: 300rpx;
}
.guide .text2{
    bottom: 300rpx;
}
</style>