<template>
  <div class="allorders-wrapper">
    <div class="allorders-title">
      <scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
        <view v-for="(tab,index) in tabBars" :key="tab.id" :class="tabIndex === index  ? 'allorders-title-scroll-item tabsel' : 'allorders-title-scroll-item'" :id="tab.id" :data-current="index" @tap="tapTab">{{tab.name}}</view>
      </scroll-view>
    </div>
    <div class="allorders-content">
      <swiper :current="tabIndex" style="height: 100%" class="swiper-box" duration="300" @change="changeTab">
        <swiper-item class="swiper-box" v-for="(tab,key) in newsitems" :key="key">
          <scroll-view class="list" scroll-y v-if="OrderList">
            <div   class="cotent_full">
              <div v-for="(item,index) of OrderList.data" :key="index" @click.stop="getText(item)">
                <div class="allorders-content-item">
                  <div class="allorders-content-item-title">
                    <p class="allorders-content-item-title-part" @click.stop="nameSo(item)">
                      服务者：
                      <image v-if="item.userInfo" :src="item.userInfo.avatar" class='allorders-content-item-title-part-img' />
                      <span class='allorders-content-item-title-part-name'>{{item.userInfo.nickname ? item.userInfo.nickname :'正在通知附近陪陪...' }}</span>
                      <span class="iconfont icon-you"></span>
                    </p>
                    <p class="allorders-content-item-title-part2" v-if="item.status == 21"><span class="allorders-content-item-title-part2-label globalFontColor">[待接单]</span></p>
                    <p class="allorders-content-item-title-part2" v-if="item.status == 22"><span class="allorders-content-item-title-part2-label globalFontColor">[已接单，进行中]</span></p>
                    <p class="allorders-content-item-title-part2" v-if="item.status != 21 && item.status != 22"><span class="allorders-content-item-title-part2-label globalFontColor">[已结束]</span></p>
                  </div>
                  <div class="allorders-content-item-content">
                    <image v-if="item.userInfo.avatar" :src="item.userInfo.avatar" class='allorders-content-item-content-img' />
                    <p class='allorders-content-item-content-txt'>需要：
                      <span v-if="item.internet.length>0">线上服务、</span>
                      <span v-if="item.reality.length>0">线下服务</span>
                    </p>
                    <div class='allorders-content-item-content-price'>
                      <p class='allorders-content-item-content-money'>￥{{item.price_data}}元</p>
                      <p class='allorders-content-item-content-num'>x{{item.quantity}}</p>
                    </div>
                  </div>
                  <div>
                    <span class="allorders-content-item-footer-part1-serviceDate">希望线上:</span>
                    <span class="allorders-content-item-footer-part1-serviceDate" v-for="item of item.internet" :key="item">{{item}}、</span>
                  </div>
                   <div>
                     <span class="allorders-content-item-footer-part1-serviceDate">希望线下:</span>
                    <span class="allorders-content-item-footer-part1-serviceDate" v-for="item of item.reality" :key="item">{{item}}、
                    </span>
                  </div>
                  <div>
                    <span class="allorders-content-item-footer-part1-serviceDate">【服务日期】:{{item.providerTimeType}}</span>
                  </div>
                  <div class="allorders-content-item-footer">
                    <p class="allorders-content-item-footer-part1">
                      <span>【服务地点】:{{item.address.city  + '-'+  item.address.area}} </span>
                    </p>
                    <p class="allorders-content-item-footer-part2"  >
                      <span class="allorders-content-item-footer-part2-btn" v-if="item.status == 21"  @click.stop="cancel(item)">取消订单</span>
                      <span class="allorders-content-item-footer-part2-btn allorders-content-item-footer-part2-btn-sure" v-if="item.status == 22">陪陪已接单</span>
                    </p>
                  </div>
                </div>
                <wrap :height='16'></wrap>
              </div>
            </div>

            <div class="listNot" v-if="OrderList.data.length == 0  ">
              <!-- <image src="@/static/img/icon/kong.png"></image> -->
              <p>您当前还没有此订单...</p>
            </div>
          </scroll-view>
        </swiper-item>
      </swiper>
    </div>
    <!--评价-->
    <div class="popup" v-if="popupShow">
      <p>对Ta的服务评价</p>
      <p></p>
      <div>
        <input type="text" placeholder="评价下Ta吧">
      </div>
    </div>
    <!-- 规格-模态层弹窗 -->
    <view class="popup spec" :class="specClass" @touchmove.stop.prevent="stopPrevent">
      <!-- 遮罩层 -->
      <view class="mask"></view>
      <view class="layer evaluateBg" @click.stop="stopPrevent">
        <view>评价Ta的服务</view>
        <view>
          评分：
          <uni-rate :value="pingX" @change="pingXBtn"></uni-rate>
        </view>
        <view>
          <textarea placeholder="评价下Ta吧~" v-model="pingData"></textarea>
        </view>
        <br>
        <br>
        <view class="button-sp-area">
          <button class="mini-btn" type="primary" size="mini" @click="pingjia()">评价Ta</button>
        </view>
      </view>
    </view>
  </div>
