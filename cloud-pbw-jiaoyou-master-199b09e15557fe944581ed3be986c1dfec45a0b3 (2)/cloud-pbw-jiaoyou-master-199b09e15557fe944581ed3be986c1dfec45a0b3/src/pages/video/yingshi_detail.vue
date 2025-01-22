<template>
	<view class="container container331385">
		<view class="head">
			<view class="back" @click="back()" >
				<image	src="/static/Vector.png"></image>
			</view>
			<view class="title">视频详情</view>
			<view class="icon" ></view>
		</view>
		<view class="flex flex-wrap diygw-col-24 flex-direction-column flex35-clz" >
			<view class="flex diygw-col-24">
				<!-- <view>
				    <div id="mui-player"></div>
				</view> -->
				<video ref="refVideo" :src="video_src" style="width: 100%; height: 420rpx" object-fit="contain" :title="detail.video_name" poster="detail.coverfiles"></video>
			</view>
			<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center white flex36-clz" v-if="is_buy">
				<text class="diygw-col-24 text33-clz"> 试看已结束 </text>
				<text class="diygw-col-24 text34-clz"> 开通VIP会员观看完整视频 </text>
				<view class="flex flex-wrap diygw-col-24 justify-between flex37-clz">
					<button class="diygw-col-24 btn2-clz diygw-btn-default">购买会员</button>
					<button class="diygw-col-24 btn3-clz diygw-btn-default">免费领取</button>
				</view>
				<text class="diygw-col-24 text35-clz"> 重新播放 </text>
			</view>
		</view>
		<view class="flex flex-wrap diygw-col-24 justify-between items-center flex-clz">
			<text class="diygw-col-12 text1-clz video_name"> {{detail.video_name}} </text>
			<button class="diygw-col-12 btn-clz diygw-btn-default">开通VIP解锁观看完整版</button>
		</view>
		<text class="diygw-col-24 text3-clz"> 观看次数：{{detail.view_num}}</text>
		<view class="flex flex-wrap diygw-col-24 justify-around items-center flex1-clz">
			<view class="flex flex-wrap diygw-col-24 items-center flex2-clz">
				<view class="flex diygw-col-24 avatar-clz">
					<view class="diygw-avatar radius bg-none">
						<image mode="aspectFit" class="diygw-avatar-img radius" src=""></image>
					</view>
				</view>
				<text class="diygw-col-12 text2-clz"> 用户昵称 </text>
			</view>
			<button class="diygw-col-24 btn1-clz diygw-btn-default">+ 关注</button>
		</view>
		<view class="flex flex-wrap diygw-col-24 flex-direction-column flex3-clz">
			<text class="diygw-col-24 text4-clz"> 文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案 文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案 文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案 </text>
		</view>
		<view class="flex diygw-col-24 line-clz">
			<view class="diygw-pzx" style="border-bottom: 1px solid #eee"></view>
		</view>
	<!-- 	<view class="flex flex-wrap diygw-col-24 flex-direction-column">
			<view class="flex flex-wrap diygw-col-24 justify-between items-center flex4-clz">
				<text class="diygw-col-24 text5-clz"> 评论留言 6666 </text>
				<text class="diygw-col-5 text8-clz"> 展开 </text>
			</view>
			<view class="flex flex-wrap diygw-col-24 flex-direction-column justify-center items-center flex6-clz">
				<u-form-item class="diygw-col-24 input-clz" labelPosition="top" prop="input">
					<u-input :focus="inputFocus"  placeholder="发表评论" v-model="input"></u-input>
				</u-form-item>
			</view>
		</view> -->
		<view class="flex flex-wrap diygw-col-24 flex-direction-column retada">
			<text class="diygw-col-24 text10-clz"> 相关影片 </text>
			<u-scroll-list :indicator="false" @right="rightScrolllist" @left="leftScrolllist" class="flex diygw-col-24 scrolllist-clz">
				<view class="flex flex-wrap diygw-col-0 flex-direction-column items-center flex47-clz" v-for="(item,index) in related" :key="index" @click="jump(item.id)">
					<image :src="item.coverfiles" class="image9-size diygw-image diygw-col-0 image9-clz" mode="widthFix"></image>
					<text class="diygw-col-24 text12-clz video_name"> {{item.video_name}} </text>
				</view>
			</u-scroll-list>
		</view>
		<view class="flex flex-wrap diygw-col-24 flex-direction-column flex10-clz">
			<text class="diygw-col-24 text9-clz"> 推荐影片 </text>
			<view class="flex flex-wrap diygw-col-24 flex-direction-column flex12-clz" v-for="(item,index) in recommend" :key="index" @click="jump(item.id)">
				<view class="flex flex-wrap diygw-col-24 flex-direction-column flex14-clz">
					<image :src="recommend.coverfiles" class="response diygw-col-24 image1-clz" mode="widthFix"></image>
					<view class="flex flex-wrap diygw-col-24 justify-around items-center flex17-clz">
						<text class="diygw-col-12"> 播放：{{item.view_num}} </text>
						<text class="diygw-col-10 text16-clz"> {{item.duration}} </text>
					</view>
				</view>
				<view class="flex flex-wrap diygw-col-24 flex-direction-column">
					<text class="diygw-col-24 text17-clz video_name">{{item.video_name}} </text>
				</view>
			</view>

		</view>
		<view @touchmove.stop.prevent="" v-if="modal" class="diygw-modal basic" :class="modal" style="z-index: 1000000">
			<view class="diygw-dialog diygw-dialog-modal basis-lg">
				<view>
					<view class="flex diygw-dialog-content">
						<view id="model" class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex38-clz">
							<view class="flex flex-wrap diygw-col-24 flex-direction-column white flex43-clz">
								<view class="flex flex-wrap diygw-col-24 justify-center items-center flex39-clz">
									<text class="flex icon5 diygw-col-24 icon5-clz"></text>
									<text class="diygw-col-24 text36-clz"> 60 </text>
								</view>
								<view class="flex flex-wrap diygw-col-24 flex-direction-column">
									<text class="diygw-col-24 text37-clz"> 当前余额：120金币 </text>
								</view>
								<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex41-clz">
									<text class="diygw-col-24 text38-clz"> 支持原创，支持正版 您将付费给版权发行方 </text>
								</view>
								<view class="flex flex-wrap diygw-col-24 flex-direction-column justify-center items-center flex42-clz">
									<button class="diygw-col-24 btn4-clz diygw-btn-default">立即解锁</button>
								</view>
							</view>
							<text @tap="navigateTo" data-type="closemodal" class="flex icon6 diygw-col-0 icon6-clz diy-icon-roundclose"></text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="clearfix"></view>
	</view>
