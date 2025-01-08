<template>
  <div class="issueDyn-wrapper">
    <div class="allorders-title">
      <scroll-view id="tab-bar" class="uni-swiper-tab-top" scroll-x :scroll-left="scrollLeft">
        <view
          v-for="(tab, index) in tabBars"
          :key="tab.id"
          :class="tabIndex === index ? 'allorders-title-scroll-item scroll-itemCor' : 'allorders-title-scroll-item'"
          :id="tab.id"
          :data-current="index"
          @tap="tapTab"
          >{{ tab.name }}</view
        >
      </scroll-view>
    </div>
    <div class="allorders-content">
      <swiper :current="tabIndex" style="height: 100%" class="swiper-box" duration="300" @change="changeTab">
        <swiper-item class="swiper-box" v-for="(tab, key) in newsitems" :key="key">
          <scroll-view class="list" scroll-y>
            <!--附近-->
            <div v-if="key == 0">
              <div class="issueDyn-swiper-item">
                <textarea v-model="nearbyVal" class="issueDyn-swiper-itemTxt" maxlength="500" style="min-height: 150px" auto-height placeholder="说点什么吧(最少6个字)，附近的Ta可以看到..." />
                <view class="topicBg" v-if="topicList">
                  <text v-for="(item, index) of topicList" :key="index"
                    >#{{ item }}#
                    <text class="iconfont del" @click="deltopic(index)">&#xe654;</text>
                  </text>
                </view>
                <view class="xianbai">添加你最值得显摆的自拍照片，来炫耀下~</view>
                <div class="issueDyn-swiper-itemAddIcon">
                  <view v-for="(item, index) of SrcList" :key="index">
                    <view class="issueDyn-swiper-itemIcon" @click.stop="title_img(item)">
                      <image :src="item" mode="aspectFill" lazy-load></image>
                      <span class="iconfont delimg" @click.stop="delImg(index)">&#xe68b;</span>
                    </view>
                  </view>
                  <view @click="posterSrcBtn" v-if="SrcList.length <= 12">
                    <p class="issueDyn-swiper-itemIcon">
                      <span class="iconfont">&#xe65c;</span>
                    </p>
                  </view>
                </div>
                <wrap :height="2"></wrap>
                <div class="issueDyn-swiper-item-fun" @click="topicLok">
                  <div class="issueDyn-swiper-itemLocation"><span class="issueDyn-swiper-itemLocation-label iconfont icon-dingwei"></span><span class="iconfont">&#xe730;</span>话题</div>
                </div>
                <wrap :height="2"></wrap>
                <div class="issueDyn-swiper-item-fun" @click="Location">
                  <div class="issueDyn-swiper-itemLocation">
                    <span class="issueDyn-swiper-itemLocation-label iconfont icon-dingwei"></span><span class="iconfont">&#xe738;</span>位置：{{ LocationText }}
                  </div>
                </div>
                <wrap :height="2"></wrap>
                <view class="specification">
                  <view>[文明规范公约]</view>
                  <view>鼓励：发布最喜欢的自拍照片，告诉大家你的魅力所在</view>
                  <view>禁止：禁止发布含有污秽、广告、违法等信息</view>
                  <view>●违反相关规范规定，将进行封号处理</view>
                </view>
                <view class="addBtn" @click="TextAll(1)">
                  <view>发布附近动态</view>
                </view>
              </div>
            </div>
            <!-- 电台 -->
            <div v-if="key == 1">
              <div class="issueDyn-swiper-item">
                <!-- 电台分类 -->
                <view class="dtFenlei" v-if="typeList && typeList.nearbySubtype">
                  <ul>
                    <li @tap="dtBtn(item._id, item.title)" :class="subtype == item._id ? 'sel' : ''" v-for="(item, index) of typeList.nearbySubtype.data" :key="index">
                      <image class="icon" :src="item.icon"></image>

                      <view>{{ item.title }}</view>
                    </li>
                  </ul>
                </view>
                <wrap :height="16"></wrap>
                <textarea v-model="nearbyVal" class="issueDyn-swiper-itemTxt" maxlength="500" style="min-height: 150px" auto-height placeholder="想广播找个Ta吗？(最少6个字)发个电台吧..." />
                <view class="topicBg" v-if="topicList">
                  <text v-for="(item, index) of topicList" :key="index"
                    >#{{ item }}#
                    <text class="iconfont del" @click="deltopic(index)">&#xe654;</text>
                  </text>
                </view>
                <view class="xianbai">添加你最值得显摆的自拍照片，来炫耀下~</view>
                <div class="issueDyn-swiper-itemAddIcon">
                  <view v-for="(item, index) of SrcList" :key="index">
                    <view class="issueDyn-swiper-itemIcon" @click.stop="title_img(item)">
                      <image :src="item" mode="aspectFill" lazy-load></image>
                      <span class="iconfont delimg" @click.stop="delImg(index)">&#xe68b;</span>
                    </view>
                  </view>
                  <view @click="posterSrcBtn" v-if="SrcList.length <= 12">
                    <p class="issueDyn-swiper-itemIcon">
                      <span class="iconfont">&#xe65c;</span>
                    </p>
                  </view>
                </div>
                <div class="issueDyn-swiper-item-fun">
                  <wrap :height="2"></wrap>
                  <div class="issueDyn-swiper-item-fun" @click="topicLok">
                    <div class="issueDyn-swiper-itemLocation"><span class="issueDyn-swiper-itemLocation-label iconfont icon-dingwei"></span><span class="iconfont">&#xe730;</span>话题</div>
                  </div>
                  <wrap :height="2"></wrap>
                  <div class="issueDyn-swiper-itemLocation" @click="showModel">
                    <span class="issueDyn-swiper-itemLocation-label iconfont icon-labelb"></span><span class="iconfont">&#xe61c;</span>标签：<span
                      v-if="selectedLabel != ''"
                      style="color: #6b65f3; border: 1px solid #6b65f3; padding: 2px 7px; border-radius: 5px"
                      >{{ selectedLabel }}</span
                    >
                    <span class="iconfont icon-you issueDyn-swiper-itemLocation-right"></span>
                  </div>
                  <wrap :height="2"></wrap>
                  <div class="issueDyn-swiper-itemLocation" @click="Location">
                    <span class="issueDyn-swiper-itemLocation-label iconfont icon-dingwei"></span><span class="iconfont">&#xe738;</span>位置：{{ LocationText }}
                  </div>
                  <wrap :height="2"></wrap>
                  <view class="specification">
                    <view>[文明规范公约]</view>
                    <view>鼓励：发布最喜欢的自拍照片，告诉大家你的魅力所在</view>
                    <view>禁止：禁止发布含有污秽、广告、违法等信息</view>
                    <view>●违反相关规范规定，将进行封号处理</view>
                  </view>
                </div>
                <view class="addBtn" @click="TextAll(4)">
                  <view>发布电台动态</view>
                </view>
              </div>
            </div>
            <!--旅行-->
            <div v-if="key == 2">
              <div class="issueDyn-swiper-item">
                <div class="issueDyn-swiper-item-date">
                  <picker class="picker-item" mode="date" @change="birthBtn" :start="starTime" :value="starTime">
                    <span class="issueDyn-swiper-item-date-start">{{ birthVal }}</span>
                  </picker>
                  <span class="issueDyn-swiper-item-date-icon"></span>
                  <picker class="picker-item" mode="date" @change="birthBtn_end" :start="starTime" :value="starTime">
                    <span class="issueDyn-swiper-item-date-end">{{ birthVal_end }}</span>
                  </picker>
                </div>
                <div class="issueDyn-swiper-item-addr">
                  <span><input class="cityVal" style="text-align: right" v-model="cityText" placeholder="输入出发城市" /></span>
                  <span class="issueDyn-swiper-item-date-icon"></span>
                  <span><input class="cityVal" style="text-align: left" v-model="cityText_end" placeholder="输入目的地" /></span>
                </div>
                <!--<div class="issueDyn-swiper-item-addr">-->
                <!--<span class="issueDyn-swiper-item-addr-start" @click="showMulLinkageThreePicker">{{cityText}}</span>-->
                <!--<span class="issueDyn-swiper-item-date-icon"></span>-->
                <!--<span class="issueDyn-swiper-item-addr-end" @click="showMulLinkageThreePicker_end">{{cityText_end}} </span>-->
                <!--</div>-->
                <wrap :height="16"></wrap>
                <textarea v-model="nearbyVal" class="issueDyn-swiper-itemTxt" maxlength="500" style="min-height: 150px" auto-height placeholder="想去旅行吗？来偶遇Ta吧(最少6个字)..." />
                <view class="topicBg" v-if="topicList">
                  <text v-for="(item, index) of topicList" :key="index"
                    >#{{ item }}#
                    <text class="iconfont del" @click="deltopic(index)">&#xe654;</text>
                  </text>
                </view>
                <view class="xianbai">显摆 添加你最值得显摆的自拍照片，来炫耀下~</view>
                <div class="issueDyn-swiper-itemAddIcon">
                  <view v-for="(item, index) of SrcList" :key="index">
                    <view class="issueDyn-swiper-itemIcon" @click.stop="title_img(item)">
                      <image :src="item" mode="aspectFill" lazy-load></image>
                      <span class="iconfont delimg" @click.stop="delImg(index)">&#xe68b;</span>
                    </view>
                  </view>
                  <view @click="posterSrcBtn" v-if="SrcList.length <= 12">
                    <p class="issueDyn-swiper-itemIcon">
                      <span class="iconfont">&#xe65c;</span>
                    </p>
                  </view>
                </div>
                <div class="issueDyn-swiper-item-fun">
                  <wrap :height="2"></wrap>
                  <div class="issueDyn-swiper-item-fun" @click="topicLok">
                    <div class="issueDyn-swiper-itemLocation"><span class="issueDyn-swiper-itemLocation-label iconfont icon-dingwei"></span><span class="iconfont">&#xe730;</span>话题</div>
                  </div>
                  <wrap :height="2"></wrap>
                  <div class="issueDyn-swiper-itemLocation" @click="showModel">
                    <span class="issueDyn-swiper-itemLocation-label iconfont icon-labelb"></span><span class="iconfont">&#xe61c;</span>标签：<span
                      v-if="selectedLabel != ''"
                      style="color: #eb5248; border: 1px solid #eb5248; padding: 2px 7px; border-radius: 2px"
                      >{{ selectedLabel }}</span
                    >
                    <span class="iconfont icon-you issueDyn-swiper-itemLocation-right"></span>
                  </div>
                  <wrap :height="2"></wrap>
                  <div class="issueDyn-swiper-itemLocation" @click="Location">
                    <span class="issueDyn-swiper-itemLocation-label iconfont icon-dingwei"></span><span class="iconfont">&#xe738;</span>位置：{{ LocationText }}
                  </div>
                  <wrap :height="2"></wrap>
                  <view class="specification">
                    <view>[文明规范公约]</view>
                    <view>鼓励：发布最喜欢的自拍照片，告诉大家你的魅力所在</view>
                    <view>禁止：禁止发布含有污秽、广告、违法等信息</view>
                    <view>●违反相关规范规定，将进行封号处理</view>
                  </view>
                </div>

                <view class="addBtn" @click="TextAll(2)">
                  <view>发布旅行动态</view>
                </view>
              </div>
            </div>
            <!--蹲单-->
            <div v-if="key == 3">
              <div class="issueDyn-swiper-item">
                <textarea v-model="nearbyVal" class="issueDyn-swiper-itemTxt" maxlength="500" style="min-height: 150px" auto-height placeholder="想求老板下单吗？来求个单子吧(最少6个字)..." />
                <view class="topicBg" v-if="topicList">
                  <text v-for="(item, index) of topicList" :key="index"
                    >#{{ item }}#
                    <text class="iconfont del" @click="deltopic(index)">&#xe654;</text>
                  </text>
                </view>
                <view class="xianbai">添加你最值得显摆的自拍照片，来炫耀下~</view>
                <div class="issueDyn-swiper-itemAddIcon">
                  <view v-for="(item, index) of SrcList" :key="index">
                    <view class="issueDyn-swiper-itemIcon" @click.stop="title_img(item)">
                      <image :src="item" mode="aspectFill" lazy-load></image>
                      <span class="iconfont delimg" @click.stop="delImg(index)">&#xe68b;</span>
                    </view>
                  </view>
                  <view @click="posterSrcBtn" v-if="SrcList.length <= 12">
                    <p class="issueDyn-swiper-itemIcon">
                      <span class="iconfont">&#xe65c;</span>
                    </p>
                  </view>
                </div>
                <wrap :height="2"></wrap>
                <div class="issueDyn-swiper-item-fun" @click="topicLok">
                  <div class="issueDyn-swiper-itemLocation"><span class="issueDyn-swiper-itemLocation-label iconfont icon-dingwei"></span><span class="iconfont">&#xe730;</span>话题</div>
                </div>
                <wrap :height="2"></wrap>
                <div class="issueDyn-swiper-item-fun" @click="Location">
                  <div class="issueDyn-swiper-itemLocation">
                    <span class="issueDyn-swiper-itemLocation-label iconfont icon-dingwei"></span><span class="iconfont">&#xe738;</span>位置：{{ LocationText }}
                  </div>
                </div>
                <wrap :height="2"></wrap>
                <view class="specification">
                  <view>[文明规范公约]</view>
                  <view>鼓励：发布最喜欢的自拍照片，告诉大家你的魅力所在</view>
                  <view>禁止：禁止发布含有污秽、广告、违法等信息</view>
                  <view>●违反相关规范规定，将进行封号处理</view>
                </view>

                <view class="addBtn" @click="TextAll(3)">
                  <view>发布蹲单动态</view>
                </view>
              </div>
            </div>
          </scroll-view>
        </swiper-item>
      </swiper>
    </div>
    <!--弹窗标签-->
    <u-popup :show="modelIsShow" mode="bottom" closeable length="80%" closeOnClickOverlay @close="modelIsShow = false">
      <view class="topTitle">选择标签</view>
      <div class="issueDyn-model-content-labelBox">
        <span
          class="issueDyn-model-content-txtLabel-icon"
          v-for="(item, itemIndex) in labelList"
          :key="itemIndex"
          @click="chooseLabel(item)"
          v-bind:class="[selectedLabel === item ? 'issueDyn-model-content-txtLabel-activeClass' : '']"
          >{{ item }}</span
        >
      </div>
    </u-popup>

    <u-popup :show="topicShow" mode="bottom" closeable length="80%" closeOnClickOverlay @close="topicShow = false">
      <view class="topTitle">添加话题</view>
      <view class="topicBg" v-if="topicG.length != 0">
        <view>官方话题</view>
        <text v-for="item of topicG" :key="item" @click="topicBtn(item._id, item.title)">{{ item.title }}</text>
      </view>
      <view class="topicBg" v-if="topicR.length != 0">
        <view>热门话题</view>
        <text v-for="item of topicR" :key="item" @click="topicBtn(item._id, item.title)">{{ item.title }}</text>
      </view>
      <view class="topicBg" v-if="topicZ.length != 0">
        <view>最新话题</view>
        <text v-for="item of topicZ" :key="item" @click="topicBtn(item._id, item.title)">{{ item.title }}</text>
      </view>
    </u-popup>
  </div>
