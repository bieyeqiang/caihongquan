<template>
	<view class="container container331385">
		<view class="head">
			<view class="back"></view>
			<view class="title"></view>
			<view class="icon" ></view>
		</view>
		<view class="flex tabs diygw-col-24 flex-direction-column tab_content">
			<view class="diygw-tabs text-center solid-bottom justify-around tabs-title">
				<view class="diygw-tab-item tabs-item-title" :class="index == tabsIndex ? ' font-bold   cur text-green  ' : ''" v-for="(item, index) in tabsDatas" :key="index" @click="changeTabs" :data-index="index"> <text v-if="item.icon" :class="item.icon"></text> {{ item.text }} </view>
			</view>
			<scroll-view
			  :scroll-y="true"
			  class="block-main block-two-level block-pad"
			  @scrolltolower="scrollBottom">
				<view v-if="tabsIndex == 0" class="flex-sub">
					<view class="flex flex-wrap diygw-col-24 flex-direction-column flex177-clz" v-for="(item,index) in dataList" :key="index">
						<view class="flex flex-wrap diygw-col-24 flex-direction-column">
							<view class="flex flex-wrap diygw-col-24 items-center flex1-clz">
								<text class="diygw-col-12 text-clz"> {{item.category_name}}</text>
								<view class="flex flex-wrap diygw-col-12 items-center">
									<text class="diygw-col-21 text1-clz"> 更多 </text>
									<text class="flex icon diygw-col-24 icon-clz diy-icon-right"></text>
								</view>
							</view>
							<view class="flex flex-wrap diygw-col-24 flex-direction-column" @click="jump(item.list[0].id)">
								<view class="flex flex-wrap diygw-col-24 flex-direction-column flex181-clz">
									<image :src="item.list[0].coverfiles" class="response diygw-col-24 image50-clz" mode="widthFix"></image>
									<view class="flex flex-wrap diygw-col-24 justify-around items-center flex182-clz">
										<text class="diygw-col-12"> 播放：{{item.list[0].view_num}} </text>
										<text class="diygw-col-10 text93-clz"> {{item.list[0].duration}} </text>
									</view>
								</view>
								<text class="diygw-col-24 text94-clz video_name"> {{item.list[0].video_name}} </text>
							</view>
							<view class="flex flex-wrap diygw-col-24 flex-direction-column" @click="jump(item.list[1].id)">
								<view class="flex flex-wrap diygw-col-24 justify-between items-center">
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex6-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex9-clz">
											<image :src="item.list[1].coverfiles" class="response diygw-col-24 image1-clz" mode="widthFix"></image>
											<view class="flex flex-wrap diygw-col-24 justify-around items-center flex165-clz">
												<text class="diygw-col-12"> 播放：{{item.list[1].view_num}} </text>
												<text class="diygw-col-10 text71-clz"> {{item.list[1].duration}} </text>
											</view>
										</view>
										<text class="diygw-col-24 text3-clz video_name"> {{item.list[1].video_name}} </text>
									</view>
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex8-clz" @click="jump(item.list[2].id)">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex10-clz">
											<image :src="item.list[2].coverfiles" class="response diygw-col-24 image2-clz" mode="widthFix"></image>
											<view class="flex flex-wrap diygw-col-24 justify-around items-center flex167-clz">
												<text class="diygw-col-12"> 播放：{{item.list[2].view_num}} </text>
												<text class="diygw-col-10 text75-clz"> {{item.list[2].duration}} </text>
											</view>
										</view>
										<text class="diygw-col-24 text4-clz video_name"> {{item.list[2].video_name}} </text>
									</view>
								</view>
								<view class="flex flex-wrap diygw-col-24 justify-between items-center" @click="jump(item.list[3].id)">
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex12-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex13-clz">
											<image :src="item.list[3].coverfiles" class="response diygw-col-24 image3-clz" mode="widthFix"></image>
											<view class="flex flex-wrap diygw-col-24 justify-around items-center flex14-clz">
												<text class="diygw-col-12"> 播放：{{item.list[3].view_num}} </text>
												<text class="diygw-col-10 text6-clz"> {{item.list[3].duration}}</text>
											</view>
										</view>
										<text class="diygw-col-24 text76-clz video_name"> {{item.list[3].video_name}} </text>
									</view>
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex15-clz" @click="jump(item.list[4].id)">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex168-clz">
											<image :src="item.list[4].coverfiles" class="response diygw-col-24 image4-clz" mode="widthFix"></image>
											<view class="flex flex-wrap diygw-col-24 justify-around items-center flex169-clz">
												<text class="diygw-col-12"> 播放：{{item.list[4].view_num}} </text>
												<text class="diygw-col-10 text78-clz"> {{item.list[4].duration}} </text>
											</view>
										</view>
										<text class="diygw-col-24 text79-clz video_name"> {{item.list[4].video_name}} </text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view v-if="tabsIndex == 1" class="flex-sub">
				<view class="flex flex-wrap diygw-col-24 flex-direction-column flex177-clz" v-for="(item,index) in dataList" :key="index">
					<view class="flex flex-wrap diygw-col-24 flex-direction-column">
						<view class="flex flex-wrap diygw-col-24 items-center flex1-clz">
							<text class="diygw-col-12 text-clz"> {{item.category_name}}</text>
							<view class="flex flex-wrap diygw-col-12 items-center">
								<text class="diygw-col-21 text1-clz"> 更多 </text>
								<text class="flex icon diygw-col-24 icon-clz diy-icon-right"></text>
							</view>
						</view>
						<view class="flex flex-wrap diygw-col-24 flex-direction-column" @click="jump(item.list[0].id)">
							<view class="flex flex-wrap diygw-col-24 flex-direction-column flex181-clz">
								<image :src="item.list[0].coverfiles" class="response diygw-col-24 image50-clz" mode="widthFix"></image>
								<view class="flex flex-wrap diygw-col-24 justify-around items-center flex182-clz">
									<text class="diygw-col-12"> 播放：{{item.list[0].view_num}} </text>
									<text class="diygw-col-10 text93-clz"> {{item.list[0].duration}} </text>
								</view>
							</view>
							<text class="diygw-col-24 text94-clz video_name"> {{item.list[0].video_name}} </text>
						</view>
						<view class="flex flex-wrap diygw-col-24 flex-direction-column" @click="jump(item.list[1].id)">
							<view class="flex flex-wrap diygw-col-24 justify-between items-center">
								<view class="flex flex-wrap diygw-col-24 flex-direction-column flex6-clz">
									<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex9-clz">
										<image :src="item.list[1].coverfiles" class="response diygw-col-24 image1-clz" mode="widthFix"></image>
										<view class="flex flex-wrap diygw-col-24 justify-around items-center flex165-clz">
											<text class="diygw-col-12"> 播放：{{item.list[1].view_num}} </text>
											<text class="diygw-col-10 text71-clz"> {{item.list[1].duration}} </text>
										</view>
									</view>
									<text class="diygw-col-24 text3-clz video_name"> {{item.list[1].video_name}} </text>
								</view>
								<view class="flex flex-wrap diygw-col-24 flex-direction-column flex8-clz" @click="jump(item.list[2].id)">
									<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex10-clz">
										<image :src="item.list[2].coverfiles" class="response diygw-col-24 image2-clz" mode="widthFix"></image>
										<view class="flex flex-wrap diygw-col-24 justify-around items-center flex167-clz">
											<text class="diygw-col-12"> 播放：{{item.list[2].view_num}} </text>
											<text class="diygw-col-10 text75-clz"> {{item.list[2].duration}} </text>
										</view>
									</view>
									<text class="diygw-col-24 text4-clz video_name"> {{item.list[2].video_name}} </text>
								</view>
							</view>
							<view class="flex flex-wrap diygw-col-24 justify-between items-center" @click="jump(item.list[3].id)">
								<view class="flex flex-wrap diygw-col-24 flex-direction-column flex12-clz">
									<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex13-clz">
										<image :src="item.list[3].coverfiles" class="response diygw-col-24 image3-clz" mode="widthFix"></image>
										<view class="flex flex-wrap diygw-col-24 justify-around items-center flex14-clz">
											<text class="diygw-col-12"> 播放：{{item.list[3].view_num}} </text>
											<text class="diygw-col-10 text6-clz"> {{item.list[3].duration}}</text>
										</view>
									</view>
									<text class="diygw-col-24 text76-clz video_name"> {{item.list[3].video_name}} </text>
								</view>
								<view class="flex flex-wrap diygw-col-24 flex-direction-column flex15-clz" @click="jump(item.list[4].id)">
									<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex168-clz">
										<image :src="item.list[4].coverfiles" class="response diygw-col-24 image4-clz" mode="widthFix"></image>
										<view class="flex flex-wrap diygw-col-24 justify-around items-center flex169-clz">
											<text class="diygw-col-12"> 播放：{{item.list[4].view_num}} </text>
											<text class="diygw-col-10 text78-clz"> {{item.list[4].duration}} </text>
										</view>
									</view>
									<text class="diygw-col-24 text79-clz video_name"> {{item.list[4].video_name}} </text>
								</view>
							</view>
						</view>
					</view>
				</view>
				</view>
				<view v-if="tabsIndex == 2" class="flex-sub">
				<view class="flex flex-wrap diygw-col-24 flex-direction-column flex177-clz" v-for="(item,index) in dataList" :key="index">
					<view class="flex flex-wrap diygw-col-24 flex-direction-column">
						<view class="flex flex-wrap diygw-col-24 items-center flex1-clz">
							<text class="diygw-col-12 text-clz"> {{item.category_name}}</text>
							<view class="flex flex-wrap diygw-col-12 items-center">
								<text class="diygw-col-21 text1-clz"> 更多 </text>
								<text class="flex icon diygw-col-24 icon-clz diy-icon-right"></text>
							</view>
						</view>
						<view class="flex flex-wrap diygw-col-24 flex-direction-column" @click="jump(item.list[0].id)">
							<view class="flex flex-wrap diygw-col-24 flex-direction-column flex181-clz">
								<image :src="item.list[0].coverfiles" class="response diygw-col-24 image50-clz" mode="widthFix"></image>
								<view class="flex flex-wrap diygw-col-24 justify-around items-center flex182-clz">
									<text class="diygw-col-12"> 播放：{{item.list[0].view_num}} </text>
									<text class="diygw-col-10 text93-clz"> {{item.list[0].duration}} </text>
								</view>
							</view>
							<text class="diygw-col-24 text94-clz video_name"> {{item.list[0].video_name}} </text>
						</view>
						<view class="flex flex-wrap diygw-col-24 flex-direction-column" @click="jump(item.list[1].id)">
							<view class="flex flex-wrap diygw-col-24 justify-between items-center">
								<view class="flex flex-wrap diygw-col-24 flex-direction-column flex6-clz">
									<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex9-clz">
										<image :src="item.list[1].coverfiles" class="response diygw-col-24 image1-clz" mode="widthFix"></image>
										<view class="flex flex-wrap diygw-col-24 justify-around items-center flex165-clz">
											<text class="diygw-col-12"> 播放：{{item.list[1].view_num}} </text>
											<text class="diygw-col-10 text71-clz"> {{item.list[1].duration}} </text>
										</view>
									</view>
									<text class="diygw-col-24 text3-clz video_name"> {{item.list[1].video_name}} </text>
								</view>
								<view class="flex flex-wrap diygw-col-24 flex-direction-column flex8-clz" @click="jump(item.list[2].id)">
									<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex10-clz">
										<image :src="item.list[2].coverfiles" class="response diygw-col-24 image2-clz" mode="widthFix"></image>
										<view class="flex flex-wrap diygw-col-24 justify-around items-center flex167-clz">
											<text class="diygw-col-12"> 播放：{{item.list[2].view_num}} </text>
											<text class="diygw-col-10 text75-clz"> {{item.list[2].duration}} </text>
										</view>
									</view>
									<text class="diygw-col-24 text4-clz video_name"> {{item.list[2].video_name}} </text>
								</view>
							</view>
							<view class="flex flex-wrap diygw-col-24 justify-between items-center" @click="jump(item.list[3].id)">
								<view class="flex flex-wrap diygw-col-24 flex-direction-column flex12-clz">
									<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex13-clz">
										<image :src="item.list[3].coverfiles" class="response diygw-col-24 image3-clz" mode="widthFix"></image>
										<view class="flex flex-wrap diygw-col-24 justify-around items-center flex14-clz">
											<text class="diygw-col-12"> 播放：{{item.list[3].view_num}} </text>
											<text class="diygw-col-10 text6-clz"> {{item.list[3].duration}}</text>
										</view>
									</view>
									<text class="diygw-col-24 text76-clz video_name"> {{item.list[3].video_name}} </text>
								</view>
								<view class="flex flex-wrap diygw-col-24 flex-direction-column flex15-clz" @click="jump(item.list[4].id)">
									<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex168-clz">
										<image :src="item.list[4].coverfiles" class="response diygw-col-24 image4-clz" mode="widthFix"></image>
										<view class="flex flex-wrap diygw-col-24 justify-around items-center flex169-clz">
											<text class="diygw-col-12"> 播放：{{item.list[4].view_num}} </text>
											<text class="diygw-col-10 text78-clz"> {{item.list[4].duration}} </text>
										</view>
									</view>
									<text class="diygw-col-24 text79-clz video_name"> {{item.list[4].video_name}} </text>
								</view>
							</view>
						</view>
					</view>
				</view>
				</view>
				<view v-if="tabsIndex == 4" class="flex-sub">
					<view class="flex flex-wrap diygw-col-24 flex-direction-column flex177-clz" v-for="(item,index) in dataList" :key="index">
						<view class="flex flex-wrap diygw-col-24 flex-direction-column">
							<view class="flex flex-wrap diygw-col-24 items-center flex1-clz">
								<text class="diygw-col-12 text-clz"> {{item.category_name}}</text>
								<view class="flex flex-wrap diygw-col-12 items-center">
									<text class="diygw-col-21 text1-clz"> 更多 </text>
									<text class="flex icon diygw-col-24 icon-clz diy-icon-right"></text>
								</view>
							</view>
							<view class="flex flex-wrap diygw-col-24 flex-direction-column" @click="jump(item.list[0].id)">
								<view class="flex flex-wrap diygw-col-24 flex-direction-column flex181-clz">
									<image :src="item.list[0].coverfiles" class="response diygw-col-24 image50-clz" mode="widthFix"></image>
									<view class="flex flex-wrap diygw-col-24 justify-around items-center flex182-clz">
										<text class="diygw-col-12"> 播放：{{item.list[0].view_num}} </text>
										<text class="diygw-col-10 text93-clz"> {{item.list[0].duration}} </text>
									</view>
								</view>
								<text class="diygw-col-24 text94-clz video_name"> {{item.list[0].video_name}} </text>
							</view>
							<view class="flex flex-wrap diygw-col-24 flex-direction-column" @click="jump(item.list[1].id)">
								<view class="flex flex-wrap diygw-col-24 justify-between items-center">
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex6-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex9-clz">
											<image :src="item.list[1].coverfiles" class="response diygw-col-24 image1-clz" mode="widthFix"></image>
											<view class="flex flex-wrap diygw-col-24 justify-around items-center flex165-clz">
												<text class="diygw-col-12"> 播放：{{item.list[1].view_num}} </text>
												<text class="diygw-col-10 text71-clz"> {{item.list[1].duration}} </text>
											</view>
										</view>
										<text class="diygw-col-24 text3-clz video_name"> {{item.list[1].video_name}} </text>
									</view>
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex8-clz" @click="jump(item.list[2].id)">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex10-clz">
											<image :src="item.list[2].coverfiles" class="response diygw-col-24 image2-clz" mode="widthFix"></image>
											<view class="flex flex-wrap diygw-col-24 justify-around items-center flex167-clz">
												<text class="diygw-col-12"> 播放：{{item.list[2].view_num}} </text>
												<text class="diygw-col-10 text75-clz"> {{item.list[2].duration}} </text>
											</view>
										</view>
										<text class="diygw-col-24 text4-clz video_name"> {{item.list[2].video_name}} </text>
									</view>
								</view>
								<view class="flex flex-wrap diygw-col-24 justify-between items-center" @click="jump(item.list[3].id)">
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex12-clz">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex13-clz">
											<image :src="item.list[3].coverfiles" class="response diygw-col-24 image3-clz" mode="widthFix"></image>
											<view class="flex flex-wrap diygw-col-24 justify-around items-center flex14-clz">
												<text class="diygw-col-12"> 播放：{{item.list[3].view_num}} </text>
												<text class="diygw-col-10 text6-clz"> {{item.list[3].duration}}</text>
											</view>
										</view>
										<text class="diygw-col-24 text76-clz video_name"> {{item.list[3].video_name}} </text>
									</view>
									<view class="flex flex-wrap diygw-col-24 flex-direction-column flex15-clz" @click="jump(item.list[4].id)">
										<view class="flex flex-wrap diygw-col-24 flex-direction-column items-center flex168-clz">
											<image :src="item.list[4].coverfiles" class="response diygw-col-24 image4-clz" mode="widthFix"></image>
											<view class="flex flex-wrap diygw-col-24 justify-around items-center flex169-clz">
												<text class="diygw-col-12"> 播放：{{item.list[4].view_num}} </text>
												<text class="diygw-col-10 text78-clz"> {{item.list[4].duration}} </text>
											</view>
										</view>
										<text class="diygw-col-24 text79-clz video_name"> {{item.list[4].video_name}} </text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="clearfix"></view>
		
	</view>
