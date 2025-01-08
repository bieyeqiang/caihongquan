/*
 * @Author: Jin Biao
 * @Date: 2021-07-20 18:00:26
 * @LastEditTime: 2021-12-05 18:48:32
 * @Description:  微信登录
 */
export default {
	// #ifdef MP-WEIXIN
	data() {
		return {
			mpCodeTimer: 0,
			mpWxCode: '',
		}
	},
	computed: {
		timerIdent() {
			return this.$store.state.timerIdent;
		}
	},
	watch: {
		timerIdent() {
			this.mpCodeTimer++;
			if (this.mpCodeTimer % 30 === 0) {
				this.getMpWxCode();
			}
		}
	},
	onShow() {
		this.getMpWxCode();
	},
	methods: {
		//微信小程序登录
		mpWxGetUserInfo() {
			console.log("22222222")
			if (!this.agreement) {
				this.$util.msg('请阅读并同意用户服务及隐私协议');
				return;
			}

			this.$util.throttle(() => {
				uni.getUserProfile({
					desc: '用于展示您的头像及昵称',
					success: async profileRes => {
						const res = await this.$request('user', 'loginByWeixin', {
							code: this.mpWxCode,
							...profileRes.userInfo
						}, {
							showLoading: true
						});
						if (res.status === 0) {
							this.$util.msg(res.msg);
							return;
						}
						if (res.hasBindMobile && res.data.token) {
							this.loginSuccessCallBack({
								token: res.data.token,
								tokenExpired: res.data.tokenExpired
							});
						} else {
							this.navTo('/pagesA/login/auth/bindMobile?data=' + JSON.stringify(res.data))
						}
					}
				})
			})
		},
		//获取code
		getMpWxCode() {
			uni.login({
				provider: 'weixin',
				success: res => {
					this.mpWxCode = res.code;
				}
			})
		},

	}
	// #endif
}