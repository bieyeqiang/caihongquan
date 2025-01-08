<template>
  <view class="peiban">
    <view class="pipei">
      <image class="pipeibg" src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/appIcon/pipeibg.png"></image>
      <image class="zhuan pipeiqiu" src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/appIcon/pipeiqiu.png"></image>
      <view class="pipeibtn">
        <view style="background: #9e38f9" @click="pipeiBtn(1)">
          <view>在线匹配</view>
          <view class="psize">{{ randomNum(631, 1392) }}人在线</view>
          <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/appIcon/pipei1.png"></image>
        </view>
        <view style="background: #ff3893" @click="pipeiBtn(2)">
          <view>面具匹配</view>
          <view class="psize">{{ randomNum(2712, 6362) }}个面具人</view>
          <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/appIcon/pipei2.png"></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    async pipeiBtn(index) {
      // 查看是否是vip会员
      const vip = await this.$request('vipOrder', 'getVipStatus', {})
      if (vip.vip_status == 0 && vip.svip_status == 0) {
        uni.showToast({
          title: '您还不是会员，当前是演示系统直接跳过会员，进入~',
          icon: 'none',
          duration: 3000
        })

        // 真实用请打开
        // uni.showModal({
        //   title: '开通会员',
        //   content: '您还不是会员哦，请先开通~',
        //   success: (res) => {
        //     if (res.confirm) {
        //       uni.navigateTo({
        //         url: '/pagesA/myhome/member/member'
        //       })
        //     }
        //   }
        // })
        // return
      }

      // 匹配
      if (index == 1) {
        if (!uni.getStorageSync('uniIdToken')) {
          uni.navigateTo({
            url: '/pagesA/login/auth/login'
          })
          return
        }
        uni.showToast({
          title: '正在匹配用户...',
          icon: 'none',
          duration: 3000
        })
        var Stime = setTimeout(async () => {
          const res = await this.$request('nearby', 'randomUser', {
            gender: this.$store.state.sexType,
            size: 1
          })
          if (res) {
            uni.navigateTo({
              url: '/pagesA/service/homePage/homePage?code=' + res.data[0]._id
            })
          }
        }, 2000)
      }
      // 面具
      if (index == 2) {
        uni.showToast({
          title: '正在装扮面具...',
          icon: 'none',
          duration: 3000
        })
        var Stime = setTimeout(() => {
          uni.navigateTo({
            url: '/pagesA/map/map/mianju',
            animationType: 'slide-in-bottom'
          })
        }, 2000)
      }
    },
    randomNum(min, max) {
      return Math.floor(min + Math.random() * (max - min))
    }
  }
}
</script>

<style lang="scss" scoped>
.peiban {
  background: #fff;
}
/*球动画-转动*/
.zhuan {
  animation: myfirst 120s linear infinite;
  -moz-animation: myfirst 120s linear infinite; /* Firefox */
  -webkit-animation: myfirst 120s linear infinite; /* Safari 和 Chrome */
  -o-animation: myfirst 120s linear infinite;
}
@keyframes myfirst {
  0% {
    transform: rotate(360deg);
  }
  50% {
    transform: rotate(720deg);
  }
  100% {
    transform: rotate(1440deg);
  }
}

.pipei {
  position: relative;
  width: 100%;
  height: 100vh;
  .pipeibg {
    width: 100%;
    height: 700rpx;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 199;
  }
  .pipeiqiu {
    position: fixed;
    z-index: 100;
    top: 280rpx;
    width: 414rpx;
    height: 390rpx;
    left: 50%;
    margin-left: -207rpx;
  }
  .pipeibtn {
    position: absolute;
    bottom: 80rpx;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    > view {
      width: 70%;
      height: 100rpx;
      border-radius: 100rpx;
      padding: 0 60rpx;
      margin: 40rpx auto;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      letter-spacing: 2rpx;
      box-shadow: 2rpx 6rpx 15rpx #666666;
      box-sizing: border-box;
      image {
        width: 100rpx;
        height: 100rpx;
        position: absolute;
        right: 10rpx;
        top: -30rpx;
      }
      view {
        color: #ffffff;
        font-size: 28rpx;
        padding: 3rpx 0;
      }
      .psize {
        font-size: 20rpx !important;
      }
    }
  }
}
</style>
