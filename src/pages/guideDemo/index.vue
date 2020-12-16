<template>
    <div class="guideDemo">
        <open-data type="userAvatarUrl" class="avatar"></open-data>
        <open-data type="userNickName" class="name"></open-data>
        <guide></guide>
    </div>
</template>
<script>
import guide from './components/guide'

export default {
    components: {
        guide
    },
    data() {
        return {}
    }
}
</script>
<style scoped>
.guideDemo{
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.guideDemo .avatar{
    width: 200rpx;
    height: 200rpx;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 50rpx;
}
.guideDemo .name {
    line-height: 20rpx;
    height: 20rpx;
    text-align: center;
}
</style>