<template>
  <view>
    <view class="title">定义你的个人形象墙</view>
    <br />
    <view class="imglistBg">
      <view class="uni-uploader-body">
        <view class="uni-uploader__files">
          <block v-for="(image, index) in fileList" :key="index">
            <view class="uni-uploader__file" style="position: relative">
              <image class="uni-uploader__img" mode="aspectFill" lazy-load :src="image" :data-src="image" @tap="previewImage"></image>
              <span class="iconfont del" @click="delBtn(index)">&#xe654;</span>
            </view>
          </block>
          <view class="uni-uploader__input-box" v-if="fileList.length < 9">
            <view class="uni-uploader__input" @tap="addImg"></view>
          </view>
        </view>
      </view>
    </view>
    <view class="nameText">上传些自己的生活照吧^_^~~~Ta正想看你哦</view>
    <view class="nameText">（最少3张形象照）</view>
    <view class="btncor">
      <u-button type="primary" ripple shape="circle" @click="next">下一步</u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
    };
  },
  methods: {
    delBtn(index) {
      this.fileList.splice(index, 1);
    },
    previewImage: function (e) {
      var current = e.target.dataset.src;
      uni.previewImage({
        current: current,
        urls: this.fileList,
      });
    },
    async addImg() {
      console.log('addImg1');
      // 上传照片
      let file = await this.cloudUploadFile(9);
      console.log(file, 'filefile');
      if (file == undefined) {
        return;
      } else {
        uni.showLoading({
          title: '上传中...',
        });
      }
      file.fileUrl.forEach(async (item, index) => {
        const getImageLog = await this.$request('security', 'imageDetection', {
          image: item,
        });
        if (getImageLog.state == 0) {
          uni.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 3000,
          });
          this.fileList.push(getImageLog.image);
        } else {
          uni.showToast({
            title: '该图片涉嫌内容不适，请更换一个',
            icon: 'none',
            duration: 3000,
          });
        }
      });
    },
    next() {
      if (this.fileList.length < 3) {
        uni.showToast({
          title: '请至少上传3张个人形象照片',
          icon: 'none',
          duration: 3000,
        });
        return;
      }
      uni.setStorageSync('login_files', this.fileList);
      uni.navigateTo({
        url: '/pagesA/login/label',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.del {
  position: absolute;
  right: -10rpx;
  top: -10rpx;
  color: #fe586b;
  font-weight: bold;
  background: #fff;
  border-radius: 50%;
  padding: 10rpx;
}
.uni-uploader__img {
  border-radius: 15rpx;
}

.uni-uploader__input-box {
  background: #f5f5f5;
}
.btncor {
  width: 60%;
  margin: 50px auto;
}
.nameText {
  font-size: 25rpx;
  text-align: center;
}
.imglistBg {
  display: flex;
  justify-content: center;
  padding: 20rpx;
}
.title {
  font-size: 50rpx;
  font-weight: bold;
  margin: 20rpx 0;
  text-align: center;
}
</style>
