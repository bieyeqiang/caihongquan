<template>
	<view  :id="elid" class="diygw-col-24" @touchmove.stop.prevent="stopMoveHandle" >
		<view class="diy-verify"   @touchmove.stop.prevent="touchmoveHandle"  @touchend="touchendHandle"   @mousedown="touchstartHandle"  @mousemove.stop.prevent="touchmoveHandle"  @mouseleave="touchendHandle"  :style="barStyle">
			<view :class="'diy-verify-success-bar '+(isAnimation?'animation':'')" :style="successStyle"></view>
			<view   :class="(isSuccess?'diy-verify-success-text':'diy-verify-text')">{{isSuccess?successText:text}}</view>
			<view :class="'diy-verify-block '+(isAnimation?'animation':'')"  :style="blockStyle"  @touchstart="touchstartHandle" >
				<u-icon :size="verifyHeight-10" :name="isSuccess?'checkbox-mark':'arrow-right-double'"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	emits: ["update:modelValue","change"],
	props: {
		// 通过双向绑定控制组件的弹出与收起
		modelValue: {
			type: Boolean,
			default: false
		},
		barColor:{
			type: String,
			default: '#eeeeee'
		},
		color:{
			type: String,
			default: '#333333'
		},
		successBarColor: {
			type: String,
			default: '#19be6b'
		},
		text:{
			type: String,
			default: '请按住滑块，拖动到最右边'
		},
		successText:{
			type: String,
			default: '校验成功'
		},
		verifyHeight:{
			type: Number,
			default: 40
		},
		radius:{
			type: Number,
			default: 4
		}
	},
	data() {
		return {
			isMoving:false,
			isShow:false,
			elid: this.$u.guid(),
			barWidth:375,
			startPageX:0,
			moveLeft:0,
			isAnimation:false,
			isSuccess:false
		};
	},
	computed: {
		barStyle(){
			return {
				fontSize:(this.verifyHeight-25)+'px',
				'--textColor':this.color,
				backgroundColor:this.barColor,
				borderRadius:this.radius,
				lineHeight:(this.verifyHeight+3)+'px',
				height:(this.verifyHeight+3)+'px',
				width:this.barWidth+'px'
			}
		},
		 
		blockStyle(){
			return {
				lineHeight:(this.verifyHeight+3)+'px',
				left:this.moveLeft+'px'
			}
		},
		successStyle(){
			return {
				width:(this.isSuccess?this.barWidth:(this.moveLeft+6))+'px',
				backgroundColor:this.successBarColor
			}
		},
		trueMoveableW:function(){
			return this.barWidth- this.verifyHeight - 3
		}
	},
	mounted() {
		let thiz = this;
		this.$uGetRect('#' + this.elid).then((res) => {
			thiz.barWidth = res.width;
			thiz.isShow = true
		});
	},
	methods: {
		// 拦截其他触摸事件防止nvue下input等元素层级问题
		stopMoveHandle(e) {
			if (e.preventDefault) {
				// 阻止页面滚动
				e.preventDefault()
			}
		},
		//手指按下
		touchstartHandle({changedTouches}){
			if(this.isSuccess){
				return
			}
			this.isMoving = true;
			this.isAnimation=false
			this.startPageX=changedTouches[0].pageX
		},
		// 手指移动
		touchmoveHandle({changedTouches}){
			if(!this.isMoving&&(this.isSuccess||!this.startPageX)){
				return
			}
			let moveLeft=changedTouches[0].pageX - this.startPageX
			if(moveLeft<0){
				this.moveLeft=0
			}else{
				this.moveLeft=moveLeft<=this.trueMoveableW?moveLeft:this.trueMoveableW
			}
		},
		// 手指离开
		touchendHandle(e){
			this.isMoving = false;
			if(this.isSuccess){
				return
			}
			if(this.moveLeft>=this.trueMoveableW){
				this.isSuccess=true
				this.$emit("update:modelValue", true);
				this.$emit("change", true);
			}else{
				this.isSuccess=false
				this.isAnimation=true
				let timeid=setTimeout(()=>{
					clearTimeout(timeid)
					this.isAnimation=false
				},500)
				this.moveLeft=0
				this.$emit("update:modelValue", false);
				this.$emit("change", false);
			}
		},
		closeHumanCheckHandle(){
			this.$emit('close')
		},
		reset(){
			this.moveLeft=0
			this.isSuccess=false
		}
	}
};
</script>

<style lang="scss" scoped>
.diy-verify {
	width: 100%;
	height: 43px;
	line-height: 43px; 
	position: relative;
	overflow: hidden;
	--textColor:#4d4d4d;
	
	.diy-verify-success-bar{
		background-color: #009cd0;
		width: 100%;
		height: 100%;
	}
	
	.diy-verify-text{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
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
	.diy-verify-block {
		width: 43px;
		background-color: #ffffff;
		border:1px solid #bbb;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		left: 0px;
		top: 0px;
		height: 100%;
	}
	
	.animation{
		transition: all 0.5s;
	}
	
	@keyframes slidetounlock{
		0% {
		    background-position: -200rpx 0;
		}
		100% {
		    background-position: 200rpx 0;
		}
	}
}

</style>
