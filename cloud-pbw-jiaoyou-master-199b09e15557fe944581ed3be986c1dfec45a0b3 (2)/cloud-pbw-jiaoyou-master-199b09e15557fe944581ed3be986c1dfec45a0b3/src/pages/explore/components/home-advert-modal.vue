
<template>
  <uni-popup ref="uniPopup" :maskClick="false">
    <view class="wrap center column">
      <image class="pic" src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/icon/ad-coupon.png" @click="navTo('/pagesA/coupon/getCoupon', {login: true})"></image>
      <text class="jw-icon icon-close" @click="close"></text>
    </view>
  </uni-popup>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  mounted () {
    this.init();
  },
  methods: {
    init () {
      const preShowTime = uni.getStorageSync('homeAdvertModalShowTime');
      if (!this.$util.isLogin({ nav: false }) && (!preShowTime || preShowTime < + new Date - 10 * 60 * 1000)) {
        this.open();
      }
    },
    open () {
      uni.hideTabBar();
      this.$refs.uniPopup.open();

      uni.setStorageSync('homeAdvertModalShowTime', + new Date());
    },
    close () {
      uni.showTabBar();
      this.$refs.uniPopup.close();
    }
  }
}
</script>

<style scoped lang="scss">
.pic {
  width: 530rpx;
  height: 600rpx;
}
.icon-close {
  padding: 20rpx 40rpx;
  margin-top: 20rpx;
  font-size: 48rpx;
  color: #fff;
}
</style>
