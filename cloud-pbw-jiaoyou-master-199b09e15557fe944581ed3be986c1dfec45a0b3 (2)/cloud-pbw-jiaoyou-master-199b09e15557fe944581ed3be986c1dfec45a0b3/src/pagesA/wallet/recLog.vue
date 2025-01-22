<template>
  <view :style="[theme]" class="app">
    <view class="bar">
      <u-navbar :fixed="false" :placeholder="true" autoBack bgColor="rgba(255, 255, 255, 0.0)">
        <view slot="left" class="left">
          <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/zhibai/1674871554608ce.png"></image>
        </view>
        <view slot="center" class="center">
          <text>{{ title }}</text>
        </view>
        <!-- <view slot="right" class="right">
		  <view class="icon">
			<image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/zhibai/1674871568222ce.png"></image>
			<view class="line"></view>
			<image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/zhibai/1674871561438ce.png"></image>
		  </view>
		</view> -->
      </u-navbar>
    </view>
    <view v-if="!openExamine" class="cont">
      <view class="item recharge">
        <view class="tit">
          <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/zhibai/1674886899602ce.png"></image>
          <text>充值金额</text>
        </view>
        <view class="price-list">
          <view v-for="(item, index) in moneyList" :key="index" :class="{ active: item.checked }" class="p-item center" @click="checkePrice(item)">
            <text>{{ item.money }}元</text>
          </view>
        </view>
        <view class="other row">
          <text>其他金额</text>
          <input v-model="money" class="input" maxlength="10" placeholder="请输入其他金额" placeholder-style="color: #999" type="number" />元
        </view>
      </view>
      <view class="item">
        <view class="tit">
          <text>选择支付方式</text>
        </view>
        <view class="type" @click="checkType('wxpay')">
          <image :src="'https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/icon/wxpay.png'" class="icon"></image>
          <view class="column fill">
            <text class="tit">微信支付</text>
          </view>
          <u-icon v-if="curType === 'wxpay'" :color="theme['--bg-color']" name="checkmark-circle-fill" size="40"></u-icon>
        </view>
        <!-- #ifndef MP-WEIXIN -->
        <view class="type" @click="checkType('alipay')">
          <image :src="'https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/icon/alipay.png'" class="icon"></image>
          <view class="column fill">
            <text class="tit">支付宝</text>
          </view>
          <u-icon v-if="curType === 'alipay'" :color="theme['--bg-color']" name="checkmark-circle-fill" size="40"></u-icon>
        </view>
        <!-- #endif -->
      </view>
      <view class="button">
        <!-- <text @onConfirm="confirm">确认充值</text> -->
        <jw-button ref="confirmBtn" marginTop="50rpx" text="确认充值" @onConfirm="confirm"></jw-button>
      </view>
    </view>

    <jw-empty v-else></jw-empty>

    <jw-loading v-if="isLoading" :mask="true"></jw-loading>
    <!-- 支付成功面板 -->
    <success-modal ref="successModal" :price="payPrice" btnText="确定" tip="余额充值成功" @onConfirm="successCallback"></success-modal>
  </view>
</template>

<script>
import successModal from './components/success-modal.vue'

export default {
  components: {
    successModal
  },
  data() {
    return {
      curType: 'wxpay',
      moneyList: [
        { money: 50, checked: true },
        { money: 100, checked: false },
        { money: 200, checked: false },
        { money: 500, checked: false }
      ],
      money: '',
      payPrice: 0,
      title: ''
    }
  },
  computed: {
    openExamine() {
      return this.$store.state.openExamine
    }
  },
  watch: {
    money(val) {
      if (val) {
        this.moneyList.forEach((item) => {
          item.checked = false
        })
      }
    }
  },
  onLoad() {
    console.log(this.$store.state.project.project.config.theme.cor, '9999999')
    if (!this.openExamine) {
      this.title = '余额充值'
    } else {
      this.title = '消费明细'
    }
  },
  methods: {
    navToAgreementDetail(type) {
      this.navTo('/other/public/article?type=' + type)
    },
    confirm() {
      let { curType, moneyList, money } = this
      const mIndex = moneyList.findIndex((item) => item.checked)
      if (!money && mIndex === -1) {
        this.$util.msg('请选择或输入充值金额')
        this.$refs.confirmBtn.stop()
        return
      }
      money = this.money || this.moneyList[mIndex].money
      if (isNaN(money)) {
        this.$util.msg('请输入正确的充值金额')
        this.$refs.confirmBtn.stop()
        return
      }
      this.$util.throttle(() => {
        this.wxpay((+money).toFixed(2))
      })
    },
    //微信支付
    async wxpay(money) {
      // #ifdef H5
      this.$util.msg('暂不支持H5支付')
      this.$refs.confirmBtn.stop()
      return
      // #endif
      const res = await this.$request(
        'payment',
        'recharge',
        {
          order_type: 'money',
          money: +money,
          pay_type: this.curType,
          // #ifdef MP-WEIXIN
          code: await this.getMpCode('weixin')
          // #endif
        },
        { showLoading: true }
      )
      if (res.status !== 1) {
        this.$refs.confirmBtn.stop()
        this.$util.msg(res.msg)
        return
      }
      const orderInfo = res.data.orderInfo
      const { timeStamp, nonceStr, paySign } = orderInfo
      const payParams = {
        provider: this.curType,
        orderInfo: res.data.orderInfo,
        timeStamp,
        nonceStr,
        package: orderInfo.package,
        signType: 'MD5',
        paySign,
        success: (e) => {
          this.payPrice = money
          this.$refs.confirmBtn.death()
          this.$refs.successModal.open()
        },
        fail: (err) => {
          this.$refs.confirmBtn.stop()
          if (err.errMsg.indexOf('取消') > -1 || err.errMsg.indexOf('cancel') > 1 || err.errMsg.indexOf('-2') > -1) {
            this.$util.msg('取消支付')
          } else {
            this.$util.msg('支付遇到错误，请稍候重试')
            console.log(err)
          }
        }
      }
      uni.requestPayment(payParams)
    },
    //统一支付回调
    successCallback() {
      this.$store.dispatch('getUserInfo')
      uni.navigateBack()
    },
    checkePrice(item) {
      this.moneyList.forEach((item) => {
        item.checked = false
      })
      this.money = ''
      item.checked = true
    },
    checkType(type) {
      this.curType = type
    },
    //获取小程序code
    // #ifdef MP
    getMpCode(provider) {
      return new Promise((resolve) => {
        uni.login({
          provider,
          success(res) {
            resolve(res.code)
          }
        })
      })
    }
    // #endif
  }
}
</script>

