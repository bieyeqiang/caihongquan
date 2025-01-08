<!--模板-->
<template>
  <view id="home">
    <view class="home_bg" @touchstart="handletouchtart" @touchmove="handletouchmove">
      <image @click.stop="openBtn('0')" class="home_img" src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/house/door.jpg" alt=""></image>
      <image @click.stop="openBtn('1')" class="lu" src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/house/huanjia.png" alt=""></image>
      <image @click.stop="openBtn('2')" class="hua" src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/house/hua.png" alt=""></image>
      <image @click.stop="openBtn('3')" class="email" src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/house/email.png" alt=""></image>
      <!--      开门-->
      <view class="open" @click.stop="openBtn('0')">
        <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/house/gohome.gif"></image>
      </view>
      <view class="open2">
        <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/house/feng.gif"></image>
      </view>
      <!--名片-->
      <view :class="topshow ? 'detail-wrapper topgo ' : 'detail-wrapper topdow'">
        <view class="fengche">
          <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/loading.gif"></image>
        </view>
        <view class='header-wrapper' v-if="UserData && UserData.user">
          <!-- <text class="header_icon globalCololr">工作中</text> -->
          <view class="header">
            <view class='content-wrapper'>
              <view class="avatar" @click="details('name')">
                <!--<text class='avatar_icon globalCololr'>v</text>-->
                <img v-if="UserData.user" :src="UserData.user.avatar">
              </view>
              <view class='user_info' v-if="UserData" @click="details('name')">
                <view class='name'>
                  {{UserData.user.nickname}}
                  <text class='sex' v-if="UserData.user.gender == 1" style="color: #00C7FF;font-weight: bold"><text class="iconfont">&#xe638;</text>{{UserData.user.birthdayText || ''}}</text>
                  <text class='sex' v-if="UserData.user.gender == 2" style="color: #FE6ED0;font-weight: bold"><text class="iconfont">&#xe640;</text>{{UserData.user.birthdayText || ''}}</text>
                </view>
                <view class='others'>
                  <view class='address' v-if="UserData.user.homeCity != null">{{UserData.user.homeCity.city.label + UserData.user.homeCity.area.label}}</view>
                  <view class='address' v-if="UserData.user.homeCity == null">[未设置来自城市]</view>
                  <!--                  <view class='age-wrapper' >-->
                  <!--                    <text class='sex' v-if="UserData.sex == 1"><text class="iconfont" style="color: #00C7FF;font-weight: bold">&#xe638;</text></text>-->
                  <!--                    <text class='sex' v-if="UserData.sex == 0"><text class="iconfont" style="color: #FE6ED0;font-weight: bold">&#xe640;</text></text>-->
                  <!--                    <text class='age'>{{UserData.dateBirthStr || ''}}</text>-->
                  <!--                  </view>-->
                </view>
              </view>
              <view class='label-wrapper'>
                <text class='label' v-if="UserData && UserData.user.label.length > 0" v-for="(item,index) of UserData.user.label" :key="index">{{item}}</text>
                <br>
                <text class='label' v-if="UserData && UserData.user.language.length > 0" v-for="(item,index) of UserData.user.language" :key="index">{{item}}</text>
                <text class='label' v-if="UserData && UserData.user && UserData.user.language&& UserData.user.language.length == 0">中文普通话</text>
              </view>
              <view class='focus-wrapper'>
                <!-- <view class='focus_num'>
                  <text class='iconfont'>&#xe62b;</text>
                  <text>粉丝：{{UserData.attentionNumber}}</text>
                </view> -->
                <view class='focus_btn globalCololr' v-if="userCode && !attention" @click="attentionBtn()"><text class="iconfont">&#xe6bd;</text>关注</view>
                <view class='focus_btn globalCololr' v-if="userCode && attention" @click="attentionBtn()">取消关注</view>
                <view class='focus_btn globalCololr' style="margin-right:10px" v-if="userCode" @click="shield()"><text class="iconfont">&#xe6be;</text>拉黑</view>
                <view class='focus_btn globalCololr' style="margin-right:10px" @click="report()"><text class="iconfont">&#xe6bc;</text>举报</view>
              </view>
            </view>
            <view class="background">
              <img src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/namebg.jpg">
            </view>
          </view>
        </view>
        <view class='container-wrapper' v-if="UserServes && UserData  ">
          <view class='service-wrapper' v-if="UserData && UserData.proofs && UserData.proofs.proofImgPath != null && UserServes.length != 0">
            <text class='iconfont icon-diamondzuanshi'></text>
            <text class='service' v-bind:class="[curItem === 0 ? 'selected' : '']" v-if="UserData.proofs.proofImgPath != null  && UserData.proofs.proofImgPath != ''"><text class="iconfont">&#xe692;</text>{{UserData.proofs.proofImgPath != '' ? '身份认证' : '身份认证'}}</text>
            <text class='service' v-bind:class="[curItem === 1 ? 'selected' : '']" v-if="UserData.proofs.userImgPath != null  && UserData.proofs.userImgPath != ''"><text class="iconfont">&#xe6fa;</text>{{UserData.proofs.userImgPath != '' ? '形象认证' : '形象认证'}}</text>
            <text class='service' v-bind:class="[curItem === 2 ? 'selected' : '']" v-if="UserData.proofs.guideImgPath != null  && UserData.proofs.guideImgPath != ''"><text class="iconfont">&#xe693;</text>{{UserData.proofs.guideImgPath != '' ? '导游认证' : '导游认证'}}</text>
            <text class='service' v-bind:class="[curItem === 2 ? 'selected' : '']" v-if="UserData.proofs.otherImgPath !=null  && UserData.proofs.otherImgPath != ''"><text class="iconfont">&#xe694;</text>{{UserData.proofs.otherImgPath != '' ? '其它认证' : ''}}</text>
          </view>
          <swiper class="swiper" v-if=" UserServes && UserServes.length != 0   " indicator-active-color="#EB5248" :indicator-dots="UserServes.length > 1 ? true : false" circular :autoplay="true" :interval="4000" :duration="500">
            <swiper-item v-if=" UserServes && UserServes.length != 0 && index <= 5 " v-for="(item,index) of UserServes" :key="index" @click.stop="service(item.code)">
              <view class='item'>
                <img mode="aspectFill" :src="item.serveCoverImg.indexOf(',')>-1 ? item.serveCoverImg.split(',')[0] : item.serveCoverImg">
                <view class='item-info'>
                  <view class='title'>{{item.title}}</view>
                  <view class='price money_cor'>￥<text class='price-big'>{{item.pushPrice}}元</text>/{{item.servePriceName}}</view>
                  <view class="type_cor">{{item.pushTypeStr}}</view>
                </view>
              </view>
            </swiper-item>
          </swiper>

          <!-- <view class="not_list" v-if="UserServes && UserServes && UserServes.length == 0  ">
            <view>暂未发布服务项</view>
          </view> -->
          <view class='connect-wrapper'>
            <text class='connect globalCololr fr' @click="details('name')">Ta的主页</text>
            <text class='connect globalCololr' @click="msgSo" v-if="myProfileX == 1">私聊Ta</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<!--JS-->
