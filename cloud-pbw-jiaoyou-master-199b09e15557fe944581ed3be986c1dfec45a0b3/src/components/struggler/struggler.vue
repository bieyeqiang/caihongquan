<template>
  <view>
    <view class="uni-add-tips-box" v-if="showTip">
      <view class='uni-add-tips-content' @tap='hideTip'>
        <text>{{tip}}</text>
      </view>
    </view>
  </view>
</template>

<script>
const SHOW_TIP = "SHOW_TIP"
export default {
  data () {
    return {
      showTip: false,
    }
  },
  mounted () {
    this.showTip = !uni.getStorageInfoSync().keys.includes(SHOW_TIP)
    setTimeout(() => {
      uni.setStorageSync(SHOW_TIP, true)
      this.showTip = false
    }, this.duration * 1000)
  },
  props: {
    tip: {
      type: String,
      default: "点击「·•·」，添加至我的小程序"
    },
    duration: {
      type: Number,
      default: 10
    }
  },
  methods: {
    hideTip () {
      uni.setStorageSync(SHOW_TIP, true)
      this.showTip = false
    }
  }
}
</script>

<style lang="scss" scoped>
$themeColor: rgba(
  $color: #000000,
  $alpha: 0.8,
); //主题色

.uni-add-tips-box {
  position: fixed;
  // cal(44px + var(--status-bar-height))
  top: 122rpx;
  right: 0;
  z-index: 99999;
  opacity: 0.8;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
  width: 600rpx;
  animation: opacityC 1s linear infinite;
}

.uni-add-tips-content::before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  top: -38rpx;
  right: 105rpx;
  border-width: 20rpx;
  border-style: solid;
  display: block;
  border-color: transparent transparent $themeColor transparent;
}

.uni-add-tips-content {
  border-width: 0rpx;
  margin-top: 20rpx;
  position: relative;
  background-color: $themeColor;
  box-shadow: 0 10rpx 20rpx -10rpx $themeColor;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18rpx 20rpx;
  margin-right: 40rpx;
}

.uni-add-tips-content > text {
  color: #fff;
  font-size: 28rpx;
  font-weight: 400;
}

@keyframes opacityC {
  0% {
    opacity: 0.8;
  }

  50% {
    opacity: 1;
  }
}
</style>
