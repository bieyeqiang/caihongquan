<template>
  <view class="visitor">
    <view class="bar">
      <view class="center">
        <view :class="num == index ? 'backg' : ''" v-for="(item, index) in title" :key="index" @click="pick(index)">
          <text>{{ item }}</text>
          <view></view>
        </view>
      </view>
    </view>
    <view class="cont">
      <view class="browse" v-if="num == 0">
        <view>
          <text>{{ todayLook }}</text>
          <text>今日浏览</text>
        </view>
        <view>
          <text>{{ yesterdayLook }}</text>
          <text>昨日浏览</text>
        </view>
        <view>
          <text>{{ sumLook }}</text>
          <text>总浏览</text>
        </view>
      </view>
      <!--<view class="vip" v-if="num == 0">-->
      <!--  <view class="left">-->
      <!--    <view class="title">-->
      <!--      <text>无痕访问</text>-->
      <!--      <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/travel/personal/vip03.png" />-->
      <!--    </view>-->
      <!--    <text class="text">开启此功能，查看别人的主页，将不会留下访</text>-->
      <!--  </view>-->
      <!--  <view class="right">-->
      <!--    <switch />-->
      <!--  </view>-->
      <!--</view>-->
      <view class="list">
        <view class="item" v-for="(item, index) in list" :key="index" @click="goPage('/pagesA/service/homePage/homePage?code=' + item.info._id)">
          <image :src="item.info.avatar" />
          <view class="info">
            <text class="nick">{{ item.info.nickname }}</text>
            <text class="look">{{ shijianc(item.today) + text }}</text>
          </view>
          <text class="time">{{ formatMsgTime(item.today) }}</text>
        </view>
        <jw-empty v-if="list.length == 0"></jw-empty>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: ['我看过的', '我的访客'],
      sumLook: 0,
      todayLook: 0,
      yesterdayLook: 0,
      num: 0,
      value: false,
      list: [],
      text: ''
    }
  },
  created() {},
  onLoad(e) {
    this.num = e.index
    console.log(this.num)
    this.followList()
  },
  methods: {
    async followList() {
      const operation = this.num == 0 ? 'mineLook' : 'getLook'
      const res = await this.$request('look', operation)
      this.list = res.data
      this.sumLook = 0
      // 总浏览
      this.list.forEach((item) => {
        this.sumLook += item.browse
      })
      const todayStartTime = new Date(new Date().setHours(0, 0, 0, 0)).getTime()
      // 今日浏览
      this.todayLook = this.list.filter((item) => {
        return item.startTime === todayStartTime
      }).length
      // 昨日浏览
      const day = todayStartTime - 24 * 60 * 60 * 1000
      this.yesterdayLook = this.list.filter((item) => {
        return (item.yesterday >= day && item.yesterday < todayStartTime) || (item.today >= day && item.today < todayStartTime)
      }).length
      this.text = this.num == 0 ? '查看了他的主页' : '查看了我的主页'
    },
    pick(index) {
      this.num = index
      this.list = []
      this.followList()
    },
    // 多长时间前
    formatMsgTime(timespan) {
      var dateTime = new Date(timespan) // 将传进来的字符串或者毫秒转为标准时间
      var year = dateTime.getFullYear()
      var month = dateTime.getMonth() + 1
      var day = dateTime.getDate()
      var hour = dateTime.getHours()
      var minute = dateTime.getMinutes()
      var millisecond = dateTime.getTime() // 将当前编辑的时间转换为毫秒
      var now = new Date() // 获取本机当前的时间
      var nowNew = now.getTime() // 将本机的时间转换为毫秒
      var milliseconds = 0
      var timeSpanStr
      milliseconds = nowNew - millisecond
      if (milliseconds <= 1000 * 60 * 1) {
        // 小于一分钟展示为刚刚
        timeSpanStr = '刚刚'
      } else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
        // 大于一分钟小于一小时展示为分钟
        timeSpanStr = Math.round(milliseconds / (1000 * 60)) + '分钟前'
      } else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
        // 大于一小时小于一天展示为小时
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前'
      } else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
        // 大于一天小于十五天展示位天
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前'
      } else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year === now.getFullYear()) {
        timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute
      } else {
        timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute
      }
      return timeSpanStr
    },
    // 时间-时:分
    shijianc(time) {
      var date = new Date(time)
      var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
      return h + m
    }
  }
}
</script>

<style lang="scss" scoped>
.visitor {
  padding-bottom: 20rpx;
  background-color: #ffffff;
  & text {
    font-family: PingFangSC-Regular, PingFang SC;
  }
  .cont {
    padding: 0 32rpx;
  }
  .bar {
    padding: 40rpx 32rpx;
    background-color: #ffffff;
    .center {
      width: 100%;
      display: flex;
      justify-content: space-around;
      > view {
        & text {
          font-size: 32rpx;
          color: #666666;
          line-height: 44rpx;
        }
      }
      .backg {
        display: flex;
        justify-content: center;
        > text {
          font-size: 32rpx;
          font-weight: 600;
          color: #333333;
          line-height: 44rpx;
          position: relative;
        }
        & view:last-child {
          width: 30rpx;
          height: 4rpx;
          background-color: #333333;
          border-radius: 4rpx;
          position: absolute;
          margin-top: 48rpx;
        }
      }
    }
  }
  .browse {
    height: 174rpx;
    background: #f6f7fb;
    border-radius: 20rpx;
    padding: 48rpx 0;
    display: flex;
    margin-top: 20rpx;
    > view {
      width: 33%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      border-right: 4rpx dashed #999999;
      &:last-child {
        border: none;
      }
      & text:first-child {
        font-size: 36rpx;
        font-weight: 600;
        color: #333333;
      }
      & text:last-child {
        font-size: 28rpx;
        color: #999999;
      }
    }
  }
  .vip {
    height: 122rpx;
    background: #f6f7fb;
    border-radius: 20rpx;
    margin-top: 20rpx;
    padding: 0 24rpx;
    display: flex;
    align-items: center;
    .left {
      flex: 1;
      display: flex;
      flex-direction: column;
      .title {
        display: flex;
        align-items: center;
        > text {
          font-size: 28rpx;
          font-weight: 600;
          color: #333333;
          line-height: 40rpx;
          margin-right: 6rpx;
        }
        > image {
          width: 88rpx;
          height: 32rpx;
        }
      }
      .text {
        font-size: 22rpx !important;
        color: #666666;
        line-height: 32rpx;
      }
    }
  }
  .list {
    display: flex;
    flex-direction: column;
    .item {
      width: 100%;
      height: 140rpx;
      background: #ffffff;
      border-radius: 18rpx;
      padding: 0 26rpx;
      margin-top: 12rpx;
      display: flex;
      align-items: center;
      > image {
        width: 94rpx;
        height: 94rpx;
        border-radius: 14rpx;
        margin-right: 24rpx;
      }
      .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        .nick {
          font-size: 28rpx;
          font-weight: 600;
          color: #333333;
          line-height: 44rpx;
        }
        .look {
          font-size: 24rpx;
          color: #999999;
          line-height: 44rpx;
        }
      }
      .time {
        font-size: 24rpx;
        color: #999999;
        line-height: 34rpx;
      }
    }
  }
}
</style>
