<template>
  <view class="container">
    <!-- tips 添加至我的小程序-->
    <!-- #ifdef MP-WEIXIN -->
    <struggler></struggler>
    <!-- #endif -->
    <view class="searchFor" v-if="openExamineApp" @click="searchFor"><text class="iconfont">&#xe74c;</text>筛选</view>
    <view class="searchFor" v-if="tabIndex == 0 || tabIndex == 2" @click="searchFor"><text class="iconfont">&#xe74c;</text>筛选</view>
    <view v-show="tabIndex == 0 || tabIndex == 1" class="allorders-title">
      <scroll-view id="tab-bar" class="pipeiTab" scroll-x :scroll-left="scrollLeft">
        <view v-for="(tab, index) in tabBars" :key="tab.id" :class="tabIndex == index ? 'tabcor tabitem' : 'tabitem'" :id="tab.id" :data-current="index" @tap="tapTab">{{ tab.name }}</view>
      </scroll-view>
    </view>
    <view class="allorders-content">
      <swiper v-if="!openExamineWx && !openExamineApp" :current="tabIndex" style="height: 100%" duration="300" @change="changeTab">
        <swiper-item v-for="(tab, key) in newsitems" :key="key">
          <scroll-view class="shopping" scroll-y @scroll="tablistscroll" :refresher-enabled="false">
            <!--约玩-->
            <peiban v-if="tabBars.length > 1 ? key == 0 : false"></peiban>
            <!-- 电台 -->
            <diantai v-if="tabBars.length > 1 ? key == 1 : key == 0"></diantai>
          </scroll-view>
        </swiper-item>
      </swiper>
      <!-- #ifdef MP-WEIXIN -->
      <scroll-view v-if="openExamineWx" class="shopping" scroll-y @scroll="tablistscroll" :refresher-enabled="false">
        <shopping :setPositionNew="setPositionNew"></shopping>
      </scroll-view>
      <!-- #endif -->
      <!-- #ifdef APP-PLUS || H5 -->
      <peiban v-if="openExamineApp"></peiban>
      <!-- #endif -->
    </view>
    <!-- 无网络提示 -->
    <u-no-network></u-no-network>
  </view>
</template>

<script>
import diantai from './diantai'
import peiban from './peiban'
import struggler from '@/components/struggler/struggler'
export default {
  components: {
    diantai,
    peiban,
    struggler
  },
  data() {
    return {
      locationText: '',
      tabBars: [
        {
          name: '陪伴',
          id: 'peiban'
        },

        {
          name: '电台',
          id: 'diantai'
        }
      ],
      newsitems: [],
      tabIndex: 0,
      scrollLeft: '',
      setPositionNew: {}
    }
  },
  computed: {
    openExamineWx() {
      return this.$store.state.openExamineWx
    },
    openExamineApp() {
      // #ifdef  APP-PLUS
      let ua = plus.navigator.getUserAgent()
      if (ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1) {
        // console.log("安卓手机");
        return false
      } else if (ua.indexOf('iPhone') > -1) {
        // console.log("苹果手机");
        return this.$store.state.openExamineApp
      }
      // #endif
    }
  },
  onShow() {
    uni.showToast({
      title: '当前是产品演示系统，请勿真实使用！',
      icon: 'none',
      duration: 6000
    })
    // 小程序半秒震动
    //#ifdef MP-WEIXIN
    uni.vibrateShort({ success: () => {} })
    //#endif
    this.newsitems = this.randomfn()
  },
  methods: {
    getPositionNew(e) {
      console.log(e, '切换')
      this.setPositionNew = e
    },
    // 筛选
    searchFor() {
      uni.showActionSheet({
        itemList: ['看男生', '看女士', '不限'],
        success: (res) => {
          if (res.tapIndex == 0) {
            this.$store.commit('setStateAttr', {
              key: 'sexType',
              val: 1
            })
          }
          if (res.tapIndex == 1) {
            this.$store.commit('setStateAttr', {
              key: 'sexType',
              val: 2
            })
          }
          if (res.tapIndex == 2) {
            this.$store.commit('setStateAttr', {
              key: 'sexType',
              val: ''
            })
          }
        }
      })
    },
    tablistscroll(data) {
      if (data.detail.scrollTop > 80) {
        this.tablistShow = false
      } else {
        this.tablistShow = true
      }
    },
    async changeTab(e) {
      // 小程序半秒震动
      //#ifdef MP-WEIXIN
      uni.vibrateShort({ success: () => {} })
      //#endif
      let index = e.target.current
      this.tabIndex = index
      if (this.isClickChange) {
        this.tabIndex = index
        this.isClickChange = false
        return
      }
      let tabBar = await this.getElSize('tab-bar')
      let tabBarScrollLeft = tabBar.scrollLeft

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
      this.tabIndex = index
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
      if (this.tabIndex === e.currentTarget.dataset.current) {
        return false
      } else {
        let tabBar = await this.getElSize('tab-bar')
        let tabBarScrollLeft = tabBar.scrollLeft //点击的时候记录并设置scrollLeft
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
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: rgb(87, 80, 80);
  .searchFor {
    position: fixed;
    top: 106rpx;
    left: 30rpx;
    z-index: 99999;
    display: flex;
    align-items: center;
    font-size: 26rpx;
    text {
      font-size: 26rpx;
    }
  }
  .shopping {
    width: 100vw;
    height: 100vh;
    background: #fff;
  }

  .pipeiTab {
    box-shadow: 2rpx 3rpx 15rpx #666666;
    width: 300rpx;
    background: #fff;
    border-radius: 50rpx;
    margin: 0 auto;
    height: 65rpx;
    line-height: 65rpx;
    border: none !important;
  }
  .tabitem {
    width: 150rpx;
    height: 65rpx;
    line-height: 65rpx;
    color: #7a7997;
    display: inline-block;
    font-size: 28rpx;
    border-radius: 40rpx;
    text-align: center;
  }
  .tabcor {
    color: #ffffff;
    background: linear-gradient(to right, #6665f6, #fa709a);
    font-weight: 500;
  }
  .allorders-content {
    width: 100%;
    height: 100vh;
    background: #eeeeee;
  }

  .allorders-title {
    text-align: center;
    position: absolute;
    top: 90rpx;
    left: 0;
    width: 100%;
    z-index: 10;
  }

  .allorders-content {
    width: 100%;
    height: 100vh;
    background: #eeeeee;
  }
}
</style>
