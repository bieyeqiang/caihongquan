<template>
  <view>
    <view class="ray-msg-mask" @click="send"></view>
    <view class="ray-msg-content">
      <view class="ray-msg-title">{{
        title ? title : type == "success" ? "操作成功" : "操作失败"
      }}</view>
      <view class="fixed-msg-info" v-if="info">{{ info }}</view>
      <view class="fixed-msg-info"
        >您可以阅读<text style="color:#8EC6FF" @click.stop="tcp(1)"
          >《服务协议》</text
        >和<text style="color:#8EC6FF" @click.stop="tcp(2)">《隐私政策》</text
        >详细了解我方收集、储存、使用、披露和保护您的个人信息的举措，进而帮助您更好的保护您的隐私，如您同意，请点击“同意”开始使用我们的产品及服务。</view
      >
      <view style="display: flex;">
        <view
          :class="['ray-msg-btn', 'ray-msg-error']"
          @click="sendMsgToParentclose"
          >{{ closeTitle }}</view
        >
        <view :class="['ray-msg-btn', 'success']" @click="sendMsgToParent">{{
          btn
        }}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      tcpShow: false,
      tcpId: 1,
    };
  },
  name: "yangr-msg",
  //属性
  props: {
    title: {
      type: String,
      value: "", // title 为空时根据 type ，显示"操作成功"/"操作失败"
    },
    type: {
      type: String, // success or error
      value: "", // 默认值
    },
    info: {
      type: String,
      value: "", // info 为空时不显示
    },
    btn: {
      type: String,
      value: "",
    },
    closeTitle: {
      type: String,
      value: "",
    },
    close: {
      type: Boolean,
      value: "",
    },
  },
  //组件生命周期
  created: function(e) {},
  methods: {
    tcp(id) {
      this.navTo(
        "/pagesA/public/article?param=" +
          JSON.stringify({
            module: "article",
            operation: "getAgreement",
            data: { type: id },
          })
      );
    },
    send() {
      if (this.close) {
        this.$emit("closemsg", false);
      }
    },
    sendMsgToParent() {
      this.$emit("btnmsg", true);
    },
    sendMsgToParentclose() {
      this.$emit("closemsg", true);
    },
  },
};
</script>

<style lang="scss">
@import "./yangr-msg.scss";
</style>
