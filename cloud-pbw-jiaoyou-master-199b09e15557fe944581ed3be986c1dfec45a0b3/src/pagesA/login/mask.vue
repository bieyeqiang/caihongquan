<template>
  <view class="maskBg">
    <image
      class="container-bg"
      mode="aspectFill"
      src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/mask/page-bg.png"
    ></image>
    <view class="avatar-container" @touchstart="touchStart" @touchend="touchEnd" @touchmove="touchMove">
      <view class="avatar-bg-border">
        <image @touchstart="touchAvatarBg" class="avatar-bg" id="avatar-bg" :src="avatarPath"></image>
      </view>
      <image
        v-if="currentMaskId > -1"
        class="mask"
        :class="{ 'mask-with-border': showBorder }"
        id="mask"
        :src="maskPic"
        :style="{
          top: maskCenterY - maskSize / 2 - 2 + 'px',
          left: maskCenterX - maskSize / 2 - 2 + 'px',
          transform: 'rotate(' + rotate + 'deg)' + 'scale(' + scale + ')' + 'rotateY(' + rotateY + 'deg)'
        }"
      ></image>
      <view
        class="handle"
        :class="{ 'hide-handle': !showBorder }"
        :style="{
          top: handleCenterY - 10 + 'px',
          left: handleCenterX - 10 + 'px'
        }"
      >
        <image
          class="handle-img"
          id="handle"
          src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/mask/drag.svg"
        ></image>
      </view>
    </view>
    <view class="cans">
      <canvas v-if="canShow" class="cans-id-mask" canvas-id="cans-id-mask" />
    </view>
    <view class="action-wrapper">
      <view class="action" v-if="option.type != 'login'">
        <button class="action-btn" @click="goPage('/pagesA/myhome/personal/personal')">更换头像</button>
      </view>
      <view class="action">
        <button class="action-btn cor" @click=";(toIndex = 0), drawBtn()">开启神秘</button>
      </view>
      <view class="action">
        <button class="action-btn" @click=";(toIndex = 0), drawBtn()">跳过</button>
      </view>
      <!-- <view class="action">
        <button class="action-btn" @click="toIndex=1,draw()">另保存到相册</button>
      </view> -->
    </view>
    <view class="type-tabs">
      <view class="left">
        <image class="left-img" src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/mask/left.png"></image>
      </view>
      <scroll-view class="type-tabs-scroll" scroll-x="true" scroll-with-animation="true">
        <button class="tab" @click="changeType('secret')">神秘面具</button>
        <button class="tab" @click="changeType('mask')">戴口罩</button>
        <!-- <button class="tab" @click="changeType('newyear')">中国年</button> -->
        <!-- <button class="tab" @click="changeType('china')">小红旗</button> -->
        <!-- <button class="tab" @click="changeType('christmas')">圣诞帽</button> -->
      </scroll-view>
      <view class="right">
        <image class="right-img" src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/mask/right.png"></image>
      </view>
    </view>
    <view class="ornaments-tabs">
      <scroll-view class="scrollView ornaments-scroll-view" scroll-x="true" :scroll-left="scrollLeft" @scroll="scroll">
        <view class="img-wrap" v-for="index in imgLength" :key="index">
          <image
            class="img-list"
            :src="`https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/mask/${type}/${index}.png`"
            :data-mask-id="index"
            @tap="changeMask"
          ></image>
        </view>
      </scroll-view>
    </view>
    <canvas
      v-if="canShow"
      canvas-id="myCanvas"
      id="myCanvas"
      :style="{
        width: '375px',
        height: '700px',
        position: 'absolute',
        bottom: '-1500px',
        'z-index': '-1'
      }"
    />
  </view>
</template>

<script>
import Draw from '@/uni_modules/sakura-canvas/js_sdk/draw'
let interstitialAd = null,
  draw = null
