<template>
  <view :style="[theme]" class="app">
    <view v-if="!openExamine">
      <view class="input-wrap row">
        <text>提现金额</text>
        <input v-model="money" class="input" maxlength="10" placeholder="请输入提现金额" placeholder-style="color: #999" type="number" />
      </view>
      <view class="page-tit">
        <text class="f-b">选择提现方式</text>
      </view>
      <view class="cell row b-b" @click="checkType('wxpay')">
        <image :src="'https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/icon/wxpay.png'" class="icon"></image>
        <view class="column fill">
          <text class="tit">微信支付</text>
        </view>
        <u-icon v-if="curType === 'wxpay'" :color="$store.state.project.project.config.theme.cor" name="checkmark-circle-fill" size="40"></u-icon>
      </view>
      <!-- #ifndef MP-WEIXIN -->
      <view class="cell row b-b" @click="checkType('alipay')">
        <image :src="'https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/icon/alipay.png'" class="icon"></image>
        <view class="column fill">
          <text class="tit">支付宝</text>
        </view>
        <u-icon v-if="curType === 'alipay'" :color="$store.state.project.project.config.theme.cor" name="checkmark-circle-fill" size="40"></u-icon>
      </view>
      <!-- #endif -->

      <view v-if="curType === 'alipay'" class="info">
        <view class="input-wrap row">
          <text>姓名</text>
          <input v-model="alipayName" class="input" placeholder="请输入支付宝姓名" placeholder-style="color: #999" type="number" />
        </view>
        <view class="input-wrap row">
          <text>账户</text>
          <input v-model="alipayAccount" class="input" placeholder="请输入支付宝账户" placeholder-style="color: #999" type="number" />
        </view>
      </view>
      <view class="tip">
        <text class="titl">温馨提示</text>
        <view>
          <text>1、提现即代表已阅读并同意</text>
          <text @click="navToAgreementDetail('提现服务条款')">《提现服务条款》；</text>
        </view>
        <view>
          <text>2、提现会1-3个工作日审核，请耐心等待；</text>
        </view>
        <view>
          <text>3、如在提现过程中遇到任何问题，请联系官方客服；</text>
        </view>
      </view>
      <jw-button ref="confirmBtn" marginTop="80rpx" text="确认提现" @onConfirm="confirm"></jw-button>
    </view>

    <jw-empty v-else></jw-empty>

    <jw-loading v-if="isLoading" :mask="true"></jw-loading>
  </view>
</template>

<script>
export default {
  data() {
    return {
      curType: 'wxpay',
      alipayName: '',
      alipayAccount: '',
      money: ''
    }
  },
  computed: {
    openExamine() {
      return this.$store.state.openExamine
    }
  },
  watch: {},
  onLoad() {
    if (!this.openExamine) {
      uni.setNavigationBarTitle({
        title: '申请提现'
      })
    } else {
      uni.setNavigationBarTitle({
        title: '提现明细'
      })
    }
  },
  methods: {
    navToAgreementDetail(type) {
      this.navTo('/other/public/article?type=' + type)
    },
    confirm() {
      let { curType, alipayName, alipayAccount, money } = this
      if (!money) {
        this.$util.msg('请输入正确的提现金额')
        this.$refs.confirmBtn.stop()
        return
      }
      if (curType === 'alipay') {
        if (!alipayName) {
          this.$util.msg('请输入正确的支付宝姓名')
          this.$refs.confirmBtn.stop()
          return
        }
        if (!alipayAccount) {
          this.$util.msg('请输入正确的支付宝账户')
          this.$refs.confirmBtn.stop()
          return
        }
      }

      this.$util.throttle(async () => {
        this.$util.msg('提现金额不足')
        this.$refs.confirmBtn.stop()
        return
        const data = {
          curType: curType,
          money: money
        }
        if (alipayName) data.alipayName = alipayName
        if (alipayAccount) data.alipayAccount = alipayAccount
        const res = await this.$request('payment', 'addWithdraw', data)
        if (res) {
          this.msg('提现申请提交成功···')
          this.$refs.confirmBtn.stop()
        } else {
          this.msg('提现申请提交失败···')
        }
      })
    },
    checkType(type) {
      this.curType = type
      console.log(type)
    }
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

.page-tit {
  padding: 40rpx 0 30rpx 40rpx;
  font-size: 32rpx;
  color: #333;
  line-height: 48rpx;
  font-weight: 700;
}

.price-list {
  display: flex;
  flex-wrap: wrap;
  padding-left: 40rpx;

  .p-item {
    width: 160rpx;
    height: 78rpx;
    border-radius: 14rpx;
    margin-bottom: 20rpx;
    margin-right: 10rpx;
    background-color: #efefef;
    font-size: 28rpx;
    color: #999;
    border: 1rpx solid #d7d7d7;

    &.active {
      background: var(--bg-color);
      color: #fff;
      border: 0;
    }
  }
}

.input-wrap {
  height: 130rpx;
  padding: 10rpx 40rpx 0;
  font-size: 32rpx;
  color: #333;

  .input {
    flex: 1;
    text-align: right;
    font-size: 28rpx;
    color: #333;
  }
}

.cell {
  margin: 0 40rpx;
  height: 124rpx;

  .icon {
    width: 40rpx;
    height: 40rpx;
    margin-right: 32rpx;
  }

  .tit {
    flex: 1;
    font-size: 30rpx;
    color: #333;
    font-weight: 700;
  }

  .tip {
    margin-top: 14rpx;
    font-size: 24rpx;
    color: #999;
  }

  .icon-xuanzhong {
    font-size: 36rpx;
    color: var(--bg-color);
  }
}
</style>
