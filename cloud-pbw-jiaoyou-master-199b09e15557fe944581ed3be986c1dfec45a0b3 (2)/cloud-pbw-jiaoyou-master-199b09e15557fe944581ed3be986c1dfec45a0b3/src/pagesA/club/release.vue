<template>
  <view class="issueDyn-wrapper">
    <view class="allorders-content">
      <view>
        <view class="issueDyn-swiper-item">
          <textarea
            v-model="nearbyVal"
            class="issueDyn-swiper-itemTxt"
            maxlength="500"
            style="min-height: 150px"
            auto-height
            placeholder="说点你的想说的话..."
          />
          <view class="topicBg"> </view>
          <view class="xianbai">添加你的照片，更利于别人看到你哦~</view>
          <view class="issueDyn-swiper-itemAddIcon">
            <view v-for="(item, index) of Src_base" :key="index">
              <view class="issueDyn-swiper-itemIcon" @click.stop="title_img(item)">
                <image :src="item" mode="aspectFill" lazy-load></image>
                <text class="iconfont delimg" @click.stop="delImg(index)">&#xe68b;</text>
              </view>
            </view>
            <view @click="posterSrcBtn" v-if="Src_base.length <= 12">
              <p class="issueDyn-swiper-itemIcon">
                <u-icon class="inlineFlex" name="plus" color="#9d9db3" size="50"></u-icon>
              </p>
            </view>
          </view>
          <wrap :height="2"></wrap>
          <view class="issueDyn-swiper-itemLocation" @click="showModel">
            <text class="issueDyn-swiper-itemLocation-label iconfont icon-labelb"></text
            ><text class="iconfont">&#xe61c;</text>标签：<text
              v-if="selectedLabel != ''"
              style="color: #eb5248; border: 1px solid #eb5248; padding: 2px 7px; border-radius: 2px"
              >{{ selectedLabel }}</text
            >
            <text class="iconfont icon-you issueDyn-swiper-itemLocation-right"></text>
          </view>
          <wrap :height="2"></wrap>
          <view class="issueDyn-swiper-item-fun" @click="Location">
            <view class="issueDyn-swiper-itemLocation">
              <text class="issueDyn-swiper-itemLocation-label iconfont icon-dingwei"></text
              ><text class="iconfont">&#xe738;</text>位置：{{ LocationText }}
            </view>
          </view>
          <wrap :height="2"></wrap>
          <view class="addBtn" @click="TextAll()">
            <view>发布互动信息</view>
          </view>
        </view>
      </view>
    </view>
    <!--弹窗标签-->
    <view class="issueDyn-model" v-bind:style="[{ top: modelTop }]" @click="hiddenModel">
      <view class="issueDyn-model-content" @click.stop="">
        <text class="issueDyn-model-content-hidden iconfont icon-shanchu"></text>
        <p class="issueDyn-model-content-title">设置标签</p>
        <view class="issueDyn-model-content-labelBox">
          <p class="issueDyn-model-content-txtLabel-title">快捷标签：</p>
          <text
            class="issueDyn-model-content-txtLabel-icon"
            v-for="(item, itemIndex) in labelList"
            :key="itemIndex"
            @click="chooseLabel(item)"
            v-bind:class="[selectedLabel === item ? 'issueDyn-model-content-txtLabel-activeClass' : '']"
            >{{ item }}</text
          >
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import wrap from '@/components/wrap'
export default {
  components: {
    wrap
  },
  data () {
    return {
      topicShow: false,
      topicItem: [],
      curIndex: 1,
      windowHeight: 0,
      animationData: {},
      txtLength: 0,
      modelIsShow: false,
      labelList: [
        '找男士',
        '找女士',
        '男女不限',
        '爱吃素',
        '爱吃肉',
        '会喝酒',
        '不装逼',
        '酒后不撒泼',
        '你请客',
        '我请客',
        'AA拼'
      ],
      selectedLabel: '',
      newsitems: [],
      isClickChange: false,
      nearbyVal: '',
      SrcList: [],
      Src_base: [],
      latitude: '',
      longitude: '',
      LocationText: '',
      cityShow: false,
      cityPickerValueDefault: [0, 0, 1],
      cityText: '',
      cityVal: '',
      cityFull: {},
      citydataList: {
        province: [],
        city: [],
        area: []
      },
      cityShow_end: false,
      cityPickerValueDefault_end: [0, 0, 1],
      cityText_end: '',
      cityVal_end: '',
      cityFull_end: {},
      citydataList_end: {
        province: [],
        city: [],
        area: []
      },
      topicG: [],
      topicR: [],
      topicZ: [],
      scrollLeft: '',
      topicList: [],
      subtype: '',

      option: '',
      poiData: ''
    }
  },
  watch: {},
  methods: {
    title_img (img) {
      let vm = this
      uni.previewImage({
        current: img,
        urls: vm.Src_base
      })
    },

    delImg (index) {
      this.SrcList.splice(index, 1)
      this.Src_base.splice(index, 1)
    },
    birthBtn_end (evt) {
      console.log(evt)
      this.birthVal_end = evt.detail.value
    },
    birthBtn (evt) {
      console.log(evt)
      this.birthVal = evt.detail.value
    },
    Location () {
      let vm = this
      uni.chooseLocation({
        success: function (res) {
          vm.latitude = res.latitude
          vm.longitude = res.longitude
          vm.LocationText = res.name
        },
        fail: function (res) {
          uni.showModal({
            title: '获取坐标失败',
            content: '您拒绝了授权获取坐标，无法为您定位，请在 [设置] 里打开坐标定位',
            success: function (res) {
              if (res.confirm) {
                //console.log("用户点击确定");
              }
            }
          })
        }
      })
    },
    async posterSrcBtn () {
      let file = await this.cloudUploadFile(8)
      this.SrcList = this.SrcList.concat(file.fileUrl)
      this.Src_base = this.Src_base.concat(file.fileUrl)
      uni.showToast({
        title: '上传成功',
        icon: 'success',
        duration: 1000
      })
    },
    TextAll (index) {
      if (this.nearbyVal == '') {
        uni.showToast({
          title: '请输入内容描述，最好在配张喜欢的照片^_^',
          icon: 'none',
          duration: 3000
        })
        return
      }
      this.addText()
    },
    async addText () {
      uni.showLoading({
        title: '发布中...',
        mask: true
      })
      const res = await this.$request('nearby', 'addNearby', {
        dynamicType: 6,
        clubId: this.option.id,
        dynamicContext: this.nearbyVal,
        dynamicImg: this.SrcList,
        longitude: this.longitude,
        latitude: this.latitude,
        positionDesc: this.LocationText,
        topicTitle: this.topicList
      })
      uni.hideLoading()
      if (res.status == 1) {
        uni.navigateBack({
          delta: 1
        })
        uni.showToast({
          title: res.msg,
          duration: 3000,
          icon: 'none'
        })
      } else {
        uni.showToast({
          title: res.msg,
          icon: 'none',
          duration: 3000
        })
      }
    },
    swiperChange (e) {
      this.curIndex = e.target.current
    },
    itemChange (cur) {
      this.curIndex = cur
    },
    markTxt (e) {
      this.txtLength = e.target.value.length
      this.selectedLabel = e.target.value
    },
    chooseLabel (item) {
      this.selectedLabel = item
    },
    showModel () {
      this.modelIsShow = true
    },
    hiddenModel () {
      this.modelIsShow = false
    }
  },
  onShow () {},
  onLoad: async function (option) {
    this.option = option

    // 获取定位
    uni.getLocation({
      type: 'gcj02',
      success: res => {
        this.latitude = res.latitude
        this.longitude = res.longitude
      }
    })
    setTimeout(() => {
      // 选照片
      this.posterSrcBtn()
    }, 200)
    // 获取景点详情
    const res = await this.$request('poi', 'getPoiDetail', {
      id: option.id
    })
    this.poiData = res.pois[0]
  },
  computed: {
    swiperHeight () {
      let relHeight = this.curIndex === 0 ? 600 : this.curIndex === 1 ? 920 : 670
      return relHeight
    },
    swiperLeft () {
      let relLeft = this.curIndex === 0 ? 0 : this.curIndex === 1 ? -750 : -1500
      return relLeft
    },
    modelTop () {
      let relTop = this.modelIsShow ? 0 : '-100%'
      return relTop
    }
  },
  created () {}
}
</script>

