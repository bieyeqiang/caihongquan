<template>
	<view v-show="show" class="full" :style="{ background: bgColor }">
		<view class="loading" :style="{ top: top + '%' }">
			<view class="outer"></view>
			<view class="innerBox"><view class="inner"></view></view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'full-loading',
	data() {
		return {}
	},
	props: {
		top: {
			type: [String, Number],
			default: 40
		},
		show: {
			type: Boolean,
			default: true
		},
		bgColor: {
			type: String,
			default: 'transparent'
		}
	}
}
</script>

<style lang="scss">
.full {
	position: fixed;
	top: 0;
	width: 750rpx;
	height: 100vh;
	z-index: 100000;
}
.loading {
	position: fixed;
	// top: 40%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 100001;
	.outer {
		border: 10rpx solid #5856D5;
		opacity: 0.9;
		width: 100rpx;
		height: 100rpx;
		border-top-color: transparent;
		border-bottom-color: transparent;
		border-radius: 50%;
		animation: spin-right 0.5s linear infinite normal;
		animation-delay: 0;
		margin: 0 auto;
	}
	.innerBox {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.inner {
		display: block;
		width: 60rpx;
		height: 60rpx;
		border: 10rpx solid #5856D5;
		opacity: 0.9;
		border-radius: 50%;
		border-left-color: transparent;
		border-bottom-color: transparent;
		animation: spin-left 0.5s linear infinite normal;
		animation-delay: 0;
	}
}
@keyframes spin-right {
	from {
		transform: rotate(0deg);
		opacity: 0.2;
	}

	50% {
		transform: rotate(180deg);
		opacity: 1;
	}

	to {
		transform: rotate(360deg);
		opacity: 0.2;
	}
}
@keyframes spin-left {
	from {
		transform: rotate(0deg);
		opacity: 0.2;
	}

	50% {
		transform: rotate(-180deg);
		opacity: 1;
	}

	to {
		transform: rotate(-360deg);
		opacity: 0.2;
	}
}
</style>
