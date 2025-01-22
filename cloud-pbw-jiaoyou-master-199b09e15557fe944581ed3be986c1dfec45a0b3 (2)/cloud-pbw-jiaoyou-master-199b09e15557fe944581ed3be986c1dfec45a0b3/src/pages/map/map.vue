<template>
  <view class="mapContent">
    <!-- 实时地图 -->
    <view v-if="tabList == 0" class="mapBg">
      <!-- 地图   下雨weather rain   下雪weather snow -->
      <!-- :class="rainState ? 'mapStyle  weather snow' : 'mapStyle'" -->
      <map
        class="mapStyle"
        show-location="true"
        :enable-satellite="satellite"
        enable-indoorMap
        :enable-traffic="traffic"
        :circles="circlesArr"
        :rotate="rotateData"
        :enable-3D="true"
        :skew="skewData"
        :enable-overlooking="true"
        :latitude="latitude"
        :longitude="longitude"
        :markers="covers"
        :scale="scaleData"
        @markertap="markerBtn"
        @regionchange="mapMove"
        @updated="mapUpdated"
        @tap="mapTap"
      >
        <!--匹配-->
        <cover-image
          v-if="mapOk && !cardNameShow && fixboxtop > heightLook"
          class="bottle"
          @click="bottle"
          src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/map/bottle.png"
        ></cover-image>
        <!-- 定位-->
        <cover-image
          class="map_move"
          v-if="mapOk && map_auto != '' && !cardNameShow && fixboxtop > heightLook"
          src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/map/locate.png"
        ></cover-image>
        <!-- 筛选 -->
        <cover-image
          class="harbor"
          v-if="mapOk && !cardNameShow && fixboxtop > heightLook"
          @click="searchFor"
          src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/map/searchFor.png"
        ></cover-image>
        <!--隐私-->
        <cover-image
          class="privacy"
          v-if="mapOk && !cardNameShow && fixboxtop > heightLook"
          @click="privacy"
          src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/map/privacy.png"
        ></cover-image>
        <!-- 港湾 -->
        <cover-image
          v-if="mapOk && !cardNameShow && fixboxtop > heightLook"
          class="makeAWish"
          @click="harborBtn"
          src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/map/gang.png"
        ></cover-image>
        <!--状态-->
        <view class="map_Text" v-if="mapOk && privacyShow && fixboxtop > windowHeight - 80">状态：屏蔽地图所有人</view>
        <!--刷新-->
        <cover-image
          class="Refresh"
          v-if="mapOk && !cardNameShow && fixboxtop > heightLook"
          @click="Refresh"
          src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/map/Refresh.png"
        ></cover-image>
        <!--定位-->
        <cover-image
          class="location"
          v-if="mapOk && !cardNameShow && fixboxtop > heightLook"
          @click="mapBtn"
          src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/map/map.png"
        ></cover-image>
      </map>
      <!-- 新卡片 -->
      <view class="businessCard" v-if="cardNameShow" @tap.stop="cardNameShow = false">
        <view class="detail-wrapper" @tap.stop="">
          <view class="fengche">
            <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/loading.gif"></image>
          </view>
          <view class="header-wrapper">
            <!-- <text class="header_icon globalCololr">工作中</text> -->
            <view class="header">
              <view class="content-wrapper zwyHeight">
                <view class="avatar" @click="details('name')">
                  <image :src="UserData.user.avatar" />
                </view>
                <view class="user_info" v-if="UserData.user" @click="details('name')">
                  <view class="name">
                    {{ UserData.user.nickname }}
                    <text class="sex" v-if="UserData.user.gender == 1" style="color: #00c7ff; font-weight: bold">
                      <text class="iconfont">&#xe638;</text>
                      {{ UserData.user.dateBirthStr || '' }}
                    </text>
                    <text class="sex" v-if="UserData.user.gender == 2" style="color: #fe6ed0; font-weight: bold">
                      <text class="iconfont">&#xe640;</text>
                      {{ UserData.user.dateBirthStr || '' }}
                    </text>
                  </view>
                  <view class="others">
                    <view class="address" v-if="UserData.user.homeCity != null">
                      {{ UserData.user.homeCity.province.label + UserData.user.homeCity.city.label }}
                    </view>
                    <view class="address" v-if="UserData.user.homeCity == null">[未设置来自城市]</view>
                  </view>
                </view>
                <view class="label-wrapper">
                  <text class="label" v-if="UserData && UserData.user.label" v-for="(item, index) of UserData.user.label" :key="index">{{ item }}</text>
                  <br />
                  <text class="label" v-if="UserData && UserData.user.language" v-for="(item, index) of UserData.user.languages" :key="index">{{ item }}</text>
                  <text class="label" v-if="UserData && UserData.user.languages == null">中文普通话</text>
                </view>
                <view class="focus-wrapper">
                  <view class="focus_btn globalCololr" v-if="userCode && !attention" @click="attentionBtn()">
                    <text class="iconfont">&#xe6bd;</text>
                    关注
                  </view>
                  <view class="focus_btn globalCololr" v-if="userCode && attention" @click="attentionBtn()">取消关注</view>
                  <view class="focus_btn globalCololr" style="margin-right: 10px" v-if="userCode" @click="shield()">
                    <text class="iconfont">&#xe6be;</text>
                    拉黑
                  </view>
                  <view class="focus_btn globalCololr" style="margin-right: 10px" @click="report()">
                    <text class="iconfont">&#xe6bc;</text>
                    举报
                  </view>
                </view>
              </view>
              <view class="background">
                <image :src="UserData.user.avatar || 'https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/namebg.jpg'" alt="" mode="widthFix" />
              </view>
            </view>
          </view>
          <!-- 照片墙 -->

          <view class="userImgBg" v-if="UserData.user && UserData.photoList.length != 0">
            <image class="usernameimg" v-for="(item, index) of UserData.photoList" :src="item.imgPath" img-mode="aspectFill" :key="index" v-if="index < 8" @click="photoLook(item.imgPath)"></image>
          </view>
          <view class="userqiang" v-if="UserData.user && UserData.photoList.length == 0">
            <text class="userimgtitle">Ta还没有显摆照片</text>
          </view>
          <view class="container-wrapper" v-if="UserData.proofs">
            <view class="service-wrapper" v-if="UserData.proofs.proofImgPath != null && UserServes.length != 0">
              <text class="iconfont icon-diamondzuanshi"></text>
              <text class="service" v-bind:class="[curItem === 0 ? 'selected' : '']">
                <text class="iconfont">&#xe692;</text>
                {{ UserData.proofs.proofImgPath != '' ? '身份认证' : '身份认证' }}
              </text>
            </view>
            <swiper
              class="swiper"
              v-if="UserServes && UserServes.length != 0"
              indicator-active-color="#EB5248"
              :indicator-dots="UserServes.length > 1 ? true : false"
              circular
              :autoplay="true"
              :interval="4000"
              :duration="500"
            >
              <swiper-item v-if="UserServes && UserServes.length != 0 && index <= 5" v-for="(item, index) of UserServes" :key="index" @click.stop="service(item.code)">
                <view class="item">
                  <image mode="aspectFill" :src="item.serveCoverImg.indexOf(',') > -1 ? item.serveCoverImg.split(',')[0] : item.serveCoverImg" />
                  <view class="item-info">
                    <view class="title">{{ item.title }}</view>
                    <view class="price money_cor">
                      ￥
                      <text class="price-big">{{ item.pushPrice }}元</text>
                      /{{ item.servePriceName }}
                    </view>
                    <view class="type_cor">{{ item.pushTypeStr }}</view>
                  </view>
                </view>
              </swiper-item>
            </swiper>
            <!-- <view class="not_list" v-if="UserServes && UserServes && UserServes.length == 0  ">
        		         <view>暂未发布服务项</view>
        		       </view> -->
          </view>
          <view class="connect-wrapper">
            <text class="connect globalCololr" @click="details('name')">Ta的主页</text>
            <text class="connect globalCololr" @click="msgSo">私聊Ta</text>
          </view>
        </view>
      </view>
    </view>
    <!-- 面具公园 -->
    <view v-if="tabList == 1" class="Mbg">
      <view class="asset_xp">
        <view class="searchFor" @click="searchFor">
          <text class="iconfont">&#xe74c;</text>
          筛选
        </view>
        <view class="mianju_img">
          <image style="width: 298rpx; height: 183rpx" src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/appIcon/mianju.png"></image>
        </view>
        <view class="allorders-title">
          <scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x>
            <view
              v-for="(tab, index) in tabBars"
              :key="tab.id"
              :class="tabIndex === index ? 'allorders-title-scroll-item tabsel' : 'allorders-title-scroll-item'"
              :id="tab.id"
              :data-current="index"
              @tap="tapTab"
              >{{ tab.name }}</view
            >
          </scroll-view>
        </view>
        <view class="allorders-content">
          <swiper :current="tabIndex" style="height: 100%" class="swiper-box" duration="300" @change="changeTab">
            <swiper-item class="swiper-box" v-for="(tab, key) in newsitems" :key="key">
              <scroll-view class="list" scroll-y>
                <!--附近-->
                <view class="cotent_full" v-if="key == 0">
                  <mianList :tabIndex="tabIndex + 1" index="1" :sexType="gender"></mianList>
                </view>
                <!--女神-->
                <view class="cotent_full" v-if="key == 1">
                  <mianList :tabIndex="tabIndex + 1" index="2" :sexType="gender"></mianList>
                </view>
                <!--老板-->
                <view class="cotent_full" v-if="key == 2">
                  <mianList :tabIndex="tabIndex + 1" index="3" :sexType="gender"></mianList>
                </view>
                <!--新注册-->
                <view class="cotent_full" v-if="key == 3">
                  <mianList :tabIndex="tabIndex + 1" index="4" :sexType="gender"></mianList>
                </view>
              </scroll-view>
            </swiper-item>
          </swiper>
        </view>
      </view>
    </view>
    <!-- 未开启预约 -->
    <view class="tabCenterNot" v-if="openModule && openModule.mapOrderShow == false">
      <text @click="TabClick(0)" :class="tabList == 0 ? 'tabSeletTop zwyHeight' : ' zwyHeight'" class="mapL">实时地图</text>
      <text @click="TabClick(1)" :class="tabList == 1 ? 'tabSelet zwyHeight' : 'zwyHeight'" class="mapR">面具公园</text>
    </view>
    <!-- 预约台 -->
    <view class="boxBt" @click.stop="" v-if="mapOk && openModule && openModule.mapOrderShow">
      <view
        :class="isend ? 'fixedbox2 boxbr' : 'fixedbox boxbr'"
        :style="{
          height: windowHeight + 'px',
          width: windowWidth + 'px',
          top: fixboxtop + 'px'
        }"
        @touchmove.stop="getstart($event)"
        @touchend.stop="getend"
      >
        <view class="tabCenter" @click.stop="">
          <text @click="TabClick(0), (fixboxtop = windowHeight - 100)" :class="tabList == 0 ? 'tabSeletTop zwyHeight' : ' zwyHeight'" class="mapL">实时地图</text>
          <text @click="TabClick(1), (fixboxtop = windowHeight)" :class="tabList == 1 ? 'tabSelet zwyHeight' : 'zwyHeight'" class="mapR">面具公园</text>
        </view>
        <view class="boxContent" @tap.stop="tapBox">
          <view class="nearby">
            <text class="boxTitle">
              ⇣附近有
              <text class="number">&nbsp;&nbsp;{{ covers.length == 0 ? randomNum(13, 78) : covers.length }}&nbsp;&nbsp;</text>
              &nbsp;名&nbsp;陪陪可以快速接单⇣
            </text>
          </view>
          <view class="issueContent">
            <image class="ad" mode="aspectFill" src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/map/mapOrder.png"></image>
            <view class="main">
              <scroll-view scroll-y="true" class="scroll-Y">
                <text class="mainTitle">约TA做什么</text>
                <view class="list">
                  <view class="list_item" :class="addMapOrder.internet.includes(item) ? 'actived' : ''" v-for="(item, index) in slist" :key="index" @click="currentIndexBtn(item, 1)">{{ item }}</view>
                  <view class="list_item" :class="addMapOrder.reality.includes(item) ? 'actived' : ''" v-for="(item, index) in xlist" :key="index" @click="currentIndexBtn(item, 2)">{{ item }}</view>
                </view>
                <view class="item">
                  <view class="item_title">地点</view>
                  <view class="inputBox">
                    <input
                      class="inputItem"
                      v-if="addMapOrder.address.province"
                      :value="addMapOrder.address.city + '-' + addMapOrder.address.area + '（当前定位）'"
                      disabled
                      placeholder="请选择地点"
                    />
                  </view>
                </view>
                <view class="item">
                  <view class="item_title">性别要求</view>
                  <view class="list">
                    <view class="list_item" :class="addMapOrder.providerSexType == item ? 'actived' : ''" v-for="(item, index) in sex" :key="index" @click="currentIndexBtn(item, 3)">{{ item }}</view>
                  </view>
                </view>
                <view class="item">
                  <view class="item_title">时间</view>
                  <view class="inputBox">
                    <input class="inputItem" :value="addMapOrder.providerTimeType" @click="startTimeShow = true" placeholder="请选择时间" disabled />
                    <view class="txt">起</view>
                    <input class="inputItem timeNum" style="flex: none" :value="addMapOrder.quantity" placeholder="1小时、1天等" />
                  </view>
                </view>
                <view class="item">
                  <view class="item_title">你愿意支付的金额</view>
                  <view class="inputBox">
                    <input class="inputItem" :value="addMapOrder.price_data" placeholder="xxx元" type="number" />
                  </view>
                </view>
                <view class="priceList">
                  <view class="priceList_item" :class="priceCurrentIndex === index ? 'actived' : ''" v-for="(item, index) in priceList" :key="index" @click="handleClick(index)">￥{{ item }}</view>
                </view>
                <view class="issueOrderBtn" @click="addOrder">立即预约</view>
              </scroll-view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <u-picker v-model="startTimeShow" mode="time" :params="params" @confirm="timeBtn"></u-picker>

    <!--小程序隐私弹窗-->
    <zero-privacy :onNeed="true"></zero-privacy>
  </view>
