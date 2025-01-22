<!--模板-->
<template>
  <view id="home" @touchstart="street()">
    <md-scroll-view ref="scrollView" :bouncing="false" :scrolling-x="true" :scrolling-y="false">
      <view class="home_bg">
        <img ref="bg_h" src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/home/home.png" alt="">
        <!--窗户-->
        <view class="chuang">
          <img src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/home/chuang.gif" alt="">
        </view>

        <!--座椅-->
        <view class="zhuo">
          <img src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/home/zhuo.png" alt="">
        </view>

        <!--黑板-->
        <view class="ban">
          <img src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/home/blackboardbg.png" alt="">
          <!--心情-->
          <view class="xinqing">
            <img src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/home/newspaper.png" alt="">
          </view>
          <!--日记-->
          <view class="riji">
            <img src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/home/papaer.png" alt="">
          </view>
          <!--旅途-->
          <view class="lvtu">
            <img src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/home/letter.png" alt="">
          </view>
          <!--便签-->
          <view class="bianqian">
            <img src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/home/memo.png" alt="">
          </view>
        </view>

        <!--照片-->
        <view class="pian">
          <img src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/home/stringbg.png" alt="">
          <ul>
            <li>
              <img src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/home/name.jpg" alt="">
            </li>
            <li>
              <img src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/home/name.jpg" alt="">
            </li>
            <li>
              <img src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/home/name.jpg" alt="">
            </li>
            <li>
              <img src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/home/name.jpg" alt="">
            </li>
            <li>
              <img src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/home/name.jpg" alt="">
            </li>
          </ul>
        </view>

        <!--灯具-->
        <view class="deng">
          <img src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/home/lighting.png" alt="">
        </view>

        <!--宠物-->
        <view class="pet">
          <img src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/home/pet.gif" alt="">
        </view>

      </view>
      <!--出门-->
      <view class="chu" @click="chuBtn()">出门</view>
    </md-scroll-view>

    <!--&lt;!&ndash;出门&ndash;&gt;-->
    <!--<audio controls id="MyAudio2" hidden>-->
    <!--<source src="../../../../static/mp3/guan.mp3" type="audio/mpeg">-->
    <!--</audio>-->
    <!--&lt;!&ndash;小窝音乐&ndash;&gt;-->
    <!--<audio  id="MyAudio3"  hidden  loop>-->
    <!--<source src="../../../../static/mp3/home.mp3" type="audio/mpeg">-->
    <!--</audio>-->

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
    chuBtn () {
      let vm = this
      if (vm.$route.query.type == 'myhome') {
        MyAudio2.play();
        setTimeout(function () {
          vm.$router.push('/myhome')
        }, 1000)
      } else {
        MyAudio2.play();
        setTimeout(function () {
          vm.$router.push('/')
        }, 1000)

      }

    },
    street () {
      MyAudio3.play();
    }
  },
  mounted: function () {
    tabShow()// 隐藏tab
    // var iheight=document.documentElement.getBoundingClientRect().height
    // ////console.log(iheight)
    // this.$refs.bg_h.style.height = iheight + 'rem/$rem'
  }
}
</script>


<!--css样式-->
<style lang="scss" scoped>
.bianqian {
  position: absolute;
  left: 127rem / $rem;
  top: 33rem / $rem;
}
.bianqian > img {
  width: 179rem/2 / $rem;
  height: 107rem/2 / $rem;
}
.lvtu {
  position: absolute;
  right: 127rem / $rem;
  top: 63rem / $rem;
}
.lvtu > img {
  width: 211rem/2 / $rem;
  height: 140rem/2 / $rem;
}
.riji {
  position: absolute;
  right: 27rem / $rem;
  bottom: 33rem / $rem;
}
.riji > img {
  width: 377rem/2 / $rem;
  height: 229rem/2 / $rem;
}
.xinqing {
  position: absolute;
  left: 27rem / $rem;
  bottom: 33rem / $rem;
}
.xinqing > img {
  width: 239rem/2 / $rem;
  height: 327rem/2 / $rem;
}
.zhuo {
  position: absolute;
  left: 10rem / $rem;
  bottom: 19rem / $rem;
}
.zhuo img {
  width: 572rem/2 / $rem;
  height: 533rem/2 / $rem;
}
.ban {
  position: absolute;
  top: 100rem / $rem;
  right: 100rem / $rem;
}
.ban > img {
  width: 1052rem/2 / $rem;
  height: 594rem/2 / $rem;
}
.deng {
  position: absolute;
  top: 0rem / $rem;
  left: 150rem / $rem;
}
.deng img {
  width: 289rem/2 / $rem;
  height: 388rem/2 / $rem;
}
.pian {
  position: absolute;
  top: 1rem / $rem;
  right: 1rem / $rem;
}
.pian > img {
  width: 1457rem/2 / $rem;
  height: 98rem/2 / $rem;
}
.pian li img {
  width: 100px;
  height: 60px;
  border: 1px solid #fff;
  border-radius: 6px;
}
.pian li {
  float: left;
  padding: 10px 30px;
}
.pet {
  position: absolute;
  bottom: 30rem / $rem;
  left: 700rem / $rem;
}
.pet img {
  width: 240rem/2 / $rem;
  height: 240rem/2 / $rem;
}
.chuang {
  position: absolute;
  top: 55rem / $rem;
  left: 110rem / $rem;
}
.chuang img {
  width: 452rem/2 / $rem;
  height: 696rem/2 / $rem;
}
#home {
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
  height: 100rem / $rem;
  width: auto;
  display: inline;
  white-space: nowrap;
  overflow-x: scroll;
  float: left;
  overflow-y: hidden;
}
.box_200 {
  display: inline-block;
  padding-right: 10rem / $rem;
  height: 200rem/2 / $rem;
  width: 200rem/2 / $rem;
}
.home_bg {
  width: 1126rem / $rem;
  height: 100vh;
  position: relative;
}
.home_bg > img {
  width: 1126rem / $rem;
  height: 100%;
}
.chu {
  background: #000;
  width: 50rem / $rem;
  height: 50rem / $rem;
  line-height: 50rem / $rem;
  border-radius: 50rem / $rem;
  position: absolute;
  top: 30rem / $rem;
  left: 50rem / $rem;
  text-align: center;
  color: #fff;
  z-index: 99999;
}
</style>
<style>
#home .xs-container {
  height: 100%;
}
</style>
