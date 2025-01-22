<template>
  <view class="allorders-wrapper">
    <view class="allorders-content">
      <scroll-view class="list" scroll-y>
        <!--待付款-->
        <view class="cotent_full"  >
          <view class="list" v-for="(item,index) of OrderList" :key="index">
            <view class="allorders-content-item">
              <view class="allorders-content-item-title">
                <p class="allorders-content-item-title-part" @click="goPage('/pagesA/service/homePage/homePage?code=' + item.uid)">
                  需求者：
                  <image :src="item.userInfo.avatar" class='allorders-content-item-title-part-img' />
                  <text class='allorders-content-item-title-part-name'>{{item.userInfo.nickname}}</text>
                  <text class="iconfont icon-you"></text>
                </p>
                <p class="allorders-content-item-title-part2" v-if="item.status == 0"><text class="allorders-content-item-title-part2-label globalFontColor">[待付款]</text></p>
                <p class="allorders-content-item-title-part2" v-if="item.status == 1"><text class="allorders-content-item-title-part2-label globalFontColor">[订单已取消]</text></p>
              </view>
              <view class="allorders-content-item-content">
                <image :src="item.userInfo.avatar" class='allorders-content-item-content-img' @click="goPage('/pagesA/service/homePage/homePage?code=' + item.uid)" />
                <view class='allorders-content-item-content-txt'>
                  <text>需要：</text>
                  <text v-if="item.internet.length>0">【线上服务】</text>
                  <text v-if="item.reality.length>0">【线下服务】</text>
                </view>

                <view class='allorders-content-item-content-price'>
                  <p class='allorders-content-item-content-money'>x{{item.quantity}}</p>
                  <p class='allorders-content-item-content-num'>付￥{{item.price_data}}元</p>
                </view>
              </view>
              <view>
                <text class="allorders-content-item-footer-part1-serviceDate" v-if="item.internet.length>0">【线上服务】：<text v-for="item of item.internet" :key="item">{{item}}、</text></text>
              </view>
              <view>
                <text class="allorders-content-item-footer-part1-serviceDate" v-if="item.reality.length>0">【线下服务】： <text v-for="item of item.reality" :key="item">{{item}}、</text></text>
              </view>
              <view>
                <text class="allorders-content-item-footer-part1-serviceDate">【服务日期】：{{item.providerTimeType}}</text>
              </view>
              <view class="allorders-content-item-footer">
                <p class="allorders-content-item-footer-part1">
                  <text>【服务地点】：{{item.address.city + '-'+ item.address.area}} </text>
                </p>
                <p class="allorders-content-item-footer-part2">
                  <text class="allorders-content-item-footer-part2-btn cor" v-if="item.status != 21 && userInfo._id == item.providerUid">已接单</text>
                  <text class="allorders-content-item-footer-part2-btn" v-if="item.status != 21 && userInfo._id != item.providerUid">已被抢接</text>
                  <text class="allorders-content-item-footer-part2-btn allorders-content-item-footer-part2-btn-sure" v-if="item.status == 21" @click.stop="lookBtn(item)">立即接此单</text>
                </p>
              </view>
            </view>
          </view>
        </view>

        <view class="listNot" v-if=" OrderList.length == 0">
          <p>当前还没有老板下单...</p>
        </view>
      </scroll-view>
    </view>

  </view>
</template>

<script>

export default {
  data () {
    return {
      OrderList: [],
      userInfo: uni.getStorageSync('userInfo')
    }
  },
  onLoad () {
    this.getList()
  },
  methods: {
    async lookBtn (item) {
      let userInfo = this.$store.state.userInfo
      if (!userInfo) {
        this.goPage('/pagesA/login/auth/login')
        this.msg('请先登录')
        return
      }
      if (userInfo.realname_auth.auth_status != 1 && userInfo.realname_auth.auth_status != 2) {
        this.goPage('/pagesA/service/certification/certification')
        this.msg('请先认证陪陪服务者')
        return
      }
      const res = await this.$request('map', 'userMapOrder', {
        id: item._id
      });
      if (res.status == 0) {
        this.msg('抢单成功')
      } else {
        this.msg('抢单失败，已被抢')
      }
      this.getList()
    },
    //加载列表
    async getList (e) {
      const res = await this.$request('map', 'getMapOrderList', {});
      this.OrderList = res.data
    },
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

.cotent_full {
  padding-bottom: 100upx;
  .list {
    padding: 20rpx;
    border-bottom: 20rpx solid #f5f5f5;
  }
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
  height: 200rpx;
  width: 300rpx;
  border-radius: 20rpx;
}
.allorders-content-item-content-txt {
  flex: 0 470rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
  color: #222;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.allorders-content-item-content-price {
  flex: 0 230rpx;
  font-size: 28rpx;
  color: #222;
  text-align: right;
}
.allorders-content-item-content-num {
  color: #6665f6;
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
  color: #222;
  display: inline-block;
  width: 200rpx;
  padding: 20rpx 10rpx;
  border: 1rpx solid #eaeef7;
  border-radius: 6rpx;
  margin-left: 20rpx;
  text-align: center;
  background: #f5f5f5;
}
.cor {
  border-color: $fontLinear;
  background: $bg;
  color: #fff;
}
.allorders-content-item-footer-part2-btn-sure {
  color: #fff;
  border-color: $fontLinear;
  background: $fontLinear;
  padding: 20rpx 10rpx;
}
.allorders-content-item-footer-part1-serviceDate {
  padding-left: 20rpx;
  font-size: 24rpx;
  color: #333;
}
</style>
