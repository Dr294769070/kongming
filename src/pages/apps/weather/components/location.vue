<template>
    <div class="location" v-show="authStatus != 'allow'">
        <i-button type="primary" v-if="authStatus != 'refuse'" @click="handleGetLocation">定位</i-button>
        <button v-else open-type="openSetting" @opensetting="handleOpensetting">定位</button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            authStatus: '',
            locationMap: {}
        }
    },
    onLoad() {
        this.getLocationAuth()
    },
    methods: {
        getLocationAuth() {
            wx.getSetting({
                success: res => {
                    const auth = res.authSetting["scope.userLocation"]
                    if (auth == undefined) {
                        this.authStatus = ''
                    } else if (auth) {
                        this.authStatus = 'allow'
                        this.getLocation()
                    } else this.authStatus = 'refuse'
                }
            })
        },
        handleGetLocation() {
            if (this.authStatus == 'allow') {
                this.getLocation()
            } else {
                this.authorize()
            }
        },
        authorize() {
            // 需要在app.json中配置permission 获取位置信息时会给出提示
            wx.authorize({
                scope: "scope.userLocation",
                success: () => {
                    this.authStatus = "allow";
                    this.getLocation();
                },
                fail: () => {
                    this.authStatus = "refuse";
                    wx.showToast({
                        title: "授权失败",
                        icon: "none",
                    });
                },
            });
        },
        getLocation() {
            wx.getLocation({
                success: res => {
                    this.locationMap = res
                    this.$emit('getLocationSuc', this.locationMap)
                    console.log('this.locationMap', this.locationMap)
                }
            })
        },
        handleOpensetting(res) {
            if (res.mp.detail.authSetting["scope.userLocation"]) {
                this.authStatus = "allow";
            } else {
                this.authStatus = "refuse";
                wx.showToast({
                    title: "授权失败",
                    icon: "none",
                });
            }
        }
    }
}
</script>
<style scoped>

</style>