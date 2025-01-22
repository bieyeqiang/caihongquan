export default {
  onLoad () {
    if (this.systemInfo.platform !== 'ios') {
      return;
    } else {
      this.canUseAppleLogin = true;
    }
  },
  methods: {
    //苹果登录
    async loginByApple () {
      if (!this.agreement) {
        this.$util.msg('请阅读并同意用户服务及隐私协议');
        this.$refs.confirmBtn.stop();
        return;
      }
      uni.login({
        provider: 'apple',
        success: loginRes => {
          // 登录成功
          uni.getUserInfo({
            provider: 'apple',
            success: async userRes => {
              const response = await this.$request('user', 'loginByApple', {
                authorizationCode: userRes.userInfo.authorizationCode,
                identityToken: userRes.userInfo.identityToken
              }, {
                showLoading: true
              });
              //注销苹果登录
              this.appleLogout();
              if (response.status === 0) {
                this.$util.msg(response.msg);
                return;
              }
              if (response.hasBindMobile && response.data.token) {
                this.loginSuccessCallBack({
                  token: response.data.token,
                  tokenExpired: response.data.tokenExpired
                });
              } else {
                this.navTo('/pagesA/login/auth/bindMobile?type=apple&data=' + JSON.stringify(response.data))
              }
            }
          })
        },
        fail: err => {
          console.log(err);
          this.$util.msg('登录失败');
          this.appleLogout();
        }
      })
    },
    appleLogout () {
      plus.oauth.getServices(oauthRes => {
        const oIndex = oauthRes.findIndex(oItem => oItem.id === 'apple');
        oauthRes[oIndex].logout(loRes => {
          console.log('appleLogout success=> ', loRes);
        }, loErr => {
          console.log('appleLogout error=> ', loErr);
        })
      })
    }
  }
}









