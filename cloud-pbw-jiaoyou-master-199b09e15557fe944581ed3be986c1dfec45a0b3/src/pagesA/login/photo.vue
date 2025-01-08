<template>
  <view>
    <view class="setUp">
      <text class="title">上传自拍封面头像</text>
      <view class="nameImg">
        <view class="u-avatar-wrap">
          <image
            class="u-avatar-demo"
            @tap="chooseAvatar"
            :src="headImg"
            mode="aspectFill"
          ></image>
        </view>
      </view>
      <view class="btncor">
        <u-button type="primary" ripple shape="circle" @click="next"
          >下一步</u-button
        >
      </view>

      <u-popup v-model="namimgshow" mode="center" :border-radius="20" closeable>
        <view class="guize">
          <image
            src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/home/appIcon/nameimgyaoqiu.png"
          ></image>
        </view>
      </u-popup>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      headImg:
        'https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/home/appIcon/morentou.png',
      namimgshow: true,
      content: ''
    }
  },
  created () {},
  methods: {
    next () {
      if (
        this.headImg ==
        'https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/home/appIcon/morentou.png'
      ) {
        uni.showToast({
          title: '请上传个人封面头像',
          icon: 'none',
          duration: 3000
        })
        return
      }
      uni.setStorageSync('login_headImg', this.headImg)
      uni.navigateTo({
        url: '/pagesA/login/birthday'
      })
    },
    chooseAvatar () {
      uni.chooseImage({
        count: 1,
        success: res => {
          uni.navigateTo({
            url: `/pagesA/login/cutImage/cut?src=${res.tempFilePaths[0]}`
          })
        }
      })
    },
    //裁剪回调
    async setAvatar (filePath) {
      this.uploadProgress = 0
      const result = await uniCloud.uploadFile({
        filePath: filePath,
        cloudPath:
          'image/' +
          formatDate(new Date()) +
          '/' +
          Date.parse(new Date()) +
          '.jpg',
        onUploadProgress: e => {
          this.uploadProgress = Math.round((e.loaded * 100) / e.total)
        }
      })
      if (!result.fileID) {
        this.$util.msg('头像上传失败')
        return
      }
      const tempFiles = await uniCloud.getTempFileURL({
        fileList: [result.fileID]
      })
      const tempFile = tempFiles.fileList[0]
      if (tempFile.code === 'SUCCESS') {
        const getImageLog = await this.$request('security', 'imageDetection', {
          image: tempFile.download_url
        })
        if (getImageLog.state == 0) {
          this.headImg = tempFile.download_url
          uni.setStorageSync('login_headImg', tempFile.download_url)
        } else {
          this.$util.msg('头像涉嫌内容不适，请重新上传')
        }
      } else if (tempFile.tempFileURL) {
        const getImageLog = await this.$request('security', 'imageDetection', {
          image: tempFile.tempFileURL
        })
        if (getImageLog.state == 0) {
          this.headImg = tempFile.tempFileURL
          uni.setStorageSync('login_headImg', tempFile.tempFileURL)
        } else {
          this.$util.msg('头像涉嫌内容不适，请重新上传')
        }
      } else {
        this.$util.msg('头像上传失败')
      }
      // 日期
      function formatDate (date) {
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        m = m < 10 ? '0' + m : m
        var d = date.getDate()
        d = d < 10 ? '0' + d : d
        return y + '-' + m + '-' + d
      }
    }
  },
  onLoad () {
    if (uni.getStorageSync('login_headImg')) {
      this.headImg = uni.getStorageSync('login_headImg')
    }
  }
}
</script>

<style lang="scss" scoped>
.setUp {
  padding-top: 200rpx;
  text-align: center;
  margin: 20rpx 15%;
  position: relative;
  .guize {
    image {
      display: inline-block;
      width: 518rpx;
      height: 712rpx;
      border-radius: 50rpx;
    }
  }
  .nameImg {
    margin-bottom: 50rpx;
    display: flex;
    justify-content: center;
    .addimg {
      width: 45%;
      margin: 0 auto;
      padding: 10rpx;
    }
    .u-avatar-wrap {
      margin-top: 80rpx;
      overflow: hidden;
      margin-bottom: 80rpx;
      text-align: center;
    }
    .u-avatar-demo {
      width: 300rpx;
      height: 300rpx;
      background: #f1f1f1;
      border-radius: 50%;
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
