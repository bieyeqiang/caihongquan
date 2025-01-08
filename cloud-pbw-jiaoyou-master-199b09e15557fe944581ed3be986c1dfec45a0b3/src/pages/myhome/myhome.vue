<template>
  <view class="myhome">
    <view class="header status">
      <!--未登录-->
      <view class="mycenter-header" v-if="!hasLogin">
        <view class="mycenter-header-part1">
          <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/name.jpg" class="mycenter-header-part1-img" />
        </view>
        <view class="login_btn_bg">
          <text @click="goPage('/pagesA/login/auth/login')">登录</text>
        </view>
      </view>
      <!--已登录-->
      <view class="userinfo" @click="goPage('/pagesA/myhome/personal/personal', true)" v-if="hasLogin && userInfo">
        <view class="face">
          <image :src="userInfo.avatar"></image>
        </view>
        <view class="info" v-if="userInfo && userInfo.nickname">
          <view class="username">
            {{ userInfo.nickname || '' }}
            <view style="color: #ffffff">ID：{{ userInfo.uid || userInfo.username }}</view>
          </view>
          <!--<view class="integral" >-->
          <!--  <text>聊天收益:{{ AccounData.accounFund || '0' }}</text>-->
          <!--</view>-->
        </view>
      </view>
      <view class="mycenter-header-part3" v-if="hasLogin && userInfo">
        <text class="mycenter-header-part3-txt" @click="myStatusShow = !myStatusShow">{{ myStatusData }}</text>
      </view>
      <chunLei-popups v-model="myStatusShow" :popData="myStatus" @tapPopup="tapPopup" theme="dark" :x="344" :y="20" placement="top-end"></chunLei-popups>
    </view>
    <!-- 会员 -->
    <view class="member orders fBg" style="margin-bottom: 20px">
      <view class="box zwyHeight" @click="goPage('/pagesA/myhome/member/member', true)">
        <view class="tit">
          <text class="iconfont">&#xe6f9;</text>
          PeiBan
        </view>
        <view class="b-btngo" v-if="vipStatus">
          <text v-if="vipStatus.vip_status == 0 && vipStatus.svip_status == 0">立即开通</text>
          <text v-if="vipStatus.vip_status == 1">VIP</text>
          <text v-if="vipStatus.svip_status == 1">SVIP</text>
        </view>
      </view>
    </view>
    <view></view>
    <!-- 关注 -->
    <view class="McMyFans">
      <view class="list">
        <view class="item">
          <view class="text" @click="goPage('/pagesA/friends/like')">
            <text>{{ like }}</text>
            <text>喜欢</text>
          </view>
          <u-line direction="col" color="#979797 " length="32rpx"></u-line>
        </view>
        <view class="item">
          <view class="text" @click="goPage('/pagesA/friends/index?index=' + 0)">
            <text>{{ follow }}</text>
            <text>关注</text>
          </view>
          <u-line direction="col" color="#979797 " length="32rpx"></u-line>
        </view>
        <view class="item">
          <view class="text" @click="goPage('/pagesA/friends/index?index=' + 1)">
            <text>{{ fans }}</text>
            <text>粉丝</text>
          </view>
          <u-line direction="col" color="#979797 " length="32rpx"></u-line>
        </view>
        <view class="item">
          <view class="text" @click="goPage('/pagesA/friends/visitor?index=' + 0)">
            <text>{{ look }}</text>
            <text>看过</text>
          </view>
          <u-line direction="col" color="#979797 " length="32rpx"></u-line>
        </view>
        <view class="item">
          <view class="text" @click="goPage('/pagesA/friends/visitor?index=' + 1)">
            <text>{{ min }}</text>
            <text>访客</text>
          </view>
        </view>
      </view>
    </view>
    <!-- 导航 -->
    <view class="orders" v-if="false">
      <view class="box">
        <view class="mycenter-myicons-item" @click="goPage('/pagesA/service/homePage/homePage?code=' + userInfo._id, true)">
          <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/appIcon/homeIcon/zhuye.png"></image>
          <text class="mycenter-myicons-item-txt">主页</text>
        </view>
        <view class="mycenter-myicons-item" @click="msg('您还没有愿望')">
          <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/appIcon/homeIcon/yuanwang.png"></image>
          <text class="mycenter-myicons-item-txt">愿望</text>
        </view>
        <view class="mycenter-myicons-item" @click="goPage('/pagesA/message/friend/friend?index=0', true)">
          <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/appIcon/homeIcon/guanzhu.png"></image>
          <text class="mycenter-myicons-item-txt">关注</text>
        </view>
        <view class="mycenter-myicons-item" v-if="!openExamineApp && false" @click="goPage('/pagesA/myhome/money/money?index=2', true)">
          <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/appIcon/homeIcon/shouyi.png"></image>
          <text class="mycenter-myicons-item-txt">钱包</text>
        </view>
        <!-- <view class="mycenter-myicons-item" v-if="!openExamineApp" @click="goPage('/pagesA/myhome/task/task',true)">
          <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/appIcon/homeIcon/duihuan.png"></image>
          <text class="mycenter-myicons-item-txt">任务</text>
        </view> -->
      </view>
    </view>
    <!-- 订单 -->
    <view class="tabWrap" v-if="false">
      <view class="tabTitle">我的预约</view>
      <view class="tabList">
        <view class="tabList-item" @click="goPage('/pagesA/myhome/orderList/orderList?index=0', true)">
          <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/appIcon/homeIcon/w_daifu.png"></image>
          <text class="tabList-item-txt">待接单</text>
        </view>
        <view class="tabList-item" @click="goPage('/pagesA/myhome/orderList/orderList?index=1', true)">
          <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/appIcon/homeIcon/w_daique.png"></image>
          <text class="tabList-item-txt">待确认</text>
        </view>
        <view class="tabList-item" @click="goPage('/pagesA/myhome/orderList/orderList?index=2', true)">
          <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/appIcon/homeIcon/w_jinxing.png"></image>
          <text class="tabList-item-txt">进行中</text>
        </view>
        <view class="tabList-item" @click="goPage('/pagesA/myhome/orderList/orderList?index=3', true)">
          <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/appIcon/homeIcon/w_jieshu.png"></image>
          <text class="tabList-item-txt">已结束</text>
        </view>
      </view>
    </view>
    <wrap :height="16"></wrap>
    <!-- 动态 -->
    <view class="tabContent">
      <view class="titleIcon">
        <view class="moreTitle">显摆</view>
        <view class="moreTitle-more" @click="goPage('/pagesA/myhome/nearbtList/nearbtList?admin=admin&code=' + userInfo._id, true)">
          <text>全部</text>
          <text class="iconfont">&#xe623;</text>
        </view>
      </view>
      <view class="mycenter-dongtai-add">
        <view class="photo_bg">
          <view class="mycenter-dongtai-add-icon" @click="goPage('/pagesA/nearby/nearbyAdd/nearbyAdd?index=0', true)">
            <text class="mycenter-dongtai-add-icon-txt">发布显摆</text>
            <text class="iconfont">&#xe65c;</text>
          </view>
          <view v-for="(item, index) of homeData.nearbyList" :key="index" v-if="homeData && homeData.nearbyList.length != 0 && index <= 2">
            <image mode="aspectFill" :src="item.dynamicImg[0] || userInfo.avatar" @click="goPage('/pagesA/nearby/nearbyText/nearbyText?code=' + item._id, true)"></image>
          </view>
          <view class="photoText" v-if="!userInfo || (homeData && homeData.nearbyList.length == 0)">
            <view>发布我的第一个动态</view>
            <view>让大家都认识下你~</view>
          </view>
        </view>
      </view>
    </view>
    <wrap :height="16"></wrap>
    <!-- 相册 -->
    <view class="tabContent">
      <view class="titleIcon">
        <view class="moreTitle">相册</view>
        <view class="moreTitle-more">
          <text @click="goPage('/pagesA/myhome/photoSort/photoSort?admin=admin&code=' + userInfo._id)">全部</text>
          <text class="iconfont">&#xe623;</text>
        </view>
      </view>
      <view class="mycenter-dongtai-add">
        <view class="photo_bg">
          <view class="mycenter-dongtai-add-icon" @click="goPage('/pagesA/myhome/photoSort/photoSort?admin=admin&code=' + userInfo._id, true)">
            <text class="mycenter-dongtai-add-icon-txt">上传美照</text>
            <text class="iconfont">&#xe65c;</text>
          </view>
          <view v-for="(item, index) of homeData.photoList" v-if="homeData && homeData.photoList.length != 0 && index <= 2" :key="index">
            <image mode="aspectFill" :src="item.imgPath" @click="goPage('/pagesA/myhome/photoList/photoList?admin=admin&code=' + item.photoAlbumId, true)"></image>
          </view>
          <view class="photoText" v-if="homeData && homeData.photoList.length != 0">
            <view v-if="homeData.photoList && homeData.photoList.length == 1">有用户正在看你</view>
            <view v-if="homeData.photoList && homeData.photoList.length == 1">你很受欢迎~</view>
            <view v-if="homeData.photoList && homeData.photoList.length == 2">你太火爆了</view>
            <view v-if="homeData.photoList && homeData.photoList.length == 2">很多人访问你~</view>
          </view>
          <view class="photoText" v-if="!userInfo || (homeData && homeData.photoList.length == 0)">
            <view v-if="!userInfo || homeData.photoList.length == 0">上传我的第一张照片</view>
            <view v-if="!userInfo || homeData.photoList.length == 0">有照片才会吸引Ta~</view>
          </view>
        </view>
      </view>
    </view>
    <wrap :height="16"></wrap>
    <!-- 账户 userInfo-->
    <view class="tabWrap" v-if="false">
      <view class="tabTitle">账户资产</view>
      <view class="tabList">
        <view class="tabList-item" @click="goPage('/pagesA/myhome/money/money?index=0', true)">
          <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/appIcon/homeIcon/z_yue.png"></image>
          <text class="tabList-item-txt">余额</text>
        </view>
        <view class="tabList-item" @click="goPage('/pagesA/myhome/money/money?index=1', true)">
          <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/appIcon/homeIcon/z_jijin.png"></image>
          <text class="tabList-item-txt">基金</text>
        </view>
        <view class="tabList-item" @click="goPage('/pagesA/myhome/money/money?index=2', true)">
          <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/appIcon/homeIcon/z_shouyi.png"></image>
          <text class="tabList-item-txt">收益</text>
        </view>
        <view class="tabList-item" @click="goPage('/pagesA/myhome/money/money?index=3', true)">
          <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/appIcon/homeIcon/z_youhui.png"></image>
          <text class="tabList-item-txt">优惠券</text>
        </view>
      </view>
    </view>

    <wrap :height="16"></wrap>
    <!-- 菜单 -->
    <view class="tabWrap">
      <view class="tabTitle">常用功能</view>
      <view class="listBgTab">
        <view @click="goPage('/pagesA/login/mask?uid=' + userInfo._id, true)">
          <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/mianju.png"></image>
          <text>我的面具</text>
        </view>
      </view>
    </view>
    <wrap :height="16"></wrap>
    <!-- 认证 -->
    <view class="tabContent">
      <view class="titleIcon" @click="goPage('/pagesA/feedback/feedback')">
        <view class="moreTitle">
          <text class="iconfont" style="color: #fad708">&#xe6b7;</text>
          意见反馈
        </view>
        <view class="moreTitle-more">
          <text class="iconfont">&#xe623;</text>
        </view>
      </view>
      <view class="titleIcon" @click="goPage('/pagesA/myhome/help/help')">
        <view class="moreTitle">
          <text class="iconfont" style="color: #6fd5ff">&#xe6f6;</text>
          帮助中心
        </view>
        <view class="moreTitle-more">
          <text class="iconfont">&#xe623;</text>
        </view>
      </view>
      <!-- #ifdef APP-PLUS || H5 -->
      <view class="titleIcon" @click="goPage('/pagesA/feedback/feedback')">
        <view class="moreTitle">
          <text class="iconfont" style="color: #f9b8b7">&#xe65a;</text>
          联系客服
        </view>
        <view class="moreTitle-more">
          <text class="iconfont">&#xe623;</text>
        </view>
      </view>
      <!-- #endif -->
      <!-- #ifdef MP-WEIXIN -->
      <button class="titleIcon" open-type="contact">
        <view class="moreTitle">
          <text class="iconfont" style="color: #f9b8b7">&#xe65a;</text>
          在线客服
        </view>
        <view class="moreTitle-more">
          <text class="iconfont">&#xe623;</text>
        </view>
      </button>
      <!-- #endif -->
      <view class="titleIcon" @click="goPage('/pagesA/set/about')">
        <view class="moreTitle">
          <text class="iconfont" style="color: #f0c478">&#xe62d;</text>
          关于我们
        </view>
        <view class="moreTitle-more">
          <text class="iconfont">&#xe623;</text>
        </view>
      </view>
      <!-- #ifdef APP-PLUS -->
      <view class="titleIcon" v-if="!openExamineApp" @click="goPage('/pagesA/myhome/about/about?type=wechat')">
        <view class="moreTitle">
          <text class="iconfont" style="color: #1abc9c">&#xe682;</text>
          微信小程序
        </view>
        <view class="moreTitle-more">
          <text class="iconfont">&#xe623;</text>
        </view>
      </view>
      <!-- #endif -->
      <!-- #ifdef MP-WEIXIN -->
      <button class="titleIcon" open-type="contact">
        <view class="moreTitle">
          <text class="iconfont" style="color: #1abc9c">&#xe72b;</text>
          下载APP
        </view>
        <view class="moreTitle-more">
          <text class="iconfont">&#xe623;</text>
        </view>
      </button>
      <!-- #endif -->
      <view class="titleIcon" @click="goPage('/pagesA/set/set', true)">
        <view class="moreTitle">
          <text class="iconfont" style="color: #3a92ff">&#xe6f7;</text>
          设置
        </view>
        <view class="moreTitle-more">
          <text class="iconfont">&#xe623;</text>
        </view>
      </view>
      <view style="height: 30px"></view>
    </view>
    <!-- 无网络提示 -->
    <u-no-network></u-no-network>
  </view>
