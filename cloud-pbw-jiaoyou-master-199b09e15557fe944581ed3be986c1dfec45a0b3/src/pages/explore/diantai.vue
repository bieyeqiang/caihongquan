<template>
  <view class="diantaiBg">
    <mescroll-uni style="width: 100%; height: 100%" :fixed="true" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @init="mescrollInit">
      <!-- 电台分类 -->
      <view class="dtFenlei" v-if="typeList && typeList.nearbySubtype">
        <view>
          <view @tap="dtBtn(item)" v-for="(item, index) of typeList.nearbySubtype.data" :key="index">
            <view class="icon">
              <image :src="item.icon"></image>
            </view>
            <view class="tabTitle">{{ item.title }}</view>
          </view>
        </view>
      </view>
      <!-- 吸顶 -->
      <u-sticky>
        <view class="dtFenlei" v-if="titleShow && typeList && typeList.nearbySubtype">
          <view>
            <view @tap="dtBtn(item)" v-for="(item, index) of typeList.nearbySubtype.data" :key="index">
              <view class="tabTitle bg">{{ item.title }}</view>
            </view>
          </view>
        </view>
      </u-sticky>
      <view class="listFull" v-for="(item, index) of dataList" :key="index" @click="goto('/pagesA/nearby/nearbyText/nearbyText?code=' + item._id)">
        <view class="dtuser">
          <image :src="item.userInfo.avatar" @tap.stop="tab_name(item.userInfo._id)"></image>
          <view @tap.stop="tab_name(item.userInfo._id)">
            <view class="user">{{ item.userInfo.nickname }}</view>
            <view>{{ item.add_time | getTimeText }}</view>
          </view>
        </view>
        <view class="dttext">
          <view v-if="item.subtype && item.subtype[0]">
            <text class="iconfont">&#xe734;</text>
            【{{ item.subtype[0].title }}】
          </view>
          <view v-if="item && item.dynamicStart">
            <text class="iconfont">&#xe91a;</text>
            {{ item.dynamicStart | getTime }}-{{ item.dynamicEnd | getTime }}
          </view>
          <view v-if="item.startCity">
            <text class="iconfont">&#xe738;</text>
            {{ item.startCity }}-{{ item.endCity }}
          </view>
          <view v-if="item.dynamicLabel">
            <text class="iconfont">&#xe737;</text>
            期望对象：{{ item.dynamicLabel }}
          </view>
          <view style="margin-top: 15px" v-if="item.dynamicContext">
            <text class="iconfont">&#xe735;</text>
            <text class="callText">电台呼叫：{{ item.dynamicContext }}</text>
          </view>
          <view class="dtimgList" v-if="item.dynamicImg.length > 0">
            <image mode="aspectFill" v-for="(img, imgIndex) of item.dynamicImg" :key="imgIndex" :src="img" @tap.stop="previewImage(img, item.dynamicImg)"></image>
          </view>
        </view>
        <view class="dtdz">
          <view @tap.stop="give(item, index, item._id)">
            <u-icon class="inlineFlex" name="thumb-up-fill" color="#9d9db3" size="30"></u-icon>
            <text>点赞{{ item.like.length != 0 ? item.like.length : '' }}</text>
          </view>
          <view @tap.stop="spell(item, index, item._id)">
            <u-icon class="inlineFlex" name="file-text-fill" color="#9d9db3" size="30"></u-icon>
            <text>报名{{ item.spell.length || '' }}</text>
          </view>
          <view @click.stop="msgSo(item.userInfo.nickname, item.userInfo._id)">
            <u-icon class="inlineFlex" name="chat-fill" color="#9d9db3" size="30"></u-icon>
            <text>私聊</text>
          </view>
        </view>

        <!-- 小程序广告 -->
        <!-- #ifdef MP-WEIXIN -->
        <view class="xcx-ad-view" v-if="index > 0 && index % 8 == 0">
          <!-- <ad unit-id="adunit-c6817e9b0563765e" ad-intervals="30"></ad> -->
        </view>
        <!-- #endif -->
      </view>
    </mescroll-uni>
  </view>
</template>

<script>
import MescrollUni from '@/components/mescroll-uni/mescroll-uni.vue'
import { mapActions } from 'vuex'

