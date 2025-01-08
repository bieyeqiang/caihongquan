<template>
  <view class="mianContent">
    <view class="asset_xp">
      <view class="mianju_img">
        <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/appIcon/mianju.png"></image>
      </view>
      <view class="swipertabBg">
        <scroll-view id="tab-bar" class="swipertab" scroll-x :scroll-left="scrollLeft">
          <view v-for="(tab, index) in tabBars" :key="tab.id" :class="tabIndex == index ? 'tabcor tabitem' : 'tabitem'" :id="tab.id" :data-current="index" @tap="tapTab">{{ tab.name }}</view>
        </scroll-view>
      </view>

      <view class="allorders-content">
        <swiper :current="tabIndex" style="height: 100%" duration="300" @change="changeTab">
          <swiper-item v-for="(tab, key) in newsitems" :key="key">
            <scroll-view class="list" scroll-y>
              <!--附近-->
              <view v-if="key == 0">
                <mianList :tabIndex="tabIndex + 1" index="1" :sexType="gender"></mianList>
              </view>
              <!--女神-->
              <view v-if="key == 1">
                <mianList :tabIndex="tabIndex + 1" index="2" :sexType="gender"></mianList>
              </view>
              <!--推荐-->
              <view v-if="key == 2">
                <mianList :tabIndex="tabIndex + 1" index="3" :sexType="gender"></mianList>
              </view>
              <!--新注册-->
              <view v-if="key == 3">
                <mianList :tabIndex="tabIndex + 1" index="4" :sexType="gender"></mianList>
              </view>
            </scroll-view>
          </swiper-item>
        </swiper>
      </view>
    </view>
  </view>
</template>

<script>
import mianList from '../../../pages/map/mianList'
export default {
  components: {
    mianList
  },
  data() {
    return {
      tabBars: [
        {
          name: '附近',
          id: 'fujin'
        },
        {
          name: '推荐',
          id: 'nvshen'
        },
        {
          name: '老板',
          id: 'laoban'
        },
        {
          name: '新注册',
          id: 'zhuce'
        }
      ],
      tabIndex: 1,
      newsitems: [],
      isClickChange: false,
      tabList: 0,
      scrollLeft: 0,
      show: true,
      gender: ''
    }
  },
  methods: {
    search() {
      uni.showActionSheet({
        itemList: ['看男生', '看女士', '不限'],
        success: res => {
          //console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
          if (res.tapIndex + 1 == 1) {
            this.$store.commit('setStateAttr', {
              key: 'sexType',
              val: 1
            })
            this.gender = 1
          }
          if (res.tapIndex + 1 == 2) {
            this.$store.commit('setStateAttr', {
              key: 'sexType',
              val: 2
            })
            this.gender = 2
          }
          if (res.tapIndex + 1 == 3) {
            this.$store.commit('setStateAttr', {
              key: 'sexType',
              val: ''
            })
            this.gender = ''
          }
          this.show = false
          setTimeout(() => {
            this.show = true
          }, 200)
        },
        fail: function (res) {
          //console.log(res.errMsg);
        }
      })
    },
    // 滑动tab
    async changeTab(e) {
      let index = e.target.current
      if (this.isClickChange) {
        this.tabIndex = index
        this.isClickChange = false
        return
      }
      let tabBar = await this.getElSize('tab-bar'),
        tabBarScrollLeft = tabBar.scrollLeft
      let width = 0
      for (let i = 0; i < index; i++) {
        let result = await this.getElSize(this.tabBars[i].id)
        width += result.width
      }
      let winWidth = uni.getSystemInfoSync().windowWidth,
        nowElement = await this.getElSize(this.tabBars[index].id),
        nowWidth = nowElement.width
      if (width + nowWidth - tabBarScrollLeft > winWidth) {
        this.scrollLeft = width + nowWidth - winWidth
      }
      if (width < tabBarScrollLeft) {
        this.scrollLeft = width
      }
      this.isClickChange = false
      this.tabIndex = index //一旦访问data就会出问题
    },
    getElSize(id) {
      //得到元素的size
      return new Promise((res, rej) => {
        uni
          .createSelectorQuery()
          .select('#' + id)
          .fields(
            {
              size: true,
              scrollOffset: true
            },
            data => {
              res(data)
            }
          )
          .exec()
      })
    },
    async tapTab(e) {
      //点击tab-bar
      if (this.tabIndex === e.target.dataset.current) {
        return false
      } else {
        let tabBar = await this.getElSize('tab-bar'),
          tabBarScrollLeft = tabBar.scrollLeft //点击的时候记录并设置scrollLeft
        this.scrollLeft = tabBarScrollLeft
        this.isClickChange = true
        this.tabIndex = e.target.dataset.current
      }
    },
    randomfn() {
      let ary = []
      for (let i = 0, length = this.tabBars.length; i < length; i++) {
        let aryItem = {
          loadingType: 0,
          data: []
        }
        for (let j = 1; j <= 10; j++) {
          aryItem.data.push(this['data' + Math.floor(Math.random() * 5)])
        }
        ary.push(aryItem)
      }
      return ary
    }
  },
  onShow() {
    this.newsitems = this.randomfn()
  },
  onLoad() {},
  onNavigationBarButtonTap() {
    this.search()
  }
}
</script>

