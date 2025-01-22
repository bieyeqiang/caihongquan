<template>
  <view>
    <!-- 搜索框 -->
    <!-- <view>
      <view class="search">
        <view>
          <icon type="search" size="12"></icon>
          <text>搜索</text>
        </view>
      </view>
    </view>
    <view class="search_input">
      <view>
        <icon type="search" size="12"></icon>
        <input
          placeholder="搜索"
          placeholder-style="color:#9B9B9B;line-height:21px;font-size:15px;"
          auto-focus
          confirm-type="search"
          type="text"
        />
        <icon
          type="clear"
          size="12"
        ></icon>
      </view>
      <text>取消</text>
    </view> -->
    <scroll-view scroll-y="true" class="chat_list_wraper">
      <!-- 系统通知 -->
      <view class="tap_mask">
        <view class="list_box" @click="entryInform">
          <view class="list_left">
            <view class="list_pic">
              <view class="em-msgNum">0</view>
              <image class="haveSpot" src="../../static/images/inform.png"></image>
            </view>
            <view class="list_text">
              <text class="list_user"> 系统通知 </text>
              <text class="list_word">来自：系统</text>
            </view>
          </view>
          <view class="list_right">
            <text>01/01 12:00</text>
          </view>
        </view>
      </view>
      <!-- 普通会话 -->
      <view class="chat_list">
        <swipe-delete @deleteChatItem="deleteConversation">
          <view class="tap_mask">
            <!-- 消息列表 -->
            <view class="list_box">
              <view class="list_left">
                <view class="list_pic">
                  <view class="em-msgNum">99+</view>
                  <image src="/static/images/theme2x.png"></image>
                </view>
                <view class="list_text">
                  <text class="list_user">联系人名</text>
                  <text class="list_word">[图片]</text>
                </view>
              </view>
              <view class="list_right">
                <text>01/01 12:00</text>
              </view>
            </view>
          </view>
        </swipe-delete>
      </view>
      <view class="chat_noChat">
        <image class="ctbg" src="/static/images/ctbg.png"></image>
        暂无聊天消息
      </view>
    </scroll-view>

    <!-- bug: margin-bottom 不生效 需要加一个空标签-->
    <view style="height: 1px"></view>

    <!-- <view class="mask"></view> -->
  </view>
</template>

<script setup>
	export default {
	  // Vue组件的生命周期钩子
	  mounted() {
	    console.log("Conversation组件已经挂载");
		this.getList();
	  },
	  onReady() {
	    console.log("Conversation组件已准备好");
		
	  },
	   methods: {
		  getList(){
			  console.log(this.$conn,"%@#$#@$@@#$@#$@#@$")
			  // pageSize: 每页期望获取的会话数量。取值范围为 [1,50]，默认为 `20`。
			  // cursor：开始获取数据的游标位置。若传空字符串（''），SDK 从最新活跃的会话开始获取。
			  this.$conn.getServerConversations({pageSize:50, cursor: ''}).then((res)=>{
				  console.log(res)
			  })

		  }
	  }
	};
// 仅保留必要的静态函数和常量
// const entryInform = () => {
//   uni.navigateTo({
//     url: '../notification/notification',
//   });
// };

// const deleteConversation = () => {
//   uni.showToast({
//     title: '删除成功',
//     icon: 'none',
//     duration: 2000,
//   });
// };

</script>

<style>
@import './conversation.css';
</style>
