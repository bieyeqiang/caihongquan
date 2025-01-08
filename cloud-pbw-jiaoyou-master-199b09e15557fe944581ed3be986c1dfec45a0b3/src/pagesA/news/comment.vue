<template>
  <view class="comment">
    <view class="bar">
      <u-navbar :placeholder="true" autoBack>
        <view slot="left" class="left">
          <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/travel/news/right.png"></image>
        </view>
        <view slot="center" class="center" @click="tab()">
          <text>{{ tabIndex.text }}</text>
          <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/travel/news/down.png"></image>
        </view>
      </u-navbar>
    </view>
    <view class="list">
      <view
        class="item"
        v-for="(item, index) of dataList"
        :key="index"
        @click="goPage('/pagesA/nearby/nearbyText/nearbyText?code=' + item.dynamicId)"
      >
        <view v-if="tabIndex.index == 0">
          <view class="people">
            <image :src="item.userInfo.avatar"></image>
            <view class="cont">
              <view class="name">
                <text>{{ item.userInfo.nickname }}</text>
                <!-- <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/travel/news/dengji.png"></image> -->
              </view>
              <text class="time">{{ item.add_time | getTimeText }}</text>
            </view>
            <text class="reply">回复Ta</text>
          </view>
          <view class="news">
            <text></text>
            <text>{{ item.comment }}</text>
          </view>
          <view class="news-reply">
            <text>我发布的：</text>
            <text v-if="item.dynamic">{{ item.dynamic.dynamicContext }}</text>
          </view>
        </view>
        <view v-if="tabIndex.index == 1">
          <view class="people">
            <image :src="item.toUserInfo.avatar"></image>
            <view class="cont">
              <view class="name">
                <text>{{ item.toUserInfo.nickname }}</text>
                <!-- <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/travel/news/dengji.png"></image> -->
              </view>
              <text class="time">{{ item.add_time | getTimeText }}</text>
            </view>
            <text class="reply">回复Ta</text>
          </view>
          <view class="news">
            <text></text>
            <text v-if="item.reply">{{ item.dynamic.dynamicContext }}</text>
          </view>
          <view class="news-reply">
            <text>我的评论：</text>
            <text>{{ item.comment }}</text>
          </view>
        </view>
      </view>
      <jw-empty v-if="dataList.length == 0"></jw-empty>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      tabIndex: {
        index: 0,
        text: '收到的评论'
      },
      userInfo: uni.getStorageSync('userInfo'),
      dataList: []
    }
  },
  onLoad () {
    this.getList()
  },
  methods: {
    async getList () {
      let data = {}
      this.dataList = []
      if (this.tabIndex.index == 0) {
        data.toUid = this.userInfo._id
      } else {
        data.uid = this.userInfo._id
      }
      const res = await this.$request('nearby', 'nearbyReplyList', data)
      this.dataList = res
    },
    tab () {
      uni.showActionSheet({
        itemList: ['收到的评论', '我评论过的'],
        success: res => {
          if (res.tapIndex == 0) {
            this.tabIndex.index = 0
            this.tabIndex.text = '收到的评论'
          } else {
            this.tabIndex.index = 1
            this.tabIndex.text = '我评论过的'
          }
          this.getList()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.comment {
  height: auto;
  & text {
    font-family: PingFangSC-Medium, PingFang SC;
    color: #333333;
  }
  .bar {
    .left {
      > image {
        width: 40rpx;
        height: 40rpx;
      }
    }
    .center {
      display: flex;
      > text {
        font-size: 32rpx;
        font-weight: 600;
        line-height: 44rpx;
      }
      > image {
        width: 56rpx;
        height: 56rpx;
      }
    }
  }
  .list {
    width: 100%;
    height: 40%;
    background: #ffffff;
    margin-top: 12rpx;
    padding: 12rpx 40rpx;
    .item {
      padding-bottom: 32rpx;
      margin-bottom: 38rpx;
      border-bottom: 2rpx solid #f3f3f3;
      .people {
        display: flex;
        > image {
          width: 90rpx;
          height: 90rpx;
          margin-right: 24rpx;
          border-radius: 50%;
        }
        .cont {
          flex: 1;
          display: flex;
          flex-direction: column;
          .name {
            margin-bottom: 12rpx;
            > text {
              font-size: 28rpx;
              font-weight: 600;
              line-height: 40rpx;
              margin-right: 10rpx;
            }
            > image {
              width: 26rpx;
              height: 30rpx;
            }
          }
          .time {
            font-size: 24rpx;
            color: #999999;
            line-height: 34rpx;
          }
        }
        .reply {
          width: 110rpx;
          height: 42rpx;
          border-radius: 22rpx;
          background-color: #ff6a5f;
          font-size: 24rpx;
          line-height: 42rpx;
          color: #ffffff;
          text-align: center;
        }
      }
      .news {
        margin: 30rpx 0 16rpx 0;
        > text:first-child {
          font-size: 28rpx;
          font-weight: 600;
          color: #7db5ec;
          line-height: 40rpx;
        }
        > text:last-child {
          font-size: 28rpx;
          line-height: 40rpx;
        }
      }
      .news-reply {
        width: 100%;
        min-height: 90rpx;
        background: #f8f8f8;
        border-radius: 20rpx;
        padding-left: 64rpx;
        display: flex;
        align-items: center;
        > text:first-child {
          font-size: 28rpx;
          font-weight: 600;
          color: #7db5ec;
          line-height: 40rpx;
        }
        > text:last-child {
          font-size: 28rpx;
          line-height: 40rpx;
        }
      }
    }
    .pull {
      margin-top: 12rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      > text {
        font-size: 22rpx;
        color: #666666;
        line-height: 32rpx;
      }
      > image {
        width: 16rpx;
        height: 22rpx;
      }
    }
  }
}
</style>