</template>

<script>
	
	import MuiPlayer from 'mui-player';
	import Hls from 'hls.js';
	import config from "../../siteinfo.js";
	export default {
		data() {
			return {
				//用户全局信息
				userInfo: {},
				//页面传参
				globalOption: {},
				//自定义全局变量
				globalData: {},
				detail:{},
				inputFocus: false,
				recommend:{},
				related:{},
				input: '',
				modal: '',
			    is_vip:false,
				is_buy:false,
				video_src:"https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
			};
		},
		onShow() {
			this.setCurrentPage(this);
			this.getVideodetail();
			this.getRelatedRecommend();  
			
		},
		onLoad(option) {
			
			this.setCurrentPage(this);
			if (option) {
				console.log(option);
				this.setData({
					globalOption: this.getOption(option)
				});
			}

			this.init();
		},
		methods: {
			async init() {
				
				console.log(userInfo,"*********");
			},
			back(){
				uni.switchTab({
					url: '/pages/video/yingshi_list'
				});
			},
            videopay(){
				var that = this;
				console.log(that.video_src);
				this.$nextTick(()=>{
				       // 初始化 MuiPlayer 插件，MuiPlayer 方法传递一个对象，该对象包括所有插件的配置
				       this.mp = new MuiPlayer({
				           container:document.getElementById("mui-player"),
				           src:that.video_src,
				           parse:{
				               type:'hls',
				               loader:Hls,
				               config:{ // hls config to：https://github.com/video-dev/hls.js/blob/HEAD/docs/API.md#fine-tuning
				                   debug:false,
				               },
				           },
				           pageHead:false,
				       });
				   })
			},
			async getVideodetail(){
				this.loading = true;
				const that = this;
				var v_id = this.globalOption.id;
				this.$nextTick(async () => {
						let token = uni.getStorageSync("token");
						console.log(token)
						//保存数据
						let param = {
							v_id:v_id
						};
						let header = {
							  'Content-Type': 'application/json',
							  'Authorization': `Bearer ${token}`
							  };
						let url = config.basePath+"api/Video/getVideoDetail";
						if (!url) {
							this.showToast('请先配置地址', 'none');
							return false;
						}
				
						let res = await this.$http.post(url, param, header, 'json');
				         
						if (res.code == 1) {
							  
							 var data = res.data;
							   that.detail = data;
							   that.video_src = data.resourcesfiles;
							   // this.videopay()
							// console.log(detail);
						} else {
							this.showModal(res.message, '提示', false);
						}
					
				});
			},
			jump(id){
				uni.reLaunch({
				  url: '/pages/video/yingshi_detail?id='+id  // 替换为当前页面的路径
				});
			},
			async getRelatedRecommend(){
				this.loading = true;
				const that = this;
				var v_id = this.globalOption.id;
				this.$nextTick(async () => {
						let token = uni.getStorageSync("token");
						console.log(token)
						//保存数据
						let param = {
							v_id:v_id
						};
						let header = {
							  'Content-Type': 'application/json',
							  'Authorization': `Bearer ${token}`
							  };
						let url = config.basePath+"api/Video/getRelatedRecommend";
						if (!url) {
							this.showToast('请先配置地址', 'none');
							return false;
						}
				
						let res = await this.$http.post(url, param, header, 'json');
				        console.log(res,"$$$$$$");
						if (res.code == 1) {
							  
							   var detail = res.data;
							   that.recommend = detail.recommend;
							   that.related = detail.related;
							 //   this.videopay()
							 //   console.log(detail);
						} else {
							this.showModal(res.message, '提示', false);
						}
					
				});
			},
			leftScrolllist(evt) {},
			rightScrolllist(evt) {}
		}
	};
