<template>
    <div class="favoritePic" :style="containerStyle">
        <div class="item" v-for="item in imgList" :key="item.key">
            <div class="pic">
                <img :src="item.src" class="img" mode="aspectFill" />
            </div>
            <div class="desc">
                {{ item.desc + '-' + item.key }}
            </div>
        </div>
    </div>
</template>
<script>
import {getMockDataList} from './mock'

function rpx2px(distance) {
    let result = 0
    if (!isNaN(distance)) {
        result = wx.getSystemInfoSync().windowWidth * distance / 750
    }
    return result
}

function throttle(fn, delay) {
    let lastTime = null
    let timeout
    return function() {
        let context = this
        let now = new Date()
        let arg = arguments
        if (now - lastTime - delay > 0) {
            if (timeout) {
                clearTimeout(timeout)
                timeout = null
            }
            fn.apply(context, arg)
            lastTime = now
        } else if (!timeout) {
            timeout = setTimeout(() => {
                fn.apply(context, arg)
            }, delay)
        }
    }
}

let allList = []
const itemHeight = rpx2px(300 + 50 + 10)


export default {
    data() {
        return {
            allList: [],
            loading: false,
            page: 1,
            // 默认一次查10条数据 pageSize不写了
            startIndex: 0, // 从allList的某个索引位置截取数据显示
            hasNext: true
        }
    },
    computed: {
        imgList() {
            const startIndex = this.startIndex > 0 ? this.startIndex : 0
            return this.allList.slice(startIndex, startIndex + 10)
        },
        // 容器高度
        listHeight() {
            return this.allList.length * itemHeight
        },
        listPaddingTop() {
            return this.startIndex * itemHeight
        },
        containerStyle() {
            return `padding-top:${this.listPaddingTop}px;height:${this.listHeight}px`
        }
    },
    onLoad() {
        // 获取第一页数据
        this.resetData()
        this.getList()
        this.throttlePageScroll = throttle(this.handlePageScroll, 500)
    },
    onPullDownRefresh() {
        this.resetData();
        this.getList();
    },
    onReachBottom() {
        // 正在调接口获取数据 或 数据已经全部获取完毕
        if (this.loading) return
        if (!this.hasNext) {
            wx.showToadt({
                title: '已经到最底部了'
            })
        }
        this.page++
        this.getList()
    },
    onPageScroll({ scrollTop }) {
        this.throttlePageScroll(scrollTop)
    },

    methods: {
        resetData() {
            this.page = 1
            this.hasNext = true
            this.allList = []
            this.loading = false
            this.startIndex = 0
        },
        getList() {
            this.loading = true
            wx.showLoading({
                title: '加载中'
            })
            getMockDataList(this.page).then((list) => {
                this.allList = this.allList.concat(list)
                this.loading = false
                if (list.length == 0) this.hasNext = false
                wx.hideLoading()
            })
        },
        handlePageScroll(scrollTop) {
            if (this.loading) return
            const scrolllItems = Math.floor(scrollTop / itemHeight)
            this.startIndex = scrolllItems
        }
    }
}
</script>
<style lang="scss" scoped>
.favoritePic{
    padding: 0 10rpx;
    box-sizing: border-box;
    .item{
        background: #f8f8f9;
        margin-bottom: 10rpx;
        .pic{
            width: 300rpx;
            height: 300rpx;
            border-radius: 10rpx;
            overflow: hidden;
            .img{
                width: 100%;
                height: 100%;
            }
        }
        .desc{
            line-height: 50rpx;
            height: 50rpx;
            font-size: 30rpx;
        }
    }
}
</style>