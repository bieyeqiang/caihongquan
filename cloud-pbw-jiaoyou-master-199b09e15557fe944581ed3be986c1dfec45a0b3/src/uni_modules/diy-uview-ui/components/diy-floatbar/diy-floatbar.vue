<template>
	<view
		:id="id"
		class="diy-floatbar"
		:style="'left: ' + left + 'px; top:' + top + 'px;'"
		@touchstart="touchstart"
		@touchmove.stop.prevent="touchmove"
		@touchend="touchend"
		@click.stop.prevent="click"
		:class="{transition: isDock && !isMove }"
	>
		 <slot></slot>
	</view>
</template>

<script>
	export default {
		name: 'diy-floatbar',
		emits: ["click", "dragStart","dragEnd","btnClick"],
		props: {
			id:{
				type: String,
				default: 'floatbar'
			},
			//默认位置右下角right-bottom、left-bottom、right-top、left-top
			positionType:{
				type: String,
				default: 'right-bottom'
			},
			//是否吸附
			isDock:{
				type: Boolean,
				default: true
			},
			//是否包含底部菜单
			existTabBar:{
				type: Boolean,
				default: false
			},
			//默认上下偏移
			topEdge:{
				type: Number,
				default: 50
			},
			//默认左右偏移
			leftEdge:{
				type: Number,
				default: 10
			},
			//刷新页面后保存不变
			isDragSave:{
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				top:0,
				left:0,
				width: 0,
				height: 0,
				offsetWidth: 0,
				offsetHeight: 0,
				windowWidth: 0,
				windowHeight: 0,
				isMove: true,
				edge: 10,
			}
		},
		mounted() {
			const sys = uni.getSystemInfoSync();
			
			this.windowWidth = sys.windowWidth;
			this.windowHeight = sys.windowHeight;
			
			// #ifdef APP-PLUS
			this.existTabBar && (this.windowHeight -= 50);
			// #endif
			if (sys.windowTop) {
				this.windowHeight += sys.windowTop;
			}
			let windowTop = 0;
			if (sys.windowTop) {
				windowTop = sys.windowTop;
			}
			const query = uni.createSelectorQuery().in(this);
			query.select('#'+this.id).boundingClientRect(data => {
				this.width = data.width;
				this.height = data.height;
				this.offsetWidth = data.width / 2;
				this.offsetHeight = data.height / 2;
				let left = 0;
				let top = 0;
				if(this.positionType=='right-bottom'){
					left = this.windowWidth - this.width - this.leftEdge;
					top =  this.windowHeight - this.height - this.topEdge;
				}else if(this.positionType=='left-bottom'){
					left = this.leftEdge;
					top =  this.windowHeight - this.height - this.topEdge;
				}else if(this.positionType=='right-top'){
					left = this.windowWidth - this.width - this.leftEdge;
					top =  this.topEdge+windowTop;
				}else if(this.positionType=='left-top'){
					left = this.leftEdge;
					top =  this.topEdge+windowTop;
				}
				if(this.isDragSave){
					let position = uni.getStorageSync(this.id);
					if(position){
						left = position.left
						top = position.top
					}
				}
				this.left = left
				this.top = top
			}).exec();
		},
		methods: {
			click() {
				this.$emit('btnClick');
			},
			touchstart(e) {
				this.$emit('dragStart');
			},
			touchmove(e) {
				// 单指触摸
				if (e.touches.length !== 1) {
					return false;
				}
				
				this.isMove = true;
				
				this.left = e.touches[0].clientX - this.offsetWidth;
				
				let clientY = e.touches[0].clientY - this.offsetHeight;
				// #ifdef H5
				clientY += this.height;
				// #endif
				let edgeBottom = this.windowHeight - this.height - this.edge;

				// 上下触及边界
				if (clientY < this.edge) {
					this.top = this.edge;
				} else if (clientY > edgeBottom) {
					this.top = edgeBottom;
				} else {
					this.top = clientY
				}
				
			},
			touchend(e) {
				if (this.isDock) {
					let edgeRigth = this.windowWidth - this.width - this.edge;
					
					if (this.left < this.windowWidth / 2 - this.offsetWidth) {
						this.left = this.edge;
					} else {
						this.left = edgeRigth;
					}
					
				}
				if(this.isDragSave){
					uni.setStorageSync(this.id,{
						left:this.left,
						top:this.top
					})
				}
				
				this.isMove = false;
				
				this.$emit('dragEnd');
			},
		}}
</script>

<style lang="scss">
	.diy-floatbar {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		z-index: 999999;
		
		&.transition {
			transition: left .3s ease,top .3s ease;
		}
	}
	
</style>
