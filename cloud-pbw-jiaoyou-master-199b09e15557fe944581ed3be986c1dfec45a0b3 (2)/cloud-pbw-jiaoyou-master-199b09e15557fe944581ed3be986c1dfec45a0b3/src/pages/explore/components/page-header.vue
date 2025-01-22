<template>
  <view class="jw-page-header"   @click.stop="positionNew = false">
    <!-- 定位切换提示 -->
    <view class="setMapBg" v-if="positionNew" >
      <text>定位显示您在 - {{positionNew}} </text>
      <view @click.stop="positionNewBtn">切换到{{positionNew}}</view>
    </view>
    <view class="content row" :style="{
      				paddingRight: headerPaddingRight + 'px',
      				paddingTop: statusBarHeight + 'px',
      				height: navigationBarHeight + statusBarHeight + 'px',
              background: pageIndex == 1 ? '#fff' :''
      			}">
      <view class="citybtn center" v-if="position" @click="navTo('/pagesA/explore/search/search')">
        <view :class="pageIndex == 0 ? 'fff' : ''">▾{{position}}</view>
      </view>
      <view class="search-wrap center"   :style="{height: customHeight + 'px'}" @click="goto">
        <text class="jw-icon icon-sousuo"></text>
        <text>查找目的地/景点/美食</text>
      </view>
      <!-- #ifndef MP-WEIXIN -->
      <!-- <view class="btn center" @click="saoma">
      				<text class="jw-icon icon-saoma"></text>
      			</view> -->
      <view class="btn center" @click="navTo('/pagesA/notice/notice')">
        <text :class="pageIndex == 0 ? 'fff' : ''" class="jw-icon icon-xiaoxi"></text>
        <view class="msg"></view>
      </view>
      <!-- #endif -->
    </view>
    <!-- 占位栏 -->
    <view v-if="showFillView" :style="[{minHeight: navigationBarHeight+statusBarHeight+'px'}]"></view>
  </view>
</template>