</template>

<script>
import wrap from "@/components/wrap";
import uniRate from "@/components/uni-rate"
export default {
  data () {
    return {
      pingData: '',
      pingX: 5,
      curItem: 0,
      scrollLeft: 0,
      tabBars: [{
        name: '待接单',
        id: '21'
      }, {
        name: '进行中',
        id: '22'
      }, {
        name: '已结束',
        id: '4'
      }, {
        name: '全部',
        id: ''
      }],
      tabIndex: 0,
      tabID: '',
      newsitems: [],
      OrderList: '',
      specClass: 'none',
      orderNum: '',
      popupShow: false
    }
  },
  components: {
    wrap,
    uniRate
  },
  methods: {
    nameSo (item) {
      this.goPage('/pagesA/service/homePage/homePage?code=' + item.userInfo._id)
    },
    pingXBtn (e) {
      //console.log(e)
      this.pingX = e.value
    },
    pingjia () {
      let vm = this
      if (vm.pingData == '') {
        uni.showToast({
          title: '请输入评价内容',
          icon: 'none',
          duration: 2000
        });
        return
      }
      //console.log(vm.pingData)
      //console.log(vm.pingX)
      fly.post('/user/server/order/evaluationOrderByUser', {
        orderNum: vm.orderNum,
        evalText: vm.pingData,
        level: vm.pingX
      }, {
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        }
      }).then(function (res) {
        if (res.code == '000000') {
          uni.showToast({
            title: '评价成功',
            duration: 2000
          });
          vm.specClass = 'hide';
          setTimeout(() => {
            vm.specClass = 'none';
          }, 250);
          // 获取列表
          vm.getList(vm.tabIndex)
        } else {
          // 提示
          uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 3000
          })
        }
      })
    },
    // 时间过滤
    GetTime (value) {
      if (value == 0) {
        return '无'
      }
      var time = new Date(value * 1000);
      function add0 (m) {
        return m < 10 ? '0' + m : m
      }
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      var timeResult = y + '/' + add0(m) + '/' + add0(d) + ' ' + add0(h) + ':' + add0(mm);
      if (timeResult == '1970-01-01' || timeResult == '1970-01-02') {
        return '--'
      } else {
        return timeResult
      }
    },
    stopPrevent () {
    },
    // 评价订单
    evaluate (orderNum) {
      this.orderNum = orderNum
      if (this.specClass === 'show') {
        this.specClass = 'hide';
        setTimeout(() => {
          this.specClass = 'none';
        }, 250);
      } else if (this.specClass === 'none') {
        this.specClass = 'show';
      }
    },
    // 取消订单
    cancel (num, code, index) {
      let vm = this
      uni.showModal({
        title: '提示',
        content: '确定要取消该订单吗？',
        success: function (res) {
          if (res.confirm) {
            ////console.log('用户点击确定');
            fly.post('/user/server/order/canelOrderByUser', {
              orderNum: num,
              status: index
            }, {
              headers: {
                "content-type": "application/x-www-form-urlencoded"
              }
            }).then(function (res) {
              if (res.code == '000000') {
                uni.showToast({
                  title: '订单已取消',
                  duration: 2000
                });
                // 获取列表
                vm.getList(vm.tabIndex)
              } else {
                // 提示
                uni.showToast({
                  title: res.msg,
                  icon: 'none',
                  duration: 3000
                })
              }
            })
          } else if (res.cancel) {
            ////console.log('用户点击取消');
          }
        }
      });
    },
    getText (item) {
      this.goPage('/pagesA/service/homePage/homePage?code=' + item.userInfo._id)
    },
   async getList (index) {
     console.log(index)
     this.OrderList = ''
      const res = await this.$request("map", "getMapOrderUserList", {
        type:'my',
        status:Number(this.tabID)
        });
       this.OrderList = res
    },
    currentChange (cur) {
      this.curItem = cur
      switch (cur) {
        case 0:
          this.scrollLeft = 0
          break
        case 4:
          this.scrollLeft = (180 / 750 * this.windowWidth)
          break
      }
    },
    swiperCurrentChange (event) {
      this.curItem = event.target.current
      switch (event.target.current) {
        case 0:
          this.scrollLeft = 0
          break
        case 4:
          this.scrollLeft = (180 / 750 * this.windowWidth)
          break
      }
    },
    // 滑动tab
    async changeTab (e) {
      ////console.log(e,"切换了")
      // 获取列表
      this.getList(e.target.current)
      let index = e.target.current;
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
      ////console.log(index,"777777777777777777777777")
    },
    getElSize (id) { //得到元素的size
      return new Promise((res, rej) => {
        uni.createSelectorQuery().select("#" + id).fields({
          size: true,
          scrollOffset: true
        }, (data) => {
          res(data);
        }).exec();
      })
    },
    async tapTab (e) { //点击tab-bar
    console.log(this.tabBars[e.target.dataset.current].id)
    this.tabID = this.tabBars[e.target.dataset.current].id
      if (this.tabIndex === e.target.dataset.current) {
        return false;
      } else {
        let tabBar = await this.getElSize("tab-bar"),
          tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
        this.scrollLeft = tabBarScrollLeft;
        this.isClickChange = true;
        this.tabIndex = e.target.dataset.current
      }
    },
    randomfn () {
      let ary = [];
      for (let i = 0, length = this.tabBars.length; i < length; i++) {
        let aryItem = {
          loadingType: 0,
          data: []
        };
        for (let j = 1; j <= 10; j++) {
          aryItem.data.push(this['data' + Math.floor(Math.random() * 5)]);
        }
        ary.push(aryItem);
      }
      return ary;
    }
  },
  onLoad: function (option) {
    this.newsitems = this.randomfn()
    this.tabIndex = Number(option.index)
    // 获取列表
    this.getList(this.tabIndex)
  }
}
</script>

