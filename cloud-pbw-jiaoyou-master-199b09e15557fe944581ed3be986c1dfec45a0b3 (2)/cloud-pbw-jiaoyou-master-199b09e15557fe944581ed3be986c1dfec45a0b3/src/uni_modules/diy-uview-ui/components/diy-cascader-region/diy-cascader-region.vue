<template>
	<view class="u-select">
		<u-popup :blur="blur" :maskCloseAble="maskCloseAble" mode="bottom" :popup="false" v-model="popupValue"
			length="auto" :border-radius="borderRadius" :safeAreaInsetBottom="safeAreaInsetBottom" @close="close" :z-index="uZIndex">
			<view class="u-select" :style="{'--active-color':confirmColor}">
				<view class="u-select__header" v-if="!isAutoFinish||title" @touchmove.stop.prevent="">
					<view v-if="!isAutoFinish" class="u-select__header__cancel u-select__header__btn" :style="{ color: cancelColor }"
						hover-class="u-hover-class" :hover-stay-time="150" @tap="close">
						{{cancelText}}
					</view>
					<view class="u-select__header__title flex1 text-center">
						{{title}}
					</view>
					<view  v-if="!isAutoFinish" class="u-select__header__confirm u-select__header__btn"
						:style="{ color: moving ? cancelColor : confirmColor }" hover-class="u-hover-class"
						:hover-stay-time="150" @touchmove.stop="" @tap.stop="confirm">
						{{confirmText}}
					</view>
				</view>
				<view class="u-select__body">
					<view class="diy-cascader">
						<view class="diy-cascader__header">
							<view class="diy-cascader__tabs">
								<view v-for="(tab, index) in tabs" :key="index" class="diy-cascader__tab"
									:class="{ 'diy-cascader__tab--active': index === activeTab }"
									@tap="onClickTab(index)">
									<text class="diy-cascader__tab-text">{{ tab }}</text>
									<text v-if="index === activeTab" class="diy-cascader__tab-line"></text>
								</view>
							</view>
						</view>
						<swiper class="diy-cascader__content" :current="activeTab" @change="onSwiperChange">
							<swiper-item v-for="(list, tabIndex) in listList" :key="tabIndex"
								class="diy-cascader__swiper-item">
								<scroll-view scroll-y class="diy-cascader__scroll">
									<view class="diy-cascader__list">
										<view v-for="option in list" :key="option.value" class="diy-cascader__option"
											:class="{ 'diy-cascader__option--selected': isSelected(option, tabIndex) }"
											@tap="onSelect(option, tabIndex)">
											<text class="diy-cascader__option-text">{{ option[labelName] }}</text>
											<text v-if="isSelected(option, tabIndex)" class="diy-cascader__option-icon">
												<text class="diy-icon diy-icon-success"></text>
											</text>
										</view>
									</view>
								</scroll-view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import Emitter from "../../libs/util/emitter.js";
	import provinces from "../../libs/address/provinces.json";
	import citys from "../../libs/address/citys.json";
	import areas from "../../libs/address/areas.json";
	
	export default {
		mixins: [Emitter],
		emits: ["update:modelValue", "confirm", "change", "blur","finish","init"],
		props: {
			// 通过双向绑定控制组件的弹出与收起
			modelValue: {
				type: Boolean,
				default: false
			},
			// "取消"按钮的颜色
			cancelColor: {
				type: String,
				default: '#606266'
			},
			// "确定"按钮的颜色
			confirmColor: {
				type: String,
				default: '#19be6b'
			},
			// 弹出的z-index值
			zIndex: {
				type: [String, Number],
				default: 0
			},
			safeAreaInsetBottom: {
				type: Boolean,
				default: false
			},
			// 是否允许通过点击遮罩关闭Picker
			maskCloseAble: {
				type: Boolean,
				default: true
			},
			// 默认选中值
			defaultValue: {
				type: Array,
				default () {
					return [];
				}
			},
			// 自定义value属性名
			valueName: {
				type: String,
				default: 'code'
			},
			// 自定义label属性名
			labelName: {
				type: String,
				default: 'name'
			},
			// 自定义多列联动模式的children属性名
			childName: {
				type: String,
				default: 'children'
			},
			// 显示显示弹窗的圆角，单位rpx
			borderRadius: {
				type: [Number, String],
				default: 0
			},
			// 顶部标题
			title: {
				type: String,
				default: '请选择'
			},
			// 取消按钮的文字
			cancelText: {
				type: String,
				default: '取消'
			},
			// 确认按钮的文字
			confirmText: {
				type: String,
				default: '确认'
			},
			
			//提示选择
			placeholder: {
				type: String,
				default: '请选择'
			},
			// 遮罩的模糊度
			blur: {
				type: [Number, String],
				default: 0
			},
			//如果自动关闭弹窗没有确定或取消按钮
			isAutoFinish:{
				type: Boolean,
				default: false
			},
			//是否允许只选父
			selectParent: {
				type: Boolean,
				default: true
			},
			allPlaceholder: {
				type: String,
				default: '请选择完整路径'
			}
		},
		data() {
			return {
				isFinish: false,
				activeTab: 0,
				selectedList: [],
				list:[],
				listList: [],
				tabs: [],
				popupValue: false,
				// 列是否还在滑动中，微信小程序如果在滑动中就点确定，结果可能不准确
				moving: false,
				uForm: {
					inputAlign: "",
					clearable: ""
				}
			};
		},
		watch: {
			// 在select弹起的时候，重新初始化所有数据
			defaultValue: {
				immediate: true,
				handler(val) {
					if (val) setTimeout(() => this.initSelection(), 10);
				}
			},
			modelValue: {
				immediate: true,
				handler(val) {
					if (val) setTimeout(() => this.initSelection(), 10);
					this.popupValue = val;
				}
			},
			// list: {
			// 	handler(val) {
			// 		this.initList()
			// 	},
			// 	immediate: true
			// }
		},
		mounted() {
			let parent = this.$u.$parent.call(this, 'u-form');
			if (parent) {
				Object.keys(this.uForm).map(key => {
					this.uForm[key] = parent[key];
				});
			}
			this.initList()
			this.initSelection()
			this.$emit('init',this.selectedList)
		},
		computed: {
			uZIndex() {
				// 如果用户有传递z-index值，优先使用
				return this.zIndex ? this.zIndex : this.$u.zIndex.popup;
			},
		},
		methods: {
			initSelection() {
				//如果不为0表示已经选择过
				if (this.selectedList.length != 0) {
					return;
				}
				if (!this.defaultValue || !this.defaultValue.length) {
					this.selectedList = []
					return
				}

				let currentList = this.list
				const selected = []

				for (const value of this.defaultValue) {
					const option = currentList.find(item => item[this.valueName] === value)
					if (option) {
						selected.push(option)
						currentList = option.children || []
					}
				}

				this.selectedList = selected
				this.updateTabs()
				this.updateListList()
			},
			initList() {
				let initRegions = JSON.parse(JSON.stringify(provinces))
				initRegions.forEach((item, provinceIndex) => {
					let childrenCitys = citys[provinceIndex]
					childrenCitys.forEach((city, cityIndex) => {
						city.children = areas[provinceIndex][cityIndex]
					})
					item.children = childrenCitys
				})
				this.list = initRegions;
				this.listList = [initRegions] 
			},
			updateTabs() {
				const tabs = []
				let index = 0

				this.selectedList.forEach(option => {
					tabs.push(option[this.labelName])
					index++
				})

				if ((index === 0 || this.selectedList[index - 1]?.children?.length)) {
					tabs.push('请选择')
				}

				this.tabs = tabs
			},
			updateListList() {
				this.listList = [this.list]

				this.selectedList.forEach((option, index) => {
					if (option.children) {
						this.listList[index + 1] = option.children
					}
				})
			},
			isSelected(option, tabIndex) {
				if (!this.selectedList[tabIndex]) {
					return false
				}
				return this.selectedList[tabIndex][this.valueName] === option[this.valueName]
			},
			onSelect(option, tabIndex) {
				this.selectedList = this.selectedList.slice(0, tabIndex)
				this.selectedList.push(option)

				this.updateTabs()
				this.updateListList()

				if (!option.children || option.children.length == 0) {
					this.isFinish = true;
					this.$emit('finish', {
						value: this.selectedList.map(opt => opt[this.valueName]),
						tabIndex,
						selectedList: [...this.selectedList]
					})
					//如果是自动关闭，点击到结尾后自动关闭
					if(this.isAutoFinish){
						this.confirm()
					}
				} else {
					this.isFinish = false;
					this.activeTab = tabIndex + 1
				}
				this.$emit('change', this.selectedList)
				// this.$emit('input', this.selectedList.map(opt => opt[this.valueName]))
				// this.$emit('change', {
				// 	value: this.selectedList.map(opt => opt[this.valueName]),
				// 	tabIndex,
				// 	selectedList: [...this.selectedList]
				// })
			},
			onClickTab(index) {
				this.activeTab = index
			},
			onSwiperChange(e) {
				this.activeTab = e.detail.current
			},
			//点击取消按钮触发
			close() {
				this.$emit("update:modelValue", false);
			},
			//提交触发
			confirm() {
				//判断是否必须整条路径
				if (!this.isFinish && !this.selectParent) {
					uni.showToast({
						title: this.allPlaceholder,
						icon: 'none'
					})
					return;
				}
				this.$emit("update:modelValue", false);
				this.$emit('confirm', this.selectedList)
				// 将当前的值发送到 u-form-item 进行校验
				this.dispatch("u-form-item", "onFieldChange", this.selectedList.map(opt => opt[this.valueName]));
			}
		}
	};