<script>
export default {
  name: 'HomePageHeader',
  data () {
    return {
      position: '定位中',
      positionNew: '',
    };
  },
  props: {
    pageIndex:0,
    //顶部是否占位
    showFillView: {
      type: Boolean,
      default: true
    },
    positionCity: ''
  },
  watch: {
    positionCity (e) {
      this.position = e
    }
  },
  computed: {
    cityName () {
      return this.$store.state.location.city
    },
    statusBarHeight () {
      return this.systemInfo.statusBarHeight
    },
    navigationBarHeight () {
      return this.systemInfo.navigationBarHeight;
    },
    customWidth () {
      return this.systemInfo.custom.width;
    },
    customHeight () {
      return this.systemInfo.custom.height;
    },
    //小程序右侧需要留出气泡空间
    headerPaddingRight () {
      // #ifndef MP
      return 0;
      // #endif
      // #ifdef MP-WEIXIN
      return this.customWidth + 20;
      // #endif
    },
  },
  methods: {
    goto(){
      // #ifdef APP-PLUS || H5
      this.goUrl('https://m.ctrip.com/webapp/vacations/tour/destination?&allianceId=3213881&sid=6937954&ouid=H5B2Bonline&sourceid=2055&Popup=close&openapp=3')
      // #endif
      // #ifdef MP-WEIXIN
      this.navTo('/pagesA/search/search')
      // #endif

    },
    getPositionNew () {
      console.log("22")
    },
    // 切换城市
    async positionNewBtn () {
      this.positionNew = ''
      let res = await this.$common.getMap()
      let location = {
        longitude: res.map.result.ad_info.location.lng, //经度
        latitude: res.map.result.ad_info.location.lat, //纬度
        province: res.map.result.ad_info.province,
        city: res.map.result.ad_info.city, //城市
        cityCode: res.map.result.ad_info.city_code,//城市id
        area: res.map.result.ad_info.district, //城市名称
        areaCode: res.map.result.ad_info.adcode, //城市code
        address: res.map.result.ad_info.address //地址
      }

      this.position = res.map.result.address_component.city
      uni.setStorageSync('userMap', location);
      this.$store.commit('setStateAttr', {
        key: 'location',
        val: location
      })
      this.$emit('positionNew','')
    },
    // 获取定位
    async getMap () {
      // 检测定位
      let userMap = uni.getStorageSync('userMap')
      if (userMap) {
        this.position = userMap.city //定位
        let res = await this.$common.getMap()
        console.log(res, 423)
        if (userMap.city != res.map.result.address_component.city) {
          this.positionNew = res.map.result.address_component.city
        } else {
          let location = {
            longitude: res.map.result.ad_info.location.lng, //经度
            latitude: res.map.result.ad_info.location.lat, //纬度
            province: res.map.result.ad_info.province,
            city: res.map.result.ad_info.city, //城市
            cityCode: res.map.result.ad_info.city_code,//城市id
            area: res.map.result.ad_info.district, //城市名称
            areaCode: res.map.result.ad_info.adcode, //城市code
            address: res.map.result.ad_info.address //地址
          }

          this.positionNew = ''
          uni.setStorageSync('userMap', location);
          this.$store.commit('setStateAttr', {
            key: 'location',
            val: location
          })
        }
      } else {
        let res = await this.$common.getMap()
        let location = {
          longitude: res.map.result.ad_info.location.lng, //经度
          latitude: res.map.result.ad_info.location.lat, //纬度
          province: res.map.result.ad_info.province,
          city: res.map.result.ad_info.city, //城市
          cityCode: res.map.result.ad_info.city_code,//城市id
          area: res.map.result.ad_info.district, //城市名称
          areaCode: res.map.result.ad_info.adcode, //城市code
          address: res.map.result.ad_info.address //地址
        }
        this.position = res.map.result.ad_info.city
        uni.setStorageSync('userMap', location);
        this.$store.commit('setStateAttr', {
          key: 'location',
          val: location
        });
      }
      this.$emit('positionNew')
    },

    saoma () {
      uni.showToast({
        title: '您未在旅游区',
        duration: 2000,
        icon: 'none'
      });
    }
  },
  mounted () {
    this.getMap()
  }
}
</script>

<style scoped lang="scss">
.jw-page-header{
  position: absolute;
  top:0;
}
.setMapBg {
  position: fixed;
  top: 150rpx;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  left: 50%;
  margin-left: -45%;
  z-index: 9999999;
  padding: 10rpx 20rpx;
  border-radius: 10rpx;
  font-size: 24rpx;

  view {
    background: #0063f8;
    color: #fff;
    width: auto;
    padding: 10rpx 20rpx;
    font-size: 22rpx;
    border-radius: 10rpx;
  }
}
.row {
  /* #ifndef APP-PLUS-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  align-items: center;
}
.content {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99999;
  width: 100%;
}
.citybtn {
  font-weight: bold;
  max-width: 200rpx;
  min-width: 80rpx;
  height: 50rpx;
  padding: 10rpx 20rpx;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /*autoprefixer: on */
}
.btn {
  width: 44px;
  height: 40px;
  padding: 5px 12px;
  position: relative;
  .jw-icon {
    font-size: 20px;
    color: #333;
  }
  .msg {
    position: absolute;
    right: 7px;
    top: 5px;
    width: 12px;
    height: 12px;
    background-color: $cor;
    border: 2px solid #fff;
    border-radius: 100px;
    opacity: 0;
    &.show {
      opacity: 1;
    }
  }
}
.search-wrap {
  flex: 1;
  font-size: 14px;
  color: #999;
  border-radius: 100px;
  background-color: #f2f2f2;
  .icon-sousuo {
    margin-right: 6px;
    font-size: 18px;
    color: #999;
  }
}
</style>
