<!--模板-->
<template>
  <view id="home">
    <view class="home_bg">
      <!-- 导航 -->
      <view>
        <!-- 左侧 -->
        <view class="iconList" style="left: 30rpx;top: 160rpx;">
          <view class="iconItem" @click="closeHouse"><text class="iconfont">&#xe723;</text></view>
          <view>出门</view>
        </view>
        <view class="iconList" style="left: 30rpx;bottom: 550rpx;">
          <view class="iconItem" @click="house(2)"><text class="iconfont">&#xe6f8;</text></view>
          <view>相册</view>
        </view>
        <view class="iconList" style="left: 30rpx;bottom: 400rpx;">
          <view class="iconItem" @click="house(3)"><text class="iconfont">&#xe725;</text></view>
          <view>心情</view>
        </view>
        <view class="iconList" style="left: 30rpx;bottom: 250rpx;">
          <view class="iconItem" @click="house(4)"><text class="iconfont">&#xe721;</text></view>
          <view>技能</view>
        </view>
        <view class="iconList" style="left: 30rpx;bottom: 100rpx;">
          <view class="iconItem" @click="house(5)"><text class="iconfont">&#xe726;</text></view>
          <view>私聊</view>
        </view>
        <!-- 右侧 -->
        <!-- #ifdef APP-PLUS -->
        <view class="iconList" style="right: 30rpx;top: 160rpx;">
          <view class="iconItem" @click="shareHouse"><text class="iconfont">&#xe728;</text></view>
          <view>分享</view>
        </view>
        <!-- #endif -->
        <!-- #ifdef MP-WEIXIN -->
        <button class="iconList" style="right: 30rpx;top: 160rpx;" @onShareAppMessage="onShareAppMessage" open-type="share">
          <view class="iconItem" @click="shareHouse"><text class="iconfont">&#xe728;</text></view>
          <view>分享</view>
        </button>
        <!-- #endif -->
        <view class="iconList" style="right: 30rpx;bottom: 550rpx;">
          <view class="iconItem" @click="index(2)"><text class="iconfont">&#xe724;</text></view>
          <view>采摘</view>
        </view>
        <view class="iconList" style="right: 30rpx;bottom: 400rpx;">
          <view class="iconItem" @click="index(1)"><text class="iconfont">&#xe727;</text></view>
          <view>结婚</view>
        </view>
        <view class="iconList" style="right: 30rpx;bottom: 250rpx;">
          <view class="iconItem" @click="index(0)"><text class="iconfont">&#xe710;</text></view>
          <view>生娃</view>
        </view>
        <view class="iconList" style="right: 30rpx;bottom: 100rpx;">
          <view class="iconItem" @click="index(3)"><text class="iconfont">&#xe722;</text></view>
          <view>好友</view>
        </view>
      </view>
      <!-- 背景 -->
      <view>
        <image class="jie_bg" src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/house/jie.gif" alt=""></image>
        <image class="homeimg_bg" src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/house/hose.png" alt=""></image>
      </view>
      <!-- 物品 -->
      <view>
        <!--        孩子-->
        <!-- <image class="haizi" src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/house/haizi.png"></image> -->
        <!--        花-->
        <!--        <image class="hua" src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/house/hua.gif"></image>-->
      </view>
      <!-- 猫 -->
      <view class="main" @click="kitt()">
        <view class="zhi">成长值 {{kittData}}（成长中..）</view>
        <text class="stand"></text>
        <view class="cat">
          <view class="body"></view>
          <view class="head">
            <view class="ear"></view>
            <view class="ear"></view>
          </view>
          <view class="face">
            <view class="nose"></view>
            <view class="whisker-container">
              <view class="whisker"></view>
              <view class="whisker"></view>
            </view>
            <view class="whisker-container">
              <view class="whisker"></view>
              <view class="whisker"></view>
            </view>
          </view>
          <view class="tail-container">
            <view class="tail">
              <view class="tail">
                <view class="tail">
                  <view class="tail">
                    <view class="tail">
                      <view class="tail">
                        <view class="tail"></view>
                      </view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!--分享-->
    <share :shareData="shareData" v-if="shareData.Name != ''" :shareShow="shareShow"></share>
  </view>
</template>

