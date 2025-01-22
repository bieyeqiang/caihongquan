<!--模板-->
<template>
  <div class="fujin">
    <view class="topicTitleBg">
      <image mode="aspectFill" lazy-load src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/appIcon/huati.png"></image>
      <text>“ {{topicOption.title}} ”</text>
    </view>
    <!-- swiper中的transfrom会使fixed失效,此时需设置fixed为false,而top会自动使用padding-top -->
    <mescroll-uni style="width: 100%;height: 100%" top="200" :fixed="true" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @emptyclick="emptyClick" @init="mescrollInit">
      <mood-list :nearbyList="hotList"></mood-list>
    </mescroll-uni>
  </div>
</template>


<!--JS-->
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
      topicOption: ''
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
        topicTitle: this.topicOption.title,
        offset: (mescroll.num - 1) * mescroll.size,
        limit: mescroll.size,
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
    this.topicOption = option
    uni.setNavigationBarTitle({
      title: '话题 - ' + option.title
    });
    this.$nextTick(() => {
      this.mescroll.triggerDownScroll();
      this.isInit = true
    })
  }
};
</script>


<!--css样式-->
<style lang="scss" scoped>
.topicTitleBg {
  background: #9acaff;
  display: flex;
  align-items: center;
  height: 200rpx;
  width: 100%;
  position: fixed;
  top: 0;
  box-shadow: 0 2px 6px rgba(50, 50, 50, 0.4) !important;
  image {
    width: 100rpx;
    height: 100rpx;
    margin-left: 30rpx;
  }
  text {
    font-size: 35rpx;
    font-weight: bold;
    color: #007aff;
  }
}
.text_title {
  font-size: 24rpx !important;
}
.pu_img {
  width: 100%;
  border-radius: 10rpx 10rpx 0 0;
}
.leng1 image {
  width: 100%;
  height: 400upx;
  border-radius: 10upx;
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
  position: relative;
  display: flex;
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
.photoNum {
  color: #fff;
  font-size: 90rpx;
  position: absolute;
  z-index: 999;
  right: 50rpx;
  bottom: 30rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.add_rt {
  position: fixed;
  right: 10px;
  bottom: 20px;
  z-index: 99999;
}
.add_rt view {
  background: #eb5248;
  color: #fff;
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
  /*background: linear-gradient(#8E36F9, #D837FE);*/
}
.dynNear-header-wrapper {
  display: flex;
  text-align: center;
  .uni-swiper-tab {
    border-bottom: 1px solid #f5f5f5 !important;
  }
}
.tab_bg {
  margin-top: 40rpx;
  display: flex;
  padding: 20rpx 0;
  text-align: center;
  border-bottom: 1px solid #f5f5f5;
}
.dynNear-header-wrapperItem {
  flex: 1;
  height: 60rpx;
  line-height: 60rpx;
  text-align: center;
}
.tab_title {
  padding: 10rpx 40rpx;
  font-size: 32rpx;
  margin: 0 20upx;
}
.tab_title_sel {
  border-bottom: 3px solid #fdd149;
}
.dynNear-header-wrapperItemTxt {
  padding: 5rpx 40rpx;
  background: #f5f5f5;
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
  border-bottom: 20rpx solid #eeeeee;
  padding: 0 20rpx;
  color: #333;
  background: #fff;
}
.marBg {
  /*margin:0 20rpx 20rpx 20rpx;*/
  border-bottom: 20rpx solid #eeeeee !important;
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
  display: flex;
  align-items: center;
}
.dynNearcard-header-img {
  display: inline-block;
  width: 80rpx;
  height: 80rpx;
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
  height: 40rpx;
  line-height: 40rpx;
  font-size: 26rpx;
  display: flex;
  align-items: center;
  image {
    width: 30rpx;
    height: 30rpx;
  }
}
.dynNearcard-header-nearInfo-item .iconfont {
  font-size: 20rpx;
  font-weight: bold;
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
  color: #7a7997;
  font-size: 21rpx !important;
  font-weight: 300;
  > span {
    padding-right: 10rpx;
  }
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
  font-size: 32rpx;
  font-weight: 700;
  color: #f60;
  float: right;
}
.dynNearcard-content-wrapper {
  font-size: 28rpx;
  line-height: 50rpx;
  color: #333;
  padding-left: 95rpx;
  margin-top: 20rpx;
}
.dynamicContext {
  font-size: 28rpx;
  min-height: 100rpx;
  line-height: 50rpx;
  color: #333;
  padding-left: 95rpx;
}
.dynNearcard-header-name {
  color: #f4742c;
  font-weight: 500;
}
.dynNearcard-header-sex {
  font-size: 20rpx;
  border: 2rpx solid #fe6ed0;
  color: #fe6ed0;
  margin-left: 5rpx;
  padding: 0 10rpx;
  border-radius: 8rpx;
  span {
    font-size: 20rpx;
  }
}
.dynNearcard-header-sexname {
  font-size: 20rpx;
  border: 2rpx solid #00c7ff;
  color: #00c7ff;
  margin-left: 10rpx;
  padding: 0 10rpx;
  border-radius: 8rpx;
  span {
    font-size: 20rpx;
  }
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
  color: #fdd149;
  vertical-align: middle;
  padding: 0 6rpx;
}
.dynNearcard-imgList-wrapper {
  margin-top: 10rpx;
  padding-left: 95rpx;
}
.dynNearcard-imgList-item {
  max-width: 100%;
  margin-top: 10rpx;
}
.dynNearcard-markList-wrapper {
  height: 50rpx;
  line-height: 50rpx;
  margin-top: 10px;
  padding-left: 95rpx;
}
.dynNearcard-markList-item {
  color: #71d076;
  border: 2rpx solid #71d076;
  font-size: 18rpx;
  font-weight: bold;
  padding: 4rpx 16rpx;
  border-radius: 10rpx;
  margin-right: 12rpx;
}
.dianzan {
  padding: 30rpx 0 30rpx 95rpx;
  > span {
    background: #f2f2f4;
    border-radius: 5rpx;
    margin-right: 20rpx;
    color: #9d9db3;
    padding: 8rpx 30rpx;
    font-size: 22rpx;
    font-weight: 400;
    > span {
      padding-right: 10rpx;
      font-size: 22rpx;
      font-weight: 400;
    }
  }
}
.positionDesc {
  color: #9d9db3;
  font-size: 20rpx;
  font-weight: 300;
  padding-left: 95rpx;
  margin-top: 40rpx;
  span {
    color: #9d9db3;
    font-weight: 300;
    font-size: 20rpx;
  }
}
.dynNearcard-footer-wrapper {
  margin-top: 20rpx;
  padding: 10rpx 0;
  font-size: 28rpx;
  color: #c6c6c6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dynNearcard-footer-functions {
  float: right;
}
.dynNearcard-footer-functions-item {
  width: 100rpx;
  text-align: center;
  display: inline-block;
}
.dynNearcard-footer-functions-item .iconfont {
  font-size: 32rpx;
  vertical-align: text-bottom;
  padding-right: 6rpx;
  position: relative;
  top: 3upx;
}
.clear:after {
  content: '';
  display: block;
  clear: both;
}
/*瀑布*/
.falls_bg {
  width: 100%;
  height: 100%;
}
.pubu {
  width: calc(100% - 16px);
  margin-left: 8px;
  margin-top: 20px;
}
.yg img {
  width: 100%;
  border-radius: 8px 8px 0 0;
}
.yg p {
  width: 100%;
  font-size: 0.75rem;
  padding: 3px 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #999;
  text-align: left;
  box-sizing: border-box;
}
.yg_l,
.yg_r {
  width: calc(50% - 5px);
}
.yg li {
  background: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 0 5px #999;
}
.yg_l {
  float: left;
}
.yg_r {
  float: right;
}
.u_xinx {
  position: absolute;
  bottom: -11px;
}
.u_xinx img {
  margin-left: 5px;
  background: rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: inline-block;
}
.u_xinx span {
  position: relative;
  text-shadow: 0 1px 1px #333;
  top: -8px;
  color: #fff;
  font-size: 0.6rem;
}
</style>
