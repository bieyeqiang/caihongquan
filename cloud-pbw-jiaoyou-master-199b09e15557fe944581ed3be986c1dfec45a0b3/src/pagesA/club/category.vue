<template>
  <view class="category">
    <view class="title">
      <u-search
        class="search"
        placeholder="输入群ID,群名称"
        v-model="keyword"
        :showAction="false"
        height="56rpx"
        :searchIconSize="25"
        color="#999999"
      ></u-search>
      <text @click="goPage('/pagesA/club/set')">创建</text>
    </view>
    <view class="list">
      <scroll-view class="scroll" :scroll-top="scrollTop" scroll-y="true" show-scrollbar="false">
        <view class="cate">
          <!-- <view
            :class="active == 1 ? 'cate-item active' : 'cate-item'"
            @click="
              active = 1
              current = -1
            "
          >
            <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/travel/club/category1.png" />
            <text>已加入</text>
          </view> -->
          <view
            :class="current == index ? 'cate-item active' : 'cate-item'"
            v-for="(item, index) in list"
            @click="menuTab(index)"
            :key="index"
          >
            <image :src="item.image" />
            <text>{{ item.name }}</text>
          </view>
        </view>
      </scroll-view>
      <scroll-view class="scroll-info" :scroll-top="scrollTop" scroll-y="true" show-scrollbar="false">
        <view class="info">
          <view
            class="item"
            v-for="(item, index) in circleList"
            :key="index"
            @click="goPage('/pagesA/club/info?id=' + item._id)"
          >
            <view class="top">
              <image :src="item.image"></image>
              <view class="name">
                <text class="text">{{ item.name }}</text>
                <view v-if="item.joinNum">
                  <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/travel/club/icon1.png"></image>
                  <text>{{ item.joinNum || 0 }}</text>
                </view>
              </view>
            </view>
            <!-- <view class="say">
							<view class="text">
								<text>#驴友说</text>
								<text>{{getMessageInfo(item._id)}}</text>
							</view>
							<view class="image">
								<image v-if="item.info.SrcList" :src="item.info.SrcList[0]"></image>
								<text>99</text>
							</view>
						</view> -->
          </view>
          <jw-empty v-if="circleList.length == 0"></jw-empty>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      circleList: '',
      keyword: '',
      active: 0, //已加入状态显示
      current: 0, //当前点击项
      scrollTop: 0, //左侧导航栏距离顶部的位置
      list: []
    }
  },
  onLoad () {
    this.getCircleTypeList()
  },
  methods: {
    // 圈子分类列表
    async getCircleTypeList () {
      const res = await this.$request('circle', 'getCategoryList')
      this.list = res
      this.getCircleList(res[0]._id)
    },
    // 圈子列表
    async getCircleList (circleTypeId) {
      const res = await this.$request('circle', 'getInfoList', {
        circleTypeId: circleTypeId,
        state: 2
      })
      this.circleList = res
    },
    async getMessageInfo (id) {
      const res = await this.$request('circle', 'getMessageInfo', { id: id })
      return res[0].content
    },
    menuTab (index) {
      this.current = index
      this.active = 0
      this.getCircleList(this.list[index]._id)
    }
  }
}
</script>

<style lang="scss" scoped>
.category {
  & text {
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    font-size: 20rpx;
    color: #4f94f4;
  }

  background: #ffffff;
  .title {
    display: flex;
    align-items: center;
    background: #ffffff;
    padding: 40rpx 42rpx 26rpx 30rpx;
    > image {
      width: 48rpx;
      height: 48rpx;
      margin-right: 16rpx;
    }
    > text {
      width: 120rpx;
      height: 56rpx;
      background: linear-gradient(318deg, #8aceff 0%, #46aefe 100%);
      border-radius: 10rpx;
      font-size: 32rpx;
      color: #ffffff;
      line-height: 56rpx;
      text-align: center;
      margin-left: 32rpx;
    }
  }
  .list {
    width: 100%;
    height: 100%;
    background: #f5f5f5;
    display: flex;
    .scroll {
      width: 188rpx;
      height: calc(100vh - 68px);
    }
    .cate {
      width: 188rpx;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #ffffff;
      .cate-item {
        display: flex;
        align-items: center;
        padding: 30rpx 0;
        border-bottom: 2rpx solid #ebebeb;
        > image {
          width: 34rpx;
          height: 34rpx;
          border-radius: 50%;
          margin-right: 6rpx;
        }
        > text {
          font-size: 28rpx;
          color: #999999;
          line-height: 40rpx;
        }
      }
      .active {
        > text {
          font-weight: 600;
          color: #333333;
        }
      }
    }
    .info {
      width: 100%;
      height: calc(100vh - 68px);
      overflow-y: scroll;
      background: #f5f5f5;
      display: flex;
      flex-direction: column;
      border-top-left-radius: 70rpx;
      padding: 24rpx 28rpx 38rpx;
      .item {
        background: #ffffff;
        box-shadow: 0rpx 0rpx 8rpx 0rpx rgba(0, 0, 0, 0.1);
        border-radius: 20rpx;
        padding: 22rpx 14rpx;
        margin-bottom: 16rpx;
        .top {
          display: flex;
          > image {
            width: 112rpx;
            height: 112rpx;
            border-radius: 50%;
            border: 4rpx solid #acd9ff;
            margin-right: 30rpx;
          }
          .name {
            display: flex;
            flex-direction: column;
            justify-content: center;
            .text {
              font-size: 28rpx;
              color: #333333;
              line-height: 40rpx;
            }
            > view {
              width: 130rpx;
              height: 30rpx;
              background: #daedfd;
              border-radius: 13rpx;
              margin-top: 12rpx;
              display: flex;
              justify-content: center;
              align-items: center;
              > image {
                width: 20rpx;
                height: 20rpx;
                margin-right: 6rpx;
              }
            }
          }
        }
        .say {
          background: #f7f7f7;
          border-radius: 20rpx;
          display: flex;
          justify-content: space-between;
          padding: 16rpx 12rpx;
          margin-top: 26rpx;
          .text {
            width: 76%;
            margin-top: 14rpx;
            > text:first-child {
              font-size: 24rpx;
              color: #2f96fb;
              line-height: 34rpx;
              margin-right: 20rpx;
            }
            > text:last-child {
              font-size: 24rpx;
              color: #333333;
              line-height: 34rpx;
            }
          }
          .image {
            display: flex;
            > image {
              width: 90rpx;
              height: 90rpx;
              margin-left: 24rpx;
            }
            > text {
              width: 34rpx;
              height: 34rpx;
              text-align: center;
              border-radius: 50%;
              background: #ec1515;
              font-size: 18rpx;
              color: #ffffff;
              line-height: 34rpx;
              position: absolute;
              margin-left: 84rpx;
              margin-top: -10rpx;
            }
          }
          .num {
            display: flex;
            align-items: center;
            justify-content: center;
            > text {
              width: 34rpx;
              height: 34rpx;
              text-align: center;
              border-radius: 50%;
              background: #ec1515;
              font-size: 18rpx;
              color: #ffffff;
              line-height: 34rpx;
            }
          }
        }
      }
    }
  }
}
</style>
