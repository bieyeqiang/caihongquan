<template>
  <view>
    <view class="add">
      <text @click="goPage('/pagesA/nearby/nearbyAdd/nearbyAdd?index=0')">+发布显摆动态</text>
    </view>
    <view class="myList" v-if="hotList">
      <mescroll-uni style="width: 100%;height: 100%" top="80" :fixed="true" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @emptyclick="emptyClick" @init="mescrollInit">
        <mood-list :nearbyList="hotList"></mood-list>
      </mescroll-uni>
    </view>
  </view>
</template>

<script>
import moodList from '@/pages/nearby/moodList'
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
export default {
  components: {
    MescrollUni,
    moodList
  },
  props: {
    index: '',
    tabTime: ''
  },
  data () {
    return {
      hotList: [],
      latitude: '',
      longitude: '',
      downOption: {
        auto: false, // 不自动加载
        bgColor: '#ffffff'
      },
      mescroll: null,
      upOption: {
        auto: false, // 不自动加载
        page: {
          num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
          size: 5 // 每页数据的数量
        },
        noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
        empty: {
          tip: '~ 空空如也 ~', // 提示
          btnText: '去看看'
        },
      },
      nowPage: 1,
      nowPageDataNum: 5,
      isInit: false,
      option: ''
    };
  },
  watch: {
    tabTime (val) {
      this.mescroll.triggerDownScroll();
      this.isInit = true
    }
  },
  methods: {
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit (mescroll) {
      this.mescroll = mescroll;
    },
    /*下拉刷新的回调 */
    downCallback (mescroll) {
      // 这里加载你想下拉刷新的数据, 比如刷新轮播数据
      // loadSwiper();
      // 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
      mescroll.resetUpScroll()
    },
    /*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
    async upCallback (mescroll) {
      // 获取列表
      const res = await this.$request("nearby", "nearbyList", {
        uid: this.option.code,
        offset: (mescroll.num - 1) * mescroll.size,
        limit: mescroll.size,
        state:this.option.admin ? 'all' : 0
      });
      if (res.data) {
        if (mescroll.num == 1) this.hotList = []; //第一页清空
        this.hotList = this.hotList.concat(res.data);//追加新数据
        mescroll.endSuccess(res.data.length); //结束加载状态
      } else {
        mescroll.endErr();//失败
      }

    },
    //点击空布局按钮的回调
    emptyClick () {
      uni.showToast({
        title: '点击了按钮,具体逻辑自行实现'
      })
    },
  },
  created () {

  },
  onLoad (option) {
    this.option = option
    this.$nextTick(() => {
      this.mescroll.triggerDownScroll();
      this.isInit = true
    })
  }
};
</script>

<style lang="scss" scoped>
.add {
  text-align: right;
  padding: 10px;
  z-index: 99999;
}
.add text {
  border-radius: 5px;
  padding: 5px 13px;
  color: #fff;
  background: $fontColorB;
}
.leng1 image {
  width: 100%;
  height: 400upx;
  border-radius: 10upx;
}
.clear:after {
  content: '';
  display: block;
  clear: both;
}
.leng2 {
  display: flex;
  flex-flow: row;
}
.leng2 image {
  display: inline-block;
  flex: 2;
  width: 50%;
  height: 400upx;
}
.leng2 image:first-child {
  border-radius: 5px 0 0 5px;
  margin-right: 2px;
}
.leng2 image:last-child {
  border-radius: 0 5px 5px 0;
  margin-left: 2px;
}
.leng3 {
  display: flex;
  flex-flow: row;
  height: 400upx;
}
.leng3 view:first-child {
  width: 70%;
}
.leng3 view:first-child image {
  width: 100%;
  height: 100%;
  border-radius: 5px 0 0 5px;
}
.leng3 view:last-child {
  flex: 1;
}
.leng3 view:last-child image {
  width: 100%;
  height: 50%;
  display: inline-block;
  float: left;
  padding-left: 2px;
  box-sizing: border-box;
  border-radius: 0 5px 5px 0;
}
.leng3_lf image:first-child {
  padding-bottom: 1px;
}
.leng3_lf image:last-child {
  padding-top: 1px;
}
.leng4 {
  display: flex;
  flex-flow: row;
  height: 300upx;
}
.leng4 view:first-child {
  width: 70%;
}
.leng4 view:first-child image {
  width: 100%;
  height: 100%;
  border-radius: 5px 0 0 0;
}
.leng4 view:last-child {
  flex: 1;
}
.leng4 view:last-child image {
  width: 100%;
  height: 100%;
  display: inline-block;
  float: left;
  padding-left: 2px;
  box-sizing: border-box;
  border-radius: 0 5px 0 0;
}
.leng4_bot {
  margin-top: 2px;
}
.leng4_bot image {
  width: 50%;
  height: 170upx;
  float: left;
  box-sizing: border-box;
}
.leng4_bot image:first-child {
  border-radius: 0 0 0 5px;
  padding-right: 1px;
}
.leng4_bot image:last-child {
  border-radius: 0 0 5px 0;
  padding-left: 1px;
}
.leng5 {
  display: flex;
  flex-flow: row;
  height: 300upx;
}
.leng5 view:first-child {
  width: 70%;
}
.leng5 view:first-child image {
  width: 100%;
  height: 100%;
  border-radius: 5px 0 0 0;
}
.leng5 view:last-child {
  flex: 1;
}
.leng5 view:last-child image {
  width: 100%;
  height: 100%;
  display: inline-block;
  float: left;
  padding-left: 2px;
  box-sizing: border-box;
  border-radius: 0 5px 0 0;
}
.leng5_bot {
  margin-top: 2px;
}
.leng5_bot image {
  width: 33.333%;
  height: 170upx;
  float: left;
  box-sizing: border-box;
}
.leng5_bot image:first-child {
  border-radius: 0 0 0 5px;
  padding-right: 2px;
}
.leng5_bot image:last-child {
  border-radius: 0 0 5px 0;
  padding-left: 2px;
}
.leng6 {
  display: flex;
  flex-flow: row;
  height: 300upx;
}
.leng6 view:first-child {
  width: 70%;
}
.leng6 view:first-child image {
  width: 100%;
  height: 100%;
  border-radius: 5px 0 0 0;
}
.leng6 view:last-child {
  flex: 1;
}
.leng6 view:last-child image {
  width: 100%;
  height: 50%;
  display: inline-block;
  float: left;
  padding-left: 2px;
  box-sizing: border-box;
  border-radius: 0 5px 0 0;
}
.leng6_lf image:first-child {
  padding-bottom: 1px;
}
.leng6_lf image:last-child {
  padding-top: 1px;
}
.leng6_bot {
  margin-top: 2px;
}
.leng6_bot image {
  width: 33.333%;
  height: 170upx;
  float: left;
  box-sizing: border-box;
}
.leng6_bot image:first-child {
  border-radius: 0 0 0 5px;
  padding-right: 2px;
}
.leng6_bot image:last-child {
  border-radius: 0 0 5px 0;
  padding-left: 2px;
}
li {
  border-bottom: 10px solid #eaeef7;
}
.add_rt {
  position: fixed;
  right: 10px;
  bottom: 20px;
  z-index: 99999;
}
.add_rt view {
  background: #fdd149;
  color: #000;
  border-radius: 15px;
  padding: 2px 8px;
}
.list {
  height: 100%;
}
.cotent_full {
  padding-bottom: 100upx;
}
.allorders-content {
  width: 100%;
  height: 100vh;
}
.dynNear-wrapper {
  color: #333;
  height: 100vh;
  width: 100%;
  position: fixed;
}
.dynNearSwiper-bgcolor {
  background: linear-gradient(#8e36f9, #d837fe);
}
.dynNear-header-wrapper {
  display: flex;
  padding-top: 20rpx;
  text-align: center;
}
.dynNear-header-wrapperItem {
  flex: 1;
  height: 60rpx;
  line-height: 60rpx;
  text-align: center;
}
.dynNear-header-wrapperItemTxt {
  padding: 10rpx 40rpx;
  background: #eaeef7;
  font-size: 32rpx;
  border-radius: 30rpx;
  margin: 0 20upx;
}
.dynNear-header-selected {
  background: #fdd149;
}
.dynNearSwiper {
  display: flex;
  width: 3000rpx;
  position: relative;
  transition: left 0.4s;
}
.dynNearSwiper-item {
  flex: 0 750rpx;
  background: #fff;
  padding: 20upx 0;
}
.dynNearSwiper-item-ouyu {
  width: 710rpx;
  margin-left: 40rpx;
  margin-right: 40rpx;
  display: inline-block;
}
.dynNearNone {
  height: 100px !important;
  overflow: hidden;
}
.dynNearSwiper-item-ouyu .dynNearcard-wrapper {
  width: 670rpx;
  border-top: none;
  margin-top: 10rpx;
  padding: 1rpx 20rpx;
}

.dynNearcard-wrapper {
  padding: 0 20rpx;
  color: #333;
  background: #fff;
}
.marBg {
  margin: 0 20rpx 20rpx 20rpx;
  padding: 20rpx !important;
  box-sizing: border-box;
}
.dynNearcard-header-wrapper {
  box-sizing: border-box;
  height: 100rpx;
  line-height: 100rpx;
  display: flex;
  vertical-align: center;
  margin-top: 20rpx;
}
.dynNearcard-header-item {
  flex: 1;
}
.dynNearcard-header-img {
  display: inline-block;
  width: 80rpx;
  height: 80rpx;
  margin-top: 10rpx;
  border-radius: 50%;
}
.dynNearcard-header-nearInfo {
  display: inline-block;
  vertical-align: top;
  margin-left: 16rpx;
}
.dynNearcard-header-nearInfo-item {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  height: 50rpx;
  line-height: 50rpx;
  font-size: 28rpx;
}
.dynNearcard-header-nearInfo-item .iconfont {
  font-size: 24rpx;
}
.dynNearcard-header-item-focus {
  text-align: right;
}
.dynNearcard-header-item-focus-btn {
  font-size: 28rpx;
  padding: 12rpx 24rpx;
  border-radius: 30rpx;
  background: #fdd149;
}
.dynNearcard-header-time {
  color: #9b9b9b;
}
.dynNearcard-path-wrapper {
  margin-top: 20rpx;
  height: 40rpx;
  line-height: 40rpx;
}
.dynNearcard-path-address {
  font-size: 32rpx;
  font-weight: 700;
  color: #f60;
}
.dynNearcard-path-address .iconfont {
  font-size: 34rpx;
  padding: 0 6rpx 0 4rpx;
}
.dynNearcard-path-time {
  font-size: 30rpx;
  color: #f60;
  float: right;
}
.dynNearcard-content-wrapper {
  font-size: 32rpx;
  line-height: 50rpx;
  margin-top: 20rpx;
}
.dynNearcard-header-sex {
  font-size: 22rpx;
  border: 1rpx solid #fdacf5;
  color: #fdacf5;
  margin-left: 10rpx;
  padding: 4rpx 10rpx;
  border-radius: 8rpx;
}
.dynNearcard-header-sexname {
  font-size: 22rpx;
  border: 1rpx solid #1d7ef1;
  color: #1d7ef1;
  margin-left: 10rpx;
  padding: 4rpx 10rpx;
  border-radius: 8rpx;
}
.dynNearcard-content-icon {
  color: #fff;
  display: inline-block;
  height: 40rpx;
  line-height: 40rpx;
  padding: 0 10rpx;
  border-radius: 6rpx;
  margin-right: 4rpx;
}
.dynNearcard-content-idea {
  font-size: 32rpx;
  color: #22b529;
  vertical-align: middle;
  padding: 0 6rpx;
}
.dynNearcard-imgList-wrapper {
  margin-top: 10rpx;
}
.dynNearcard-imgList-item {
  max-width: 100%;
  margin-top: 10rpx;
}
.dynNearcard-markList-wrapper {
  height: 50rpx;
  line-height: 50rpx;
}
.dynNearcard-markList-item {
  color: #71d076;
  border: 1rpx solid #71d076;
  font-size: 24rpx;
  padding: 6rpx 10rpx;
  border-radius: 10rpx;
  margin-right: 12rpx;
}
.dynNearcard-footer-wrapper {
  margin-top: 20rpx;
  margin-bottom: 20rpx;
  font-size: 28rpx;
  color: #9b9b9b;
}
.dynNearcard-footer-functions {
  float: right;
}
.dynNearcard-footer-functions-item {
  margin-left: 50rpx;
}
.dynNearcard-footer-functions-item .iconfont {
  font-size: 32rpx;
  vertical-align: text-bottom;
  padding-right: 6rpx;
}
</style>
