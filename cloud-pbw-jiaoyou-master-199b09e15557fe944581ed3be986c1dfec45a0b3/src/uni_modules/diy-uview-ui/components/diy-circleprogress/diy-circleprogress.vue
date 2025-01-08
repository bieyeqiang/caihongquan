<template>
	<view class="flex align-center diygw-col-24 justify-center">
		<view class="progress-circle " :class="'progress-'+innerPercent" :style="{
			'--not-progress-color':notProgressColor,
			'--bg-color':bgColor,
			'--color':color,
			'--progress-color':progressColor,
			'--width':$u.addUnit(width),
			'--font-size':$u.addUnit(fontSize),
			'--border-width':$u.addUnit(borderWidth)
		}">
			<view class="inner">
				 <view class="progress-number">
					 <block v-if="!$slots.default && !$slots.$default">
					 	{{innerPercent}}{{unit}}
					 </block>
					 <slot :percent="innerPercent" v-else />
				 </view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			width: {
				type: Number,
				default: 100
			},
			borderWidth: {
				type: Number,
				default: 20
			},
			bgColor: {
				type: String,
				default: '#fff'
			},
			notProgressColor: {
				type: String,
				default: '#ddd'
			},
			progressColor: {
				type: String,
				default: '#07c160'
			},
			color:{
				type: String,
				default: '#07c160'
			},
			fontSize:{
				type: Number,
				default: 24
			},
			unit:{
				type: String,
				default: '%'
			},
			/**
			 * 进度(0-100)
			 */
			percent: {
				type: Number,
				default: 0
			},
			/**
			 * 是否动画
			 */
			animate: {
				type: Boolean,
				default: true
			},
			/**
			 * 动画速率
			 */
			rate: {
				type: Number,
				default: 5
			}
		},
		computed: {
			/**
			 * @private
			 */
			complete() {
				return this.innerPercent == 100
			}
		},
		watch: {
			percent(percent) {
				this.setPercent()
			}
		},
		data() {
			return {
				innerPercent: 0,
				timeout: null
			}
		},
		mounted() {
			this.setPercent()
		},
		methods: {
			setPercent() {
				if (this.animate) {
					this.stepTo(true)
				} else {
					this.innerPercent = this.percent
				}
			},
			clearTimeout() {
				clearTimeout(this.timeout)
				Object.assign(this, {
					timeout: null
				})
			},
			stepTo(topFrame = false) {
				if (topFrame) {
					this.clearTimeout()
				}
				if (this.percent > this.innerPercent && !this.complete) {
					this.innerPercent=this.innerPercent+1
				}
				if (this.percent < this.innerPercent && this.innerPercent > 0) {
					this.innerPercent--
				}
				if (this.innerPercent !== this.percent) {
					this.timeout = setTimeout(() => {
						this.stepTo()
					}, this.rate)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.progress-circle {
		--progress-color:#63B8FF;
		--not-progress-color:#ddd;
		--bg-color:#fff;
		--width: 240rpx;
		--border-width: 10rpx;
		--color:#777;
		--font-size:1.5rem;
		
		$diythemeColor:var(--progress-color) ;
		$diybackColor: var(--not-progress-color) ;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: var(--width);
		height: var(--width);
		border-radius: 50%;
		transition: transform 1s;
		background-color: $diybackColor;
		padding:var(--border-width);
		
		.inner{
			width:100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 50%;
			z-index:1;
			background-color: var(--bg-color);
		}

		&:before {
			content: '';
			left:0;
			top:0;
			position: absolute;
			width: 100%;
			height: 100%;
			border-radius: 50%;
			background-color: $diythemeColor;
		}
		
		$step: 1;
		$loops: 99;
		$increment: 3.6;
		$half: 50;
		
		@for $i from 0 through $loops {
			&.progress-#{$i * $step}:before {
				@if $i < $half {
					$nextDeg: 90deg+($increment * $i);
					background-image: linear-gradient(90deg, $diybackColor 50%, transparent 50%, transparent), linear-gradient($nextDeg, $diythemeColor 50%, $diybackColor 50%, $diybackColor);
				}
				@else {
					$nextDeg: -90deg+($increment * ($i - $half));
					background-image: linear-gradient($nextDeg, $diythemeColor 50%, transparent 50%, transparent), linear-gradient(270deg, $diythemeColor 50%, $diybackColor 50%, $diybackColor);
				}
			}
		}
		
		.progress-number {
			width: 100%;
			line-height: 1;
			text-align: center;
			font-size: var(--font-size);
			color: var(--color);
		}
	}

</style>