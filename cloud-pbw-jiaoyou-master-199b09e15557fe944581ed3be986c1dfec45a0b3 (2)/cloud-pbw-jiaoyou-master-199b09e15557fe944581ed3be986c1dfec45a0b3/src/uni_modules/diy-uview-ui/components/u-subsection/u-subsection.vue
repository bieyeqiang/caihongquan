<template>
	<view class="u-subsection" :style="[subsectionStyle]">
		<view class="u-item u-line-1" :style="[itemStyle(index)]" @tap="click(index)"
			:class="[noBorderRight(index), 'u-item-' + index]" v-for="(item, index) in listInfo" :key="index">
			<view :style="[textStyle(index)]" class="u-item-text u-line-1">
				<block v-if="!$slots.default && !$slots.$default">
					{{ item[labelField] }}
				</block>
				<slot :item="item" :index="index" :checked="currentIndex==index" v-else />
			</view>
			<u-badge v-if="item.num > 0" :count="item.num" :offset="offset" size="mini"></u-badge>
		</view>
		<view class="u-item-bg" :style="[itemBarStyle]">
			<view v-if="buttonSpace" class="u-item-bg-active" :style="[itemBarButtonStyle]">
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * subsection 分段器
	 * @description 该分段器一般用于用户从几个选项中选择某一个的场景
	 * @tutorial https://www.uviewui.com/components/subsection.html
	 * @property {Array} list 选项的数组，形式见上方"基本使用"
	 * @property {String Number} current 初始化时默认选中的选项索引值（默认0）
	 * @property {String} active-color 激活时的颜色，mode为subsection时固定为白色（默认#303133）
	 * @property {String} inactive-color 未激活时字体的颜色，mode为subsection时无效（默认#606266）
	 * @property {String} mode 模式选择，见官网"模式选择"说明（默认button）
	 * @property {String Number} font-size 字体大小，单位rpx（默认28）
	 * @property {String Number} height 组件高度，单位rpx（默认70）
	 * @property {Boolean} animation 是否开启动画效果，见上方说明（默认true）
	 * @property {Boolean} bold 激活选项的字体是否加粗（默认true）
	 * @property {String} bg-color 组件背景颜色，mode为button时有效（默认#eeeeef）
	 * @property {String} button-color 按钮背景颜色，mode为button时有效（默认#ffffff）
	 * @event {Function} change 分段器选项发生改变时触发
	 * @example <u-subsection active-color="#ff9900"></u-subsection>
	 */
	export default {
		name: "u-subsection",
		emits: ["change"],
		props: {
			// tab的数据
			list: {
				type: Array,
				default () {
					return [];
				}
			},
			// 当前活动的tab的index
			current: {
				type: [Number, String],
				default: 0
			},
			labelField: {
				type: String,
				default: "name"
			},
			// 激活的颜色
			activeColor: {
				type: String,
				default: '#303133'
			},
			// 未激活的颜色
			inactiveColor: {
				type: String,
				default: '#606266'
			},
			// 模式选择，mode=button为按钮形式，mode=subsection时为分段模式
			mode: {
				type: String,
				default: 'button'
			},
			// 字体大小，单位rpx
			fontSize: {
				type: [Number, String],
				default: 28
			},
			// 是否开启动画效果
			animation: {
				type: Boolean,
				default: true
			},
			// 组件的高度，单位rpx
			height: {
				type: [Number, String],
				default: 70
			},
			// 激活tab的字体是否加粗
			bold: {
				type: Boolean,
				default: true
			},
			// 组件背景颜色
			bgColor: {
				type: String,
				default: '#eeeeef'
			},
			// 按钮间间隔，如果大于0，按钮间变成空隙，整体组件背景颜色会分在按钮上
			buttonSpace: {
				type: Number,
				default: 0
			},
			// 滑块背景颜色
			buttonColor: {
				type: String,
				default: '#ffffff'
			},
			inactiveButtonColor: {
				type: String,
				default: '#ffffff'
			},
			borderColor: {
				type: String,
				default: '#ddd'
			},
			// 在切换分段器的时候，是否让设备震一下
			vibrateShort: {
				type: Boolean,
				default: false
			},
			isRadius: {
				type: Boolean,
				default: true
			},
			borderRadius: {
				type: String,
				default: '8rpx'
			},
			offset: {
				type: Array,
				default: function() {
					return [0, 0]
				}
			},
		},
		data() {
			return {
				itemBgStyle: {
					width: 0,
					left: 0,
					backgroundColor: '#ffffff',
					height: '100%',
					transition: ''
				},
				currentIndex: this.current,
				buttonPadding: 3, // mode = button 时，组件的内边距
				//borderRadius: 5, // 圆角值
				firstTimeVibrateShort: true // 组件初始化时，会触发current变化，此时不应震动
			};
		},
		watch: {
			current: {
				immediate: true,
				handler(nVal) {
					this.currentIndex = nVal;
					this.changeSectionStatus(nVal);
				}
			}
		},
		computed: {
			listInfo() {
				let {
					list = []
				} = this;
				return this.list.map((val, index) => {
					if (typeof val != 'object') {
						let obj = {
							width: 0,
							name: val,
						};
						return obj;
					} else {
						val.width = 0;
						return val;
					}
				});
			},
			// 设置mode=subsection时，滑块特有的样式
			noBorderRight() {
				return index => {
					if (this.mode != 'subsection') return;
					let classs = '';
					// 不显示右边的边框
					if (index < this.list.length - 1) classs += ' u-none-border-right';
					// 显示整个组件的左右边圆角
					if (index == 0) classs += ' u-item-first';
					if (index == this.list.length - 1) classs += ' u-item-last';
					return classs;
				};
			},
			// 文字的样式
			textStyle() {
				return index => {
					let style = {};
					// 设置字体颜色
					if (this.mode == 'subsection') {
						if (index == this.currentIndex) {
							style.color = this.activeColor;
						} else {
							style.color = this.inactiveColor;
						}
					} else {
						if (index == this.currentIndex) {
							style.color = this.activeColor;
						} else {
							style.backgroundColor = this.bgColor;
							style.color = this.inactiveColor;
						}
						style.borderRadius = this.borderRadius;
					}
					// 字体加粗
					if (index == this.currentIndex && this.bold) style.fontWeight = 'bold';
					// 文字大小
					style.fontSize = this.fontSize + 'rpx';
					return style;
				};
			},
			// 每个分段器item的样式
			itemStyle() {
				return index => {
					let style = {};
					if (this.mode == 'subsection') {
						style.backgroundColor = this.bgColor;
						// 设置border的样式
						style.borderColor = this.borderColor;
						style.borderWidth = '1px';
						style.borderStyle = 'solid';
					}
					if (this.buttonSpace) {
						style.padding = this.buttonSpace + 'px'
					}
					return style;
				};
			},
			// mode=button时，外层view的样式
			subsectionStyle() {
				let style = {};
				style.height = uni.upx2px(this.height) + 'px';
				// style.borderRadius = this.borderRadius;
				if (!this.buttonSpace) {
					style.backgroundColor = this.bgColor;
				}
				if (this.mode == 'button') {
					style.padding = `${this.buttonPadding}px`;
				}
				if (this.isRadius) {
					style['--border-radius'] = this.borderRadius
				} else {
					style['--border-radius'] = '0px'
				}
				return style;
			},
			// 滑块的样式
			itemBarStyle() {
				let style = {};
				// style.backgroundColor = this.activeColor;
				style.zIndex = 1;

				if (this.mode == 'button') {
					style.borderRadius = this.borderRadius;
					style.bottom = `${this.buttonPadding}px`;
					style.height = uni.upx2px(this.height) - this.buttonPadding * 2 + 'px';
					style.zIndex = 0;
				}
				if (this.buttonSpace) {
					style.padding = this.buttonSpace + 'px'
					style.backgroundColor = 'initial'
				} else {
					style.backgroundColor = this.buttonColor;
				}
				return Object.assign(this.itemBgStyle, style);
			},
			// 滑块的样式
			itemBarButtonStyle() {
				let style = {};
				// style.backgroundColor = this.activeColor;
				style.zIndex = 1;
				style.borderRadius = this.borderRadius;
				style.backgroundColor = this.buttonColor;
				return style;
			}
		},
		mounted() {
			setTimeout(() => {
				this.getTabsInfo();
			}, 10);
		},
		methods: {
			// 改变滑块的样式
			changeSectionStatus(nVal) {
				if (this.mode == 'subsection') {
					// 根据滑块在最左边和最右边时，显示左边和右边的圆角
					if (nVal == this.list.length - 1) {
						this.itemBgStyle.borderRadius = `0 ${this.borderRadius} ${this.borderRadius} 0`;
					}
					if (nVal == 0) {
						this.itemBgStyle.borderRadius = `${this.borderRadius} 0 0 ${this.borderRadius}`;
					}
					if (nVal > 0 && nVal < this.list.length - 1) {
						this.itemBgStyle.borderRadius = '0';
					}
				}
				// 更新滑块的位置
				setTimeout(() => {
					this.itemBgLeft();
				}, 10);
				if (this.vibrateShort && !this.firstTimeVibrateShort) {
					// 使手机产生短促震动，微信小程序有效，APP(HX 2.6.8)和H5无效
					// #ifndef H5
					uni.vibrateShort();
					// #endif
				}
				// 第一次过后，设置firstTimeVibrateShort为false，让其下一次可以震动(如果允许震动的话)
				this.firstTimeVibrateShort = false;
			},
			click(index) {
				// 不允许点击当前激活选项
				if (index == this.currentIndex) return;
				this.currentIndex = index;
				this.changeSectionStatus(index);
				this.$emit('change', Number(index));
			},
			// 获取各个tab的节点信息
			getTabsInfo() {
				let view = uni.createSelectorQuery().in(this);
				for (let i = 0; i < this.list.length; i++) {
					view.select('.u-item-' + i).boundingClientRect();
				}
				view.exec(res => {
					if (!res.length) {
						setTimeout(() => {
							this.getTabsInfo();
							return;
						}, 10);
					}
					// 将分段器每个item的宽度，放入listInfo数组
					res.map((val, index) => {
						this.listInfo[index].width = val.width;
					});
					// 初始化滑块的宽度
					if (this.mode == 'subsection') {
						this.itemBgStyle.width = (this.listInfo[0].width - 1) + 'px';
					} else if (this.mode == 'button') {
						this.itemBgStyle.width = this.listInfo[0].width + 'px';
					}
					// 初始化滑块的位置
					this.itemBgLeft();
				});
			},
			itemBgLeft() {
				// 根据是否开启动画效果，
				if (this.animation) {
					this.itemBgStyle.transition = 'all 0.35s';
				} else {
					this.itemBgStyle.transition = 'all 0s';
				}
				let left = 0;
				// 计算当前活跃item到组件左边的距离
				this.listInfo.map((val, index) => {
					if (index < this.currentIndex) left += val.width;
				});
				// 根据mode不同模式，计算滑块需要移动的距离
				if (this.mode == 'subsection') {
					this.itemBgStyle.left = (left + 1) + 'px';
					this.itemBgStyle.top = '1rpx';
					this.itemBgStyle.height = 'calc(100% - 4rpx)';
				} else if (this.mode == 'button') {
					this.itemBgStyle.left = left + this.buttonPadding + 'px';
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";

	.u-subsection {
		@include vue-flex;
		align-items: center;
		overflow: hidden;
		position: relative;

		--border-radius: 4px;
		border-radius: var(--border-radius);

		.u-item-first {
			border-top-left-radius: var(--border-radius);
			border-bottom-left-radius: var(--border-radius);
		}

		.u-item-last {
			border-top-right-radius: var(--border-radius);
			border-bottom-right-radius: var(--border-radius);
		}

	}

	.u-item {
		flex: 1;
		text-align: center;
		font-size: 26rpx;
		height: 100%;
		@include vue-flex;
		align-items: center;
		justify-content: center;
		color: $u-main-color;
		padding: 6rpx;
		position: relative;
	}

	.u-item-bg {
		background-color: $u-type-primary;
		position: absolute;
		z-index: -1;

		.u-item-bg-active {
			width: 100%;
			height: 100%;
		}
	}

	.u-none-border-right {
		border-right: none !important;
	}


	.u-item-text {
		transition: all 0.35s;
		color: $u-main-color;
		@include vue-flex;
		align-items: center;
		position: relative;
		width: 100%;
		height: 100%;
		text-align: center;
		justify-content: center;
		z-index: 3;
	}
</style>