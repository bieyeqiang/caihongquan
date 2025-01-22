<template>
  <view class="app column">
    <view
      class="cell row b-b"
      @click="navTo('/pagesA/myhome/personal/personal')"
    >
      <text class="tit">个人资料设置</text>
      <text class="jw-icon icon-you"></text>
    </view>
    <view class="cell row b-b" @click="navTo('/pagesA/login/auth/payPassword')">
      <text class="tit">支付密码设置</text>
      <text class="jw-icon icon-you"></text>
    </view>
    <view
      class="cell row b-b"
      @click="navTo('/pagesA/setting/setting/privacy')"
    >
      <text class="tit">隐私设置</text>
      <text class="jw-icon icon-you"></text>
    </view>
    <!-- <view class="cell row b-b">
      <text class="tit">通知设置</text>
      <view v-if="switchDisabled" class="loading">
        <jw-icon-loading size="32rpx" color="#5856D5"></jw-icon-loading>
      </view>
      <switch :checked="receivePush" :disabled="switchDisabled" color="#5856D5" @change="onSwitchChange" />
    </view> -->
    <view class="cell row b-b" @click="navTo('/pagesA/set/deactivate')">
      <text class="tit">注销账号</text>
      <text class="jw-icon icon-you"></text>
    </view>
    <!-- #ifdef APP-PLUS -->
    <view class="cell row b-b" @click="checkVersion">
      <text class="tit">检查更新</text>
      <!-- <text class="tip"></text> -->
      <view class="row" @click.stop.prevent="stopPrevent">
        <version-update ref="versionUpdate"></version-update>
      </view>
      <text class="jw-icon icon-you"></text>
    </view>
    <!-- #endif -->
    <view class="cell row b-b" @click="navTo('/pagesA/set/about')">
      <text class="tit">关于我们</text>
      <text class="jw-icon icon-you"></text>
    </view>
    <jw-button
      ref="confirmBtn"
      text="退出登录"
      marginTop="60rpx"
      :isConfirm="false"
      @onConfirm="showPopup('jwModal')"
    ></jw-button>
    <jw-modal
      ref="jwModal"
      title="提示"
      text="您确定要退出登录吗"
      @onConfirm="logout"
    ></jw-modal>
  </view>
</template>

<script>
export default {
  data() {
    return {
      receivePush: true, //是否接收推送通知
      switchDisabled: true,
      version: '' //当前版本号
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  onLoad() {
    this.version = ''
    this.receivePush = !!this.userInfo.receive_push
  },
  methods: {
    async logout() {
      this.$refs.confirmBtn.loading = true
      const res = await this.$request('user', 'logout')
      this.$refs.confirmBtn.loading = false
      this.$util.msg('您已退出登录')
      this.$store.commit('logout')
      uni.clearStorageSync()
      setTimeout(() => {
        uni.navigateBack()
      }, 1000)
    },
    //检查更新
    checkVersion() {
      this.$refs.versionUpdate.checkVersion()
    },
    //修改通知接收状态
    async onSwitchChange(e) {
      this.switchDisabled = true
      const val = e.detail.value
      this.receivePush = val
      const res = await this.$request('user', 'update', {
        receive_push: val
      })
      if (res.status === 1) {
        const userInfo = Object.assign(this.userInfo, {
          receive_push: val
        })
        this.$store.commit('setStateAttr', {
          key: 'userInfo',
          val: userInfo
        })
      } else {
        this.$util.msg('设置失败')
        this.receivePush = !val
      }
      this.switchDisabled = false
    }
  }
}
</script>

<style scoped lang="scss">
.row {
  display: flex;
  align-items: center;
}
.app {
  padding: 10rpx 44rpx 0;
}
.cell {
  height: 106rpx;
  .tit {
    flex: 1;
    font-size: 30rpx;
    color: #333;
  }
  .tip {
    margin-right: 10rpx;
    font-size: 26rpx;
    color: #999;
  }
  .icon-you {
    font-size: 24rpx;
    color: #aaa;
  }
  .icon-xuanzhong {
    font-size: 36rpx;
    color: #d8d8d8;

    &.active {
      color: $cor;
    }
  }
  switch {
    transform: scale(0.8) translateX(10rpx);
    transform-origin: center right;
  }
  .loading {
    transform: translateX(8rpx);
  }
}
</style>