export default {
  components: {
    MescrollUni
  },
  data() {
    return {
      dynamicStart: '',
      typeList: [],
      isInit: false,
      titleShow: false,
      dataList: [],
      downOption: {
        auto: false, // 不自动加载
        bgColor: '#FFFFFF'
      },
      mescroll: null,
      upOption: {
        auto: false, // 不自动加载
        page: {
          num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
          size: 6 // 每页数据的数量
        },
        noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
        empty: {
          tip: '~ 空空如也 ~', // 提示
          btnText: '去看看'
        }
      }
    }
  },
  methods: {
    ...mapActions({
      getConversation: 'uniIm/getConversation'
    }),

    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit(mescroll) {
      this.mescroll = mescroll
    },
    /*下拉刷新的回调 */
    downCallback(mescroll) {
      // 这里加载你想下拉刷新的数据, 比如刷新轮播数据
      // 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
      mescroll.resetUpScroll()
    },
    /*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
    async upCallback(mescroll) {
      try {
        // 获取列表
        let res = await this.$request('nearby', 'nearbyList', {
          dynamicType: 4,
          offset: (mescroll.num - 1) * mescroll.size,
          limit: mescroll.size
        })
        if (res.data) {
          if (mescroll.num == 1) this.dataList = [] //第一页清空
          this.dataList = this.dataList.concat(res.data) //追加新数据
          mescroll.endSuccess(res.data.length) //结束加载状态
        } else {
          mescroll.endErr() //失败
        }
      } catch {
        mescroll.endErr() //失败
      }
    },
    spell(item, index, id) {
      this.$request('nearby', 'spellAdd', {
        toUid: item.uid,
        dynamicId: id
      }).then((res) => {
        if (res.status === 2) {
          this.msg('已取消报名')
          item.spell.splice(0, 1)
        } else {
          this.msg('报名成功')
          item.spell.push({ uid: 'null' })
        }
      })
    },
    goto(url) {
      uni.navigateTo({
        url: url
      })
    },

    previewImage(img, list) {
      uni.previewImage({
        current: img,
        urls: list
      })
    },

    // 头像
    tab_name(userCode) {
      uni.navigateTo({
        url: '/pagesA/service/homePage/homePage?code=' + userCode
      })
    },
    async msgSo(name, uid) {
      this.msg('正在创建...')
      //创建会话
      const currentConversation = await this.getConversation({
        user_id: uid
      })
      console.log('currentConversation', currentConversation)
      // 当前用户给对方发个消息
      uni.navigateTo({
        url: '/im/chat/chat?conversation_id=' + currentConversation.id
      })
    },
    // 点赞
    async give(item, index, code) {
      const res = await this.$request('nearby', 'addLike', {
        id: code,
        toUid: item.userInfo._id
      })
      if (res.status == 1) {
        this.msg('点赞成功')
        this.dataList[index].like.push({ uid: 'null' })
      }
      if (res.status == 2) {
        this.msg('已取消')
        this.dataList[index].like.splice(0, 1)
      }
    },

    dtBtn(item) {
      uni.navigateTo({
        url: '/pagesA/explore/typeList/dtList?id=' + item._id + '&text=' + item.title
      })
    }
  },
  async mounted() {
    this.mescroll.triggerDownScroll()
    // 获取分类
    this.typeList = await this.$request('nearby', 'typeList', {})
  }
}
</script>

<style lang="scss" scoped>
.diantaiBg {
  .dttext {
    view {
      display: flex;
      flex-wrap: wrap;
      font-weight: 400;
      line-height: 45rpx;
      width: 100%;
      align-items: center;
      color: #333333;
      text {
        margin-right: 20rpx;
        color: #755fe0;
      }
      image {
        width: 190rpx;
        height: 200rpx;
        border-radius: 20rpx;
      }
    }
  }
  .dtFenlei {
    padding: 180rpx 20rpx 20rpx 20rpx;
    background-color: #f7d6ca;
    background-image: linear-gradient(90deg, #f7d6ca 0%, #f9f1f4 51%, #dfdef9 100%);
    > view {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      > view {
        width: 25%;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 20rpx;
        .icon {
          width: 100rpx;
          height: 100rpx;
          margin: 20rpx 25rpx;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-bottom: 20rpx;
          background: #f5f5f5;
          border-radius: 50%;
          font-size: 30rpx;
          font-weight: 300;
          > image {
            width: 100rpx;
            height: 100rpx;
            border-radius: 50%;
          }
        }
        view {
          font-size: 25rpx;
          text-align: center;
          font-weight: 400;
          color: #333333;
        }
        .tabTitle {
          padding: 2rpx 12rpx;
          border-radius: 6rpx;
        }
        .bg {
          background: #ffffff;
          border-radius: 20rpx;
          padding: 6rpx 20rpx;
        }
      }
    }
  }
  .listFull {
    padding: 40rpx;
    border-bottom: 10rpx solid #f6f6f6;
    background: #fff;
    .dtuser {
      display: flex;
      image {
        width: 80rpx;
        height: 80rpx;
        margin-right: 20rpx;
        border-radius: 50%;
      }
      > view {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .user {
          font-size: 28rpx;
          font-weight: 400;
          color: #333333;
        }
        view {
          font-size: 24rpx;
          font-weight: 400;
          color: #666666;
        }
      }
    }
    .dttext {
      margin: 20rpx 0;
      background: #f5f4f9;
      padding: 20rpx 40rpx;
      border-radius: 15rpx;
      view {
        font-size: 24rpx;
      }
    }
    .callText {
      width: 85%;
      line-height: 30rpx;
      color: #666;
      font-weight: 400;
    }
    .dtimgList {
      padding: 20rpx 0 0 0;
      image {
        padding: 5rpx;
        border-radius: 25rpx;
      }
    }
    .dtdz {
      display: flex;
      justify-content: space-between;
      margin-top: 40rpx;

      > view {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-size: 23rpx;
        color: #666666;
      }
      .iconfont {
        margin-bottom: 10rpx;
      }
    }
  }
}
</style>
