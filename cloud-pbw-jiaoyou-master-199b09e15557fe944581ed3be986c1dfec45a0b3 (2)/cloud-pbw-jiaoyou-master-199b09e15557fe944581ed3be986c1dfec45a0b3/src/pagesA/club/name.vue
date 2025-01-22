<template>
  <view class="name">
    <view class="title">
      <text>起个俱乐部名</text>
    </view>
    <view class="group-name">
      <text>俱乐部需要个好名字</text>
      <view class="input">
        <u--input
          placeholder="请输入内容"
          border="none"
          shape="circle"
          v-model="name"
          placeholderStyle="font-size: 28rpx;color: #999999;font-family: PingFangSC-Regular, PingFang SC;"
        ></u--input>
      </view>
    </view>
    <view class="title">
      <text>头像相册</text>
    </view>
    <view class="group-image">
      <text>俱乐部需要个美美的头像</text>
      <view class="image" @click="posterSrcBtn">
        <image v-if="image" :src="image"></image>
        <view v-else class="add">
          <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/travel/club/add.png"></image>
        </view>
      </view>
    </view>
    <view class="title">
      <text>介绍</text>
    </view>
    <view class="cont">
      <textarea
        class="text"
        v-model="text"
        maxlength="200"
        placeholder-style="font-size: 28rpx;font-family: PingFangSC-Regular, PingFang SC;color: #999999;"
        placeholder="0-200个字之间"
      />
    </view>
    <view class="button" @click="goNext()">
      <text>完成</text>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      text: '',
      image: '',
      circleTypeId: ''
    }
  },
  created () {},
  onLoad (option) {
    console.log(option)
    this.circleTypeId = option.circleTypeId
  },
  methods: {
    async goNext () {
      if (this.name && this.text && this.image) {
        const res = await this.$request('circle', 'addCircle', {
          name: this.name,
          image: this.image,
          text: this.text,
          circleTypeId: this.circleTypeId
        })
        console.log(res)
        if (res) {
          this.msg('提交成功，正在审核中···')
          setTimeout(() => {
            this.goPage('/pagesA/club/info?id=' + res.id)
          }, 1000)
        }
      } else {
        if (!this.text) this.msg('请输入介绍')
        if (!this.image) this.msg('请上传图片')
        if (!this.name) this.msg('请输入名称')
      }
    },
    // 上传图片
    async posterSrcBtn () {
      let file = await this.cloudUploadFile(8)
      if (file == undefined) {
        return
      } else {
        uni.showLoading({
          title: '上传中...'
        })
      }
      file.fileUrl.forEach(async (item, index) => {
        const getImageLog = await this.$request('security', 'imageDetection', {
          image: item
        })
        if (getImageLog.state == 0) {
          uni.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 1000
          })
          this.image = getImageLog.image
        } else {
          uni.showToast({
            title: '该图片涉嫌内容不适，请更换一个',
            icon: 'none',
            duration: 3000
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.name {
  height: 100%;
  background: #ffffff;
  padding: 28rpx 40rpx;
  .title {
    > text {
      font-size: 44rpx;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #333333;
      line-height: 60rpx;
    }
  }
  .group-name {
    display: flex;
    flex-direction: column;
    > text {
      font-size: 32rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #666666;
      line-height: 44rpx;
      margin: 6rpx 0 24rpx 0;
    }
    .input {
      height: 106rpx;
      background: #f8f8f8;
      border-radius: 53rpx;
      display: flex;
      align-items: center;
      padding: 0 30rpx;
      margin-bottom: 54rpx;
    }
  }
  .group-image {
    display: flex;
    flex-direction: column;
    > text {
      font-size: 32rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #666666;
      line-height: 44rpx;
      margin: 6rpx 0 24rpx 0;
    }
    .image {
      width: 182rpx;
      height: 182rpx;
      margin-bottom: 54rpx;
      > image {
        width: 182rpx;
        height: 182rpx;
        border-radius: 20rpx;
      }
      .add {
        width: 182rpx;
        height: 182rpx;
        background: #f8f8f8;
        border-radius: 20rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        > image {
          width: 40rpx;
          height: 40rpx;
        }
      }
    }
  }
  .cont {
    margin: 24rpx 0 96rpx 0;
    width: 100%;
    height: 218rpx;
    background: #f8f8f8;
    border-radius: 20rpx;
    padding: 20rpx;
    .text {
      height: 178rpx;
    }
  }
  .button {
    width: 100%;
    height: 106rpx;
    background: #449bff;
    border-radius: 53rpx;
    text-align: center;
    > text {
      font-size: 36rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 106rpx;
    }
  }
}
</style>
