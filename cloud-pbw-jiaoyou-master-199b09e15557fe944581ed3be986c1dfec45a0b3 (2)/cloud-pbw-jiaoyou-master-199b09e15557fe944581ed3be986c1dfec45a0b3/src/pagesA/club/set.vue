<template>
  <view class="set">
    <view class="bar">
      <u-navbar :fixed="true" :placeholder="true">
        <view slot="left" class="left" @click="goBack()">
          <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/travel/club/left.png">
        </view>
        <view slot="center" class="center">
          <text>选择类型</text>
        </view>
        <view slot="right" class="right" @click="goPage('/pagesA/club/name?circleTypeId='+circleTypeId)">
          <text>下一步</text>
        </view>
      </u-navbar>
    </view>
    <view class="list">
      <view :class="activeIndex === index ? 'item act':'item'" v-for="(item,index) in list" :key="index" @click="pickCircle(index)">
        <text>{{item.name}}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [
        '热门圈',
        '世界圈',
        '户外圈',
        '达人圈',
        '自驾圈',
        '交友圈',
        '羊毛圈',
        '车友圈',
        '国内圈',
        '吃喝圈',
        '民宿圈',
        '商务圈',
        '领队圈'
      ],
	  circleTypeId:'',
	  activeIndex:'',
    }
  },
  created() {},
  onLoad(){
  	this.getCircleList();
  },
  methods: {
  	// 圈子列表
  	async getCircleList(){
  		const res = await this.$request('circle','getCategoryList');
  		console.log(res);
  		this.list = res;
  	},
	pickCircle(index){
		this.circleTypeId = this.list[index]._id;
		this.activeIndex = index;
	}
  }
}
</script>

<style lang="scss" scoped>
.set {
  .bar {
    .left {
      > image {
        width: 48rpx;
        height: 48rpx;
      }
    }
    .center {
      > text {
        font-size: 32rpx;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #333333;
        line-height: 44rpx;
      }
    }
    .right {
      width: 146rpx;
      height: 56rpx;
      background: #f6f6f6;
      border-radius: 10rpx;
      text-align: center;
      > text {
        font-size: 28rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 56rpx;
      }
    }
  }
  .list {
    display: flex;
    width: 100%;
    height: 100%;
    background: #ffffff;
    margin-top: 16rpx;
    padding: 40rpx;
    flex-wrap: wrap;
    .item {
	  width: 26%;
      height: 80rpx;
	  margin-right: 11%;
      background: #ffffff;
      box-shadow: 0rpx 0rpx 8rpx 0rpx rgba(0, 0, 0, 0.1);
      border-radius: 6rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 34rpx;
	  &:nth-child(3n){
		  margin-right: 0rpx;
	  }
      > text {
        font-size: 28rpx;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #333333;
        line-height: 40rpx;
      }
    }
	.act{
		background-color: #1192fe;
		>text{
			color: #ffffff;
		}
	}
  }
}
</style>