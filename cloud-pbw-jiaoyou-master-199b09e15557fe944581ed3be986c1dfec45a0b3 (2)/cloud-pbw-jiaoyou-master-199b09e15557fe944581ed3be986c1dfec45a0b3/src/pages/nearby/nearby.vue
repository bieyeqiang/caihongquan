<template>
  <view class="dynNear-wrapper" v-bind:class="[tabIndex === 1 ? 'dynNearSwiper-bgcolor' : '']">
    <view class="tab_bg">
      <view style="margin: auto; margin-top: 20px">
        <scroll-view id="tab-barList" class="uni-swiper-tab" style="border: none" scroll-x :scroll-left="scrollLeft">
          <text
            v-for="(tabIndex, indexNum) in tabData"
            :key="indexNum"
            v-bind:class="[tabListIndex === indexNum ? 'tab_title_sel tab_title' : 'tab_title']"
            :id="tabIndex.id"
            :data-current="indexNum"
            @tap="tapList"
          >
            {{ tabIndex.name }}
            <span class="tabBar" v-if="tabListIndex == indexNum"></span>
          </text>
        </scroll-view>
      </view>
    </view>
    <!--外围-->
    <view class="allorders-content">
      <swiper :current="tabListIndex" style="height: 100%" class="swiper-box" duration="300" @change="changeList">
        <swiper-item class="swiper-box" v-for="(tabList, keyList) in newsList" :key="keyList">
          <scroll-view class="list" scroll-y :enable-back-to-top="true">
            <!--动态-->
            <view class="cotent_full" v-if="keyList == 0">
              <!-- 动态导航条 -->
              <view class="dynNear-header-wrapper" style="text-align: center" v-if="tab_title == 0">
                <scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
                  <span
                    v-for="(tab, index) in tabBars"
                    :key="index"
                    v-show="index != 5"
                    :class="[tabIndex === index ? 'dynNear-header-selected dynNear-header-wrapperItemTxt' : ' dynNear-header-wrapperItemTxt']"
                    :id="tab.id"
                    :data-current="index"
                    @tap="tapTab"
                    >{{ tab.name }}</span
                  >
                </scroll-view>
              </view>
              <!-- 动态内容 -->
              <view style="height: 85vh" v-if="tab_title == 0">
                <swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab" @transition="tabTransition">
                  <swiper-item class="swiper-box" v-for="(tab, key) in newsitems" :key="key">
                    <scroll-view class="list" scroll-y enable-back-to-top="true">
                      <!--附近-->
                      <view class="cotent_full" v-if="key == 0">
                        <view class="sliderTitle">
                          <text>距离：{{ range }}km</text>
                          <u-slider class="slider" style="flex: 1; width: 70%" @click.prevent="" v-model="range" step="20" @chang="changing" inactive-color="#f5f5f5" active-color="#5856D5"></u-slider>
                        </view>
                        <fujin :index="tabIndex" :tabTime="tabTime" :range="range"></fujin>
                      </view>
                      <!-- 最新 -->
                      <view class="cotent_full" v-if="key == 1">
                        <zuixin :index="tabIndex" :tabTime="tabTime"></zuixin>
                      </view>
                      <!--推荐-->
                      <view class="cotent_full" v-if="key == 2">
                        <remen :index="tabIndex" :tabTime="tabTime"></remen>
                      </view>
                      <!--旅行-->
                      <view class="cotent_full" v-if="key == 3">
                        <ouyu :index="tabIndex" :tabTime="tabTime"></ouyu>
                      </view>
                      <!--蹲单-->
                      <view class="cotent_full" v-if="key == 4">
                        <qiuzhu :index="tabIndex" :tabTime="tabTime"></qiuzhu>
                      </view>
                    </scroll-view>
                  </swiper-item>
                </swiper>
              </view>
            </view>
            <!-- 话题 -->
            <view class="cotent_full" v-if="keyList == 1">
              <view class="dynNear-header-wrapper">
                <scroll-view class="list" scroll-y enable-back-to-top="true">
                  <view class="cotent_full">
                    <huati :index="tabListIndex"></huati>
                  </view>
                </scroll-view>
              </view>
            </view>
            <!--瀑布流-->
            <view class="cotent_full" v-if="keyList == 2">
              <!--瀑布流-->
              <view class="dynNear-header-wrapper">
                <scroll-view class="list" scroll-y enable-back-to-top="true">
                  <view class="cotent_full">
                    <faxian :index="tabListIndex"></faxian>
                  </view>
                </scroll-view>
              </view>
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
    <!-- 无网络提示 -->
    <u-no-network></u-no-network>
    <view class="add_rt zwyHot" @click="addBtn">
      <view>
        <text class="iconfont">&#xe644;</text>
        显摆下
      </view>
    </view>
  </view>
