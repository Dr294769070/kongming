<template>
    <div class="weather">
        <div class="position" @click="toCitySelect">
            <img src="https://frank-1302698468.cos.ap-beijing.myqcloud.com/KM/icons/%E5%AE%9A%E4%BD%8D.png" class="pos-icon" />
            <div class="city">{{ locationMap.city }}</div>
        </div>
        <div v-if="weatherMap.weather" class="weatherDetail">
            <div class="text temperature">{{ weatherMap.temperature }}</div>
            <div class="text">{{ weatherMap.weather }}</div>
            <div class="text">{{ weatherMap.winddirection + weatherMap.windpower + '级' }}</div>
        </div>
        <div class="echarts-container">
            <mpvue-echarts :echarts="echarts" :onInit="echartsInit" lazyLoad canvasId="weatherLine" ref="weatherLine"/>
        </div>
        <!-- 未来的天气预报 -->
    </div>
</template>
<script>
// ECHARTS
import * as echarts from 'echarts/dist/echarts.min'
// import * as echarts from '../../../scripts/echarts.min'
import mpvueEcharts from "mpvue-echarts";

import API from '../../../api/api-map'

export default {
    components: {
        mpvueEcharts
    },
    data() {
        return {
            city: '',
            address: '',
            adCode: '',
            weatherMap: {},
            locationMap: {},
            echarts,
            option: {}
        }
    },
    onUnload() {
    },
    onShow() {
        this.weatherMap = {}
        this.getCity()
    },
    methods: {
        async handleLocation(locationMap) {
            const res = await API.regeo({
                location: `${locationMap.longitude},${locationMap.latitude}`
            })
            const regeocode = res.data.regeocode
            this.address = regeocode.formatted_address
            this.city = regeocode.addressComponent.province + (regeocode.addressComponent.city[0] || '' )
            const res1 = await API.geo({
                address: this.address
            })
            this.adCode = res1.data.geocodes[0].adcode
            const res2 = await this.queryWeather()
            this.weatherMap = res2.data.lives[0]
        },

        queryWeather(extensions) {
            return API.queryWeather({
                city: this.locationMap.adCode,
                extensions
            })
        },
        toCitySelect() {
            wx.navigateTo({
                url: '/pages/apps/citySelect/main'
            })
        },
        getCity() {
            const locationMap = wx.getStorageSync('locationMap')
            console.log('location', locationMap)
            if (!locationMap) {
                this.toCitySelect()
            } else {
                this.locationMap = locationMap
                this.getWeatherInfo()
            }
        },
        getWeatherInfo() {
            const promiseArr = [this.queryWeather('base'), this.queryWeather('all')]
            Promise.all(promiseArr).then(res => {
                console.log('res', res)
                this.weatherMap = res[0].data.lives[0]
                const casts = res[1].data.forecasts[0].casts
                const map = {
                    1: '周一',
                    2: '周二',
                    3: '周三',
                    4: '周四',
                    5: '周五',
                    6: '周六',
                    7: '周日'
                }
                const xAxisData = casts.map(item => map[item.week])
                const daypowerData = casts.map(item => item.daypower.match(/-?[\d+]/g)[0])
                const nighttempData = casts.map(item => item.nighttemp.match(/-?[\d+]/g)[0])
                this.option = {
                    legend: {
                        data: ['最高气温', '最低气温']
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        type: 'category',
                        data: xAxisData
                    },
                    yAxis: {
                        name: '气温',
                        type: 'value'
                    },
                    series: [{
                        data: daypowerData,
                        type: 'line',
                        stack: '总量',
                        name: '最高气温'
                    }, {
                        data: nighttempData,
                        type: 'line',
                        stack: '总量',
                        name: '最底气温'
                    }]
                }
                this.$refs.weatherLine && this.$refs.weatherLine.init()
            })
        },
        echartsInit(canvas, width, height) {
            const example = echarts.init(canvas, null, {
                width,
                height
            });
            canvas.setChart(example);
            example.setOption(this.option);
            return example;
        }
    }
}
</script>
<style scoped>
.weather{
    height: 100vh;
    background: linear-gradient(rgb(84, 146, 190), rgb(122, 168, 200));
}
.weather .weatherDetail{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20rpx;
}
.weather .weatherDetail .temperature{
    height: 200rpx;
    line-height: 200rpx;
    font-size: 160rpx;
    display: inline-block;
    position: relative;
    /* 如果伪元素要用absolute定位，则这里要设置relative */
}
.temperature::after{
    content: '';
    position: absolute;
    top: 30rpx;
    display: inline-block;
    width: 14rpx;
    height: 14rpx;
    border: 4rpx solid white;
    border-radius: 50%;
}
.weather .position{
    height: 80rpx;
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    margin: 20rpx;
    border-radius: 50rpx;
    background: #f8f8f9;
    box-sizing: border-box;
    padding: 0 30rpx;
}
.position .pos-icon{
    width: 56rpx;
    height: 56rpx;
    margin-right: 20rpx;
}
.position .city{
    height: 80rpx;
    line-height: 80rpx;
    font-size: 36rpx;
    font-weight: 500;
    color: #1c2438;
}
.weather .text{
    line-height: 60rpx;
    margin: 10rpx 0;
    font-size: 36rpx;
    color: white;
    text-align: center;
    width: 100%;
    text-align: center;
}
.echarts-container{
    width: 700rpx;
    margin: 0 auto; 
    height: 464rpx;
    border-radius: 10rpx;
    background: #fff;
}
</style>