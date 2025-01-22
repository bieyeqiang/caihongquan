<template>
  <view class="content">
    <swiper
      class="swiper"
      :autoplay="autoplay"
      :duration="duration"
      :indicator-dots="true"
      indicator-active-color="#b125ef"
    >
      <swiper-item>
        <view class="swiper-item">
          <view class="swiper-item-img bg1"> </view>
        </view>
        <view class="jump-over" @tap="launchFlag()">{{ jumpover }}</view>
      </swiper-item>
      <swiper-item>
        <view class="swiper-item">
          <view class="swiper-item-img bg2"> </view>
        </view>
        <view class="jump-over" @tap="launchFlag()">{{ jumpover }}</view>
      </swiper-item>
      <swiper-item>
        <view class="swiper-item">
          <view class="swiper-item-img bg3"> </view>
        </view>
        <view class="experience" @tap="launchFlag()">{{ experience }}</view>
      </swiper-item>
    </swiper>
    <yangr-msg
      v-if="MsgShow"
      :title="titlemsg"
      type="success"
      :close="false"
      :info="info"
      closeTitle="暂不使用"
      btn="同意"
      @btnmsg="msgBtn"
      @closemsg="closeShow"
    ></yangr-msg>
  </view>
</template>

<script>
import yangrMsg from "@/components/yangr-msg/yangr-msg.vue";

export default {
  components: {
    yangrMsg,
  },
  data() {
    return {
      background: ["color1", "color2", "color3"],
      autoplay: false,
      duration: 500,
      jumpover: "跳过",
      experience: "立即体验",
      titlemsg: "协议条款更新提示",
      info: "感谢您信任并使用哈哈交友的产品和服务。根据工业和信息化部相关规定，我们依据最新的法律法规、监管政策要求，更新了服务协议和隐私条款，特向您详细说明哈哈交友的用户服务协议和隐私政策，请您阅读并充分理解相关条款。",
      MsgShow: false,
      tcpId: "",
      tcpShow: false,
    };
  },
  methods: {
    msgBtn() {
      this.MsgShow = false;
    },
    closeShow() {
      uni.showToast({
        title: "您暂不使用，您可自由退出应用了，非常感谢您！期待再会！",
        icon: "none",
        duration: 2000,
      });
    },
    launchFlag: function () {
      /**
       * 向本地存储中设置launchFlag的值，即启动标识；
       */
      uni.setStorage({
        key: "launchFlag",
        data: true,
      });
      uni.switchTab({
        url: "/pages/map/map",
      });
    },
  },
  onLoad() {
    // #ifdef  APP-PLUS
    if (this.systemInfo.platform == "ios") this.MsgShow = true;
    // #endif
  },
};
</script>
<style lang="scss">
page,
.content {
  width: 100%;
  height: 100%;
  background-size: 100% auto;
  padding: 0;
  position: fixed;
}
.swiper {
  width: 100%;
  height: 100%;
  background: #895dfa;
}
.bg1 {
  background: url("https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/home/yindaoye/icon_01.png")
    no-repeat 100% 100%;
  background-size: cover;
}
.bg2 {
  background: url("https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/home/yindaoye/icon_02.png")
    no-repeat 100% 100%;
  background-size: cover;
}
.bg3 {
  background: url("https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/home/yindaoye/icon_03.png")
    no-repeat 100% 100%;
  background-size: cover;
}
.swiper-item {
  width: 100%;
  height: 100%;
  text-align: center;
  position: relative;
  display: flex;
  align-items: flex-end;
  flex-direction: column-reverse;
}
.swiper-item-img {
  width: 100%;
  height: 100%;
}
.swiper-item-img image {
  width: 100vw;
  height: 100vh;
}

.uniapp-img {
  height: 20%;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.uniapp-img image {
  width: 40%;
}
.jump-over,
.experience {
  position: absolute;
  height: 60rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10rpx 50rpx;
  border-radius: 50rpx;
  font-size: 32rpx;
  color: #ffffff;
  background: $grad;
  box-shadow: 1rpx 3rpx 8rpx #999999;
  z-index: 999;
}
.jump-over {
  right: 45rpx;
  top: 125rpx;
  color: #ffffff;
  border: 4rpx solid #ffffff;
  background: none;
  box-shadow: none;
}
.experience {
  right: 50%;
  margin-right: -105rpx;
  bottom: 80rpx;
}
</style>
