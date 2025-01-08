<template>
	<view class="container container331385">
		<u-navbar :isFixed="true" :isMarginRight="false" :borderBottom="false" title="" :background="{}" :backTextStyle="{ color: 'inherit' }" backIconColor="#fff" titleColor="inherit" :isHome="false" :isBack="false">
			<view class="flex align-center diygw-text-md text-bold align-center flex-nowrap diygw-col-24"> </view>
		</u-navbar>
		<u-navbar titleWidth="500" :isFixed="true" :isSlotTitle="true" title="完善资料" :borderBottom="false" :background="{ background: 'none !important' }" titleColor="inherit" backIconColor="inherit" :backTextStyle="{ color: 'inherit' }" :isHome="false" :isBack="true">
			<template v-slot:title> 完善资料 </template>
		</u-navbar>
		<u-form-item :borderBottom="false" @click="chooseImage" class="diygw-col-16 upload-clz diygw-form-item-notpadding" labelPosition="top" prop="avatar">
			<view width="220rpx" height="220rpx" customBtn margin="0" maxCount="1"  action="" v-model="upload">
				<u-image :src="avatar" class="avatar-img" width="220rpx" height="220rpx" ></u-image> 
			</view>
		</u-form-item>
		<u-form :model="form" :rules="formRules" :errorType="message" ref="formRef" class="flex diygw-form diygw-col-24 form-clz">
			<text class="diygw-col-24 text-clz"> 起个好听的名字吧 </text>
			<view class="flex flex-wrap diygw-col-24 flex-clz">
				<u-form-item class="diygw-col-21 input-clz" labelPosition="top" prop="nickname">
					<u-input :focus="formData.inputFocus" class="nick_name" placeholder="请输入昵称" v-model="form.nickname"></u-input>
				</u-form-item>
				<text class="flex icon diygw-col-3 icon-clz diy-icon-refresh"></text>
			</view>
			<text class="diygw-col-24 text1-clz"> 你的性别（性别不能修改，谨慎选择） </text>
			<view class="flex flex-wrap diygw-col-24 flex1-clz">
				<button class="diygw-col-5 btn2-clz diygw-btn-default" @click="btnChange" data-gender="0" :class="[isactive==0?'btn_active':'']">0</button>
				<button class="diygw-col-5 btn3-clz diygw-btn-default" @click="btnChange" data-gender="1" :class="[isactive==1?'btn_active':'']">1</button>
				<button class="diygw-col-5 btn1-clz diygw-btn-default" @click="btnChange" data-gender="10" :class="[isactive==10?'btn_active':'']">10</button>
			</view>
			<text class="diygw-col-24 text3-clz"> 你的生日（可以帮你推荐更合适的心上人） </text>
			<!-- <text class="diygw-col-24 text2-clz"> </text> -->
				<view class="birthday">
						<view class="">
							<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
								<view class="uni-input dates">{{date}}</view>
							</picker>
						</view>
				</view>
			<button class="diygw-col-24 btn-clz diygw-btn-default" @click="uploadDetail">完成注册</button>
		</u-form>
		<view class="clearfix"></view>
	</view>
</template>

