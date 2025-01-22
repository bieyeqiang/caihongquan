<template>
  <div class="paySuccess-wrapper" v-bind:style="[{ height: windowHeight + 'px' }]">
    <statusLine :curStatu = '1' :warningMsg = 'false'></statusLine>
    <div class='paySuccess-content'>
    	<div class='paySuccess-content-msg'>
    		<span class="iconfont icon-zhifuchenggong"></span>
    		<span class='paySuccess-content-msg-txt'>订单支付成功！等待确认中...</span>
    	</div>
    	<div class='paySuccess-content-txt'>
    		请稍后,热心伴伴正在快速赶来确认，确认后会立刻以短信 形式通知你~
    	</div>
    </div>
	<div class='paySuccess-footer'>
		<p class='paySuccess-footer-part1'>
			订单可在“我的中心-我是买家-待确认”中查看
		</p>
		<p class='paySuccess-footer-part2'>
			<navigator url = '../pageAllOrders/main' hover-class="none" class='paySuccess-footer-part2-nav'>立即查看<span class='iconfont icon-you'></span></navigator>
		</p>
	</div>
  </div>
</template> 
<script>
import wrap from '@/components/wrap'
import statusLine from '@/components/statusLine'
export default {
  data () {
    return {
      windowHeight: 0
    }
  },
  components: {
    wrap,
    statusLine
  },
  methods: {
  },

  computed: {
  },

  created () {
    this.windowHeight = wx.getStorageSync('windowHeight')
  }
}
</script>

<style scoped>
	.paySuccess-wrapper{
		color:#222;
		background: #EAEEF7;
		position: relative;
	}
	.paySuccess-content{
		height:400rpx;
		width:100%;
		background: #fff;
	}
	.paySuccess-content-msg{
		text-align: center;
		padding:90rpx 0 70rpx;
	}
	.paySuccess-content-msg .iconfont{
		font-size: 90rpx;
		color:#0DCA28;
		vertical-align: middle;
		padding-right:20rpx;
	}
	.paySuccess-content-msg-txt{
		font-size: 36rpx;
	}
	.paySuccess-content-txt{
		text-align: center;
		padding:0 80rpx;
		line-height: 40rpx;
		font-size: 28rpx;
	}
	.paySuccess-footer{
		padding-top:200rpx;
		text-align: center;
	}
	.paySuccess-footer-part1{
		font-size: 28rpx;
		padding:20rpx 0;
	}
	.paySuccess-footer-part2{
		font-size: 28rpx;
		color:#23ACEB;
	}
	.paySuccess-footer-part2 .iconfont{
		font-size: 24rpx;
	}
	/*.paySuccess-footer-part2-btn{
		background: #FDD149;
		font-size: 28rpx;
		display: inline-block;
		width:152rpx;
		height:46rpx;
		line-height: 46rpx;
		text-align: center;
		border-radius: 6rpx;
	}*/
</style>
