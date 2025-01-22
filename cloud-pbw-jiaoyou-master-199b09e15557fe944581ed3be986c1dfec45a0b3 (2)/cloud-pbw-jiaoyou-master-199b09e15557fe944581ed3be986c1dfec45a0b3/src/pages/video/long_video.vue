<template>
	<view class="container container331385">
		<!-- <u-navbar :isSlot="true" :isFixed="true" :isMarginRight="false" :borderBottom="false" title="" :background="{ backgroundColor: '#ffffff' }" :backTextStyle="{ color: 'inherit' }" backIconColor="#fff" titleColor="inherit" :isHome="false" :isBack="false">
			<view class="flex align-center diygw-text-md text-bold align-center flex-nowrap diygw-col-24 flexbar-clz">
				<text class="flex icon diygw-col-0 icon-clz diy-icon-back"></text>
				<text class="diygw-col-23 text-clz"> 影片名字 </text>
				<text class="flex icon1 diygw-col-0 diy-icon-forward"></text>
			</view>
		</u-navbar> -->
		<view class="flex flex-wrap diygw-col-24 flex-direction-column flex35-clz">
			<view class="flex diygw-col-24">
				<video ref="refVideo" src="https://agent.diygw.com/diygwcom.mp4" style="width: 100%; height: 420rpx" object-fit="contain" title="视频标题" poster="/static/pic1.jpg"></video>
			</view>
			<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center white flex36-clz">
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
			<text class="diygw-col-12 text1-clz"> 影片介绍：标题文字 </text>
			<button class="diygw-col-12 btn-clz diygw-btn-default">开通VIP解锁观看完整版</button>
		</view>
		<text class="diygw-col-24 text3-clz"> 观看次数：1000 </text>
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
		<view class="flex flex-wrap diygw-col-24 items-center flex4-clz">
			<image src="/static/heart.png" class="response diygw-col-12 image2-clz" mode="widthFix"></image>
			<text class="diygw-col-3 text5-clz"> 198 </text>
			<image src="/static/comments.png" class="response diygw-col-24 image4-clz" mode="widthFix"></image>
			<text class="diygw-col-3 text6-clz"> 233 </text>
			<image src="/static/sz.png" class="response diygw-col-24 image3-clz" mode="widthFix"></image>
			<text class="diygw-col-3 text7-clz"> 16 </text>
			<text class="diygw-col-2 text8-clz"> 收起 </text>
		</view>
		<view class="flex flex-wrap diygw-col-24 flex-direction-column">
			<view class="flex flex-wrap diygw-col-24 flex-direction-column">
				<view class="flex flex-wrap diygw-col-24 justify-start flex12-clz">
					<view class="flex diygw-col-24 avatar2-clz">
						<view class="diygw-avatar radius bg-none">
							<image mode="aspectFit" class="diygw-avatar-img radius" src=""></image>
						</view>
					</view>
					<view class="flex flex-wrap diygw-col-24 flex19-clz">
						<view class="flex flex-wrap diygw-col-24 flex-direction-column flex20-clz">
							<text class="diygw-col-24 text19-clz"> 昵称 </text>
							<text class="diygw-col-24 text20-clz"> 文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文文案文案文案 </text>
							<view class="flex flex-wrap diygw-col-24 items-center flex21-clz">
								<text class="diygw-col-24 text21-clz"> 02-27 </text>
								<text class="diygw-col-24 text22-clz"> 回复 </text>
							</view>
						</view>
						<view class="flex flex-wrap diygw-col-24 flex-direction-column justify-start items-center flex22-clz">
							<text class="flex icon4 diygw-col-24 icon4-clz"></text>
							<text class="diygw-col-24 text23-clz"> 1.2k </text>
						</view>
					</view>
				</view>
				<view class="flex diygw-col-24 line2-clz">
					<view class="diygw-pzx" style="border-bottom: 1px solid #eee"></view>
				</view>
			</view>
			<view class="flex flex-wrap diygw-col-24 flex-direction-column">
				<view class="flex flex-wrap diygw-col-24 justify-start flex6-clz">
					<view class="flex diygw-col-24 avatar4-clz">
						<view class="diygw-avatar radius bg-none">
							<image mode="aspectFit" class="diygw-avatar-img radius" src=""></image>
						</view>
					</view>
					<view class="flex flex-wrap diygw-col-24 flex-direction-column flex7-clz">
						<view class="flex flex-wrap diygw-col-24">
							<view class="flex flex-wrap diygw-col-24 flex-direction-column flex8-clz">
								<text class="diygw-col-24 text9-clz"> 昵称 </text>
								<text class="diygw-col-24 text10-clz"> 文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文文案文案文案 </text>
								<view class="flex flex-wrap diygw-col-24 items-center flex9-clz">
									<text class="diygw-col-24 text11-clz"> 02-27 </text>
									<text class="diygw-col-24 text12-clz"> 回复 </text>
								</view>
							</view>
							<view class="flex flex-wrap diygw-col-24 flex-direction-column justify-start items-center flex17-clz">
								<text class="flex icon2 diygw-col-24 icon2-clz"></text>
								<text class="diygw-col-24 text13-clz"> 1.2k </text>
							</view>
						</view>
						<view class="flex flex-wrap diygw-col-24">
							<view class="flex diygw-col-24 avatar1-clz">
								<view class="diygw-avatar radius bg-none">
									<image mode="aspectFit" class="diygw-avatar-img radius" src=""></image>
								</view>
							</view>
							<view class="flex flex-wrap diygw-col-24 flex16-clz">
								<view class="flex flex-wrap diygw-col-24 flex-direction-column flex13-clz">
									<text class="diygw-col-24 text14-clz"> 昵称 </text>
									<text class="diygw-col-24 text15-clz"> 文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文文案文案文案 </text>
									<view class="flex flex-wrap diygw-col-24 items-center flex14-clz">
										<text class="diygw-col-24 text16-clz"> 02-27 </text>
										<text class="diygw-col-24 text17-clz"> 回复 </text>
									</view>
								</view>
								<view class="flex flex-wrap diygw-col-24 flex-direction-column justify-start items-center flex15-clz">
									<text class="flex icon3 diygw-col-24 icon3-clz"></text>
									<text class="diygw-col-24 text18-clz"> 1.2k </text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="flex diygw-col-24 line1-clz">
					<view class="diygw-pzx" style="border-bottom: 1px solid #eee"></view>
				</view>
			</view>
		</view>
		<view class="flex flex-wrap diygw-col-24 flex-direction-column">
			<text class="diygw-col-24 text24-clz"> 热门推荐 </text>
			<view class="flex flex-wrap diygw-col-24 flex25-clz">
				<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image-clz" mode="widthFix"></image>
				<view class="flex flex-wrap diygw-col-24 flex-direction-column flex26-clz">
					<text class="diygw-col-24 text25-clz"> 咨询标题 </text>
					<text class="diygw-col-24 text26-clz"> 文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案案文案文案文案文案文案文案文案文... </text>
				</view>
				<view class="flex flex-wrap diygw-col-24 items-center">
					<view class="flex flex-wrap diygw-col-24 items-center flex28-clz">
						<view class="flex diygw-col-24 avatar3-clz">
							<view class="diygw-avatar radius bg-none">
								<image mode="aspectFit" class="diygw-avatar-img radius" src=""></image>
							</view>
						</view>
						<text class="diygw-col-24 text27-clz"> 用户昵称 </text>
					</view>
					<text class="diygw-col-24 text28-clz"> 播放：10000 </text>
					<view class="flex flex-wrap diygw-col-24 flex-direction-column">
						<view class="flex diygw-col-24 line3-clz">
							<view class="diygw-pzx" style="border-bottom: 1px solid #eee"></view>
						</view>
					</view>
				</view>
			</view>
			<view class="flex flex-wrap diygw-col-24 flex30-clz">
				<image src="/static/d3c8f77d0b8fa4bc9f9454330da7ad63.png" class="response diygw-col-24 image1-clz" mode="widthFix"></image>
				<view class="flex flex-wrap diygw-col-24 flex-direction-column flex31-clz">
					<text class="diygw-col-24 text29-clz"> 咨询标题 </text>
					<text class="diygw-col-24 text30-clz"> 文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案案文案文案文案文案文案文案文案文... </text>
				</view>
				<view class="flex flex-wrap diygw-col-24 items-center">
					<view class="flex flex-wrap diygw-col-24 items-center flex33-clz">
						<view class="flex diygw-col-24 avatar5-clz">
							<view class="diygw-avatar radius bg-none">
								<image mode="aspectFit" class="diygw-avatar-img radius" src=""></image>
							</view>
						</view>
						<text class="diygw-col-24 text31-clz"> 用户昵称 </text>
					</view>
					<text class="diygw-col-24 text32-clz"> 播放：10000 </text>
					<view class="flex flex-wrap diygw-col-24 flex-direction-column">
						<view class="flex diygw-col-24 line4-clz">
							<view class="diygw-pzx" style="border-bottom: 1px solid #eee"></view>
						</view>
					</view>
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
	export default {
		data() {
			return {
				//用户全局信息
				userInfo: {},
				//页面传参
				globalOption: {},
				//自定义全局变量
				globalData: {},
				modal: ''
			};
		},
		onShow() {
			this.setCurrentPage(this);
		},
		onLoad(option) {
			this.setCurrentPage(this);
			if (option) {
				this.setData({
					globalOption: this.getOption(option)
				});
			}

			this.init();
		},
		methods: {
			async init() {}
		}
	};