</template>

<script>
import wrap from '@/components/wrap'
import chunLeiPopups from '@/components/chunLei-popups/chunLei-popups.vue'

import { mapState, mapGetters } from 'vuex'
export default {
  components: {
    wrap,
    chunLeiPopups
  },
  data() {
    return {
      value: 0,
      myStatusShow: false,
      myStatus: [
        {
          title: '休闲中'
        },
        {
          title: '工作中'
        },
        {
          title: '旅行中'
        },
        {
          title: '出差中'
        },
        {
          title: '懒觉中'
        },
        {
          title: '上课中'
        }
      ],
      myStatusData: '休闲中',
      curItem: 0,
      userData: '',
      auditShow: '',
      homeData: '',
      PhotoList: '',
      PhotoListIndex: '',
      AccounData: '',
      horizontal: 'right',
      vertical: 'bottom',
      direction: 'horizontal',
      pattern: {
        color: '#7A7E83',
        backgroundColor: '#fff',
        selectedColor: '#fa709a',
        buttonColor: '#6665f6'
      },
      content: [
        {
          iconPath: 'https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/home/travel.png',
          selectedIconPath: 'https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/home/travel1.png',
          text: '主页',
          active: false
        },
        {
          iconPath: 'https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/home/name.png',
          selectedIconPath: 'https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/home/name1.png',
          text: '愿望',
          active: false
        },
        {
          iconPath: 'https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/home/house.png',
          selectedIconPath: 'https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/home/house1.png',
          text: '小窝',
          active: false
        }
      ],
      // #ifdef APP-PLUS
      myProfile: 0,
      // #endif
      //#ifdef MP-WEIXIN
      myProfile: 1,
      // #endif
      wanshanziliao: '',
      vipStatus: '',
      VipTime: '',
      follow: 0,
      fans: 0,
      look: 0,
      like: 0,
      min: 0
    }
  },
  computed: {
    ...mapState(['userInfo']),
    ...mapGetters(['hasLogin']),
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
  created() {
    this.getFollow()
    this.getFans()
    this.getLook()
    this.mineLook()
    this.getLike()
  },
  methods: {
    /* 喜欢 */
    async getLike() {
      const res = await this.$request('like', 'getLike', {
        state: 0
      })
      this.like = res.data.length
    },
    /* 关注 */
    async getFollow() {
      const res = await this.$request('fans', 'getFollow')
      this.follow = res.data.length
    },
    /* 粉丝 */
    async getFans() {
      const res = await this.$request('fans', 'getFans')
      this.fans = res.data.length
    },
    /* 看过 */
    async mineLook() {
      const res = await this.$request('look', 'mineLook')
      res.data.forEach((item) => {
        this.look += item.browse
      })
    },
    /* 访客 */
    async getLook() {
      const res = await this.$request('look', 'getLook')
      res.data.forEach((item) => {
        this.min += item.browse
      })
    },
    async getVipStatus() {
      const vip = await this.$request('vipOrder', 'getVipStatus', {})
      this.vipStatus = vip
    },
    onShareAppMessage(res) {
      return {
        title: '哈哈交友，寻找离你附近1公里的Ta',
        path: 'pages/map/map'
      }
    },
    tapPopup(e) {
      this.myStatusData = e.title
    },
    outBtn: function () {
      uni.showModal({
        title: '清除launchFlag值',
        content: '确定要清除launchFlag值，进行重启测试？',
        success: function (res) {
          if (res.confirm) {
            ////console.log('用户点击确定');
            // 清除缓存
            uni.clearStorage()
            // 两秒后重启
            // #ifdef APP-PLUS
            uni.showToast({
              icon: 'none',
              duration: 3000,
              title: '清除成功2秒后重启'
            })
            setTimeout(function () {
              uni.hideToast()
              plus.runtime.restart()
            }, 2000)
            // #endif
            // 两秒后跳转
            // #ifdef H5 || MP-WEIXIN
            uni.showToast({
              icon: 'none',
              duration: 3000,
              title: '清除成功2秒后刷新'
            })
            setTimeout(function () {
              uni.navigateTo({
                url: '/pages/map/map'
              })
            }, 2000)
            // #endif
          } else if (res.cancel) {
            ////console.log('用户点击取消');
          }
        }
      })
    },
    trigger(e) {
      this.content[e.index].active = !e.item.active
      // 主页
      if (e.index == 0) this.goPage('/pagesA/service/homePage/homePage?code=' + this.userInfo._id)
      if (e.index == 1) this.msg('您还没有愿望')
      if (e.index == 2) this.goPage('/pagesA/house/house1/open/open?type=myhome&code=' + this.userInfo._id)
    },
    onNavigationBarButtonTap(e) {
      if (!uni.getStorageSync('uniIdToken')) {
        uni.navigateTo({
          url: '/pagesA/login/auth/login'
        })
        return
      }
      uni.navigateTo({
        url: '/pagesA/set/set'
      })
    },
    currentChange(event) {
      this.curItem = event.target.current
    }
  },
  onLoad() {},
  async onShow() {
    // 小程序半秒震动
    //#ifdef MP-WEIXIN
    uni.vibrateShort({ success: () => {} })
    //#endif

    let userInfoData = uni.getStorageSync('userInfo')
    // 登录后 获取信息
    if (userInfoData) {
      this.$store.dispatch('getUserInfo')
      // 获取会员
      this.getVipStatus()
      const res = await this.$request('home', 'getUserHome', {
        uid: userInfoData._id
      })
      if (res) {
        this.homeData = res
        // 补充头像
        if (res.user) {
          if (!res.user.nickname || res.user.nickname == null || res.user.nickname == '') {
            uni.navigateTo({
              url: '/pagesA/login/nickname'
            })
            return
          }
        }
        // 补充面具
        // if (res.user) {
        //   if (!res.user.mapUser || res.user.mapUser == null || res.user.mapUser == '') {
        //     uni.navigateTo({
        //       url: '/pagesA/login/mask?uid=' + res.user._id,
        //     });
        //     return
        //   }
        // }
      }
    } else {
      this.homeData = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.myhome {
  .listBgTab {
    padding: 20rpx;
    display: flex;
    flex-wrap: wrap;
    > view {
      width: 25%;
      display: flex;
      flex-direction: column;
      align-content: center;
      align-items: center;
      margin: 20rpx 0;
      image {
        width: 60rpx;
        height: 60rpx;
      }
      text {
        font-size: 27rpx;
        padding: 20rpx 0;
        color: #7a7997;
      }
    }
  }
}
$font-sm: 24rpx;
$font-base: 28rpx;
$font-lg: 32rpx;
.photoText {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  view:first-child {
    width: 100% !important;
    font-size: 27rpx;
    font-weight: 400;
  }
  view:last-child {
    width: 100% !important;
    font-size: 22rpx;
    font-weight: 300;
  }
}
.member {
  display: flex;
  flex-direction: column;
  color: #f7d680;
  height: 240rpx;
  background: #fff;
  border-radius: 16rpx 16rpx 0 0;
  overflow: hidden;
  position: relative;
  padding: 20rpx 24rpx;
  .box {
    background: linear-gradient(left, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8));
    justify-content: space-between;
    box-sizing: border-box;
    position: relative;
  }

  .b-btntime {
    position: absolute;
    right: 20rpx;
    top: 16rpx;
    width: 202rpx;
    height: 40rpx;
    text-align: center;
    line-height: 40rpx;
    font-size: 22rpx;
    color: #36343c;
    border-radius: 20px;
    background: linear-gradient(left, #f9e6af, #ffd465);
    z-index: 1;
  }
  .tit {
    font-size: 28rpx;
    color: #f7d680;
    position: relative;
    top: -6rpx;
    left: -211rpx;
    display: flex;
    align-items: center;
    text {
      margin-right: 16rpx;
    }
  }
  .b-btngo {
    position: absolute;
    right: 20rpx;
    top: 16rpx;
    width: 160rpx;
    height: 40rpx;
    text-align: center;
    line-height: 40rpx;
    font-size: 22rpx;
    color: #f7d680;
    border-radius: 40rpx;
    z-index: 1;
    border: 2rpx solid #f7d680;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
.photo_bg {
  display: flex;
  justify-content: left;
}
.photo_bg view {
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-radius: 10rpx;
}
.photo_bg image {
  width: 170rpx;
  height: 180rpx;
  border-radius: 10rpx;
}
.login_btn_bg {
  margin-left: 60rpx;
  letter-spacing: 2rpx;
}
.login_btn_bg text {
  padding: 6rpx 38rpx;
  color: #ffffff;
  background: $fontColorJ;
  border-radius: 6rpx;
  margin: 10rpx 30rpx;
  font-size: 32rpx;
}
.mycenter-header {
  padding: 30rpx;
  display: flex;
  height: 200rpx;
  align-items: center;
}
.mycenter-header-part1 {
  flex: 0 100rpx;
}
.mycenter-header-part1-img {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  border: 1px solid #ddd;
}

.mycenter-header-part3 {
  flex: 0 200rpx;
  text-align: right;
}
.mycenter-header-part3-txt {
  display: inline-block;
  background: #ffbd00;
  font-size: 24rpx;
  width: 120rpx;
  text-align: center;
  line-height: 50rpx;
  height: 50rpx;
  border-radius: 8rpx;
  position: relative;
  z-index: 2;
}
.mycenter-header-part3-txt:before {
  content: '';
  width: 80rpx;
  height: 80rpx;
  position: absolute;
  border-left: 1rpx solid #ffbd00;
  border-right: 1rpx solid #ffbd00;
  top: -50rpx;
  left: 20rpx;
  z-index: 1;
}

.mycenter-myicons-item {
  flex: 1;
  text-align: center;
  image {
    width: 50rpx;
    height: 50rpx;
  }
}
.mycenter-myicons-item .iconfont {
  font-size: 55rpx;
  color: $fontColorJ;
}
.mycenter-myicons-item-txt {
  display: block;
  font-size: 24rpx;
  padding-top: 6rpx;
  font-weight: 500;
  color: #7a7997;
}
.tabWrap {
  padding: 0 20rpx;
}
.tabTitle {
  font-size: 28rpx;
  font-weight: bold;
  border-bottom: 1rpx solid #e7ebf1;
  padding: 20rpx 0;
}
.tabList {
  display: flex;
}
.tabList-item {
  flex: 1;
  text-align: center;
  padding: 20rpx 0;
  color: #7a7997;
  display: flex;
  flex-direction: column;
  align-items: center;
  image {
    width: 80rpx;
    height: 80rpx;
  }
}
.tabList-item .iconfont {
  font-size: 50rpx;
  color: #7a7997;
}
.tabList-item-txt {
  display: block;
  font-size: 24rpx;
  color: #7a7997;
  font-weight: 500;
}
.mycenter-mybanban-function {
  display: flex;
  border-bottom: 1rpx solid #e7ebf1;
}
.mycenter-mybanban-function-item {
  flex: 1;
  padding: 20rpx 0;
  text-align: center;
  display: flex;
  justify-content: center;
  justify-items: center;
  flex-flow: row;
  align-items: center;
  image {
    width: 80rpx;
    height: 80rpx;
  }
}
.mycenter-mybanban-function-item .iconfont {
  font-size: 60rpx;
  color: #fdd149;
}
.mycenter-mybanban-function-item-txt {
  font-size: 28rpx;
  display: flex;
  justify-content: center;
  justify-items: center;
  vertical-align: top;
  height: 100rpx;
  line-height: 100rpx;
  padding-left: 10rpx;
  color: #7a7997;
}

.mycenter-myfunctions {
  position: relative;
  width: 100%;
  height: 160rpx;
}
.mycenter-myfunctions-bg {
  width: 100%;
  height: 160rpx;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
}
.mycenter-myfunctions-content {
  position: absolute;
  width: 100%;
  left: 0;
  z-index: 2;
  line-height: 160rpx;
}
.mycenter-myfunctions-content-txt {
  display: inline-block;
  font-weight: 600;
  font-size: 36rpx;
  color: #fff; // color: #895F3C;
  padding-left: 20rpx;
}
.mycenter-myfunctions-content .iconfont {
  float: right;
  color: #9b9b9b;
  font-size: 34rpx;
  padding-right: 20rpx;
}

.mycenter-myfunctions-status .iconfont {
  font-size: 140rpx;
  color: red;
  line-height: 160rpx;
}
.tabContent {
  padding: 0 20rpx;
  button::after {
    border: none !important;
  }
  button {
    background-color: transparent !important;
    padding-left: 0;
    padding-right: 0;
    line-height: 1.8;
    text-align: left;
  }
  button {
    border-radius: 0;
  }
  button.empty::after {
    border: none;
  }
}
.titleIcon {
  font-size: 28rpx;
  font-weight: bold;
  border-bottom: 1rpx solid #e7ebf1;
  padding: 20rpx 0;
  display: flex;
}
.moreTitle {
  flex: 1;
  font-size: 28rpx;
  display: flex;
  align-items: center;
  image {
    width: 30rpx;
    height: 30rpx;
    margin-right: 10rpx;
  }
}
.moreTitle-more {
  flex: 1;
  text-align: right;
  color: #7a7997;
  font-size: 22rpx;
}
.moreTitle text {
  margin-right: 20rpx;
  color: #c6c6c6;
}
.moreTitle-more .iconfont {
  padding-left: 8rpx;
  font-size: 27rpx;
}
.mycenter-dongtai-add {
  padding: 20rpx 0;
}
.mycenter-dongtai-add-icon {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: #f4f9ff;
  color: #c5cdd8;
  width: 180rpx;
  height: 180rpx;
  text-align: center;
  box-sizing: border-box;
  margin-right: 10rpx;
}
.mycenter-dongtai-add-icon image {
  display: inline-block;
  color: #c5cdd8;
  width: 180rpx;
  height: 180rpx;
  box-sizing: border-box;
}
.mycenter-dongtai-add-icon .iconfont {
  font-size: 60rpx;
  display: inline-block;
}
.mycenter-dongtai-add-icon-txt {
  display: inline-block;
  font-size: 28rpx;
}
.header {
  &.status {
    padding-top: var(--status-bar-height);
  }
  background-image: -webkit-linear-gradient(121deg, #08aeea 0%, #835ede 47%, #fa709a 99%);
  background-image: -moz-linear-gradient(121deg, #08aeea 0%, #835ede 47%, #fa709a 99%);
  background-image: -o-linear-gradient(121deg, #08aeea 0%, #835ede 47%, #fa709a 99%);
  background-image: linear-gradient(121deg, #08aeea 0%, #835ede 47%, #fa709a 99%);
  width: 100%;
  height: 50vw;
  padding: 0 4%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  .userinfo {
    width: 100%;
    display: flex;
    align-items: center;
    .face {
      flex-shrink: 0;
      width: 15vw;
      height: 15vw;
      image {
        width: 100%;
        height: 100%;
        border-radius: 100%;
      }
    }
    .info {
      display: flex;
      flex-flow: wrap;
      padding-left: 30rpx;
      .username {
        width: 100%;
        color: #fff;
        font-size: 34rpx;
        padding-left: 20rpx;
        > view {
          font-size: 28rpx;
        }
      }
      .integral {
        display: flex;
        align-items: center;
        padding: 6rpx 20rpx;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 20rpx;
        font-size: 24rpx;
        text:first-child {
          margin-right: 20rpx;
        }
      }
    }
  }
}

.fBg {
  background-color: #5284e4;
  background-image: -webkit-linear-gradient(90deg, #5284e4 0%, #835ede 47%, #fa709a 99%);
  background-image: -moz-linear-gradient(90deg, #5284e4 0%, #835ede 47%, #fa709a 99%);
  background-image: -o-linear-gradient(90deg, #5284e4 0%, #835ede 47%, #fa709a 99%);
  background-image: linear-gradient(90deg, #5284e4 0%, #835ede 47%, #fa709a 99%);
}
.orders {
  background-color: #ffffff;
  width: 100%;
  height: 11vw;
  padding: 0 4%;
  margin-bottom: calc(11vw + 20px);
  display: flex;
  align-items: flex-start;
  border-radius: 0 0 100% 100%;
  box-sizing: border-box;
  position: relative;
  .box {
    width: 100%;
    padding: 0 1%;
    height: 22vw;
    background-color: #fefefe;
    border-radius: 12px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    > view {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
.McMyFans {
  margin: 40rpx 0;
  .list {
    width: 100%;
    display: flex;
    padding: 0 44rpx;
    .item {
      width: 25%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      .text {
        display: flex;
        flex-direction: column;
        align-items: center;
        > text:first-child {
          font-size: 32rpx;
          font-weight: 600;
        }
        > text:last-child {
          font-size: 24rpx;
          color: #999999;
          line-height: 34rpx;
        }
      }
    }
  }
}
</style>
