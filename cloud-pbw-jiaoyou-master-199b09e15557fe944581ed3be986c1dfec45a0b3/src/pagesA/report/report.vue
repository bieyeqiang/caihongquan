<template>
  <view class="report">
    <view class="reason">
      <text class="title">举报理由</text>
      <view class="text">
        <text :class="item.state?'act':''" v-for="(item,index) in list" :key="index" @click="select(index)">{{item.text}}</text>
      </view>
    </view>
    <view class="reason">
      <text class="title">举报理由</text>
      <view class="info">
        <u--textarea
          v-model="reason"
          maxlength="200"
          style="min-height: 460rpx"
          border="none"
          auto-height
          confirm-type="send"
          count
          placeholder="请详细描述违规行为，以确保举报被受理"
          placeholderStyle="color: #999999;font-size: 28px;"
        />
        <view class="add">
          <text>添加图片/视频证据</text>
		  <view class="images">
			<view class="imgList" v-for="(item,index) in imgList" :key="index">
				<image :src="item"></image>
				<u-icon
				  class="iconfont delimg"
				  name="close"
				  color="#FFFFFF"
				  size="30"
				  @click="delImg(index)"
				></u-icon>
			</view>
			<view class="img" @click="posterSrcBtn()">
			  <u-icon name="plus" color="#979797" size="38"></u-icon>
			</view>
		  </view>
        </view>
      </view>
    </view>
    <view class="button" @click="submit">
      <text>提交</text>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      reason: '',
	  id:'',
	  type:[],
	  list:[{
		state: false,
		text:'低俗色情'
	  },
	  {
		state: false,
		text:'广告引流'
	  },
	  {
		state: false,
		text:'频繁骚扰'
	  },
	  {
		state: false,
		text:'攻击辱骂'
	  },
	  {
		state: false,
		text:'政治敏感'
	  },
	  {
		state: false,
		text:'涉嫌诈骗'
	  },
	  {
		state: false,
		text:'未成年相关'
	  },
	  {
		state: false,
		text:'扰乱平台秩序'
	  },
	  {
		state: false,
		text:'其他'
	  }],
	  imgList:[]
    }
  },
  onLoad (e) {
	this.id = e.id;
  },
  methods: {
	select(index){
	  this.list[index].state = !this.list[index].state;
	  if(!this.list[index].state){
		this.type.splice(this.type.indexOf(this.list[index].text), 1)
	  }else{
		this.type.push(this.list[index].text)
	  }
	},
	async submit(){
	  if(!this.type.length || !this.reason || !this.type.length){
		this.msg('举报理由不能为空')
	  }else{
		const item = await this.$request('report', 'addReport', {
		  reportId: this.id,
		  type: this.type,
		  reason: this.reason,
		  imgList: this.imgList
		})
		if(item){
		  this.msg('已收到您的举报，我们马上审查')
		  setTimeout(() => {
		    uni.navigateBack()
		  }, 2000)
		}
	  }
	  
	},
	delImg (index) {
	  this.imgList.splice(index, 1)
	},
    // 图片上传
    async posterSrcBtn (title) {
      let file = await this.cloudUploadFile(8)
      if (file == undefined) {
        return
      } else {
        uni.showLoading({
          title: '上传中...'
        })
      }
      file.fileUrl.forEach(async (item, index) => {
        const getImageLog = await this.$request('security', 'imageDetection', {
          image: item
        })
        if (getImageLog.state == 0) {
          uni.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 3000
          })
		  this.imgList.push(getImageLog.image);
		  console.log(this.imgList);
        } else {
          uni.showToast({
            title: '该图片涉嫌内容不适，请更换一个',
            icon: 'none',
            duration: 3000
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.report {
  & text {
    font-weight: 400;
    font-family: PingFangSC-Regular, PingFang SC;
  }
  .reason {
    margin-top: 30rpx;
    background: #ffffff;
    padding: 22rpx 40rpx 30rpx;
    .title {
      display: block;
      font-size: 32rpx;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #333333;
      margin-bottom: 2rpx;
    }
    .text {
      display: flex;
      flex-wrap: wrap;
      text {
        width: 208rpx;
        height: 66rpx;
        background: #f5f6f8;
        margin-right: 22rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20rpx;
        &:nth-child(3n) {
          margin-right: 0;
        }
      }
	  .act{
		background-color: #00aaff;
		color: #FFFFFF;
	  }
    }
    .info {
      margin-top: 20rpx;
      .add {
        margin-top: 26rpx;
        > text {
          font-size: 28rpx;
          color: #999999;
          line-height: 40rpx;
        }
        .images{
			display: flex;
			flex-wrap: wrap;
			margin-top: 20rpx;
			.imgList{
				width: 150rpx;
				height: 150rpx;
				position: relative;
				display: flex;
				margin-right: 14rpx;
				margin-bottom: 20rpx;
				&:nth-child(4n){
					margin-right: 0;
				}
				>image{
					width: 150rpx;
					height: 150rpx;
				}
				.u-icon{
					position: absolute;
					right: -4rpx;
					top: -4rpx;
					border-radius: 50%;
					padding: 4rpx;
					background-color: #ff0000;
				}
			}
			.img {
			  width: 160rpx;
			  height: 160rpx;
			  background: #fafbfb;
			  display: flex;
			  align-items: center;
			  justify-content: center;
			}
		}
      }
    }
  }
  .button {
    height: 100%;
    padding: 20rpx 40rpx 0;
    background: #ffffff;
    margin-top: 30rpx;
    text {
      height: 80rpx;
      background: #a6a5aa;
      border-radius: 42rpx;
      font-size: 32rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
