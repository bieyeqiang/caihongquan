<template>
	
  <view class="news">
    <piaoliuping :plpspeed="2" :bospeed="5"></piaoliuping>
    <!--<view v-show="msgShow" class="notice">-->
    <!--  <image class="notice__img" src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/travel/news/notice.png"></image>-->
    <!--  <text class="notice__text">打开消息通知，及时接收聊天信息</text>-->
    <!--  <text class="notice__button" @click="msgShow = false">立即开启</text>-->
    <!--  <image class="notice__del" src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/travel/news/del.png" @click="msgShow = false"></image>-->
    <!--</view>-->
    <view class="list">
      <view @click="goPage('/pagesA/news/report')">
        <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/travel/news/dpao.png"></image>
        <text>报名</text>
        <view class="badge" v-if="likeListCount.py">
          <u-badge :type="type" color="#ffffff" max="99" :value="likeListCount.py"></u-badge>
        </view>
      </view>
      <view @click="goPage('/pagesA/news/comment')">
        <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/travel/news/news.png"></image>
        <text>评论</text>
        <view class="badge" v-if="likeListCount.comment">
          <u-badge :type="type" color="#ffffff" max="99" :value="likeListCount.comment"></u-badge>
        </view>
      </view>
      <view @click="goPage('/pagesA/news/myComment')">
        <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/travel/news/aite.png"></image>
        <text>@我的</text>
        <view class="badge" v-if="likeListCount.myComment">
          <u-badge :type="type" color="#ffffff" max="99" :value="likeListCount.myComment"></u-badge>
        </view>
      </view>
      <view @click="goPage('/pagesA/news/fabulous')">
        <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/travel/news/heart.png"></image>
        <text>赞</text>
        <view class="badge" v-if="likeListCount.fabulous">
          <u-badge :type="type" color="#ffffff" max="99" :value="likeListCount.fabulous"></u-badge>
        </view>
      </view>
      <view @click="goPage('/pagesA/news/friends')">
        <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/travel/news/people.png"></image>
        <text>新朋友</text>
        <view class="badge" v-if="likeListCount.py">
          <u-badge :type="type" color="#ffffff" max="99" :value="likeListCount.py"></u-badge>
        </view>
      </view>
    </view>
    <view class="new-list">
		<Conversation />
<!--     <view class="item" v-for="(item, index) of conversationList" :key="index" @click="toChat(item.id)">
        <image v-if="item.user_info" :src="item.user_info.avatar"></image>
        <view class="cont">
          <view class="content">
            <text v-if="item.user_info">{{ item.user_info.nickname }}</text>
            <text>{{ formatTime(item.update_time) }}</text>
          </view>
          <view class="time">
            <text>{{ item.last_msg_note }}</text>
            <u-badge v-if="item.unread_count" class="badge" :type="type" :value="item.unread_count" color="#FFFFFF"></u-badge>
          </view>
        </view>
      </view> -->
      <jw-empty  text="还没有人发消息~"></jw-empty>
    </view>
  </view>
</template>