<style lang="scss" scoped>
.dtFenlei {
  padding: 20rpx; // border-bottom: 25rpx solid #f6f6f6;
  ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .sel {
      > view:first-child {
        border: 4rpx solid $fontColor;
        box-shadow: 0 5rpx 20rpx $fontColor;
      }
      > view:last-child {
        color: $fontColor;
        border: 2rpx solid $fontColor;
        border-radius: 10rpx;
        padding: 3rpx 10rpx;
      }
    }
    li {
      width: 25%;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .icon {
        width: 100rpx;
        height: 100rpx;
        margin: 20rpx 25rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 20rpx;
        background: #f5f5f5;
        border-radius: 50%;
        font-size: 30rpx;
        font-weight: 300;
        border: 4rpx solid rgba(255, 255, 255, 0);
        text {
          font-size: 50rpx;
          color: #ffffff;
        }
      }
      view {
        font-size: 25rpx;
        font-weight: 500;
        text-align: center;
        color: #666666;
        border: 2rpx solid #fff;
        padding: 3rpx 0;
      }
    }
  }
}
.del {
  position: absolute;
  right: -7rpx;
  top: -10rpx;
  color: #fe586b;
  font-weight: bold;
  font-size: 25rpx;
}
.topTitle {
  text-align: center;
  font-size: 30rpx;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f5f5f5;
}
.topicBg {
  border-bottom: 20rpx solid #f5f5f5;
  padding: 20rpx;
  > text {
    background: #9acaff;
    color: #007aff;
    padding: 5rpx 17rpx;
    margin-right: 20rpx;
    border-radius: 5rpx;
    line-height: 60rpx;
    position: relative;
  }
  > view {
    padding: 10rpx 0;
  }
}
.uni-swiper-tab-top {
  height: 70rpx;
  border-bottom: 2rpx solid #f5f5f5 !important;
}
.xianbai {
  padding: 20rpx 0;
  font-size: 22rpx;
  text-align: center;
}
.delimg {
  position: absolute;
  top: -10rpx;
  right: -10rpx;
  color: #fe586b !important;
  font-size: 19px !important;
  font-weight: bold;
  display: inline-block;
  background: #ffffff;
  border-radius: 50%;
  padding: 10rpx;
  width: 30rpx;
  height: 30rpx;
  line-height: 27rpx;
  text-align: center;
  z-index: 999;
}
textarea {
  padding: 5px;
}
.addBtn {
  text-align: center;
  margin: 60rpx 0;
}
.addBtn view {
  background: $fontLinear;
  color: #fff;
  font-size: 28rpx;
  padding: 3px 18px;
  border-radius: 15px;
  display: inline-block;
  width: 290rpx;
  box-shadow: 2px 3px 5px #999;
}
.allorders-content {
  width: 100%;
  height: 100vh;
}
.list {
  height: 100%;
}
.allorders-title {
  text-align: center;
}
.allorders-title-scroll {
  height: 68rpx;
  line-height: 68rpx;
  padding: 20rpx 0;
  width: 100%;
  white-space: nowrap;
}
.allorders-title-scroll-item {
  display: inline-block;
  padding: 5rpx 40rpx;
  background: #f5f5f5;
  font-size: 28rpx;
  border-radius: 30rpx;
  margin: 0 20rpx;
  text-align: center;
}
.scroll-itemCor {
  background: $fontLinear;
  color: #fff;
}
.issueDyn-wrapper {
  /*background: #EAEEF7;*/
  height: 100vh;
  color: #333;
  width: 100%;
  position: fixed;
}
.issueDyn-header-wrapper {
  padding: 20rpx;
  background: #fff;
}
.issueDyn-wrapper-content {
  height: 60rpx;
  line-height: 60rpx;
}
.issueDyn-header {
  padding: 6rpx 40rpx;
  background: #eaeef7;
  font-size: 32rpx;
  border-radius: 30rpx;
  margin-right: 30rpx;
}
.issueDyn-selected {
  background: $fontLinear;
}
.issueDyn-swiper {
  display: flex;
  width: 2250rpx;
  position: relative;
  transition: left 0.4s;
}
.issueDyn-swiper-item {
  box-sizing: border-box;
  background: #fff;
  padding: 20rpx 0 100rpx;
  flex: 0 750rpx;
}
.issueDyn-swiper-itemTxt {
  padding: 20rpx 20rpx;
  display: inline-block;
  color: #222;
  font-size: 28rpx;
  height: 230rpx;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 20rpx;
}
.issueDyn-swiper-itemTxt2 {
  margin-top: 20rpx;
}
.issueDyn-swiper-itemAddIcon {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 50rpx;
}
.issueDyn-swiper-itemAddIcon > view {
  width: 25%;
  padding: 5px;
  height: 100px;
  line-height: 100px;
  box-sizing: border-box;
  display: flex;
  justify-items: center;
  justify-content: center;
  text-align: center;
}
.issueDyn-swiper-itemIcon {
  width: 100%;
  height: 100%;
  background: #f4f9ff;
  position: relative;
  border-radius: 10rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.issueDyn-swiper-itemIcon .iconfont {
  font-size: 80rpx;
  color: #c5cdd8;
}
.issueDyn-swiper-itemIcon image {
  width: 100%;
  height: 100%;
  border-radius: 10rpx;
}
.issueDyn-swiper-itemLocation {
  padding: 0 20rpx;
  font-size: 28rpx;
  color: #222;
  padding: 20rpx 20rpx;
}
.issueDyn-swiper-itemLocation .issueDyn-swiper-itemLocation-label {
  font-size: 32rpx;
  color: #eaeef7;
  padding-right: 10rpx;
}
.issueDyn-swiper-itemLocation-right {
  float: right;
  color: #e3e3e3;
  font-size: 32rpx;
}
.picker-item {
  padding: 0 10px;
}
.issueDyn-swiper-item-date {
  display: flex;
  padding: 20rpx 0;
  align-items: center;
  justify-content: center;
}
.issueDyn-swiper-item-date-start,
.issueDyn-swiper-item-date-end {
  flex: 1;
  font-size: 30rpx;
  color: #222;
  text-align: center;
}
.issueDyn-swiper-item-date-icon {
  flex: 0 72rpx;
  display: inline-block;
  width: 72rpx;
  height: 8rpx;
  background: #eaeef7;
}
.issueDyn-swiper-item-addr {
  display: flex;
  padding: 30rpx 0;
  align-items: center;
  justify-content: center;
}
.issueDyn-swiper-item-addr-start,
.issueDyn-swiper-item-addr-end {
  flex: 1;
  font-size: 30rpx;
  color: #222;
  text-align: center;
}
.issueDyn-swiper-item-addr-icon {
  flex: 0 72rpx;
  color: #eaeef7;
  font-size: 52rpx;
  text-align: center;
}
.issueDyn-swiper-item-help {
  padding: 0 20rpx 20rpx;
}
.issueDyn-swiper-item-helpIcon {
  font-size: 28rpx;
  color: #333;
  border: 1rpx solid #e3e3e3;
  padding: 6rpx 30rpx;
  border-radius: 30rpx;
}
.issueDyn-model {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0; // background: rgba(0, 0, 0, 0.4);
  z-index: 20;
  transition: top 0.4s;
}
.issueDyn-model-content {
  background: #fff;
  box-shadow: 2px 3px 15px #333333;
  width: 90%;
  height: 700rpx;
  margin: 20% 5% 0;
  border-radius: 6rpx;
  position: relative;
}
.issueDyn-model-content-hidden {
  position: absolute;
  right: -20rpx;
  top: -20rpx;
  font-size: 40rpx;
  color: #000;
}
.issueDyn-model-content-title {
  text-align: center;
  padding: 20rpx 0;
  font-size: 32rpx;
}
.issueDyn-model-content-txt {
  width: 90%;
  margin: 20rpx 5% 0;
  background: #eaeef7;
  font-size: 32rpx;
  padding: 20rpx;
  box-sizing: border-box;
  border-top-left-radius: 6rpx;
  border-top-right-radius: 6rpx;
  height: 140rpx;
}
.issueDyn-model-content-txtLabel {
  width: 90%;
  margin: 0 5% 20rpx;
  background: #eaeef7;
  font-size: 32rpx;
  padding-right: 20rpx;
  padding-bottom: 10rpx;
  box-sizing: border-box;
  border-bottom-left-radius: 6rpx;
  border-bottom-right-radius: 6rpx;
  text-align: right;
  color: #888;
}
.issueDyn-model-content-labelBox {
  padding: 0 20rpx;
}
.issueDyn-model-content-txtLabel-title {
  color: #888;
  font-size: 32rpx;
  padding: 20rpx 0;
}
.issueDyn-model-content-txtLabel-icon {
  font-size: 32rpx;
  padding: 6rpx 20rpx;
  border: 2rpx solid #999999;
  color: #222;
  display: inline-block;
  margin: 10px;
  border-radius: 10rpx;
}
.issueDyn-model-content-txtLabel-activeClass {
  color: #fff;
  background: $fontLinear;
  border: none;
}
.issueDyn-model-contentBtn {
  text-align: center;
  margin-top: 40rpx;
}
.issueDyn-model-contentBtn-btn {
  display: inline-block;
  font-size: 32rpx;
  width: 60%;
  height: 60rpx;
  line-height: 60rpx;
  background: $fontLinear;
  border-radius: 6rpx;
}
</style>
