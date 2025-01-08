<template>
	<view class="jw-price-view" :style="{fontSize: size - 8 + 'rpx'}">
		<text>￥</text>
		<text class="price" :style="{fontSize: size + 'rpx'}">{{ priceArr[0] }}</text>
		<text>.{{ priceArr[1] }}</text>
	</view>
</template>

<script>
	/**
	 * 价格显示组件
	 */
	export default {
		data() {
			return {
				priceArr: []
			};
		},
		props: {
			price: {
				type: Number,
				default: 0
			},
			size: {
				type: Number,
				default: 36
			}
		},
		watch: {
			price(){
				this.render();
			}
		},
		created() {
			this.render();
		},
		methods: {
			render(){
				const price = parseFloat(this.price).toFixed(2);
				this.priceArr = (''+price).split('.');
			}
		}
	}
</script>

<style scoped lang="scss">
	.jw-price-view{
		color: $cor;
	}
	.price{
		font-weight: 700;
	}
</style>
