/* eslint-diable */
import API from './axios'

const KEY = '0bc1145b1e635d4b7d5054a119a2ad32'
const BJ_ADCODE = '110000'

export default {
    queryWeather(data) {
        return API.API_INTERFACE({
            url: 'https://restapi.amap.com/v3/weather/weatherInfo',
            data: Object.assign({
                key: KEY,
                city: BJ_ADCODE,
                extensions: 'base',
                output: 'JSON'
            }, data),
            method: 'get'
        })
    },
    // 逆向地理编码
    regeo(data) {
        return API.API_INTERFACE({
            url: 'https://restapi.amap.com/v3/geocode/regeo',
            data: Object.assign({
                key: KEY
            }, data),
            method: 'get'
        })
    },
    geo(data) {
        return API.API_INTERFACE({
            url: 'https://restapi.amap.com/v3/geocode/geo',
            data: Object.assign({
                key: KEY
            }, data),
            method: 'get'
        })
    }
    // 地理编码
}