<script>
import uniImUtils from '@/common/im/utils.js'
import piaoliuping from '@/components/piaoliuping/piaoliuping.vue'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import Conversation from '@/pages/conversation/conversation.vue';
export default {
  components: {
    piaoliuping,
	Conversation
  },
  data() {
    return {
      type: 'error',
      value: 1,
      num: 3,
      msgShow: false,
      likeListCount: {
        comment: 10,
        fabulous: 10,
        myComment: 10,
        order: 10
      }
    }
  },
  onShow() {
  	
  },
  onLoad(option) {
     console.log(option);
  },
  computed: {
    // ...mapState({
    //   //当前正在对话端用户ID，实现pc端高亮效果
    //   currentConversationId: (state) => state.uniIm.currentConversationId,
    //   timestamp: (state) => state.uniIm.timestamp,
    //   conversationDatas: (state) => state.uniIm.conversationDatas
    // }),
    // ...mapGetters({
    //   conversationList: 'uniIm/conversationList',
    //   unread_count: 'uniIm/unread_count'
    // }),
    currentUserInfo() {
      let user = uni.getStorageSync('uni-id-pages-userInfo')
      return user
    },
    avatarUrl() {
      if (this.currentUserInfo.avatar_file && this.currentUserInfo.avatar_file.url) {
        return this.currentUserInfo.avatar_file.url
      }
      return '/uni_modules/uni-im/static/avatarUrl.png'
    }
  },
  created() {
    // APP通知提示
    // #ifdef  APP-PLUS
    this.msgShow = false
    // #endif

    // 获取点赞评论数量
    this.getFabulousNum()
    let user = uni.getStorageSync('userUid')
    if (user) {
      // 初始化会话列表
      this.loadMore()
    }
  },
  methods: {
    ...mapMutations({
      setCurrentConversationId: 'uniIm/setCurrentConversationId',
      updateConversation: 'uniIm/updateConversation'
    }),
    ...mapActions({
      // 加载更多会话数据
      loadMore: 'uniIm/loadMoreConversation',
      getConversation: 'uniIm/getConversation',
      setMsgList: 'uniIm/setMsgList'
    }),
    async getFabulousNum() {
      const res = await this.$request('nearby', 'getNearbyReplyLikeListCount', {})
      this.likeListCount = res
    },
    toChat(conversation_id) {
      // console.log('toChat',{conversation_id,'isWidescreen':this.isWidescreen});
      this.setCurrentConversationId(conversation_id)
      if (this.isWidescreen) {
        //若为宽屏，则触发右侧详情页的自定义事件，通知右侧窗体刷新详情
        this.$refs['chat-view'].load(conversation_id)
      } else {
        // 若为窄屏，则打开新窗体，在新窗体打开详情页面
        uni.navigateTo({
          url: '/im/chat/chat?conversation_id=' + conversation_id,
          animationDuration: 300
        })
      }
    },

    formatTime(timestamp) {
      return uniImUtils.formatTime(timestamp)
    }
  }
}
</script>

<style lang="scss" scoped>
.news {
  & text {
    font-family: PingFangSC-Medium, PingFang SC;
    color: #333333;
  }
  .bar {
    .left {
      > text {
        font-size: 32rpx;
        font-weight: 600;
        color: #333333;
        line-height: 44rpx;
      }
    }
    .right {
      display: flex;
      > image {
        width: 40rpx;
        height: 40rpx;
        margin-left: 30rpx;
      }
      .box {
        display: flex;
        .badge {
          height: 32rpx;
          margin-top: -18rpx;
          margin-left: -10rpx;
        }
        > image {
          width: 40rpx;
          height: 40rpx;
        }
      }
    }
  }
  .notice {
    width: 100%;
    height: 76rpx;
    background: #ff6a5f;
    display: flex;
    align-items: center;
    padding: 0 20rpx 0 40rpx;
    &__img {
      width: 38rpx;
      height: 38rpx;
    }
    &__text {
      flex: 1;
      font-size: 22rpx;
      color: #ffffff;
      line-height: 32rpx;
    }
    &__button {
      width: 134rpx;
      height: 38rpx;
      background-color: #ffffff;
      border-radius: 22rpx;
      color: #ff6a5f;
      font-size: 22rpx;
      line-height: 38rpx;
      text-align: center;
      margin-right: 22rpx;
    }
    &__del {
      width: 36rpx;
      height: 36rpx;
    }
  }
  .list {
    display: flex;
    justify-content: space-evenly;
    padding: 10rpx 0;
    background: #ffffff;
    border-bottom: 1rpx solid #f5f5f5;
    padding-top: 40rpx;

    > view {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      .badge {
        position: absolute;
        right: -15rpx;
        top: -25rpx;
      }
      & image {
        width: 72rpx;
        height: 72rpx;
      }
      & text {
        font-size: 24rpx;
        line-height: 34rpx;
        margin-top: 12rpx;
      }
    }
  }
  .new-list {
    height: 750rpx;
    background: #ffffff;
    margin-top: 12rpx;
    padding: 30rpx 42rpx;
    .item {
      height: 88rpx;
      display: flex;
      align-items: center;
      margin-bottom: 44rpx;
      > image {
        width: 88rpx;
        height: 88rpx;
        margin-right: 24rpx;
        border-radius: 10rpx;
      }
      .cont {
        flex: 1;
        .content {
          display: flex;
          justify-content: space-between;
          margin-bottom: 6rpx;
          color: #000;
          > text:first-child {
            font-size: 28rpx;
            line-height: 40rpx;
          }
          > text:last-child {
            font-size: 22rpx;
            color: #999999;
            line-height: 32rpx;
            margin-bottom: 6rpx;
          }
        }
        .time {
          display: flex;
          justify-content: space-between;
          > text {
            font-size: 24rpx;
            color: #999999;
          }
          .badge {
            height: 30rpx;
          }
        }
      }
    }
  }
}
</style>
