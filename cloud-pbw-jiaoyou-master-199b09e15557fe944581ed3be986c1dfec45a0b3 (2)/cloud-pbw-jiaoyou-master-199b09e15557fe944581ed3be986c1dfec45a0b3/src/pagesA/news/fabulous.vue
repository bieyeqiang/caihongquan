<template>
  <view class="fabulous">
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
      <view class="item" v-for="(item, index) of dataList" :key="index">
        <image
          class="head"
          :src="item.userInfo.avatar"
          @click.stop="goPage('/pagesA/service/homePage/homePage?code=' + item.userInfo._id)"
        ></image>
        <view class="content" @click.stop="goPage('/pagesA/nearby/nearbyText/nearbyText?code=' + item.dynamicId)">
          <view class="nick">
            <view class="name">
              <text>{{ item.userInfo.nickname }}</text>
              <!-- <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/travel/news/dengji.png"></image> -->
            </view>
            <text class="news">{{ item.nearby.dynamicContext }}</text>
          </view>
          <view class="text">
            <text>点赞了你的动态</text>
            <text>{{ item.add_time | getTimeText }}</text>
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
        text: '收到的赞'
      },
      dataList: [],
      userInfo: uni.getStorageSync('userInfo')
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
      const res = await this.$request('nearby', 'nearbyLikeList', data)
      this.dataList = res.data
    },
    tab () {
      uni.showActionSheet({
        itemList: ['收到的赞', '我赞过的'],
        success: res => {
          if (res.tapIndex == 0) {
            this.tabIndex.index = 0
            this.tabIndex.text = '收到的赞'
          } else {
            this.tabIndex.index = 1
            this.tabIndex.text = '我赞过的'
          }
          this.getList()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.fabulous {
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
    height: 100%;
    background: #ffffff;
    margin-top: 12rpx;
    padding: 34rpx 40rpx;
    .item {
      display: flex;
      margin-bottom: 20rpx;
      border-bottom: 1rpx solid #f5f5f5;
      padding-bottom: 20rpx;
      .head {
        width: 90rpx;
        height: 90rpx;
        margin-right: 24rpx;
        border-radius: 50%;
      }
      .content {
        flex: 1;
        .nick {
          display: flex;
          align-items: center;
          .name {
            flex: 1;
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
          .news {
            font-size: 24rpx;
            color: #666666;
            line-height: 34rpx;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /*autoprefixer: on */
            width: 50%;
            text-align: right;
          }
        }
        .text {
          display: flex;
          flex-direction: column;
          > text {
            font-size: 24rpx;
            color: #666666;
            line-height: 34rpx;
          }
          > text:last-child {
            color: #999999;
          }
        }
      }
    }
  }
}
</style>