</template>

<script>
import mianList from './mianList'
import { mapActions } from 'vuex'

export default {
  components: {
    mianList
  },
  data() {
    return {
      tabBars: [
        {
          name: '附近',
          id: 'fujin'
        },
        {
          name: '推荐',
          id: 'nvshen'
        },
        {
          name: '老板',
          id: 'laoban'
        },
        {
          name: '新注册',
          id: 'zhuce'
        }
      ],
      tabIndex: 1,
      newsitems: [],
      isClickChange: false,
      tabList: 0,
      bobaoShow: uni.getStorage({
        key: 'bobaoShow'
      }),
      pingShow: false,
      cardShow: false,
      cardNameShow: false,
      title: 'map',
      skewData: 40,
      scaleData: 5, // 17
      latitude: 39.909,
      longitude: 116.39742,
      moveLatitude: 39.909,
      moveLongitude: 116.39742,
      circlesArr: [
        {
          latitude: 39.909,
          longitude: 116.39742,
          radius: 200,
          strokeWidth: 1,
          color: '#428BCA88',
          fillColor: '#B6E1F248'
        }
      ],
      covers: [],
      map_TextShow: false,
      UserData: '',
      labelVal: '',
      labelData: '',
      labelText: '',
      UserServes: [],
      userCode: '',
      attention: '',
      markerId: '',
      timeout: '',
      timer: '',
      mapMoveData: '',
      privacyShow: false,
      rotateData: 0,
      traffic: false,
      satellite: false,
      map_auto: uni.getStorageSync('map_auto'),
      harbor: 1,
      photoList: [],
      openExamineWxShow: false,
      gender: '',
      rainMp3: {},
      leiMp3: {},
      leiMp32: {},
      rainState: false,
      heightLook: 0,
      windowHeight: 0, // 屏幕高度
      windowWidth: 0, // 屏幕宽度
      firsttop: 0, // 默认top定位
      fixboxtop: 0, // 实际top定位
      phonetop: 400, // 定义滑动分界线，小于该值置顶，大于该值恢复
      isend: false, // 触摸是否结束
      isfirst: true, // 手指第一次触摸
      tapboxtop: 0, // 手指距离div顶部距离
      slist: ['游戏', '聊天', '哄人', '语音', '视频', '谈心'],
      xlist: ['去吃饭', '去逛街', '去唱歌', '看电影', '去旅行'],
      sex: ['不限', '男士', '女士'],
      currentIndex: 0,
      priceList: ['300', '521', '800', '1200', '2400'],
      priceCurrentIndex: 0,
      addMapOrder: {
        providerSex: '',
        providerSexType: '不限',
        providerTime: '',
        providerTimeType: '',
        address: '',
        products: '',
        quantity: '1小时',
        remarks: '',
        price_data: 200,
        internet: [],
        reality: [],
        // #ifdef H5
        source_type: 1,
        // #endif
        // #ifdef APP-PLUS
        source_type: 2,
        // #endif
        // #ifdef MP-WEIXIN
        source_type: 3
        // #endif
      },
      startTimeShow: false,
      params: {
        year: true,
        month: true,
        day: true,
        hour: true,
        minute: true,
        second: false
      },
      mapOk: false
    }
  },
  watch: {
    map_TextShow(val) {
      if (val) {
        setTimeout(() => {
          this.map_TextShow = false
        }, 5000)
      }
    }
  },
  methods: {
    ...mapActions({
      getConversation: 'uniIm/getConversation'
    }),
    randomNum(min, max) {
      return Math.floor(min + Math.random() * (max - min))
    },
    currentIndexBtn(item, index) {
      if (index == 1) {
        var index = this.addMapOrder.internet.indexOf(item)
        if (index > -1) {
          this.addMapOrder.internet.splice(index, 1)
        } else {
          this.addMapOrder.internet.push(item)
        }
      }
      if (index == 2) {
        var index = this.addMapOrder.reality.indexOf(item)
        if (index > -1) {
          this.addMapOrder.reality.splice(index, 1)
        } else {
          this.addMapOrder.reality.push(item)
        }
      }
      if (index == 3) {
        this.addMapOrder.providerSexType = item == '男士' ? '男士' : item == '女士' ? '女士' : '不限'
        this.addMapOrder.providerSex = item == '男士' ? 1 : item == '女士' ? 2 : ''
      }
    },
    timeBtn(val) {
      let time = val.year + '-' + val.month + '-' + val.day + ' ' + val.hour + ':' + val.minute + ':00'
      this.addMapOrder.providerTimeType = time
      this.addMapOrder.providerTime = Date.parse(new Date(time))
    },
    addOrder() {
      let userInfo = this.$store.state.userInfo
      if (!userInfo) {
        // this.goPage('/pagesA/login/auth/login')
        this.msg('请先登录')
        return
      }
      if (!userInfo.wechat && !userInfo.qq) {
        this.goPage('/pagesA/myhome/personal/personal')
        this.msg('请先补充您的微信号信息,才能预约')
        return
      }
      if (this.addMapOrder.internet.length == 0 && this.addMapOrder.reality.length == 0) {
        this.msg('请选择陪玩类型')
        return
      }
      if (this.addMapOrder.providerTime == '') {
        this.msg('请选择时间')
        return
      }
      if (this.addMapOrder.quantity == '') {
        this.msg('请填写时间')
        return
      }
      if (this.addMapOrder.price_data == '') {
        this.msg('请填写付给的金额')
        return
      }
      uni.showLoading({
        title: '预约中',
        mask: true
      })
      this.$request('map', 'addMapOrder', this.addMapOrder).then((res) => {
        uni.hideLoading()
        this.fixboxtop = this.windowHeight - 100
        if (res.status == 1) {
          this.msg('预约成功，陪陪正在赶来...')
          this.addMapOrder = {
            providerSex: '',
            providerSexType: '不限',
            providerTime: '',
            providerTimeType: '',
            address: '',
            products: '',
            quantity: '1小时',
            remarks: '',
            price_data: 200,
            internet: [],
            reality: [],
            // #ifdef H5
            source_type: 1,
            // #endif
            // #ifdef APP-PLUS
            source_type: 2,
            // #endif
            // #ifdef MP-WEIXIN
            source_type: 3
            // #endif
          }
        } else {
          this.msg('创建失败，请稍后再试')
        }
      })
    },
    handleClick(index) {
      this.priceCurrentIndex = index
      this.addMapOrder.price_data = this.priceList[index]
    },
    tapBox(e) {
      this.tapboxtop = 200
    },
    getstart(e) {
      this.isend = false
      if (this.isfirst) {
        this.isfirst = false
        this.tapboxtop = e.touches[0].clientY - this.fixboxtop
      }
      this.fixboxtop = e.touches[0].clientY - this.tapboxtop
      if (this.fixboxtop > this.firsttop) {
        this.fixboxtop = this.windowHeight - 100
      } else if (this.fixboxtop < 0) {
        this.fixboxtop = 0
      }
    },
    getend(e) {
      this.isend = true
      this.isfirst = true
      if (this.fixboxtop <= this.phonetop) {
        this.fixboxtop = 100
      } else {
        this.fixboxtop = this.windowHeight - 100
      }
    },

    mapTap(e) {
      console.log(e, '地图点击')
    },
    // 获取微信持续定位
    getwxLocation() {
      let _locationChangeFn = async (res) => {
        console.log('wx持续定位location change', res)
        if (uni.getStorageSync('userInfo')) {
          // 登记坐标
          const mapres = await this.$request('user', 'update', {
            longitude: res.longitude,
            latitude: res.latitude,
            last_login_date: Date.parse(new Date())
          })
        }
      }
      wx.startLocationUpdate({
        success: (res) => {
          console.log(res, 'wx持续定位')
          wx.onLocationChange(_locationChangeFn)
        },
        fail: (err) => {
          console.log('获取当前位置失败', err)
        }
      })
    },
    mapStart() {
      // 开始定位 获取当前位置
      uni.getLocation({
        type: 'gcj02',
        success: async (res) => {
          // 圆的定位点
          this.circlesArr[0].latitude = res.latitude
          this.circlesArr[0].longitude = res.longitude
          // 坐标
          this.latitude = res.latitude
          this.longitude = res.longitude
          // 上报坐标
          this.getMap()
          // this.$store.commit('setStateObj', [{
          //   obj: 'location',
          //   key: 'latitude',
          //   val: res.latitude
          // },
          // {
          //   obj: 'location',
          //   key: 'longitude',
          //   val: res.longitude
          // }
          // ]);

          // 开启持续定位
          // this.getwxLocation();

          // 视图缩放
          this.skewLook()
        },
        fail: (error) => {
          console.log(error, '获取坐标失败')
          if (error.errMsg == 'getLocation:fail auth deny') {
            uni.showModal({
              title: '获取坐标失败',
              content: '获取坐标失败，无法为您定位，请检查 右上角-[设置] 里是否打开了坐标定位',
              success: function (res) {}
            })
          }
        }
      })
    },
    mapUpdated(e) {
      this.mapOk = true
    },
    TabClick(index) {
      this.tabIndex = 1
      let userInfoData = uni.getStorageSync('userInfo')
      if (userInfoData) {
        if (!userInfoData.secret || userInfoData.secret == null || userInfoData.secret == '') {
          this.goPage('/pagesA/login/mask?uid=' + userInfoData._id)
        } else {
          this.tabList = index
        }
      } else {
        this.tabList = index
      }
    },
    // 筛选
    searchFor() {
      uni.showActionSheet({
        itemList: ['看男生', '看女士', '不限'],
        success: (res) => {
          if (res.tapIndex + 1 == 1) {
            this.$store.commit('setStateAttr', {
              key: 'sexType',
              val: 1
            })
            this.gender = 1
          }
          if (res.tapIndex + 1 == 2) {
            this.$store.commit('setStateAttr', {
              key: 'sexType',
              val: 2
            })
            this.gender = 2
          }
          if (res.tapIndex + 1 == 3) {
            this.$store.commit('setStateAttr', {
              key: 'sexType',
              val: ''
            })
            this.gender = ''
          }
        }
      })
    },
    photoLook(img) {
      let imgList = []
      for (let item of this.UserData.photoList) {
        imgList.push(item.imgPath)
      }
      uni.previewImage({
        current: img,
        urls: imgList
      })
    },
    async msgSo() {
      if (uni.getStorageSync('userInfo')) {
        //创建会话
        const currentConversation = await this.getConversation({
          user_id: this.UserData.user._id
        })
        console.log('currentConversation', currentConversation)
        // 当前用户给对方发个消息
        uni.navigateTo({
          url: '/im/chat/chat?conversation_id=' + currentConversation.id
        })
      } else {
        uni.navigateTo({
          url: '/pagesA/login/auth/login'
        })
      }
    },
    // 跳转
    details(text) {
      if (text == 'home') {
        uni.navigateTo({
          url: '/pagesA/service/homePage/homePage?code=' + this.UserData.user._id
        })
      }
      if (text == 'name') {
        uni.navigateTo({
          url: '/pagesA/service/homePage/homePage?code=' + this.UserData.user._id
        })
      }
    },
    shield() {
      uni.showModal({
        title: '拉黑',
        content: '要拉黑该用户吗？',
        success: function (res) {
          if (res.confirm) {
            uni.showToast({
              title: '该用户已拉黑',
              icon: 'none',
              duration: 3000
            })
          }
        }
      })
    },
    report() {
      uni.showModal({
        title: '举报',
        content: '要举报该用户吗？',
        success: function (res) {
          if (res.confirm) {
            uni.showToast({
              title: '已收到您的举报，我们马上审查',
              icon: 'none',
              duration: 3000
            })
          }
        }
      })
    },

    // 滑动tab
    async changeTab(e) {
      let index = e.target.current
      if (this.isClickChange) {
        this.tabIndex = index
        this.isClickChange = false
        return
      }
      let tabBar = await this.getElSize('tab-bar'),
        tabBarScrollLeft = tabBar.scrollLeft
      let width = 0
      for (let i = 0; i < index; i++) {
        let result = await this.getElSize(this.tabBars[i].id)
        width += result.width
      }
      let winWidth = uni.getSystemInfoSync().windowWidth,
        nowElement = await this.getElSize(this.tabBars[index].id),
        nowWidth = nowElement.width
      if (width + nowWidth - tabBarScrollLeft > winWidth) {
        this.scrollLeft = width + nowWidth - winWidth
      }
      if (width < tabBarScrollLeft) {
        this.scrollLeft = width
      }
      this.isClickChange = false
      this.tabIndex = index //一旦访问data就会出问题
    },
    getElSize(id) {
      //得到元素的size
      return new Promise((res, rej) => {
        uni
          .createSelectorQuery()
          .select('#' + id)
          .fields(
            {
              size: true,
              scrollOffset: true
            },
            (data) => {
              res(data)
            }
          )
          .exec()
      })
    },
    async tapTab(e) {
      //点击tab-bar
      if (this.tabIndex === e.target.dataset.current) {
        return false
      } else {
        let tabBar = await this.getElSize('tab-bar'),
          tabBarScrollLeft = tabBar.scrollLeft //点击的时候记录并设置scrollLeft
        this.scrollLeft = tabBarScrollLeft
        this.isClickChange = true
        this.tabIndex = e.target.dataset.current
      }
    },
    randomfn() {
      let ary = []
      for (let i = 0, length = this.tabBars.length; i < length; i++) {
        let aryItem = {
          loadingType: 0,
          data: []
        }
        for (let j = 1; j <= 10; j++) {
          aryItem.data.push(this['data' + Math.floor(Math.random() * 5)])
        }
        ary.push(aryItem)
      }
      return ary
    },
    onShareAppMessage(res) {
      return {
        title: '哈哈交友，寻找离你附近1公里的Ta',
        path: 'pages/map/map'
      }
    },
    harborBtn() {
      uni.switchTab({
        url: '/pages/message/message'
      })
    },
    openbtn(code) {
      uni.navigateTo({
        url: '/pagesA/house/house1/open/open?code=' + this.UserData.uid
      })
    },
    namePage(code) {
      uni.navigateTo({
        url: '/pagesA/service/homePage/homePage?code=' + code
      })
    },
    // 服务
    service(code) {
      uni.navigateTo({
        url: '/pagesA/service/serviceInfo/serviceInfo?code=' + code
      })
    },
    // 年龄过滤
    ages(str) {
      var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/)
      if (r == null) return false
      var d = new Date(r[1], r[3] - 1, r[4])
      if (d.getFullYear() == r[1] && d.getMonth() + 1 == r[3] && d.getDate() == r[4]) {
        var Y = new Date().getFullYear()
        return Y - r[1]
      }
      return '输入的日期格式错误！'
    },
    markerAppBtn(e) {
      uni.navigateTo({
        url: '/pagesA/house/house1/open/open?code=' + e.mp.markerId,
        animationType: 'slide-in-bottom'
      })
    },
    markerBtn(e) {
      this.UserData = ''
      this.$request('home', 'getUserId', {
        id: e.mp.detail.markerId
      }).then((res) => {
        this.cardNameShow = true
        this.UserData = res
        console.log(this.UserData, 'this.UserData')
        // if (res.user.photoWall) {
        //   if (res.user.photoWall.length > 0) {
        //     res.user.photoWall.forEach(item => {
        //       this.UserData.photoList.push({
        //         imgPath: item
        //       })
        //     })
        //   }
        // }
      })
    },
    // 获取地图用户
    async getUser() {
      let vm = this
      // 获取地图用户列表
      let userInfoData = uni.getStorageSync('userInfo')
      vm.$request('map', 'mapUseList', {
        longitude: vm.moveLongitude,
        latitude: vm.moveLatitude,
        gender: vm.gender
      }).then((res) => {
        if (res.data) {
          let arr = []
          // 添加到
          // && item.uid != userInfoData.uid
          for (let item of res.data) {
            if (item.gender == 2 && item.mapUser != undefined) {
              let nameList = {
                type: 'name',
                id: Number(item.uid),
                latitude: item.map.coordinates[1],
                longitude: item.map.coordinates[0],
                iconPath: item.mapUser,
                width: 60,
                height: 75,
                alpha: 1
              }
              arr.push(nameList)
            }

            if (item.gender == 1 && item.mapUser != undefined) {
              let nameList = {
                type: 'name',
                id: Number(item.uid),
                latitude: item.map.coordinates[1],
                longitude: item.map.coordinates[0],
                iconPath: item.mapUser,
                width: 60,
                height: 75,
                alpha: 1
              }
              arr.push(nameList)
            }

            clearTimeout(vm.timeout)
            vm.timeout = setTimeout(() => {
              // 地图附近多少人
              vm.map_TextShow = true
            }, 500 * Math.random())
          }
          vm.covers = arr
        }
      })
    },
    // 移动地图
    mapMove(e) {
      if (e.type == 'end') {
        // 主动触发地图定位
        if (this.map_auto == '') {
          return
        }
        let latitude = e.detail.centerLocation.latitude
        let longitude = e.detail.centerLocation.longitude
        this.moveLatitude = latitude
        this.moveLongitude = longitude

        // 隐私设置
        const shielding = uni.getStorageSync('shielding')
        if (shielding == '') {
          this.privacyShow = false
          this.getUser()
        } else {
          if (shielding) {
            this.privacyShow = false
            this.getUser()
          } else {
            this.privacyShow = true
          }
        }
      }
    },
    mapBtn() {
      // 开启定位
      uni.setStorageSync('shielding', true)
      uni.setStorageSync('map_auto', true)
      this.map_auto = true
      this.mapSet()
    },
    // 返回定位点
    async mapSet() {
      // 获取当前位置
      uni.getLocation({
        type: 'gcj02',
        success: async (res) => {
          // 圆初始化
          if (this.circlesArr.length == 0) {
            this.circlesArr = [
              {
                latitude: 39.909,
                longitude: 116.39742,
                radius: 200,
                strokeWidth: 1,
                color: '#428BCA88',
                fillColor: '#B6E1F248'
              }
            ]
          }
          // 圆的定位点
          this.circlesArr[0].latitude = res.latitude
          this.circlesArr[0].longitude = res.longitude
          // 坐标
          this.latitude = res.latitude
          this.longitude = res.longitude

          // this.$store.commit('setStateObj', [{
          //   obj: 'location',
          //   key: 'latitude',
          //   val: res.latitude
          // },
          // {
          //   obj: 'location',
          //   key: 'longitude',
          //   val: res.longitude
          // }
          // ]);
          // 视图缩放
          this.skewLook()

          // 上报坐标
          this.updateMap()
        },
        fail: (error) => {
          console.log(error, '获取坐标失败')
          // 视图缩放
          this.skewLook()
          if (error.errMsg == 'getLocation:fail auth deny') {
            uni.showModal({
              title: '获取坐标失败',
              content: '获取坐标失败，无法为您定位，请检查 右上角-[设置] 里是否打开了坐标定位',
              success: function (res) {}
            })
          }
        }
      })
    },
    skewLook() {
      this.mapCtx.moveToLocation() //将地图中心移动到当前定位点
      // 视图缩放
      if (this.skewData == 40) {
        this.skewData = 39
      } else {
        this.skewData = 40
      }
      if (this.scaleData == 17) {
        this.scaleData = 16
      } else {
        this.scaleData = 17
      }
      if (this.rotateData == 0) {
        this.rotateData = 1
      } else {
        this.rotateData = 0
      }
    },
    async updateMap() {
      // 定位
      if (uni.getStorageSync('userInfo')) {
        // 登记坐标
        const mapres = await this.$request('user', 'update', {
          longitude: this.longitude,
          latitude: this.latitude,
          last_login_date: Date.parse(new Date())
        })
      }
    },
    bobao() {
      this.bobaoShow = !this.bobaoShow
      if (this.bobaoShow) {
        uni.showToast({
          title: '自动播报附近用户语音留言,已开启',
          icon: 'none'
        })
        uni.setStorageSync('bobaoShow', this.bobaoShow)
      } else {
        uni.showToast({
          title: '已关闭,自动播报附近语音留言',
          icon: 'none'
        })
        uni.setStorageSync('bobaoShow', this.bobaoShow)
      }
    },
    bottle() {
      this.pingShow = true
      uni.showToast({
        title: '正在匹配附近的用户...',
        icon: 'none',
        duration: 3000
      })
      setTimeout(() => {
        this.pingShow = false
        uni.navigateTo({
          url: '/pagesA/card/card',
          animationType: 'slide-in-bottom'
        })
      }, 2000)
    },
    makeAWish() {
      uni.navigateTo({
        url: '/pagesA/sponsor/sponsor/sponsorAll',
        animationType: 'slide-in-bottom'
      })
    },
    privacy() {
      uni.navigateTo({
        url: '/pagesA/setting/setting/privacy',
        animationType: 'slide-in-bottom'
      })
    },
    // 刷新
    Refresh() {
      uni.showToast({
        title: '附近用户已刷新...',
        icon: 'none',
        duration: 1000
      })
      this.mapSet()
    },
    // 获取坐标上报
    getMap() {
      // 实时获取定位 获取当前位置
      uni.getLocation({
        type: 'gcj02',
        success: (res) => {
          // 圆的定位点
          this.circlesArr[0].latitude = res.latitude
          this.circlesArr[0].longitude = res.longitude
          // 上报坐标
          const map_auto = uni.getStorageSync('map_auto')
          if (map_auto == '') {
            // 定位
            this.updateMap()
          } else {
            if (map_auto) {
              // 定位
              this.updateMap()
            }
          }
        },
        fail: (error) => {
          //console.log(error, "获取坐标失败");
        }
      })
    },
    loadExecution: function () {
      /**
       * 获取本地存储中launchFlag的值
       * 若存在，说明不是首次启动，直接进入首页；
       * 若不存在，说明是首次启动，进入引导页；
       */
      try {
        const value = uni.getStorageSync('launchFlag')
        if (value) {
          if (value == true) {
            uni.switchTab({
              url: '/pages/map/map'
            })
          } else {
            uni.redirectTo({
              url: '/pagesA/map/map/swiper'
            })
          }
        } else {
          uni.redirectTo({
            url: '/pagesA/map/map/swiper'
          })
        }
      } catch (e) {
        uni.redirectTo({
          url: '/pagesA/map/map/swiper'
        })
      }
    }
  },
  computed: {
    openModule() {
      return this.$store.state.openModule
    },
    location() {
      let myLocation = this.$store.state.location
      this.addMapOrder.address = myLocation
      return myLocation
    }
  },
  async onShow() {
    if (this.rainState) {
      this.rainMp3.play()
      setTimeout(() => {
        this.leiMp3.play()
      }, 10000)
    }

    // 小程序半秒震动
    //#ifdef MP-WEIXIN
    uni.vibrateShort({ success: () => {} })
    //#endif
    // 获取隐私配置
    this.map_auto = uni.getStorageSync('map_auto')
    // 播报语音
    if (uni.getStorageSync('bobaoShow') == '') {
      uni.setStorageSync('bobaoShow', true)
    }
    //获取功能
    // if (!uni.getStorageSync('userInfo')) {
    //   setTimeout(() => {
    //     uni.navigateTo({
    //       url: '/pagesA/login/auth/login'
    //     })
    //   }, 2000)
    // }
  },
  onLoad() {
    // 获取手机状态栏高度
    this.windowWidth = uni.getSystemInfoSync().windowWidth
    this.windowHeight = uni.getSystemInfoSync().windowHeight
    this.fixboxtop = this.windowHeight - 100
    this.heightLook = this.windowHeight - 120
    this.firsttop = this.windowHeight - 120

    this.tabList = 0
    this.newsitems = this.randomfn()

    // 初始化map
    this.mapCtx = uni.createMapContext('myMap', this) // 使用 uni.createMapContext 获取 map 上下文
    // 开启自动定位
    this.map_auto = uni.getStorageSync('map_auto')
    if (this.map_auto == '') {
      this.map_auto = true
      uni.setStorageSync('shielding', true)
      uni.setStorageSync('map_auto', true)
    } else {
      // 初始化定位
      this.mapStart()
    }
  },
  // #ifndef MP
  // 标题栏input搜索框点击
  onNavigationBarSearchInputClicked: async function (e) {
    uni.navigateTo({
      url: '/pagesA/explore/search/search'
    })
  },
  //点击导航栏 buttons 时触发
  onNavigationBarButtonTap(e) {}
  // #endif
}
</script>