</template>

<script>
import mpvueCityPicker from '@/components/cityPicker.vue'
import wrap from '@/components/wrap'
export default {
  components: {
    wrap,
    mpvueCityPicker
  },
  data() {
    return {
      topicShow: false,
      topicItem: [],
      starTime: '',
      curIndex: 1,
      windowHeight: 0,
      animationData: {},
      txtLength: 0,
      modelIsShow: false,
      labelList: ['求捎带', '求拼车', '求拼房', '求偶遇', '我出费用', '费用你出', '一起去', '只限男生', '只限女生', '男女不限', 'AA拼'],
      selectedLabel: '',
      tabBars: [
        {
          name: '附近',
          id: 'xianbai'
        },
        {
          name: '电台',
          id: 'diantai'
        },
        {
          name: '旅行',
          id: 'lvxing'
        },
        {
          name: '蹲单',
          id: 'dundan'
        }
      ],
      tabIndex: 0,
      newsitems: [],
      isClickChange: false,
      nearbyVal: '',
      SrcList: [],

      latitude: '',
      longitude: '',
      LocationText: '',
      cityShow: false,
      cityPickerValueDefault: [0, 0, 1],
      cityText: '',
      cityVal: '',
      cityFull: {},
      citydataList: {
        province: [],
        city: [],
        area: []
      },
      birthVal: '选择出发日期',
      birthVal_end: '选择结束日期',
      cityShow_end: false,
      cityPickerValueDefault_end: [0, 0, 1],
      cityText_end: '',
      cityVal_end: '',
      cityFull_end: {},
      citydataList_end: {
        province: [],
        city: [],
        area: []
      },
      topicG: [],
      topicR: [],
      topicZ: [],
      scrollLeft: '',
      topicList: [],
      subtype: '',
      typeList: ''
    }
  },
  watch: {
    topicShow(val) {
      if (val) {
        this.gettopicList()
      }
    }
  },
  methods: {
    fileUploaded(val) {
      console.log(val)
    },
    cor(index) {
      switch (index) {
        case 0:
          return '#4bd05e'
          break
        case 1:
          return '#c877da'
          break
        case 2:
          return '#f3a227'
          break
        case 3:
          return '#f7695f'
          break
        case 4:
          return '#4c87f8'
          break
        case 5:
          return '#00def1'
          break
        case 6:
          return '#40c6c3'
          break
        case 7:
          return '#76ce80'
          break
      }
    },
    dtBtn(id, name) {
      this.subtype = id
    },
    deltopic(index) {
      this.topicList.splice(index, 1)
      this.topicItem.splice(index, 1)
    },
    parseComments(value) {
      var exp
      exp = /(#|＃)((?!#).)*(#|＃)/g // 这里中文#和英文#都会识别
      value = value
        .replace(/<[^>]*?>(.*?)/gi, '')
        .replace(/(.*?)<\/[^>]*?>/gi, '')
        .replace(exp, (item) => {
          let newVal = '<span class="huati-body text-blue" bindtap="huatiItem()">' + item + '</span>'
          return newVal
        })
      return value
    },
    topicBtn(id, title) {
      this.topicShow = false
      this.topicList.push(title)
      this.topicItem.push(id)
    },
    async gettopicList(id) {
      // 官方话题
      const list = await this.$request('nearby', 'topicList', {
        type: 'G',
        offset: 0,
        limit: 10
      })
      // 个人话题
      const res = await this.$request('nearby', 'topicList', {
        type: 'R',
        offset: 0,
        limit: 10
      })
      this.topicG = list.data
      this.topicR = res.data
      this.topicZ = res.data
    },
    title_img(img) {
      uni.previewImage({
        current: img,
        urls: this.SrcList
      })
    },
    timeSet(date) {
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      var d = date.getDate()
      d = d < 10 ? '0' + d : d
      var h = date.getHours()
      var minute = date.getMinutes()
      minute = minute < 10 ? '0' + minute : minute
      return y + '-' + m + '-' + d
    },
    delImg(index) {
      this.SrcList.splice(index, 1)
    },
    birthBtn_end(evt) {
      this.birthVal_end = evt.detail.value
    },
    birthBtn(evt) {
      this.birthVal = evt.detail.value
    },
    topicLok() {
      this.topicShow = true
    },
    Location() {
      let vm = this
      uni.chooseLocation({
        success: function (res) {
          ////console.log('位置名称：' + res.name);
          ////console.log('详细地址：' + res.address);
          ////console.log('纬度：' + res.latitude);
          ////console.log('经度：' + res.longitude);
          vm.latitude = res.latitude
          vm.longitude = res.longitude
          vm.LocationText = res.name
        },
        fail: function (res) {
          //console.log(res, "定位失败");
          uni.showModal({
            title: '获取坐标失败',
            content: '您拒绝了授权获取坐标，无法为您定位，请在 [设置] 里打开坐标定位',
            success: function (res) {
              if (res.confirm) {
                //console.log("用户点击确定");
              } else if (res.cancel) {
                //console.log("用户点击取消");
              }
            }
          })
        }
      })
    },
    async posterSrcBtn() {
      let file = await this.cloudUploadFile(8)
      if (file == undefined) {
        return
      } else {
        uni.showLoading({
          title: '上传中...'
        })
      }
      file.fileUrl.forEach(async (item, index) => {
        const getImageLog = await this.$request('security', 'imageDetection', {
          image: item
        })
        // console.log(getImageLog,'getImageLog')
        if (getImageLog.state == 0) {
          uni.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 3000
          })
          this.SrcList.push(getImageLog.image)
        } else {
          uni.showToast({
            title: '该图片涉嫌内容不适，请更换一个',
            icon: 'none',
            duration: 3000
          })
        }
      })
    },
    async TextAll(index) {
      if (this.nearbyVal == '' || this.nearbyVal.length < 6) {
        uni.showToast({
          title: '请填写最少6个字内容，最好在配张美美的照片^_^',
          icon: 'none',
          duration: 3000
        })
        return
      }
      const getContentLog = await this.$request('security', 'textDetection', {
        content: this.nearbyVal
      })
      if (getContentLog.state == 0) {
        this.addText(index)
      } else {
        uni.showToast({
          title: '发布内容涉嫌不文明用语，请修改',
          icon: 'none',
          duration: 3000
        })
      }
    },
    async addText(index) {
      let data = {}
      // 附近
      if (index == 1) {
        data = {
          dynamicType: 1,
          dynamicContext: this.nearbyVal,
          dynamicImg: this.SrcList,
          longitude: this.longitude,
          latitude: this.latitude,
          positionDesc: this.LocationText,
          topicTitle: this.topicList
        }
      }
      // 电台
      if (index == 4) {
        data = {
          dynamicType: 4,
          types: this.subtype,
          dynamicContext: this.nearbyVal,
          dynamicImg: this.SrcList,
          longitude: this.longitude,
          latitude: this.latitude,
          positionDesc: this.LocationText,
          dynamicStart: new Date(this.birthVal + ' 00:00:00').getTime() / 1000,
          dynamicEnd: new Date(this.birthVal_end + ' 00:00:00').getTime() / 1000,
          startCity: this.cityText,
          endCity: this.cityText_end,
          dynamicLabel: this.selectedLabel,
          topicTitle: this.topicList
        }
      }
      // 旅行
      if (index == 2) {
        if (this.birthVal == '选择出发日期') {
          uni.showToast({
            title: '请选择出发时间',
            icon: 'none',
            duration: 3000
          })
          return
        }
        if (this.birthVal_end == '选择结束日期') {
          uni.showToast({
            title: '请选择结束时间',
            icon: 'none',
            duration: 3000
          })
          return
        }
        if (this.cityText == '') {
          uni.showToast({
            title: '请输入出发城市',
            icon: 'none',
            duration: 3000
          })
          return
        }
        if (this.cityText_end == '') {
          uni.showToast({
            title: '请输入目的地',
            icon: 'none',
            duration: 3000
          })
          return
        }

        data = {
          dynamicType: 2,
          dynamicContext: this.nearbyVal,
          dynamicImg: this.SrcList,
          longitude: this.longitude,
          latitude: this.latitude,
          positionDesc: this.LocationText,
          dynamicStart: new Date(this.birthVal + ' 00:00:00').getTime() / 1000,
          dynamicEnd: new Date(this.birthVal_end + ' 00:00:00').getTime() / 1000,
          startCity: this.cityText,
          endCity: this.cityText_end,
          dynamicLabel: this.selectedLabel,
          topicTitle: this.topicList
        }
      }
      // 蹲单
      if (index == 3) {
        if (this.nearbyVal == '' || this.nearbyVal.length < 6) {
          uni.showToast({
            title: '请填写最少6个字内容，最好在配张美美的照片^_^',
            icon: 'none',
            duration: 3000
          })
          return
        }
        data = {
          dynamicType: 3,
          dynamicContext: this.nearbyVal,
          dynamicImg: this.SrcList,
          longitude: this.longitude,
          latitude: this.latitude,
          positionDesc: this.LocationText,
          topicTitle: this.topicList
        }
      }
      uni.showLoading({
        title: '发布中...',
        mask: true
      })
      const res = await this.$request('nearby', 'addNearby', data)
      uni.hideLoading()
      if (res.status == 1) {
        uni.navigateBack({
          delta: 1
        })
        uni.showToast({
          title: res.msg,
          duration: 3000,
          icon: 'none'
        })
      } else {
        uni.showToast({
          title: res.msg,
          icon: 'none',
          duration: 3000
        })
      }
    },
    swiperChange(e) {
      this.curIndex = e.target.current
    },
    itemChange(cur) {
      this.curIndex = cur
    },
    markTxt(e) {
      this.txtLength = e.target.value.length
      this.selectedLabel = e.target.value
    },
    chooseLabel(item) {
      this.selectedLabel = item
    },
    showModel() {
      this.modelIsShow = true
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
    }
  },
  async onShow() {},
  onLoad: async function (option) {
    this.newsitems = this.randomfn()
    this.tabIndex = Number(option.index)

    // 当前时间
    this.starTime = this.timeSet(new Date())

    // 获取定位
    uni.getLocation({
      type: 'gcj02',
      success: (res) => {
        this.latitude = res.latitude
        this.longitude = res.longitude
      }
    })
    setTimeout(() => {
      // 选照片
      this.posterSrcBtn()
    }, 200)

    // 获取分类
    const typeRes = await this.$request('nearby', 'typeList', {})
    this.typeList = typeRes
  }
}
</script>

