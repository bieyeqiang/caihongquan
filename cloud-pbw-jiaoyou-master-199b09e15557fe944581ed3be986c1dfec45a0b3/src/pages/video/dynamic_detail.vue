<template>
	<view class="container container331385">
		<u-navbar titleWidth="500" :isFixed="true" :isSlotTitle="true" title="" :borderBottom="false" :background="{ background: 'none !important' }" titleColor="inherit" backIconColor="inherit" :backTextStyle="{ color: 'inherit' }" :isHome="false" :isBack="true">
			<template v-slot:title></template>
		</u-navbar>
		<view class="flex flex-wrap diygw-col-24 flex-clz">
			<view class="flex diygw-col-24 avatar1-clz">
				<view class="diygw-avatar avatar1-avatar lg radius bg-none">
					<image mode="aspectFit" class="diygw-avatar-img radius" src="/static/34e4b24d1c5bf18184d7d18fea013df8.png"></image>
				</view>
			</view>
			<view class="flex flex-wrap diygw-col-9 flex-direction-column flex1-clz">
				<text class="diygw-col-24 text-clz"> 用户昵称 </text>
				<image src="/static/group130.png" class="response diygw-col-24 image-clz" mode="widthFix"></image>
			</view>
			<button class="diygw-col-9 btn-clz diygw-btn-default">+ 关注</button>
		</view>
		<view class="flex swipers diygw-col-24 swipers-clz">
			<swiper :current="swipersIndex" class="swiper" @change="changeSwipers" indicator-color="rgba(51, 51, 51, 0.39)" indicator-active-color="rgba(64, 64, 64, 0.93)" indicator-dots="true" autoplay interval="3000" circular="true" style="height: 420rpx">
				<swiper-item class="diygw-swiper-item">
					<view class="diygw-swiper-item-wrap">
						<image src="/static/pic1.jpg" class="response diygw-col-24 image1-clz" mode="heightFix"></image>
					</view>
				</swiper-item>
				<swiper-item class="diygw-swiper-item">
					<view class="diygw-swiper-item-wrap"> </view>
				</swiper-item>
				<swiper-item class="diygw-swiper-item">
					<view class="diygw-swiper-item-wrap"> </view>
				</swiper-item>
			</swiper>
		</view>
		<text class="diygw-col-24 text1-clz"> 文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文 </text>
		<view class="flex flex-wrap diygw-col-24 flex2-clz">
			<image src="/static/heart.png" class="response diygw-col-12 image2-clz" mode="widthFix"></image>
			<text class="diygw-col-3 text2-clz"> 198 </text>
			<image src="/static/comments.png" class="response diygw-col-24 image4-clz" mode="widthFix"></image>
			<text class="diygw-col-3 text3-clz"> 233 </text>
			<image src="/static/sz.png" class="response diygw-col-24 image3-clz" mode="widthFix"></image>
			<text class="diygw-col-3 text4-clz"> 16 </text>
			<text class="diygw-col-2 text5-clz"> 收起 </text>
		</view>
		<view class="flex flex-wrap diygw-col-24 flex-direction-column">
			<view class="flex flex-wrap diygw-col-24 flex3-clz">
				<view class="flex diygw-col-24 avatar-clz">
					<view class="diygw-avatar avatar-avatar lg radius bg-none">
						<image mode="aspectFit" class="diygw-avatar-img radius" src="/static/34e4b24d1c5bf18184d7d18fea013df8.png"></image>
					</view>
				</view>
				<view class="flex flex-wrap diygw-col-24 flex-direction-column flex4-clz">
					<text class="diygw-col-15 text6-clz"> 昵称 </text>
					<text class="diygw-col-24 text7-clz"> 文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文文案文案文案 </text>
					<view class="flex flex-wrap diygw-col-24 flex-direction-row-reverse">
						<text class="diygw-col-24"> </text>
					</view>
				</view>
				<view class="flex flex-wrap diygw-col-0 flex-direction-column flex5-clz">
					<image src="/static/heart.png" class="response diygw-col-24 image5-clz" mode="widthFix"></image>
					<text class="diygw-col-24 text9-clz"> 21 </text>
				</view>
			</view>
			<view class="flex flex-wrap diygw-col-24 flex-direction-column flex7-clz"> </view>
		</view>
		<view class="flex flex-wrap diygw-col-24 flex-direction-column">
			<view class="flex flex-wrap diygw-col-24 flex9-clz">
				<view class="flex diygw-col-24 avatar2-clz">
					<view class="diygw-avatar avatar2-avatar lg radius bg-none">
						<image mode="aspectFit" class="diygw-avatar-img radius" src="/static/34e4b24d1c5bf18184d7d18fea013df8.png"></image>
					</view>
				</view>
				<view class="flex flex-wrap diygw-col-24 flex-direction-column flex10-clz">
					<text class="diygw-col-15 text10-clz"> 昵称 </text>
					<text class="diygw-col-24 text11-clz"> 文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文文案文案文案 </text>
					<text class="diygw-col-24 text12-clz"> 02 - 16 回复 </text>
				</view>
				<view class="flex flex-wrap diygw-col-0 flex-direction-column flex11-clz">
					<image src="/static/heart.png" class="response diygw-col-24 image6-clz" mode="widthFix"></image>
					<text class="diygw-col-24 text13-clz"> 21 </text>
				</view>
			</view>
			<view class="flex flex-wrap diygw-col-24 flex12-clz">
				<view class="flex diygw-col-24 avatar4-clz">
					<view class="diygw-avatar avatar4-avatar lg radius bg-none">
						<image mode="aspectFit" class="diygw-avatar-img radius" src="/static/34e4b24d1c5bf18184d7d18fea013df8.png"></image>
					</view>
				</view>
				<view class="flex flex-wrap diygw-col-24 flex-direction-column flex13-clz">
					<text class="diygw-col-15 text14-clz"> 昵称 </text>
					<text class="diygw-col-24 text15-clz"> 文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文文案文案文案 </text>
					<text class="diygw-col-24 text16-clz"> 02 - 16 回复 </text>
				</view>
				<view class="flex flex-wrap diygw-col-0 flex-direction-column flex14-clz">
					<image src="/static/heart.png" class="response diygw-col-24 image7-clz" mode="widthFix"></image>
					<text class="diygw-col-24 text17-clz"> 21 </text>
				</view>
			</view>
			<view class="flex flex-wrap diygw-col-24 flex-direction-column"> </view>
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
				swipersIndex: 0
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
			async init() {},
			changeSwipers(evt) {
				let swipersIndex = evt.detail.current;
				this.setData({ swipersIndex });
			}
		}
	};
