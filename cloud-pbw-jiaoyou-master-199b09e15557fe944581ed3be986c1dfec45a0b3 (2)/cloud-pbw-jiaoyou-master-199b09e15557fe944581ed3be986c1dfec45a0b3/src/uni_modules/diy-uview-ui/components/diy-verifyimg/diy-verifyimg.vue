<template>
	<view class="diy-verify" v-if="initShow" :class="isModal?'diy-verify-modal':''" :id="elid"  @touchmove.stop.prevent="stopMoveHandle" :style="verifyWidthStyle">
		<view class="diy-verify-close" @tap="close" v-if="isModal">
			<u-icon :size="50" color="#fff" name="close"></u-icon>
		</view>
		<view class="diy-verify-wrap"  v-if="isShow">
			<view class="diy-verify-box">
				<image class="diy-verify-img" v-if="verifyImg" :src="verifyImg" mode="scaleToFill"></image>
				<!-- 右侧用来验证的滑块 -->
				<view class="diy-verify-block-verify" :style="blockVerifyStyle"></view>
				<!-- 被css操控的滑块 -->
				<view class="diy-verify-block-move" :style="blockMoveStyle"></view>
				
				<view class="diy-verify-tips" v-if="!showBottomVerify">
					<text class="diy-verify-tips-text" :style="blockTipsStyle">{{ tips }}</text>
				</view>
				<!-- 手指触摸的滑块 -->
				<view class="diy-verify-block-touch" :style="blockTouchStyle" @touchstart="touchstartHandle"
					@touchmove="touchmoveHandle" @touchend="touchendHandle">
				</view>
				<view @tap="initVerify()" class="diy-verify-refresh">
					<u-icon :size="50" :color="refreshColor" name="reload"></u-icon>
				</view>
			</view>
			<view class="diy-verify-verify" v-if="showBottomVerify"  :style="verifyBottomStyle">
				<view   :class="(isSuccess?'diy-verify-success-text':'diy-verify-text')">{{tips}}</view>
				<!-- 被css操控的滑块 -->
				<view class="diy-verify-verify-move" :style="verifyMoveStyle">
					<u-icon :size="bottomSize-10" :name="isSuccess?'checkbox-mark':'arrow-right-double'"></u-icon>
				</view>
				<!-- 手指触摸的滑块 -->
				<view class="diy-verify-verify-touch" :style="verifyTouchStyle" @touchstart="touchstartHandle" 	@touchmove="touchmoveHandle" @touchend="touchendHandle">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'zmmVerifyVerify',
		emits: ["update:modelValue",'close',"change"],
		props: {
			// 通过双向绑定控制组件的弹出与收起
			modelValue: {
				type: Boolean,
				default: false
			},
			isModal:{
				type:Boolean,
				default: false
			},
			//提醒
			tip: {
				type: String,
				default: '请将左侧透明滑块拖进白色框内'
			},
			successTip: {
			     type: String,
			     default: "验证通过"
			},
			failTip:{
			  type: String,
			  default: "验证失败"
			},
			//滑块大小
			verifySize: {
				type: Number,
				default: 50
			},
			//滑块颜色
			verifyColor: {
				type: String,
				default: 'rgba(0,0,0,0.4)'
			},
			//图片验证高度
			verifyHeight:{
				type: Number,
				default: 170
			},
			// 图片
			verifyImg: {
				type: String,
				default: ''
			},
			//刷新颜色
			refreshColor: {
				type: String,
				default: '#ffffff'
			},
			//校验正负差值区间像素
			between: {
				type: Number,
				default: 10
			},
			//如果不显示底部滑动条时提示字段颜色
			tipColor:{
			  type: String,
			  default: '#ffff00'
			},
			// 是否显示底部滑动条
			showBottomVerify: {
				type: Boolean,
				default: false
			},
			//底部滑块大小
			bottomSize: {
				type: Number,
				default: 40
			},
			bottomBarColor: {
				type: String,
				default: '#eee'
			},
			bottomSuccessColor: {
				type: String,
				default: '#19be6b'
			},
			//底部滑块颜色
			bottomBgColor: {
			      type: String,
			      default: '#ffffff'
			},
			bottomColor: {
			  type: String,
			  default: '#bbbbbb'
			},
			bottomBorderColor: {
			  type: String,
			  default: '#bbbbbb'
			},
		},
		data() {
			return {
				elid: this.$u.guid(),
				verifyWidth:280,
				initShow:!this.isModal,
				tips:this.tip,
				startPageX: 0, //开始距离
				moveLeft: 0, //滑动距离
				isSuccess: false, //是否成功
				autoLeft: 80, //验证滑块随机的像素
				autoTop: 80, //验证滑块随机的top像素
				isShow: false
			};
		}, 
        watch: {
			verifyImg: {
			  immediate: true,
			  handler: function() {
				  this.init()
			  }
			}
		},
		computed: {
			verifyWidthStyle(){
				return `--diy-verify-width:${this.verifyWidth}px;--diy-verify-height:${this.verifyHeight}px`
			},
			blockVerifyStyle() {
				return `top:${this.autoTop}px;left:${this.autoLeft}px;height:${this.verifySize}px;width:${this.verifySize}px;background-color:${this.verifyColor};`
			},
			blockMoveStyle() {
				let moveLeft = this.isSuccess?this.autoLeft:this.moveLeft;
				return `top:${this.autoTop}px;left:${moveLeft}px;height:${this.verifySize}px;width:${this.verifySize}px;background-color: ${this.verifyColor};`
			},
			blockTipsStyle(){
				return `color:${this.tipColor}`
			},
			blockTouchStyle() {
				return `top:${this.autoTop}px;height:${this.verifySize}px;width:${this.verifySize}px;`
			},
			verifyMoveStyle() {
				let moveLeft = this.isSuccess?this.autoLeft:this.moveLeft;
				return `border:1px solid ${this.bottomBorderColor};left:${moveLeft}px;height:${this.bottomSize}px;width:${this.bottomSize}px;color:${this.bottomColor};background-color: ${this.bottomBgColor};`
			},
			verifyTouchStyle() {
				return `height:${this.bottomSize}px;width:${this.bottomSize}px;`
			},
			verifyBottomStyle() {
				return `font-size:${this.bottomSize-26}px;line-height:${this.bottomSize}px;height:${this.bottomSize}px;background-color:${this.isSuccess?this.bottomSuccessColor:this.bottomBarColor}`
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			// 初始化
			init() {
				if(this.initShow){
					this.$nextTick(()=>{
						this.$uGetRect('#' + this.elid).then((res) => {
							this.verifyWidth = this.isModal?res.width-20:res.width;
							this.initVerify()
						});
					})
				}
			},
			initVerify(){
				this.isShow = true
				this.moveLeft = 0;
				this.isSuccess = false;
				this.autoTop = this.randPostion(0, this.verifyHeight - this.verifySize);
				this.autoLeft = this.randPostion(this.verifySize + 20, this.verifyWidth - this.verifySize);
			},
			show(){
				this.initShow = true;
				this.init();
			},
			close(){
				if(this.isModal){
					this.initShow = false;
					this.$emit("close");
				}
			},
			// 拦截其他触摸事件防止nvue下input等元素层级问题
			stopMoveHandle(e) {
				if (e.preventDefault) {
					// 阻止页面滚动
					e.preventDefault()
				}
			},
			// 随机数
			randPostion(min, max) {
				//返回包括最大/小值
				return Math.floor(Math.random() * (max - min + 1)) + min;
			},
			//按下
			touchstartHandle(e) {
				if (this.isSuccess) {
					return;
				}
				this.startPageX = e.changedTouches[0].pageX;
			},
			// 滑动
			touchmoveHandle(e) {
				// 滑动分两个块来操作不然会有数据抖动
				if (this.isSuccess) {
					return;
				}
				var left = e.changedTouches[0].pageX - this.startPageX; //补偿起始位置
				this.moveLeft = left;
			},
			// 滑动离开（最终）
			touchendHandle(e) {
				var endLeft = e.changedTouches[0].pageX;
				var verifyLeft = this.autoLeft + this.startPageX; //补偿起始位置
				var chazhi = verifyLeft - endLeft; //最终差值
				// 判断是否在正负差值区间
				if (chazhi >= 0 - this.between && chazhi <= this.between) {
					this.isSuccess = true;
					// 通过会执行成功和关闭
					this.tips = this.successTip
					this.$emit("update:modelValue", true);
					this.$emit("change", true);
					uni.showToast({
						icon:'none',
						title:this.successTip?this.successTip:'验证通过'
					})
					this.close()
				} else {
					this.tips = this.failTip?this.failTip:'验证失败';
					setTimeout(()=>{
						this.tips = this.tip;
					})
					// 失败会执行失败并重新初始化
					this.show();
					uni.showToast({
						title: this.failTip?this.failTip:'验证失败',
						icon: 'none'
					});
					this.$emit("update:modelValue", false);
					this.$emit("change", false);
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.diy-verify {
		--diy-verify-width:280px;
		--diy-verify-height:170px;
		--textColor:#4d4d4d;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		&.diy-verify-modal{
			position: fixed;
			top:0px;
			left:0px;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.6);
			z-index: 99999999;
			transition: all 0.3s ease-in-out 0s;
			
			.diy-verify-close{
				position: absolute;
				top:10px;
				right: 10px;
			}
			.diy-verify-wrap {
				opacity: 1;
				transition-duration: 0.3s;
				-ms-transform: scale(1);
				transform: scale(1);
				overflow-x: hidden;
				overflow-y: auto;
				pointer-events: auto;
			}
		}

		.diy-verify-wrap {
			display: flex;
			flex-direction: column;
			position: relative;
			margin: 0 auto;
			width: var(--diy-verify-width); 
			background-color: #ffffff;
 
			.diy-verify-tips {
				position: absolute;
				left:0;
				bottom: 0;
				width: 100%;
				background: rgba(0, 0, 0, .6);
				font-size: 12px;
				line-height: 20px;
				text-align: center;

				.diy-verify-tips-text {
					color: #ff0;
				}
			}
			.diy-verify-refresh{
				position: absolute;
				right: 10px;
				top: 10px;
			}

			.diy-verify-text{
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				color: #FFFFFF;
				text-align: center;
				background: -webkit-gradient(linear,left top,right top,color-stop(0,var(--textColor)),color-stop(.4,var(--textColor)),color-stop(.5,#fff),color-stop(.6,var(--textColor)),color-stop(1,var(--textColor)));
				animation: slidetounlock 3s infinite;
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}
			.diy-verify-success-text{
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				text-align: center;
				color: #FFFFFF;
			}

			@keyframes slidetounlock{
				0% {
					background-position: -200rpx 0;
				}
				100% {
					background-position: 200rpx 0;
				}
			}
			.diy-verify-box {
				position: relative;
				width: var(--diy-verify-width);
				height: var(--diy-verify-height);
				overflow: hidden;

				.diy-verify-img {
					width: var(--diy-verify-width);
					height: var(--diy-verify-height);
					border-radius: 0px;
				}

				.diy-verify-block-verify,
				.diy-verify-block-move,
				.diy-verify-block-touch {
					position: absolute;
					left: 0px;
					top: 0;
					border-radius: 0px;
				}

				.diy-verify-block-verify {
					border:1px solid #fff;
				}
			}

			.diy-verify-verify {
				height:40px;
				width: var(--diy-verify-width);
				background-color: rgba(0,0,0,0.07);
				position: relative;
				overflow: hidden;
				.diy-verify-verify-move{
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.diy-verify-verify-move,
				.diy-verify-verify-touch {
					border-radius: 0px;
				}
  
				.diy-verify-verify-move,.diy-verify-verify-touch {
					position: absolute;
					left: 0px;
					top: 0px;
				}
			}
		}
	}
</style>