</script>

<style lang="scss" scoped>
	@import 'mui-player/dist/mui-player.min.css';
	.flexbar-clz {
		padding-top: 10rpx;
		padding-left: 32rpx;
		padding-bottom: 10rpx;
		padding-right: 32rpx;
	}
	.head{
		height:83rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left:30rpx;
		padding-right:30rpx;
		line-height:83rpx;
		font-size: 30rpx;
	}
	.back{
		width:48rpx;
		height:48rpx;
		display:flex;
		align-items: center;
	}
	.head image{
		width:16rpx;
		height:26rpx;
		
	}
	.title{
		padding-right:48rpx;
	}
	.head view{
		// width:33%;
	}
	.u-input{
		  border: 0px;
	}
	.u-form-item__body{
		padding:0px !important;
	}
	.retada{
		margin-top:30rpx;
	}
	.video_name{
		white-space: nowrap;        /* 不换行 */
		   overflow: hidden;           /* 超出部分隐藏 */
		   text-overflow: ellipsis;
	}
	.icon-clz {
		font-size: 26rpx !important;
		text-align: center;
	}
	.icon {
		font-size: 38rpx;
	}
	.text-clz {
		font-size: 32rpx !important;
	}
	.icon1 {
		font-size: 40rpx;
	}
	.flex35-clz {
		top: 0rpx;
		left: 0rpx;
		position: relative;
	}
	.flex36-clz {
		padding-top: 0rpx;
		border-bottom-left-radius: 20rpx;
		z-index: 990;
		padding-left: 32rpx;
		padding-bottom: 0rpx;
		border-top-right-radius: 20rpx;
		margin-right: 176rpx;
		margin-left: 176rpx;
		overflow: hidden;
		top: 0rpx;
		left: 0rpx;
		width: calc(100% - 176rpx - 176rpx) !important;
		border-top-left-radius: 20rpx;
		margin-top: 28rpx;
		border-bottom-right-radius: 2rpx;
		position: absolute;
		opacity: 0.8;
		margin-bottom: 10rpx;
		height: 326rpx;
		padding-right: 32rpx;
	}
	.text33-clz {
		margin-left: 10rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		font-size: 32rpx !important;
		margin-top: 32rpx;
		margin-bottom: 10rpx;
		text-align: center;
		margin-right: 10rpx;
	}
	.text34-clz {
		margin-left: 10rpx;
		color: #333333;
		width: calc(100% - 10rpx - 10rpx) !important;
		margin-top: 16rpx;
		margin-bottom: 32rpx;
		text-align: center;
		margin-right: 10rpx;
	}
	.flex37-clz {
		margin-left: 0rpx;
		width: calc(100% - 0rpx - 0rpx) !important;
		margin-top: 0rpx;
		margin-bottom: 32rpx;
		margin-right: 0rpx;
	}
	.btn2-clz {
		padding-top: 14rpx;
		border-bottom-left-radius: 56rpx;
		color: #fff;
		padding-left: 20rpx;
		padding-bottom: 20rpx;
		border-top-right-radius: 56rpx;
		background-color: #16c7ff;
		flex-shrink: 0;
		overflow: hidden;
		width: 45% !important;
		border-top-left-radius: 56rpx;
		border-bottom-right-radius: 56rpx;
		height: 56rpx !important;
		text-align: center;
		padding-right: 20rpx;
	}
	.btn3-clz {
		border: 2rpx solid #16c7ff;
		padding-top: 14rpx;
		border-bottom-left-radius: 56rpx;
		color: #16c7ff;
		padding-left: 20rpx;
		padding-bottom: 20rpx;
		border-top-right-radius: 56rpx;
		flex-shrink: 0;
		overflow: hidden;
		width: 160rpx !important;
		border-top-left-radius: 56rpx;
		border-bottom-right-radius: 56rpx;
		height: 56rpx !important;
		text-align: center;
		padding-right: 20rpx;
	}
	.text35-clz {
		flex-shrink: 0;
		background-repeat: no-repeat;
		width: 160rpx !important;
		// background-image: url(/static/redozx.png);
		background-position: center left;
		text-align: center;
	}
	.flex-clz {
		padding-top: 16rpx;
		padding-left: 32rpx;
		padding-bottom: 10rpx;
		padding-right: 32rpx;
	}
	.text1-clz {
		flex-shrink: 0;
		width: 316rpx !important;
		font-size: 32rpx !important;
	}
	.btn-clz {
		padding-top: 12rpx;
		border-bottom-left-radius: 286rpx;
		color: #fff;
		padding-left: 12rpx;
		padding-bottom: 12rpx;
		border-top-right-radius: 286rpx;
		background-color: #b9bdbb;
		flex-shrink: 0;
		overflow: hidden;
		width: 286rpx !important;
		border-top-left-radius: 286rpx;
		border-bottom-right-radius: 286rpx;
		height: 56rpx !important;
		text-align: center;
		padding-right: 12rpx;
	}
	.text3-clz {
		margin-left: 32rpx;
		flex-shrink: 0;
		width: calc(100% - 32rpx - 32rpx) !important;
		font-size: 32rpx !important;
		margin-top: 0rpx;
		margin-bottom: 0rpx;
		margin-right: 32rpx;
	}
	.flex1-clz {
		margin-left: 0rpx;
		width: calc(100% - 0rpx - 0rpx) !important;
		margin-top: 32rpx;
		margin-bottom: 0rpx;
		margin-right: 0rpx;
	}
	.flex2-clz {
		flex-shrink: 0;
		width: 500rpx !important;
	}
	.avatar-clz {
		flex-shrink: 0;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 84rpx !important;
		background-image: url(/static/34e4b24d1c5bf18184d7d18fea013df8.png);
		background-position: center center;
		height: 84rpx !important;
	}
	.text2-clz {
		margin-left: 16rpx;
		font-weight: bold;
		width: calc(50% - 16rpx - 10rpx) !important;
		font-size: 32rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.btn1-clz {
		padding-top: 20rpx;
		border-bottom-left-radius: 44rpx;
		color: #fff;
		padding-left: 20rpx;
		padding-bottom: 20rpx;
		border-top-right-radius: 44rpx;
		background-color: #16c7ff;
		flex-shrink: 0;
		overflow: hidden;
		width: 116rpx !important;
		border-top-left-radius: 44rpx;
		border-bottom-right-radius: 44rpx;
		height: 44rpx !important;
		text-align: center;
		padding-right: 20rpx;
	}
	.flex3-clz {
		padding-top: 16rpx;
		padding-left: 32rpx;
		padding-bottom: 10rpx;
		padding-right: 32rpx;
	}
	.text4-clz {
		font-size: 28rpx !important;
	}
	.line-clz {
		margin-left: 32rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 28rpx;
		margin-bottom: 28rpx;
		margin-right: 32rpx;
	}
	.flex4-clz {
		margin-left: 32rpx;
		color: #333333;
		top: 0rpx;
		left: 0rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 0rpx;
		position: relative;
		margin-bottom: 0rpx;
		margin-right: 32rpx;
	}
	.text5-clz {
		flex-shrink: 0;
		color: #666666;
		width: 338rpx !important;
		font-size: 28rpx !important;
	}
	.text8-clz {
		margin-left: 0rpx;
		color: #16c7ff;
		font-weight: bold;
		width: calc(20.8333333333% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 0rpx;
		margin-bottom: 0rpx;
		text-align: right;
		margin-right: 0rpx;
	}
	.flex6-clz {
		margin-left: 10rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		margin-top: 32rpx;
		margin-bottom: 0rpx;
		margin-right: 10rpx;
	}
	.input-clz {
		background-color: #f6f7f9;
		flex-shrink: 0;
		border-bottom-left-radius: 34rpx;
		overflow: hidden;
		width: 686rpx !important;
		font-size: 28rpx !important;
		border-top-left-radius: 34rpx;
		border-top-right-radius: 34rpx;
		border-bottom-right-radius: 34rpx;
		height: 68rpx !important;
	}
	.text10-clz {
		margin-left: 32rpx;
		font-weight: bold;
		width: calc(100% - 32rpx - 10rpx) !important;
		font-size: 36rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.scrolllist-clz {
		margin-left: 12rpx;
		color: #fa7617;
		width: calc(100% - 12rpx - 0rpx) !important;
		margin-top: 20rpx;
		margin-bottom: 0rpx;
		margin-right: 0rpx;
	}
	
	
	
	
	
	.flex47-clz {
		margin-left: 20rpx;
		flex-shrink: 0;
		width: 320rpx !important;
		margin-top: 0rpx;
		margin-bottom: 0rpx;
		margin-right: 0rpx;
	}
	.image9-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.image9-size {
		height: 180rpx !important;
		width: 320rpx !important;
	}
	.text12-clz {
		padding-top: 10rpx;
		color: #333333;
		padding-left: 0rpx;
		font-size: 28rpx !important;
		padding-bottom: 10rpx;
		text-align: left;
		padding-right: 10rpx;
	}
	.flex9-clz {
		margin-left: 20rpx;
		flex-shrink: 0;
		width: 320rpx !important;
		margin-top: 0rpx;
		margin-bottom: 0rpx;
		margin-right: 0rpx;
	}
	.image3-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.image3-size {
		height: 180rpx !important;
		width: 320rpx !important;
	}
	.text7-clz {
		padding-top: 10rpx;
		color: #333333;
		padding-left: 0rpx;
		font-size: 28rpx !important;
		padding-bottom: 10rpx;
		text-align: left;
		padding-right: 10rpx;
	}
	.flex8-clz {
		margin-left: 20rpx;
		flex-shrink: 0;
		width: 320rpx !important;
		margin-top: 0rpx;
		margin-bottom: 0rpx;
		margin-right: 0rpx;
	}
	.image2-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.image2-size {
		height: 180rpx !important;
		width: 320rpx !important;
	}
	.text6-clz {
		padding-top: 10rpx;
		color: #333333;
		padding-left: 0rpx;
		font-size: 28rpx !important;
		padding-bottom: 10rpx;
		text-align: left;
		padding-right: 10rpx;
	}
	.flex10-clz {
		padding-top: 10rpx;
		padding-left: 32rpx;
		padding-bottom: 10rpx;
		padding-right: 32rpx;
	}
	.text9-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 36rpx !important;
		margin-top: 0rpx;
		margin-bottom: 0rpx;
		margin-right: 0rpx;
	}
	.flex12-clz {
		margin-left: 0rpx;
		width: calc(100% - 0rpx - 0rpx) !important;
		margin-top: 32rpx;
		margin-bottom: 0rpx;
		margin-right: 0rpx;
	}
	.flex14-clz {
		top: 0rpx;
		left: 0rpx;
		position: relative;
	}
	.image1-clz {
		flex-shrink: 0;
		border-bottom-left-radius: 16rpx;
		overflow: hidden;
		width: 686rpx !important;
		border-top-left-radius: 16rpx;
		border-top-right-radius: 16rpx;
		border-bottom-right-radius: 20rpx;
		height: 384rpx !important;
	}
	.flex17-clz {
		border-bottom-left-radius: 16rpx;
		color: #fff;
		bottom: 0rpx;
		border-top-right-radius: 0rpx;
		background-color: rgba(0, 0, 0, 0.3);
		flex-shrink: 0;
		overflow: hidden;
		left: 0rpx;
		width: 100% !important;
		border-top-left-radius: 0rpx;
		border-bottom-right-radius: 16rpx;
		position: absolute;
		height: 48rpx !important;
	}
	.text16-clz {
		text-align: right;
	}
	.text17-clz {
		margin-left: 0rpx;
		top: 0rpx;
		left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 10rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		position: relative;
		margin-bottom: 0rpx;
		margin-right: 10rpx;
	}
	.flex19-clz {
		margin-left: 0rpx;
		width: calc(100% - 0rpx - 0rpx) !important;
		margin-top: 32rpx;
		margin-bottom: 0rpx;
		margin-right: 0rpx;
	}
	.flex20-clz {
		top: 0rpx;
		left: 0rpx;
		position: relative;
	}
	.image4-clz {
		flex-shrink: 0;
		border-bottom-left-radius: 16rpx;
		overflow: hidden;
		width: 686rpx !important;
		border-top-left-radius: 16rpx;
		border-top-right-radius: 16rpx;
		border-bottom-right-radius: 20rpx;
		height: 384rpx !important;
	}
	.flex21-clz {
		border-bottom-left-radius: 16rpx;
		color: #fff;
		bottom: 0rpx;
		border-top-right-radius: 0rpx;
		background-color: rgba(0, 0, 0, 0.3);
		flex-shrink: 0;
		overflow: hidden;
		left: 0rpx;
		width: 100% !important;
		border-top-left-radius: 0rpx;
		border-bottom-right-radius: 16rpx;
		position: absolute;
		height: 48rpx !important;
	}
	.text19-clz {
		text-align: right;
	}
	.text20-clz {
		margin-left: 0rpx;
		top: 0rpx;
		left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 10rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		position: relative;
		margin-bottom: 0rpx;
		margin-right: 10rpx;
	}
	.flex11-clz {
		margin-left: 0rpx;
		width: calc(100% - 0rpx - 0rpx) !important;
		margin-top: 32rpx;
		margin-bottom: 0rpx;
		margin-right: 0rpx;
	}
	.flex13-clz {
		top: 0rpx;
		left: 0rpx;
		position: relative;
	}
	.image-clz {
		flex-shrink: 0;
		border-bottom-left-radius: 16rpx;
		overflow: hidden;
		width: 686rpx !important;
		border-top-left-radius: 16rpx;
		border-top-right-radius: 16rpx;
		border-bottom-right-radius: 20rpx;
		height: 384rpx !important;
	}
	.flex15-clz {
		border-bottom-left-radius: 16rpx;
		color: #fff;
		bottom: 0rpx;
		border-top-right-radius: 0rpx;
		background-color: rgba(0, 0, 0, 0.3);
		flex-shrink: 0;
		overflow: hidden;
		left: 0rpx;
		width: 100% !important;
		border-top-left-radius: 0rpx;
		border-bottom-right-radius: 16rpx;
		position: absolute;
		height: 48rpx !important;
	}
	.text14-clz {
		text-align: right;
	}
	.text15-clz {
		margin-left: 0rpx;
		top: 0rpx;
		left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 10rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		position: relative;
		margin-bottom: 0rpx;
		margin-right: 10rpx;
	}
	.modal-clz {
		z-index: 1000000;
	}
	.diygw-dialog-modal {
		background-color: rgba(255, 255, 255, 0);
	}
	.flex38-clz {
		border-bottom-left-radius: 20rpx;
		z-index: 1200;
		border-top-right-radius: 20rpx;
		margin-right: 10rpx;
		margin-left: 10rpx;
		flex-shrink: 0;
		overflow: hidden;
		width: calc(100% - 10rpx - 10rpx) !important;
		border-top-left-radius: 20rpx;
		margin-top: 10rpx;
		border-bottom-right-radius: 20rpx;
		margin-bottom: 10rpx;
		height: 564rpx !important;
	}
	#model {
		transform: translate(-50%, -50%);
	}
	.flex43-clz {
		flex-shrink: 0;
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		width: 424rpx !important;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
		height: 428rpx !important;
	}
	.flex39-clz {
		margin-left: 10rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		font-size: 40rpx !important;
		margin-top: 32rpx;
		margin-bottom: 10rpx;
		text-align: center;
		margin-right: 10rpx;
	}
	.icon5-clz {
		flex-shrink: 0;
		width: 44rpx !important;
		// background-image: url(/static/maskgroup.png);
		height: 44rpx !important;
	}
	.icon5 {
		font-size: 64rpx;
	}
	.text36-clz {
		flex-shrink: 0;
		color: #ffc01d;
		width: 62rpx !important;
		height: 44rpx !important;
		text-align: center;
	}
	.text37-clz {
		margin-left: 10rpx;
		color: #999999;
		width: calc(100% - 10rpx - 10rpx) !important;
		font-size: 20rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		text-align: center;
		margin-right: 10rpx;
	}
	.flex41-clz {
		margin-left: 10rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.text38-clz {
		flex-shrink: 0;
		width: 284rpx !important;
		height: 80rpx !important;
		text-align: center;
	}
	.flex42-clz {
		margin-left: 10rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		margin-top: 32rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.btn4-clz {
		padding-top: 16rpx;
		border-bottom-left-radius: 60rpx;
		color: #fff;
		padding-left: 20rpx;
		padding-bottom: 20rpx;
		border-top-right-radius: 60rpx;
		background-color: #16c7ff;
		flex-shrink: 0;
		overflow: hidden;
		width: 328rpx !important;
		border-top-left-radius: 60rpx;
		border-bottom-right-radius: 60rpx;
		height: 60rpx !important;
		text-align: center;
		padding-right: 20rpx;
	}
	.icon6-clz {
		margin-left: 10rpx;
		color: #e1e1e1;
		margin-top: 24rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.icon6 {
		font-size: 64rpx;
	}
	// .container331385 {
	// 	margin-top:80rpx;
	// }
</style>
