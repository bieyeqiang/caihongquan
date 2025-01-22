<template>
	<view class="u-select">
		<u-popup :blur="blur" :maskCloseAble="maskCloseAble" mode="bottom" :popup="false" v-model="popupValue"
			length="auto" :border-radius="borderRadius" :safeAreaInsetBottom="safeAreaInsetBottom" @close="close"
			:z-index="uZIndex">
			<view class="u-select">
				<view class="u-select__header" @touchmove.stop.prevent="">
					<view class="u-select__header__cancel u-select__header__btn" :style="{ color: cancelColor }"
						hover-class="u-hover-class" :hover-stay-time="150" @tap="close">
						{{cancelText}}
					</view>
					<view class="u-select__header__title">
						{{title}}
					</view>
					<view class="u-select__header__confirm u-select__header__btn"
						:style="{ color: moving ? cancelColor : confirmColor }" hover-class="u-hover-class"
						:hover-stay-time="150" @touchmove.stop="" @tap.stop="confirm">
						{{confirmText}}
					</view>
				</view>
				<view class="u-select__body">
					<diy-region ref="regionPicker"  :isColumnTitle="isColumnTitle"  :regions="initRegions" v-model="selectedRegions"
						:max-level="maxLevel" :column-titles="columnTitles" :selected-color="selectedColor"
						:selected-text-color="confirmColor" :value-name="valueName"
						:label-name="labelName"></diy-region>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	/**
	 * diy-region-picker
	 * @description 此选择器用于地区数据选择器，支持过滤
	 * @property {Array} list 列数据，数组形式，见官网说明
	 * @property {Boolean} v-model 布尔值变量，用于控制选择器的弹出与收起
	 * @property {Boolean} safe-area-inset-bottom 是否开启底部安全区适配(默认false)
	 * @property {String} cancel-color 取消按钮的颜色（默认#606266）
	 * @property {String} confirm-color 确认按钮的颜色(默认#19be6b)
	 * @property {String} confirm-text 确认按钮的文字
	 * @property {String} cancel-text 取消按钮的文字
	 * @property {String} default-value 提供的默认选中的下标，见官网说明
	 * @property {Boolean} mask-close-able 是否允许通过点击遮罩关闭Picker(默认true)
	 * @property {String Number} z-index 弹出时的z-index值(默认10075)
	 * @property {String} value-name 自定义list数据的value属性名 1.3.6
	 * @property {String} label-name 自定义list数据的label属性名 1.3.6
	 * @property {String} child-name 自定义list数据的children属性名，只对多列联动模式有效 1.3.7
	 * @event {Function} confirm 点击确定按钮，返回当前选择的值
	 * @example <diy-region-picker v-model="show" :list="list"></diy-region-picker>
	 */
	import Emitter from "../../libs/util/emitter.js";
	import provinces from "../../libs/address/provinces.json";
	import citys from "../../libs/address/citys.json";
	import areas from "../../libs/address/areas.json";

	export default {
		mixins: [Emitter],
		emits: ["update:modelValue", "input", "confirm","init"],
		props: {
			modelValue: {
				type: Boolean,
				default: false
			},
			// 显示显示弹窗的圆角，单位rpx
			borderRadius: {
				type: [Number, String],
				default: 0
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
			// 顶部标题
			title: {
				type: String,
				default: ''
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
			// 遮罩的模糊度
			blur: {
				type: [Number, String],
				default: 0
			},
			// 默认选中值
			regionsValue: {
				type: Array,
				default () {
					return [];
				}
			},
			maxLevel: {
				type: Number,
				default: 3
			},
			isColumnTitle:{
				type: Boolean,
				default: true
			},
			columnTitles: {
				type: String,
				default: '省份,城市,区县'
			},
			selectedColor: {
				type: String,
				default: '#ffffff'
			}
		},
		watch: {
			modelValue: {
				handler(val) {
					if (val) setTimeout(() => this.init(), 10);
					this.popupValue = val;
				},
				immediate: true
			},
			regionsValue: {
				handler(val) {
					if (val) setTimeout(() => this.initLabel(), 1);
				},
				immediate: true
			}
		},
		data() {
			return {
				initRegions: [],
				selectedRegions: [],
				popupValue: false,
				// 列是否还在滑动中，微信小程序如果在滑动中就点确定，结果可能不准确
				moving: false,
				uForm: {
					inputAlign: "",
					clearable: ""
				}
			};
		},
		mounted() {
			let parent = this.$u.$parent.call(this, 'u-form');
			if (parent) {
				Object.keys(this.uForm).map(key => {
					this.uForm[key] = parent[key];
				});
			}
			let initRegions = JSON.parse(JSON.stringify(provinces))
			initRegions.forEach((item, provinceIndex) => {
				let childrenCitys = citys[provinceIndex]
				childrenCitys.forEach((city, cityIndex) => {
					city.children = areas[provinceIndex][cityIndex]
				})
				item.children = childrenCitys
			})
			this.initRegions = initRegions
			this.initLabel()
		},
		computed: {
			uZIndex() {
				// 如果用户有传递z-index值，优先使用
				return this.zIndex ? this.zIndex : this.$u.zIndex.popup;
			},
		},
		methods: {
			init() {
				this.selectedRegions = [...this.regionsValue]
			},
			initLabel(){
				this.init()
				let names = this.getOptimizedSelectedRegionNames()
				this.$emit('init',names.join(" "))
			},
			getOptimizedSelectedRegionNames() {
				const result = new Set()
				console.log(JSON.stringify(this.selectedRegions))
				let selectedRegionsSet= new Set(this.selectedRegions)
				const traverse = (regions, parent = null) => {
					let allChildrenSelected = true
					let someChildrenSelected = false
			
					for (const region of regions) {
						if (region.children && region.children.length > 0) {
							const [childAllSelected, childSomeSelected] = traverse(region.children, region)
							allChildrenSelected = allChildrenSelected && childAllSelected
							someChildrenSelected = someChildrenSelected || childSomeSelected
						} else {
							const isSelected = selectedRegionsSet.has(region[this.valueName])
							allChildrenSelected = allChildrenSelected && isSelected
							someChildrenSelected = someChildrenSelected || isSelected
						}
			
						if (selectedRegionsSet.has(region[this.valueName])) {
							result.add(region[this.labelName])
						}
					}
					if (allChildrenSelected && parent) {
						console.log(JSON.stringify(result))
						//移除所有子地区代码
						for (const region of regions) {
							result.delete(region[this.labelName])
						}
						result.add(parent[this.labelName])
					}
					return [allChildrenSelected, someChildrenSelected]
				}
				traverse(this.initRegions)
				return Array.from(result)
			},
			//点击取消按钮触发
			close() {
				this.$emit('update:modelValue', false)
			},
			
			//提交触发
			confirm() {
				this.$emit('update:modelValue', false)
				let code = this.$refs.regionPicker.getOptimizedSelectedRegionCodes();
				code = code.concat(this.selectedRegions)
				this.$emit('confirm', {
					code: code,
					name: this.$refs.regionPicker.getOptimizedSelectedRegionNames().join(" "),
				})
				// 将当前的值发送到 u-form-item 进行校验
				this.dispatch("u-form-item", "onFieldChange", this.selectedRegions);
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
			background-color: #fff;
		}
	}
</style>