<template>
	<view class="slider-range">
		<view class="slider-container" :style="{ height: `${containerHeight}px` }">
			<view class="slider-track" :style="{ 
          backgroundColor: inactiveColor,
          height: `${barHeight}px`,
          top: `${(Math.max(buttonSize, barHeight) - barHeight) / 2 + 4}px`
        }"></view>
			<view class="slider-fill" :style="{ 
          backgroundColor: activeColor, 
          left: `${leftPercentage}%`, 
          width: `${rangePercentage}%`,
          height: `${barHeight}px`,
          top: `${(Math.max(buttonSize, barHeight) - barHeight) / 2 + 4}px`
        }"></view>
			<view class="slider-handle-container left" :style="{ 
          left: `${leftPercentage}%`,
          top: `${(Math.max(buttonSize, barHeight) - buttonSize) / 2 + 4}px`
        }" @touchstart="startDrag('left')" @touchmove.stop.prevent="drag" @touchend="endDrag">
				<view class="slider-handle" :style="{ 
            backgroundColor: buttonColor,
            width: `${buttonSize}px`,
            height: `${buttonSize}px`
          }">
					<text v-if="valuePosition === 'inside'&&showValue" class="slider-value inside"
						:style="{ color: valueColor }">{{ formatValue(modelValue[0]) }}</text>
				</view>
				<text v-if="valuePosition === 'below'&&showValue" class="slider-value below"
					:style="{ color: valueColor }">{{ formatValue(modelValue[0]) }}</text>
			</view>
			<view class="slider-handle-container right" :style="{ 
          left: `${rightPercentage}%`,
          top: `${(Math.max(buttonSize, barHeight) - buttonSize) / 2 + 4}px`
        }" @touchstart="startDrag('right')" @touchmove.stop.prevent="drag" @touchend="endDrag">
				<view class="slider-handle" :style="{ 
            backgroundColor: buttonColor,
            width: `${buttonSize}px`,
            height: `${buttonSize}px`
          }">
					<text v-if="valuePosition === 'inside'&&showValue" class="slider-value inside"
						:style="{ color: valueColor }">{{ formatValue(modelValue[1]) }}</text>
				</view>
				<text v-if="valuePosition === 'below'&&showValue" class="slider-value below"
					:style="{ color: valueColor }">{{ formatValue(modelValue[1]) }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'diy-sliderrange',
		props: {
			//区间值
			modelValue: {
				type: Array,
				required: true,
				validator: (value) => value.length === 2 && value.every(v => typeof v === 'number')
			},
			//最小值
			min: {
				type: Number,
				default: 0
			},
			//最大值
			max: {
				type: Number,
				default: 100
			},
			//布长
			step: {
				type: Number,
				default: 1
			},
			//最小区间
			minRange: {
				type: Number,
				default: 0
			},
			//进度条非激活态颜色
			inactiveColor: {
				type: String,
				default: '#e0e0e0'
			},
			//进度条激活态颜色
			activeColor: {
				type: String,
				default: '#007aff'
			},
			//拖动滑块按钮颜色
			buttonColor: {
				type: String,
				default: '#ffffff'
			},
			//进度条高度
			barHeight: {
				type: Number,
				default: 2
			},
			//滑块按钮大小
			buttonSize: {
				type: Number,
				default: 32
			},
			valueColor: {
				type: String,
				default: '#333333'
			},
			//是否显示值
			showValue: {
				type: Boolean,
				default: true
			},
			valuePosition: {
				type: String,
				default: 'inside',
				validator: (value) => ['inside', 'below'].includes(value)
			}
		},
		emits: ['update:modelValue', 'change'],
		computed: {
			leftPercentage() {
				return ((this.modelValue[0] - this.min) / (this.max - this.min)) * 100
			},
			rightPercentage() {
				return ((this.modelValue[1] - this.min) / (this.max - this.min)) * 100
			},
			rangePercentage() {
				return this.rightPercentage - this.leftPercentage
			},
			containerHeight() {
				const baseHeight = Math.max(this.buttonSize, this.barHeight) + 8
				return this.valuePosition === 'below' ? baseHeight + 8 : baseHeight
			}
		},
		data() {
			return {
				isDragging: false,
				currentHandle: null,
				sliderWidth: 0,
				sliderLeft: 0
			}
		},
		mounted() {
			this.initSliderDimensions()
		},
		methods: {
			initSliderDimensions() {
				const query = uni.createSelectorQuery().in(this)
				query.select('.slider-container').boundingClientRect(data => {
					if (data) {
						this.sliderWidth = data.width
						this.sliderLeft = data.left
					}
				}).exec()
			},
			startDrag(handle) {
				this.isDragging = true
				this.currentHandle = handle
			},
			drag(event) {
				if (!this.isDragging) return

				const touch = event.touches[0]
				const x = touch.clientX - this.sliderLeft
				const percentage = Math.max(0, Math.min(100, (x / this.sliderWidth) * 100))
				const value = Math.round((percentage / 100) * (this.max - this.min) / this.step) * this.step + this.min

				let newValues = [...this.modelValue]
				if (this.currentHandle === 'left') {
					newValues[0] = Math.min(value, newValues[1] - this.minRange)
					newValues[0] = Math.max(this.min, newValues[0])
				} else {
					newValues[1] = Math.max(value, newValues[0] + this.minRange)
					newValues[1] = Math.min(this.max, newValues[1])
				}

				this.$emit('update:modelValue', newValues)
				this.$emit('change', newValues)
			},
			endDrag() {
				this.isDragging = false
				this.currentHandle = null
			},
			formatValue(value) {
				return value.toFixed(this.step < 1 ? 1 : 0)
			}
		}
	}
</script>

<style>
	.slider-range {
		width: 100%;
	}

	.slider-container {
		position: relative;
	}

	.slider-track {
		position: absolute;
		width: 100%;
		border-radius: 50rpx;
	}

	.slider-fill {
		position: absolute;
	}

	.slider-handle-container {
		position: absolute;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.slider-handle {
		border-radius: 50%;
		box-shadow:0 0 4px rgba(0, 0, 0, 0.2);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.slider-value {
		font-size: 12px;
	}

	.slider-value.below {
		margin-top: 4px;
	}
</style>