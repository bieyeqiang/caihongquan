<template>
	<view class="mi-toast" :class="[isShow ? 'u-show' : '', isShow ? 'animation' : '', 'u-position-' + config.position]" :style="{ zIndex: uZIndex }">
		<u-icon class="u-icon" v-if="config.icon" custom-prefix="custom-icon" :name="iconName" size="36" :color="iconColor"></u-icon>
		<text class="u-text">{{ config.title }}</text>
	</view>
</template>

<script>
/**
 * toast 消息提示
 * @description 此组件表现形式类似uni的uni.showToastAPI，但也有不同的地方。
 * @tutorial https://www.uviewui.com/components/toast.html
 * @property {String} z-index toast展示时的z-index值
 * @event {Function} show 显示toast，如需一进入页面就显示toast，请在onReady生命周期调用
 * @example <mi-toast ref="miToast" />
 */
export default {
	name: 'mi-toast',
	props: {
		// z-index值
		zIndex: {
			type: [Number, String],
			default: ''
		}
	},
	data() {
		return {
			isShow: false,
			timer: null, // 定时器
			config: {
				params: {}, // URL跳转的参数，对象
				title: '', // 显示文本
				type: '', // 主题类型，primary，success，error，warning，black
				duration: 1500, // 显示的时间，毫秒
				isTab: false, // 是否跳转tab页面
				url: '', // toast消失后是否跳转页面，有则跳转
				icon: true, // 显示的图标
				position: 'center', // toast出现的位置
				back: false
			}
		}
	},
	computed: {
		iconName() {
			// 只有不为none，并且type为error|warning|succes|info时候，才显示图标
			if (['error', 'warning', 'success'].indexOf(this.config.type) >= 0 && this.config.icon) {
				// let icon = this.$u.type2icon(this.config.type);
				// return icon;
				switch (this.config.type) {
					case 'success':
						return 'correct'
						break
					case 'warning':
						return 'tips'
						break
					case 'error':
						return 'error'
				}
			}
		},
		iconColor() {
			switch (this.config.type) {
				case 'success':
					return '#85C861'
					break
				case 'warning':
					return '#FFD674'
					break
				case 'error':
					return '#FF7070'
			}
		},
		uZIndex() {
			// 显示toast时候，如果用户有传递z-index值，有限使用
			return this.isShow ? (this.zIndex ? this.zIndex : this.$u.zIndex.toast) : '-1'
		}
	},
	methods: {
		// 显示toast组件，由父组件通过this.$refs.xxx.show(options)形式调用
		show(options) {
			this.config = Object.assign(this.config, options)
			if (this.timer) {
				// 清除定时器
				clearTimeout(this.timer)
				this.timer = null
			}
			this.isShow = true
			this.timer = setTimeout(() => {
				// 倒计时结束，清除定时器，隐藏toast组件
				this.isShow = false
				clearTimeout(this.timer)
				this.timer = null
				this.timeEnd()
			}, this.config.duration)
		},
		// 隐藏toast组件，由父组件通过this.$refs.xxx.hide()形式调用
		hide() {
			this.isShow = false
			if (this.timer) {
				// 清除定时器
				clearTimeout(this.timer)
				this.timer = null
			}
		},
		// 倒计时结束之后，进行的一些操作
		timeEnd() {
			// 如果带有url值，根据isTab为true或者false进行跳转
			if (this.config.url) {
				// 如果url没有"/"开头，添加上，因为uni的路由跳转需要"/"开头
				if (this.config.url[0] != '/') this.config.url = '/' + this.config.url
				// 判断是否有传递显式的参数
				if (Object.keys(this.config.params).length) {
					// 判断用户传递的url中，是否带有参数
					// 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
					// 如果有params参数，转换后无需带上"?"
					let query = ''
					if (/.*\/.*\?.*=.*/.test(this.config.url)) {
						// object对象转为get类型的参数
						query = this.$u.queryParams(this.config.params, false)
						this.config.url = this.config.url + '&' + query
					} else {
						query = this.$u.queryParams(this.config.params)
						this.config.url += query
					}
				}
				// 如果是跳转tab页面，就使用uni.switchTab
				if (this.config.isTab) {
					uni.switchTab({
						url: this.config.url
					})
				} else {
					uni.navigateTo({
						url: this.config.url
					})
				}
			}
			if (this.config.back) {
				uni.navigateBack({
					delta: '1'
				})
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.mi-toast {
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 40rpx;
	z-index: -1;
	transition: opacity 0.2s;
	text-align: center;
	border-radius: 16rpx;
	// background: #585858;
	background-color: rgba($color: #000000, $alpha: 0.7);
	height: 80rpx;
	font-size: 28rpx;
	opacity: 0;
}
.animation {
	animation: move 0.2s ease;
}
@keyframes move {
	0% {
		transform: translateX(-50%) translateY(20%);
	}
	// 80% {
	// 	transform: translateX(-50%) translateY(-80%);
	// }
	100% {
		transform: translateX(-50%) translateY(-50%);
	}
}

.mi-toast.u-show {
	opacity: 1;
	z-index: 9999999;
}

.u-text {
	color: #fff;
	word-break: keep-all;
	white-space: nowrap;
	line-height: normal;
}

.u-icon {
	margin-right: 10rpx;
	display: flex;
	align-items: center;
	line-height: normal;
}

.u-position-center {
	left: 50%;
	top: 50%;
	transform: translateX(-50%) translateY(-50%);
	position: fixed;
}

.u-position-top {
	left: 50%;
	top: 20%;
	transform: translateX(-50%) translateY(-50%);
}

.u-position-bottom {
	left: 50%;
	bottom: 20%;
	transform: translateX(-50%) translateY(-50%);
}

.u-type-primary {
	// color: $u-type-primary;
	// background-color: $u-type-primary-light;
	// border: 1px solid rgb(215, 234, 254);
}

.u-type-success {
	color: $u-type-success;
	background-color: $u-type-success-light;
	border: 1px solid #bef5c8;
}

.u-type-error {
	color: $u-type-error;
	background-color: $u-type-error-light;
	border: 1px solid #fde2e2;
}

.u-type-warning {
	// color: $u-type-warning;
	// background-color: $u-type-warning-light;
	// border: 1px solid #faecd8;
	color: #fff;
	font-size: 28rpx;
	background-color: rgba($color: #000000, $alpha: 0.5);
}

.u-type-info {
	color: $u-type-info;
	background-color: $u-type-info-light;
	border: 1px solid #ebeef5;
}

.u-type-default {
	color: #fff;
	background-color: #585858;
}
</style>
