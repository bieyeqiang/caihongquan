<template>
	<view class="container container331385">
		<image src="/static/b619fa5643d7d65148c208b18f887b75.png" class="response diygw-col-24 image-clz" mode="widthFix"></image>
		<text class="diygw-col-24 text-clz app_name"> 彩虹圈 </text>
		<text class="diygw-col-24 text1-clz"> 彩虹世界·幸福就好 </text>
		<u-form :model="form" :rules="formRules" :errorType="['message', 'toast']" ref="formRef" class="flex diygw-form diygw-col-24 form-clz">
			<u-form-item class="diygw-col-24 input-clz" labelPosition="top" prop="input">
				<u-input :focus="formData.inputFocus" placeholder="请输入账号" v-model="form.input"></u-input>
			</u-form-item>
			<u-form-item class="diygw-col-24 input1-clz" labelPosition="top" prop="input1">
				<u-input :focus="formData.input1Focus" placeholder="请输入密码" v-model="form.input1" type="password" :password-icon="true"></u-input>
			</u-form-item>
			<text class="diygw-col-24 text2-clz"> 忘记密码 </text>
			<button class="diygw-col-24 btn-clz diygw-btn-default">登录/注册</button>
		</u-form>
		<u-form-item class="diygw-col-24 checkbox-clz" :borderBottom="false" labelPosition="top" prop="checkbox">
			<u-checkbox-group class="flex flex-wrap diygw-col-24 justify-between" wrapClass=" justify-between" v-model="checkbox">
				<u-checkbox v-for="(checkboxitem, checkboxindex) in checkboxDatas" :key="checkboxindex" :name="checkboxitem.value">
					{{checkboxitem.label}}
				</u-checkbox>
			</u-checkbox-group>
		</u-form-item>
		<view class="clearfix"></view>
	</view>
</template>

<script>
	import { setCurrentPage } from "@/common/Page.js";
	export default {
		data() {
			return {
				//用户全局信息
				userInfo: {},
				//页面传参
				globalOption: {},
				//自定义全局变量
				globalData: {},
				checkboxDatas: [{ value: '1', label: '请认真阅读并同意《用户服务协议》' }],
				checkbox: [],
				form: {
					input: '',
					input1: ''
				},
				formRules: {},
				formData: {
					inputFocus: false,
					input1Focus: false
				}
			};
		},
		onShow() {
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
			async init() {
				await this.initResetform();
			},
			initResetform() {
				this.initform = JSON.stringify(this.form);
				//如果想给表单默认初始值，其中row为某一行数据也可能是API返回的结果集，然后给到this.form
				//this.form = this.$tools.changeRowToForm(row,this.form)
			},
			resetForm() {
				this.form = JSON.parse(this.initform);
			},

			async submitForm(e) {
				this.$refs.formRef?.setRules(this.formRules);

				this.$nextTick(async () => {
					let valid = await this.$refs.formRef.validate();
					if (valid) {
						//保存数据
						let param = this.form;
						let header = {};
						let url = '';
						if (!url) {
							this.showToast('请先配置表单提交地址', 'none');
							return false;
						}

						let res = await this.$http.post(url, param, header, 'json');

						if (res.code == 200) {
							this.showToast(res.msg, 'success');
						} else {
							this.showModal(res.msg, '提示', false);
						}
					} else {
						console.log('验证失败');
					}
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
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
		margin-top:336rpx;
		// position: sticky;
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
</style>
