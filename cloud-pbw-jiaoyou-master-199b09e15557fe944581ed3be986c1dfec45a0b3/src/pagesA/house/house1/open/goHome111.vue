<!--模板-->
<template>
  <view id="home">
    <view class="home_bg">
      <scroll-view scroll-x :scroll-with-animation="false">
        <!--背景-->
        <image class="bg_h" src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/house/gohome.gif" alt=""></image>

        <!--门-->
        <!--<view class="home_men" @click="homegoto()">-->
        <!--<image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/house/door.png" alt=""></image>-->
        <!--<p class="home_title">NO.192932</p>-->
        <!--&lt;!&ndash;进门指纹&ndash;&gt;-->
        <!--<view class="home_gif" @click="homegoto()">-->
        <!--<image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/house/gohome.gif" alt=""></image>-->
        <!--</view>-->
        <!--</view>-->

        <!--&lt;!&ndash;说明板&ndash;&gt;-->
        <!--<view class="home_block" >-->
        <!--<image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/home/blackboard.png" alt=""></image>-->
        <!--<view class="block_title">这是我的家的个人说明哦~！~这是我的家的个人说明哦~！~这是我的家的个人说明哦~！~这是我的家的个人说明哦~！~这是我的家的个人说明哦~！~这是我的家的个人说明哦~！~这是我的家的个人说明哦~！~这是我的家的个人说明哦~！~</view>-->
        <!--</view>-->
        <!--进门声音-->
        <!--<audio  id="MyAudio2" hidden>-->
        <!--<source src="../../../../static/mp3/men.mp3" type="audio/mpeg">-->
        <!--</audio>-->

      </scroll-view>
    </view>

  </view>
</template>


<!--JS-->
<script>

export default {
  components: {

  },
  data () {
    return {}
  },
  methods: {
    // 去我家
    homegoto () {
      let vm = this
      if (this.$route.query.type) {
        if (this.$route.query.type == 'myhome') {
          MyAudio2.play();
          setTimeout(function () {
            vm.$router.push('/home?type=myhome')
          }, 1500)
          return
        }
      }
      MyAudio2.play();
      setTimeout(function () {
        vm.$router.push('/home')
      }, 1500)
    },
  },
  mounted: function () {

    // var iheight=document.documentElement.getBoundingClientRect().height
    // ////console.log(iheight)
    // this.$refs.bg_h.style.height = iheight + 'upx'
  },
  created: function () {
  }
}
</script>


<!--css样式-->
<style lang="scss" scoped>
.bg_h {
  width: 1295upx;
  height: 100vh;
}

#home {
  width: 100%;
  height: 100%;
  position: relative;
}
.home_bg {
  width: 100%;
  height: 100%;
  position: relative;
}

.content {
  width: 100%;
  height: 100%;
  /*background: url(https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/home/homes.png")no-repeat;*/
  /*background-size: cover;*/
}
.box_100 {
  height: 100upx;
  width: auto;
  display: inline;
  white-space: nowrap;
  overflow-x: scroll;
  float: left;
  overflow-y: hidden;
}
.box_200 {
  display: inline-block;
  padding-right: 10upx;
  height: 200rem/2 / $rem;
  width: 200rem/2 / $rem;
}

.home_men {
  position: absolute;
  bottom: 43upx;
  right: 135upx;
}
.home_men > img {
  width: 489px/2;
  height: 856px/2;
}
.home_title {
  position: absolute;
  top: 130upx;
  left: 118upx;
  font-weight: 900;
  font-size: 16upx;
  transform: rotate(-13deg);
  -ms-transform: rotate(-13deg); /* IE 9 */
  -moz-transform: rotate(-13deg); /* Firefox */
  -webkit-transform: rotate(-13deg); /* Safari 和 Chrome */
  -o-transform: rotate(-13deg); /* Opera */
}
.home_block {
  position: absolute;
  left: 42upx;
  bottom: 67upx;
}
.home_block > img {
  width: 211rem/2 / $rem;
  height: 264rem/2 / $rem;
}
.home_block .block_title {
  color: #fff;
  font-size: 8upx;
  font-weight: 900;
  position: absolute;
  left: 22upx;
  top: 19upx;
  max-width: 126rem/2 / $rem;
  max-height: 180rem/2 / $rem;
  overflow: hidden;
  transform: rotate(-4deg);
}
.home_gif {
  position: absolute;
  bottom: 191upx;
  right: 83upx;
}
.home_gif img {
  width: 50upx;
  height: 50upx;
  border-radius: 50%;
}
</style>
<style>
#home .xs-container {
  height: 100%;
}
</style>

