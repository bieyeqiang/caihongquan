<template>
  <view class="container" v-if="ServeData">
    <jw-loading v-if="!ServeData" :type="2"></jw-loading>
    <view class="carousel">
      <swiper indicator-dots circular="true">
        <swiper-item class="swiper-item" :autoplay="true" v-for="(item, index) in ServeData.images" :key="index">
          <view class="image-wrapper" @click="title_img(item)">
            <image :src="item" mode="aspectFill" lazy-load class="loaded"></image>
          </view>
        </swiper-item>
      </swiper>
    </view>
    <view class="introduce-section">
      <text class="title">【{{ ServeData.typeText }}】{{ ServeData.title }}</text>
      <view class="price-box">
        <text class="price-tip">¥ </text>
        <text class="price">{{ ServeData.price }}元 /{{ ServeData.priceTypeText }}</text>
        <!--<text class="m-price">¥488</text>-->
        <text class="coupon-tip" style="margin-left: 20px;">限时优惠</text>
      </view>
      <view class="bot-row">
        <!-- <text>下单: {{ ServeData.sales || 0 }}</text> -->
        <text>浏览: {{ ServeData.look_num || 0 }}</text>
        <!-- <text>评价: {{ ServeData.sales || 0 }}</text> -->
      </view>
    </view>
    <view class="serviceInfo-user-wrapper" v-if="ServeData.userInfo && ServeData.userInfo.length>0">
      <view class="nameLeft">
        <image :src="ServeData.userInfo[0].avatar" class="serviceInfo-user-img" @click="goPage('/pagesA/service/homePage/homePage?code=' + ServeData.uid)" />
        <view class="serviceInfo-user-info" @click="goPage('/pagesA/service/homePage/homePage?code=' + ServeData.uid)">
          <view class="serviceInfo-user-info-name">
            {{ ServeData.userInfo[0].nickname }}
            <text class="ph-basicInfo-info-icon ph-basicInfo-info-sex" v-if="ServeData.userInfo[0].gender == 2">
              <text class="iconfont">&#xe640;</text>
              {{ ServeData.userInfo[0].birthdayText || "" }}
            </text>
            <text class="ph-basicInfo-info-icon ph-basicInfo-info-sex_name" v-if="ServeData.userInfo[0].gender == 1">
              <text class="iconfont">&#xe638;</text>
              {{ ServeData.userInfo[0].birthdayText || "" }}
            </text>
          </view>
          <view class="serviceInfo-user-info-icon">
            {{ ServeData.typeText }}服务
          </view>
        </view>
      </view>
      <view>
        <text class="serviceInfo-userFocus-btn" v-if="!attention" @click="attentionBtn"><text class="iconfont">&#xe6bd;</text>关注</text>
        <text class="serviceInfo-userFocus-btn" v-if="attention" @click="attentionBtn">取消关注</text>
        <text class="serviceInfo-userFocus-btn" @click.stop="nameSel()"><text class="iconfont">&#xe6bc;</text>举报</text>
      </view>
    </view>
    <view v-if="ServeData.photoList && ServeData.photoList.length != 0">
      <view class="photoList">
        <view class="photo" v-for="(item, index) of ServeData.photoList" :key="index" v-if="index < 8" @click="photoLook(item)">
          <image :src="item" mode="aspectFill" lazy-load></image>
          <view class="photoNum" v-if="index == 7">+{{ ServeData.photoList.length - 8 }}</view>
        </view>
      </view>
    </view>
    <!--  分享 -->
    <view class="share-section">
      <view class="share-icon">
        <text class="yticon icon-xingxing"></text>荐
      </view>
      <text class="tit">推荐给你的朋友下单吧！~</text>
      <!--<text class="yticon icon-bangzhu1"></text>-->
      <!-- #ifdef APP-PLUS -->
      <view class="share-btn" @click="shareShow = !shareShow" v-if="ServeData.status == 1">
        推荐到微信
        <text class="yticon icon-you"></text>
      </view>
      <!-- #endif -->
      <!-- #ifdef MP-WEIXIN -->
      <button class="share-btn" v-if="ServeData.status == 1" @onShareAppMessage="onShareAppMessage" open-type="share">
        推荐到微信<text class="yticon icon-you"></text>
      </button>
      <!-- #endif -->
    </view>
    <view class="c-list">
      <view class="c-row b-b">
        <text class="tit">服务价格</text>
        <view class="con">
          <text class="selected-text">
            {{ ServeData.price }}元/{{ ServeData.priceTypeText }}
          </text>
        </view>
      </view>
      <view class="c-row b-b">
        <text class="tit">服务类型</text>
        <view class="con">
          <text class="selected-text"> {{ ServeData.typeText }}服务 </text>
        </view>
      </view>
      <view class="c-row b-b" v-if="false">
        <text class="tit">服务方式</text>
        <view class="con">
          <text class="selected-text">
            <text v-for="(item,index) of ServeData.mode" :key="index">{{item}},</text>
          </text>
        </view>
      </view>
      <view class="c-row b-b">
        <text class="tit">服务群体</text>
        <view class="con">
          <text class="selected-text">
            一对一服务
          </text>
        </view>
      </view>
      <view class="c-row b-b">
        <text class="tit">服务时间</text>
        <view class="con">
          <text class="selected-text">
            <text v-for="(item,index) of ServeData.serviceTime" :key="index">{{item}},</text>
          </text>
        </view>
      </view>
      <view class="c-row b-b">
        <text class="tit">服务位置</text>
        <view class="con">
          <text class="selected-text">
            {{ ServeData.cityAll.province.label +  ServeData.cityAll.city.label +  ServeData.cityAll.area.label }}
          </text>
        </view>
      </view>
      <view class="c-row b-b" v-if="ServeData.servePriceArrayStr">
        <text class="tit">费用包含</text>
        <view class="con-list">
          <text>{{ ServeData.servePriceArrayStr || "无" }}</text>
        </view>
      </view>
      <view class="c-row b-b" v-if="ServeData.priceExcluded">
        <text class="tit">费用不含</text>
        <view class="con-list">
          <text>{{ ServeData.priceExcluded || "无" }}</text>
        </view>
      </view>
      <view class="c-row b-b">
        <text class="tit">服务</text>
        <view class="bz-list con">
          <text>全程帮助 ·</text>
          <text>优质服务</text>
        </view>
      </view>
      <view class="c-row b-b" @click="coupon">
        <text class="tit">优惠券</text>
        <text class="con t-r red">暂无优惠券</text>
        <text class="yticon icon-you"></text>
      </view>
    </view>
    <!--    内容-->
    <view class="detail-desc">
      <view class="d-header">
        <text>服务详情</text>
      </view>
      <view style="padding: 10px;">
        <br />
        <rich-text :nodes="ServeData.content"></rich-text>
        <br />
      </view>
    </view>
    <view class="detail-desc" v-if="ServeData.contain != ''">
      <view class="d-header">
        <text>费用包含</text>
      </view>
      <view style="padding: 10px;">
        {{ ServeData.contain }}
      </view>
    </view>
    <view class="detail-desc" v-if="ServeData.notContain != ''">
      <view class="d-header">
        <text>费用不包含</text>
      </view>
      <view style="padding: 10px;">
        {{ ServeData.notContain }}
      </view>
    </view>
    <view class="detail-desc" v-if="ServeData.supplement != ''">
      <view class="d-header">
        <text>补充说明</text>
      </view>
      <view style="padding: 10px;">
        {{ ServeData.supplement }}
      </view>
    </view>
    <view class="detail-desc">
      <view class="d-header">
        <text style="color: #9b9b9b;">服务标准</text>
      </view>
      <view style="padding: 10px;font-size:24rpx;">
        <view style="color: #9b9b9b;">
          <view style="color: #9b9b9b;">
            1、热情、周到、细致的服务精神，提供全方位的优质服务。
          </view>
          <view style="color: #9b9b9b;">
            2、服务前认真熟悉服务计划及服务事宜，风趣幽默的落实服务客人。
          </view>
          <view style="color: #9b9b9b;">
            3、向客人详细介绍本次服务的安排、注意事项。（使用礼貌用语，热情服务，关心客人，及时为客人提供便利及需要。讲解内容要丰富、生动、有趣，并根据客人的兴趣随时调整话题。）
          </view>
          <!-- <view style="color: #9B9B9B">4、线下服务的坚持三不原则：不私自增加约定行程之外的其他消费点；不推荐客人进入非法性的消费场所；不私自带客人进入收取回佣的购物店。</view> -->
          <!-- <view style="color: #9B9B9B">5、线下服务的服务当天，及时和客人联系确认出发时间及行程安排， 提前30分钟到达指定的地点。</view> -->
        </view>
      </view>
    </view>
    <view class="detail-desc">
      <view class="d-header">
        <text style="color: #9b9b9b;">预定须知</text>
      </view>
      <view style="padding: 10px;font-size:24rpx;">
        <view style="color: #9b9b9b;">
          <view style="color: #9b9b9b;">
            1.为避免您预订的时间与其他客户预定的时间有冲突，请及时下单,下订单后我将根据您的时间，为您及时安排日程。
          </view>
          <view style="color: #9b9b9b;">
            2.服务工作时间以个人来定（通常为8小时工作制）为准，具体可询问双方，若需提前或延长或特殊情况，请提前告知协商。
          </view>
          <view style="color: #9b9b9b;">
            3.请仔细阅读服务详情、服务事项、包含项及不包含项，以免造成不必要的麻烦。
          </view>
          <view style="color: #9b9b9b;">
            4.成功预订并下单后，我会及时联系您进行沟通，请保持电话畅通。
          </view>
          <view style="color: #9b9b9b;">
            5.线下服务的，为保证您的行程顺利进行，请尽量提前1天预定。
          </view>
          <view style="color: #9b9b9b;">
            6.因特殊情况原因，不能进行服务时，未进行的订单将取消订单，进行中的订单将双方协商取消。
          </view>
          <view style="color: #9b9b9b;">
            7.因战争、政变、罢工、天气、交通延阻、飞机故障、航班取消或更改时间等不可抗力原因所引致的额外费用将不承担。
          </view>
        </view>
      </view>
    </view>
    <!-- 评价 -->
    <view class="eva-section" v-if="infoData && infoData.data">
      <view class="e-header" @click="navTo('/pagesA/rating/rating?id='+data._id)">
        <text class="tit">评价</text>
        <text>({{ infoData.count }})</text>
        <text class="tip">好评率 {{ ServeData.rating_ratio || 100 }}%</text>
        <text class="yticon icon-you"></text>
      </view>
      <view class="eva-box" v-if="infoData.data" v-for="(item, index) of infoData.data" :key="index">
        <image class="portrait" :src="item.user.anonymous" mode="aspectFill"></image>
        <view class="right">
          <text class="name">{{ item.user.username }}</text>
          <text class="con">{{ item.content }}</text>
          <view class="bot">
            <view class="attr">
              <uni-rate size="18" max="5" disabled="true" is-fill="true" :value="item.rating"></uni-rate>
            </view>
            <text class="time">{{ timeGet(item.createTime) }}</text>
          </view>
        </view>
      </view>
      <view style="text-align: center; color: #9b9b9b;" v-if="infoData.data.length == 0">暂无评价</view>
    </view>
    <view style="height: 80px; background: #fff;"></view>
    <!-- 底部操作菜单 -->
    <view class="page-bottom" v-if="option.type != 'admin'">
      <view @click="iconBtn(0)" class="p-b-btn">
        <text class="iconfont">&#xe68f;</text>
        <text>首页</text>
      </view>
      <view class="p-b-btn" :class="{ active: favorite }" @click="iconBtn(2)">
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
        <!-- <button type="primary" class="action-btn no-border buy-now-btn" @click="iconBtn(3)">
              立即下单
            </button> -->
        <button type="primary" class="action-btn no-border add-cart-btn" @click="iconBtn(4)">
          立即预约
        </button>
        <!--审核中-->
        <text v-if="ServeData.status == 0" class="status iconfont" style="color: #1cafaf;" @click="iconBtn(3)">&#xe779;</text>
        <!--不通过-->
        <text v-if="ServeData.status == 2" class="status iconfont" style="color: #eb5248;" @click="iconBtn(3)">&#xe698;</text>
        <!--已下架-->
        <text v-if="ServeData.status == 3" class="status iconfont" style="color: #999999;" @click="iconBtn(3)">&#xe999;</text>
      </view>
    </view>

    <!--分享-我也发布技能-->
    <view class="fabu" v-if="option.type == 'share'" @click.stop="fabuBtn">
      <view>
        <view class="iconfont">&#xe6a1;</view>我也发布
      </view>
    </view>
    <!--分享-->
    <share :shareData="shareData" :shareShow="shareShow"></share>
  </view>
