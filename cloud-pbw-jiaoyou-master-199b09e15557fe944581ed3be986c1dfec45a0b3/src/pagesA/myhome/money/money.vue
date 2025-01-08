<template>
  <view id="asset_xp">
    <view class="allorders-title">
      <scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
        <view v-for="(tab, index) in tabBars" :key="tab.id" :class="
            tabIndex === index
              ? 'allorders-title-scroll-item tabsel'
              : 'allorders-title-scroll-item'
          " :id="tab.id" :data-current="index" @tap="tapTab">{{ tab.name }}</view>
      </scroll-view>
    </view>
    <view class="allorders-content">
      <swiper :current="tabIndex" style="height: 100%;" class="swiper-box" duration="300" @change="changeTab">
        <swiper-item class="swiper-box" v-for="(tab, key) in newsitems" :key="key">
          <scroll-view class="list" scroll-y>
            <view v-if="key == 0" class="cotent_full">
              <view class="mg_top_30">
                <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/asset/money.png" width="100%" class="img_btm" alt=""></image>
                <view class="pos_abs img_two" v-if="userInfo">
                  <view class="font_18">金钱</view>
                  <view class="font_28">
                    <text>&yen;</text><text>{{ userInfo.money||0 }}元</text>
                  </view>
                  <view style="font_28">*充值、售卖技能可获得</view>
                </view>
                <view class="pos_absjb img_two">
                  <view class="font_18">陪伴币</view>
                  <view class="font_28"><text>&yen;0个</text></view>
                  <view style="font_28">*聊天可获得</view>
                </view>
                <!-- <view class="mg_top_115">
                  <view class="btn_pay yellow_btn" @click="navTo('/pagesA/wallet/recLog')">
                    充值
                  </view>
                  <view class="btn_pay yellow_btn" @click="msg('您没有可用的')">
                    提现
                  </view>
                </view> -->
                <!-- <view class="cell rows b-b" @click="navTo('/pagesA/wallet/moneyLog')">
                  <view class="cell rows" @click="navTo('/pagesA/wallet/moneyLog')">
                    <text class="jw-icon icon-wodezhanghu_zijinjilu"></text>
                    <text class="tit">资金记录</text>
                    <text class="jw-icon icon-you"></text>
                  </view>
                </view> -->
              </view>
            </view>
            <view v-if="key == 1">
              <view class="mg_top_30">
                <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/asset/moneyj.png" width="100%" class="img_btm" alt=""></image>
                <view class="pos_abs img_one">
                  <view class="font_18">众筹基金</view>
                  <view class="font_28">
                    <text>&yen;</text><text>0元</text>
                  </view>
                  <view style="font_28">*许愿愿望可获得</view>
                </view>
                <!-- <view class="mg_top_115">
                  <view class="btn_pay yellow_btn" @click="travelBtn">基金提现</view>
                </view> -->
              </view>
            </view>
            <view v-if="key == 2">
              <view class="mg_top_30">
                <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/asset/moneyjb.png" width="100%" class="img_btm" alt=""></image>
                <view class="pos_abs img_one">
                  <view class="font_18">聊天收益陪伴币</view>
                  <view class="font_28">
                    <text>&yen;</text><text>0个</text>
                  </view>
                  <view style="font_28">*聊天可获得</view>
                </view>
                <!-- <view class="mg_top_115">
                  <view class="btn_pay yellow_btn" @click="goldBtn">陪伴币提现</view>
                </view> -->
              </view>
            </view>
            <view v-if="key == 3">
              <view class="list_not">
                无优惠券
              </view>
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
import { mapState } from "vuex";

