<!--模板-->
<template>
  <view id="about">
    <!-- #ifdef MP-WEIXIN -->
    <official-account></official-account>
    <!-- #endif -->
    <view class="title" v-if="type == 'about'">
      <image
        class="title_logo"
        src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/static/img/logo.png"
      ></image>
      <br />
      <image
        class="title_brand"
        src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/static/img/brand.png"
        alt=""
      ></image>
      <view>
        <!-- #ifdef APP-PLUS -->
        <view>版本 V{{ AppTime }}</view>
        <!-- #endif -->
        <br />
        <view>©Copyright 2019-2020</view>
        <view>xx www.xxx.com（PC、APP下载）</view>
        <view>xxx科技有公司</view>
      </view>
    </view>
    <view class="wechat" v-if="type == 'wechat'">
      <image
        src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/home/appIcon/wechat.jpg"
      ></image>
      <view>(哈哈交友 微信小程序)</view>
      <view>截图，打开微信，识别二维码，即可进入小程序</view>
    </view>
    <view class="tcpCor" v-if="type == 'about'">
      <text @click.stop="tcp" style="color: #8ec6ff">《用户协议》</text>和<text
        @click.stop="tcp"
        style="color: #8ec6ff"
        >《隐私政策》</text
      >
    </view>
    <tcp :ShowBg="tcpShow" :tcpId="tcpId"></tcp>
  </view>
</template>

<!--JS-->
<script>
export default {
  components: {},
  data() {
    return {
      AppTime: "",
      tcpShow: false,
      tcpId: 1,
      type: "",
    };
  },
  methods: {
    tap() {
      this.navTo(
        "/pagesA/public/article?param=" +
          JSON.stringify({
            module: "article",
            operation: "getAgreement",
            data: { type: 1 },
          })
      );
    },
  },
  mounted() {
    //#ifdef APP-PLUS
    this.AppTime = plus.runtime.version;
    //#endif
  },
  onLoad: function (option) {
    //option为object类型，会序列化上个页面传递的参数
    this.type = option.type;
  },
};
</script>

<!--css样式-->
<style lang="scss" scoped>
.wechat {
  text-align: center;
  margin-top: 150px;
  image {
    width: 200px;
    height: 200px;
  }
}
.tcpCor {
  position: absolute;
  bottom: 50rpx;
  width: 100%;
  text-align: center;
}
#about {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #fff;
}
.title {
  text-align: center;
  margin-top: 100px;
}
.title_brand {
  width: 206upx;
  height: 95upx;
}
.title_logo {
  width: 190upx;
  height: 195upx;
}
.title > view {
  margin-top: 50px;
}
</style>
