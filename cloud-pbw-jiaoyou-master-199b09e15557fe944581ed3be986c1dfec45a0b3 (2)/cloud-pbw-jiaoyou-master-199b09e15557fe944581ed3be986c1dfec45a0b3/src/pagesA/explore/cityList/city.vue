<template>
  <view class="triveWrapper">
    <view class="banner">
      <view class="right">
        <view>收藏</view>
        <view>分享</view>
      </view>
      <view class="address">{{cityData.cityName}}</view>
      <view class="img">1/1</view>
    </view>
    <view class="info">
      <view class="txt">
        {{cityData.cityName}}是一个热门旅游城市，夜幕低垂,{{cityData.cityName}}的夜景同样美的动人心弦。像是魔法一般,整座城市都亮起来了，分不清哪是市区，哪是郊区;
      </view>
      <view class="icon">></view>
    </view>
    <scroll-view class="scrollMatter" scroll-x="true">
      <view class="item">
        <view class="title">
          <view>最佳季节</view>
          <view>></view>
        </view>
        <view class="desc">温带季风气候，全年出行皆宜。</view>
      </view>
      <view class="item">
        <view class="title">
          <view>建议游玩</view>
          <view>></view>
        </view>
        <view class="desc">1-2小时</view>
      </view>
      <view class="item">
        <view class="title">
          <view>语言</view>
          <view>></view>
        </view>
        <view class="desc">普通话</view>
      </view>
    </scroll-view>
    <view class="address">
      <view>{{cityData.cityName}}</view>
      <view class="dh">导航</view>
    </view>
    <view class="nearbyScenic" v-if="foodData">
      <view class="title">附近美食</view>
      <scroll-view class="scrollImg" scroll-x>
        <view class="item" v-for="(item,index) of foodData.pois" :key="index" v-if="item.photos.length>0" @click="navTo('/pagesA/explore/travelDetail?type=travel&keywords=5A景区&id=' + item.id)">
          <image v-if="item.photos.length>0" :src="item.photos[0].url" />
          <view class="headName">{{item.name}}</view>
          <view class="desc">{{item.distance}}m</view>
          <view class="desc" v-if="item.biz_ext.cost.length>0">人均{{item.biz_ext.cost}}元</view>
        </view>
      </scroll-view>
    </view>
    <view class="nearbyScenic" v-if="hotelData">
      <view class="title">附近酒店</view>
      <scroll-view class="scrollImg" scroll-x>
        <view class="item" v-for="(item,index) of hotelData.pois" :key="index" v-if="item.photos.length>0" @click="navTo('/pagesA/explore/travelDetail?type=travel&keywords=5A景区&id=' + item.id)">
          <image v-if="item.photos.length>0" :src="item.photos[0].url" />
          <view class="headName">{{item.name}}</view>
          <view class="desc">{{item.distance}}m</view>
          <view class="desc" v-if="item.biz_ext.cost.length>0">人均{{item.biz_ext.cost}}元</view>
        </view>
      </scroll-view>
    </view>
    <view class="list" v-if="travelData">
      <view class="tabHead">
        <view :class="[tabIndex === 0 ? 'actived' : '']" @click="tabIndex = 0">综合推荐景点</view>
        <!-- <view :class="[tabIndex === 1 ? 'actived' : '']" @click="tabIndex = 1">距离最近</view>
          <view :class="[tabIndex === 2 ? 'actived' : '']" @click="tabIndex = 2">自驾攻略</view> -->
      </view>
      <view class="tabBody">
        <view class="listItem" v-for="(item,index) of travelData.pois" :key="index" v-if="item.photos.length>0" @click="navTo('/pagesA/explore/travelDetail?type=travel&keywords=5A景区&id=' + item.id)">
          <image v-if="item.photos.length>0" :src="item.photos[0].url" />
          <view class="name">{{item.name}}</view>
          <view class="itemInfo">
            <view class="distance">距离{{item.distance}}m</view>
            <view class="score" v-if="item.biz_ext.rating.length>0">{{item.biz_ext.rating}}分</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      tabIndex: 0,
      option: '',
      cityData: '',
      travelData: '',
      foodData: '',
      hotelData: ''
    }
  },
  onLoad (option) {
    this.option = option
    // 获取城市详情
    this.getCityDetail()
  },
  onShow () {
    // 获取城市详情
    this.getCityDetail()
  },
  methods: {
    // 获取城市详情
    async getCityDetail () {
      if (this.option.type == 'search') {
        // 获取搜索城市
      } else {
        // 获取本地定位城市信息
        this.cityData = this.$store.state.location
        // 获取景点
        this.travelData = await this.$request('poi', 'getPoi', {
          keywords: this.$store.state.poiTravel,
          latitude: this.$store.state.location.latitude,
          longitude: this.$store.state.location.longitude,
          radius: 50000,
          sortrule: 'weight',
          offset: 25,
          page: 1,
          city: this.$store.state.location.cityName,
        })
        this.foodData = await this.$request('poi', 'getPoi', {
          keywords: this.$store.state.poiFood,
          latitude: this.$store.state.location.latitude,
          longitude: this.$store.state.location.longitude,
          radius: 50000,
          offset: 25,
          page: 1,
          city: this.$store.state.location.cityName,
        })
        this.hotelData = await this.$request('poi', 'getPoi', {
          keywords: this.$store.state.poiHotel,
          latitude: this.$store.state.location.latitude,
          longitude: this.$store.state.location.longitude,
          radius: 50000,
          offset: 25,
          page: 1,
          city: this.$store.state.location.cityName,
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.triveWrapper {
  .banner {
    position: relative;
    width: 100%;
    height: 480rpx;
    background-image: url(https://img95.699pic.com/photo/50133/7826.jpg_wh860.jpg);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    .right {
      position: absolute;
      top: 30rpx;
      right: 20rpx;
      font-size: 40rpx;
      display: flex;
      justify-content: flex-start;
      font-size: 25rpx;
      view {
        margin-left: 10rpx;
        color: #fff;
      }
    }
    .address {
      position: absolute;
      left: 20rpx;
      bottom: 80rpx;
      font-size: 44rpx;
      color: #fff;
    }
    .image {
      position: absolute;
      right: 20rpx;
      bottom: 40rpx;
      color: #fff;
      background: rgba(0, 0, 0, 0.5);
      padding: 10rpx;
      border-radius: 30rpx;
    }
  }
  .info {
    padding: 20rpx 30rpx;
    background: #fff;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .txt {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      flex: 1;
    }
  }
  .scrollMatter {
    width: 100%;
    white-space: nowrap;
    padding: 0 30rpx;
    .item {
      background: #f4efef;
      border-radius: 10rpx;
      margin-right: 20rpx;
      width: 44%;
      padding: 20rpx 30rpx;
      display: inline-block;
      vertical-align: top;
      height: 160rpx;
      .title {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-weight: bold;
        > view:first-child {
          margin-right: 20rpx;
        }
      }
      .desc {
        white-space: normal;
      }
    }
  }
  .address {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx 30rpx;
    font-weight: bold;
    border-top: 1rpx solid #f5f5f5;
    border-bottom: 1rpx solid #f5f5f5;
    margin: 20rpx 0;
    .dh {
      border: 1px solid #000;
      border-radius: 60rpx;
      padding: 6rpx 30rpx;
    }
  }
  .nearbyScenic {
    margin-top: 20rpx;
    padding: 0 30rpx;
    .title {
      background: #eeb359;
      padding: 4rpx 20rpx;
      border-radius: 30rpx;
      display: inline-block;
      margin-bottom: 30rpx;
    }
    .scrollImg {
      width: 100%;
      white-space: nowrap;
      .item {
        width: 264rpx;
        display: inline-block;
        margin-right: 30rpx;
        image {
          width: 264rpx;
          height: 192rpx;
          border-radius: 10rpx;
        }
        .headName {
          font-size: 30rpx;
          margin-bottom: 10rpx;
          overflow: hidden;
          width: 264rpx;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          /*! autoprefixer: off */
          -webkit-box-orient: vertical;
          /*autoprefixer: on */
        }
        .desc {
          color: #9d9db3;
          font-size: 24rpx;
          border: 1px solid #9d9db3;
          padding: 0 6rpx;
          display: inline-block;
          margin-right: 15rpx;
          border-radius: 7rpx;
        }
      }
    }
  }
  .list {
    margin-top: 40rpx;
    padding: 0 10rpx;
    .tabHead {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 30rpx;
      color: #ccc;
      padding-left: 20rpx;
      margin-bottom: 30rpx;
      > view {
        margin-right: 30rpx;
        padding-bottom: 20rpx;
        position: relative;
        &::after {
          content: '';
          width: 100%;
          height: 2rpx;
          position: absolute;
          bottom: 0;
          left: 0;
        }
      }
      .actived {
        color: #666;
        &::after {
          content: '';
          width: 100%;
          height: 4rpx;
          background: cornflowerblue;
        }
      }
    }
    .tabBody {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .listItem {
        width: 50%;
        padding: 0 20rpx 20rpx 20rpx;
        image {
          width: 100%;
          height: 300rpx;
          border-radius: 20rpx;
        }
        .name {
          font-size: 32rpx;
          margin-bottom: 10rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          /*! autoprefixer: off */
          -webkit-box-orient: vertical;
          /*autoprefixer: on */
        }
        .itemInfo {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 28rpx;
          .distance {
            color: #ccc;
          }
          .score {
            color: darkgoldenrod;
          }
        }
      }
    }
  }
}
</style>