export default {
  data () {
    return {
      type: 0,
      recordData: "",
      tabBars: [
        {
          name: "金钱",
          id: "yue",
        },
        {
          name: "基金",
          id: "jijin",
        },
        {
          name: "陪伴币",
          id: "shouyi",
        },
        {
          name: "优惠券",
          id: "youhui",
        },
      ],
      tabIndex: 0,
      newsitems: [],
      isClickChange: false,
      scrollLeft: "",
    };
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    navTo (url) {
      //console.log;
      uni.navigateTo({
        url,
      });
    },
    // 时间过滤
    GetTime (value) {
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
        add0(m) +
        "月" +
        add0(d) +
        "日" +
        add0(h) +
        "时" +
        add0(mm) +
        "分" +
        add0(s) +
        "秒";
      if (timeResult == "1970-01-01" || timeResult == "1970-01-02") {
        return "--";
      } else {
        return timeResult;
      }
    },
    // 滑动tab
    async changeTab (e) {
      ////console.log(e)
      let index = e.target.current;
      ////console.log(index)
      if (this.isClickChange) {
        this.tabIndex = index;
        this.isClickChange = false;
        return;
      }
      let tabBar = await this.getElSize("tab-bar"),
        tabBarScrollLeft = tabBar.scrollLeft;
      let width = 0;
      for (let i = 0; i < index; i++) {
        let result = await this.getElSize(this.tabBars[i].id);
        width += result.width;
      }
      let winWidth = uni.getSystemInfoSync().windowWidth,
        nowElement = await this.getElSize(this.tabBars[index].id),
        nowWidth = nowElement.width;
      if (width + nowWidth - tabBarScrollLeft > winWidth) {
        this.scrollLeft = width + nowWidth - winWidth;
      }
      if (width < tabBarScrollLeft) {
        this.scrollLeft = width;
      }
      this.isClickChange = false;
      this.tabIndex = index; //一旦访问data就会出问题
    },
    getElSize (id) {
      //得到元素的size
      return new Promise((res, rej) => {
        uni
          .createSelectorQuery()
          .select("#" + id)
          .fields(
            {
              size: true,
              scrollOffset: true,
            },
            (data) => {
              res(data);
            }
          )
          .exec();
      });
    },
    async tapTab (e) {
      //点击tab-bar
      if (this.tabIndex === e.target.dataset.current) {
        return false;
      } else {
        let tabBar = await this.getElSize("tab-bar"),
          tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
        this.scrollLeft = tabBarScrollLeft;
        this.isClickChange = true;
        this.tabIndex = e.target.dataset.current;
      }
    },
    randomfn () {
      let ary = [];
      for (let i = 0, length = this.tabBars.length; i < length; i++) {
        let aryItem = {
          loadingType: 0,
          data: [],
        };
        for (let j = 1; j <= 10; j++) {
          aryItem.data.push(this["data" + Math.floor(Math.random() * 5)]);
        }
        ary.push(aryItem);
      }
      return ary;
    },
    goldBtn () {
      uni.showToast({
        title: "数量不够，无法提现",
        icon: "none",
        duration: 2000,
      });
    },
    travelBtn () {
      uni.showToast({
        title: "数量不够，无法提现",
        icon: "none",
        duration: 2000,
      });
    },
    changeRoute (type) {
      if (type == 0) {
        this.type = 0;
      } else if (type == 1) {
        this.type = 1;
      } else if (type == 2) {
        this.type = 2;
      } else if (type == 3) {
        this.type = 3;
      }
    },
    aboutMoney (type) {
      if (type == "goPay") {
        //充值
        uni.navigateTo({
          url: "/pagesA/myhome/goPay/goPay",
        });
      } else {
        //提现
        uni.navigateTo({
          url: "/pagesA/myhome/extract/extract",
        });
      }
    },
  },
  onLoad: function (option) {
    //option为object类型，会序列化上个页面传递的参数
    let vm = this;
    this.newsitems = this.randomfn();
    this.tabIndex = Number(option.index);
    ////console.log(this.tabIndex,"2222222222222")
  },
  onShow () {
  },
  updated () {
    ////console.log(this.tabIndex)
  },
};
</script>

