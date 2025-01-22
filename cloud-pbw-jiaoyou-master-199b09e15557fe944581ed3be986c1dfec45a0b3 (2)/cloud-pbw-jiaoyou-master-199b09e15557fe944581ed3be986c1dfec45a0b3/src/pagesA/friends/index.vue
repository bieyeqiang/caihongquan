<template>
  <view class="follow-fans">
    <view class="bar">
      <u-navbar :placeholder="true" autoBack>
        <view slot="left" class="left">
          <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/travel/personal/left.png" />
        </view>
        <view slot="center" class="center">
          <view
            :class="num == index ? 'backg' : ''"
            v-for="(item, index) in title"
            :key="index"
            @click.stop="pick(index)"
          >
            <text>{{ item }}</text>
          </view>
        </view>
      </u-navbar>
    </view>
    <view class="follows" v-show="num == 0">
      <view class="list">
        <text
          :class="typeNum == index ? 'title' : ''"
          v-for="(item, index) in columns[0]"
          :key="index"
          @click.stop="typeSel(index)"
          >{{ item.label }}</text
        >
      </view>
      <view class="fans">
        <view
          class="item"
          v-for="(item, index) in ordinaryList"
          :key="index"
          @click.stop="goPage('/pagesA/service/homePage/homePage?code=' + item.info._id)"
        >
          <view class="head">
            <image :src="item.info.avatar" />
          </view>
          <view class="cont">
            <view class="nick">
              <text class="name">{{ item.info.nickname }}</text>
              <view class="grade">
                <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/travel/personal/dengji.png" />
                <text>1</text>
              </view>
            </view>
            <view :class="item.info.gender == '1' ? 'age' : 'age girl'">
              <u-icon
                :name="item.info.gender == '1' ? 'man' : 'woman'"
                :color="item.info.gender == '1' ? '#76BBF8' : '#FF6E92'"
                size="13"
              ></u-icon>
              <text :class="item.info.gender == '1' ? '' : 'woman'">{{ item.info.birthdayText }}</text>
            </view>
            <!-- <text class="position">{{item.info.position}}</text> -->
            <text class="position">{{ getMap(item) }}</text>
          </view>
          <view class="follow" @click.stop="followRemove(item.fansId, index)">
            <image :src="item.status < 4 ? follow : add" />
            <text>{{ item.status < 4 ? '已关注' : '关注' }}</text>
          </view>
        </view>
        <jw-empty v-if="ordinaryList.length == 0"></jw-empty>
      </view>
    </view>
    <view class="fans" v-show="num == 1">
      <view
        class="item"
        v-if="fansShow > 0"
        v-for="(item, index) in list"
        :key="index"
        @click.stop="goPage('/pagesA/service/homePage/homePage?code=' + item.info._id)"
      >
        <view class="head">
          <image :src="item.info.avatar" />
        </view>
        <view class="cont">
          <view class="nick">
            <text class="name">{{ item.info.nickname }}</text>
            <view class="grade">
              <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/travel/personal/dengji.png" />
              <text>1</text>
            </view>
          </view>
          <view :class="item.info.gender == '1' ? 'age' : 'age girl'">
            <u-icon
              :name="item.info.gender == '1' ? 'man' : 'woman'"
              :color="item.info.gender == '1' ? '#76BBF8' : '#FF6E92'"
              size="13"
            ></u-icon>
            <text :class="item.info.gender == '1' ? '' : 'woman'">{{ item.info.birthdayText }}</text>
          </view>
          <text class="position">{{ getMap(item) }}</text>
        </view>
        <view class="follow" @click.stop="select(item.uid, index)">
          <image :src="item.state == 1 ? follow : add" />
          <text>{{ item.state == 1 ? '互相关注' : '关注' }}</text>
        </view>
      </view>
      <jw-empty v-if="list.length == 0"></jw-empty>
    </view>
  </view>
</template>

<script>
import commonJs from '@/common/js/common.js'

