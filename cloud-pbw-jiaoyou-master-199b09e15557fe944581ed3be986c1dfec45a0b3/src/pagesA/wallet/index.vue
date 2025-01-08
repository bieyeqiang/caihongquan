<template>
  <view class="app">
    <view class="card column">
      <text class="tip mb30">钱包余额</text>
      <text class="price">{{ userInfo.money | price(2) }}</text>
    </view>

    <view class="cell row b-b" @click="navTo('recLog')">
      <u-icon class="mr10" name="rmb-circle-fill" color="#69bd99" size="40"></u-icon>
      <text class="tit">充值</text>
      <u-icon name="arrow-right" color="#999999" size="30"></u-icon>
    </view>
    <view class="cell row b-b" @click="navTo('moneyLog')">
      <u-icon class="mr10" name="file-text-fill" color="#ebaaa7" size="40"></u-icon>
      <text class="tit">资金记录</text>
      <u-icon name="arrow-right" color="#999999" size="30"></u-icon>
    </view>

    <view class="card  profit flex column">
      <text class="tip mb30">我的收益</text>
      <view class="flex row-around">
        <view class="f-white  column">
          <text class="tip">余额</text>
          <text class="price">0</text>
        </view>
        <view class="f-white  column">
          <text class="tip">礼物</text>
          <text class="price">0</text>
        </view>
        <!--<view class="f-white  column">-->
        <!--  <text class="tip">聊天</text>-->
        <!--  <text class="price">0</text>-->
        <!--</view>-->
      </view>
    </view>
    <view class="cell row b-b" @click="navTo('withdraw')">
      <u-icon class="mr10" name="coupon-fill" color="#9a91eb" size="40"></u-icon>
      <text class="tit ">提现</text>
      <u-icon name="arrow-right" color="#999999" size="30"></u-icon>
    </view>
    <view class="cell row" @click="navTo('withdrawLog')">
      <u-icon class="mr10" name="red-packet-fill" color="#7d99db" size="40"></u-icon>
      <text class="tit">提现记录</text>
      <u-icon name="arrow-right" color="#999999" size="30"></u-icon>
    </view>
  </view>
</template>

<script>
import {mapState} from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState({userInfo: state => state.user.userInfo})
  },
  methods: {
    navTo(url) {
      uni.navigateTo({
        url
      })
    }
  }
}
</script>

<style scoped lang="scss">
a {
  color: #de98d3;
}
.row {
  /* #ifndef APP-PLUS-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  align-items: center;
}
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10rpx;
}
.profit {
  background-image: url('https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/bg/profit.png') !important;
  background-size: 100% 100%;
}
.card {
  width: 680rpx;
  height: 280rpx;
  padding: 40rpx 30rpx;
  margin-bottom: 16rpx;
  background-image: url('https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/bg/wallet.png');
  background-size: 100% 100%;
  color: #fff;

  .tip {
    font-size: 28rpx;
    line-height: 40rpx;
  }
  .price {
    margin-top: 8rpx;
    font-size: 72rpx;
    line-height: 92rpx;
  }
}
.cell {
  width: 100%;
  height: 120rpx;
  padding: 0 40rpx 0 44rpx;

  &:after {
    left: 40rpx;
    right: 40rpx;
    border-color: #e8e8e8;
  }
  .tit {
    flex: 1;
    font-size: 30rpx;
    color: #333;
  }
  .jw-icon {
    width: 64rpx;
    font-size: 40rpx;
  }
  .icon-qianbao {
    color: #3ed098;
  }
  .icon-tixian {
    color: #fe7c7a;
  }
  .icon-wodezhanghu_zijinjilu {
    font-size: 42rpx;
    color: #fbbe59;
  }
  .icon-you {
    width: auto;
    font-size: 24rpx;
    color: #999;
  }
}
</style>
