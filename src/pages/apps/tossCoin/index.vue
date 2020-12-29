<template>
    <div class="tossCoin">
        <div class="choice">您的选择是{{ choice }}</div>
        <i-button type="primary" v-if="coinArr.length > 0" @click="handleClick">扔硬币</i-button>
        <i-button type="primary" @click="showDialog = true">编辑选项</i-button>
        <div :class="{ 'showDialog': showDialog, 'dialog': true }">
            <i-panel title="请输入">
                <i-input :value="choices" title="你的选项" autofocus placeholder="选项间用分号隔开"></i-input>
                <i-button type="ghost" @click="save">保存</i-button>
            </i-panel>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            randomNum: 0,
            selecting: false,
            choices: '',
            showDialog: false
        }
    },
    onLoad() {
        this.resetData()
        this.getCoinArr()
    },
    computed: {
        choice() {
            if (this.selecting) return ''
            return this.randomNum >= this.coinArr.length ?
             this.coinArr[this.coinArr.length - 1] : this.coinArr[this.randomNum]
        },
        coinArr() {
            return this.choices.split(';')
        }
    },
    methods: {
        handleClick() {
            this.selecting = true
            setTimeout(() => {
                this.randomNum = Math.floor(Math.random() * this.coinArr.length)
                this.selecting = false
            }, 3000)
        },
        getCoinArr() {
            this.choices = wx.getStorageSync('choices')
        },
        save() {
            wx.setStorageSync('choices', this.choices)
        },
        resetData() {
            this.randomNum = 0
            this.selecting = false
            this.choices = '',
            this.showDialog = false
        }
    }
}
</script>
<style lang="scss" scoped>
.tossCoin{
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #f8f8f9;
    .choice{
        height: 50rpx;
        font-size: 32rpx;
        line-height: 50rpx;
    }
    .dialog{
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        background: #e9eaec;
        transform: translateY(-100%);
        transition: transform 1s;
        &.showDialog{
            transform: translateY(0);
        }
    }
}
</style>