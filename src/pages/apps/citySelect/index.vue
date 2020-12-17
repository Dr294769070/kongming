<template>
    <div class="citySelect">
        <div class="selCity">热门城市</div>
        <div class="cityList">
            <div class="city" v-for="(item, index) in cityList" :key="index">
                <i-button inline size="small" type="ghost">{{ item.name }}</i-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            city: '',
            cityList: [
                {
                    name: "北京"
                },
                {
                    name: "杭州"
                },
                {
                    name: "怀宁"
                }
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
// 配置sass 用npm下载sass-loader 和 node-sass即可
// 版本不能过高 npm i sass-loader@7.1.0 -D
// npm i node-sass@4.14.1 -D
.citySelect{
    .selCity{
        line-height: 50rpx;
        text-align: left;
        padding: 0 30rpx;
        font-size: 32rpx;
        color: #495060;
    }
    .cityList{
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        height: 100rpx;
        align-items: center;
        // align-content: space-between;
        // flex子元素换行 存在多行的时候，可以用align-content指定布局方式
        .city{
            width: 200rpx;
            height: 50rpx;
            line-height: 50rpx;
            font-size: 32rpx;
            text-align: center;
            border-radius: 10rpx;
        }
    }
}
</style>