<script>
export default {
  components: {},
  data () {
    return {
      // #ifdef APP-PLUS
      myProfileX: 1,
      // #endif
      //#ifdef MP-WEIXIN
      myProfileX: 0,
      // #endif
      UserData: '',
      labelVal: '',
      labelData: '',
      labelText: '',
      UserServes: '',
      userCode: '',
      attention: false,
      topshow: false,
      topSet: false,
      lastX: 0,
      lastY: 0,
      touch: "",
      innerAudioContext: '',
      optionData: ''
    }
  },
  watch: {
    touch (e) {
      // 上滑
      if (e == 2) {
        this.topshow = false
      }
      // 下滑
      if (e == 3) {
        this.topshow = true
      }
    }
  },
  methods: {
    shield () {
      uni.showModal({
        title: '拉黑',
        content: '要拉黑该用户吗？',
        success: function (res) {
          if (res.confirm) {
            //console.log('用户点击确定');

          } else if (res.cancel) {
            //console.log('用户点击取消');
          }
        }
      });
    },
    report () {
      uni.showModal({
        title: '举报',
        content: '要举报该用户吗？',
        success: function (res) {
          if (res.confirm) {
            //console.log('用户点击确定');

          } else if (res.cancel) {
            //console.log('用户点击取消');
          }
        }
      });
    },
    msgSo () {
      // uni.showToast({
      //   title: '对方不在线',
      //   icon: 'none',
      //   duration: 3000
      // })
      if (uni.getStorageSync('uniIdToken')) {
        // #ifdef APP-PLUS
        uni.navigateTo({
          url: '/pagesIM/im/im-chat/im-chat?title=' + this.UserData.user.nickname + '&fromUser=' + this.UserData.user._id
        });
        // #endif
        //#ifdef MP-WEIXIN
        uni.navigateTo({
          url: '/pagesA/message/HM-chat/HM-chat?from_id=' + this.UserData.user._id + '&nickName=' + this.UserData.user.nickname,
          animationDuration: 300
        })
        // #endif

      } else {
        uni.navigateTo({
          url: '/pagesA/login/auth/login'
        });
      }
    },
    handletouchmove: function (event) {
      // ////console.log(event)
      let currentX = event.touches[0].pageX
      let currentY = event.touches[0].pageY
      let tx = currentX - this.lastX
      let ty = currentY - this.lastY
      let text = ""
      if (Math.abs(tx) > Math.abs(ty)) {
        //左右方向滑动
        if (tx < 0)
          // 向左滑动
          text = "0"
        else if (tx > 0)
          // 向右滑动
          text = "1"
      } else {
        //上下方向滑动
        if (ty < 0)
          // 向上滑动
          text = "2"
        else if (ty > 0)
          // 向下滑动
          text = "3"
      }
      //将当前坐标进行保存以进行下一次计算
      this.lastX = currentX
      this.lastY = currentY
      this.touch = text;
      ////console.log(this.touch)
    },
    handletouchtart: function (event) {
      // 赋值
      this.lastX = event.touches[0].pageX
      this.lastY = event.touches[0].pageY
    },
    topName () {
      let vm = this
      clearTimeout(this.timeout);
      vm.timeout = setTimeout(() => {
        vm.topshow = !vm.topshow
      }, 2000 * Math.random());
    },
    attentionBtn () {

    },
    openbtn (code) {
      let vm = this
      uni.navigateTo({
        url: '/pagesB/house/house1/open/open?code=' + vm.UserData.uid
      });
    },
    // 服务
    service (code) {
      uni.navigateTo({
        url: '/pagesB/service/serviceInfo/serviceInfo?code=' + code
      });
    },
    // 年龄过滤
    ages (str) {
      var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
      if (r == null) return false;
      var d = new Date(r[1], r[3] - 1, r[4]);
      if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {
        var Y = new Date().getFullYear();
        // return("年龄   =   "+   (Y-r[1])   +"   周岁");
        return ((Y - r[1]));
      }
      return ("输入的日期格式错误！");
    },
    // 跳转
    details (text) {
      if (text == 'home') {
        uni.navigateTo({
          url: '/pagesB/service/homePage/homePage?code=' + this.UserData.uid
        });
      }
      if (text == 'name') {
        uni.navigateTo({
          url: '/pagesB/service/homePage/homePage?code=' + this.UserData.uid
        });
      }
    },
    openBtn (index) {
      // uni.navigateTo({
      //   url: '/pagesB/house/house1/home/home?code=' + this.UserData.uid
      // });
      // return
      //防止高频点击
      if (this.timer == 1) {
        return;
      }
      this.timer = 1;
      setTimeout(() => {
        this.timer = 0;
      }, 1000)
      // 播放进门声音
      // 进门
      if (index == 0) {
        // 敲门
        const door = uni.createInnerAudioContext();
        door.autoplay = true;
        door.src = 'https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/home/mp3/qiaomen.mp3';
        // 猫叫
        // setTimeout(() => {
        //   const mao = uni.createInnerAudioContext();
        //   mao.autoplay = true;
        //   mao.src = 'https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/home/mp3/mao.mp3';
        // }, 300)
        // setTimeout(() => {
        //   uni.navigateTo({
        //     url: '/pagesB/house/house1/home/home?code=' + this.UserData.uid
        //   });
        //   this.innerAudioContext.stop(() => {});
        // }, 1000)
        //    // 欢迎
        setTimeout(() => {
          //  const name = uni.createInnerAudioContext();
          //  name.autoplay = true;
          //  name.src = 'https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/home/mp3/huanying.mp3';
          uni.showToast({
            title: '管家：主人不在家...',
            icon: 'none',
            duration: 5000
          })
        }, 1000)
      }
      // 出门
      if (index == 1) {
        uni.showToast({
          title: '管家：下次再来做客哟~~',
          icon: 'none',
          duration: 3000
        })
        let vm = this
        // const name = uni.createInnerAudioContext();
        // name.autoplay = true;
        // name.src = 'https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/home/mp3/zaijian.mp3';
        setTimeout(() => {
          if (vm.optionData.type == 'share') {
            uni.switchTab({
              url: '/pages/map/map'
            });
          } else {
            uni.navigateBack({
              delta: 1
            });
          }
          this.innerAudioContext.pause(() => { });
        }, 1500)
      }
      // 赠花
      if (index == 2) {
        uni.showToast({
          title: '暂时没有礼物..',
          icon: 'none',
          duration: 3000
        })
      }
      // 留言
      if (index == 3) {
        uni.showToast({
          title: '暂时没有留言...',
          icon: 'none',
          duration: 3000
        })
      }
    },
  },
  async onLoad (option) {
    let vm = this
    // 小程序码 url转码
    if (option.scene) {
      function getQueryVariable (url, variable) {
        var query = decodeURIComponent(url);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
          var pair = vars[i].split("=");
          if (pair[0] == variable) {
            return pair[1];
          }
        }
        return (false);
      }
      option.type = getQueryVariable(option.scene, "type")
      option.code = getQueryVariable(option.scene, "code")
    }
    vm.optionData = option
    vm.innerAudioContext = uni.createInnerAudioContext();
    vm.innerAudioContext.autoplay = true;
    vm.innerAudioContext.loop = true;
    vm.innerAudioContext.src = 'https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/home/mp3/che.mp3';
    if (option.type == 'myhome') {
      // uni.showToast({
      //   title: '主人，目前您只能进入到家门口，室内还在设计装修，稍后开放...',
      //   icon: 'none',
      //   duration: 5000
      // })
    }
    setTimeout(() => {
      vm.topshow = true
    }, 1000)
    // 获取个人信息
    this.UserData = await this.$request("home", "getUserHome", {
      uid: option.code,
    });
  }
}
</script>