</template>

<script>
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
				tabsDatas: [
					{ text: `推荐`, icon: ``,type:"recommend" },
					{ text: `热点`, icon: ``,type:"hotspot" },
					{ text: `最新`, icon: ``,type:"news" },
					{ text: `免费`, icon: ``,type:"free" },
					{ text: `VIP`, icon: ``,type:"vip" }
				],
				tabsLeft: 0,
				tabsWidth: 0,
				tabsItemWidth: 0,
				tabsIndex: 0,
				dataList:{},
				page:1,
				loading: false, // 是否正在加载
			};
		},
		onPageScroll(e) {
			const scrollTop = e.scrollTop;
			this.headerBackgroundStyle = this.headerBackgroundStyle || { background: 'none' };
			if (scrollTop <= 80) {
				const opacity = scrollTop / 100;
				const color = `rgba(22, 22, 30, ${opacity})`;
				this.headerBackgroundStyle.background = color;
				
			} else {
				this.headerBackgroundStyle.background = '#16161e';
			}
		},
		// 上拉触底事件
		onReachBottom() {
			console.log("123123");
				      
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
		mounted() {
		  this.loadData(); // 页面加载时加载第一页数据
		},
		methods: {
			scrollBottom(){
				if (!this.loading) {
				  this.page++;
				  this.loadData(); // 触发加载数据
				}
			},
			async init() {},
			changeTabs(evt) {
				let { index } = evt.currentTarget.dataset;
				if (index == this.tabsIndex) return;
				this.setData({
					tabsIndex: index
				});
				this.dataList = [];
				this.loadData();
			},
			jump(id){
				
				if(!id){
					this.showModal("视频id不能为空！", '提示', false);
				}
				uni.navigateTo({
					url:"./yingshi_detail?id="+id
				})
			},
		
			 // 加载数据的方法
			async loadData() {
			      this.loading = true;
			      const that = this;
				  var index = this.tabsIndex;
				  var type = this.tabsDatas[index].type;
				  console.log(type);
			      this.$nextTick(async () => {
			      		let token = uni.getStorageSync("token");
			      		console.log(token)
			      		//保存数据
			      		let param = {
			      			type:type,
			      			page:that.page
			      		};
			      		let header = {
			      			  'Content-Type': 'application/json',
			      			  'Authorization': `Bearer ${token}`
			      			  };
			      		let url = config.basePath+"api/Video/getVideoList";
			      		if (!url) {
			      			this.showToast('请先配置地址', 'none');
			      			return false;
			      		}
			      
			      		let res = await this.$http.post(url, param, header, 'json');
			           
			      		if (res.code == 1) {
			      			 
			      			 var dataList = res.data;
							 var old = that.dataList;
							const merged = {};
							for (let key in dataList) {
							  merged[key] = dataList[key];
							}
							for (let key in old) {
							  merged[key] = old[key];
							}
							 that.loading = false;
			      			 this.dataList = merged;
			      		} else {
			      			this.showModal(res.message, '提示', false);
			      		}
			      	
			      });
			     
			    },
			  // 上拉触底事件
			onReachBottom() {
			     
			},
		}
	};