</template>

<script>
import share from "@/components/share";
import uniRate from "@/components/uni-rate";
export default {
  components: {
    share,
    uniRate,
  },
  data () {
    return {
      option: "",
      specClass: "none",
      specSelected: [],
      favorite: false,
      shareList: [],
      imgList: [],
      specList: [{
        id: 1,
        name: "尺寸",
      },
      {
        id: 2,
        name: "颜色",
      },
      ],
      specChildList: [{
        id: 1,
        pid: 1,
        name: "XS",
      },
      {
        id: 2,
        pid: 1,
        name: "S",
      },
      {
        id: 3,
        pid: 1,
        name: "M",
      },
      {
        id: 4,
        pid: 1,
        name: "L",
      },
      {
        id: 5,
        pid: 1,
        name: "XL",
      },
      {
        id: 6,
        pid: 1,
        name: "XXL",
      },
      {
        id: 7,
        pid: 2,
        name: "白色",
      },
      {
        id: 8,
        pid: 2,
        name: "珊瑚粉",
      },
      {
        id: 9,
        pid: 2,
        name: "草木绿",
      },
      ],
      curItem: 0,
      ServeData: "",
      servesList: "",
      photoList: [],
      infoData: "",
      shareShow: false,
      shareData: {
        Name: "",
        NameImg: "",
        Title: "",
        Text: "",
        TitleImg: "",
        Money: "",
        Type: "",
        Path: "",
        Url: "",
        nameData: "",
      },
      attention: false,
      userCode: "",
    };
  },
  onShow () {
    this.loadData();
  },
  onLoad (option) {
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
        return false;
      }
      option.type = getQueryVariable(option.scene, "type");
      option.code = getQueryVariable(option.scene, "code");
    }
    this.option = option;
    this.loadRating(); //加载评价
  },
  methods: {
    //添加浏览历史
    addProductHistory () {
      const data = this.ServeData;
      let list = uni.getStorageSync('productHistory');
      if (!list) {
        list = [];
      }
      const index = list.findIndex(item => item.id === data._id);
      if (index !== -1) {
        list.splice(index, 1);
      }
      list.unshift({
        id: data._id,
        thumb: data.thumb
      })
      uni.setStorageSync('productHistory', list);
    },
    async loadData () {
      const res = await this.$request('product', 'getDetail', {
        id: this.option.id
      })
      const user = await this.$request("home", "getUserHome", {
        uid: res.data.uid,
      });

      if (res.status === 0) {
        this.$util.msg(res.msg || '产品不存在或已下架');
        setTimeout(() => {
          uni.navigateBack();
        }, 1000)
        return;
      }
      const data = res.data;
      data.content = data.content.replace(/img src="/g, 'img style="display:block;width:100%;height:auto" src="');
      this.ServeData = data;

      if (user) {
        this.ServeData.photoList = []
        if (user.photoList.length > 0) {
          user.photoList.forEach((item) => {
            this.ServeData.photoList.push(item.imgPath)
          })
        }
        if (user.userInfo) {
          user.userInfo[0].photoWall.forEach((item) => {
            this.ServeData.photoList.push(item)
          })
        }
      }
      //添加浏览历史
      this.addProductHistory();
    },
    //加载评价
    async loadRating () {
      const res = await this.$request('rating', 'getDetailRating', {
        product_id: this.option.id,
      })
      this.infoData = res;
    },
    coupon () {
      uni.showToast({
        title: "暂无优惠券",
        icon: "none",
        duration: 3000,
      });
    },
    photoLook (img) {
      uni.previewImage({
        current: img,
        urls: this.ServeData.photoList,
      });
    },
    title_img (img) {
      //console.log(this.imgList);
      //console.log(img);
      uni.previewImage({
        current: img,
        urls: this.imgList,
      });
    },
    randomNum (min, max) {
      return Math.floor(min + Math.random() * (max - min));
    },
    nameSel () {
      uni.showActionSheet({
        itemList: ["举报", "拉黑"],
        success: (res) => {
          //console.log("选中了第" + (res.tapIndex + 1) + "个按钮");
          if (res.tapIndex + 1 == 1) {
            this.report();
          }
          if (res.tapIndex + 1 == 2) {
            this.shield();
          }
        },
        fail: function (res) {
          //console.log(res.errMsg);
        },
      });
    },
    shield () {
      uni.showModal({
        title: "拉黑",
        content: "要拉黑该用户吗？",
        success: function (res) {
          if (res.confirm) {
            //console.log("用户点击确定");
            uni.showToast({
              title: "该用户已拉黑",
              icon: "none",
              duration: 3000,
            });
          } else if (res.cancel) {
            //console.log("用户点击取消");
          }
        },
      });
    },
    report () {
      uni.showModal({
        title: "举报",
        content: "要举报该技能服务吗？",
        success: function (res) {
          if (res.confirm) {
            //console.log("用户点击确定");
            uni.showToast({
              title: "已收到您的举报，我们尽快审查",
              icon: "none",
              duration: 3000,
            });
          } else if (res.cancel) {
            //console.log("用户点击取消");
          }
        },
      });
    },
    attentionBtn () {
    },
    timeGet: function (value) {
      var time = new Date(value);
      function add0 (m) {
        return m < 10 ? "0" + m : m;
      }
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      var timeResult =
        y + "/" + add0(m) + "/" + add0(d) + " " + add0(h) + ":" + add0(mm);
      if (timeResult == "1970-01-01" || timeResult == "1970-01-02") {
        return "--";
      } else {
        return timeResult;
      }
    },
    fabuBtn () {
      // 去登录
      if (!uni.getStorageSync("uniIdToken")) {
        uni.navigateTo({
          url: "/pagesA/login/auth/login",
        });
        return;
      }
      uni.switchTab({
        url: "/pages/myhome/myhome",
      });
    },
    onShareAppMessage (res) {
      if (res.from === "button") {
        // 来自页面内分享按钮
        ////console.log(res.target)
      }
      return {
        title: "[" +
          this.ServeData.pushTypeStr +
          "] " +
          this.ServeData.title +
          " - 赶快来看看吧~",
        path: "pagesB/service/serviceInfo/serviceInfo?type=share&code=" +
          this.option.code,
      };
    },

    // 服务详情
    servesBtn (code) {
      uni.navigateTo({
        url: "/pagesA/service/serviceInfo/serviceInfo?code=" + code,
      });
    },
    swiperCurrentChange (event) {
      this.curItem = event.target.current;
    },
    //规格弹窗开关
    toggleSpec () {
      if (this.specClass === "show") {
        this.specClass = "hide";
        setTimeout(() => {
          this.specClass = "none";
        }, 250);
      } else if (this.specClass === "none") {
        this.specClass = "show";
      }
    },
    //选择规格
    selectSpec (index, pid) {
      let list = this.specChildList;
      list.forEach((item) => {
        if (item.pid === pid) {
          this.$set(item, "selected", false);
        }
      });
      this.$set(list[index], "selected", true);
      //存储已选择
      /**
       * 修复选择规格存储错误
       * 将这几行代码替换即可
       * 选择的规格存放在specSelected中
       */
      this.specSelected = [];
      list.forEach((item) => {
        if (item.selected === true) {
          this.specSelected.push(item);
        }
      });
    },
    //收藏
    toFavorite () {
      this.favorite = !this.favorite;
    },
    iconBtn (index) {
      // 去登录
      if (!uni.getStorageSync("uniIdToken")) {
        uni.navigateTo({
          url: "/pagesA/login/auth/login",
        });
        return;
      }
      // 0首页 2点赞  3购买 4联系ta
      if (index == 0) {
        uni.switchTab({
          url: "/pages/explore/explore",
        });
      }
      if (index == 2) {
        this.favorite = !this.favorite;
      }
      if (index == 3) {
        uni.navigateTo({
          url: "/pagesA/order/orderAdd/orderAdd?service=" +
            this.ServeData._id +
            "&from_id=" +
            this.ServeData.userInfo[0]._id,
        });
      }
      if (index == 4) {
        if (uni.getStorageSync("uniIdToken")) {
          // #ifdef APP-PLUS
          uni.navigateTo({
            url: "/pagesIM/im/im-chat/im-chat?title=" + this.ServeData.userInfo[0].nickName + "&fromUser=" + this.ServeData.userInfo[0]._id,
          });
          // #endif
          //#ifdef MP-WEIXIN
          uni.navigateTo({
            url: "/pagesA/message/HM-chat/HM-chat?from_id=" + this.ServeData.userInfo[0]._id + "&nickName=" + this.ServeData.userInfo[0].nickname,
            animationDuration: 300,
          });
          // #endif
        } else {
          uni.navigateTo({
            url: "/pagesA/login/auth/login",
          });
        }
      }
    },
    stopPrevent () { },
  },
  onNavigationBarButtonTap () {
    // ////console.log('点击了分享')
    this.shareShow = !this.shareShow;
  },
};
</script>