<!--css样式-->
<style lang="scss" scoped>
.swiper {
  height: 200upx;
}
.sex {
  padding-left: 10rpx;
}
.topdow {
  -webkit-transform: translateY(-300px);
  transform: translateY(-300px);
  -webkit-transition: 1s all ease;
  transition: 1s all ease;
}
.topgo {
  -webkit-transform: translateY(700px);
  transform: translateY(700px);
  -webkit-transition: 1s all ease;
  transition: 1s all ease;
}
.detail-wrapper {
  position: absolute;
  width: 90%;
  left: 5%;
  top: -500px;
  background: #fff;
  border-radius: 12rpx;
  padding-bottom: 10px;
  z-index: 9999;
}
.lu {
  width: 170rpx;
  height: 318rpx;
  position: absolute;
  bottom: 60rpx;
  right: 20rpx;
  z-index: 500;
}
.email {
  width: 200rpx;
  height: 533rpx;
  position: absolute;
  bottom: 60rpx;
  left: 10rpx; // z-index: 99;
}
.hua {
  width: 170rpx;
  height: 318rpx;
  position: absolute;
  bottom: 60rpx;
  left: 20rpx;
  z-index: 100;
}
#home {
  width: 100%;
  height: 100vh;
  position: fixed;
  -webkit-transform: translateY(0px);
  transform: translateY(0px);
  -webkit-transition: 1s all ease;
  transition: 1s all ease;
}
.home_bg {
  width: 100%;
  height: 100vh;
  position: relative;
}
.home_img {
  width: 100%;
  height: 100vh;
}
.fengche {
  position: absolute;
  right: 0;
  top: -100px;
  margin-left: -25px;
  image {
    width: 192px;
    height: 108px;
  }
}
.open2 {
  position: absolute;
  right: 0;
  bottom: -50px;
}
.open {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 75px;
  height: 70px;
  margin-left: -35px;
}
.open image {
  width: 75px;
  height: 70px;
}
/*名片*/
.not_list {
  text-align: center;
  border: 1px solid #c6c6c6;
  padding: 10px 30px;
  margin: 20px 10px;
  color: #c6c6c6;
  border-radius: 2px;
}
.money_cor {
  color: #fa436a;
}
.globalCololr {
  color: #333;
  background: #fdd149;
}
.detail {
  position: fixed;
  top: 10px;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #ddd;
  transition: all 0.5s;
}
.detail-close {
  position: relative;
  width: 32px;
  height: 32px;
  margin: -64px auto 0 auto;
  clear: both;
  font-size: 32px;
}
.header {
  position: relative;
  color: #fff;
  width: 100%;
  height: 300rpx;
  border-top-left-radius: 12rpx;
  border-top-right-radius: 12rpx;
  z-index: 0;
  overflow: hidden;
}
.content-wrapper {
  position: relative;
  background: rgba(7, 17, 27, 0.3);
  width: 100%;
  height: 100%;
  font-size: 32rpx;
}
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: blur(8rpx);
  z-index: -2;
}
.background img {
  width: 100%;
  height: 100%;
}
.header_icon {
  position: absolute;
  top: 20rpx;
  right: 30rpx;
  display: inline-block;
  width: 80rpx;
  height: 40rpx;
  line-height: 40rpx;
  text-align: center;
  z-index: 3;
  font-size: 24rpx;
  padding: 0 16rpx;
  border-radius: 20rpx;
}
.avatar {
  position: absolute;
  left: 30rpx;
  top: 30rpx;
}
.avatar img {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
}
.avatar .avatar_icon {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  display: inline-block;
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  /*background:#FCD355;*/
  color: #fff;
  text-align: center;
  line-height: 30rpx;
}
.user_info {
  position: absolute;
  left: 170rpx;
  top: 17%;
}
.user_info .name {
  font-size: 32rpx;
  color: #fff;
}
.user_info .others {
  font-size: 26rpx;
  margin-top: 8rpx;
  color: #fff;
}
.others .address,
.others .age-wrapper {
  display: inline-block;
  color: #fff;
}
.others .age-wrapper {
  margin-left: 20rpx;
  font-size: 22rpx;
  height: 32rpx;
  line-height: 30rpx;
  padding: 0 16rpx;
  border-radius: 4rpx;
}
.age-wrapper_name {
  display: inline-block;
  margin-left: 20rpx;
  font-size: 22rpx;
  height: 32rpx;
  line-height: 30rpx;
  padding: 5rpx 16rpx;
  border-radius: 4rpx;
}
.label-wrapper {
  position: absolute;
  top: 165rpx;
  left: 20rpx;
  font-size: 24rpx;
  line-height: 50rpx;
}
.label-wrapper .label {
  border: 1rpx solid #fff;
  padding: 4rpx 16rpx 6rpx;
  margin-left: 16rpx;
  border-radius: 6rpx;
  font-size: 18rpx;
  color: #fff;
}
.focus-wrapper {
  position: absolute;
  bottom: 10rpx;
  width: 100%;
  padding: 0 30rpx;
  box-sizing: border-box;
  color: #fcd355;
  font-size: 24rpx;
}
.focus-wrapper .focus_num {
  display: inline-block;
  position: absolute;
  right: 38rpx;
  bottom: 121rpx;
  color: #fff;
}
.focus-wrapper .focus_btn {
  float: right;
  font-size: 20rpx;
  color: #000;
  padding: 0 25rpx;
  border-radius: 30rpx;
  text {
    font-size: 20rpx;
  }
}
.container-wrapper {
  width: 100%;
  box-sizing: border-box;
  padding: 20rpx;
}
.service-wrapper {
  margin: 0 0 20rpx 0;
  height: 60rpx;
  overflow: hidden;
  text {
    color: #666666;
  }
}
.service-wrapper .service {
  padding: 8rpx 20rpx;
  background: #ddd;
  font-size: 24rpx;
  border-radius: 26rpx;
  margin-right: 12rpx;
}
.service-wrapper .selected {
  background: #fcd355;
}
.connect-wrapper {
  margin-top: 20rpx;
  width: 100%;
  text-align: center;
}
.connect-wrapper .connect {
  display: inline-block;
  color: #fff !important; // background: linear-gradient(to right, #eb5dff, #a16cfa)!important;
  background: $fontLinear;
  height: 60rpx;
  line-height: 60rpx;
  width: 40%;
  text-align: center;
  border-radius: 8rpx;
  font-size: 28rpx;
  margin: 0 5%;
}
.item {
  display: flex;
  margin-bottom: 20rpx;
}
.item img {
  flex: 0 250rpx;
  width: 250rpx;
  height: 150rpx;
}
.item .item-info {
  flex: 0 365rpx;
  width: 365rpx;
  padding-left: 20rpx;
  color: #666666;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
}
.item-info .title {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 28rpx;
}
.item-info .price {
  font-size: 30rpx;
  width: 100%;
}
.item-info .price-big {
  font-size: 35rpx;
}
.item-info .type_cor {
  padding: 10rpx 0;
  background: $fontLinear;
  color: #fff;
  border-radius: 20rpx;
  padding: 5rpx 26rpx;
}
</style>