<style scoped lang="scss">
.button-sp-area {
  text-align: center;
  padding: 20upx 0;
}
.evaluateBg {
  padding: 20upx;
  text-align: left;
  line-height: 60upx;
  textarea {
    border: 1px solid #ddd;
    padding: 10px;
  }
}
/*  弹出层上下动画 */
.popup {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  &.show {
    display: block;
    .mask {
      animation: showPopup 0.2s linear both;
    }
    .layer {
      animation: showLayer 0.2s linear both;
    }
  }
  &.hide {
    .mask {
      animation: hidePopup 0.2s linear both;
    }
    .layer {
      animation: hideLayer 0.2s linear both;
    }
  }
  &.none {
    display: none;
  }
  .mask {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .layer {
    position: fixed;
    z-index: 99;
    bottom: 0;
    width: 100%;
    min-height: 40vh;
    border-radius: 10px 10px 0 0;
    background-color: #fff;
    .btn {
      height: 66px;
      line-height: 66px;
      border-radius: 100px;
      background: #fa436a;
      font-size: 28px + 2px;
      color: #fff;
      margin: 30px auto 20px;
    }
  }
  @keyframes showPopup {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes hidePopup {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes showLayer {
    0% {
      transform: translateY(120%);
    }
    100% {
      transform: translateY(0%);
    }
  }
  @keyframes hideLayer {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(120%);
    }
  }
}
.list {
  height: 100%;
}
.allorders-title {
  text-align: center;
}
.listNot {
  text-align: center;
  font-size: 30upx;
}
.listNot image {
  width: 400upx;
  height: 287upx;
}
.allorders-content {
  width: 100%;
  height: 100vh;
}
.swiper-box {
}
.cotent_full {
  padding-bottom: 100upx;
}
.allorders-wrapper {
  color: #333;
  height: 100vh;
  width: 100%;
  position: fixed;
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
  border-radius: 34rpx;
  color: #333;
  font-size: 28rpx;
  margin: 0 20rpx;
  background: #eaeef7;
}

.allorders-content-item-title {
  padding: 20rpx;
  display: flex;
  align-items: center;
  border-bottom: 1rpx solid #e7ebf1;
}
.allorders-content-item-title-part {
  flex: 1;
  font-size: 24rpx;
}
.allorders-content-item-title-part-img {
  display: inline-block;
  width: 34rpx;
  height: 34rpx;
  border-radius: 50%;
  vertical-align: top;
}
.allorders-content-item-title-part-name {
  color: #222;
  padding: 0 10rpx;
}
.allorders-content-item-title-part .iconfont {
  color: #cdd2de;
  font-size: 24rpx;
}
.allorders-content-item-title-part2 {
  flex: 1;
  text-align: right;
  font-size: 24rpx;
  color: #f60;
  font-weight: bold;
  padding: 2px 15px;
}
.allorders-content-item-content {
  display: flex;
  padding: 20rpx;
  width: 100%;
  box-sizing: border-box;
}
.allorders-content-item-content-img {
  flex: 0 100rpx;
  height: 100rpx;
  width: 100rpx;
}
.allorders-content-item-content-txt {
  flex: 0 470rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
  color: #222;
}
.allorders-content-item-content-price {
  flex: 0 230rpx;
  font-size: 28rpx;
  color: #222;
  text-align: right;
}
.allorders-content-item-content-num {
  color: #888888;
  padding-top: 20rpx;
}
.allorders-content-item-footer {
  display: flex;
  padding: 0 20rpx 20rpx;
  align-items: center;
}
.allorders-content-item-footer-part1 {
  flex: 1;
  font-size: 24rpx;
  color: #333;
}
.allorders-content-item-footer-part2 {
  flex: 1;
  text-align: right;
}
.allorders-content-item-footer-part2-btn {
  font-size: 28rpx;
  color: #fff;
  display: inline-block;
  width: 150rpx;
  height: 48rpx;
  line-height: 48rpx;
  border: 1rpx solid #eaeef7;
  border-radius: 6rpx;
  margin-left: 20rpx;
  text-align: center;
  background: $fontLinear;
}
.allorders-content-item-footer-part2-btn-sure {
  color: #fff;
  border-color: $fontLinear;
  background: $fontLinear;
}
.allorders-content-item-footer-part1-serviceDate {
  padding-left: 20rpx;
  font-size: 24rpx;
  color: #333;
}
</style>