</script>

<style lang="scss" scoped>
	.tabs .diygw-tab-item {
		height: 100rpx;
		line-height: 100rpx;
	}
	.tabs-item-title {
		color: #999999 !important;
		font-size: 16px !important;
	}
	.head{
		height:83rpx;
	}
	// .tab_content{
	// 	height:100%;
	// }
	.video_name{
		 // height:100rpx;
		 white-space: nowrap;        /* 不换行 */
		    overflow: hidden;           /* 超出部分隐藏 */
		    text-overflow: ellipsis;
	}
	.items{
		float: left;
		border:1px solid #000;
		width: 298rpx;
		height:222  rpx;
		margin-left:30rpx;
		margin-top:30rpx;
		border-radius:10rpx;
		font-size:26rpx;
				// display:block;
	}
	.block-main{
		height: 88.2vh;
	}
	.tabs-title {
	}
	.tabs-item-title.cur {
		color: #333333 !important;
	}
	.loading {
	  text-align: center;
	  padding: 10px;
	  color: #888;
	}
	.flex4-clz {
		padding-top: 0rpx;
		padding-left: 32rpx;
		padding-bottom: 0rpx;
		padding-right: 32rpx;
	}
	.flex1-clz {
		padding-top: 20rpx;
		padding-left: 0rpx;
		padding-bottom: 20rpx;
		padding-right: 0rpx;
	}
	.text-clz {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx !important;
	}
	.text1-clz {
		font-size: 28rpx !important;
		text-align: right;
	}
	.icon-clz {
		flex-shrink: 0;
		color: #666666;
		width: 40rpx !important;
		height: 40rpx !important;
	}
	.icon {
		font-size: 40rpx;
	}
	.flex7-clz {
		flex-shrink: 0;
		// width: 100% !important;
		// height: 384rpx !important;
	}
	.image-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.flex166-clz {
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
	.text73-clz {
		text-align: right;
	}
	.text2-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 16rpx;
		margin-bottom: 16rpx;
		margin-right: 0rpx;
	}
	.flex6-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex9-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image1-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.flex165-clz {
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
	.text71-clz {
		text-align: right;
	}
	.text3-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex8-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex10-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image2-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.flex167-clz {
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
	.text75-clz {
		text-align: right;
	}
	.text4-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex12-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex13-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image3-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.flex14-clz {
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
	.text6-clz {
		text-align: right;
	}
	.text76-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex15-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex168-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image4-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.flex169-clz {
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
	.text78-clz {
		text-align: right;
	}
	.text79-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex177-clz {
		padding-top: 0rpx;
		padding-left: 32rpx;
		padding-bottom: 0rpx;
		padding-right: 32rpx;
	}
	.flex178-clz {
		padding-top: 20rpx;
		padding-left: 0rpx;
		padding-bottom: 20rpx;
		padding-right: 0rpx;
	}
	.text90-clz {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx !important;
	}
	.text91-clz {
		font-size: 28rpx !important;
		text-align: right;
	}
	.icon10-clz {
		flex-shrink: 0;
		color: #666666;
		width: 40rpx !important;
		height: 40rpx !important;
	}
	.icon10 {
		font-size: 40rpx;
	}
	.flex181-clz {
		flex-shrink: 0;
		width: 100% !important;
		height: 384rpx !important;
	}
	.image50-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.flex182-clz {
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
	.text93-clz {
		text-align: right;
	}
	.text94-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 16rpx;
		margin-bottom: 16rpx;
		margin-right: 0rpx;
	}
	.flex185-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex186-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image51-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.flex187-clz {
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
	.text96-clz {
		text-align: right;
	}
	.text97-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex188-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex189-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image52-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.flex190-clz {
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
	.text99-clz {
		text-align: right;
	}
	.text100-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex192-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex193-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image53-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.flex194-clz {
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
	.text102-clz {
		text-align: right;
	}
	.text103-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex195-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex196-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image54-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.flex197-clz {
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
	.text105-clz {
		text-align: right;
	}
	.text106-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex18-clz {
		padding-top: 0rpx;
		padding-left: 32rpx;
		padding-bottom: 0rpx;
		padding-right: 32rpx;
	}
	.flex19-clz {
		padding-top: 20rpx;
		padding-left: 0rpx;
		padding-bottom: 20rpx;
		padding-right: 0rpx;
	}
	.text7-clz {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx !important;
	}
	.text8-clz {
		font-size: 28rpx !important;
		text-align: right;
	}
	.icon1-clz {
		flex-shrink: 0;
		color: #666666;
		width: 40rpx !important;
		height: 40rpx !important;
	}
	.icon1 {
		font-size: 40rpx;
	}
	.flex22-clz {
		flex-shrink: 0;
		width: 100% !important;
		height: 384rpx !important;
	}
	.image5-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.flex23-clz {
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
	.text10-clz {
		text-align: right;
	}
	.text11-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 16rpx;
		margin-bottom: 16rpx;
		margin-right: 0rpx;
	}
	.flex26-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex27-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image6-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.flex28-clz {
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
	.text13-clz {
		text-align: right;
	}
	.text80-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex29-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex30-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image7-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.flex31-clz {
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
	.text82-clz {
		text-align: right;
	}
	.text83-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex170-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex171-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image8-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.flex172-clz {
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
	.text85-clz {
		text-align: right;
	}
	.text86-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex173-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex174-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image9-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.flex175-clz {
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
	.text88-clz {
		text-align: right;
	}
	.text89-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex68-clz {
		padding-top: 20rpx;
		padding-left: 32rpx;
		padding-bottom: 20rpx;
		padding-right: 32rpx;
	}
	.text28-clz {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx !important;
	}
	.text29-clz {
		font-size: 28rpx !important;
		text-align: right;
	}
	.icon4-clz {
		flex-shrink: 0;
		color: #666666;
		width: 40rpx !important;
		height: 40rpx !important;
	}
	.icon4 {
		font-size: 40rpx;
	}
	.flex71-clz {
		flex-shrink: 0;
		padding-top: 10rpx;
		padding-left: 32rpx;
		width: 100% !important;
		padding-bottom: 10rpx;
		height: 384rpx !important;
		padding-right: 32rpx;
	}
	.image20-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text30-clz {
		margin-left: 32rpx;
		font-weight: bold;
		width: calc(100% - 32rpx - 32rpx) !important;
		font-size: 28rpx !important;
		margin-top: 16rpx;
		margin-bottom: 16rpx;
		margin-right: 32rpx;
	}
	.flex73-clz {
		margin-left: 32rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 32rpx;
	}
	.flex74-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex75-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image21-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text31-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex76-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex77-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image22-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text32-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex78-clz {
		margin-left: 32rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 32rpx;
	}
	.flex79-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex80-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image23-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text33-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex81-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex82-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image24-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text34-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex84-clz {
		padding-top: 20rpx;
		padding-left: 32rpx;
		padding-bottom: 20rpx;
		padding-right: 32rpx;
	}
	.text35-clz {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx !important;
	}
	.text36-clz {
		font-size: 28rpx !important;
		text-align: right;
	}
	.icon5-clz {
		flex-shrink: 0;
		color: #666666;
		width: 40rpx !important;
		height: 40rpx !important;
	}
	.icon5 {
		font-size: 40rpx;
	}
	.flex87-clz {
		flex-shrink: 0;
		padding-top: 10rpx;
		padding-left: 32rpx;
		width: 100% !important;
		padding-bottom: 10rpx;
		height: 384rpx !important;
		padding-right: 32rpx;
	}
	.image25-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text37-clz {
		margin-left: 32rpx;
		font-weight: bold;
		width: calc(100% - 32rpx - 32rpx) !important;
		font-size: 28rpx !important;
		margin-top: 16rpx;
		margin-bottom: 16rpx;
		margin-right: 32rpx;
	}
	.flex89-clz {
		margin-left: 32rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 32rpx;
	}
	.flex90-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex91-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image26-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text38-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex92-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex93-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image27-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text39-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex94-clz {
		margin-left: 32rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 32rpx;
	}
	.flex95-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex96-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image28-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text40-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex97-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex98-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image29-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text41-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex35-clz {
		padding-top: 20rpx;
		padding-left: 32rpx;
		padding-bottom: 20rpx;
		padding-right: 32rpx;
	}
	.text14-clz {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx !important;
	}
	.text15-clz {
		font-size: 28rpx !important;
		text-align: right;
	}
	.icon2-clz {
		flex-shrink: 0;
		color: #666666;
		width: 40rpx !important;
		height: 40rpx !important;
	}
	.icon2 {
		font-size: 40rpx;
	}
	.flex38-clz {
		flex-shrink: 0;
		padding-top: 10rpx;
		padding-left: 32rpx;
		width: 100% !important;
		padding-bottom: 10rpx;
		height: 384rpx !important;
		padding-right: 32rpx;
	}
	.image10-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text16-clz {
		margin-left: 32rpx;
		font-weight: bold;
		width: calc(100% - 32rpx - 32rpx) !important;
		font-size: 28rpx !important;
		margin-top: 16rpx;
		margin-bottom: 16rpx;
		margin-right: 32rpx;
	}
	.flex40-clz {
		margin-left: 32rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 32rpx;
	}
	.flex41-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex42-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image11-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text17-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex43-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex44-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image12-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text18-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex45-clz {
		margin-left: 32rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 32rpx;
	}
	.flex46-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex47-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image13-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text19-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex48-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex49-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image14-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text20-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex51-clz {
		padding-top: 20rpx;
		padding-left: 32rpx;
		padding-bottom: 20rpx;
		padding-right: 32rpx;
	}
	.text21-clz {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx !important;
	}
	.text22-clz {
		font-size: 28rpx !important;
		text-align: right;
	}
	.icon3-clz {
		flex-shrink: 0;
		color: #666666;
		width: 40rpx !important;
		height: 40rpx !important;
	}
	.icon3 {
		font-size: 40rpx;
	}
	.flex54-clz {
		flex-shrink: 0;
		padding-top: 10rpx;
		padding-left: 32rpx;
		width: 100% !important;
		padding-bottom: 10rpx;
		height: 384rpx !important;
		padding-right: 32rpx;
	}
	.image15-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text23-clz {
		margin-left: 32rpx;
		font-weight: bold;
		width: calc(100% - 32rpx - 32rpx) !important;
		font-size: 28rpx !important;
		margin-top: 16rpx;
		margin-bottom: 16rpx;
		margin-right: 32rpx;
	}
	.flex56-clz {
		margin-left: 32rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 32rpx;
	}
	.flex57-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex58-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image16-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text24-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex59-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex60-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image17-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text25-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex61-clz {
		margin-left: 32rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 32rpx;
	}
	.flex62-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex63-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image18-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text26-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex64-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex65-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image19-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text27-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex101-clz {
		padding-top: 20rpx;
		padding-left: 32rpx;
		padding-bottom: 20rpx;
		padding-right: 32rpx;
	}
	.text42-clz {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx !important;
	}
	.text43-clz {
		font-size: 28rpx !important;
		text-align: right;
	}
	.icon6-clz {
		flex-shrink: 0;
		color: #666666;
		width: 40rpx !important;
		height: 40rpx !important;
	}
	.icon6 {
		font-size: 40rpx;
	}
	.flex104-clz {
		flex-shrink: 0;
		padding-top: 10rpx;
		padding-left: 32rpx;
		width: 100% !important;
		padding-bottom: 10rpx;
		height: 384rpx !important;
		padding-right: 32rpx;
	}
	.image30-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text44-clz {
		margin-left: 32rpx;
		font-weight: bold;
		width: calc(100% - 32rpx - 32rpx) !important;
		font-size: 28rpx !important;
		margin-top: 16rpx;
		margin-bottom: 16rpx;
		margin-right: 32rpx;
	}
	.flex106-clz {
		margin-left: 32rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 32rpx;
	}
	.flex107-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex108-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image31-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text45-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex109-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex110-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image32-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text46-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex111-clz {
		margin-left: 32rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 32rpx;
	}
	.flex112-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex113-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image33-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text47-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex114-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex115-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image34-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text48-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex117-clz {
		padding-top: 20rpx;
		padding-left: 32rpx;
		padding-bottom: 20rpx;
		padding-right: 32rpx;
	}
	.text49-clz {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx !important;
	}
	.text50-clz {
		font-size: 28rpx !important;
		text-align: right;
	}
	.icon7-clz {
		flex-shrink: 0;
		color: #666666;
		width: 40rpx !important;
		height: 40rpx !important;
	}
	.icon7 {
		font-size: 40rpx;
	}
	.flex120-clz {
		flex-shrink: 0;
		padding-top: 10rpx;
		padding-left: 32rpx;
		width: 100% !important;
		padding-bottom: 10rpx;
		height: 384rpx !important;
		padding-right: 32rpx;
	}
	.image35-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text51-clz {
		margin-left: 32rpx;
		font-weight: bold;
		width: calc(100% - 32rpx - 32rpx) !important;
		font-size: 28rpx !important;
		margin-top: 16rpx;
		margin-bottom: 16rpx;
		margin-right: 32rpx;
	}
	.flex122-clz {
		margin-left: 32rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 32rpx;
	}
	.flex123-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex124-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image36-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text52-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex125-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex126-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image37-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text53-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex127-clz {
		margin-left: 32rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 32rpx;
	}
	.flex128-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex129-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image38-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text54-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex130-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex131-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image39-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text55-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex134-clz {
		padding-top: 20rpx;
		padding-left: 32rpx;
		padding-bottom: 20rpx;
		padding-right: 32rpx;
	}
	.text56-clz {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx !important;
	}
	.text57-clz {
		font-size: 28rpx !important;
		text-align: right;
	}
	.icon8-clz {
		flex-shrink: 0;
		color: #666666;
		width: 40rpx !important;
		height: 40rpx !important;
	}
	.icon8 {
		font-size: 40rpx;
	}
	.flex137-clz {
		flex-shrink: 0;
		padding-top: 10rpx;
		padding-left: 32rpx;
		width: 100% !important;
		padding-bottom: 10rpx;
		height: 384rpx !important;
		padding-right: 32rpx;
	}
	.image40-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text58-clz {
		margin-left: 32rpx;
		font-weight: bold;
		width: calc(100% - 32rpx - 32rpx) !important;
		font-size: 28rpx !important;
		margin-top: 16rpx;
		margin-bottom: 16rpx;
		margin-right: 32rpx;
	}
	.flex139-clz {
		margin-left: 32rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 32rpx;
	}
	.flex140-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex141-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image41-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text59-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex142-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex143-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image42-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text60-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex144-clz {
		margin-left: 32rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 32rpx;
	}
	.flex145-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex146-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image43-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text61-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex147-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex148-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image44-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text62-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex150-clz {
		padding-top: 20rpx;
		padding-left: 32rpx;
		padding-bottom: 20rpx;
		padding-right: 32rpx;
	}
	.text63-clz {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx !important;
	}
	.text64-clz {
		font-size: 28rpx !important;
		text-align: right;
	}
	.icon9-clz {
		flex-shrink: 0;
		color: #666666;
		width: 40rpx !important;
		height: 40rpx !important;
	}
	.icon9 {
		font-size: 40rpx;
	}
	.flex153-clz {
		flex-shrink: 0;
		padding-top: 10rpx;
		padding-left: 32rpx;
		width: 100% !important;
		padding-bottom: 10rpx;
		height: 384rpx !important;
		padding-right: 32rpx;
	}
	.image45-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text65-clz {
		margin-left: 32rpx;
		font-weight: bold;
		width: calc(100% - 32rpx - 32rpx) !important;
		font-size: 28rpx !important;
		margin-top: 16rpx;
		margin-bottom: 16rpx;
		margin-right: 32rpx;
	}
	.flex155-clz {
		margin-left: 32rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 32rpx;
	}
	.flex156-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex157-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image46-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text66-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex158-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex159-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image47-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text67-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex160-clz {
		margin-left: 32rpx;
		width: calc(100% - 32rpx - 32rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 32rpx;
	}
	.flex161-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex162-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image48-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text68-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.flex163-clz {
		flex-shrink: 0;
		width: 328rpx !important;
	}
	.flex164-clz {
		flex-shrink: 0;
		width: 328rpx !important;
		height: 184rpx !important;
	}
	.image49-clz {
		border-bottom-left-radius: 20rpx;
		overflow: hidden;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.text69-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(100% - 0rpx - 0rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.container331385 {
	}
	.item_title{
	 padding-left:30rpx;
	 padding-right:30rpx;
	}
</style>
