<template>
  <view class="info" v-if="info">
    <view class="bar">
      <u-navbar :fixed="true" bgColor="rgba(255, 255, 255, 0.0)">
        <view slot="left" class="left" @click="goBack()">
          <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/travel/club/icon3.png" />
        </view>
        <view slot="right" class="right">
          <image
            src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/travel/club/icon2.png"
            @click="shareShow = true"
          />
        </view>
      </u-navbar>
    </view>
    <view class="image">
      <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/travel/club/bg.png" />
    </view>
    <view class="cont">
      <view class="head">
        <image :src="info.image" />
      </view>
      <view class="text">
        <view class="title">
          <text>{{ info.name }}</text>
        </view>
        <view class="notice">
          <text>{{ info.text }}</text>
        </view>
      </view>
      <view class="join" v-if="peopleList">
        <view class="img">
          <image v-for="(item, index) in peopleList" :key="index" :src="item.info.avatar" />
        </view>
        <view class="number">
          <text>{{ peopleList.length }}人已加入</text>
          <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/travel/club/more.png" />
        </view>
        <view class="joinButton" @click="join">
          <text>{{ text === 0 ? '已加入' : '立即加入' }}</text>
        </view>
      </view>
      <view class="wall">
        <text>留言墙</text>
        <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/travel/club/bg1.png" />
      </view>
      <view class="list">
        <view
          class="item"
          v-for="(item, index) in messageList"
          :key="index"
          @click="goPage('/other/nearby/nearbyText/nearbyText?code=' + item._id)"
        >
          <view class="top" v-if="item.userInfo">
            <image :src="item.userInfo.avatar" />
            <view class="name">
              <text>{{ item.userInfo.nickname }}</text>
              <text>{{ item.add_time | getTimeText }}</text>
            </view>
            <view class="follow" @click="follow(item.userInfo._id)">
              <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/travel/club/follow.png" />
              <text>关注</text>
            </view>
          </view>
          <view class="texts">
            <text>{{ item.dynamicContext }}</text>
          </view>
          <view class="imgList">
            <image :src="img" v-for="(img, key) of item.dynamicImg" :key="key"></image>
          </view>
          <view class="peo" v-if="false">
            <view>
              <text>气质：</text>
              <text>秦皇岛这么小，随便住个酒店，骑个小车就看到海了</text>
            </view>
            <view>
              <text>枉然：</text>
              <text>山西平遥古城 大胆点也可以来宁夏玩，石家庄到银…</text>
            </view>
          </view>
          <view class="icons">
            <view>
              <u-icon v-if="item.positionDesc" name="map" color="#999999" size="30"></u-icon>
              <text>{{ item.positionDesc }}</text>
            </view>
            <view class="right">
              <view>
                <u-icon name="chat" color="#999999" size="35"></u-icon>
                <text>{{ item.reply.length || 0 }}</text>
              </view>
              <view>
                <u-icon name="eye" color="#999999" size="35"></u-icon>
                <text>{{ item.look }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="interaction">
      <view @click="goPage('/pagesA/club/release?id=' + id)">
        <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/travel/club/write.png" />
        <text>互动一下</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      shareShow: false,
      info: '',
      id: '',
      messageList: '',
      text: '',
      peopleList: ''
    }
  },
  onLoad (option) {
    this.id = option.id
    this.getInfo(option.id)
    this.getMessageList(option.id)
    this.getState(option.id)
    this.getPeople(option.id)
  },
  methods: {
    // 关注
    async follow (id) {
      const res = await this.$request('fans', 'addFollow', {
        fansId: id,
        status: 0
      })
      console.log(res)
      if (res.state == 0) {
        this.msg('已关注')
      }
    },
    // 报名者
    async getPeople (id) {
      const res = await this.$request('circle', 'getPeople', {
        circleId: id
      })
      this.peopleList = res
      console.log(res)
    },
    // 立即加入
    async join () {
      if (this.text !== 0) {
        const res = await this.$request('circle', 'addCirclePeople', {
          circleId: this.id
        })
        console.log(res)
        this.getState(this.id)
        this.getPeople(this.id)
      }
    },
    // 报名加入状态
    async getState (id) {
      const res = await this.$request('circle', 'circleState', {
        circleId: id
      })
      // console.log(res);
      if (res.state == 0) {
        this.text = res.state
      }
    },
    async getInfo (id) {
      const res = await this.$request('circle', 'getInfoList', { id: id })
      console.log(res[0])
      this.info = res[0]
    },
    async getMessageList (id) {
      const res = await this.$request('nearby', 'nearbyList', {
        dynamicType: 6,
        offset: 1,
        limit: 100,
        clubId: id,
        state: 0
      })
      this.messageList = res.data
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  .bar {
    .left {
      > image {
        width: 48rpx;
        height: 48rpx;
      }
    }
    .right {
      > image {
        width: 48rpx;
        height: 48rpx;
      }
    }
  }
  .image {
    > image {
      width: 100%;
      height: 470rpx;
    }
  }
  .cont {
    width: 100%;
    height: 100%;
    background: #ffffff;
    border-radius: 20rpx 20rpx 0rpx 0rpx;
    margin-top: -90rpx;
    position: absolute;
    .head {
      width: 176rpx;
      height: 176rpx;
      background: #ffffff;
      border-radius: 30rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: -100rpx;
      margin-left: 40rpx;
      > image {
        width: 160rpx;
        height: 160rpx;
        border-radius: 20rpx;
      }
    }
    .text {
      padding: 0 40rpx;
      .title {
        margin: 20rpx 0;
        > text {
          font-size: 32rpx;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #333333;
          line-height: 44rpx;
        }
      }
      .notice {
        > text {
          font-size: 28rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 40rpx;
        }
        > image {
          width: 36rpx;
          height: 36rpx;
        }
      }
    }
    .join {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20rpx;
      padding: 0 40rpx;
      .img {
        display: flex;
        > image {
          width: 62rpx;
          height: 62rpx;
          border-radius: 50%;
          position: relative;
          margin-left: -20rpx;
          &:first-child {
            margin-left: 0rpx;
          }
        }
      }
      .number {
        display: flex;
        align-items: center;
        > image {
          width: 32rpx;
          height: 32rpx;
        }
        > text {
          font-size: 24rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 34rpx;
        }
      }
      .joinButton {
        width: 136rpx;
        height: 54rpx;
        background: linear-gradient(313deg, #9bd6ff 0%, #43acfd 100%);
        border-radius: 28rpx;
        text-align: center;
        > text {
          font-size: 28rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
          line-height: 54rpx;
        }
      }
    }
    .wall {
      display: flex;
      padding: 0 40rpx;
      margin-top: 40rpx;
      margin-bottom: 30rpx;
      > text {
        font-size: 32rpx;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #333333;
        line-height: 44rpx;
        position: relative;
        z-index: 1;
      }
      > image {
        width: 88rpx;
        height: 28rpx;
        position: absolute;
        margin-top: 24rpx;
        z-index: 0;
      }
    }
    .list {
      background: #f8f8f8;
      padding: 16rpx 20rpx;
      .item {
        background: #ffffff;
        border-radius: 20rpx;
        padding: 26rpx 20rpx;
        margin-bottom: 16rpx;
        .top {
          display: flex;
          > image {
            width: 86rpx;
            height: 86rpx;
            border-radius: 50%;
            margin-right: 18rpx;
          }
          .name {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            > text:first-child {
              font-size: 28rpx;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #333333;
              line-height: 40rpx;
            }
            > text:last-child {
              font-size: 24rpx;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #999999;
              line-height: 34rpx;
            }
          }
          .follow {
            display: flex;
            width: 140rpx;
            height: 53rpx;
            border-radius: 33rpx;
            border: 2rpx solid #a5d2f6;
            align-items: center;
            justify-content: center;
            > image {
              width: 20rpx;
              height: 20rpx;
              margin-right: 8rpx;
            }
            > text {
              font-size: 24rpx;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #a5d2f6;
              line-height: 34rpx;
            }
          }
        }
        .imgList {
          display: flex;
          flex-wrap: wrap;
          image {
            width: 148rpx;
            height: 148rpx;
            border-radius: 10rpx;
            margin-right: 10rpx;
            margin-bottom: 10rpx;
          }
        }
        .texts {
          display: flex;
          flex-direction: column;
          margin: 25rpx 10rpx;
          > text {
            font-size: 28rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            line-height: 40rpx;
          }
        }
        .peo {
          margin-top: 12rpx;
          > view {
            > text {
              font-size: 24rpx;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              line-height: 34rpx;
              &:first-child {
                color: #269ffe;
              }
              &:last-child {
                color: #666666;
              }
            }
          }
        }
        .icons {
          display: flex;
          justify-content: space-between;
          margin-top: 34rpx;
          > view {
            display: flex;
            align-items: center;
            color: #999999;
          }
          & image {
            width: 36rpx;
            height: 36rpx;
          }
          .right {
            display: flex;
            > view {
              display: flex;
              margin-left: 26rpx;
            }
            & text {
              font-size: 24rpx;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #999999;
              line-height: 34rpx;
              margin-left: 6rpx;
            }
          }
        }
      }
    }
  }

  .interaction {
    width: 100%;
    display: flex;
    justify-content: center;
    > view {
      width: 250rpx;
      height: 84rpx;
      background: #2e8ff8;
      box-shadow: 0rpx 0rpx 14rpx 0rpx rgba(38, 159, 254, 0.9);
      border-radius: 20rpx;
      position: fixed;
      bottom: 68rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      > text {
        font-size: 32rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 44rpx;
        margin-left: 14rpx;
      }
      > image {
        width: 44rpx;
        height: 44rpx;
      }
    }
  }
}
</style>