export default {
  data () {
    return {
      canShow: true,
      option: '',
      mapImg: 'https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/logo.png',
      map: '/static/map.png',
      cansWidth: 230, // 宽度 px
      cansHeight: 230, // 高度 px
      avatarPath: '',
      imgLength: 16,
      currentMaskId: -1,
      showBorder: false,
      maskCenterX: wx.getSystemInfoSync().windowWidth / 2,
      maskCenterY: 250,
      cancelCenterX: wx.getSystemInfoSync().windowWidth / 2 - 50 - 2,
      cancelCenterY: 200,
      handleCenterX: wx.getSystemInfoSync().windowWidth / 2 + 50 - 2,
      handleCenterY: 300,
      maskSize: 100,
      scale: 1,
      rotate: 0,
      rotateY: 0,
      mask_center_x: wx.getSystemInfoSync().windowWidth / 2,
      mask_center_y: 250,
      cancel_center_x: wx.getSystemInfoSync().windowWidth / 2 - 50 - 2,
      cancel_center_y: 200,
      handle_center_x: wx.getSystemInfoSync().windowWidth / 2 + 50 - 2,
      handle_center_y: 300,
      scaleCurrent: 1,
      rotateCurrent: 0,
      touch_target: '',
      start_x: 0,
      start_y: 0,
      shareObj: {
        title: '欢乐中国年，饰品来曾颜',
        imageUrl: ''
      },
      isAdShow: false,
      type: 'secret',
      isSetAvatar: false,
      scrollLeft: 0,
      old: {
        scrollLeft: 0
      },
      homeData: '',
      headImg: '',
      toIndex: 0
    }
  },
  async onLoad (option) {
    console.log(option,'optionoptionoption')
    this.option = option
    this.getUser()

    // 补填的
    // let res = await this.$request("nearby", "maskUser", {
    //   skip: 0,
    //   limit: 500,
    //   type: 4,
    // });
    // console.log(res)

    // let list = []
    // for (let i of res.data) {
    //   if (i.avatar) {
    //     if (i.mapUser == undefined || i.mapUser == 'undefined' || i.mapUser == '' || i.mapUser == null || !i.mapUser) {
    //       list.push(i)
    //     }
    //   }
    // }
    // console.log(list)
    // let num = 0
    // setInterval(() => {
    //   console.log(num + '-' + list[num].nickname + ':' + list[num].uid + ':' + list[num].avatar)
    //   this.canShow = true
    //   this.getUser(list[num]._id)
    //   num++
    // }, 12000);
  },
  onShareAppMessage () {
    return {
      ...this.shareObj,
      path: '/pages/map/map',
      success: function (res) {}
    }
  },
  onShareTimeline (res) {
    return {
      ...this.shareObj,
      query: ''
    }
  },
  methods: {
    async getUser () {
      // 获取用户信息
      uni.showLoading({
        title: '加载中'
      })
      const res = await this.$request('home', 'getUserHome', {
        uid: uni.getStorageSync('userUid')
      })
      if (res) {
        this.homeData = res
        console.log(this.homeData,'this.homeDatathis.homeData')
        if (!res.user.avatar) return
        uni.downloadFile({
          url: res.user.avatar,
          success: res => {
            uni.hideLoading()
            this.avatarPath = res.tempFilePath
            this.isSetAvatar = true

            // 补填的
            // this.toIndex = 0
            // this.drawBtn()
          },
          fail: e => {
            this.loading = false
            uni.showToast({
              title: '图片加载超时',
              content: '网络异常，请稍后重试'
            })
          }
        })
      }
    },
    async mapCreated () {
      let draw = new Draw({
        width: 110, // canvas(海报)的宽度,
        height: 150, // canvas(海报)的高度,
        canvasId: 'myCanvas', // canvasId 必填
        background: {
          type: 'color', // 背景样式 color: 纯色 image: 图片
          color: 'rgba(0,0,0,0)',
          w: 375,
          h: 700
          // color: 参数详看绘制矩形的参数
          // image: 详看绘制图片时的样式
        }, // 背景，不必填,
        _this: this, // 传入this实例 必填
        drawDelayTime: 200, // 绘制海报时的延迟时间(单位毫秒),默认200,
        delayTime: 200, // 导出图片时的延迟时间(单位毫秒),默认200,
        fileType: 'png', // 导出图片的类型, 默认png 可选jpg, png
        quality: 1, // 导出图片的质量, 默认1 值范围0~1, 大于一都为1处理
        isCompressImage: false, // 绘制图片是是否进行压缩操作(h5不支持)(绘制图片也能填写该参数。层级大于当前) 默认不压缩
        drawTipsText: '装扮中...' // 绘制时的加载提示, 默认绘制中...
      })
      let gg = await draw.createdSharePoster(({ bgObj }) => {
        // 绘制图片
        let imageArray = [
          // {
          //   type: 'image',
          //   src: this.map,
          //   x: 0,
          //   y: 0,
          //   w: 100,
          //   h: 100,
          //   color: 'rgba(0,0,0,0)'
          // },
          // {
          //   type: 'image',
          //   src: this.headImg,
          //   drawType: 'arc',
          //   x: 15,
          //   y: 5,
          //   w: 70,
          //   h: 70,
          // },
          {
            type: 'image',
            src: this.headImg,
            drawType: 'arc',
            x: 0,
            y: 5,
            w: 100,
            h: 100,
            lineWidth: 10, // 图片边框大小
            color: this.homeData.user.gender == 1 ? '#35B8DF' : '#FEA8D5', // 图片边框颜色
            windowAlign: 'center'
          },
          {
            type: 'triangle',
            x: 35,
            y: 125,
            w: 40,
            h: 20,
            color: this.homeData.user.gender == 1 ? '#35B8DF' : '#FEA8D5',
            rotate: {
              deg: 180
            }
          },
          {
            type: 'arc',
            x: 50,
            y: 135,
            r: 5,
            color: '#ffffff'
          },
          {
            type: 'arc',
            x: 48,
            y: 133,
            r: 7,
            isFill: false,
            color: this.homeData.user.gender == 1 ? '#35B8DF' : '#FEA8D5'
          },
          {
            type: 'arc',
            x: 46,
            y: 131,
            r: 9,
            isFill: false,
            color: this.homeData.user.gender == 1 ? '#35B8DF' : '#FEA8D5'
          }
        ]
        return imageArray
      })
      this.upImg(gg.data, 'map', 'png')
    },
    async toMap () {
      // 保存资料
      const res = await this.$request('user', 'update', {
        secret: this.headImg,
        mapUser: this.mapImg
      })

      // 补填的
      // const res = await this.$request("user", "updateUserUid", {
      //   id: this.homeData.user._id,
      //   secret: this.headImg,
      //   mapUser: this.mapImg
      // });

      if (res) {
        uni.switchTab({
          url: '/pages/map/map'
        })
        // this.canShow = false
        uni.showToast({
          title: '装扮面具成功~',
          duration: 3000
        })
      }
    },
    async upImg (filePath, index, type) {
      const result = await uniCloud.uploadFile({
        filePath: filePath,
        cloudPath: 'image/' + formatDate(new Date()) + '/' + Date.parse(new Date()) + '.png',
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
      // console.log(tempFiles, "地址")
      // console.log(index, "类型")
      const tempFile = tempFiles.fileList[0]
      if (tempFile.code === 'SUCCESS') {
        if (index == 'user') {
          this.headImg = tempFile.download_url
          this.mapImg = tempFile.download_url
          this.mapCreated()
        } else {
          this.mapImg = tempFile.download_url
          this.toMap()
        }
      } else if (tempFile.tempFileURL) {
        if (index == 'user') {
          this.headImg = tempFile.tempFileURL
          this.mapImg = tempFile.tempFileURL
          this.mapCreated()
        } else {
          this.mapImg = tempFile.tempFileURL
          this.toMap()
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
    },
    // 选择图片
    chooseImage () {
      let that = this
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          that.avatarPath = res.tempFilePaths[0]
          that.isSetAvatar = true
        }
      })
    },
    scroll: function (e) {
      this.old.scrollLeft = e.detail.scrollLeft
    },
    // 更换类型
    changeType (val) {
      if (this.type == val) {
        return
      }
      this.scrollLeft = this.old.scrollLeft
      this.$nextTick(function () {
        this.scrollLeft = 0
      })
      this.currentMaskId = -1
      this.showBorder = false
      this.type = val
      this.shareObj = { ...this.shareObj, imageUrl: this.homeData.user.avatar }
      if (!this.isSetAvatar) {
        this.avatarPath = this.homeData.user.avatar
      }
      if (val == 'christmas') {
        this.imgLength = 13
        this.shareObj = { ...this.shareObj, title: '圣诞到，送你一顶圣诞帽' }
      } else if (val == 'newyear') {
        this.imgLength = 17
        this.shareObj = { ...this.shareObj, title: '欢乐中国年，饰品来曾颜' }
      } else if (val == 'china') {
        this.imgLength = 10
        this.shareObj = {
          ...this.shareObj,
          title: '献礼71周年华诞，为祖国母亲庆生'
        }
      } else if (val == 'mask') {
        this.imgLength = 7
        this.shareObj = { ...this.shareObj, title: '抗击疫情，人人有责' }
      } else if (val == 'secret') {
        this.imgLength = 16
        this.shareObj = { ...this.shareObj, title: '神秘一下吧' }
      }
    },
    // 选择挂件
    changeMask (e) {
      this.currentMaskId = e.target.dataset.maskId
      this.showBorder = true
    },
    // 设置挂件位置
    touchStart (e) {
      if (e.target.id == 'mask') {
        this.touch_target = 'mask'
        this.showBorder = true
      } else if (e.target.id == 'handle') {
        this.touch_target = 'handle'
      } else {
        this.touch_target = ''
      }

      if (this.touch_target != '') {
        this.start_x = e.touches[0].clientX
        this.start_y = e.touches[0].clientY
      }
    },
    touchMove (e) {
      var current_x = e.touches[0].clientX
      var current_y = e.touches[0].clientY
      var moved_x = current_x - this.start_x
      var moved_y = current_y - this.start_y
      if (this.touch_target == 'mask') {
        this.maskCenterX = this.maskCenterX + moved_x
        this.maskCenterY = this.maskCenterY + moved_y
        this.cancelCenterX = this.cancelCenterX + moved_x
        this.cancelCenterY = this.cancelCenterY + moved_y
        this.handleCenterX = this.handleCenterX + moved_x
        this.handleCenterY = this.handleCenterY + moved_y
      }
      if (this.touch_target == 'handle') {
        this.handleCenterX = this.handleCenterX + moved_x
        this.handleCenterY = this.handleCenterY + moved_y
        this.cancelCenterX = 2 * this.maskCenterX - this.handleCenterX
        this.cancelCenterY = 2 * this.maskCenterY - this.handleCenterY
        let diff_x_before = this.handle_center_x - this.mask_center_x
        let diff_y_before = this.handle_center_y - this.mask_center_y
        let diff_x_after = this.handleCenterX - this.mask_center_x
        let diff_y_after = this.handleCenterY - this.mask_center_y
        let distance_before = Math.sqrt(diff_x_before * diff_x_before + diff_y_before * diff_y_before)
        let distance_after = Math.sqrt(diff_x_after * diff_x_after + diff_y_after * diff_y_after)
        let angle_before = (Math.atan2(diff_y_before, diff_x_before) / Math.PI) * 180
        let angle_after = (Math.atan2(diff_y_after, diff_x_after) / Math.PI) * 180
        this.scale = (distance_after / distance_before) * this.scaleCurrent
        this.rotate = angle_after - angle_before + this.rotateCurrent
      }
      this.start_x = current_x
      this.start_y = current_y
    },
    touchEnd (e) {
      this.mask_center_x = this.maskCenterX
      this.mask_center_y = this.maskCenterY
      this.cancel_center_x = this.cancelCenterX
      this.cancel_center_y = this.cancelCenterY
      this.handle_center_x = this.handleCenterX
      this.handle_center_y = this.handleCenterY
      this.touch_target = ''
      this.scaleCurrent = this.scale
      this.rotateCurrent = this.rotate
    },
    // 不显示border
    touchAvatarBg () {
      this.showBorder = false
    },
    // 绘制头像
    drawBtn () {
      console.log(this.currentMaskId)
      if (this.currentMaskId == -1) {
        // uni.showToast({
        //   title: "您还没选择挂件哦",
        //   duration: 2000,
        //   icon: "none",
        // })
        // return
      }
      let scale = this.scale
      let rotate = this.rotate
      let mask_center_x = this.mask_center_x
      let mask_center_y = this.mask_center_y
      let that = this
      var query = wx.createSelectorQuery()
      query.select('#avatar-bg').boundingClientRect()
      query.exec(res => {
        mask_center_x = mask_center_x - res[0].left
        mask_center_y = mask_center_y - res[0].top
        const context = uni.createCanvasContext('cans-id-mask')
        const mask_size = 100 * scale

        context.clearRect(0, 0, that.cansWidth, that.cansHeight)
        context.drawImage(that.avatarPath, 0, 0, that.cansWidth, that.cansHeight)
        context.translate(mask_center_x, mask_center_y)
        context.rotate((rotate * Math.PI) / 180)
        if (this.currentMaskId > -1)
          context.drawImage(that.maskPic, -mask_size / 2, -mask_size / 2, mask_size, mask_size)
        context.draw(false, () => {
          that.saveCans()
        })
      })
    },
    // 保存头像
    saveCans () {
      let that = this
      uni.showLoading({
        title: '保存...',
        mask: true
      })
      uni.canvasToTempFilePath(
        {
          x: 0,
          y: 0,
          height: this.cansWidth,
          width: this.cansHeight,
          destWidth: this.cansWidth * 3,
          destHeight: this.cansHeight * 3,
          canvasId: 'cans-id-mask',
          success: res => {
            uni.hideLoading()
            if (this.toIndex == 0) {
              this.upImg(res.tempFilePath, 'user')
            } else {
              uni.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: res => {
                  uni.showModal({
                    title: '保存成功',
                    content: '头像已经在您的相册里啦',
                    showCancel: false
                  })
                },
                fail (res) {
                  if (res.errMsg.indexOf('fail')) {
                    uni.showModal({
                      title: '您需要授权相册权限',
                      success (res) {
                        if (res.confirm) {
                          uni.openSetting({
                            success (res) {},
                            fail (res) {}
                          })
                        }
                      }
                    })
                  }
                }
              })
            }
          },
          fail (res) {
            uni.hideLoading()
          }
        },
        this
      )
    }
  },
  computed: {
    maskPic: function () {
      return `https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/mask/${this.type}/${this.currentMaskId}.png`
    }
  }
}
</script>