<style lang="scss" scoped>
@import './weather';
.mapContent {
  width: 100%;
  height: 100vh;
  position: fixed;
  .boxBt {
    position: relative;
    width: 100%;
    height: 100%;

    .fixedbox {
      position: fixed;
      left: 0;
      background-color: #ffffff;
      padding: 0 12px;
    }

    .fixedbox2 {
      position: fixed;
      left: 0;
      padding: 0 12px;
      background-color: #ffffff;
      transition-property: top;
      transition-duration: 0.5s;
    }
    .boxContent {
      width: 100%;
      .nearby {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #ffffff;
        border-radius: 18rpx;
        font-size: 25rpx;
        font-weight: 500;
        padding: 20rpx 0;
        .number {
          font-size: 38rpx;
          color: #5a5fb9;
        }
      }
      .issueContent {
        .ad {
          width: 100%;
          height: 260rpx;
          border-radius: 20rpx;
        }
        .main {
          margin-top: 30rpx;
          .scroll-Y {
            width: 100%;
            height: 100%;
          }
          .mainTitle {
            font-size: 30rpx;
            font-weight: bold;
            color: #4443bc;
          }

          .list {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: wrap;
            margin-top: 30rpx;

            .list_item {
              padding: 9rpx 27rpx;
              background: #ffffff;
              margin-right: 15rpx;
              margin-bottom: 30rpx;
              font-size: 23rpx;
              border-radius: 23rpx;
              color: #5560a9;
              border: 1rpx solid #5560a9;
            }

            .actived {
              background: #575db3;
              color: #ffffff;
            }
          }
          .timeNum {
            width: 120rpx;
          }
          .item {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 30rpx;

            .item_title {
              color: #5f64a8;
              font-size: 28rpx;
              font-weight: bold;
              margin: 0 20rpx;
            }

            .inputBox {
              font-size: 28rpx;
              flex: 1;
              background: #e6e6f3;
              padding: 10rpx 30rpx;
              border-radius: 10rpx;
              display: flex;
              justify-content: flex-start;
              align-items: center;

              ::v-deep uni-input {
                width: 100%;
              }

              .txt {
                margin-right: 20rpx;
              }

              .inputItem {
                color: #1e1f23;
                font-weight: 100;
                font-size: 28rpx;
                flex: 1;
              }
            }
          }

          .priceList {
            display: flex;
            justify-content: flex-start;
            align-items: center;

            .priceList_item {
              padding: 8rpx 12rpx;
              background: #ffffff;
              margin-right: 21rpx;
              margin-bottom: 30rpx;
              font-size: 25rpx;
              border-radius: 10rpx;
              color: #5560a9;
              border: 1rpx solid #5560a9;
            }
            .actived {
              background: #575db3;
              color: #ffffff;
            }
          }
        }
      }
      .issueOrderBtn {
        width: 90%;
        height: 80rpx;
        text-align: center;
        line-height: 80rpx;
        color: #ffffff;
        background: $grad;
        margin: 10rpx auto 100rpx auto;
        border-radius: 18rpx;
        font-size: 36rpx;
      }
    }
    .boxbr {
      border-radius: 30rpx 30rpx 0 0;
      box-shadow: -4rpx -4rpx 25rpx #999;
    }
  }

  .mapR {
    background: #00b26a;
    border-radius: 135rpx 50rpx 50rpx 20rpx;
    border-bottom: 4rpx solid #fff;
  }

  .mapL {
    background: #6665f6;
    border-radius: 50rpx 20rpx 135rpx 50rpx;
    border-top: 4rpx solid #fff;
  }

  .Mbg {
    width: 100%;
    height: 100vh;
    position: relative;
    background: #ffffff;
  }

  .mapBg {
    width: 100%;
    height: 100vh;
    position: relative;
  }

  .asset_xp {
    position: relative;

    .searchFor {
      position: fixed;
      top: 130rpx;
      left: 40rpx;
      z-index: 99999;
      display: flex;
      align-items: center;
      font-size: 27rpx;

      text {
        font-size: 27rpx;
      }
    }
  }

  .userqiang {
    margin: 60rpx 0;
    text-align: center;
  }

  .userimgtitle {
    color: #999999;
    width: 200rpx;
    border: 1px solid #999999;
    padding: 20rpx 130rpx;
  }

  .userImgBg {
    flex-wrap: wrap;
    flex-direction: row;
  }

  .usernameimg {
    width: 25%;
    height: 200rpx;
    padding: 10rpx;
    border-radius: 10rpx;
    box-sizing: border-box;
    display: inline-block;
  }

  .mianju_img {
    display: flex;
    justify-content: center;
  }

  .allorders-title {
    text-align: center;
  }
  .tabsel {
    background: $fontLinear !important;
    color: #fff !important;
  }
  .allorders-title-scroll-item {
    background: #f5f5f5;
    display: inline-block;
    width: 140rpx;
    height: 45rpx;
    text-align: center;
    line-height: 45rpx;
    border-radius: 24rpx;
    color: #7a7997;
    font-size: 29rpx;
    margin: 0 20rpx;
  }

  .allorders-content {
    width: 100%;
    height: 100vh;
  }

  .uni-swiper-tab {
    border-bottom: 2rpx solid #f5f5f5 !important;
    height: 80rpx !important;
    line-height: 80rpx !important;
  }

  .tabCenterNot {
    display: flex;
    position: absolute;
    bottom: 130rpx;
    left: 50%;
    border-radius: 50rpx;
    margin-left: -158rpx;
    background: rgba($color: #ffffff, $alpha: 0.8);
    box-shadow: 1px 2px 5px #666;
    z-index: 99999999;
    text-align: center;
    text {
      font-size: 20rpx;
      padding: 8rpx 25rpx;
      margin: 6rpx;
      display: inline-block;
      color: #fff;
      border: 4rpx solid #ffffff;
    }
  }
  .tabCenter {
    position: absolute;
    top: -80rpx;
    left: 50%;
    border-radius: 50rpx;
    width: 316rpx;
    margin-left: -158rpx;
    background: rgba($color: #ffffff, $alpha: 0.8);
    box-shadow: 1px 2px 5px #666;
    z-index: 99999999;
    text-align: center;

    text {
      font-size: 20rpx;
      padding: 8rpx 25rpx;
      margin: 6rpx;
      display: inline-block;
      color: #fff;
      border: 4rpx solid #ffffff;
    }
  }

  .money_cor {
    color: #fdd149;
  }

  .mapStyle {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .map_Text {
    position: absolute;
    width: 260rpx;
    left: 50%;
    top: 700rpx;
    margin-left: -130rpx;
    margin-top: -200rpx;
    padding: 7rpx 15rpx;
    border-radius: 20rpx;
    background: #fff;
    text-align: center; // border: 1px solid #ddd;
    box-shadow: 2px 3px 6px #666;
    transition: all 0.5s;
    transform: scale(1.1);
    color: #909399;
  }

  .map_move {
    position: absolute;
    width: 23px;
    height: 37px;
    left: 50%;
    top: 50%;
    margin-left: -11.5px;
    margin-top: -40px;
  }

  .bottle {
    position: absolute;
    bottom: 500rpx;
    left: 20rpx;
    width: 98rpx;
    height: 98rpx;
  }

  .harbor {
    position: absolute;
    bottom: 800rpx;
    left: 20rpx;
    width: 98rpx;
    height: 98rpx;
  }

  .makeAWish {
    position: absolute;
    bottom: 350rpx;
    left: 20rpx;
    width: 98rpx;
    height: 98rpx;
  }

  .privacy {
    position: absolute;
    bottom: 650rpx;
    left: 20rpx;
    width: 98rpx;
    height: 98rpx;
  }

  .Refresh {
    position: absolute;
    bottom: 350rpx;
    right: 20rpx;
    width: 98rpx;
    height: 98rpx;
  }

  .location {
    position: absolute;
    bottom: 500rpx;
    right: 20rpx;
    width: 98rpx;
    height: 98rpx;
  }

  /*卡片*/
  .globalCololr {
    color: #ffffff;
    background: $fontLinear;
  }

  .businessCard {
    z-index: 9999;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .detail-wrapper {
    position: relative;
    width: 90%;
    background: #fff;
    border-radius: 12rpx;
    padding-bottom: 20rpx;
    box-shadow: 4rpx 40rpx 100rpx #666666;
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
    background: #ff6364;
  }

  .background image {
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .avatar {
    position: absolute;
    left: 30rpx;
    top: 30rpx;
  }

  .user_info {
    position: absolute;
    left: 170rpx;
    top: 17%;
  }

  .user_info .name {
    font-size: 32rpx;
  }

  .user_info .others {
    font-size: 26rpx;
    margin-top: 8rpx;
  }

  .others .address,
  .others .age-wrapper {
    display: inline-block;
  }

  .others .age-wrapper {
    background: pink;
    margin-left: 20rpx;
    font-size: 22rpx;
    height: 32rpx;
    line-height: 30rpx;
    padding: 0 16rpx;
    border-radius: 4rpx;
  }

  .sex {
    display: flex;
  }

  .focus-wrapper {
    position: absolute;
    bottom: 20rpx;
    width: 100%;
    padding: 0 30rpx;
    box-sizing: border-box;
    color: #fcd355;
    font-size: 24rpx;
  }

  .focus-wrapper .focus_btn {
    float: right;
    color: #000;
    padding: 3rpx 28rpx;
    border-radius: 30rpx;
  }

  .container-wrapper {
    width: 100%;
    box-sizing: border-box;
    padding: 0 30rpx;
  }

  .service-wrapper {
    margin: 20rpx 0;
    height: 60rpx;
    overflow: hidden;
  }

  .service-wrapper .service {
    padding: 8rpx 20rpx;
    background: #ddd;
    font-size: 24rpx;
    border-radius: 26rpx;
    margin-right: 12rpx;
    display: inline-block;
  }

  .service-wrapper .selected {
    background: #fcd355;
  }

  .connect-wrapper {
    width: 100%;
  }

  .connect-wrapper .connect {
    display: inline-block;
    height: 60rpx;
    line-height: 60rpx;
    width: 40%;
    text-align: center;
    border-radius: 8rpx;
    font-size: 28rpx;
    margin: 0 5%;
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

  .user_info {
    position: absolute;
    left: 170rpx;
    top: 17%;
  }

  .user_info .name {
    font-size: 32rpx;
    color: #fff;
    display: flex;
    align-items: center;
  }

  .user_info .others {
    font-size: 26rpx;
    margin-top: 8rpx;
    color: #fff;

    .address {
      color: #fff;
    }
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
    border-radius: 8rpx;
    font-size: 18rpx;
    color: #fff;
  }

  .focus-wrapper {
    position: absolute;
    bottom: 10rpx;
    width: 100%;
    padding: 2rpx 30rpx;
    box-sizing: border-box;
    color: #fcd355;
    font-size: 24rpx;
  }

  .focus-wrapper .focus_btn {
    float: right;
    font-size: 20rpx;
    color: #fff;
    padding: 0 25rpx;
    border-radius: 30rpx;

    text {
      font-size: 20rpx;
    }
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

  .background image {
    width: 100%;
    height: 100%;
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

  .swiper {
    height: 200upx;
  }

  .sex {
    padding-left: 10rpx;
    display: flex;
    align-items: center;
    font-size: 29rpx;
  }

  .item {
    display: flex;
    margin-bottom: 20rpx;
  }

  .item image {
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
    background: $fontLinear;
    color: #fff;
    border-radius: 20rpx;
    padding: 5rpx 26rpx;
  }

  .avatar {
    position: absolute;
    left: 30rpx;
    top: 30rpx;
  }

  .avatar image {
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
  }
}
</style>
