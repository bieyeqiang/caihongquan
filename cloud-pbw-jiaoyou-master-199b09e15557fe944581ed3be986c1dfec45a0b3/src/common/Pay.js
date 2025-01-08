//微信小程序相关方法
var Pay = {
	async pay(param){
		let page = getApp().globalData.currentPage
		let session = page.$session;
		if(!session.getUser()){
			page.showToast('请先登录')
			if(param.fail && typeof param.fail=='function'){
				param.fail()
			}
			return;
		}
		if(!param.total){
			page.showToast('请配置价格参数total')
			if(param.fail && typeof param.fail=='function'){
				param.fail()
			}
			return;
		}
		let http_data = {
			total:param.total,
			body:param.body
		}
		if(param.openid|| (session.getUser() && session.getUser().openid)){
			http_data.openid = param.openid||session.getUser().openid
		}
		//自定义参数
		if(param.param){
			http_data = Object.assign(http_data,param.param)
		}
		//自定义头
		let http_header = {}
		if(param.header){
			http_header = param.header
		}
		let data = await page.$http.post(param.url||'/api/wepay/order',http_data,http_header,'json')
		
		if(data.code!=200){
			console.log(data)
			page.showToast(data.msg||'发起支付失败')
			if(param.fail && typeof param.fail=='function'){
				param.fail(data)
			}
			return;
		}
		if(this[param.paytype]){
			this[param.paytype](Object.assign(data,param))
		}else{
			if(param.fail && typeof param.fail=='function'){
				param.fail(data)
			}
			page.showToast('请使用微信打开')
			return;
		}
	},
	//微信支付  
	weixin(params = {}) {
		uni.requestPayment({
		  provider: 'wxpay',
		  timeStamp: params.data.timeStamp,// 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
		  nonceStr: params.data.nonceStr,// 支付签名随机串，不长于 32 位  
		  package: params.data.package,// 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*） 
		  signType: params.data.signType,// 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'  
		  paySign: params.data.paySign,// 支付签名  
		  success: res => {
			  if(params.success && typeof params.success=='function'){
				  params.success(res)
			  }else{
				  console.log('配置支付回调成功方法')
			  }
		  },
		  fail: res => {
			  if(param.fail && typeof param.fail=='function'){
				  param.fail(res)
			  }else{
				  console.log('配置支付回调失败方法')
			  }
		  }
		})
	}
}

export default Pay