<style lang="scss" scoped>
.mianContent {
  width: 100%;
  height: 100vh;
  position: fixed;
  .swipertabBg {
    border-bottom: 2rpx solid #f5f5f5;
    padding-bottom: 20rpx;
  }
  .asset_xp {
    position: relative;
    .searchFor {
      display: flex;
      align-items: center;
      position: fixed;
      top: 100rpx;
      right: 40rpx;
      z-index: 999;
      text {
        font-size: 40rpx;
      }
    }
  }
  .swipertab {
    width: 100%;
    display: flex;
    text-align: center;
  }
  .tabitem {
    color: #7a7997;
    display: inline-block;
    padding: 7rpx 30rpx;
    border-radius: 40rpx;
    text-align: center;
    background: #f5f5f5;
    margin: 0 10rpx;
    font-size: 25rpx;
  }
  .tabcor {
    color: #ffffff;
    background: linear-gradient(to right, #6665f6, #fa709a);
    font-weight: 500;
  }
  .mianju_img {
    display: flex;
    justify-content: center;
    image {
      width: 298rpx;
      height: 183rpx;
    }
  }
  .allorders-content {
    width: 100%;
    height: 100vh;
  }
  .dynNear-header-selected {
    background: #1cafaf;
    color: #fff;
  }
  .list {
    height: 100%;
  }
  .dynNear-header-wrapper {
    display: flex;
    text-align: center;
  }
  .tab_bg {
    padding-top: 50rpx;
    display: flex;
    padding: 20rpx 0;
    text-align: center;
    border-bottom: 1px solid #f5f5f5;
    background: #fff;
  }
  .dynNear-header-wrapperItem {
    flex: 1;
    height: 60rpx;
    line-height: 60rpx;
    text-align: center;
  }
  .tabBar {
    background: $fontLinear;
    height: 12rpx;
    position: absolute;
    width: 60%;
    left: 50%;
    margin-left: -30%;
    bottom: -6px;
    border-radius: 26px;
  }
  .tab_title {
    padding: 10rpx 40rpx;
    font-size: 32rpx;
    margin: 0 20upx;
    color: #c6c6c6;
    position: relative;
    transition: all 0.5s;
    transform: scale(1.1);
  }
  .tab_title_sel {
    color: $fontColor !important;
    font-weight: bold;
  }
  .dynNear-header-wrapperItemTxt {
    padding: 5rpx 40rpx;
    background: #f5f5f5;
    font-size: 28rpx;
    border-radius: 30rpx;
    margin: 0 20upx;
    transform: scale(1.1);
  }
  .tabSelet {
    border: 4rpx solid #eb5dff !important;
  }
  .tabCenter {
    position: absolute;
    bottom: 30rpx;
    left: 50%;
    border-radius: 50rpx;
    width: 316rpx;
    margin-left: -158rpx;
    background: rgba($color: #ffffff, $alpha: 0.8);
    box-shadow: 1px 2px 5px #666;
    z-index: 99999999;
    text-align: center;
    text {
      font-size: 20rpx;
      padding: 10rpx 25rpx;
      margin: 10rpx;
      display: inline-block;
      color: #fff;
      border: 4rpx solid #ffffff;
    }
  }
  .tabApp {
    position: absolute;
    bottom: 200rpx;
    border: 2px solid #333;
    border-radius: 50rpx;
    background: rgba($color: #ffffff, $alpha: 0.8);
    box-shadow: 1px 2px 5px #666;
    text-align: center;
    .textApp {
      bottom: 200rpx;
      font-size: 24rpx;
      padding: 15rpx 29rpx;
      margin: 10rpx;
      display: inline-block;
      color: #fff;
    }
  }
  .not_list {
    text-align: center;
    border: 1px solid #c6c6c6;
    padding: 10px 30px;
    margin: 20px 10px;
    color: #c6c6c6;
    border-radius: 2px;
  }
  .money_cor {
    color: #fdd149;
  }
  .card_bg {
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100vh;
    position: relative;
  }
  .mapStyle {
    width: 100%;
    height: 105%;
    position: relative;
  }
  .map_Text {
    position: absolute;
    width: 260rpx;
    left: 50%;
    top: 700upx;
    margin-left: -130rpx;
    margin-top: -200rpx;
    padding: 7rpx 15rpx;
    border-radius: 20rpx;
    background: #fff;
    text-align: center; // border: 1px solid #ddd;
    box-shadow: 2px 3px 6px #666;
    transition: all 0.5s;
    transform: scale(1.1);
    color: #909399;
  }
  .map_xiayu {
    width: 100vw;
    height: 100vh;
    display: inline-block;
    pointer-events: none;
  }
  .map_feiji {
    width: 500rpx;
    height: 500rpx;
    position: absolute;
    left: 50%;
    right: 0;
    top: 50%;
    bottom: 0;
    margin-left: -250rpx;
    margin-top: -250rpx;
  }
  .map_move {
    position: absolute;
    width: 23px;
    height: 37px;
    left: 50%;
    top: 50%;
    margin-left: -11.5px;
    margin-top: -40px;
  }
  .bobao {
    position: absolute;
    bottom: 550upx;
    left: 20upx;
    width: 98upx;
    height: 98upx;
  }
  .bottle {
    position: absolute;
    bottom: 400upx;
    left: 20upx;
    width: 98upx;
    height: 98upx;
  }
  .satellite {
    position: absolute;
    top: 150upx;
    right: 20upx;
    width: 98upx;
    height: 98upx;
  }
  .traffic {
    position: absolute;
    top: 300upx;
    right: 20upx;
    width: 98upx;
    height: 98upx;
  }
  .privacy {
    position: absolute;
    bottom: 250upx;
    left: 20upx;
    width: 98upx;
    height: 98upx;
  }
  .Refresh {
    position: absolute;
    bottom: 250upx;
    right: 20upx;
    width: 98upx;
    height: 98upx;
  }
  .location {
    position: absolute;
    bottom: 400upx;
    right: 20upx;
    width: 98upx;
    height: 98upx;
  }
  /*卡片*/
  .globalCololr {
    color: #333;
    background: #fdd149;
  }
  .detail-wrapper {
    position: absolute;
    width: 90%;
    /*height:60%;*/
    left: 5%;
    top: 34%;
    background: #fff;
    border-radius: 12rpx;
    padding-bottom: 10px;
  }
  .header {
    position: relative;
    color: #fff;
    width: 100%;
    height: 300rpx;
    border-top-left-radius: 12rpx;
    border-top-right-radius: 12rpx;
    z-index: 0;
    overflow: hidden;
  }
  .content-wrapper {
    position: relative;
    background: rgba(7, 17, 27, 0.3);
    width: 100%;
    height: 100%;
    font-size: 32rpx;
    background: #ff6364;
  }
  .background img {
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  .header_icon {
    position: absolute;
    top: 0rpx;
    right: 30rpx;
    display: inline-block;
    width: 80rpx;
    height: 40rpx;
    line-height: 36rpx;
    /*background:#FCD355;*/
    z-index: 3;
    font-size: 24rpx;
    padding: 0 16rpx;
  }
  .avatar {
    position: absolute;
    left: 30rpx;
    top: 30rpx;
  }
  .avatar_img {
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    z-index: 999999;
  }
  .avatar .avatar_icon {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    display: inline-block;
    width: 40rpx;
    height: 40rpx;
    border-radius: 50%;
    color: #fff;
    text-align: center;
    line-height: 30rpx;
  }
  .user_info {
    position: absolute;
    left: 170rpx;
    top: 17%;
  }
  .user_info .name {
    font-size: 32rpx;
  }
  .user_info .others {
    font-size: 26rpx;
    margin-top: 8rpx;
  }
  .others .address,
  .others .age-wrapper {
    display: inline-block;
  }
  .others .age-wrapper {
    background: pink;
    margin-left: 20rpx;
    font-size: 22rpx;
    height: 32rpx;
    line-height: 30rpx;
    padding: 0 16rpx;
    border-radius: 4rpx;
  }
  .age-wrapper_name_sex {
    display: inline-block;
    background: #fc7eef;
    margin-left: 20rpx;
    font-size: 22rpx;
    height: 32rpx;
    line-height: 35rpx;
    padding: 2rpx 25rpx;
    border-radius: 4rpx;
  }
  .age-wrapper_name {
    display: inline-block;
    background: #5597f9;
    margin-left: 20rpx;
    font-size: 22rpx;
    height: 32rpx;
    line-height: 35rpx;
    padding: 2rpx 25rpx;
    border-radius: 4rpx;
  }
  .label-wrapper {
    position: absolute;
    top: 180rpx;
    left: 20rpx;
    font-size: 24rpx;
  }
  .label-wrapper .label {
    border: 1rpx solid #fff;
    padding: 4rpx 16rpx 6rpx;
    margin-left: 16rpx;
    border-radius: 6rpx;
    float: left;
  }
  .focus-wrapper {
    position: absolute;
    bottom: 20rpx;
    width: 100%;
    padding: 0 30rpx;
    box-sizing: border-box;
    color: #fcd355;
    font-size: 24rpx;
  }
  .focus-wrapper .focus_num {
    display: inline-block;
  }
  .focus-wrapper .focus_btn {
    float: right;
    /*background:#FCD355;*/
    color: #000;
    padding: 3rpx 28rpx;
    border-radius: 30rpx;
  }
  .container-wrapper {
    width: 100%;
    box-sizing: border-box;
    padding: 0 30rpx;
  }
  .service-wrapper {
    margin: 20rpx 0;
    height: 60rpx;
    overflow: hidden;
  }
  .service-wrapper .service {
    padding: 8rpx 20rpx;
    background: #ddd;
    font-size: 24rpx;
    border-radius: 26rpx;
    margin-right: 12rpx;
    float: left;
    display: inline-block;
  }
  .service-wrapper .selected {
    background: #fcd355;
  }
  .connect-wrapper {
    margin-top: 20rpx;
    width: 100%;
  }
  .connect-wrapper .connect {
    display: inline-block;
    height: 60rpx;
    line-height: 60rpx;
    width: 40%;
    text-align: center;
    border-radius: 8rpx;
    font-size: 28rpx;
    margin: 0 5%;
  }
  .item {
    display: flex;
    margin-bottom: 20rpx;
  }
  .item_img {
    flex: 0 250rpx;
    width: 250rpx;
    height: 150rpx;
  }
  .item .item-info {
    flex: 0 365rpx;
    width: 365rpx;
    padding-left: 20rpx;
  }
  .item-info .title {
    padding: 15rpx 0;
  }
  .item-info .price {
    font-size: 32rpx;
  }
  .item-info .price-big {
    font-size: 46rpx;
  }
}
</style>
