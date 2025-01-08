<template>
	<view class="container container331385">
		<view class="flex flex-wrap diygw-col-24 justify-between items-center flex21-clz">
			<image src="/static/b619fa5643d7d65148c208b18f887b75.png" class="response diygw-col-4 image-clz" mode="widthFix"></image>
			<view class="flex flex-wrap diygw-col-24 justify-around items-center white flex11-clz">
				<u-form-item class="diygw-col-24 input-clz" labelPosition="top" prop="input">
					<u-input :focus="inputFocus" placeholder="" v-model="input"></u-input>
				</u-form-item>
				<button class="diygw-col-24 btn-clz diygw-btn-default"></button>
			</view>
			<image src="/static/group104.png" class="response diygw-col-24 image1-clz" mode="widthFix"></image>
		</view>
		<view class="flex tabs diygw-col-24 flex-direction-column">
			<view class="diygw-tabs text-center solid-bottom justify-around tabs-title">
				<view class="diygw-tab-item tabs-item-title" :class="index == tabsIndex ? ' font-bold   cur text-green  ' : ''" v-for="(item, index) in tabsDatas" :key="index" @click="changeTabs" :data-index="index"> <text v-if="item.icon" :class="item.icon"></text> {{ item.text }} </view>
			</view>
			<view class="">
				<view v-if="tabsIndex == 0" class="flex-sub">
					<view class="flex tabs1 diygw-col-24 flex-direction-column">
						<view class="diygw-tabs text-center solid-bottom justify-start not-border small-border tabs1-title">
							<view class="diygw-tab-item tabs1-item-title" :class="index == tabs1Index ? '    cur text-green  ' : ''" v-for="(item, index) in tabs1Datas" :key="index" @click="changeTabs1" :data-index="index"> <text v-if="item.icon" :class="item.icon"></text> {{ item.text }} </view>
						</view>
						<view class="">
							<view v-if="tabs1Index == 0" class="flex-sub"> </view>
							<view v-if="tabs1Index == 1" class="flex-sub">
								<view class="flex flex-wrap diygw-col-24 flex-direction-column">
									<view class="flex flex-wrap diygw-col-24 flex10-clz">
										<view class="flex diygw-col-4 justify-end avatar3-clz">
											<view class="diygw-avatar radius bg-none">
												<image mode="aspectFit" class="diygw-avatar-img radius" src="/static/34e4b24d1c5bf18184d7d18fea013df8.png"></image>
											</view>
										</view>
										<text class="diygw-col-5 text6-clz"> 用户昵称 </text>
										<image src="/static/icons.png" class="response diygw-col-24 image11-clz" mode="widthFix"></image>
									</view>
									<text class="diygw-col-24 text7-clz"> DIY官网可视化工具做好的可视化拖拽开发工具，无须编程、零代码基础、所见即所得设计工具，轻松制作微信小程序、支付宝小程序、Vue3、H5、WebApp、UNIAPP、单页动画 </text>
									<view class="flex flex-wrap diygw-col-24 flex-direction-column justify-center items-center flex13-clz">
										<text class="flex icon diygw-col-0 icon-clz diy-icon-playfill"></text>
										<text class="diygw-col-0 text9-clz"> 02:08 </text>
									</view>
									<view class="flex diygw-col-24 justify-end tag3-clz">
										<view class="diygw-tag md radius">
											<text class="diygw-icon diy-icon-likefill"></text>
											<text> 14.4k </text>
										</view>
									</view>
								</view>
							</view>
							<view v-if="tabs1Index == 2" class="flex-sub"> </view>
						</view>
					</view>
				</view>
				<view v-if="tabsIndex == 1" class="flex-sub">
					<view class="flex tabs2 diygw-col-24 flex-direction-column">
						<view class="diygw-tabs text-center solid-bottom justify-start not-border small-border tabs2-title">
							<view class="diygw-tab-item tabs2-item-title" :class="index == tabs2Index ? '    cur text-green  ' : ''" v-for="(item, index) in tabs2Datas" :key="index" @click="changeTabs2" :data-index="index"> <text v-if="item.icon" :class="item.icon"></text> {{ item.text }} </view>
						</view>
						<view class="">
							<view v-if="tabs2Index == 0" class="flex-sub"> </view>
							<view v-if="tabs2Index == 1" class="flex-sub">
								<view class="flex flex-wrap diygw-col-24 flex-direction-column">
									<view class="flex flex-wrap diygw-col-24 flex3-clz">
										<view class="flex diygw-col-4 justify-end avatar1-clz">
											<view class="diygw-avatar avatar1-avatar radius bg-none">
												<image mode="aspectFit" class="diygw-avatar-img radius" src="/static/34e4b24d1c5bf18184d7d18fea013df8.png"></image>
											</view>
										</view>
										<text class="diygw-col-5 text2-clz"> 用户昵称 </text>
										<image src="/static/icons.png" class="response diygw-col-24 image5-clz" mode="widthFix"></image>
									</view>
									<text class="diygw-col-24 text3-clz"> DIY官网可视化工具做好的可视化拖拽开发工具，无须编程、零代码基础、所见即所得设计工具，轻松制作微信小程序、支付宝小程序、Vue3、H5、WebApp、UNIAPP、单页动画 </text>
									<view class="flex diygw-col-24 items-center flex-nowrap flex4-clz">
										<image src="/static/pic1.jpg" class="image6-size diygw-image diygw-col-24 image6-clz" mode="widthFix"></image>
										<image src="/static/diygwjpg.jpg" class="image7-size diygw-image diygw-col-24 image7-clz" mode="widthFix"></image>
									</view>
									<view class="flex diygw-col-24 justify-end tag-clz">
										<view class="diygw-tag md radius">
											<text class="diygw-icon diy-icon-likefill"></text>
											<text> 14.4k </text>
										</view>
									</view>
								</view>
								<view class="flex flex-wrap diygw-col-24 flex-direction-column">
									<view class="flex flex-wrap diygw-col-24 flex6-clz">
										<view class="flex diygw-col-4 justify-end avatar2-clz">
											<view class="diygw-avatar avatar2-avatar radius bg-none">
												<image mode="aspectFit" class="diygw-avatar-img radius" src="/static/34e4b24d1c5bf18184d7d18fea013df8.png"></image>
											</view>
										</view>
										<text class="diygw-col-5 text4-clz"> 用户昵称 </text>
										<image src="/static/icons.png" class="response diygw-col-24 image8-clz" mode="widthFix"></image>
									</view>
									<text class="diygw-col-24 text5-clz"> DIY官网可视化工具做好的可视化拖拽开发工具，无须编程、零代码基础、所见即所得设计工具，轻松制作微信小程序、支付宝小程序、Vue3、H5、WebApp、UNIAPP、单页动画 </text>
									<view class="flex diygw-col-24 items-center flex-nowrap">
										<image src="/static/pic1.jpg" class="image9-size diygw-image diygw-col-24 image9-clz" mode="widthFix"></image>
										<image src="/static/diygwjpg.jpg" class="image10-size diygw-image diygw-col-24 image10-clz" mode="widthFix"></image>
									</view>
									<view class="flex diygw-col-24 justify-end">
										<view class="diygw-tag md radius">
											<text class="diygw-icon diy-icon-likefill"></text>
											<text> 14.4k </text>
										</view>
									</view>
								</view>
							</view>
							<view v-if="tabs2Index == 2" class="flex-sub"> </view>
						</view>
					</view>
				</view>
				<view v-if="tabsIndex == 2" class="flex-sub">
					<view class="flex tabs3 diygw-col-24 flex-direction-column tabs3-clz">
						<view class="diygw-tabs text-center solid-bottom justify-start not-border small-border tabs3-title">
							<view class="diygw-tab-item tabs3-item-title" :class="index == tabs3Index ? '    cur text-green  ' : ''" v-for="(item, index) in tabs3Datas" :key="index" @click="changeTabs3" :data-index="index"> <text v-if="item.icon" :class="item.icon"></text> {{ item.text }} </view>
						</view>
						<view class="">
							<view v-if="tabs3Index == 0" class="flex-sub"> </view>
							<view v-if="tabs3Index == 1" class="flex-sub">
								<view class="flex flex-wrap diygw-col-24 flex-direction-column">
									<view class="flex flex-wrap diygw-col-24 flex1-clz">
										<view class="flex diygw-col-4 justify-end avatar-clz">
											<view class="diygw-avatar avatar-avatar radius bg-none">
												<image mode="aspectFit" class="diygw-avatar-img radius" src="/static/34e4b24d1c5bf18184d7d18fea013df8.png"></image>
											</view>
										</view>
										<text class="diygw-col-5 text-clz"> 用户昵称 </text>
										<image src="/static/icons.png" class="response diygw-col-24 image4-clz" mode="widthFix"></image>
									</view>
									<text class="diygw-col-24 text1-clz"> DIY官网可视化工具做好的可视化拖拽开发工具，无须编程、零代码基础、所见即所得设计工具，轻松制作微信小程序、支付宝小程序、Vue3、H5、WebApp、UNIAPP、单页动画 </text>
									<view class="flex diygw-col-24 items-center flex-nowrap flex-clz">
										<image src="/static/pic1.jpg" class="image2-size diygw-image diygw-col-24 image2-clz" mode="widthFix"></image>
										<image src="/static/diygwjpg.jpg" class="image3-size diygw-image diygw-col-24 image3-clz" mode="widthFix"></image>
									</view>
									<view class="flex diygw-col-24 justify-end tag1-clz">
										<view class="diygw-tag md radius">
											<text class="diygw-icon diy-icon-likefill"></text>
											<text> 14.4k </text>
										</view>
									</view>
								</view>
							</view>
							<view v-if="tabs3Index == 2" class="flex-sub"> </view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="flex diygw-col-24 diygw-bottom">
			<view class="diygw-grid diygw-actions">
				<button @tap="navigateTo" data-type="page" data-url="/pages/index" class="diygw-action">
					<view class="diygw-grid-inner">
						<view class="diygw-grid-icon diygw-avatar" style="">
							<image mode="aspectFit" class="diygw-avatar-img" src="/static/sy2.png"></image>
						</view>
						<view class="diygw-grid-title"> 首页 </view>
					</view>
				</button>
				<button class="diygw-action">
					<view class="diygw-grid-inner">
						<view class="diygw-grid-icon diygw-avatar" style="">
							<image mode="aspectFit" class="diygw-avatar-img" src="/static/qz.png"></image>
						</view>
						<view class="diygw-grid-title"> 圈子 </view>
					</view>
				</button>
				<button class="diygw-action">
					<view class="diygw-grid-inner">
						<view class="diygw-grid-icon diygw-avatar" style="">
							<image mode="aspectFit" class="diygw-avatar-img" src="/static/fx.png"></image>
						</view>
						<view class="diygw-grid-title"> 发现 </view>
					</view>
				</button>
				<button class="diygw-action">
					<view class="diygw-grid-inner">
						<view class="diygw-grid-icon diygw-avatar" style="">
							<image mode="aspectFit" class="diygw-avatar-img" src="/static/xx.png"></image>
						</view>
						<view class="diygw-grid-title"> 消息 </view>
					</view>
				</button>
				<button class="diygw-action">
					<view class="diygw-grid-inner">
						<view class="diygw-grid-icon diygw-avatar" style="">
							<image mode="aspectFit" class="diygw-avatar-img" src="/static/wd2.png"></image>
						</view>
						<view class="diygw-grid-title"> 我的 </view>
					</view>
				</button>
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
				inputFocus: false,
				input: '',
				tabsDatas: [
					{ text: `视频`, icon: `` },
					{ text: `图文`, icon: `` },
					{ text: `附近`, icon: `` }
				],
				tabsLeft: 0,
				tabsWidth: 0,
				tabsItemWidth: 0,
				tabsIndex: 0,
				tabs1Datas: [
					{ text: `关注`, icon: `` },
					{ text: `推荐`, icon: `` },
					{ text: `其他`, icon: `` }
				],
				tabs1Left: 0,
				tabs1Width: 0,
				tabs1ItemWidth: 0,
				tabs1Index: 0,
				tabs2Datas: [
					{ text: `关注`, icon: `` },
					{ text: `推荐`, icon: `` },
					{ text: `其他`, icon: `` }
				],
				tabs2Left: 0,
				tabs2Width: 0,
				tabs2ItemWidth: 0,
				tabs2Index: 0,
				tabs3Datas: [
					{ text: `关注`, icon: `` },
					{ text: `推荐`, icon: `` },
					{ text: `其他`, icon: `` }
				],
				tabs3Left: 0,
				tabs3Width: 0,
				tabs3ItemWidth: 0,
				tabs3Index: 0
			};
		},
		onShow() {
			this.setCurrentPage(this);
		
			    const app = getApp();
			  
			      
			      return false;
			   
		
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
			changeTabs(evt) {
				let { index } = evt.currentTarget.dataset;
				if (index == this.tabsIndex) return;
				this.setData({
					tabsIndex: index
				});
			},
			changeTabs1(evt) {
				let { index } = evt.currentTarget.dataset;
				if (index == this.tabs1Index) return;
				this.setData({
					tabs1Index: index
				});
			},
			changeTabs2(evt) {
				let { index } = evt.currentTarget.dataset;
				if (index == this.tabs2Index) return;
				this.setData({
					tabs2Index: index
				});
			},
			changeTabs3(evt) {
				let { index } = evt.currentTarget.dataset;
				if (index == this.tabs3Index) return;
				this.setData({
					tabs3Index: index
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
/* 全局生效 */
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

/* 页面背景 */
page {
  width: 100%;
  height: 100%;
  background: url('/static/bg.png') no-repeat center center;
  background-size: cover; /* 背景铺满 */
}

	.flex21-clz {
		padding-top: 10rpx;
		padding-left: 20rpx;
		padding-bottom: 10rpx;
		padding-right: 20rpx;
	}
	.image-clz {
		margin-left: 10rpx;
		flex-shrink: 0;
		width: calc(16.6666666667% - 10rpx - 10rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.flex11-clz {
		flex-shrink: 0;
		border-bottom-left-radius: 44rpx;
		overflow: hidden;
		width: 72% !important;
		border-top-left-radius: 44rpx;
		border-top-right-radius: 44rpx;
		border-bottom-right-radius: 44rpx;
		height: 88rpx !important;
	}
	.input-clz {
		flex-shrink: 0;
		width: 410rpx !important;
	}
	.u-input{
		margin-top:-5px;
		border:0px;
	}
	.u-border:after{
		border: 0px;
	}
	.u-form-item__body{
		padding:0px 0px !important;
	}
	.btn-clz {
		padding-top: 30rpx;
		color: #fff;
		padding-left: 30rpx;
		padding-bottom: 30rpx;
		background-position: center center;
		background-color: #ffff;
		flex-shrink: 0;
		background-repeat: no-repeat;
		width: 30rpx !important;
		background-image: url(/static/searchss.png);
		height: 30rpx !important;
		text-align: center;
		padding-right: 30rpx;
	}
	.image1-clz {
		flex-shrink: 0;
		width: 56rpx !important;
		height: 56rpx !important;
	}
	.tabs-item-title {
		color: #999999 !important;
		font-size: 16px !important;
	}

	.tabs-title {
	}
	.tabs-item-title.cur {
		color: #333333 !important;
	}
	.tabs1-item-title {
		color: #999999 !important;
	}

	.tabs1-title {
	}
	.tabs1-item-title.cur {
		color: #333333 !important;
	}
	.flex10-clz {
		margin-left: 10rpx;
		top: 0rpx;
		left: 0rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		margin-top: 10rpx;
		position: relative;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.avatar3-clz {
		margin-left: 0rpx;
		flex-shrink: 0;
		width: calc(16.6666666667% - 0rpx - 0rpx) !important;
		margin-top: 0rpx;
		margin-bottom: 0rpx;
		height: 88rpx !important;
		margin-right: 0rpx;
	}
	.text6-clz {
		margin-left: 10rpx;
		flex-shrink: 0;
		width: calc(20.8333333333% - 10rpx - 10rpx) !important;
		font-size: 32rpx !important;
		font-family: 黑体;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		height: 100rpx !important;
		text-align: center;
		margin-right: 10rpx;
	}
	.image11-clz {
		flex-shrink: 0;
		top: 0rpx;
		width: 48rpx !important;
		position: absolute;
		right: 0rpx;
		height: 48rpx !important;
	}
	.text7-clz {
		margin-left: 10rpx;
		padding-top: 0rpx;
		padding-left: 20rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		padding-bottom: 0rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
		padding-right: 20rpx;
	}
	.flex13-clz {
		border: 2rpx solid #eee;
		border-bottom-left-radius: 12rpx;
		background-size: cover;
		border-top-right-radius: 12rpx;
		margin-right: 10rpx;
		margin-left: 10rpx;
		flex-shrink: 0;
		background-repeat: no-repeat;
		overflow: hidden;
		width: calc(100% - 10rpx - 10rpx) !important;
		border-top-left-radius: 12rpx;
		margin-top: 10rpx;
		border-bottom-right-radius: 12rpx;
		background-image: url(/static/wx.png);
		margin-bottom: 10rpx;
		height: 420rpx;
	}
	.icon-clz {
		color: #ffffff;
	}
	.icon {
		font-size: 64rpx;
	}
	.text9-clz {
		color: #ffffff;
		bottom: 12rpx;
		position: absolute;
		right: 12rpx;
	}
	.tag3-clz {
		margin-left: 10rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.tabs2-item-title {
		color: #999999 !important;
	}

	.tabs2-title {
	}
	.tabs2-item-title.cur {
		color: #333333 !important;
	}
	.flex3-clz {
		margin-left: 10rpx;
		top: 0rpx;
		left: 0rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		margin-top: 10rpx;
		position: relative;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.avatar1-clz {
		margin-left: 10rpx;
		flex-shrink: 0;
		width: calc(16.6666666667% - 10rpx - 20rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		height: 88rpx !important;
		margin-right: 20rpx;
	}
	.avatar1-avatar {
		width: 44px;
		height: 44px;
	}
	.text2-clz {
		margin-left: 10rpx;
		flex-shrink: 0;
		width: calc(20.8333333333% - 10rpx - 10rpx) !important;
		font-size: 32rpx !important;
		font-family: 黑体;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		height: 100rpx !important;
		text-align: center;
		margin-right: 10rpx;
	}
	.image5-clz {
		flex-shrink: 0;
		top: 0rpx;
		width: 48rpx !important;
		position: absolute;
		right: 0rpx;
		height: 48rpx !important;
	}
	.text3-clz {
		margin-left: 10rpx;
		padding-top: 0rpx;
		padding-left: 20rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		padding-bottom: 0rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		text-align: left;
		margin-right: 10rpx;
		padding-right: 20rpx;
	}
	.flex4-clz {
		margin-left: 10rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.image6-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		flex: 1;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.image6-size {
		height: 160rpx !important;
		width: 100%;
	}
	.image7-clz {
		margin-left: 16rpx;
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		flex: 1;
		width: calc(100% - 16rpx - 16rpx) !important;
		border-top-left-radius: 20rpx;
		margin-top: 16rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
		margin-bottom: 16rpx;
		margin-right: 16rpx;
	}
	.image7-size {
		height: 160rpx !important;
		width: 100%;
	}
	.tag-clz {
		margin-left: 10rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.flex6-clz {
		margin-left: 10rpx;
		top: 0rpx;
		left: 0rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		margin-top: 10rpx;
		position: relative;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.avatar2-clz {
		margin-left: 10rpx;
		flex-shrink: 0;
		width: calc(16.6666666667% - 10rpx - 20rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		height: 88rpx !important;
		margin-right: 20rpx;
	}
	.avatar2-avatar {
		width: 44px;
		height: 44px;
	}
	.text4-clz {
		margin-left: 10rpx;
		flex-shrink: 0;
		width: calc(20.8333333333% - 10rpx - 10rpx) !important;
		font-size: 32rpx !important;
		font-family: 黑体;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		height: 100rpx !important;
		text-align: center;
		margin-right: 10rpx;
	}
	.image8-clz {
		flex-shrink: 0;
		top: 0rpx;
		width: 48rpx !important;
		position: absolute;
		right: 0rpx;
		height: 48rpx !important;
	}
	.text5-clz {
		padding-top: 0rpx;
		padding-left: 20rpx;
		padding-bottom: 0rpx;
		padding-right: 20rpx;
	}
	.image9-clz {
		margin-left: 16rpx;
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		flex: 1;
		width: calc(100% - 16rpx - 16rpx) !important;
		border-top-left-radius: 20rpx;
		margin-top: 16rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
		margin-bottom: 16rpx;
		margin-right: 16rpx;
	}
	.image9-size {
		height: 160rpx !important;
		width: 100%;
	}
	.image10-clz {
		margin-left: 16rpx;
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		flex: 1;
		width: calc(100% - 16rpx - 16rpx) !important;
		border-top-left-radius: 20rpx;
		margin-top: 16rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
		margin-bottom: 16rpx;
		margin-right: 16rpx;
	}
	.image10-size {
		height: 160rpx !important;
		width: 100%;
	}
	.tabs3-clz {
		text-align: left;
	}
	.tabs3-item-title {
		color: #999999 !important;
	}

	.tabs3-title {
	}
	.tabs3-item-title.cur {
		color: #333333 !important;
	}
	.flex1-clz {
		margin-left: 10rpx;
		top: 0rpx;
		left: 0rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		margin-top: 10rpx;
		position: relative;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.avatar-clz {
		margin-left: 10rpx;
		flex-shrink: 0;
		width: calc(16.6666666667% - 10rpx - 20rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		height: 88rpx !important;
		margin-right: 20rpx;
	}
	.avatar-avatar {
		width: 44px;
		height: 44px;
	}
	.text-clz {
		margin-left: 10rpx;
		flex-shrink: 0;
		width: calc(20.8333333333% - 10rpx - 10rpx) !important;
		font-size: 32rpx !important;
		font-family: 黑体;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		height: 100rpx !important;
		text-align: center;
		margin-right: 10rpx;
	}
	.image4-clz {
		flex-shrink: 0;
		top: 0rpx;
		width: 48rpx !important;
		position: absolute;
		right: 0rpx;
		height: 48rpx !important;
	}
	.text1-clz {
		margin-left: 10rpx;
		padding-top: 0rpx;
		padding-left: 20rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		padding-bottom: 0rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
		padding-right: 20rpx;
	}
	.flex-clz {
		margin-left: 10rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.image2-clz {
		margin-left: 16rpx;
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		flex: 1;
		width: calc(100% - 16rpx - 16rpx) !important;
		border-top-left-radius: 20rpx;
		margin-top: 16rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
		margin-bottom: 16rpx;
		margin-right: 16rpx;
	}
	.image2-size {
		height: 160rpx !important;
		width: 100%;
	}
	.image3-clz {
		margin-left: 16rpx;
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		flex: 1;
		width: calc(100% - 16rpx - 16rpx) !important;
		border-top-left-radius: 20rpx;
		margin-top: 16rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
		margin-bottom: 16rpx;
		margin-right: 16rpx;
	}
	.image3-size {
		height: 160rpx !important;
		width: 100%;
	}
	.tag1-clz {
		margin-left: 10rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	// .container331385 {
	// 	background-image: url(/static/bg.png);

	// 	padding-bottom: 80px;
	// }
</style>
