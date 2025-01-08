<template>
  <view class="zero-privacy" :class="[{ 'zero-bottom': position == 'bottom' }]" v-if="showPrivacy">
    <view class="zero-privacy-container" :style="{ '--color': color, '--bgcolor': bgcolor }">
      <view class="title">
        {{ title }}
      </view>
      <view class="content">
        {{ predesc }}
        <text @click.stop="handleOpenPrivacyContract">{{ privacyContractNameCustom || privacyContractName }}</text
        >。
        {{ subdesc }}
      </view>
      <view class="footer">
        <view class="btn disagree-btn" @click="handleRefuse">拒绝</view>
        <button id="agree-btn" class="btn agree-btn" open-type="agreePrivacyAuthorization" @agreeprivacyauthorization="handleAgree">同意</button>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: 'zero-privacy',
  emits: ['agree', 'disagree'],
  props: {
    position: {
      type: String,
      default: 'center'
    },
    color: {
      type: String,
      default: '#0396FF'
    },
    bgcolor: {
      type: String,
      default: '#ffffff'
    },
    onNeed: {
      type: Boolean,
      default: true
    },
    hideTabBar: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '用户隐私保护提示'
    },
    predesc: {
      type: String,
      default: '依照遵循官方《小程序隐私协议》的相关规定，使用相关功能需对进行请求授权，现使用前请仔细阅读并同意'
    },
    subdesc: {
      type: String,
      default: '当您点击同意后，即表示您已阅读理解并同意该条款内容，该条款将对您产生法律约束力。如您拒绝，部分功能将无法使用。'
    },
    privacyContractNameCustom: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      resolvePrivacyAuthorization: null,
      showPrivacy: false,
      privacyContractName: '', // 小程序协议名称
      homeShow: false
    }
  },
  methods: {
    open(name) {
      if (this.hideTabBar) {
        uni.hideTabBar({
          success: (res) => {
            // console.log("hideTabBar", res);
          },
          fail: (err) => {
            // console.error("hideTabBar", err);
          }
        })
      }
      this.privacyContractName = name
      this.showPrivacy = true
    },
    close() {
      this.showPrivacy = false
      if (this.hideTabBar) {
        uni.showTabBar({
          success: (res) => {
            // console.log("showTabBar", res);
          },
          fail: (err) => {
            // console.error("showTabBar", err);
          }
        })
      }
    },
    // 点击同意
    handleAgree() {
      // 需要用户同意隐私授权时
      if (this.onNeed) {
        this.resolvePrivacyAuthorization({
          buttonId: 'agree-btn',
          event: 'agree'
        })
      }
      this.close()
      this.$emit('agree')
    },
    // 点击取消
    handleRefuse() {
      if (this.onNeed) {
        this.resolvePrivacyAuthorization({
          event: 'disagree'
        })
      }
      this.close()
      this.$emit('disagree')
    },
    // 查看隐私协议内容
    handleOpenPrivacyContract() {
      uni.openPrivacyContract({
        success: (res) => {
          // console.log("openPrivacyContract success", res);
        },
        fail: (err) => {
          // console.error("openPrivacyContract fail", err);
        }
      })
    },
    // 进入时获取隐私是否需要弹出隐私协议
    checkPrivacySetting() {
      this.homeShow = false
      uni.getPrivacySetting({
        success: (res) => {
          // 如果是needAuthorization为false，无需弹出隐私协议
          if (res.needAuthorization === false) {
            return
          }
          console.log(this.onNeed, 'this.onNeedthis.onNeed')
          if (this.onNeed) {
            uni.onNeedPrivacyAuthorization((resolve) => {
              if (this.homeShow) {
                uni.switchTab({
                  url: '/pages/tabbar/home'
                })
                uni.showToast({
                  title: '请先同意授权协议，才可使用~',
                  icon: 'none',
                  duration: 3000
                })
              }

              this.open(res.privacyContractName)
              this.resolvePrivacyAuthorization = resolve
            })
            // 模拟调用弹窗
            uni.requirePrivacyAuthorize({
              success: async () => {
                this.homeShow = true
                // 用户同意授权  继续小程序逻辑
              },
              fail: () => {
                this.homeShow = true
                uni.showToast({
                  title: '您拒绝了授权,部分使用小程序功能将受限,如需恢复请仔细阅读并同意授权。',
                  icon: 'none',
                  duration: 3000
                })
              } // 用户拒绝授权
            })
          } else {
            this.open(res.privacyContractName)
          }
        },
        fail: () => {},
        complete: () => {}
      })
    }
  },
  created() {
    this.checkPrivacySetting()
  }
}
</script>

<style lang="scss">
.zero-privacy {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  -webkit-justify-content: center;
  animation: fadeIn 0.2s linear both;
}

.zero-privacy-container {
  width: 580rpx;
  min-height: 400rpx;
  background: var(--bgcolor);
  border-radius: 16px;
  padding: 50rpx;
  font-size: 14px;
  animation: fadeInBig 0.2s 0.2s linear both;
  backdrop-filter: blur(10rpx); //毛玻璃属性

  .title {
    color: #333333;
    font-size: 36rpx;
    text-align: center;
  }

  .content {
    color: #595959;
    margin-top: 36rpx;
    margin-bottom: 36rpx;
    line-height: 50rpx;
    white-space: pre-wrap;

    text {
      color: var(--color);
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;

    // 重置微信小程序的按钮样式
    button:after {
      border: none;
    }

    .btn {
      width: 200rpx;
      line-height: 80rpx;
      border-radius: 24px;
      text-align: center;
    }

    .disagree-btn {
      background-color: #f6f6f6;
      color: #4c4c4c;
    }

    .agree-btn {
      line-height: 80rpx;
      background-color: var(--color) !important;
      color: #fff;
      margin: 0;
    }
  }
}

.zero-bottom {
  align-items: flex-end;

  .zero-privacy-container {
    width: 100%;
    animation: fadeIn 0.2s linear both;
    animation: fadeInUp 0.2s 0.2s linear both;
    padding-bottom: calc(env(safe-area-inset-bottom) + 30rpx);
    border-radius: 24px 24px 0 0;
  }

  .footer {
    padding: 0 40rpx;

    .btn {
      width: 250rpx;
    }
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
}

@keyframes fadeInBig {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }

  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
</style>