</template>

<script>
import fujin from './fujin'
import ouyu from './ouyu'
import qiuzhu from './qiuzhu'
import remen from './remen'
import faxian from './faxian'
import zuixin from './zuixin'
import huati from './huati'
export default {
  components: {
    fujin,
    ouyu,
    qiuzhu,
    remen,
    faxian,
    zuixin,
    huati
  },
  data() {
    return {
      tabTime: '',
      tab_title: 0,
      ListData: [],
      bbb: false,
      itemIndex: 0,
      windowWidth: 0,
      wrapperHeightNum: 0,
      cardInfo: [
        {
          length: 1,
          singleHeight: 763
        },
        {
          length: 2,
          singleHeight: 865
        },
        {
          length: 2,
          singleHeight: 767
        },
        {
          length: 1,
          singleHeight: 763
        }
      ],
      scrollLeft: 0,
      tabData: [
        {
          name: '广场',
          id: 'guangchang'
        },
        {
          name: '话题',
          id: 'huati'
        },
        {
          name: '发现',
          id: 'faxian'
        }
      ],
      tabBars: [
        {
          name: '附近',
          id: 'fujin'
        },
        {
          name: '最新',
          id: 'zuixin'
        },
        {
          name: '推荐',
          id: 'tuijian'
        },
        {
          name: '旅行',
          id: 'lvxing'
        },
        {
          name: '蹲单',
          id: 'dundan'
        },
        {
          name: '',
          id: 'fuzhu'
        }
      ],
      tabIndex: 1,
      tabListIndex: 0,
      newsitems: [],
      newsList: [],
      latitude: '',
      longitude: '',
      nearbyList: [],
      meetList: [],
      helpList: [],
      hotList: [],
      imageList: [],
      fallsList: [],
      range: 50,
      tabTransitionShow: 0
    }
  },
  watch: {
    tab_title(index) {
      if (index == 1) {
        uni.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: '#ffffff'
        })
      }
    },
    range(val) {}
  },
  methods: {
    changing(e) {},
    tabTransition(val) {
      this.tabTransitionShow = val.detail.dx
    },
    onShareAppMessage(res) {
      return {
        title: '哈哈交友，寻找离你附近1公里的Ta',
        path: 'pages/map/map'
      }
    },
    addBtn() {
      if (!uni.getStorageSync('uniIdToken')) {
        uni.navigateTo({
          url: '/pagesA/login/auth/login'
        })
        return
      }
      uni.navigateTo({
        url: '/pagesA/nearby/nearbyAdd/nearbyAdd?index=0'
      })
    },
    // 动态滑动tab
    async changeTab(e) {
      // 跳转动态
      if (e.detail.current == 5) {
        this.tabIndex = 0
        this.tabListIndex = 1
        return
      }
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
            (data) => {
              res(data)
            }
          )
          .exec()
      })
    },
    async tapTab(e) {
      //点击tab-bar
      if (this.tabIndex == e.currentTarget.dataset.current) {
        return false
      } else {
        let tabBar = await this.getElSize('tab-bar'),
          tabBarScrollLeft = tabBar.scrollLeft //点击的时候记录并设置scrollLeft
        this.scrollLeft = tabBarScrollLeft
        this.isClickChange = true
        this.tabIndex = e.currentTarget.dataset.current
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
    },
    // 菜单 滑动tab
    async changeList(e) {
      let index = e.target.current
      if (this.isClickChange) {
        this.tabListIndex = index
        this.isClickChange = false
        return
      }
      let tabBar = await this.getElSizeList('tab-bar'),
        tabBarScrollLeft = tabBar.scrollLeft
      let width = 0
      for (let i = 0; i < index; i++) {
        let result = await this.getElSizeList(this.tabData[i].id)
        width += result.width
      }
      let winWidth = uni.getSystemInfoSync().windowWidth,
        nowElement = await this.getElSizeList(this.tabData[index].id),
        nowWidth = nowElement.width
      if (width + nowWidth - tabBarScrollLeft > winWidth) {
        this.scrollLeft = width + nowWidth - winWidth
      }
      if (width < tabBarScrollLeft) {
        this.scrollLeft = width
      }
      this.isClickChange = false
      this.tabListIndex = index //一旦访问data就会出问题
    },
    getElSizeList(id) {
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
            (data) => {
              res(data)
            }
          )
          .exec()
      })
    },
    async tapList(e) {
      //点击tab-bar
      if (this.tabListIndex === e.currentTarget.dataset.current) {
        return false
      } else {
        let tabBar = await this.getElSize('tab-barList'),
          tabBarScrollLeft = tabBar.scrollLeft //点击的时候记录并设置scrollLeft
        this.scrollLeft = tabBarScrollLeft
        this.isClickChange = true
        this.tabListIndex = e.currentTarget.dataset.current
      }
    },
    randomfnLsit() {
      let ary = []
      for (let i = 0, length = this.tabData.length; i < length; i++) {
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
  onLoad(option) {},
  onShow() {
    uni.showToast({
      title: '当前是产品演示系统，请勿真实使用！',
      icon: 'none',
      duration: 6000
    })
    // 小程序半秒震动
    //#ifdef MP-WEIXIN
    uni.vibrateShort({ success: function () {} })
    //#endif
    this.newsitems = this.randomfn()
    this.newsList = this.randomfnLsit()
  },
  onPullDownRefresh() {}
}
</script>

<style lang="scss" scoped>
.swiper-box {
  height: 100%;
}
.badge-button {
  width: 30rpx;
  height: 30rpx;
  box-shadow: 2rpx 3rpx 6rpx #666;
  border-radius: 50%;
  padding: 4rpx 6rpx;
  background-color: #fff;
  color: #fff;
  font-size: 22rpx;
  line-height: 1;
}
.sliderTitle {
  width: 100%;
  z-index: 9999999;
  height: 70rpx;
  background: #fff;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  border-bottom: 1rpx solid #f5f5f5;
  padding: 0 10rpx;
  ::v-deep .u-slider {
    flex: 1;
  }
  .slider {
    width: 70%;
    margin-left: 10rpx;
    flex: 1;
  }
}

.add_rt {
  position: fixed;
  right: 20rpx;
  bottom: 180rpx;

  z-index: 999;
}
.add_rt view {
  background: $fontLinear;
  color: #fff;
  border-radius: 30rpx;
  width: 90rpx;
  height: 90rpx;
  border-radius: 50%;
  box-shadow: 0rpx 6rpx 16rpx #666;
  font-size: 18rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    font-size: 33rpx;
  }
}
.list {
  height: 100%;
}
.cotent_full {
  width: 100%;
  height: 100%;
}
.allorders-content {
  width: 100%;
  height: 100vh;
  position: relative;
}
.dynNear-wrapper {
  color: #333;
  height: 100vh;
  width: 100%;
  position: fixed;
}
.dynNear-header-wrapper {
  display: flex;
  .uni-swiper-tab {
    border-bottom: 1px solid #f5f5f5 !important;
    height: 70rpx !important;
    line-height: 70rpx !important;
  }
}
.tab_bg {
  padding-top: 50rpx;
  display: flex;
  padding: 20rpx 30rpx;
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
  box-shadow: 2rpx 5rpx 6rpx #f5f5;
}
.tab_title {
  padding: 10rpx 40rpx;
  font-size: 32rpx;
  margin: 0 20rpx;
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
  padding: 5rpx 35rpx;
  background: #f5f5f5;
  font-size: 28rpx;
  border-radius: 30rpx;
  margin: 0 10rpx;
  transform: scale(1.1);
  color: #7a7997;
}
.dynNear-header-selected {
  background: $fontLinear;
  color: #fff;
  box-shadow: 2rpx 5rpx 10rpx #f5f5;
}
</style>
