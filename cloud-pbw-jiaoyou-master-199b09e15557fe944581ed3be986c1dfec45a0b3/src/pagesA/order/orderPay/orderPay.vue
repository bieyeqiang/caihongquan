<template>
  <div class="pay-wrapper" v-bind:style="[{ height: windowHeight + 'px' }]">
    <statusLine :curStatu = '3' :warningMsg = 'false'></statusLine>
    <div class='pay-content'>
    	<div class='pay-content-msg'>
    		<span class="iconfont icon-zhifuchenggong"></span>
    		<span class='pay-content-msg-txt'>支付成功，正在等待伴伴确认订单中！</span>
    	</div>
    	<div class='pay-content-time'>
    		<p class='pay-content-time-msg'>请稍后，服务者伴伴，正在确认中...</p>
    		<p class='pay-content-time-time' @click="close">【去我的个人中心-我的订单继续查看状态】</p>
    	</div>
    </div>
	<wrap :height = '16'></wrap>
    <div class="pay-methods">
      <span  @click="close">前往我的订单</span>
    </div>
	<!--<div class="pay-methods">-->
		<!--<div class="pay-methods-title">选择支付方式</div>-->
		<!--<div class="pay-methods-content">-->
			<!--<div class="pay-methods-content-item">-->
				<!--<p class='pay-methods-content-item-part1'><span class="iconfont icon-iconfontrectangle390"></span><span class='pay-methods-content-item-part1-txt'>支付宝</span></p>-->
				<!--<p class='pay-methods-content-item-part2'><span @click='selected(1)' v-bind:class="[selectdePay === 1 ? 'icon-Radiobutton-xuanzhongxuanxiang':'icon-radio', 'iconfont']"></span></p>-->
			<!--</div>-->
			<!--<div class="pay-methods-content-item">-->
				<!--<p class='pay-methods-content-item-part1'>-->
					<!--<span class="iconfont icon-weixin"></span>-->
					<!--<span class='pay-methods-content-item-part1-txt'>微信</span></p>-->
				<!--<p class='pay-methods-content-item-part2'><span @click='selected(2)' v-bind:class="[selectdePay === 2 ? 'icon-Radiobutton-xuanzhongxuanxiang':'icon-radio', 'iconfont']"></span></p>-->
			<!--</div>-->
		<!--</div>-->
	<!--</div>-->
	<!--<div class='pay-footer'>-->
		<!--<p class='pay-footer-part1'>-->
			<!--<span class='pay-footer-part1-txt'>应付总额</span>-->
			<!--<span class='pay-footer-part1-price'>￥680.00</span>-->
		<!--</p>-->
		<!--<p class='pay-footer-part2'>-->
			<!--<span class='pay-footer-part2-btn'>确认支付</span>-->
		<!--</p>-->
	<!--</div>-->
  </div>
</template>

<script>
import wrap from '@/components/wrap'
import statusLine from '@/components/statusLine'
export default {
  data () {
    return {
      selectdePay: 0,
      windowHeight: 0
    }
  },
  components: {
    wrap,
    statusLine
  },
  methods: {
    close(){
      uni.redirectTo({
        url: '/pagesB/myhome/orderList/orderList?index=1'
      });
    },
    selected (type) {
      this.selectdePay = type
    }
  },

  computed: {
	  
  },

  created () {
    this.windowHeight = wx.getStorageSync('windowHeight')
  }
}
</script>

<style scoped>
  .pay-methods{
    text-align: center;
  }
  .pay-methods span{
    text-align: center;
    color: #fff;
    background: #f60;
    padding: 3px 17px;
    border-radius: 5px;
    display: inline-block;
    margin: 50px auto;
  }
	.pay-wrapper{
		color:#222;
		background: #EAEEF7;
		position: relative;
	}
	.pay-content{
		height:400rpx;
		width:100%;
		background: #fff;
	}
	.pay-content-msg{
		text-align: center;
		padding:50rpx 0 30rpx;
	}
	.pay-content-msg .iconfont{
		font-size: 90rpx;
		color:#0DCA28;
		vertical-align: middle;
		padding-right:20rpx;
	}
	.pay-content-msg-txt{
		font-size: 36rpx;
	}
	.pay-content-time{
		text-align: center;
	}
	.pay-content-time-msg{
		font-size: 28rpx;
		padding-bottom:20rpx;
	}
	.pay-content-time-time{
		font-size: 30rpx;
		color:#FEB925;
	}
	.pay-methods{
		background: #fff;
	}
	.pay-methods-title{
		font-size: 24rpx;
		color:#999;
		padding:20rpx;
		border-bottom:1rpx solid #F8FBFF;
	}
	.pay-methods-content-item{
		display:flex;
		padding:20rpx;
		border-bottom:1rpx solid #F8FBFF;
	}
	.pay-methods-content-item-part1{
		flex:1;
	}
	.pay-methods-content-item-part1 .iconfont{
		
		vertical-align: middle;
		padding-right:10rpx;
	}
	.pay-methods-content-item-part1 .icon-iconfontrectangle390{
		color:#009FE8;
		font-size: 50rpx;
	}
	.pay-methods-content-item-part1 .icon-weixin{
		color:#6CC539;
		font-size: 46rpx;
	}
	.pay-methods-content-item-part1-txt{
		font-size: 28rpx;
		color:#333;
	}
	.pay-methods-content-item-part2{
		flex:0 100rpx;
		text-align: right;
	}
	.pay-methods-content-item-part2 .iconfont{
		color:#DEDEDE;
		font-size: 36rpx;
	}
	.pay-methods-content-item-part2 .icon-Radiobutton-xuanzhongxuanxiang{
		color:#6CC539;
	}
	.pay-footer{
		position: absolute;
		bottom:0;
		background: #fff;
		padding:20rpx;
		display: flex;
		width:100%;
		box-sizing: border-box;
	}
	.pay-footer-part1{
		flex:1;
	}
	.pay-footer-part1-txt{
		font-size: 24rpx;
	}
	.pay-footer-part1-price{
		font-size: 28rpx;
		padding-left:20rpx;
	}
	.pay-footer-part2{
		flex:0 200rpx;
		text-align: right;
	}
	.pay-footer-part2-btn{
		background: #FDD149;
		font-size: 28rpx;
		display: inline-block;
		width:152rpx;
		height:46rpx;
		line-height: 46rpx;
		text-align: center;
		border-radius: 6rpx;
	}
</style>
