<template>
  <view class="page">
    <jw-loading v-if="!detailData" :type="2"></jw-loading>
    <view v-if="detailData">
      <!-- 轮播图 -->
      <view class="swiperBox">
        <swiper :autoplay="swiperAutoPlay" circular :interval="3000" :duration="200" @change="swiperChange" :current="swiperCurrent">
          <swiper-item v-for="(item, index) in detailData.photos" :key="index">
            <image :src="item.url" mode="scaleToFill"></image>
          </swiper-item>
        </swiper>
        <!-- 轮播图指示器 -->
        <view class="count">
          <span>{{ swiperCurrent + 1 }}</span>
          <span>/</span>
          <span>{{ detailData.photos.length }}</span>
        </view>
      </view>
      <!-- 描述信息 -->
      <view class="shop card">
        <view class="info u-flex">
          <view class="name u-flex-col">
            <text class="main">{{ detailData.name }}</text>
            <text class="sub" v-if="detailData.alias && detailData.alias.length>0">又名-{{ detailData.alias }}</text>
          </view>
          <!-- <view class="go-to-shop u-flex">
                        <text>进入店铺</text>
                        <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/icon/arrow_right_brown.png"></image>
                      </view> -->
        </view>
        <!-- 景点 -->
        <view class="grade u-flex" v-if=" detailData && option.type == 'travel'">
          <view class="item" v-if="detailData.biz_ext && detailData.biz_ext.rating && detailData.biz_ext.rating.length>0">
            <text>评分</text>
            <text class="score" style="color:#9f8052">{{detailData.biz_ext.rating}}分</text>
            <text class="level" style="background-color:#cf9e56;color:#fff">评</text>
          </view>
          <view class="item" v-if="detailData.biz_ext && detailData.biz_ext.cost &&detailData.biz_ext.cost.length>0">
            <text>票价</text>
            <text class="score" style="color:#9f8052">{{detailData.biz_ext.cost}}</text>
            <text class="level" style="background-color:#cf9e56;color:#fff">票</text>
          </view>
          <view class="item" v-if="detailData.biz_ext && detailData.biz_ext.level && detailData.biz_ext.level.length>0">
            <text>评级</text>
            <!-- <text class="score" style="color:#9f8052">{{detailData.comment_num}}人</text> -->
            <text class="score" style="color:#9f8052">{{detailData.biz_ext.level}}</text>
            <text class="level" style="background-color:#cf9e56;color:#fff">级</text>
          </view>
        </view>
        <!-- 美食 -->
        <view class="grade u-flex" v-if="detailData && option.type == 'food'">
          <view class="item" v-if="detailData.biz_ext && detailData.biz_ext.rating &&detailData.biz_ext.rating.length>0">
            <text>评分</text>
            <text class="score" style="color:#9f8052">{{detailData.biz_ext.rating}}分</text>
            <text class="level" style="background-color:#cf9e56;color:#fff">评</text>
          </view>
          <view class="item" v-if="detailData.biz_ext && detailData.biz_ext.cost &&detailData.biz_ext.cost.length>0">
            <text>人均</text>
            <text class="score" style="color:#9f8052">{{detailData.biz_ext.cost}}</text>
            <text class="level" style="background-color:#cf9e56;color:#fff">价</text>
          </view>
        </view>
        <!-- 酒店 -->
        <view class="grade u-flex" v-if="option.type == 'hotel'">
          <view class="item" v-if="detailData.biz_ext && detailData.biz_ext.rating && detailData.biz_ext.rating.length>0">
            <text>评分</text>
            <text class="score" style="color:#9f8052">{{detailData.biz_ext.rating}}分</text>
            <text class="level" style="background-color:#cf9e56;color:#fff">评</text>
          </view>
          <view class="item" v-if="detailData.biz_ext && detailData.biz_ext.lowest_price && detailData.biz_ext.lowest_price.length>0">
            <text>房价</text>
            <text class="score" style="color:#9f8052">{{detailData.biz_ext.lowest_price}}</text>
            <text class="level" style="background-color:#cf9e56;color:#fff">价</text>
          </view>
        </view>
      </view>
      <u-gap height="16" bg-color="#f9f9f9"></u-gap>
      <!-- 排行榜 -->
      <view class="rank u-flex">
        <text>{{detailData.cityname}}{{detailData.pname}}{{detailData.address}}</text>
        <u-icon name="arrow-right" color="#C5C5C5"></u-icon>
        <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/explore/mapLog.png"></image>
      </view>
      <u-gap height="16" bg-color="#f9f9f9"></u-gap>
      <!-- 拼单 -->
      <view class="swiper-goods" v-if="option.type != 'hotel'">
        <view class="head u-flex-col">
          <view class="title">一起拼单</view>
          <view class="underline"></view>
        </view>
      </view>
      <swiper class="banner" v-if="spellData.length>0 && option.type != 'hotel'" :indicator-dots="false" :autoplay="false" :duration="200" @change="swiperChange" circular>
        <swiper-item class="swiper-wrap" v-for="(item,index) of spellData" :key="index" @click="navTo('/pagesA/explore/spellDetail?id=' + item._id + '&poi=' + option.id)">
          <view class="u-list-image-wrap">
            <image class="mask" mode="aspectFill" :src="item.dynamicImg[0] ||  item.userInfo.avatar"></image>
            <view class="title">
              <view class="main">#{{item.dynamicLabel || '一起拼'}}</view>
              <view class="sub">{{item.dynamicContext}}</view>
            </view>
            <view class="recommend-img">{{item.userInfo.nickname}}</view>
            <view class="goods-box u-flex">
              <image :src="item.userInfo.avatar" @click="navTo('/pagesA/explore/spellDetail?id=' + item._id + '&poi=' + option.id)"></image>
            </view>
          </view>
        </swiper-item>
      </swiper>
      <view class="notList" v-else>
        <view>暂无拼单</view>
        <view>赶紧来发布吧，我们一起拼单~</view>
      </view>
      <u-gap height="16" bg-color="#f9f9f9"></u-gap>
      <!-- 用户评价 -->
      <view class="comment card">
        <view class="head">
          <view class="title">来过此处(1239)</view>
          <view class="more" @click="goToMoreComment('__all__')">
            <text>98%喜欢</text>
            <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/icon/arrow_right.png"></image>
          </view>
        </view>
        <view class="tags">
          <text class="item" @click="goToMoreComment(item.id)">很值得(13)</text>
          <text class="item" @click="goToMoreComment(item.id)">风景不错(13)</text>
        </view>
        <scroll-view scroll-x :show-scrollbar="false" enable-flex @scrolltolower="goToMoreComment('__all__')" :lower-threshold="0">
          <view class="scoll-wrapper">
            <view class="item">
              <view class="user">
                <image src="https://m.xiaomiyoupin.com/youpin/static/m/res/images/ucenter/ucenter_icon_userhead.png" mode="aspectFill"></image>
                <text class="name">张东方</text>
                <u-rate :count="5" :current="5" disabled size="24" active-color="#f1c158"></u-rate>
              </view>
              <view class="content u-line-2">哈哈哈哈，很不错哦</view>
            </view>
            <view class="more" @click="navTo('pages/explore/comment')">
              <text>查看更多心声</text>
              <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/icon/arrow_right_circle.png" mode=""></image>
            </view>
            <view class="white"></view>
          </view>
        </scroll-view>
      </view>
      <u-gap height="16" bg-color="#f9f9f9"></u-gap>
      <!-- 底部图片分类 -->
      <u-tabs :list="infoTabList" name="title" :is-scroll="false" :current="introExtCurrent" @change="introExtChange" :bold="false" inactive-color="#999" active-color="#c7a26d" :font-size="26" :duration="0.2"></u-tabs>
      <!-- 详情图 -->
      <view class="detailImgs" v-if="introExtCurrent == 0">
        <!-- 景点 -->
        <view v-if="detailData && option.type == 'travel'">
          <view>{{detailData.name}} <text v-if="detailData.alias && detailData.alias.length>0">,又名{{detailData.alias}}</text></view>
          <br>
          <view v-if="detailData.biz_ext && detailData.biz_ext.open_time && detailData.biz_ext.open_time.length > 0">时间：{{detailData.biz_ext.open_time}}</view>
          <view v-if="detailData.biz_ext && detailData.biz_ext.opentime2 && detailData.biz_ext.opentime2.length > 0">季节：{{detailData.biz_ext.opentime2}}</view>
          <view v-if="detailData.biz_ext && detailData.biz_ext.cost && detailData.biz_ext.cost.length > 0">门票：{{detailData.biz_ext.cost}}元</view>
          <view v-if="detailData.biz_ext && detailData.biz_ext.rating && detailData.biz_ext.rating.length > 0">评分：{{detailData.biz_ext.rating}}</view>
          <view v-if="detailData.biz_ext && detailData.biz_ext.level && detailData.biz_ext.level.length > 0">评级：{{detailData.biz_ext.level}}</view>
          <view v-if="detailData.biz_ext && detailData.biz_ext.website && detailData.website.length > 0">网站：{{detailData.website}}</view>
          <view v-if="detailData.biz_ext && detailData.biz_ext.tel && detailData.tel.length > 0">电话：{{detailData.tel}}</view>
        </view>
        <!-- 美食 -->
        <!-- <view v-if="option.type == 'food'">
          <view>{{detailData.name}}</view>
          <view v-if="detailData.biz_ext.cost">人均：{{detailData.biz_ext.cost}}元</view>
          <br>
          <view v-if="detailData.tag">菜品：{{detailData.tag}}</view>
          <view>位置：{{detailData.cityname}}{{detailData.pname}}{{detailData.address}}</view>
        </view> -->
        <!-- 酒店 -->
        <view v-if="option.type == 'hotel'">
          <view>{{detailData.name}}</view>
          <view v-if="detailData.biz_ext  && detailData.biz_ext.lowest_price">房价：{{detailData.biz_ext.lowest_price}}元</view>
          <view>位置：{{detailData.cityname}}{{detailData.pname}}{{detailData.address}}</view>
        </view>
        <!-- 图片展示 -->
        <view class="detailImgList">
          <view v-for="(item,index) of detailData.photos" :key="index">
            <view v-if="item.title.length>0 && item.url.length>0">{{item.title}}</view>
            <image v-if="item.url" :src="item.url" mode="widthFix"></image>
          </view>
        </view>
      </view>
      <view class="detailImgs" v-if="introExtCurrent == 1">
        <view>门票：{{detailData.biz_ext.cost || 0}}元</view>
      </view>
      <view class="detailImgs" v-if="introExtCurrent == 2">
        <view>位置：{{detailData.cityname}}{{detailData.pname}}{{detailData.address}}</view>
      </view>
      <u-gap height="16" bg-color="#f9f9f9"></u-gap>
      <!-- 别处推荐 -->
      <view class="swiper-goods" v-if="ListData">
        <view class="head u-flex-col">
          <view class="title">其它地方推荐</view>
          <view class="underline"></view>
        </view>
        <swiper :indicator-dots="true" :autoplay="false" :interval="3000" :duration="200" indicator-active-color="#c7a26d" indicator-color="#eee" circular>
          <swiper-item>
            <view class="goods">
              <view class="item" v-for="(item, index) of ListData.pois" v-if="index<6" :key="index" @click="navTo('/pagesA/explore/travelDetail?type=' + option.type +'&keywords=' + option.keywords +'&id=' + item.id)">
                <image class="goods-img" :src="item.photos[0].url" lazy-load />
                <view class="labelbox">
                  <text>[火爆拼单]</text>
                </view>
                <view class="title u-line-2">{{item.name}}</view>
                <!-- <view class="price">
                              <text>火爆拼单</text>
                              <text class="priceMin">300</text>
                            </view> -->
              </view>
            </view>
          </swiper-item>
        </swiper>
      </view>
      <!-- 底部操作菜单 -->
      <view class="page-bottom" v-if="option.type != 'hotel'">
        <view @click="navTo('/pages/explore/explore',false,'switchTab')" class="p-b-btn">
          <text class="iconfont">&#xe68f;</text>
          <text>首页</text>
        </view>
        <view class="p-b-btn" @click="iconBtn(2)">
          <text class="iconfont">&#xe61d;</text>
          <text>收藏</text>
        </view>
        <!-- #ifdef APP-PLUS -->
        <view @click="shareShow = !shareShow" class="p-b-btn">
          <text class="iconfont">&#xe626;</text>
          <text>分享</text>
        </view>
        <!-- #endif -->
        <!-- #ifdef MP-WEIXIN -->
        <button class="p-b-btn" @onShareAppMessage="onShareAppMessage" open-type="share">
          <text class="iconfont">&#xe626;</text>分享
        </button>
        <!-- #endif -->
        <view class="action-btn-group">
          <button type="primary" class="action-btn no-border add-cart-btn" @click="add">
            发布拼单
          </button>
        </view>
      </view>
      <u-gap height="16" bg-color="#f9f9f9"></u-gap>
      <u-back-top :scroll-top="scrollTop" :top="1200" icon="https://m.xiaomiyoupin.com/youpin/static/m/res/images/icons/icon_totop_circle_black.png" :custom-style="{ backgroundColor: 'transparent' }"></u-back-top>
      <mi-toast ref="miToast" />
    </view>
  </view>