</script>

<style scoped lang="scss">
	@import "../../libs/css/style.components.scss";

	.u-select {

		&__action {
			position: relative;
			line-height: $u-form-item-height;
			height: $u-form-item-height;

			&__icon {
				position: absolute;
				right: 20rpx;
				top: 50%;
				transition: transform .4s;
				transform: translateY(-50%);
				z-index: 1;

				&--reverse {
					transform: rotate(-180deg) translateY(50%);
				}
			}
		}

		&__hader {
			&__title {
				color: $u-content-color;
			}
		}

		&--border {
			border-radius: 6rpx;
			border-radius: 4px;
			border: 1px solid $u-form-item-border-color;
		}

		&__header {
			@include vue-flex;
			align-items: center;
			justify-content: space-between;
			height: 80rpx;
			padding: 0 40rpx;
		}

		&__body {
			width: 100%;
			height: 650rpx;
			overflow: hidden;
			background-color: #fff;
			padding: 0 30rpx;

		 
			.diy-cascader {
				background-color: #fff;
				height: 100%;

				&__tabs {
					display: flex;
					position: relative;
					border-bottom: 2rpx solid #ebedf0;
				}

				&__tab {
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 0 12rpx;
					position: relative;
					color: #969799;
					font-size: 28rpx;
					line-height: 80rpx;

					&--active {
						color: var(--active-color, #1989fa);
						font-weight: 500;
					}
				}

				&__tab-text {
					position: relative;
					display: inline-block;
					word-break: keep-all;
				}

				&__tab-line {
					position: absolute;
					bottom: -2rpx;
					left: 50%;
					width: 64rpx;
					height: 6rpx;
					background-color: var(--active-color, #1989fa);
					border-radius: 6rpx;
					transform: translateX(-50%);
				}

				&__content {
					height: 550rpx;
				}

				&__scroll {
					height: 550rpx;
				}

				&__option {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 24rpx 0;
					color: #323233;
					font-size: 28rpx;
					line-height: 40rpx;

					&--selected {
						color: var(--active-color, #1989fa);
						font-weight: 500;
					}
				}

				&__option-text {
					flex: 1;
				}

				&__option-icon {
					color: var(--active-color, #1989fa);
					font-size: 32rpx;
					margin-left: 8rpx;
				}
			}

			.diy-icon-success::before {
				content: "✓";
			}
		}
	}
</style>