<style lang="scss">
.maskBg {
  position: fixed;
  width: 750rpx;
  height: 100vh;
  background: $grad;
  .container-bg {
    position: absolute;
    width: 750rpx;
    height: 100%;
  }
  .avatar-container {
    height: 540rpx;
    width: 540rpx;
    margin: 165rpx auto 0;
    display: flex;
    justify-content: center;
    .avatar-bg-border {
      position: relative;
      border: 12rpx solid white;
      border-radius: 20rpx;
      width: 230px;
      height: 230px;
      .avatar-bg {
        position: absolute;
        border-radius: 10rpx;
        z-index: 0;
        height: 218px;
        width: 218px;
      }
    }
    .mask-with-border {
      border: dashed 6rpx white !important;
    }
    .mask {
      height: 100px;
      width: 100px;
      position: absolute;
      top: 100px;
      border: 6rpx solid rgba(255, 255, 255, 0);
    }
    .handle {
      position: absolute;
      z-index: 1;
      width: 50rpx;
      height: 50rpx;
      background: #fff;
      border-radius: 50%;
      font-size: 30rpx;
      color: #000;
      line-height: 50rpx;
      text-align: center;
      .handle-img {
        margin: 2rpx auto;
        width: 46rpx;
        height: 46rpx;
        position: absolute;
        left: 0;
      }
    }
    .hide-handle {
      display: none;
    }
  }
  .cans {
    .cans-id-mask {
      position: absolute;
      top: 2000px;
      left: 1000px;
      height: 270px;
      width: 270px;
      margin-left: auto;
      margin-right: auto;
    }
  }
  .action-wrapper {
    margin-top: 20px;
    margin-bottom: 20px;
    height: 110rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-weight: 900;
    .action {
      .cor {
        background: #5cc9f5 !important;
      }
      .action-btn {
        width: 200rpx;
        height: 70rpx;
        line-height: 70rpx;
        font-size: 28rpx;
        border-radius: 35rpx;
        background: $bg;
        padding: 0 10rpx;
        color: #fff;
      }
    }
  }
  .ad-wraper {
    margin: 0 auto;
    width: 700rpx;
    height: 100rpx;
  }
  .type-tabs {
    width: 100%;
    height: 220rpx;
    position: absolute;
    display: flex;
    .left {
      width: 40rpx;
      height: 80rpx;
      .left-img {
        width: 40rpx;
        height: 80rpx;
      }
    }
    .right {
      width: 40rpx;
      height: 80rpx;
      .right-img {
        width: 40rpx;
        height: 80rpx;
      }
    }
    .type-tabs-scroll {
      width: 670rpx;
      white-space: nowrap;
      .tab {
        width: 200rpx;
        height: 80rpx;
        text-align: center;
        line-height: 80rpx;
        background: #fbbd08;
        color: #333;
        font-weight: 900;
        font-size: 30rpx;
        border-radius: 10rpx;
        display: inline-block;
        margin: 0 20rpx;
      }
    }
  }
  .ornaments-tabs {
    width: 100%;
    position: absolute;
    margin-top: 140rpx;
    display: flex;
    height: 270rpx;
    .left {
      width: 40rpx;
      height: 170rpx;
      .left-img {
        width: 40rpx;
        height: 170rpx;
      }
    }
    .right {
      width: 40rpx;
      height: 170rpx;
      .right-img {
        width: 40rpx;
        height: 170rpx;
      }
    }
    .scrollView {
      width: 100%;
      background: $bg;
      position: absolute;
      margin-bottom: 0%;
      white-space: nowrap;
    }
    .ornaments-scroll-view {
      white-space: nowrap;
      width: 750rpx;
      .img-wrap {
        display: inline-flex;
        .img-list {
          height: 130rpx;
          width: 130rpx;
          border: 4rpx solid white;
          border-radius: 10rpx;
          margin: 20rpx;
        }
      }
    }
  }
}
</style>