<style lang="scss" scoped>
.row {
  /* #ifndef APP-PLUS-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  align-items: center;
}

.app {
  width: 100%;
  height: 100%;
}

.bar {
  .left {
    > image {
      width: 32rpx;
      height: 32rpx;
    }
  }

  .center {
    > text {
      font-size: 32rpx;

      font-weight: 600;
      color: #333333;
      line-height: 44rpx;
    }
  }

  .right {
    .icon {
      width: 140rpx;
      height: 52rpx;
      border-radius: 32rpx;
      border: 2rpx solid #e1e1e1;
      display: flex;
      align-items: center;
      justify-content: center;

      image {
        &:nth-child(1) {
          width: 40rpx;
          height: 12rpx;
        }

        &:nth-child(3) {
          width: 28rpx;
          height: 28rpx;
        }
      }
    }

    .line {
      width: 2rpx;
      height: 22rpx;
      background-color: #e1e1e1;
      margin: 0 14rpx;
    }
  }
}

.cont {
  width: 100%;
  height: 100%;
  background: #f7f7f7;
  padding: 20rpx;

  .item {
    width: 100%;
    background: #ffffff;
    border-radius: 20rpx;
    padding: 30rpx 24rpx;

    .tit {
      display: flex;
      align-items: center;

      > image {
        width: 24rpx;
        height: 32rpx;
        margin-right: 12rpx;
      }

      > text {
        font-size: 32rpx;

        font-weight: 500;
        color: #333333;
        line-height: 44rpx;
      }
    }

    .price-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: 22rpx;

      .p-item {
        width: 148rpx;
        height: 70rpx;
        background: #eeeeee;
        border-radius: 10rpx;

        text {
          font-size: 28rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 40rpx;
        }
      }

      .active {
        background: var(--bg-color);

        text {
          color: #fff;
        }
      }
    }

    .other {
      height: 40rpx;
      margin-top: 32rpx;
      font-size: 28rpx;
      color: #333;

      .input {
        flex: 1;
        text-align: right;
        font-size: 34rpx;
        color: #333;
        margin-right: 20rpx;
      }
    }

    .type {
      display: flex;
      align-items: center;
      margin-top: 40rpx;
      border-top: 2rpx solid #f5f5f5;
      padding-top: 40rpx;

      &:nth-last-of-type(1) {
        padding-top: 40rpx;
        margin-bottom: 20rpx;
      }

      .icon {
        width: 40rpx;
        height: 40rpx;
        margin-right: 14rpx;
      }

      .tit {
        flex: 1;
        font-size: 28rpx;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #333333;
        line-height: 40rpx;
      }

      .tip {
        margin-top: 14rpx;
        font-size: 24rpx;
        color: #999;
      }

      .icon-xuanzhong {
        font-size: 32rpx;
        color: var(--bg-color);
      }
    }
  }

  .recharge {
    margin-bottom: 20rpx;
  }

  .button {
    .jw-btn-content {
      height: 80rpx;
      background: var(--bg-color);
      border-radius: 40rpx;
      font-size: 28rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 40rpx;

      &:after {
        display: none;
      }
    }
  }
}

.tip {
  height: 394rpx;
  background: #ffffff;
  margin-top: 18rpx;
  padding: 40rpx;

  .titl {
    font-size: 28rpx;

    font-weight: 600;
    color: #666666;
    line-height: 40rpx;
    margin-bottom: 6rpx;
  }

  > view {
    > text {
      font-size: 22rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #999999;
      line-height: 32rpx;
    }

    &:nth-child(2) {
      > text:nth-child(2) {
        color: #333333;
      }
    }

    &:nth-child(5) {
      > text:nth-child(2) {
        color: var(--bg-color);
        font-weight: 600;
        border-bottom: 2rpx solid var(--bg-color);
      }
    }
  }
}
</style>
