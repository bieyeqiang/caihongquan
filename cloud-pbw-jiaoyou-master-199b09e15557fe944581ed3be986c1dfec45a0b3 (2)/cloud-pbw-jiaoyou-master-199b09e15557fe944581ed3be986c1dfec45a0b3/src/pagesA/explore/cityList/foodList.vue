<template>
  <view>
    <view class="top-bg"></view>
    <!-- 广告banner -->
    <!-- <view class="ad-banner">
      <image src="https://img.youpin.mi-img.com/jianyu/fe93294806c66ab3d29d06943afb82b7.png" mode="aspectFill"></image>
    </view> -->
    <!-- 15日新品榜 -->
    <view class="card">
      <view class="head u-flex">
        <view class="title">附近推荐美食</view>
        <view class="sub">美食品质推荐</view>
      </view>
      <!-- 商品盒子 -->
      <mescroll-uni top="150" @down="downCallback" :up="upOption" @up="upCallback" @emptyclick="emptyClick" @init="mescrollInit">
        <view class="goods-box u-flex" v-for="(item, index) of hotelData" :key="index" @click="navTo('/pagesA/explore/travelDetail?type=travel&keywords=5A景区&id=' + item.id)" v-if="item.photos[0]">
          <!-- <u-lazy-load class="goods-img" mode="scaleToFill" height="75rpx" :border-radius="12" :image="item.photos[0].url" loading-img="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/lazy/goods-lazy-load.png"></u-lazy-load> -->
          <image class="goods-img" :src="item.photos[0].url" mode="" />
          <view class="content u-flex-col">
            <view class="title u-line-1">{{item.name}}</view>
            <view class="subtitle">距离{{item.distance  | distance}} </view>
            <view class="labelbox">
              <text>拼游中</text>
            </view>
            <view class="price u-flex" v-if="item.biz_ext && item.biz_ext.lowest_price">
              <text>￥</text>
              <text class="priceMin">{{item.biz_ext.lowest_price}}</text>
              <text class="spec">起</text>
              <!-- <text class="marketPrice"  >￥32</text> -->
            </view>
          </view>
          <image :src="`https://img.youpin.mi-img.com/static/weex_images/v1/LeaderboardNO${index+1}.png`" class="ranking"></image>
        </view>
      </mescroll-uni>
    </view>
  </view>
</template>

