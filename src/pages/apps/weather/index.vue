<template>
    <div class="weather">
        <location @getLocationSuc="handleLocation"></location>
        <div v-show="address" class="position">
            <img src="https://frank-1302698468.cos.ap-beijing.myqcloud.com/KM/icons/%E5%AE%9A%E4%BD%8D.png" class="pos-icon" />
            <div class="city">{{ city }}</div>
        </div>
        <div v-if="weatherMap.weather" class="weatherDetail">
            <div class="text temperature">{{ weatherMap.temperature }}</div>
            <div class="text">{{ weatherMap.weather }}</div>
            <div class="text">{{ weatherMap.winddirection + weatherMap.windpower + '级' }}</div>
        </div>
        <!-- 未来的天气预报 -->
    </div>
</template>
<script>
import location from './components/location'
import API from '../../../api/api-map'

export default {
    components: {
        location
    },
    data() {
        return {
            city: '',
            address: '',
            adCode: '',
            weatherMap: {}
        }
    },
    onLoad() {
        this.weatherMap = {}
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

        queryWeather() {
            return API.queryWeather({
                city: this.adCode
            })
        }
    }
}
</script>
<style scoped>
.weather{
    height: 100vh;
    background: linear-gradient(rgb(79, 138, 179), rgb(122, 168, 200));
}
.weather .weatherDetail{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.weather .weatherDetail .temperature{
    height: 200rpx;
    line-height: 200rpx;
    font-size: 160rpx;
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
</style>