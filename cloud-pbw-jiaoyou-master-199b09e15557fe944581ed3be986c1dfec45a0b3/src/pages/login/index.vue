<template>
  <view class="container container331385">
    <image src="/static/b619fa5643d7d65148c208b18f887b75.png" class="response diygw-col-24 image-clz" mode="widthFix"></image>
    <text class="diygw-col-24 text-clz app_name"> 彩虹圈 </text>
    <text class="diygw-col-24 text1-clz"> 彩虹世界·幸福就好 </text>
    <u-form :model="form" :rules="formRules" :errorType="message" ref="formRef" class="flex diygw-form diygw-col-24 form-clz">
      <u-form-item class="diygw-col-24 input-clz" labelPosition="top" prop="username">
        <u-input :focus="formData.inputFocus" placeholder="请输入账号" v-model="form.username"></u-input>
      </u-form-item>
      <u-form-item class="diygw-col-24 input1-clz" labelPosition="top" prop="password">
        <u-input :focus="formData.input1Focus" placeholder="请输入密码" v-model="form.password" type="password" :password-icon="true"></u-input>
      </u-form-item>
      <text class="diygw-col-24 text2-clz"> 忘记密码 </text>
      <button class="diygw-col-24 btn-clz diygw-btn-default" @click="submitForm">登录/注册</button>
    </u-form>

    <view class="agreement">
		<checkbox-group @change="toggleAgreement">
						<label class="uni-list-cell uni-list-cell-pd">
							<view>
								<checkbox  :checked="isAgreed" />
							</view>
							<view>
								<text>
								   我已阅读并同意
								   <text @tap="viewProtocol('user')" class="link">《用户协议》</text>
								   和
								   <text @tap="viewProtocol('privacy')" class="link">《隐私政策》</text>
								 </text>
							</view>
						</label>
		</checkbox-group>
     
     <!--  -->
    </view>

    <view class="clearfix"></view>
  </view>
</template>

<script>
// import config from "../../siteinfo.js";
// import { useChatStore } from "@/store/chat";
// import { CHAT_STORE, IS_USE_CUSTOM_SERVER } from "@/const/index";

// const { login } = useChatStore();
import { emConnect } from '../../EaseIM/emApis';
const { loginWithPassword, loginWithAccessToken,registerUser } = emConnect();

export default {
  data() {
    return {
      message: 'toast',
      isAgreed: false,
      userInfo: {},
      globalOption: {},
      globalData: {},
      form: {
        username: '',
        password: ''
      },
      formRules: {
        input: { required: true, message: '请输入账号', trigger: 'blur' },
        input1: { required: true, message: '请输入密码', trigger: 'blur' }
      },
      formData: {
        inputFocus: false,
        input1Focus: false
      }
    };
  },
  onShow() {
    // console.log(config.basePath);
    this.setCurrentPage(this);
  },
  onLoad(option) {
    this.setCurrentPage(this);
    if (option) {
      this.setData({
        globalOption: this.getOption(option)
      });
    }
    this.init();
  },
  onReady() {
    this.$refs.formRef?.setRules(this.formRules);
  },
  methods: {
    toggleAgreement(event) {
		
      this.isAgreed = event.detail.value.length > 0;
	  console.log(this.isAgreed);
    },
    async init() {
      await this.initResetform();
    },
    initResetform() {
      this.initform = JSON.stringify(this.form);
    },
    resetForm() {
      this.form = JSON.parse(this.initform);
    },
    async submitForm(e) {
      if (!this.isAgreed) {
        this.showToast('请先同意用户协议和隐私政策', 'none');
        return;
      }

      // this.$refs.formRef?.setRules(this.formRules);

      this.$nextTick(async () => {
        let valid = await this.$refs.formRef.validate();
		console.log(valid);
        if (valid) {
			// 模拟登陆操作
			try {
				// 实际要请求接口
			  // const res = await loginWithPassword(
			  //   this.loginEaseIMId,
			  //   this.loginEaseIMPassword
			  // );
			  const data = {
				  chatUserName: 'miito123',
				  token: 'YWMtZwhIiNfnEe-vHqcK68LFRLttNUCXQ0tjomeQki3RDp1IRnkQ1-cR76CdqZMA8WCGAwMAAAGUiIh8sjeeSAD9dnEImqWEGG6f5Ebv6p1jVI9BR7nrB-lW3-PnrI4Qkw',
				  phoneNumber: '123456',
				  password: 'miitangkm3rwbgv7260'
			  }
			  
			  const { phoneNumber, token, chatUserName,password } = data;
			  
			  await loginWithAccessToken(chatUserName, token);
			  this.$store.commit('SET_LOGIN_USER_BASE_INFOS', {
			    loginUserId: chatUserName,
			    phoneNumber: phoneNumber,
			  });
			  this.setEMUserLoginInfosToStorage(chatUserName, token);
			  
	
			} catch (error) {
			  console.log('>>>>>>', error);
			  uni.showToast({
			    title: '登录失败',
			    icon: 'none',
			  });
			}
          // 提交数据
   //        let param = this.form;
   //        let header = {};
   //        let url = config.basePath+"api/user/unified_login"; // 在这里配置您的提交地址
   //        if (!url) {
   //          this.showToast('请先配置表单提交地址', 'none');
   //          return false;
   //        }

   //        let res = await this.$http.post(url, param, header, 'json');
   //        console.log(res)
			  
   //        if (res.code == 1) {
			// var data = res.data;
			// uni.setStorageSync('userInfo', data.user_info);
			// uni.setStorageSync('token', data.token);
			// if(data.is_new_user){
			// 	uni.navigateTo({
			// 		url:"./upload_detail"
			// 	})
			// }else{
			// 	uni.navigateTo({
			// 		url:"./index"
			// 	})
			// }
			
   //          this.showToast(res.message, 'success');
   //        } else {
   //          this.showModal(res.message, '提示', false);
   //        }
        } else {
          console.log('验证失败');
        }
      });
    },
    viewProtocol(type) {
      if (type === 'user') {
        // 跳转到用户协议页面
        uni.navigateTo({
          url: '/pages/protocol/userProtocol'
        });
      } else if (type === 'privacy') {
        // 跳转到隐私政策页面
        uni.navigateTo({
          url: '/pages/protocol/privacyPolicy'
        });
      }
    },
	setEMUserLoginInfosToStorage(userId, token) {
	  const params = {
	    key: `EM_LOGIN_INFOS`,
	    data: { userId: userId, token: token },
	  };
	  uni.setStorage({ ...params });
	},
  }
};
</script>