<!--JS-->
<script>
import share from '@/components/share';
export default {
  components: {
    share
  },
  data () {
    return {
      kittData: '',
      userCode: '',
      shareShow: false,
      shareData: {
        Name: '',
        NameImg: '',
        Title: '',
        Text: '',
        TitleImg: '',
        Money: '',
        Type: '',
        Path: "",
        Url: "",
        nameData: '',
        attention: false
      },
      UserData: ''
    }
  },
  methods: {
    onShareAppMessage (res) {
      ////console.log("555555555555")
      if (res.from === 'button') { // 来自页面内分享按钮
        ////console.log(res.target)
      }
      return {
        title: '[' + this.UserData.name + '] 的小房子 - 快进来做客吧~',
        path: "/pagesB/house/house1/open/open?code=" + this.UserData.uid
      }
    },
    house (index) {
      if (index == 2) {
        uni.navigateTo({
          url: "/pagesB/myhome/photoSort/photoSort?code=" + this.userCode
        });
      }
      if (index == 3) {
        uni.navigateTo({
          url: "/pagesB/myhome/nearbtList/nearbtList?code=" + this.userCode
        });
      }
      if (index == 4) {
        uni.navigateTo({
          url: '/pagesB/service/homePage/homePage?code=' + this.userCode
        });
      }
      if (index == 5) {
        if (uni.getStorageSync('uniIdToken')) {
          uni.navigateTo({
            url: '/pagesA/message/HM-chat/HM-chat?from_id=' + this.userCode + '&nickName=私聊Ta',
            animationDuration: 300
          })
        } else {
          uni.navigateTo({
            url: '/pagesA/login/auth/login'
          });
        }
      }
    },
    index (index) {
      if (index == 0) {
        uni.showToast({
          title: '还没有结婚',
          icon: 'none',
          duration: 1000
        })
      }
      if (index == 1) {
        uni.showToast({
          title: '对方宠物还未到年龄',
          icon: 'none',
          duration: 1000
        })
      }
      if (index == 2) {
        uni.showToast({
          title: '还没有能量...',
          icon: 'none',
          duration: 1000
        })
      }
      if (index == 3) {
        if (uni.getStorageSync('uniIdToken')) {
          uni.navigateTo({
            url: '/pagesA/message/friend/friend?index=0',
            animationDuration: 300
          })
        } else {
          uni.navigateTo({
            url: '/pagesA/login/auth/login'
          });
        }
      }
    },
    randomNum (min, max) {
      return Math.floor(min + Math.random() * (max - min));
    },
    closeHouse () {
      //console.log(this.mao)
      uni.navigateBack({
        delta: 2
      });
    },
    kitt () {
      const mao = uni.createInnerAudioContext();
      mao.autoplay = true;
      mao.src = 'https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/home/mp3/mao.mp3';
      uni.showToast({
        title: 'Zzzzzzz...',
        icon: 'none',
        duration: 1000
      })
    },
    shareHouse () {
      this.shareShow = true
    }
  },
  onLoad (option) {
    let vm = this
    vm.userCode = option.code
    vm.kittData = vm.randomNum(3, 82)
    // 获取个人信息
    //   fly.post(
    //     "/user/oneself/getUserDetail", {
    //     uid: option.code
    //   }, {
    //     headers: {
    //       "content-type": "application/x-www-form-urlencoded"
    //     }
    //   }).then(function (res) {
    //       if (res.code == "000000") {
    //         vm.UserData = res.data;
    //         vm.shareData = {
    //           Name: res.data.name,
    //           NameImg: res.data.headImg,
    //           Title: '[' + res.data.name + '] 的小房子 - 快进来做客吧~',
    //           Text: '我有很多秘密哦，快来看看吧~',
    //           TitleImg: res.data.headImg,
    //           Money: '99999暴击',
    //           Type: "2",
    //           Path: "pagesB/house/house1/open/open",
    //           Id: 'type=share&code=' + res.data.uid,
    //           Url: "www.peibanwan.com",
    //           nameData: res.data
    //         }
    //       } else {
    //         uni.showToast({
    //           title: res.msg,
    //           icon: "none",
    //           duration: 3000
    //         });
    //       }
    //     });
  }
}
</script>

<!--css样式-->
<style lang="scss" scoped>
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
  border-radius: 35px;
}
button.empty::after {
  border: none;
}
.iconList {
  position: fixed;
  z-index: 300;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  color: #fff;
  > p {
    font-size: 22rpx;
    color: #fff;
  }
}
.iconItem {
  color: #fff;
  box-shadow: 1px 1px 5px #333;
  padding: 20rpx;
  border-radius: 50%;
  background: $fontLinear;
  z-index: 300;
  display: flex;
  align-items: center;
  text-align: center;
}
#home {
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: #86643f;
}
.home_bg {
  width: 100vw;
  height: 100vh;
  position: fixed;
  .jie_bg {
    z-index: 90;
    width: 100vw;
    position: absolute;
    height: 70vh;
    right: -50rpx;
    top: -50rpx;
  }
  .homeimg_bg {
    width: 100%;
    height: 100vh;
    z-index: 100;
    position: fixed;
  }
  .hua {
    position: absolute;
    right: 442rpx;
    top: 366rpx;
    width: 426rpx;
  }
  .haizi {
    position: absolute;
    right: 742rpx;
    bottom: 166rpx;
    width: 400rpx;
    height: 300rpx;
  }
}
.open {
  position: absolute;
  left: 50%;
  top: 40%;
  width: 150px;
  height: 140px;
  margin-left: -75px;
}
.open image {
  width: 150px;
  height: 140px;
}
</style>

