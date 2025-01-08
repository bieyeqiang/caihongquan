<template>
	<view class="container container331385">
		<view class="flex swipers diygw-col-24">
			<swiper @animationfinish="changeFinishSwipers" :current="swipersIndex" class="swiper" @change="changeSwipers" indicator-color="rgba(51, 51, 51, 0.39)" indicator-active-color="rgba(64, 64, 64, 0.93)" interval="3000" vertical="true" circular="true" style="height: 100vh">
				<swiper-item v-for="(item, index) in datas.rows" :key="index" class="diygw-swiper-item">
					<view class="diygw-swiper-item-wrap">
						<view class="flex diygw-col-24">
							<video ref="refVideo" :id="'video' + index" :controls="false" :show-center-play-btn="true" :show-play-btn="false" :show-fullscreen-btn="false" :src="item.src" style="width: 100%; height: 100vh" object-fit="contain" :title="item.title" poster=""></video>
						</view>
						<view class="flex flex-wrap diygw-col-24 flex-direction-column flex-clz">
							<text class="diygw-col-24 text-clz">
								{{ item.title }}
							</text>
							<text class="diygw-col-24">
								{{ item.remark }}
							</text>
						</view>
						<view class="flex flex-wrap diygw-col-0 flex-direction-column flex1-clz">
							<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex2-clz">
								<image :src="item.avatar" class="image8-size diygw-image diygw-col-0 image8-clz" mode="widthFix"></image>
							</view>
							<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex5-clz" @tap="navigateTo" data-type="tip" data-tip="触发收藏">
								<text class="flex icon3 diygw-col-0 diy-icon-star"></text>
								<text class="diygw-col-0">
									{{ item.star }}
								</text>
							</view>
							<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex3-clz" @tap="navigateTo" data-type="tip" data-tip="触发消息">
								<text class="flex icon1 diygw-col-0 diy-icon-message"></text>
								<text class="diygw-col-0">
									{{ item.comment }}
								</text>
							</view>
							<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex4-clz" @tap="navigateTo" data-type="tip" data-tip="触发分享">
								<text class="flex icon2 diygw-col-0 diy-icon-share"></text>
								<text class="diygw-col-0">
									{{ item.share }}
								</text>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
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
				datas: {
					code: 0,
					msg: '',
					rows: [
						{
							title: '',
							remark: '',
							share: '',
							comment: '',
							star: '',
							src: '',
							avatar: ''
						}
					]
				},
				showVideo: false,
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
			async init() {
				await this.datasApi();
			},
			// 获取视频接口 API请求方法
			async datasApi(param) {
				let thiz = this;
				param = param || {};

				//请求地址及请求数据，可以在加载前执行上面增加自己的代码逻辑
				let http_url = 'https://php.diygw.com/video.php';
				let http_data = {};
				let http_header = {};

				let datas = await this.$http.post(http_url, http_data, http_header, 'json');

				this.datas = datas;
				this.showVideo = true;
				this.$nextTick(() => {
					this.playVideoFunction({});
				});
			},

			// 播放视频 自定义方法
			async playVideoFunction(param) {
				let thiz = this;
				let swipersIndex = this.swipersIndex;
				if (param.detail) {
					swipersIndex = param.detail.current;
				}
				let currentId = 'video' + swipersIndex; // 获取当前视频id
				this.videoContent = uni.createVideoContext(currentId, thiz).play();
				// 获取视频列表
				let rows = this.datas.rows;
				rows.forEach((item, index) => {
					// 获取json对象并遍历, 停止非当前视频
					if (item.src != null && item.src != '') {
						let temp = 'video' + index;
						if (temp != currentId) {
							// 暂停其余视频
							uni.createVideoContext(temp, thiz).pause(); //暂停视频播放事件
						}
					}
				});
			},
			changeFinishSwipers(evt) {
				this.navigateTo({ type: 'playVideoFunction' });
			},
			changeSwipers(evt) {
				let swipersIndex = evt.detail.current;
				this.setData({ swipersIndex });
			}
		}
	};
</script>

<style lang="scss" scoped>
	.flex-clz {
		padding-top: 20rpx;
		color: #ffffff;
		left: 0rpx;
		bottom: 0rpx;
		padding-left: 20rpx;
		padding-bottom: 20rpx;
		position: absolute;
		padding-right: 20rpx;
	}
	.text-clz {
		font-weight: bold;
		font-size: 28rpx !important;
	}
	.flex1-clz {
		padding-top: 20rpx;
		color: #ffffff;
		bottom: 200rpx;
		padding-left: 20rpx;
		padding-bottom: 20rpx;
		position: absolute;
		right: 0rpx;
		padding-right: 20rpx;
	}
	.flex2-clz {
		margin-left: 10rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.image8-clz {
		border-bottom-left-radius: 120rpx;
		overflow: hidden;
		border-top-left-radius: 120rpx;
		border-top-right-radius: 120rpx;
		border-bottom-right-radius: 120rpx;
	}
	.image8-size {
		height: 96rpx !important;
		width: 96rpx !important;
	}
	.flex5-clz {
		margin-left: 10rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.icon3 {
		font-size: 56rpx;
	}
	.flex3-clz {
		margin-left: 10rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.icon1 {
		font-size: 56rpx;
	}
	.flex4-clz {
		margin-left: 10rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.icon2 {
		font-size: 56rpx;
	}
	.container331385 {
		background-color: #000000;
	}
</style>
