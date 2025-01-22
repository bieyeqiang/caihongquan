<template>
  <view>
    <view class="setUp">
      <text class="title">选择性别</text>
      <view class="sex">
        <image :class="sex == 1 ? 'cor' : ''" @click='sex = 1' src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/appIcon/sexman.png"></image>
        <image :class="sex == 2 ? 'cor' : ''" @click='sex = 2' src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/appIcon/sexwuman.png"></image>
      </view>
      <view class="textbot">选择后，不可更改</view>

      <view class="btncor">
        <u-button type="primary" ripple shape="circle" @click="next">下一步</u-button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      sex: 0,
    };
  },
  methods: {
    next () {
      if (this.sex == 0) {
        uni.showToast({
          title: "请选择性别（不可更改）",
          icon: "none",
          duration: 3000,
        });
        return;
      }
      uni.setStorageSync('login_sex', this.sex);
      uni.navigateTo({
        url: "/pagesA/login/photo",
      });
    },
  },
  onLoad () {
    if (uni.getStorageSync('login_sex')) {
      this.sex = uni.getStorageSync('login_sex')
    }
  }
};
</script>

<style lang="scss" scoped>
.setUp {
  padding-top: 200rpx;
  text-align: center;
  margin: 20rpx 15%;
  .textbot {
    margin-bottom: 30rpx;
  }
  .sex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 40rpx 0;
    image {
      width: 150rpx;
      height: 150rpx;
      border-radius: 50%;
      border: 1px solid #999999;
      margin: 50rpx;
      background: #f1f1f1;
    }
    .cor {
      background: $fontColorB;
      border: 1px solid $fontColorB;
    }
  }
  .title {
    font-size: 50rpx;
    font-weight: bold;
    margin: 20rpx 0;
  }
  .row {
    background: #f1f1f1;
    margin: 50rpx 0;
    border-radius: 40rpx;
  }
  .btncor {
    width: 60%;
    margin: auto;
  }
}
</style>