<style>
@keyframes tail {
  6.6666666667% {
    transform: rotate(0);
  }
  10% {
    transform: rotate(10deg);
  }
  16.6666666667% {
    transform: rotate(-5deg);
  }
  20% {
    transform: rotate(30deg);
  }
  26.6666666667% {
    transform: rotate(-2deg);
  }
  46.6666666667% {
    transform: rotate(10deg);
  }
  53.3333333333% {
    transform: rotate(-5deg);
  }
  56.6666666667% {
    transform: rotate(10deg);
  }
}
@keyframes body {
  6.6666666667% {
    transform: scaleY(1);
  }
  10% {
    transform: scaleY(1.15);
  }
  16.6666666667% {
    transform: scaleY(1);
  }
  20% {
    transform: scaleY(1.25);
  }
  26.6666666667% {
    transform: scaleY(1);
  }
  46.6666666667% {
    transform: scaleY(1.15);
  }
  53.3333333333% {
    transform: scaleY(1);
  }
  56.6666666667% {
    transform: scaleY(1.15);
  }
}
@keyframes left-whisker {
  6.6666666667% {
    transform: rotate(0);
  }
  10% {
    transform: rotate(0deg);
  }
  16.6666666667% {
    transform: rotate(-5deg);
  }
  20% {
    transform: rotate(0deg);
  }
  26.6666666667% {
    transform: rotate(0deg);
  }
  46.6666666667% {
    transform: rotate(10deg);
  }
  53.3333333333% {
    transform: rotate(-5deg);
  }
  56.6666666667% {
    transform: rotate(10deg);
  }
}
@keyframes right-whisker {
  6.6666666667% {
    transform: rotate(180deg);
  }
  10% {
    transform: rotate(190deg);
  }
  16.6666666667% {
    transform: rotate(180deg);
  }
  20% {
    transform: rotate(175deg);
  }
  26.6666666667% {
    transform: rotate(190deg);
  }
  46.6666666667% {
    transform: rotate(180deg);
  }
  53.3333333333% {
    transform: rotate(185deg);
  }
  56.6666666667% {
    transform: rotate(175deg);
  }
}
@keyframes left-ear {
  0% {
    transform: rotate(-20deg);
  }
  6.6666666667% {
    transform: rotate(-6deg);
  }
  13.3333333333% {
    transform: rotate(-15deg);
  }
  26.6666666667% {
    transform: rotate(-15deg);
  }
  33.3333333333% {
    transform: rotate(-30deg);
  }
  40% {
    transform: rotate(-30deg);
  }
  46.6666666667% {
    transform: rotate(0deg);
  }
  53.3333333333% {
    transform: rotate(0deg);
  }
  60% {
    transform: rotate(-15deg);
  }
  80% {
    transform: rotate(-15deg);
  }
  93.3333333333% {
    transform: rotate(-6deg);
  }
  100% {
    transform: rotateZ(-6deg);
  }
}
@keyframes right-ear {
  0% {
    transform: rotateZ(-16deg);
  }
  6.6666666667% {
    transform: rotateZ(-16deg);
  }
  13.3333333333% {
    transform: rotateZ(-19deg);
  }
  26.6666666667% {
    transform: rotateZ(-19deg);
  }
  33.3333333333% {
    transform: rotateZ(-30deg);
  }
  36.6666666667% {
    transform: rotateZ(-19deg);
  }
  37.3333333333% {
    transform: rotateZ(-30deg);
  }
  38% {
    transform: rotateZ(-19deg);
  }
  40% {
    transform: rotateZ(-19deg);
  }
  40.6666666667% {
    transform: rotateZ(-30deg);
  }
  41.3333333333% {
    transform: rotateZ(-19deg);
  }
  46.6666666667% {
    transform: rotateZ(-9deg);
  }
  53.3333333333% {
    transform: rotateZ(-9deg);
  }
  60% {
    transform: rotateZ(-19deg);
  }
  60.6666666667% {
    transform: rotateZ(-30deg);
  }
  61.3333333333% {
    transform: rotateZ(-19deg);
  }
  62.6666666667% {
    transform: rotateZ(-19deg);
  }
  63.3333333333% {
    transform: rotateZ(-30deg);
  }
  64% {
    transform: rotateZ(-19deg);
  }
  80% {
    transform: rotateZ(-19deg);
  }
  93.3333333333% {
    transform: rotateZ(-16deg);
  }
  100% {
    transform: rotateZ(-16deg);
  }
}
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.zhi {
  position: absolute;
  top: 100rpx;
  right: 100rpx;
  border-radius: 20px;
  color: #fff;
  font-weight: bold;
}
.main {
  height: 400rpx;
  width: 400rpx;
  position: absolute;
  right: 110rpx;
  bottom: -5rpx;
  z-index: 200;
}
.main .stand {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  height: 20rpx;
  width: 200rpx;
  border-radius: 20rpx;
  background-color: #fd6e72;
  z-index: 2;
}
.main .stand::after {
  content: '';
  position: absolute;
  bottom: -10rpx;
  left: 50%;
  transform: translate(-50%);
  height: 10rpx;
  width: 50rpx;
  border-radius: 20rpx;
  background-color: #fdf9de;
  box-shadow: 0 10rpx 0 #fdf9de, 0 20rpx 0 #fdf9de, 0 30rpx 0 #fdf9de,
    0 40rpx 0 #fdf9de, 0 50rpx 0 #fdf9de, 0 60rpx 0 #fdf9de, 0 70rpx 0 #fdf9de,
    0 80rpx 0 #fdf9de, 0 90rpx 0 #fdf9de, 0 100rpx 0 #fdf9de, 0 110rpx 0 #fdf9de,
    0 120rpx 0 #fdf9de, 0 130rpx 0 #fdf9de, 0 140rpx 0 #fdf9de,
    0 150rpx 0 #fdf9de, 0 160rpx 0 #fdf9de, 0 170rpx 0 #fdf9de;
}
.main .cat {
  width: 110rpx;
  height: 50rpx;
  position: absolute;
  top: calc(50% - 50rpx);
  right: 130rpx;
  border-top-left-radius: 100rpx;
  border-top-right-radius: 100rpx;
}
.main .cat .body {
  width: 110rpx;
  height: 50rpx;
  background-color: #745260;
  position: absolute;
  border-top-left-radius: 100rpx;
  border-top-right-radius: 100rpx;
  animation: body 12s none infinite;
}
.main .cat .head {
  content: '';
  width: 70rpx;
  height: 35rpx;
  background-color: #745260;
  position: absolute;
  top: calc(50% - 10rpx);
  left: -40rpx;
  border-top-left-radius: 80rpx;
  border-top-right-radius: 80rpx;
}
.tail-container {
  position: absolute;
  right: 0;
  bottom: -13rpx;
  z-index: 3;
}
.tail {
  position: absolute;
  height: 30rpx;
  width: 14rpx;
  bottom: -10rpx;
  right: 0;
  border-bottom-right-radius: 5rpx;
  background: #745260;
  z-index: 0;
}
.tail > .tail {
  animation: tail 12s none infinite;
  height: 100%;
  width: 14rpx;
  transform-origin: left;
  border-bottom-left-radius: 20rpx 20rpx;
  border-bottom-right-radius: 20rpx 20rpx;
  border-top-right-radius: 40rpx;
}
.ear {
  position: absolute;
  left: 4rpx;
  top: -4rpx;
  width: 0;
  height: 0;
  border-left: 12rpx solid transparent;
  border-right: 12rpx solid transparent;
  border-bottom: 20rpx solid #745260;
  transform: rotate(-30deg);
  animation: left-ear 12s both infinite;
}
.ear + .ear {
  animation: right-ear 12s both infinite;
  top: -12rpx;
  left: 30rpx;
}
.nose {
  position: absolute;
  bottom: 10rpx;
  left: -10rpx;
  background-color: #fd6e72;
  height: 5rpx;
  width: 5rpx;
  border-radius: 50%;
}
.whisker-container {
  position: absolute;
  bottom: 5rpx;
  left: -36rpx;
  width: 20rpx;
  height: 10rpx;
  transform-origin: right;
  animation: left-whisker 12s both infinite;
}
.whisker-container:nth-child(2) {
  left: -20rpx;
  bottom: 12rpx;
  transform-origin: right;
  transform: rotate(180deg);
  animation: right-whisker 12s both infinite;
}
.whisker {
  position: absolute;
  top: 0;
  width: 100%;
  border: 1rpx solid #fdf9de;
  transform-origin: 100% 0;
  transform: rotate(10deg);
}
.whisker:last-child {
  top: 0;
  transform: rotate(-20deg);
}
</style>
