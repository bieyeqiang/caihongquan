<template name="drift">
  <view class="xddrift">
    <image style="width: 100vw; height: 100%" src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/piaoliuping/fish_home.png"></image>
    <image class="pxcc" src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/piaoliuping/fish_px.png"> </image>
    <view class="titleText">
      <view class="title">{{ harborTitle }}</view>
      <view>{{ harborText }}</view>
    </view>
    <image class="drift-plp" :style="{ top: plptop + 'px' }" src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/piaoliuping/drift_plp.png"></image>
    <view class="drift-bo1" :style="{ left: btleft - 5 + 'px' }">
      <image v-for="(one, index) in bolist1" :key="index" class="drift-mbo" src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/piaoliuping/drift_mbo1.png"></image>
    </view>
    <view class="drift-bo2" :style="{ left: btleft + 'px' }">
      <image v-for="(one, index) in bolist1" :key="index" class="drift-mbo" src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/piaoliuping/drift_mbo2.png"></image>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'drift',
  data() {
    return {
      btleft: 0,
      btleft1: 0,
      bolist1: 30,
      windowWidth: 0,
      plptop: 55,
      plpadd: 1,
      harborTitle: '陪伴湾 - 茫茫大海遇见你',
      harborText: '只想要个拥抱而已.'
    }
  },
  props: {
    plpspeed: {
      type: Number,
      default: 1
    },
    bospeed: {
      type: Number,
      default: 1
    }
  },
  computed: {
    ...mapState(['openExamineWx'])
  },
  //组件生命周期
  created: function (e) {
    var that = this
    uni.getSystemInfo({
      success: function (res) {
        that.windowWidth = res.windowWidth
        that.btleft = 100 - res.windowWidth
      }
    })
    that.beijing()
  },
  methods: {
    frientBtn() {
      wx.navigateTo({
        url: '/pagesA/message/friend/friend?index=0'
      })
    },
    pingzi() {
      uni.showToast({
        title: '你还没有瓶子..',
        icon: 'none',
        duration: 3000
      })
    },
    beijing() {
      this.btleft += this.bospeed
      this.plptop = this.plptop + this.plpadd
      if (this.plptop <= 55) {
        this.plpadd = this.plpspeed
      }
      if (this.plptop >= 60) {
        this.plpadd = -this.plpspeed
      }
      if (this.btleft + 100 >= 0) this.btleft = 100 - this.windowWidth
      var that = this
      setTimeout(function () {
        that.beijing()
      }, 100)
    }
  }
}
</script>

<style lang="scss" scoped>
.titleText {
  position: absolute;
  top: 220rpx;
  text-align: center;
  width: 100%;
  view {
    color: #fff;
    font-size: 25rpx;
    line-height: 60rpx;
  }
  .title {
    font-size: 35rpx !important;
  }
}
.pxcc {
  width: 30px;
  height: 30px;
  position: relative;
  bottom: 40px;
  left: 120px;
}
.xddrift {
  position: relative;
  width: 100%;
  height: 250px;
  z-index: 999;
}
.drift-plp {
  width: 26px;
  height: 37px;
  position: absolute;
  top: 59px;
  left: 88px;
}
.drift-bo1 {
  position: absolute;
  top: 70px;
  left: 0;
  width: 180%;
  height: 25px;
  overflow: hidden;
}
.drift-bo2 {
  position: absolute;
  top: 80px;
  left: 0;
  width: 180%;
  height: 25px;
  overflow: hidden;
}
.drift-mbo {
  width: 44px;
  height: 22px;
}
.drift-btv {
  position: absolute;
  font-size: 14px;
  bottom: -3px;
  padding: 0 20rpx;
  width: 100%;
  box-sizing: border-box;
}
.drift-btv {
  line-height: 31px;
}
.drift-btv image {
  vertical-align: middle;
  justify-content: center;
  align-items: center;
}
</style>