export default {
  data () {
    return {
      num: 0,
      typeNum: 0,
      ordinary: 0,
      fansShow: '',
      followShow: 0,
      title: ['关注', '粉丝'],
      type: ['普通关注', '悄悄关注', '特别关注'],
      follow: 'https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/travel/personal/follow.png',
      add: 'https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/travel/personal/add.png',
      ordinaryList: [],
      list: [],

      columns: [
        [
          {
            label: '普通关注',
            index: 0
          },
          {
            label: '悄悄关注',
            index: 1
          },
          {
            label: '特别关注',
            index: 2
          }
        ]
      ],
      fansId: ''
    }
  },
  onLoad (e) {
    this.followList()
    this.fansList()
    this.num = e.index
  },
  methods: {
    getMap (item) {
      if (item.info.map) {
        let a = item.info.map.coordinates[0]
        let b = item.info.map.coordinates[1]
        // let c = this.$store.state.user.location.location.lat
        // let d = this.$store.state.user.location.location.lng
        // const val = commonJs.mapToDistance(b, a, c, d)
        // return val
      }
    },
    // 关注
    async followList () {
      const res = await this.$request('fans', 'getFollow', {
        status: 0
      })
      this.ordinaryList = res.data
    },
    // 粉丝
    async fansList () {
      const res = await this.$request('fans', 'getFans')
      this.list = res.data
      this.fansShow = this.list.length
    },
    //粉丝关注
    select (id, index) {
      if (this.list[index].state == 1) {
      } else {
        this.fansId = id

        uni.showActionSheet({
          itemList: ['普通关注', '悄悄关注', '特别关注'],
          success: async res => {
            const data = await this.$request('fans', 'addFollow', {
              fansId: id,
              status: res.tapIndex // 0  1 2
            })
            if (data.state === 0) {
              uni.showToast({
                title: '已关注',
                icon: 'none',
                duration: 3000
              })
            } else {
              uni.showToast({
                title: '关注成功',
                icon: 'none',
                duration: 3000
              })
            }
            this.followList()
            this.fansList()
          }
        })
      }
    },
    // 关注-粉丝
    pick (index) {
      this.num = index
      this.typeNum = 0
      this.fansList()
      this.followList()
    },
    // 查看各类型关注
    async typeSel (index) {
      this.typeNum = index
      const res = await this.$request('fans', 'getFollow', {
        status: index
      })
      this.ordinaryList = res.data
      this.ordinary = index
    },
    // 取消关注-关注
    async followRemove (id, index) {
      uni.showModal({
        title: '取消关注',
        content: '要取消此人关注吗？',
        success: async res => {
          if (res.confirm) {
            if (this.ordinaryList[index].status < 4) {
              this.ordinaryList[index].status = 4
              const res = await this.$request('fans', 'removeFollow', {
                id: id
              })
            } else {
              this.ordinaryList[index].status = 0
              const res = await this.$request('fans', 'addFollow', {
                fansId: id,
                status: this.ordinary
              })
            }
          }
        }
      })
    },
    closeFans () {
      this.show = false
    },
    // 在粉丝列表-关注类型确认
    async confirm (e) {
      this.ordinary = e.value[0].index
      this.show = false
      const res = await this.$request('fans', 'addFollow', {
        fansId: this.fansId,
        status: this.ordinary
      })
      this.fansList()
      uni.showToast({
        title: '已关注',
        icon: 'none',
        duration: 3000
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.follow-fans {
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
        > text {
          font-size: 32rpx;
          font-weight: 600;
          color: #333333;
          line-height: 44rpx;
        }
        background: no-repeat url('https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/travel/personal/di.png');
      }
    }
  }
  .follows {
    height: 1442rpx;
    background: #ffffff;
    margin-top: 8rpx;
    .list {
      display: flex;
      padding: 18rpx 88rpx;
      justify-content: space-between;
      > text {
        font-size: 28rpx;
        color: #333333;
        line-height: 40rpx;
      }
      .title {
        color: #f47575;
      }
    }
  }

  .fans {
    width: 100%;
    height: 1442rpx;
    background: #ffffff;
    margin-top: 8rpx;
    padding: 32rpx 40rpx;
    .item {
      display: flex;
      border-bottom: 2rpx solid #fbfbfb;
      padding-bottom: 32rpx;
      margin-bottom: 50rpx;
      .head {
        & image {
          width: 90rpx;
          height: 90rpx;
          border-radius: 50%;
          margin-right: 24rpx;
        }
      }
      .cont {
        flex: 1;
        .nick {
          display: flex;
          margin-bottom: 6rpx;
          .name {
            font-size: 28rpx;
            font-weight: 600;
            color: #333333;
            line-height: 40rpx;
            margin-right: 10rpx;
          }
          .grade {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            > image {
              width: 30rpx;
              height: 40rpx;
              position: relative;
            }
            > text {
              font-size: 12rpx !important;
              font-family: CloudHeiChaoGBK;
              color: #ffffff;
              line-height: 16rpx;
              position: absolute;
            }
          }
        }
        .age {
          width: 88rpx;
          height: 30rpx;
          background: #f0f8fd;
          border-radius: 19rpx;
          margin-bottom: 12rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          > text {
            font-size: 20rpx !important;
            color: #76bbf8;
            // line-height: 30rpx;
          }
          .woman {
            color: #ff6e92;
          }
        }
        .girl {
          background: #fff3f6;
        }
        .position {
          font-size: 24rpx;
          color: #999999;
          line-height: 34rpx;
        }
      }
      .follow {
        width: 100rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        > image {
          width: 44rpx;
          height: 44rpx;
        }
        > text {
          font-size: 22rpx !important;
          color: #666666;
          line-height: 32rpx;
        }
      }
    }
    .bottom {
      display: flex;
      flex-direction: column;
      align-items: center;
      > image {
        width: 302rpx;
        height: 276rpx;
        margin-bottom: 28rpx;
      }
      > text {
        font-size: 24rpx;
        color: #999999;
        line-height: 34rpx;
      }
    }
  }
}
</style>
