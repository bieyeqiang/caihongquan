<template>
  <view class="taskBg">
    <view class="taskTitle">※新手任务</view>
    <view class="list">
      <view>
        <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/task/ziliao.png"></image>
        <view>
          <view>完善资料</view>
          <view class="text">完善自己的个人资料</view>
          <view class="jb">
            <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/task/jinbi.png"></image>
            +5
          </view>
        </view>
      </view>
      <view @tap="btn">去做任务</view>
    </view>
    <view class="list">
      <view>
        <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/task/zhaopian.png"></image>
        <view>
          <view>相册上传照片</view>
          <view class="text">在相册里上传喜欢的照片</view>
          <view class="jb">
            <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/task/jinbi.png"></image>
            +10
          </view>
        </view>
      </view>
      <view @tap="btn">去做任务</view>
    </view>
    <view class="list">
      <view>
        <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/task/jineng.png"></image>
        <view>
          <view>发布技能</view>
          <view class="text">完成认证发布服务技能</view>
          <view class="jb">
            <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/task/jinbi.png"></image>
            +10
          </view>
        </view>
      </view>
      <view @tap="btn">去做任务</view>
    </view>
    <view class="taskTitle">※每日任务</view>
    <view class="list">
      <view>
        <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/task/qiandao.png"></image>
        <view>
          <view>每日签到</view>
          <view class="text">每天签到一下</view>
          <view class="jb">
            <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/task/jinbi.png"></image>
            +5
          </view>
        </view>
      </view>
      <view @tap="btn">去做任务</view>
    </view>
    <view class="list">
      <view>
        <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/task/jinbi.png"></image>
        <view>
          <view>发布显摆动态</view>
          <view class="text">去发布一个动态</view>
          <view class="jb">
            <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/task/jinbi.png"></image>
            +10
          </view>
        </view>
      </view>
      <view @tap="btn">去做任务</view>
    </view>
    <view class="list">
      <view>
        <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/task/jiaoyou.png"></image>
        <view>
          <view>评论点赞显摆动态</view>
          <view class="text">给动态评论下点赞下</view>
          <view class="jb">
            <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/task/jinbi.png"></image>
            +5
          </view>
        </view>
      </view>
      <view @tap="btn">去做任务</view>
    </view>
    <view class="list">
      <view>
        <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/task/liaotian.png"></image>
        <view>
          <view>搭讪私信聊天</view>
          <view class="text">去搭讪个人聊聊天</view>
          <view class="jb">
            <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/task/jinbi.png"></image>
            +5
          </view>
        </view>
      </view>
      <view @tap="btn">去做任务</view>
    </view>
    <view class="list">
      <view>
        <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/task/goumai.png"></image>
        <view>
          <view>下单体验技能服务</view>
          <view class="text">下单购买一次服务体验一下</view>
          <view class="jb">
            <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/task/jinbi.png"></image>
            +10
          </view>
        </view>
      </view>
      <view @tap="btn">去做任务</view>
    </view>
    <view class="list">
      <view>
        <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/task/liwu.png"></image>
        <view>
          <view>帮众筹者实现愿望</view>
          <view class="text">帮别人完成一次众筹愿望</view>
          <view class="jb">
            <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/task/jinbi.png"></image>
            +10
          </view>
        </view>
      </view>
      <view @tap="btn">去做任务</view>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    btn () {
      uni.navigateBack({
        delta: 1
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.taskTitle {
  font-size: 35rpx;
  font-weight: bold;
  padding: 20rpx 0;
  color: $fontColor;
}
.taskBg {
  background: #f5f5f5;
  width: 100vw;
  height: 100vh;
  padding: 0 20rpx;
  box-sizing: border-box;
  .list {
    background: #fff;
    border-radius: 10rpx;
    margin-bottom: 20rpx;
    padding: 10rpx 20rpx;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > view:first-child {
      display: flex;
      align-items: center;
      > image {
        width: 60rpx;
        height: 60rpx;
        margin-right: 40rpx;
        display: inline-block;
      }
      > view {
        font-size: 30rpx;
        font-weight: 500;
      }
      .text {
        font-size: 20rpx;
        font-weight: 300;
      }
    }
    > view:last-child {
      font-size: 26rpx;
      color: #fff;
      padding: 5rpx 27rpx;
      background: $fontLinear;
      border-radius: 40rpx;
    }
    .jb {
      color: #f9ab11;
      display: flex;
      align-items: center;
      image {
        width: 30rpx;
        height: 30rpx;
        display: inline-block;
        margin-right: 10rpx;
      }
    }
  }
}
</style>
