<template>
	<view class="diy-selectdown">
		<view class="diy-selectdown__content" :class="direction" :style="[contentStyle, {
			transition: `opacity ${duration / 1000}s linear`,
			'--hover-color':activeColor,
			paddingLeft: menuPositionData.left+'px',
			height: active?contentHeight + 'px':'0px'
		}]" @tap="maskClick" @touchmove.stop.prevent>
			<view :style="{width:menuPositionData.width+'px'}">
				<view @tap.stop.prevent class="diy-selectdown__content__popup" :style="[popupStyle]">
					<block v-if="!$slots.default && !$slots.$default">
						<scroll-view scroll-y="true" :style="{
							height: $tools.addUnit(itemHeight*(showLength!=0?showLength:list.length))
						}">
							<view class="diy-dropdown-items">
								<view>
									<view class="diy-dropdown-item" hover-class="diy-dropdown-item-hover"
										hover-stay-time="150" @tap="cellClick(item[valueName])" :arrow="false"
										v-for="(item, index) in list" :key="index" :style="{
										
										color: selectValue == item[valueName] ? activeColor : inactiveColor
									}">
										{{item[labelName]}}
									</view>
								</view>
							</view>
						</scroll-view>
					</block>
					<slot v-else />
				</view>
			</view>
			<view v-if="isMask" class="diy-selectdown__content__mask"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'diy-selectdown',
		emits: ["open", "close", "change","update:modelValue"],
		props: {
			triggerId: {
				type: String,
				default: 'selectdownId'
			},
			modelValue: {
				type: Boolean,
				default: false
			},
			defaultValue: {
				type: [String, Number],
				default: ''
			},
			backgroundColor: {
				type: String,
				default: '#fff'
			},
			// 列数据
			list: {
				type: Array,
				default () {
					return [];
				}
			},
			// 自定义value属性名
			valueName: {
				type: String,
				default: 'value'
			},
			// 自定义label属性名
			labelName: {
				type: String,
				default: 'label'
			},
			// 菜单标题和选项的激活态颜色
			activeColor: {
				type: String,
				default: '#19be6b'
			},
			// 菜单标题和选项的未激活态颜色
			inactiveColor: {
				type: String,
				default: '#606266'
			},
			// 点击遮罩是否关闭菜单
			closeOnClickMask: {
				type: Boolean,
				default: true
			},
			// 是否遮罩
			isMask: {
				type: Boolean,
				default: false
			},
			// 点击当前激活项标题是否关闭菜单
			closeOnClickSelf: {
				type: Boolean,
				default: true
			},
			direction: {
				type: String,
				default: 'down'
			},
			// 过渡时间
			duration: {
				type: [Number, String],
				default: 300
			},
			// 标题菜单的高度，单位任意，数值默认为rpx单位
			itemHeight: {
				type: [Number, String],
				default: 76
			},
			// 如果默认显示0个时，显示全部 
			showLength: {
				type: Number,
				default: 0
			},
			// 下拉出来的内容部分的圆角值
			borderRadius: {
				type: [Number, String],
				default: 10
			},
			offsetTop:{
				type:Number,
				default:0
			}
		},
		watch: {
			modelValue: {
				immediate: true,
				handler(val) {
					if (val) {
						setTimeout(() => this.open(), 2);
					} else {
						setTimeout(() => this.close(), 2);
					}
				}
			},
		},
		data() {
			return {
				selectValue: this.defaultValue,
				showDropdown: true, // 是否打开下来菜单,
				active: false, // 下拉菜单的状态
				// 外层内容的样式，初始时处于底层，且透明
				contentStyle: {
					zIndex: -1,
					opacity: 0
				},
				// 让某个菜单保持高亮的状态
				highlightIndex: 99999,
				menuPositionData: {
					left: 0,
					width: 375,
					top: 0,
					height: 40
				},
				topheight: 40,
				contentHeight: 0
			}
		},
		computed: {
			// 下拉出来部分的样式
			popupStyle() {
				let style = {};
				// 进行Y轴位移，展开状态时，恢复原位。收齐状态时，往上位移100%，进行隐藏
				if (this.direction == 'up') {
					style.transform = `translateY(${this.active ? 0 : '100%'})`
					style.borderRadius =
						`${this.$tools.addUnit(this.borderRadius)} ${this.$tools.addUnit(this.borderRadius)} 0 0 `;
				} else {
					style.transform = `translateY(${this.active ? 0 : '-100%'})`
					style.borderRadius =
						`0 0 ${this.$tools.addUnit(this.borderRadius)} ${this.$tools.addUnit(this.borderRadius)}`;
				}
				style['backgroundColor'] = this.backgroundColor;
				style['transition-duration'] = this.duration / 1000 + 's';
				style.borderRadius = `0 0 ${this.$u.addUnit(this.borderRadius)} ${this.$u.addUnit(this.borderRadius)}`;
				return style;
			}
		},
		created() {
			// 引用所有子组件(diy-selectdown-item)的this，不能在data中声明变量，否则在微信小程序会造成循环引用而报错
			this.children = [];
		},
		methods: {
			init() {
				// 当某个子组件内容变化时，触发父组件的init，父组件再让每一个子组件重新初始化一遍
				// 以保证数据的正确性
				this.menuList = [];
				this.children.map(child => {
					child.init();
				})
			},
			cellClick(value) {
				this.selectValue = value
				// 通知父组件(diy-selectdown)收起菜单
				this.close();
				// 发出事件，抛出当前勾选项的value
				this.$emit("change", value);
			},
			// 点击菜单
			menuClick() {
				this.open();
			},
			getStatusBar() {
				let promise = new Promise((resolve, reject) => {
					uni.getSystemInfo({
						success: function(e) {
							let customBar
							// #ifdef H5
							customBar = e.statusBarHeight + e.windowTop;
							// #endif
							resolve(customBar)
						}
					})
				})
				return promise
			},
			getTopHeight() {
				let thiz = this
				return new Promise(function(resolve, reject) {
					const query = uni.createSelectorQuery().in(this);
					query.select('#' + thiz.triggerId).boundingClientRect(res => {
						if (res) {
							resolve(res)
						} else {
							resolve({
								left: 0,
								width: thiz.$u.sys().windowWidth,
								top: 0,
								height: 40
							})
						}
					}).exec();
				})
			},
			// 打开下拉菜单
			async open(index) {
				// 重置高亮索引，否则会造成多个菜单同时高亮
				// 展开时，设置下拉内容的样式
				this.contentStyle = {
					zIndex: 999999,
				}
				let res = await this.getTopHeight();
				this.menuPositionData = res;
				let topHeight = res.top + res.height;
				let statusBar = await this.getStatusBar()
				statusBar = statusBar || 0
				if (this.direction == 'up') {
					this.topheight = statusBar
				} else {
					this.topheight = statusBar + topHeight
				}
				this.getContentHeight();
				// 标记展开状态以及当前展开项的索引
				this.active = true;
			},
			// 设置下拉菜单处于收起状态
			close() {
				this.active = false;
				this.$emit("update:modelValue", false);
				// 下拉内容的样式进行调整，不透明度设置为0
				this.contentStyle = {
					zIndex: -1,
					opacity: 0
				}
			},
			// 点击遮罩
			maskClick() {
				// 如果不允许点击遮罩，直接返回
				if (!this.closeOnClickMask) return;
				this.close();
			},
			// 外部手动设置某个菜单高亮
			highlight(index = undefined) {
				this.highlightIndex = index !== undefined ? index : 99999;
			},
			// 获取下拉菜单内容的高度
			getContentHeight() {
				// 这里的原理为，因为dropdown组件是相对定位的，它的下拉出来的内容，必须给定一个高度
				// 才能让遮罩占满菜单一下，直到屏幕底部的高度
				// this.$u.sys()为uView封装的获取设备信息的方法
				let windowHeight = this.$u.sys().windowHeight;
				if (this.direction == 'up') {
					this.contentHeight = this.menuPositionData.top;
					let bottom = windowHeight - this.menuPositionData.top
					this.contentStyle.bottom = (this.topheight - this.offsetTop) + 'px'
				} else {
					this.contentHeight = windowHeight - this.menuPositionData.top;
					this.contentStyle.top = (this.topheight + this.offsetTop) + 'px'
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.diy-selectdown {

		&__content {
			--hover-color: #19be6b;
			position: fixed;
			z-index: 999999;
			width: 100%;
			left: 0px;
			bottom: 0;
			padding-top: 2px;
			overflow: hidden;

			&__mask {
				position: absolute;
				z-index: 9;
				background: rgba(0, 0, 0, .3);
				width: 100%;
				left: 0;
				top: 0;
				bottom: 0;
			}

			&__popup {
				box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
				position: relative;
				z-index: 10;
				transition: all 0.3s;
				transform: translateY(-100%);
				overflow: hidden;
			}

			&.up &__popup {
				position: absolute;
				bottom: 0;
				width: 100%;
				transform: translateY(100%);
			}
		}

		.diy-dropdown-item {
			display: flex;
			flex-direction: row;
			align-items: center;
			position: relative;
			box-sizing: border-box;
			width: 100%;
			padding: 20rpx;
			color: #606266;
			background-color: #fff;
			text-align: left;

			&-hover {
				color: var(--hover-color) !important
			}
		}
	}
</style>