</script>

<style lang="scss" scoped>
	.flexbar-clz {
		padding-top: 10rpx;
		padding-left: 32rpx;
		padding-bottom: 10rpx;
		padding-right: 32rpx;
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
		padding-top: 8rpx;
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
		padding-top: 32rpx;
		color: #333333;
		padding-left: 0rpx;
		padding-bottom: 10rpx;
		margin-right: 32rpx;
		margin-left: 32rpx;
		top: 0rpx;
		left: 0rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 0rpx;
		position: relative;
		margin-bottom: 0rpx;
		padding-right: 10rpx;
	}
	.image2-clz {
		flex-shrink: 0;
		width: 48rpx !important;
		height: 48rpx !important;
	}
	.text5-clz {
		margin-left: 6rpx;
		flex-shrink: 0;
		width: calc(12.5% - 6rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 6rpx;
		margin-bottom: 0rpx;
		height: 44rpx !important;
		text-align: left;
		margin-right: 0rpx;
	}
	.image4-clz {
		flex-shrink: 0;
		width: 48rpx !important;
		height: 48rpx !important;
	}
	.text6-clz {
		margin-left: 6rpx;
		flex-shrink: 0;
		width: calc(12.5% - 6rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 6rpx;
		margin-bottom: 0rpx;
		height: 44rpx !important;
		text-align: left;
		margin-right: 0rpx;
	}
	.image3-clz {
		flex-shrink: 0;
		width: 48rpx !important;
		height: 48rpx !important;
	}
	.text7-clz {
		margin-left: 4rpx;
		flex-shrink: 0;
		width: calc(12.5% - 4rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 6rpx;
		margin-bottom: 0rpx;
		height: 44rpx !important;
		text-align: left;
		margin-right: 0rpx;
	}
	.text8-clz {
		margin-left: 0rpx;
		color: #16c7ff;
		top: 32rpx;
		width: calc(8.3333333333% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 0rpx;
		position: absolute;
		right: 0rpx;
		margin-bottom: 0rpx;
		text-align: right;
		margin-right: 0rpx;
	}
	.flex12-clz {
		padding-top: 32rpx;
		padding-left: 24rpx;
		padding-bottom: 32rpx;
		padding-right: 24rpx;
	}
	.avatar2-clz {
		flex-shrink: 0;
		background-size: 100% 100%;
		width: 64rpx !important;
		background-image: url(/static/34e4b24d1c5bf18184d7d18fea013df8.png);
		background-position: center center;
		height: 64rpx !important;
	}
	.flex19-clz {
		flex-shrink: 0;
		width: 626rpx !important;
	}
	.flex20-clz {
		flex-shrink: 0;
		width: 572rpx !important;
	}
	.text19-clz {
		margin-left: 16rpx;
		color: #999999;
		width: calc(100% - 16rpx - 10rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.text20-clz {
		margin-left: 16rpx;
		width: calc(100% - 16rpx - 10rpx) !important;
		font-size: 28rpx !important;
		margin-top: 6rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.flex21-clz {
		margin-left: 16rpx;
		color: #999999;
		width: calc(100% - 16rpx - 10rpx) !important;
		margin-top: 0rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.text21-clz {
		flex-shrink: 0;
		width: 74rpx !important;
	}
	.text22-clz {
		flex-shrink: 0;
		width: 100rpx !important;
	}
	.flex22-clz {
		flex-shrink: 0;
		width: 50rpx !important;
	}
	.icon4-clz {
		flex-shrink: 0;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 36rpx !important;
		background-image: url(/static/heart.png);
		background-position: center center;
		height: 36rpx !important;
	}
	.icon4 {
		font-size: 64rpx;
	}
	.text23-clz {
		color: #333333;
		text-align: center;
	}
	.line2-clz {
		margin-left: 32rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 32rpx;
	}
	.flex6-clz {
		padding-top: 32rpx;
		padding-left: 24rpx;
		padding-bottom: 32rpx;
		padding-right: 24rpx;
	}
	.avatar4-clz {
		flex-shrink: 0;
		background-size: 100% 100%;
		width: 64rpx !important;
		background-image: url(/static/34e4b24d1c5bf18184d7d18fea013df8.png);
		background-position: center center;
		height: 64rpx !important;
	}
	.flex7-clz {
		flex-shrink: 0;
		width: 626rpx !important;
	}
	.flex8-clz {
		flex-shrink: 0;
		width: 572rpx !important;
	}
	.text9-clz {
		margin-left: 16rpx;
		color: #999999;
		width: calc(100% - 16rpx - 10rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.text10-clz {
		margin-left: 16rpx;
		width: calc(100% - 16rpx - 10rpx) !important;
		font-size: 28rpx !important;
		margin-top: 6rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.flex9-clz {
		margin-left: 16rpx;
		color: #999999;
		width: calc(100% - 16rpx - 10rpx) !important;
		margin-top: 0rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.text11-clz {
		flex-shrink: 0;
		width: 74rpx !important;
	}
	.text12-clz {
		flex-shrink: 0;
		width: 100rpx !important;
	}
	.flex17-clz {
		flex-shrink: 0;
		width: 50rpx !important;
	}
	.icon2-clz {
		flex-shrink: 0;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 36rpx !important;
		background-image: url(/static/heart.png);
		background-position: center center;
		height: 36rpx !important;
	}
	.icon2 {
		font-size: 64rpx;
	}
	.text13-clz {
		color: #333333;
		text-align: center;
	}
	.avatar1-clz {
		flex-shrink: 0;
		background-size: 100% 100%;
		width: 64rpx !important;
		background-image: url(/static/34e4b24d1c5bf18184d7d18fea013df8.png);
		background-position: center center;
		height: 64rpx !important;
	}
	.flex16-clz {
		flex-shrink: 0;
		width: 556rpx !important;
	}
	.flex13-clz {
		flex-shrink: 0;
		width: 504rpx !important;
	}
	.text14-clz {
		margin-left: 16rpx;
		color: #999999;
		width: calc(100% - 16rpx - 10rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.text15-clz {
		margin-left: 16rpx;
		width: calc(100% - 16rpx - 10rpx) !important;
		font-size: 28rpx !important;
		margin-top: 6rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.flex14-clz {
		margin-left: 16rpx;
		color: #999999;
		width: calc(100% - 16rpx - 10rpx) !important;
		margin-top: 0rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.text16-clz {
		flex-shrink: 0;
		width: 74rpx !important;
	}
	.text17-clz {
		flex-shrink: 0;
		width: 100rpx !important;
	}
	.flex15-clz {
		flex-shrink: 0;
		width: 52rpx !important;
	}
	.icon3-clz {
		flex-shrink: 0;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 36rpx !important;
		background-image: url(/static/heart.png);
		background-position: center center;
		height: 36rpx !important;
	}
	.icon3 {
		font-size: 64rpx;
	}
	.text18-clz {
		color: #333333;
		text-align: center;
	}
	.line1-clz {
		margin-left: 32rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 32rpx;
	}
	.text24-clz {
		margin-left: 32rpx;
		font-weight: bold;
		width: calc(100% - 32rpx - 32rpx) !important;
		font-size: 36rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 32rpx;
	}
	.flex25-clz {
		margin-left: 32rpx;
		flex-shrink: 0;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 32rpx;
		margin-bottom: 0rpx;
		height: 294rpx !important;
		margin-right: 32rpx;
	}
	.image-clz {
		flex-shrink: 0;
		border-bottom-left-radius: 12rpx;
		overflow: hidden;
		width: 180rpx !important;
		border-top-left-radius: 12rpx;
		border-top-right-radius: 12rpx;
		border-bottom-right-radius: 12rpx;
		height: 180rpx !important;
	}
	.flex26-clz {
		flex-shrink: 0;
		padding-top: 10rpx;
		padding-left: 32rpx;
		width: 498rpx !important;
		padding-bottom: 0rpx;
		padding-right: 0rpx;
	}
	.text25-clz {
		font-weight: bold;
		font-size: 32rpx !important;
	}
	.text26-clz {
		margin-left: 0rpx;
		overflow: hidden;
		width: calc(100% - 0rpx - 8rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 0rpx;
		margin-right: 8rpx;
	}
	.flex28-clz {
		flex-shrink: 0;
		width: 506rpx !important;
	}
	.avatar3-clz {
		flex-shrink: 0;
		background-size: 100% 100%;
		width: 64rpx !important;
		background-image: url(/static/34e4b24d1c5bf18184d7d18fea013df8.png);
		background-position: center center;
		height: 64rpx !important;
	}
	.text27-clz {
		flex-shrink: 0;
		padding-top: 10rpx;
		font-weight: bold;
		padding-left: 16rpx;
		width: 426rpx !important;
		font-size: 32rpx !important;
		padding-bottom: 10rpx;
		padding-right: 10rpx;
	}
	.text28-clz {
		flex-shrink: 0;
		width: 168rpx !important;
		text-align: right;
	}
	.line3-clz {
		margin-left: 0rpx;
		width: calc(100% - 0rpx - 0rpx) !important;
		margin-top: 16rpx;
		margin-bottom: 0rpx;
		margin-right: 0rpx;
	}
	.flex30-clz {
		margin-left: 32rpx;
		flex-shrink: 0;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 32rpx;
		margin-bottom: 0rpx;
		height: 294rpx !important;
		margin-right: 32rpx;
	}
	.image1-clz {
		flex-shrink: 0;
		border-bottom-left-radius: 12rpx;
		overflow: hidden;
		width: 180rpx !important;
		border-top-left-radius: 12rpx;
		border-top-right-radius: 12rpx;
		border-bottom-right-radius: 12rpx;
		height: 180rpx !important;
	}
	.flex31-clz {
		flex-shrink: 0;
		padding-top: 10rpx;
		padding-left: 32rpx;
		width: 498rpx !important;
		padding-bottom: 0rpx;
		padding-right: 0rpx;
	}
	.text29-clz {
		font-weight: bold;
		font-size: 32rpx !important;
	}
	.text30-clz {
		margin-left: 0rpx;
		overflow: hidden;
		width: calc(100% - 0rpx - 8rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 0rpx;
		margin-right: 8rpx;
	}
	.flex33-clz {
		flex-shrink: 0;
		width: 506rpx !important;
	}
	.avatar5-clz {
		flex-shrink: 0;
		background-size: 100% 100%;
		width: 64rpx !important;
		background-image: url(/static/34e4b24d1c5bf18184d7d18fea013df8.png);
		background-position: center center;
		height: 64rpx !important;
	}
	.text31-clz {
		flex-shrink: 0;
		padding-top: 10rpx;
		font-weight: bold;
		padding-left: 16rpx;
		width: 426rpx !important;
		font-size: 32rpx !important;
		padding-bottom: 10rpx;
		padding-right: 10rpx;
	}
	.text32-clz {
		flex-shrink: 0;
		width: 168rpx !important;
		text-align: right;
	}
	.line4-clz {
		margin-left: 0rpx;
		width: calc(100% - 0rpx - 0rpx) !important;
		margin-top: 16rpx;
		margin-bottom: 0rpx;
		margin-right: 0rpx;
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
	.container331385 {
	}
</style>