<style lang="scss" scoped>
.photoList {
  display: flex;
  padding: 30rpx 18rpx 20rpx 18rpx;
  flex-wrap: wrap;
}
.photo {
  padding: 5rpx;
  display: inline-block;
  position: relative;
  image {
    width: 170rpx;
    height: 180rpx;
    display: inline-block;
    border-radius: 10rpx;
    box-shadow: 1rpx 3rpx 6rpx #333333;
  }
  .photoNum {
    color: #fff;
    font-size: 90rpx;
    position: absolute;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.ph-basicInfo-info-icon {
  font-size: 21rpx;
  margin: 0 20rpx;
  border-radius: 8rpx;
  color: #fff;
  text {
    font-size: 25rpx;
    margin-right: 10rpx;
  }
}
.ph-basicInfo-info-sex {
  color: #fe6ed0;
  font-weight: bold;
  padding: 0 10rpx;
  position: relative;
  top: 0rpx;
}
.ph-basicInfo-info-sex_name {
  color: #00c7ff;
  font-weight: bold;
  padding: 0 10rpx;
  position: relative;
  top: 0rpx;
}
.container {
  background: #f6f6f6;
}
.fabu {
  position: fixed;
  right: 20rpx;
  bottom: 300rpx;
  background: #eb5248;
  color: #fff;
  padding: 10rpx 5rpx;
  border-radius: 50rpx;
  font-size: 30rpx;
  box-shadow: 2px 5px 5px #ddd;
  > view {
    display: flex;
    padding: 15rpx 0;
    flex-direction: column;
    width: 40rpx;
    text-align: center;
    color: #ffffff;
    > view {
      font-size: 30rpx;
      color: #ffffff;
    }
  }
}
.status {
  position: absolute;
  left: 22rpx;
  top: -124rpx;
  font-size: 129rpx;
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
/* 页面左右间距 */
$page-row-spacing: 30rpx;
$page-color-base: #f8f8f8;
$page-color-light: #f8f6fc;
$cor: #fa436a;
/* 文字尺寸 */
$font-sm: 24rpx;
$font-base: 28rpx;
$font-lg: 32rpx;
/*文字颜色*/
$font-color-dark: #303133;
$font-color-base: #606266;
$font-color-light: #909399;
$font-color-disabled: #c0c4cc;
$font-color-spec: #4399fc;
/* 边框颜色 */
$border-color-dark: #dcdfe6;
$border-color-base: #e4e7ed;
$border-color-light: #ebeef5;
/* 图片加载中颜色 */
$image-bg-color: #eee;
/* 行为相关颜色 */
$uni-color-primary: #fa436a;
$uni-color-success: #4cd964;
$uni-color-warning: #f0ad4e;
$uni-color-error: #dd524d;
/*
                                      全局公共样式和字体图标
                                  */
@font-face {
  font-family: yticon;
  font-weight: normal;
  font-style: normal;
  src: url('https://at.alicdn.com/t/font_1078604_w4kpxh0rafi.ttf')
    format('truetype');
}
.yticon {
  font-family: 'yticon' !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.icon-xiatubiao--copy:before {
  content: '\e608';
}
.icon-gouwuche:before {
  content: '\e609';
}
.icon-shoucang:before {
  content: '\e645';
}
.icon-xingxing:before {
  content: '\e70b';
}
.icon-you:before {
  content: '\e606';
}
.icon-bangzhu1:before {
  content: '\e63d';
}
.icon-dianzan-ash:before {
  content: '\e617';
}
page {
  background: $page-color-base;
  padding-bottom: 160rpx;
}
.icon-you {
  font-size: $font-base + 2rpx;
  color: #888;
}
.carousel {
  height: 722rpx;
  position: relative;
  swiper {
    height: 100%;
  }
  .image-wrapper {
    width: 100%;
    height: 100%;
  }
  .swiper-item {
    display: flex;
    justify-content: center;
    align-content: center;
    height: 750rpx;
    overflow: hidden;
    image {
      width: 100%;
      height: 100%;
    }
  }
}
.serviceInfo-user-wrapper {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background: #fff;
  border-top: 8px solid #f6f6f6;
  justify-content: space-between;
}
.nameLeft {
  display: flex;
}
.serviceInfo-user-info {
  padding-left: 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.serviceInfo-user-info-name {
  font-size: 26rpx;
  color: #515151;
}
.serviceInfo-user-info-icon {
  font-size: 20rpx;
  color: #22b529;
  border: 2rpx solid #22b529;
  height: 30rpx;
  text-align: center;
  line-height: 30rpx;
  border-radius: 6rpx;
  padding: 0 13rpx;
  margin-top: 10rpx;
  display: inline-block;
}
.serviceInfo-userFocus {
  flex: 0 150rpx;
}
.serviceInfo-userFocus-btn {
  text {
    font-size: 22rpx;
    color: #fff;
  }
  margin-right: 20rpx;
  font-size: 22rpx;
  color: #fff;
  display: inline-block;
  width: 110rpx;
  text-align: center;
  height: 40rpx;
  line-height: 40rpx;
  background: $fontLinear;
  border-radius: 20rpx;
}
.serviceInfo-user-img {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
}
/* 标题简介 */
.introduce-section {
  background: #fff;
  padding: 20rpx 30rpx;
  .title {
    font-size: 32rpx;
    color: $font-color-dark;
    height: 50rpx;
    line-height: 50rpx;
  }
  .price-box {
    display: flex;
    align-items: baseline;
    height: 64rpx;
    padding: 10rpx 0;
    font-size: 26rpx;
    color: $uni-color-primary;
  }
  .price {
    font-size: $font-lg + 2rpx;
    font-weight: bold;
  }
  .m-price {
    margin: 0 12rpx;
    color: $font-color-light;
    text-decoration: line-through;
  }
  .coupon-tip {
    align-items: center;
    padding: 4rpx 10rpx;
    background: $uni-color-primary;
    font-size: $font-sm;
    color: #fff;
    border-radius: 6rpx;
    line-height: 1;
    transform: translateY(-4rpx);
  }
  .bot-row {
    display: flex;
    align-items: center;
    height: 50rpx;
    font-size: $font-sm;
    color: $font-color-light;
    text {
      flex: 1;
    }
  }
}
/* 分享 */
.share-section {
  display: flex;
  align-items: center;
  color: $font-color-base;
  background: linear-gradient(left, #fdf5f6, #fbebf6);
  padding: 12rpx 30rpx;
  .share-icon {
    display: flex;
    align-items: center;
    width: 70rpx;
    height: 30rpx;
    line-height: 1;
    border: 1px solid $uni-color-primary;
    border-radius: 4rpx;
    position: relative;
    overflow: hidden;
    font-size: 22rpx;
    color: $uni-color-primary;
    &:after {
      content: '';
      width: 50rpx;
      height: 50rpx;
      border-radius: 50%;
      left: -20rpx;
      top: -12rpx;
      position: absolute;
      background: $uni-color-primary;
    }
  }
  .icon-xingxing {
    position: relative;
    z-index: 1;
    font-size: 24rpx;
    margin-left: 2rpx;
    margin-right: 10rpx;
    color: #fff;
    line-height: 1;
  }
  .tit {
    font-size: $font-base;
    margin-left: 10rpx;
  }
  .icon-bangzhu1 {
    padding: 10rpx;
    font-size: 30rpx;
    line-height: 1;
  }
  .share-btn {
    flex: 1;
    text-align: right;
    font-size: $font-sm;
    color: $uni-color-primary;
  }
  .icon-you {
    font-size: $font-sm;
    margin-left: 4rpx;
    color: $uni-color-primary;
  }
}
.c-list {
  font-size: $font-sm + 2rpx;
  color: $font-color-base;
  background: #fff;
  .c-row {
    display: flex;
    align-items: center;
    padding: 20rpx 30rpx;
    position: relative;
  }
  .tit {
    width: 140rpx;
  }
  .con {
    flex: 1;
    color: $font-color-dark;
    .selected-text {
      margin-right: 10rpx;
    }
  }
  .bz-list {
    height: 40rpx;
    font-size: $font-sm + 2rpx;
    color: $font-color-dark;
    text {
      display: inline-block;
      margin-right: 30rpx;
    }
  }
  .con-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    color: $font-color-dark;
    line-height: 40rpx;
  }
  .red {
    color: $uni-color-primary;
  }
}
/* 评价 */
.eva-section {
  display: flex;
  flex-direction: column;
  padding: 20rpx 30rpx;
  background: #fff;
  margin-top: 16rpx;
  .e-header {
    display: flex;
    align-items: center;
    height: 70rpx;
    font-size: $font-sm + 2rpx;
    color: $font-color-light;
    .tit {
      font-size: $font-base + 2rpx;
      color: $font-color-dark;
      margin-right: 4rpx;
    }
    .tip {
      flex: 1;
      text-align: right;
    }
    .icon-you {
      margin-left: 10rpx;
    }
  }
}
.eva-box {
  display: flex;
  padding: 20rpx 0;
  .portrait {
    flex-shrink: 0;
    width: 80rpx;
    height: 80rpx;
    border-radius: 100px;
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    font-size: $font-base;
    color: $font-color-base;
    padding-left: 26rpx;
    .con {
      font-size: $font-base;
      color: $font-color-dark;
      padding: 20rpx 0;
    }
    .bot {
      display: flex;
      justify-content: space-between;
      font-size: $font-sm;
      color: $font-color-light;
    }
  }
}
/*  详情 */
.detail-desc {
  background: #fff;
  margin-top: 16rpx;
  .d-header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80rpx;
    font-size: $font-base + 2rpx;
    color: $font-color-dark;
    position: relative;
    text {
      padding: 0 20rpx;
      background: #fff;
      position: relative;
      z-index: 1;
    }
    &:after {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%);
      width: 300rpx;
      height: 0;
      content: '';
      border-bottom: 1px solid #ccc;
    }
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
</style>