<style lang="scss" scoped>
	.uni-list-cell:after{
		height:0;
	}
	.agreement {
	  display: flex;
	  align-items: center;
	  margin-top: 20px;
	}
	
	.checkbox {
	  margin-right: 10px;
	}
	
	.link {
	  color: #1e90ff;
	}
	
	.clearfix::after {
	  content: "";
	  display: block;
	  clear: both;
	}
	.u-border:after{
		border:0px;
	}
	.u-input{
		  border: 0px;
	}
	.image-clz {
		flex-shrink: 0;
		top: 204rpx;
		left: 254rpx;
		width: 244rpx !important;
		position: relative;
		text-align: center;
	}
	// margin: 0 auto;
	.text-clz {
		color: #333333;
		font-size: 56rpx !important;
		margin-right: 10rpx;
		margin-left: 10rpx;
		flex-shrink: 0;
		top: 350rpx;
		left: 302rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		font-family: 黑体;
		margin-top: 10rpx;
		position: sticky;
		margin-bottom: 10rpx;
		height: 60rpx !important;
		text-align: center;
	}
	
	.text1-clz {
		color: #666666;
		letter-spacing: 20rpx !important;
		font-size: 32rpx !important;
		margin-right: 10rpx;
		margin-left: 10rpx;
		flex-shrink: 0;
		top: 442rpx;
		left: 140rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		font-family: 楷体;
		margin-top: 10rpx;
		position: sticky;
		margin-bottom: 10rpx;
		height: 44rpx !important;
		text-align: center;
	}
	.form-clz {
		margin-left: 8rpx;
		top: 594rpx;
		left: 0rpx;
		width: calc(100% - 8rpx - 10rpx) !important;
		margin-top: 10rpx;
		position: sticky;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.input-clz {
		margin-left: 10rpx;
		flex-shrink: 0;
		width: calc(100% - 10rpx - 10rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		border-bottom: 2rpx solid #eee;
		text-align: center;
		margin-right: 10rpx;
	}
	.input1-clz {
		margin-left: 10rpx;
		flex-shrink: 0;
		width: calc(100% - 10rpx - 10rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		border-bottom: 2rpx solid #eee;
		margin-right: 10rpx;
	}
	.text2-clz {
		margin-left: 10rpx;
		color: #666666;
		width: calc(100% - 10rpx - 10rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		text-align: right;
		margin-right: 10rpx;
	}
	.btn-clz {
		padding-top: 20rpx;
		border-bottom-left-radius: 64rpx;
		color: #fff;
		padding-left: 20rpx;
		font-size: 32rpx !important;
		padding-bottom: 20rpx;
		line-height: 2;
		border-top-right-radius: 64rpx;
		margin-right: 10rpx;
		background-color: #16c7ff;
		margin-left: 10rpx;
		flex-shrink: 0;
		overflow: hidden;
		width: calc(100% - 10rpx - 10rpx) !important;
		border-top-left-radius: 64rpx;
		margin-top: 80rpx;
		border-bottom-right-radius: 64rpx;
		margin-bottom: 10rpx;
		height: 96rpx !important;
		text-align: center;
		padding-right: 20rpx;
	}
	.checkbox-clz {
		margin-left: 10rpx;
		bottom: 100rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		margin-top: 10rpx;
		position: absolute;
		margin-bottom: 80rpx;
		margin-right: 10rpx;
	}
	.container331385 {
	}
	.agreement{
		position: absolute;
		bottom: 10%;
		left: 10%;
	} 
</style>
