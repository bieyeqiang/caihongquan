<template>
  <view class="travelBg">
    <view class="top-bg"></view>
    <!-- 今日上新 -->
    <view class="card now-new">
      <view class="head u-flex">
        <view class="title">推荐景点</view>
        <view class="sub">旅行就要一起景点拼游</view>
      </view>
      <!-- 商品盒子 -->
      <view class="listBg">
        <mescroll-uni top="150" @down="downCallback" :up="upOption" @up="upCallback" @emptyclick="emptyClick" @init="mescrollInit">
          <view class="goods-box u-flex" v-for="(item, index) of travelData" :key="index" v-if="item.photos[0]" @click="navTo('/pagesA/explore/travelDetail?type=travel&keywords=5A景区&id=' + item.id)">
            <image class="goods-img" :border-radius="12" height="200" img-mode="scaleToFill" :image="item.photos[0].url" loading-img="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/lazy/goods-lazy-load.png"></image>
            <view class="content u-flex-col">
              <view class="title u-line-1">{{ item.name }}</view>
              <view class="subtitle">距离{{item.distance  | distance}} </view>
              <view class="labelbox">
                <text>拼单中</text>
              </view>
              <view class="price u-flex">
                <text v-if="item.biz_ext.rating.length>0">评分</text>
                <text class="priceMin" v-if="item.biz_ext.rating.length>0">{{item.biz_ext.rating}}</text>
                <text class="spec" v-if="item.biz_ext.cost.length>0">（门票{{item.biz_ext.cost}}元）</text>
                <text class="spec" v-if="item.biz_ext.cost.length==0">免门票</text>
                <!-- <text class="marketPrice"  >￥33</text> -->
                <view class="go-to-detail">去拼游</view>
              </view>
            </view>
          </view>
        </mescroll-uni>
      </view>
    </view>
  </view>
</template>

<script>
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
export default {
  components: {
    MescrollUni,
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
      travelData: [],
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
      },
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
      //console.log(mescroll, "11111111")
      let res = await this.$request('poi', 'getPoi', {
        offset: mescroll.size,
        page: (mescroll.num - 1) * mescroll.size,
        latitude: this.$store.state.location.latitude,
        longitude: this.$store.state.location.longitude,
        keywords: this.$store.state.poiTravel,
        sortrule: 'weight',
        radius: 50000,
      });
      if (res) {
        if (mescroll.num == 1) this.travelData = []; //第一页清空
        this.travelData = this.travelData.concat(res.pois);//追加新数据
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
    swiperChange (e) {
      this.swiperCurrent = e.detail.current
    },
    goToDetail (gid) {
      uni.navigateTo({
        url: '../../shop/goods/detail/detail?gid=' + gid
      })
    },
  },
  onPageScroll (e) {
    if (e.scrollTop > this.navBar.height) {
      this.navBar.top_bgc.background = '#EECB76'
      this.navBar.title = '每日上新'
    } else {
      this.navBar.top_bgc.background = 'transparent'
      this.navBar.title = ''
    }
  },
}
</script>

<style lang="scss">
page {
  background-color: #f7f7f7;
}
.travelBg {
  width: 100%;
  height: 100vh;
  position: fixed;
}
.listBg {
  background: #fff;
  width: 100%;
  height: 90vh;
  .goods-box {
    margin: 0 20rpx;
  }
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
  margin: 20rpx;
  border-radius: 12rpx;
  background-color: #fff;
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
    padding: 20rpx;
    font-size: 28rpx;
    .goods-img {
      width: 200rpx;
      height: 200rpx;
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
.now-new {
  .goods-box {
    .title {
      width: 440rpx;
      font-size: 30rpx;
      color: #333;
      line-height: 42rpx;
    }
    .subtitle {
      align-self: baseline;
      padding: 2rpx 16rpx;
      border-radius: 4rpx;
      color: #9f8052;
      background-color: #fdf6e2;
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
  }
  .goods-box-row {
    padding: 40rpx 20rpx;
    font-size: 28rpx;
    justify-content: space-between;
    flex-wrap: wrap;
    border-radius: 0 0 12rpx 12rpx;
    background-color: rgb(248, 227, 173);
    .content {
      position: relative;
      width: 210rpx;
      padding-bottom: 10rpx;
      margin-bottom: 20rpx;
      border-radius: 12rpx;
      text-align: center;
      background-image: linear-gradient(rgb(255, 241, 204), rgb(255, 244, 228));
      .goods-img {
        width: 210rpx;
        height: 210rpx;
      }
      .title {
        font-size: 26rpx;
        padding: 0 10rpx;
        margin-top: 30rpx;
      }
      .subtitle {
        position: absolute;
        top: 210rpx;
        left: 50%;
        transform: translate(-50%, -50%);
        white-space: nowrap;
        padding: 2rpx 12rpx;
        font-size: 24rpx;
        border-radius: 32rpx;
        background-color: #ffd974;
      }
      .price {
        margin-top: 10rpx;
        color: rgb(227, 13, 13);
        font-size: 24rpx;
        height: 40rpx;
        .priceMin {
          font-size: 28rpx;
          margin-right: 4rpx;
          font-weight: bold;
        }
        .spec {
          font-size: 24rpx;
        }
      }
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