<style lang="scss" scoped>
.dtFenlei {
  padding: 20rpx;
  ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .sel {
      > view:first-child {
        border: 4rpx solid $fontColor;
        box-shadow: 0 5rpx 20rpx $fontColor;
      }
      > view:last-child {
        color: $fontColor;
        border: 2rpx solid $fontColor;
        border-radius: 10rpx;
        padding: 3rpx 10rpx;
      }
    }
    li {
      width: 25%;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .icon {
        width: 100rpx;
        height: 100rpx;
        margin: 20rpx 25rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 20rpx;
        background: #f5f5f5;
        border-radius: 50%;
        font-size: 30rpx;
        font-weight: 300;
        border: 4rpx solid rgba(255, 255, 255, 0);
        span {
          font-size: 50rpx;
          color: #ffffff;
        }
      }
      view {
        font-size: 25rpx;
        font-weight: 500;
        text-align: center;
        color: #666666;
        border: 2rpx solid #fff;
        padding: 3rpx 0;
      }
    }
  }
}

.del {
  position: absolute;
  right: -7rpx;
  top: -10rpx;
  color: #fe586b;
  font-weight: bold;
  font-size: 25rpx;
}
.topTitle {
  text-align: center;
  font-size: 30rpx;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f5f5f5;
}
.topicBg {
  border-bottom: 20rpx solid #f5f5f5;
  padding: 20rpx;
  > text {
    background: #9acaff;
    color: #007aff;
    padding: 5rpx 17rpx;
    margin-right: 20rpx;
    border-radius: 5rpx;
    line-height: 60rpx;
    position: relative;
  }
  > view {
    padding: 10rpx 0;
  }
}
.uni-swiper-tab-top {
  height: 70rpx;
  border-bottom: 2rpx solid #f5f5f5 !important;
}
.xianbai {
  padding: 20rpx 0;
  font-size: 22rpx;
  text-align: center;
}
.delimg {
  position: absolute;
  top: -10rpx;
  right: -10rpx;
  color: #fe586b !important;
  font-size: 19px !important;
  font-weight: bold;
  display: inline-block;
  background: #ffffff;
  border-radius: 50%;
  padding: 10rpx;
  width: 30rpx;
  height: 30rpx;
  line-height: 27rpx;
  text-align: center;
  z-index: 999;
}
textarea {
  padding: 5px;
}
.addBtn {
  text-align: center;
  margin: 60rpx 0;
}
.addBtn view {
  background: $fontLinear;
  color: #fff;
  font-size: 26rpx;
  padding: 14rpx 31rpx;
  border-radius: 30rpx;
  display: inline-block;
  width: 290rpx;
  box-shadow: 2rpx 3rpx 5rpx #f5f5f5;
}
.allorders-content {
  width: 100%;
  height: 100vh;
}
.list {
  height: 100%;
}
.allorders-title {
  text-align: center;
}
.allorders-title-scroll {
  height: 68rpx;
  line-height: 68rpx;
  padding: 20rpx 0;
  width: 100%;
  white-space: nowrap;
}
.allorders-title-scroll-item {
  display: inline-block;
  padding: 5rpx 40rpx;
  background: #f5f5f5;
  font-size: 28rpx;
  border-radius: 30rpx;
  margin: 0 20rpx;
  text-align: center;
}
.scroll-itemCor {
  background: $fontLinear;
  color: #fff;
}
.specification {
  padding: 20rpx 40rpx;
  view {
    font-size: 24rpx;
    font-weight: 200;
  }
}
.issueDyn-wrapper {
  height: 100vh;
  color: #333;
  width: 100%;
  position: fixed;
}
.issueDyn-header-wrapper {
  padding: 20rpx;
  background: #fff;
}
.issueDyn-wrapper-content {
  height: 60rpx;
  line-height: 60rpx;
}
.issueDyn-header {
  padding: 6rpx 40rpx;
  background: #eaeef7;
  font-size: 32rpx;
  border-radius: 30rpx;
  margin-right: 30rpx;
}
.issueDyn-selected {
  background: $fontLinear;
}
.issueDyn-swiper {
  display: flex;
  width: 2250rpx;
  position: relative;
  transition: left 0.4s;
}
.issueDyn-swiper-item {
  box-sizing: border-box;
  background: #fff;
  padding: 20rpx 0 100rpx;
  flex: 0 750rpx;
}
.issueDyn-swiper-itemTxt {
  padding: 20rpx 20rpx;
  display: inline-block;
  color: #222;
  font-size: 28rpx;
  height: 230rpx;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 20rpx;
}
.issueDyn-swiper-itemTxt2 {
  margin-top: 20rpx;
}
.issueDyn-swiper-itemAddIcon {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 50rpx;
}
.issueDyn-swiper-itemAddIcon > view {
  width: 25%;
  padding: 5px;
  height: 100px;
  line-height: 100px;
  box-sizing: border-box;
  display: flex;
  justify-items: center;
  justify-content: center;
  text-align: center;
}
.issueDyn-swiper-itemIcon {
  width: 100%;
  height: 100%;
  background: #f4f9ff;
  position: relative;
  border-radius: 10rpx;
}
.issueDyn-swiper-itemIcon .iconfont {
  font-size: 80rpx;
  color: #c5cdd8;
}
.issueDyn-swiper-itemIcon image {
  width: 100%;
  height: 100%;
  border-radius: 10rpx;
}