</script>

<style lang="scss" scoped>
	.flex-clz {
		margin-left: 32rpx;
		top: 40rpx;
		left: 0rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 0rpx;
		position: relative;
		margin-bottom: 10rpx;
		margin-right: 32rpx;
	}
	.avatar1-clz {
		flex-shrink: 0;
		width: 120rpx !important;
		height: 120rpx !important;
	}
	.avatar1-avatar {
		width: 60px;
		height: 60px;
	}
	.flex1-clz {
		margin-left: 16rpx;
		width: calc(37.5% - 16rpx - 10rpx) !important;
		margin-top: 0rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.text-clz {
		padding-top: 0rpx;
		color: #333333;
		padding-left: 0rpx;
		font-size: 40rpx !important;
		padding-bottom: 10rpx;
		padding-right: 0rpx;
	}
	.image-clz {
		flex-shrink: 0;
		width: 70rpx !important;
	}
	.btn-clz {
		border-bottom-left-radius: 44rpx;
		color: #fff;
		font-size: 28rpx !important;
		border-top-right-radius: 44rpx;
		margin-right: 10rpx;
		background-color: #16c7ff;
		margin-left: 10rpx;
		flex-shrink: 0;
		overflow: hidden;
		top: 0rpx;
		left: 434rpx;
		width: calc(37.5% - 10rpx - 10rpx) !important;
		border-top-left-radius: 44rpx;
		margin-top: 8rpx;
		border-bottom-right-radius: 44rpx;
		position: absolute;
		margin-bottom: 10rpx;
		height: 44rpx !important;
		text-align: center;
	}
	.swipers-clz {
		margin-left: 32rpx;
		flex-shrink: 0;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 54rpx;
		margin-bottom: 10rpx;
		height: 420rpx !important;
		margin-right: 32rpx;
	}
	.image1-clz {
		flex-shrink: 0;
		border-bottom-left-radius: 16rpx;
		overflow: hidden;
		border-top-left-radius: 16rpx;
		border-top-right-radius: 16rpx;
		border-bottom-right-radius: 16rpx;
		height: 420rpx !important;
	}
	.text1-clz {
		margin-left: 32rpx;
		color: #333333;
		width: calc(100% - 32rpx - 32rpx) !important;
		font-size: 28rpx !important;
		margin-top: 52rpx;
		margin-bottom: 10rpx;
		margin-right: 32rpx;
	}
	.flex2-clz {
		border-top: 2rpx solid #f0f0f0;
		padding-top: 32rpx;
		color: #333333;
		padding-left: 0rpx;
		padding-bottom: 10rpx;
		margin-right: 32rpx;
		margin-left: 32rpx;
		top: 0rpx;
		left: 0rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 48rpx;
		position: relative;
		margin-bottom: 0rpx;
		padding-right: 10rpx;
	}
	.image2-clz {
		flex-shrink: 0;
		width: 48rpx !important;
		height: 48rpx !important;
	}
	.text2-clz {
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
	.text3-clz {
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
	.text4-clz {
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
	.text5-clz {
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
	.flex3-clz {
		margin-left: 32rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 32rpx;
		margin-bottom: 0rpx;
		margin-right: 32rpx;
	}
	.avatar-clz {
		flex-shrink: 0;
		width: 64rpx !important;
		height: 64rpx !important;
	}
	.avatar-avatar {
		width: 32px;
		height: 32px;
	}
	.flex4-clz {
		flex-shrink: 0;
		width: 550rpx !important;
	}
	.text6-clz {
		color: #999999;
		font-size: 28rpx !important;
	}
	.text7-clz {
		margin-left: 0rpx;
		flex-shrink: 0;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 0rpx;
		margin-right: 0rpx;
	}
	.flex5-clz {
		margin-left: 28rpx;
		flex-shrink: 0;
		width: 36rpx !important;
		margin-top: 0rpx;
		margin-bottom: 0rpx;
		height: 80rpx !important;
		margin-right: 0rpx;
	}
	.image5-clz {
		flex-shrink: 0;
		width: 36rpx !important;
		height: 36rpx !important;
		text-align: center;
	}
	.text9-clz {
		margin-left: 0rpx;
		flex-shrink: 0;
		flex: 1;
		width: calc(100% - 0rpx - 0rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 0rpx;
		text-align: center;
		margin-right: 0rpx;
	}
	.flex7-clz {
		margin-left: 32rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 0rpx;
		margin-bottom: 10rpx;
		margin-right: 32rpx;
	}
	.flex9-clz {
		margin-left: 32rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 32rpx;
		margin-bottom: 0rpx;
		margin-right: 32rpx;
	}
	.avatar2-clz {
		flex-shrink: 0;
		width: 64rpx !important;
		height: 64rpx !important;
	}
	.avatar2-avatar {
		width: 32px;
		height: 32px;
	}
	.flex10-clz {
		flex-shrink: 0;
		width: 550rpx !important;
	}
	.text10-clz {
		color: #999999;
		font-size: 28rpx !important;
	}
	.text11-clz {
		margin-left: 0rpx;
		flex-shrink: 0;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 0rpx;
		margin-right: 0rpx;
	}
	.text12-clz {
		color: #999999;
		width: 100%;
	}
	.flex11-clz {
		margin-left: 28rpx;
		flex-shrink: 0;
		width: 36rpx !important;
		margin-top: 0rpx;
		margin-bottom: 0rpx;
		height: 80rpx !important;
		margin-right: 0rpx;
	}
	.image6-clz {
		flex-shrink: 0;
		width: 36rpx !important;
		height: 36rpx !important;
		text-align: center;
	}
	.text13-clz {
		margin-left: 0rpx;
		flex-shrink: 0;
		flex: 1;
		width: calc(100% - 0rpx - 0rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 0rpx;
		text-align: center;
		margin-right: 0rpx;
	}
	.flex12-clz {
		margin-left: 100rpx;
		flex-shrink: 0;
		width: calc(100% - 100rpx - 32rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 32rpx;
	}
	.avatar4-clz {
		flex-shrink: 0;
		width: 64rpx !important;
		height: 64rpx !important;
	}
	.avatar4-avatar {
		width: 32px;
		height: 32px;
	}
	.flex13-clz {
		flex-shrink: 0;
		width: 482rpx !important;
	}
	.text14-clz {
		color: #999999;
		font-size: 28rpx !important;
	}
	.text15-clz {
		margin-left: 0rpx;
		flex-shrink: 0;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 0rpx;
		margin-right: 0rpx;
	}
	.text16-clz {
		color: #999999;
		width: 100%;
	}
	.hf.flex14-clz {
		margin-left: 26rpx;
		flex-shrink: 0;
		width: 38rpx !important;
		margin-top: 0rpx;
		margin-bottom: 0rpx;
		height: 80rpx !important;
		margin-right: 0rpx;
	}
	.image7-clz {
		flex-shrink: 0;
		width: 36rpx !important;
		height: 36rpx !important;
		text-align: center;
	}
	.text17-clz {
		margin-left: 0rpx;
		flex-shrink: 0;
		flex: 1;
		width: calc(100% - 0rpx - 0rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 0rpx;
		text-align: center;
		margin-right: 0rpx;
	}
	.container331385 {
	}
</style>
