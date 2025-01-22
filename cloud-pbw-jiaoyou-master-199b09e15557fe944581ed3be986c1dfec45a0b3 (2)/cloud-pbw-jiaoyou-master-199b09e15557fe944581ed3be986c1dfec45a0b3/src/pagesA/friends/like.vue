<template>
  <view class="people">
    <view class="bar">
      <u-navbar :placeholder="true" autoBack>
        <view slot="left" class="left">
          <image
            src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/travel/personal/left.png"
          />
        </view>
        <view slot="center" class="center">
          <view
            :class="num == index ? 'backg' : ''"
            v-for="(item, index) in title"
            :key="index"
            @click="pick(index)"
          >
            <text>{{ item }}</text>
            <view></view>
          </view>
        </view>
      </u-navbar>
    </view>
    <view class="del" v-show="show">
      <text>错滑的人可以送花挽回</text>
      <image
        @click="show = false"
        src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/travel/personal/del.png"
      />
    </view>
    <view class="list">
      <view
        class="item"
        v-for="(item, index) in list"
        :key="index"
        @click="goPage('/pagesA/service/homePage/homePage?code=' + item.uid)"
      >
        <image v-if="item.info" class="head" :src="item.info.avatar" />
        <view v-if="item.info" class="info">
          <view class="nick">
            <text>{{ item.info.nickname }}</text>
            <image
              v-if="item.vip == 1"
              src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/travel/personal/vip02.png"
            />
          </view>
          <text class="intro"
            >{{ item.info.birthdayText ? item.info.birthdayText + '岁·' : ''
            }}{{
              item.info.infoDetails
                ? item.info.infoDetails.height
                  ? item.info.infoDetails.height + '·'
                  : ''
                : ''
            }}{{
              item.info.infoDetails
                ? item.info.infoDetails.job
                  ? item.info.infoDetails.job
                  : ''
                : ''
            }}</text
          >
        </view>
        <image
          class="flower"
          src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/travel/personal/flower.png"
        />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: ['喜欢的人', '无感的人'],
      num: 0,
      show: true,
      list: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    pick(index) {
      this.num = index
      this.getList()
    },
    async getList() {
      const res = await this.$request('like', 'getLike', {
        state: this.num
      })
      this.list = res.data
    }
  }
}
</script>

<style lang="scss" scoped>
.people {
  padding: 16rpx 32rpx;
  & text {
    font-family: PingFangSC-Regular, PingFang SC;
  }
  .bar {
    .left {
      > image {
        width: 40rpx;
        height: 40rpx;
      }
    }
    .center {
      width: 60%;
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
  .del {
    width: 100%;
    height: 86rpx;
    padding: 0 16rpx;
    background-color: #fff2f4;
    border-radius: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & text {
      font-size: 28rpx;
      color: #666666;
      line-height: 40rpx;
    }
    & image {
      width: 44rpx;
      height: 44rpx;
    }
  }
  .list {
    .item {
      display: flex;
      height: 140rpx;
      background: #ffffff;
      border-radius: 20rpx;
      padding: 0 16rpx;
      margin-top: 16rpx;
      align-items: center;
      .head {
        width: 90rpx;
        height: 90rpx;
        border-radius: 50%;
        margin-right: 16rpx;
      }
      .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        .nick {
          display: flex;
          margin-bottom: 4rpx;
          > text {
            font-size: 28rpx;
            font-weight: 600;
            color: #333333;
            line-height: 40rpx;
          }
          > image {
            width: 48rpx;
            height: 40rpx;
            margin-left: 12rpx;
          }
        }
        .intro {
          font-size: 24rpx;
          color: #999999;
          line-height: 34rpx;
        }
      }
      .flower {
        width: 92rpx;
        height: 92rpx;
      }
    }
  }
}
</style>