.issueDyn-swiper-itemLocation {
  padding: 0 20rpx;
  font-size: 28rpx;
  color: #222;
  padding: 20rpx 20rpx;
}
.issueDyn-swiper-itemLocation .issueDyn-swiper-itemLocation-label {
  font-size: 32rpx;
  color: #eaeef7;
  padding-right: 10rpx;
}
.issueDyn-swiper-itemLocation-right {
  float: right;
  color: #e3e3e3;
  font-size: 32rpx;
}
.picker-item {
  padding: 0 10px;
}
.issueDyn-swiper-item-date {
  display: flex;
  padding: 20rpx 0;
  align-items: center;
  justify-content: center;
}
.issueDyn-swiper-item-date-start,
.issueDyn-swiper-item-date-end {
  flex: 1;
  font-size: 30rpx;
  color: #222;
  text-align: center;
}
.issueDyn-swiper-item-date-icon {
  flex: 0 72rpx;
  display: inline-block;
  width: 72rpx;
  height: 8rpx;
  background: #eaeef7;
}
.issueDyn-swiper-item-addr {
  display: flex;
  padding: 30rpx 0;
  align-items: center;
  justify-content: center;
}
.issueDyn-swiper-item-addr-start,
.issueDyn-swiper-item-addr-end {
  flex: 1;
  font-size: 30rpx;
  color: #222;
  text-align: center;
}
.issueDyn-swiper-item-addr-icon {
  flex: 0 72rpx;
  color: #eaeef7;
  font-size: 52rpx;
  text-align: center;
}
.issueDyn-swiper-item-help {
  padding: 0 20rpx 20rpx;
}
.issueDyn-swiper-item-helpIcon {
  font-size: 28rpx;
  color: #333;
  border: 1rpx solid #e3e3e3;
  padding: 6rpx 30rpx;
  border-radius: 30rpx;
}
.issueDyn-model {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  // background: rgba(0, 0, 0, 0.4);
  z-index: 20;
  transition: top 0.4s;
}
.issueDyn-model-content {
  background: #fff;
  box-shadow: 2px 3px 15px #333333;
  width: 90%;
  height: 700rpx;
  margin: 20% 5% 0;
  border-radius: 6rpx;
  position: relative;
}
.issueDyn-model-content-hidden {
  position: absolute;
  right: -20rpx;
  top: -20rpx;
  font-size: 40rpx;
  color: #000;
}
.issueDyn-model-content-title {
  text-align: center;
  padding: 20rpx 0;
  font-size: 32rpx;
}
.issueDyn-model-content-txt {
  width: 90%;
  margin: 20rpx 5% 0;
  background: #eaeef7;
  font-size: 32rpx;
  padding: 20rpx;
  box-sizing: border-box;
  border-top-left-radius: 6rpx;
  border-top-right-radius: 6rpx;
  height: 140rpx;
}
.issueDyn-model-content-txtLabel {
  width: 90%;
  margin: 0 5% 20rpx;
  background: #eaeef7;
  font-size: 32rpx;
  padding-right: 20rpx;
  padding-bottom: 10rpx;
  box-sizing: border-box;
  border-bottom-left-radius: 6rpx;
  border-bottom-right-radius: 6rpx;
  text-align: right;
  color: #888;
}
.issueDyn-model-content-labelBox {
  padding: 20rpx;
}
.issueDyn-model-content-txtLabel-title {
  color: #888;
  font-size: 32rpx;
  padding: 20rpx 0;
}
.issueDyn-model-content-txtLabel-icon {
  font-size: 27rpx;
  padding: 6rpx 20rpx;
  border: 2rpx solid #999999;
  color: #222;
  display: inline-block;
  margin: 16rpx 10rpx;
  border-radius: 10rpx;
}
.issueDyn-model-content-txtLabel-activeClass {
  color: #fff;
  background: $fontLinear;
  border: none;
}
.issueDyn-model-contentBtn {
  text-align: center;
  margin-top: 40rpx;
}
.issueDyn-model-contentBtn-btn {
  display: inline-block;
  font-size: 32rpx;
  width: 60%;
  height: 60rpx;
  line-height: 60rpx;
  background: $fontLinear;
  border-radius: 6rpx;
}
</style>