</template>

<script>
import fullLoading from '@/components/full-loading.vue'
export default {
  data () {
    return {
      detailData: '',
      swiperList: [{
        a: 1
      },
      {
        a: 1
      },
      {
        a: 1
      },
      ],
      infoTabList: [{
        name: '介绍'
      }, {
        name: '门票信息'
      }, {
        name: '交通信息'
      }],
      goodsId: 0,
      swiperCurrent: '',
      swiperVideo: {
        url: '',
        duration: {
          m: '00',
          s: '00'
        },
        playing: false,
        poster: ''
      },
      swiperImgs: [],
      swiperAutoPlay: true,
      showPoster: true,
      playBtnOp: 0,
      goodsInfo: {
        title: '',
        summary: '',
        price: '',
        market_price: '',
        label: '',
        services: [],
        brand: {},
        introExt: []
      },
      operation: {},
      comment: {},
      compose: {
        shopInfo: {
          dsrInfo: {
            delivery: {
              level: 'high'
            },
            product: {
              level: 'high'
            },
            merchant: {
              level: 'high'
            }
          }
        }
      },
      servicesDetail: {},
      servicePop: false,
      goodsPop: false,
      selectedInfo: {
        goodsCount: 1,
        specSelected: [],
        goodsInfo: {}
      },
      specList: [],
      specChildList: [],
      productInfo: [],
      propTags: [],
      introExtCurrent: 0,
      detailImgs: [],
      bg: {
        backgroundColor: 'transparent'
      },
      subMenu: false,
      fullLoading: true,
      time: 6 * 60 * 60,
      functionType: 'order',
      scrollTop: 0,
      option: '',
      list: [{
        name: '十年'
      }, {
        name: '青春'
      }, {
        name: '之约'
      }],
      // 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
      current: 0, // tabs组件的current值，表示当前活动的tab选项
      swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
      ListData: '',
      spellData: ''
    }
  },
  onLoad (option) {
    this.option = option
    this.getGoodsDetail()
    this.getList()
    // 景点
    if (option.type == 'travel') {
      this.infoTabList = [{
        name: '景点介绍'
      }, {
        name: '门票信息'
      }, {
        name: '交通信息'
      }]
    }
    // 美食
    if (option.type == 'food') {
      this.infoTabList = [{
        name: '美食介绍'
      }]
    }
    // 酒店
    if (option.type == 'hotel') {
      this.infoTabList = [{
        name: '酒店介绍'
      }]
    }
  },
  onShow () {

  },
  methods: {
     add(){
    this.navTo('/pagesA/explore/spellAdd?id=' + this.option.id)
    this.$request('poi', 'addPoiSql', {...this.detailData}).then((res) => {
        if (res) {

        }
      })
    },
    getList () {
      // 获取poi列表
      this.$request('poi', 'getPoi', {
        latitude: this.$store.state.location.latitude,
        longitude: this.$store.state.location.longitude,
        keywords: this.option.keywords,
        radius: 50000,
        offset: 20,
        page: 1
      }).then((res) => {
        if (res) {
          this.ListData = res
        }
      })

      // 获取拼单列表
      this.$request('nearby', 'nearbyList', {
        spellId: this.option.id,
        dynamicType: 2,
        spellType: 1,
        offset: 0,
        limit: 10,
      }).then((res) => {
        if (res) {
          this.spellData = res.data
        }
      })

    },
    // 获取商品详情
    async getGoodsDetail (id) {
      let resData = await this.$request('poi', 'getPoiDetail', {
        id: this.option.id
      })
      this.detailData = resData.pois[0]
    },
    // 查看更多评价
    goToMoreComment (id = '__all__') {
      uni.navigateTo({
        url: '/pages/explore/explore/comment?gid=' + this.goodsId + '&cid=' + id
      })
    },
    // 查看更多问答
    goToMoreQuestion () {
      uni.navigateTo({
        url: '/pages/explore/explore/question?gid=' + this.goodsId
      })
    },

    // 切换图片分类
    introExtChange (index) {
      this.introExtCurrent = index
    },
    // 轮播图切换
    swiperChange (e) {
      // const that = this
      this.swiperCurrent = e.detail.current
      if (this.swiperVideo.url !== '' && this.swiperVideo.playing == true) {
        if (e.detail.current != 0) {
          this.videoContext.pause()
        } else {
          this.videoContext.play()
        }
      }
    },
    back () {
      uni.navigateBack({
        delta: 1
      })
    },
    navigateTo (url, type) {
      if (type == 'tabbar') {
        uni.switchTab({
          url: url
        })
      } else if (type == 'page') {
        this.subMenu = false
        uni.navigateTo({
          url: url
        })
      }
    },
  },
  onpagesAroll (e) {
    this.scrollTop = e.scrollTop
  },
  computed: {

  },
  filters: {
    level (lv) {
      if (lv == 'high') {
        return '高'
      } else if (lv == 'middle') {
        return '平'
      } else {
        return '低'
      }
    },
    scoreColor (lv) {
      if (lv == 'high') {
        return '#9f8052'
      } else {
        return '#999'
      }
    },
    levelColor () {
      if (lv == 'high') {
        return '#fff'
      } else {
        return '#999'
      }
    },
    levelBgColor () {
      if (lv == 'high') {
        return '#cf9e56'
      } else {
        return '#ebebeb'
      }
    }
  },
  components: {
    fullLoading
  },

}
</script>