<script>
import fullLoading from '@/components/full-loading.vue'
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
export default {
  components: {
    fullLoading,
    MescrollUni
  },
  data () {
    return {
      navBar: {
        top_bgc: {
          background: 'transparent'
        },
        border: false,
        title: '',
        height: 0,
        iconColor: '#fff'
      },
      swiperList: [],
      swiperCurrent: 0,
      nowNew: {},
      new15: {},
      fullLoading: true,
      hotelData: '',
      mescroll: null,
      upOption: {
        auto: false, // 不自动加载
        page: {
          num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
          size: 25 // 每页数据的数量
        },
        noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
        empty: {
          tip: '~ 空空如也 ~', // 提示
          btnText: '去看看'
        },
      }
    }
  },
  onLoad () {
    this.$nextTick(() => {
      this.mescroll.triggerDownScroll();
    })
  },
  onShow () {

  },
  methods: {
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit (mescroll) {
      this.mescroll = mescroll;
    },
    /*下拉刷新的回调 */
    downCallback (mescroll) {
      // 这里加载你想下拉刷新的数据, 比如刷新轮播数据
      // 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
      mescroll.resetUpScroll()
    },
    /*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
    async upCallback (mescroll) {
      let res = await this.$request('poi', 'getPoi', {
        offset: mescroll.size,
        page: (mescroll.num - 1) * mescroll.size,
        latitude: this.$store.state.location.latitude,
        longitude: this.$store.state.location.longitude,
        keywords: this.$store.state.poiFood,
        radius: 500000,
      });
      if (res) {
        if (mescroll.num == 1) this.hotelData = []; //第一页清空
        this.hotelData = this.hotelData.concat(res.pois);//追加新数据
        mescroll.endSuccess(res.pois.length); //结束加载状态
      } else {
        mescroll.endErr();//失败因此
      }
    },
    //点击空布局按钮的回调
    emptyClick () {
      uni.showToast({
        title: '点击了按钮,具体逻辑自行实现'
      })
    },
  },
}
</script>

<style lang="scss">
page {
  background-color: #f7f7f7;
}
.nav-title {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 750rpx;
  text-align: center;
  color: #fff;
  font-size: 32rpx;
  letter-spacing: 2rpx;
  font-weight: bold;
}
.top-bg {
  position: absolute;
  top: 0;
  width: 750rpx;
  height: 750rpx;
  background: url('https://vkceyugu.cdn.bspapp.com/VKCEYUGU-weitao/32500f00-abd6-11ea-b244-a9f5e5565f30.png')
    no-repeat center / 100% 100%;
  z-index: -1;
}
.top {
  align-items: center;
  margin-bottom: 100rpx;
  .title-img {
    width: 238rpx;
    height: 46rpx;
  }
  .swiper {
    margin-top: 30rpx;
    height: 426rpx; // padding-top: 20rpx;
    width: 750rpx;
    border-radius: 12rpx;
    .swiper-item {
      height: 426rpx;
      position: relative;
      left: 40rpx;
      padding: 20rpx 16rpx 0;
      border-radius: 12rpx; // height: 406rpx;
      width: 640rpx !important;
      .img {
        display: block;
        height: 406rpx;
        width: 640rpx;
        border-radius: 12rpx; // overflow: hidden;
      }
      .title {
        position: absolute;
        bottom: 20rpx;
        left: 16rpx;
        align-items: center;
        justify-content: center;
        width: 640rpx;
        height: 120rpx;
        color: #fff;
        font-size: 32rpx;
        background: url('https://vkceyugu.cdn.bspapp.com/VKCEYUGU-weitao/08e8b7e0-abde-11ea-a30b-e311646dfaf2.png')
          no-repeat center / 100% 100%;
        .sub {
          margin-top: 10rpx;
          font-size: 26rpx;
          image {
            margin-left: 6rpx;
            width: 76rpx;
            height: 38rpx;
          }
        }
      }
      .tips {
        position: absolute;
        top: 0;
        left: 16rpx;
        height: 226rpx;
        width: 226rpx;
        font-size: 40rpx;
        color: #fff;
        image {
          position: absolute;
          top: 0;
          left: 0;
          width: 226rpx;
          height: 226rpx;
          z-index: 1;
        }
        .date {
          margin-top: 64rpx;
          text-align: center;
          position: relative;
          z-index: 20;
          .sign {
            font-size: 24rpx;
          }
        }
      }
    }
  }
  .dots-box {
    margin-top: 40rpx;
    .item {
      background-color: rgba(255, 255, 255, 1);
      height: 6rpx;
      width: 20rpx;
      border-radius: 6rpx;
      margin: 0 6rpx;
    }
    .active {
      background-color: #f1b75a;
      width: 42rpx;
    }
  }
}
.card {
  width: 710rpx;
  height: 100vh;
  margin: 20rpx;
  border-radius: 12rpx;
  background-color: #fff;
  position: fixed;
  .head {
    height: 108rpx;
    padding: 0 20rpx;
    background-size: 100% 100%;
    .title {
      font-size: 36rpx;
      font-weight: bold;
      color: #333;
    }
    .sub {
      font-size: 24rpx;
      color: #666;
      margin-left: 16rpx;
    }
    .more {
      margin-left: auto;
      font-size: 24rpx;
    }
  }
  .goods-box {
    position: relative;
    font-size: 28rpx;
    margin: 20rpx;
    padding: 0 20rpx;
    .goods-img {
      width: 200rpx;
      height: 200rpx;
      border-radius: 10rpx;
      .u-wrap {
        background-color: rgba(0, 0, 0, 0.02) !important;
      }
    }
    .content {
      height: 200rpx;
      padding: 4rpx 0 2rpx 16rpx;
    }
    .title {
      width: 440rpx;
      font-size: 30rpx;
      color: #333;
      line-height: 42rpx;
    }
    .subtitle {
      font-size: 24rpx;
      color: rgb(153, 153, 153);
      margin-top: 8rpx;
      line-height: 36rpx;
    }
    .selling-point {
      text {
        display: inline-block;
        margin-right: 8rpx;
        padding: 0 12rpx;
        font-size: 22rpx;
        color: #999;
        border-radius: 36rpx;
        background-color: rgb(248, 248, 248);
      }
    }
    .price {
      margin-top: auto;
      color: rgb(227, 13, 13);
      font-size: 26rpx;
      height: 40rpx;
      .priceMin {
        font-size: 34rpx;
        margin-right: 4rpx;
        font-weight: bold;
      }
      .marketPrice {
        margin-left: 6rpx;
        font-size: 24rpx;
        color: #999;
        text-decoration: line-through;
      }
      .spec {
        font-size: 24rpx;
      }
      .go-to-detail {
        margin-left: auto;
        color: #fff;
        border-radius: 8rpx;
        padding-left: 16rpx;
        padding-right: 16rpx;
        height: 46rpx;
        line-height: 46rpx;
        background-image: linear-gradient(
          to right,
          rgb(240, 206, 123),
          rgb(221, 177, 81)
        );
      }
    }
    .labelbox {
      margin-top: 12rpx;
      text {
        display: inline-block;
        margin-right: 10rpx;
        padding: 0 10rpx;
        height: 32rpx;
        border-radius: 4rpx;
        text-align: center;
        color: #ffffff;
        background-color: #d96b6c;
        line-height: 32rpx;
        font-size: 24rpx;
      }
    }
    .ranking {
      position: absolute;
      left: 20rpx;
      top: 20rpx;
      width: 44rpx;
      height: 48rpx;
    }
  }
}

.ad-banner {
  margin: 30rpx 0;
  padding: 0 20rpx;
  image {
    width: 710rpx;
    height: 280rpx;
    border-radius: 12rpx;
  }
}
.full-loading {
  position: fixed;
  bottom: 0;
  width: 750rpx;
  height: 40vh;
  background-color: #ffffff;
}
</style>