<script>
	import common from "../../common/js/common.js";
	import config from "../../siteinfo.js";
	
	export default {
		data() {
	         const currentDate = this.getDate({
	                    format: true
	         })
			return {
				//用户全局信息
				userInfo: {},
				//页面传参
				globalOption: {},
				//自定义全局变量
				globalData: {},
				message:'toast',
				avatar:'/static/34e4b24d1c5bf18184d7d18fea013df8.png',
				upload: '',
				newavatar:"",
				presignedUrl:"",
				file:{},
				btn_active:"btn_active",
				isactive:0,
				form: {
					nickname: '',
					avatar:'/static/34e4b24d1c5bf18184d7d18fea013df8.png',
					gender:"0",
					birthday:currentDate
				},
				date:currentDate,
				formRules: {
					  
					        nickname: [
					          { required: true, message: '昵称不能为空！', trigger: 'blur' },
					          { min: 3, max: 15, message: '昵称长度应为 3 到 15 个字符', trigger: 'blur' }
					        ],
					        avatar: [
					          { required: true, message: '头像不能为空', trigger: 'blur' }
					        ],
					        gender: [
					          { required: true, message: '性别不能为空', trigger: 'blur' },
					        ],
							birthday: [
							  { required: true, message: '生日不能为空', trigger: 'blur' },
							]
					 
				},
				formData: {
					inputFocus: false,
					showDate: false
				},
				
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
			// this.$refs.formRef?.setRules(this.formRules);
		},
		computed: {
		        startDate() {
		            return this.getDate('start');
		        },
		        endDate() {
		            return this.getDate('end');
		        }
		    },

		methods: {
			async init() {
				await this.initResetform();
			},
			bindDateChange: function(e) {
			            this.form.birthday = e.detail.value
			},
			btnChange:function(e){
				 const gender = event.target.dataset.gender;
				 this.isactive = gender
				 this.form.gender = gender
				console.log(gender)
			},
			 getDate(type) {
			   const date = new Date();
			   let year = date.getFullYear();
			   let month = date.getMonth() + 1;
			   let day = date.getDate();
			
			   if (type === 'start') {
			       year = year - 60;
			    } else if (type === 'end') {
			       year = year + 2;
			            }
			            month = month > 9 ? month : '0' + month;
			            day = day > 9 ? day : '0' + day;
			            return `${year}-${month}-${day}`;
			},
			chooseImage() {
				var that  = this;
			      uni.chooseImage({
			        count: 1, // 选择图片的数量
			        success: (res) => {
			          const tempFilePath = res.tempFilePaths[0]; // 获取选中的图片路径
					  that.avatar = tempFilePath
					 var  content_type = res.tempFiles[0].type
					 var  name = res.tempFiles[0].name
					 this.file =  res.tempFiles[0];
					 // this.uploadToS3H5();
					 this.getUploadUrl(content_type,name);
			        }
			      });
		   },
		   uploadImage() {
			   console.log(this.file.type,"@@@@@@@@");
			    const that = this;
			    const reader = new FileReader();
				const fileType =  this.file.type;
				const presignedUrl = this.presignedUrl;
				reader.onload = function (e) {
				      const fileData = e.target.result; // This is the ArrayBuffer or Blob (depends on how it's read)
				
				      // Get the pre-signed URL (this URL should be generated server-side)
				       // Assume this is the pre-signed URL you obtained
				
				      // Perform PUT request to upload file
				      uni.request({
				        url: presignedUrl, // Pre-signed URL for PUT request
				        method: 'PUT',
				        header: {
				          'Content-Type': fileType, // Content-Type must match the file type
				        },
				        data: fileData, // The file data as ArrayBuffer or Blob
				        success: (uploadRes) => {
							if(uploadRes.statusCode==200){
								that.showToast("上传成功", 'success');
								that.avatar  = that.newavatar;
								
								that.form.avatar = that.newavatar;
							}
				          console.log('File uploaded successfully:', uploadRes);
				        },
				        fail: (err) => {
				          console.error('File upload failed:', err);
				        },
				      });
				    };
				
				    // Read the file as ArrayBuffer
				    reader.readAsArrayBuffer(this.file);
		        
		     },
			uploadDetail(){
				this.submitForm();
			},
			getUploadUrl(content_type,filename){
				let that = this
				this.$nextTick(async () => {
						let token = uni.getStorageSync("token");
						console.log(token)
						let  newFileName= common.generateUniqueFileName(filename);
						//保存数据body: 
						let param = JSON.stringify({
							filename:newFileName,
							contentType: content_type,
							directory: 'images/user-uploads'
						});
						let header = {
							  'Content-Type': 'application/json',
							  'Authorization': `Bearer ${token}`
							  };
						let url = config.basePath+"api/upload/presigned";
						if (!url) {
							this.showToast('请先配置表单提交地址', 'none');
							return false;
						}
						let res = await this.$http.post(url, param, header, 'json');
						if (res.code == 0) {
							this.presignedUrl = res.data.presignedUrl;
							this.newavatar = res.data.fileUrl
							this.uploadImage();
							return res
						}else {
							this.showModal(res.message, '提示', false);
						}
				});
			},
			changeFormDate(evt) {
				this.form.birthday = evt.result;
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
				// this.$refs.formRef?.setRules(this.formRules);
                 const that = this;
				this.$nextTick(async () => {
					let valid = await this.$refs.formRef.validate();
					if (valid) {
						let token = uni.getStorageSync("token");
						console.log(token)
						//保存数据
						let param = this.form;
						let header = {
							  'Content-Type': 'application/json',
							  'Authorization': `Bearer ${token}`
							  };
							  console.log("****************",header)
						let url = config.basePath+"api/user/update";
						if (!url) {
							this.showToast('请先配置表单提交地址', 'none');
							return false;
						}

						let res = await this.$http.post(url, param, header, 'json');

						if (res.code == 200) {
							const userinfo = uni.getStorageSync('userInfo');
							console.log(userinfo,"*******");
							userinfo.nickname = that.form.nickname;
							userinfo.avatar = that.form.avatar;
							userinfo.gender = that.form.gender
							userinfo.birthday = that.form.birthday
							
							uni.setStorageSync('userInfo',userinfo);
							// uni.setStorageSync('token', data.token);
							that.showToast("注册成功", 'success');
							setTimeout(function(e){
								uni.switchTab({
									url: './index'
								});
							},1000)
						} else {
							this.showModal(res.message, '提示', false);
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
	.birthday{
		width: 594rpx;
		height: 79.9rpx;
		background-color: #f6f7f9;
		// margin: 0 auto;
		border-radius: 79.9rpx;
		padding-left:29rpx;
		box-sizing: border-box;
		position: relative;
	}
		
	.birthday::after{
		content: "";
		width: 29rpx;
		height:29rpx;
		background: url("/static/Icons2.png") no-repeat center center;
		position:absolute;
		left:579rpx;
		// background:#ccc;
		top:25.43rpx
	}
	.dates{
		background-color: #f6f7f9;
		border-radius: 79.9rpx;
		width: 594rpx;
		height: 79.9rpx;
		// margin-left:;
	}
	.upload-clz {
		margin-left: 255rpx;
		background-size: 100% 100%;
		flex: 1;
		width: calc(66.6666666667% - 255rpx - 0rpx) !important;
		margin-top: 224.2rpx;
		background-image: url(/static/xj.png);
		background-position: top center;
		position: relative;
		margin-bottom: 0rpx;
		margin-right: 0rpx;
	}
	.picker-view {
			width: 750rpx;
			height: 600rpx;
			margin-top: 20rpx;
		}
		.item {
			line-height: 100rpx;
			text-align: center;
		}
	.upload-clz::after{
		width:83.6rpx;
		height:83.6rpx;
		background:rgba(0,0,0,0.3);
		content:"";
		position: absolute;
		top: 85px;
		left: 75px;
		border-radius: 46px;
		background: url(/static/Camera.png) no-repeat center center;
		z-index: 101;
	}
	.upload-clz::before{
		width:83.6rpx;
		height:83.6rpx;
		background:rgba(0,0,0,0.3);
		content:"";
		position: absolute;
		top: 85px;
		left: 75px;
		border-radius: 46px;
		z-index: 100;
	}
	.uploadimage {
		width: 120px;
		height: 120px;
	}
	.form-clz {
	    margin-left: 24px;
	    top: 44px;
	    left: 0px;
	    width: calc(100% - 24px - 24px) !important;
	    margin-top: 5px;
	    position: relative;
	    margin-bottom: 5px;
	    margin-right: 24px;
	
	}
	.text-clz {
		margin-left: 10rpx;
		color: #999999;
		width: calc(100% - 10rpx - 10rpx) !important;
		font-size: 28rpx !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.flex-clz {
		padding-top: -4rpx;
		border-bottom-left-radius: 44rpx;
		padding-left: 20rpx;
		padding-bottom: 0rpx;
		border-top-right-radius: 44rpx;
		margin-right: 10rpx;
		background-color: #f6f7f9;
		margin-left: 10rpx;
		
		flex-shrink: 0;
		overflow: hidden;
		width: calc(100% - 10rpx - 10rpx) !important;
		border-top-left-radius: 44rpx;
		margin-top: 16rpx;
		border-bottom-right-radius: 44rpx;
		margin-bottom: 10rpx;
		height: 88rpx !important;
		padding-right: 20rpx;
	}
	.input-clz {
		flex-shrink: 0;
		
		height: 88rpx !important;
		text-align: center;
		padding-right: 10rpx;
		margin-top:-9rpx;
		
	}

	.icon-clz {
		margin-left: 20rpx;
		padding-top: 10rpx;
		padding-left: 10rpx;
		width: calc(12.5% - 20rpx - 10rpx) !important;
		padding-bottom: 10rpx;
		margin-top: 20rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
		padding-right: 10rpx;
	}
	.icon {
		font-size: 32rpx;
	}
	.text1-clz {
		margin-left: 10rpx;
		color: #999999;
		width: calc(100% - 10rpx - 10rpx) !important;
		font-size: 28rpx !important;
		margin-top: 48rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.flex1-clz {
		margin-left: 10rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		margin-top: 16rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.u-border{
		border:none;
	}

	.btn2-clz {
		padding-top: 20rpx;
		border-bottom-left-radius: 44rpx;
		padding-left: 20rpx;
		font-size: 32rpx !important;
		padding-bottom: 20rpx;
		border-top-right-radius: 44rpx;
		margin-right: 10rpx;
		margin-left: 10rpx;
		flex-shrink: 0;
		overflow: hidden;
		background-color: #f6f7f9;
		color: #333333;
		width: calc(20.8333333333% - 10rpx - 10rpx) !important;
		border-top-left-radius: 44rpx;
		margin-top: 10rpx;
		border-bottom-right-radius: 44rpx;
		margin-bottom: 10rpx;
		text-align: center;
		padding-right: 20rpx;
	}
	.u-upload__wrap{
		width: 240rpx;
		height:240rpx;
	}
	.u-upload__button{
		width:100%;
		height:100%;
	}
	.avatar-img{
		border-radius:240rpx;
		overflow:hidden;
	}
	.btn3-clz {
		padding-top: 20rpx;
		border-bottom-left-radius: 44rpx;
		padding-left: 20rpx;
		font-size: 32rpx !important;
		padding-bottom: 20rpx;
		border-top-right-radius: 44rpx;
		margin-right: 10rpx;
		background-color: #f6f7f9;
		color: #333333;
		margin-left: 10rpx;
		flex-shrink: 0;
		overflow: hidden;
		width: calc(20.8333333333% - 10rpx - 10rpx) !important;
		border-top-left-radius: 44rpx;
		margin-top: 10rpx;
		border-bottom-right-radius: 44rpx;
		margin-bottom: 10rpx;
		text-align: center;
		padding-right: 20rpx;
	}
	.btn1-clz {
		padding-top: 20rpx;
		border-bottom-left-radius: 44rpx;
		color: #333333;
		background-color: #f6f7f9;
		padding-left: 20rpx;
		font-size: 32rpx !important;
		padding-bottom: 20rpx;
		border-top-right-radius: 44rpx;
		margin-right: 10rpx;
		background-color: #f6f7f9;
		margin-left: 10rpx;
		flex-shrink: 0;
		overflow: hidden;
		width: calc(20.8333333333% - 10rpx - 10rpx) !important;
		border-top-left-radius: 44rpx;
		margin-top: 10rpx;
		border-bottom-right-radius: 44rpx;
		margin-bottom: 10rpx;
		text-align: center;
		padding-right: 20rpx;
	}
	.btn_active{
		background-color: #16c7ff;
		color: #fff;
	}
	.text3-clz {
		margin-left: 10rpx;
		color: #999999;
		width: calc(100% - 10rpx - 10rpx) !important;
		font-size: 28rpx !important;
		margin-top: 48rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.text2-clz {
		font-size: 28rpx !important;
	}
	.date-clz {
		padding-top: 10rpx;
		border-bottom-left-radius: 44rpx;
		color: #2a2929;
		padding-left: 10rpx;
		font-size: 32rpx !important;
		padding-bottom: 10rpx;
		border-top-right-radius: 44rpx;
		margin-right: 10rpx;
		background-color: #f6f7f9;
		margin-left: 10rpx;
		flex-shrink: 0;
		overflow: hidden;
		width: calc(100% - 10rpx - 10rpx) !important;
		border-top-left-radius: 44rpx;
		margin-top: 16rpx;
		border-bottom-right-radius: 44rpx;
		margin-bottom: 10rpx;
		height: 88rpx !important;
		padding-right: 10rpx;
	}
	.btn-clz {
		padding-top: 20rpx;
		border-bottom-left-radius: 200rpx;
		color: #fff;
		padding-left: 20rpx;
		font-size: 32rpx !important;
		padding-bottom: 20rpx;
		border-top-right-radius: 200rpx;
		margin-right: 10rpx;
		background-color: #16c7ff;
		margin-left: 10rpx;
		flex-shrink: 0;
		overflow: hidden;
		width: calc(100% - 10rpx - 10rpx) !important;
		border-top-left-radius: 200rpx;
		margin-top: 80rpx;
		border-bottom-right-radius: 200rpx;
		margin-bottom: 10rpx;
		height: 88rpx !important;
		text-align: center;
		padding-right: 20rpx;
	}
	.container331385 {
	}
</style>