<style lang="scss" scoped>
.cell {
  width: 100%;
  height: 60rpx;
  padding: 0 15rpx;

  &:after {
    left: 40rpx;
    right: 40rpx;
    border-color: #dfdcdc;
  }
  .tit {
    flex: 1;
    font-size: 30rpx;
    color: #333;
  }
  .jw-icon {
    width: 64rpx;
    font-size: 40rpx;
  }
  .icon-qianbao {
    color: #3ed098;
  }
  .icon-tixian {
    color: #fe7c7a;
  }
  .icon-wodezhanghu_zijinjilu {
    font-size: 42rpx;
    color: #fbbe59;
  }
  .icon-you {
    width: auto;
    font-size: 24rpx;
    color: #999;
  }
}
table {
  border: 1px solid #ddd;
  tr {
    width: 100%;
    display: flex;
    justify-content: center;
    td {
      padding: 5px;
      border: 1px solid #ddd;
      text-align: center;
      width: 49%;
      box-sizing: border-box;
    }
  }
}
.allorders-content {
  width: 100%;
  height: 100vh;
}
image {
  width: 100%;
}
.list {
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
.tabsel {
  background: $fontLinear !important;
  color: #fff !important;
}
.allorders-title-scroll-item {
  display: inline-block;
  width: 140rpx;
  height: 50rpx;
  text-align: center;
  line-height: 50rpx;
  border-radius: 24rpx;
  color: #333;
  font-size: 28rpx;
  margin: 0 20rpx;
  background: #eaeef7;
}
.list_not {
  font-size: 30upx;
  padding: 12upx 30upx;
  border-radius: 5upx;
  text-align: center;
  border: 1px solid #f5f5f5;
  color: #999999;
  width: 80%;
  margin: 200upx auto;
}
#asset_xp {
  color: #333;
  height: 100vh;
  width: 100%;
  position: fixed;
  .top_asset_xp {
    border-bottom: 7px solid #ddd;
    padding: 10px;
    text-align: center;
  }
  .top_asset_xp text {
    display: inline-block;
    font-size: 17 * 2rpx;
    padding: 5 * 2rpx 18 * 2rpx 6 * 2rpx;
    color: #333;
    margin: 0px 5 * 2rpx;
    border-radius: 25px;
  }
  .top_asset_xp .normal {
    background: #eaeef7;
  }
  .top_asset_xp .active {
    background: #fdd149;
  }
  .mg_top_30 {
    margin-top: 30 * 2rpx;
    position: relative;
    .pos_absjb {
      position: absolute;
      top: 58 * 2rpx;
      right: 36 * 2rpx;
      view {
        line-height: 1;
        margin: 20rpx 0;
        line-height: 1;
        color: #ffffff;
      }
    }
    .pos_abs {
      position: absolute;
      top: 58 * 2rpx;
      left: 36 * 2rpx;
      view {
        margin: 20rpx 0;
        line-height: 1;
        color: #ffffff;
      }
    }
    .img_btm {
      z-index: 0;
    }
    .img_one {
      color: #fff;
    }
    .img_two {
      color: #fff;
    }
    .font_18 {
      font-size: 18 * 2rpx;
      margin-bottom: 19 * 2rpx;
      color: #fff;
    }
    .font_28 {
      font-size: 28 * 2rpx;
      font-weight: 900;
      color: #fff;
    }
  }
  .mg_top_115 {
    margin-top: 115rpx;
    display: flex;
    justify-content: center;
    view {
      line-height: 1;
    }
    .btn_pay {
      margin: 0px 24 * 2rpx 38 * 2rpx;
      border-radius: 3px;
      font-size: 18 * 2rpx;
      padding: 8 * 2rpx;
      text-align: center;
      width: 30%;
      color: #fff;
    }
    .yellow_btn {
      background: nth($fontLinear, 1);
    }
    .white_btn {
      border: 1px solid #c5c5c5;
    }
  }
}
</style>