<style lang="scss" scoped>
.notList {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300rpx;
  flex-direction: column;
  align-content: center;
}
.detailImgList {
  padding: 20rpx;
  image {
    width: 750rpx;
    height: 500rpx;
    border-radius: 10rpx;
  }
}
$font-sm: 24rpx;
$font-color-base: #606266;
$font-color-light: #909399;
$font-base: 28rpx;
$font-lg: 32rpx;
page {
  background-color: #f9f9f9;
}
button::after {
  border: none;
}
button {
  background-color: transparent;
  padding-left: 0;
  padding-right: 0;
  line-height: 1.2;
}
.button-hover {
  background-color: transparent;
}
button {
  border-radius: 0;
}
button.empty::after {
  border: none;
}
.action-btn-group {
  display: flex;
  height: 76rpx;
  border-radius: 100px;
  box-shadow: 0 20rpx 40rpx -16rpx #fa436a;
  box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
  background: $fontLinear;
  margin-left: 20rpx;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translateY(-50%);
    height: 28rpx;
    width: 0;
    border-right: 1px solid rgba(255, 255, 255, 0.5);
  }
  .action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 180rpx;
    height: 100%;
    font-size: $font-base;
    padding: 0;
    border-radius: 0;
    background: transparent;
  }
}
/* 底部操作菜单 */
.page-bottom {
  position: fixed;
  left: 30rpx;
  bottom: 30rpx;
  z-index: 95;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 690rpx;
  height: 100rpx;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 20rpx 0 rgba(0, 0, 0, 0.5);
  border-radius: 16rpx;
  .p-b-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: $font-sm;
    color: $font-color-base;
    width: 96rpx;
    height: 80rpx;
    .yticon {
      font-size: 40rpx;
      line-height: 48rpx;
      color: $font-color-light;
    }
    &.active,
    &.active .yticon {
      color: $uni-color-primary;
    }
    .icon-fenxiang2 {
      font-size: 42rpx;
      transform: translateY(-2rpx);
    }
    .icon-shoucang {
      font-size: 46rpx;
    }
  }
  .action-btn-group {
    display: flex;
    height: 76rpx;
    border-radius: 100px;
    /*overflow: hidden;*/
    box-shadow: 0 20rpx 40rpx -16rpx #fa436a;
    box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
    background: $fontLinear;
    margin-left: 20rpx;
    position: relative;
    &:after {
      content: '';
      position: absolute;
      top: 50%;
      right: 50%;
      transform: translateY(-50%);
      height: 28rpx;
      width: 0;
      border-right: 1px solid rgba(255, 255, 255, 0.5);
    }
    .action-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 180rpx;
      height: 100%;
      font-size: $font-base;
      padding: 0;
      border-radius: 0;
      background: transparent;
    }
  }
}
.banner {
  background: #fff;
  height: 480rpx;
  padding-bottom: 20rpx;
  .swiper-wrap {
    padding-left: 30rpx;
    height: inherit;
    width: 334rpx !important;
    .u-list-image-wrap {
      position: relative;
      width: 100%;
      height: 100%;
      transition: all 0.2s;
      .img,
      .mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 300rpx;
        height: 450rpx;
        border-radius: 24rpx;
      }
      .img {
        z-index: -2;
      }
      .mask {
        z-index: -1;
      }
    }
    .title {
      position: absolute;
      top: 100rpx;
      left: 32rpx;
      color: #fff;
      font-size: 40rpx;
      font-weight: bold;
      z-index: 2;
      .main {
        font-weight: bold;
      }
      .sub {
        margin-top: 10rpx;
        font-size: 28rpx;
      }
      view {
        color: #fff;
      }
    }
    .recommend-img {
      position: absolute;
      bottom: 86rpx;
      right: 32rpx;
      z-index: 2;
      width: 96rpx;
      height: 114rpx;
      color: #fff;
    }
    .goods-box {
      position: absolute;
      bottom: 40rpx;
      right: 20rpx;
      z-index: 2;
      justify-content: space-between;
      image {
        width: 120rpx;
        height: 120rpx;
        background-color: #fff;
        border-radius: 12rpx;
      }
    }
  }
}
.swiperBox {
  position: relative;
  swiper {
    height: 750rpx;
    .swiper-video {
      position: relative;
      video {
        width: 100%;
        height: 100%;
      }
      .poster {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 999;
      }
    }
    image {
      height: 100%;
      width: 100%;
    }
  }
  .playBtn {
    position: absolute;
    bottom: 40rpx;
    left: 50%;
    display: flex;
    align-items: center;
    transform: translateX(-50%);
    width: 168rpx;
    height: 60rpx;
    border-radius: 30rpx;
    background-color: rgba($color: #fff, $alpha: 0.6);
    font-size: 24rpx;
    image {
      width: 48rpx;
      height: 48rpx;
      min-width: 48rpx;
      margin: 0 18rpx 0 10rpx;
    }
    &:active {
      opacity: 0.8;
    }
  }
  .hide-video {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
  }
  .count {
    position: absolute;
    bottom: 54rpx;
    right: 0;
    padding: 0 10rpx;
    width: 80rpx;
    height: 36rpx;
    line-height: 36rpx;
    border-radius: 18rpx 0 0 18rpx;
    font-size: 20rpx;
    text-align: center;
    color: #ffffff;
    background-color: rgba(0, 0, 0, 0.2);
    span:nth-child(1) {
      font-size: 26rpx;
      margin-left: 4rpx;
    }
    span:nth-child(2) {
      // font-size: 26rpx;
      margin: 0 4rpx;
    }
  }
  .back {
    position: fixed;
    top: 40rpx;
    left: 40rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64rpx;
    height: 64rpx;
    font-size: 32rpx;
    color: #ffffff;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 999;
  }
}
.ceshi {
  font-size: 36rpx;
}
.ceshi1 {
  font-size: 36rpx;
}
.temaihui {
  position: relative;
  height: 110rpx;
  image {
    width: 750rpx;
    height: 100%;
  }
  .countDown {
    position: absolute;
    bottom: 16rpx;
    right: 90rpx;
  }
}
.price_title {
  background-color: #ffffff;
  padding: 20rpx 24rpx 16rpx;
}
.priceBox {
  display: flex;
  margin-bottom: 16rpx;
  .price {
    color: #d51010;
    font-weight: bold;
    font-size: 30rpx;
    text:nth-child(2) {
      font-size: 42rpx;
    }
  }
  .market_price {
    display: inline-block;
    margin: 18rpx 20rpx 0;
    font-size: 24rpx;
    color: #888;
    text-decoration: line-through;
  }
  .label {
    display: inline-block;
    margin-top: 18rpx;
    margin-left: 10rpx;
    padding: 0 8rpx;
    height: 32rpx;
    line-height: 32rpx;
    font-size: 22rpx;
    border-radius: 8rpx;
    color: #fff;
  }
  .like {
    margin-left: auto;
    image {
      height: 76rpx;
      width: 76rpx;
    }
  }
}
.goodsTitle {
  .main {
    font-size: 30rpx;
    font-weight: bold;
    color: #333;
  }
  .sub {
    color: #666;
  }
  .activity {
    color: #bf1111;
  }
  .activity,
  .sub {
    margin-top: 16rpx;
    font-size: 24rpx; // line-height: 36rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .activity-entry {
    display: inline-block;
    padding: 4rpx 20rpx;
    margin: 10rpx 0 24rpx 0;
    font-size: 24rpx;
    color: #bf1111;
    border: 1rpx solid rgb(229, 203, 203);
    border-radius: 40rpx;
  }
}
.red-packet {
  width: 750rpx;
  height: 84rpx;
  image {
    width: inherit;
    height: inherit;
    &:active {
      opacity: 0.9;
    }
  }
}
.redPacket {
  color: #ff2e2e;
  font-size: 26rpx;
  margin-left: 16rpx;
}
.function {
  position: relative;
  u-icon {
    color: #c5c5c5 !important;
    transform: translateX(10rpx) !important;
  }
  .listItem {
    font-size: 26rpx;
    display: flex;
    align-items: center;
    .selected-box {
      max-width: 560rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      .selected {
        margin-right: 8rpx;
      }
    }
  }
  .service {
    .item {
      display: flex;
      align-items: center;
      margin-right: 20rpx;
      image {
        width: 24rpx;
        height: 24rpx;
        min-width: 24rpx;
        margin-right: 6rpx;
      }
      text {
        font-size: 24rpx;
        color: #777;
      }
    }
    .item:last-child {
      max-width: 260rpx;
      text {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
  }
  .subTitle {
    color: #777;
    font-size: 23rpx;
    margin-right: 20rpx;
    margin-left: -10rpx;
  }
  .selected {
    // font-weight: bold;
  }
  .isStock {
    color: #ff2e2e;
    margin-left: 16rpx;
  }
  .title {
    position: relative;
    height: 88rpx;
    text-align: center;
    line-height: 88rpx;
    border-bottom: 1rpx solid #f3f3f3;
    .close {
      position: absolute;
      right: 48rpx;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .detail {
    height: 712rpx;
  }
  .serviceBox {
    padding: 0 20rpx;
    margin: 28rpx 0;
    .item {
      display: flex;
      align-items: center;
      image {
        width: 24rpx;
        height: 24rpx;
        min-width: 24rpx;
        margin-right: 8rpx;
      }
      text {
        color: #444;
        font-size: 28rpx;
      }
    }
    .serviceDetail {
      color: #777;
      font-size: 22rpx;
      margin-top: 10rpx;
      padding-left: 30rpx;
    }
  }
  .paramsBox {
    display: flex;
    align-items: center;
    height: 80rpx;
    padding: 0 30rpx;
    border-bottom: 1rpx solid #f8f8f8;
    .attr {
      color: #777;
      width: 160rpx;
    }
  }
}
.rank {
  position: relative;
  justify-content: space-between;
  width: 750rpx;
  height: 92rpx;
  padding: 0 24rpx 0 210rpx;
  font-size: 28rpx;
  font-weight: bold;
  image {
    position: absolute;
    top: 0;
    left: 0;
    width: inherit;
    height: inherit;
    z-index: -1;
  }
  & > text {
    width: 480rpx;
  }
}
.card {
  padding: 20rpx 0;
  background-color: #fff;
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 26rpx;
    height: 60rpx;
    .title {
      font-size: 28rpx;
      color: rgb(51, 51, 51);
      font-weight: bold;
    }
    .more {
      display: flex;
      align-items: center;
      &:active {
        opacity: 0.8;
      }
      text {
        font-size: 24rpx;
        color: #999;
      }
      image {
        width: 24rpx;
        height: 24rpx;
      }
    }
  }
}
.comment {
  .tags {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 0 26rpx;
    .item {
      display: inline-block;
      padding: 6rpx 12rpx; // height: 40rpx;
      // line-height: 40rpx;
      font-size: 22rpx;
      color: #444;
      background-color: rgb(244, 231, 206);
      border-radius: 30rpx;
      margin: 10rpx 12rpx 10rpx 0;
      &:active {
        opacity: 0.8;
      }
    }
  }
  scroll-view {
    margin: 20rpx 0;
    .scoll-wrapper {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      padding: 0 26rpx;
      .item {
        padding: 30rpx 24rpx 0;
        margin-right: 32rpx;
        width: 616rpx;
        height: 226rpx;
        flex-shrink: 0;
        background-color: #fafafa;
        border-radius: 12rpx;
        .user {
          display: flex;
          align-items: center;
          image {
            width: 66rpx;
            height: 66rpx;
            border-radius: 33rpx;
          }
          .name {
            font-size: 26rpx;
            margin: 0 16rpx;
          }
        }
        .content {
          margin-top: 16rpx;
          font-size: 24rpx;
          color: #555;
          line-height: 48rpx;
        }
      }
      .more {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 40rpx;
        height: 226rpx;
        border-radius: 12rpx;
        background-color: #fafafa;
        line-height: 28rpx;
        color: #555;
        font-size: 24rpx;
        image {
          margin-top: 6rpx;
          width: 22rpx;
          height: 22rpx;
        }
      }
      .white {
        padding: 0 13rpx;
        height: 226rpx;
      }
    }
  }
}
.question {
  .list {
    padding: 0 26rpx;
    font-size: 24rpx;
    margin-top: 20rpx;
    .item {
      margin-bottom: 12rpx;
      image {
        width: 30rpx;
        height: 30rpx;
        min-width: 30rpx;
      }
      .title {
        margin-left: 12rpx;
        color: #444;
        max-width: 550rpx;
      }
      .count {
        margin-left: auto;
        color: #999;
      }
    }
  }
  .ask-empty {
    padding: 0 26rpx;
    font-size: 24rpx;
    height: 100rpx;
    image {
      width: 25rpx;
      height: 34rpx;
      margin-right: 10rpx;
    }
    .btn {
      margin-left: auto;
      height: 50rpx;
      width: 134rpx;
      line-height: 50rpx;
      text-align: center;
      color: rgb(159, 128, 82);
      border: 1rpx solid rgba(159, 128, 82, 0.6);
      border-radius: 25rpx;
      &:active {
        opacity: 0.8;
      }
    }
  }
}
.swiper-goods {
  padding: 30rpx 0 10rpx;
  background-color: #fff;
  .head {
    height: 60rpx;
    align-items: center;
    .title {
      font-size: 28rpx;
      color: rgb(159, 128, 82);
    }
    .underline {
      margin-top: 6rpx;
      width: 100rpx;
      height: 2rpx;
      border-radius: 1rpx;
      background-color: rgb(159, 128, 82);
    }
  }
  swiper {
    margin-top: 10rpx;
    height: 800rpx;
    width: 100%;
    .goods {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 0 20rpx;
      .item {
        position: relative;
        width: 32%;
        border-radius: 8rpx;
        margin-bottom: 24rpx;
        font-size: 28rpx;
        overflow: hidden;
        .goods-img {
          width: 100%;
          height: 228rpx;
          background-color: #f8f8f8;
          border-radius: 8rpx 8rpx 0 0;
        }
        .labelbox {
          position: absolute;
          top: 192rpx;
          left: 0;
          text {
            display: inline-block;
            margin-right: 10rpx;
            padding: 0 10rpx;
            height: 28rpx;
            line-height: 28rpx;
            font-size: 22rpx;
            color: #ffffff;
            border-radius: 4rpx;
            text-align: center;
          }
        }
        .title {
          width: 100%;
          padding: 0 10rpx;
          height: 72rpx;
          font-size: 24rpx;
          color: rgb(51, 51, 51);
          line-height: 36rpx;
          margin-top: 6rpx;
        }
        .price {
          margin: 10rpx 0 0 10rpx;
          color: rgb(227, 13, 13);
          font-size: 24rpx;
          .priceMin {
            font-size: 28rpx;
          }
        }
      }
    }
  }
}
.shop {
  .info {
    padding: 0 24rpx;
    font-size: 24rpx;
    height: 80rpx;
    .logo {
      width: 80rpx;
      height: 80rpx;
      min-width: 80rpx;
      border-radius: 8rpx;
    }
    .name {
      .main {
        color: #555;
        font-size: 35rpx;
        font-weight: 900;
      }
      .sub {
        margin-left: 5rpx;
        color: #999;
        font-size: 25rpx;
      }
    }
    .go-to-shop {
      margin-left: auto;
      text {
        color: rgb(159, 128, 82);
      }
      image {
        width: 22rpx;
        height: 22rpx;
      }
    }
  }
  .grade {
    justify-content: space-between;
    margin-bottom: 20rpx;
    padding: 0 24rpx;
    font-size: 24rpx;
    color: #999;
    .item {
      .score {
        margin: 0 8rpx;
      }
      .level {
        display: inline-block;
        padding: 0 4rpx;
        border-radius: 4rpx;
        background-color: blue;
      }
    }
  }
}
.detailImgs {
  display: flex;
  flex-direction: column;
  padding: 20rpx;
  image {
    width: 100%;
  }
}
.goodsInfo {
  display: flex;
  padding: 30rpx;
  image {
    width: 166rpx;
    height: 166rpx;
    min-width: 166rpx;
    border-radius: 10rpx;
  }
  .selectedInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 30rpx;
    .price {
      color: #d51010;
      font-weight: bold;
      text:first-child {
        font-size: 20rpx;
      }
      text:last-child {
        font-size: 38rpx;
      }
    }
    .selected {
      color: #555;
      font-size: 26rpx;
      text:nth-child(n + 2) {
        margin-right: 10rpx;
      }
    }
  }
}
.propBox {
  padding: 0 30rpx 40rpx; // width: 100%;
  height: 620rpx;
  -webkit-scrollbar: none;
  box-sizing: border-box;
  .prop {
    margin-bottom: 20rpx;
    .attr {
      font-size: 24rpx;
      color: #a9a9a9;
      margin-bottom: 10rpx;
    }
    .value {
      display: flex;
      flex-wrap: wrap;
      text {
        display: block;
        margin: 10rpx 16rpx;
        padding: 14rpx 28rpx;
        font-size: 26rpx;
        background-color: #f4f4f4;
        border-radius: 8rpx;
        border: 1rpx #f4f4f4 solid;
      }
      .selected {
        border-color: #bf1111;
        color: #bf1111;
        background-color: #f6eded;
      }
    }
  }
  .count {
    display: flex;
    align-items: center;
    justify-content: space-between; // margin-bottom: 40rpx;
    .attr {
      margin-bottom: 0;
    }
  }
}
.goodsPop {
  position: relative;
  .btnBox {
    position: absolute;
    bottom: 0rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100rpx; // background-color: blue;
    .btn {
      position: relative;
      width: 700rpx;
      height: 80rpx;
      border-radius: 40rpx;
      line-height: 80rpx;
      background: linear-gradient(to right, #ef4c2c, #d51110);
      text-align: center;
      color: #fff;
      &:active {
        opacity: 0.8;
      }
    }
  }
}
.u-hover-class {
  background-color: #f2f3f5 !important;
  opacity: 1;
}
.bottom-menu {
  position: fixed;
  bottom: 0;
  width: 750rpx;
  height: 130rpx;
  display: flex;
  background-color: #fff;
  padding-bottom: 30rpx;
  .btns {
    display: flex;
    font-size: 22rpx;
    .btn {
      width: 100rpx;
      height: 100rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      &:active {
        background-color: #f2f3f4;
      }
      .contact {
        position: absolute;
        width: 100rpx;
        height: 100rpx;
        z-index: 1;
        opacity: 0;
      }
    }
  }
  .next {
    padding: 10rpx;
    display: flex;
    width: 450rpx;
    view {
      width: 50%;
      text-align: center;
      line-height: 80rpx;
      color: #fff;
      &:active {
        opacity: 0.8;
      }
    }
    view:first-child {
      background: linear-gradient(90deg, #ffd01e, #ff8917);
      border-radius: 40rpx 0 0 40rpx;
    }
    view:last-child {
      background: linear-gradient(90deg, #ff6034, #ee0a24);
      border-radius: 0 40rpx 40rpx 0;
    }
  }
}
.navbar {
  position: fixed;
  width: 750rpx;
  top: 0;
  z-index: 10;
  .subMenu {
    position: absolute;
    top: 96rpx;
    left: 20rpx;
    width: 176rpx;
    background-color: #fff;
    border-radius: 12rpx;
    overflow: hidden;
    z-index: 12;
    .item {
      display: flex;
      align-items: center;
      height: 80rpx;
      border-bottom: 1rpx solid #f0f0f0;
      color: #555;
      font-size: 24rpx;
      &:active {
        background-color: #f2f3f4;
      }
      u-icon {
        margin: 0 16rpx;
      }
    }
    .item:last-child {
      border: none;
    }
  }
  .triangle {
    position: absolute;
    top: 88rpx;
    left: 140rpx;
    width: 30rpx;
    height: 30rpx;
    background-color: #fff;
    transform: rotate(45deg);
    z-index: 11;
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 750rpx;
    height: 1334rpx;
    z-index: 11; // background-color: rgba($color: #000000, $alpha: 0.2);
  }
}
.u-border-bottom::after {
  border: none;
}
.slot-wrap {
  position: relative;
  margin-left: 20rpx;
  width: 176rpx;
  height: 60rpx;
  border-radius: 30rpx;
  color: #fff;
  background-color: rgba($color: #000000, $alpha: 0.2);
  border: 2rpx solid rgba($color: #ffffff, $alpha: 0.2);
  .slot-icon {
    justify-content: center;
    width: 50%;
    height: inherit;
  }
  .gap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 2rpx;
    height: 36rpx;
    background-color: rgba($color: #f1f1f1, $alpha: 0.2);
  }
}
.u-back-top {
  image {
    width: 80rpx;
    height: 80rpx;
  }
}
</style>
