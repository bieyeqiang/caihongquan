<template>
  <view class="focus">
    <view
      class="item"
      v-for="(item, index) in userList"
      :key="index"
      @click="toChat(item._id)"
    >
      <view class="image">
        <image v-if="item.avatar" :src="item.avatar"></image>
      </view>
      <view class="cent">
        <text class="nick">{{ item.nickname }}</text>
        <text class="text">{{ item.text }}</text>
      </view>
      <view
        :class="item.status === 0 ? 'follow' : 'active'"
        @click="click(index)"
      >
        <text>{{ item.status === 0 ? '关注' : '取消关注' }}</text>
      </view>
    </view>
    <jw-empty v-if="userList.length == 0"></jw-empty>
  </view>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      userList: []
    }
  },
  onLoad () {
    this.getList()
  },
  methods: {
    ...mapActions({
      getConversation: 'uniIm/getConversation'
    }),
    async toChat (user_id) {
      //创建会话
      const currentConversation = await this.getConversation({
        user_id
      })
      console.log('currentConversation', currentConversation)
      // // 当前用户给对方发个消息
      if (this.isWidescreen) {
        //若为宽屏，则触发右侧详情页的自定义事件，通知右侧窗体刷新详情
        uni.navigateTo({
          url: '/im/chat/chat?conversation_id=' + currentConversation.id
        })
      } else {
        // 若为窄屏，则打开新窗体，在新窗体打开详情页面
        uni.navigateTo({
          url: '/im/chat/chat?conversation_id=' + currentConversation.id
        })
      }
    },
    async getList () {
      // const res = await this.$request('user', 'getList')
      // this.userList = res
    },
    click (index) {
      const status = this.list[index].status
      if (status === 0) {
        this.list[index].status = 1
      } else {
        this.list[index].status = 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.focus {
  height: auto;
  background-color: #ffffff;
  padding: 40rpx 32rpx;
  .item {
    display: flex;
    align-items: center;
    margin-bottom: 52rpx;
    .image {
      width: 120rpx;
      height: 120rpx;
      > image {
        width: 120rpx;
        height: 120rpx;
        border-radius: 10rpx;
      }
    }
    .cent {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: 32rpx;
      .nick {
        font-family: OpenSans-Bold;
        font-size: 28rpx;
        font-weight: bold;
        line-height: 40rpx;
        letter-spacing: 0rpx;
        color: #0d0e15;
      }
      .text {
        font-family: OpenSans;
        font-size: 24rpx;
        font-weight: normal;
        line-height: 38rpx;
        letter-spacing: 0rpx;
        color: #768196;
      }
    }
    .follow {
      width: 198rpx;
      height: 60rpx;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 12rpx;
      background: linear-gradient(
        287deg,
        #dc4dce 0%,
        #dc4dce 0%,
        #ff8b8b 100%,
        #ff8b8b 100%
      );
      > text {
        font-family: OpenSans-Bold;
        font-size: 26rpx;
        font-weight: bold;
        letter-spacing: 0rpx;
        color: #ffffff;
      }
      &:active {
        opacity: 0.7;
      }
    }
    .active {
      width: 198rpx;
      height: 60rpx;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 12rpx;
      background: #e0e2e7;
      > text {
        font-family: OpenSans-Bold;
        font-size: 26rpx;
        font-weight: bold;
        letter-spacing: 0rpx;
        color: #0d0e15;
      }
      &:active {
        opacity: 0.7;
      }
    }
  }
}
</style>
