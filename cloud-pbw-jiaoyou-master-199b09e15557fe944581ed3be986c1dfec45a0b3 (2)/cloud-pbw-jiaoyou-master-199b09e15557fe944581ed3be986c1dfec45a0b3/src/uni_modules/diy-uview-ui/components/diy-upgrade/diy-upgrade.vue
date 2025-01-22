<template>
	<view class="mask flex-center" v-if="showUpdate">
		<view class="content botton-radius" :class="[image?'':'no-imgae']">
			<view class="content-top" >
				<view class="content-top-text">
					<text>{{title}}</text>
					<text class="content-top-text-version">v.{{version}}</text>
				</view>
				<image v-if="image" class="content-top" style="top: 0;" width="100%" height="100%"
					:src='image'>
				</image>
				<view v-else  class="content-top" style="top: 0;" width="100%" height="100%"></view>
			</view>
			<view v-if="image"  class="content-header"></view>
			<view class="content-body">
				<slot></slot>
				<view class="body" v-if="contents">
					<scroll-view class="box-des-scroll" scroll-y="true">
						<rich-text :nodes="contents"></rich-text>
					</scroll-view>
				</view>
				<view class="footer flex-center">
					<template v-if="isAppStore">
						<button class="content-button" :style="btnStyle"  style="border: none;color: #fff;" plain @click="jumpToAppStore">
							{{downLoadBtnTextiOS}}
						</button>
					</template>
					<template v-else>
						<template v-if="!downloadSuccess">
							<view class="progress-box flex-column" v-if="downloading">
								<progress class="progress" border-radius="35" :percent="downLoadPercent"
									:activeColor="btnBgColor" show-info stroke-width="10" />
								<view class="flex flex-center" style="width:100%;font-size: 28rpx;display: flex;justify-content: space-around;">
									<text>{{downLoadingText}}</text>
									<text>({{downloadedSize}}/{{packageFileSize}}M)</text>
								</view>
							</view>

							<button v-else class="content-button"  :style="btnStyle" style="border: none;color: #fff;" plain
								@click="updateApp">
								{{downLoadBtnText}}
							</button>
						</template>
						<button v-else-if="downloadSuccess && !installed"  :style="btnStyle" class="content-button"
							style="border: none;color: #fff;" plain :loading="installing" :disabled="installing"
							@click="installPackage">
							{{installing ? '正在安装……' : '下载完成，立即安装'}}
						</button>
						<button v-if="installed && isWGT" :style="btnStyle" class="content-button" style="border: none;color: #fff;" plain
							@click="restart">
							安装完毕，点击重启
						</button>
					</template>
				</view>
			</view>
			<text v-if="!isMandatory" class="close-img diy-icon-close" @click.stop="closeUpdate"></text>
		</view>
	</view>
</template>

<script>
	const localFilePathKey = 'UNI_ADMIN_UPGRADE_CENTER_LOCAL_FILE_PATH'
	const platform_iOS = 'iOS';
	let downloadTask = null;
	let openSchemePromise

	/**
	 * 对比版本号，如需要，请自行修改判断规则
	 * 支持比对	("3.0.0.0.0.1.0.1", "3.0.0.0.0.1")	("3.0.0.1", "3.0")	("3.1.1", "3.1.1.1") 之类的
	 * @param {Object} v1
	 * @param {Object} v2
	 * v1 > v2 return 1
	 * v1 < v2 return -1
	 * v1 == v2 return 0
	 */
	function compare(v1 = '0', v2 = '0') {
		v1 = String(v1).split('.')
		v2 = String(v2).split('.')
		const minVersionLens = Math.min(v1.length, v2.length);

		let result = 0;
		for (let i = 0; i < minVersionLens; i++) {
			const curV1 = Number(v1[i])
			const curV2 = Number(v2[i])

			if (curV1 > curV2) {
				result = 1
				break;
			} else if (curV1 < curV2) {
				result = -1
				break;
			}
		}

		if (result === 0 && (v1.length !== v2.length)) {
			const v1BiggerThenv2 = v1.length > v2.length;
			const maxLensVersion = v1BiggerThenv2 ? v1 : v2;
			for (let i = minVersionLens; i < maxLensVersion.length; i++) {
				const curVersion = Number(maxLensVersion[i])
				if (curVersion > 0) {
					v1BiggerThenv2 ? result = 1 : result = -1
					break;
				}
			}
		}

		return result;
	}

	export default {
		props: {
			//更新图片
			image: {
				type: String,
				default: ''
			},
			//版本更新较验地址
			upgradeUrl:{
				type: String,
				default: ''
			},
			// 进度条颜色
			btnBgColor:{
				default: '#19be6b',
				type: String
			},
			//关闭自动更新
			isMandatory:{
				default: false,
				type: Boolean
			}
		},
		data() {
			return {
				showUpdate:false,
				// 更新的版本号
				version: '',
				// 系统环境
				platform: '',
				// 下载链接
				url: '',
				// 跳转的应用市场列表
				storeList: [],
				type:'',
				// 从之前下载安装
				installForBeforeFilePath: '',
				// 安装
				installed: false,
				installing: false,
				// 下载
				downloadSuccess: false,
				downloading: false,
				downLoadPercent: 0,
				downloadedSize: 0,
				packageFileSize: 0,
				tempFilePath: '', // 要安装的本地包地址
				// 默认安装包信息
				title: '版本更新',
				contents: '',
				// 可自定义属性
				downLoadBtnTextiOS: '立即跳转更新',
				downLoadBtnText: '立即下载更新',
				downLoadingText: '安装包下载中，请稍后',
				pageLevelNum: 0
			}
		},
		onBackPress() {
			// 强制更新不允许返回
			if (this.isMandatory) {
				return true
			}
			downloadTask && downloadTask.abort()
		},
		onHide() {
			openSchemePromise = null
		},
		mounted() {
			this.init()
		},
		computed: {
			isWGT() {
				return this.type === 'wgt'
			},
			isiOS() {
				return !this.isWGT ? this.platform.includes(platform_iOS) : false;
			},
			isAppStore() {
				return this.isiOS || (!this.isiOS && !this.isWGT && this.url.indexOf('.apk') === -1)
			},
			btnStyle(){
				return this.btnBgColor?{background:this.btnBgColor}:{}
			}
		},
		methods: {
			// 获取更新内容片段
			getContentHTML(content) {
				let contentArr = content.split('\n');
				return contentArr.map(item => `<p>${item}</p>`).join('\n')
			},
			async init(){
				// #ifdef APP-PLUS
				let thiz = this;
				if(!thiz.upgradeUrl){
					console.log('请配置版本较验地址')
					console.log("{url:'你的APK下越地址',version:'1.0.1',title:'版本更新',contents:'版本更新内容'}")
					uni.showToast({
						title:'请配置版本较验地址'
					})
					return;
				}
				uni.getSystemInfo({
					success: (res) => {
						let platform = res.platform;
						// 获取本机版本号
						plus.runtime.getProperty(plus.runtime.appid,async (wgtinfo) => {
							thiz.versionCode = wgtinfo.versionCode;
							let res = await getApp().globalData.currentPage.$http.post(thiz.upgradeUrl,{
								appid: plus.runtime.appid,
								platform,
								version: plus.runtime.version,
								wgtVersion: wgtinfo.version
							})
							res = res.data;
							console.log(res)
							//如果API返回新的地址，并判断版本是否相同
							if(res.url){
								thiz.url = res.url
								thiz.version = res.version
								//判断API返回的版本是不是大于系统版本
								if(compare(thiz.version,wgtinfo.version)){
									// 跳转的应用市场列表
									thiz.storeList = res.store_list || [];
									thiz.title = res.title || '发现新版本';
									thiz.type = res.type;
									if(res.contents){
										thiz.contents =  thiz.getContentHTML(res.contents)
									}
									// thiz.isMandatory = res.isMandatory||false
									this.checkLocalStoragePackage()
								}
							}
						});
					},
					fail(e){
						console.log(e)
					}
				});
				// #endif
			},
			goBack() {
				this.showUpdate = false
			},
			checkLocalStoragePackage() {
				// 如果已经有下载好的包，则直接提示安装
				const localFilePathRecord = uni.getStorageSync(localFilePathKey)
				if (localFilePathRecord) {
					const {
						version,
						savedFilePath,
						installed
					} = localFilePathRecord

					// 比对版本
					if (!installed && compare(version, this.version) === 0) {
						this.downloadSuccess = true;
						this.installForBeforeFilePath = savedFilePath;
						this.tempFilePath = savedFilePath
					} else {
						// 如果保存的包版本小 或 已安装过，则直接删除
						this.deleteSavedFile(savedFilePath)
					}
				}
				this.showUpdate = true;
			},
			async closeUpdate() {
				if (this.downloading) {
					if (this.isMandatory) {
						return uni.showToast({
							title: '下载中，请稍后……',
							icon: 'none',
							duration: 500
						})
					}
					uni.showModal({
						title: '是否取消下载？',
						cancelText: '否',
						confirmText: '是',
						success: res => {
							if (res.confirm) {
								downloadTask && downloadTask.abort()
								this.goBack()
							}
						}
					});
					return;
				}

				if (this.downloadSuccess && this.tempFilePath) {
					// 包已经下载完毕，稍后安装，将包保存在本地
					await this.saveFile(this.tempFilePath, this.version)
					this.goBack()
					return;
				}

				this.goBack()
			},
			updateApp() {
				this.checkStoreScheme().catch(() => {
					this.downloadPackage()
				})
			},
			// 跳转应用商店
			checkStoreScheme() {
				const storeList = (this.store_list || []).filter(item => item.enable)
				if (storeList && storeList.length) {
					storeList
						.sort((cur, next) => next.priority - cur.priority)
						.map(item => item.scheme)
						.reduce((promise, cur, curIndex) => {
							openSchemePromise = (promise || (promise = Promise.reject())).catch(() => {
								return new Promise((resolve, reject) => {
									plus.runtime.openURL(cur, (err) => {
										reject(err)
									})
								})
							})
							return openSchemePromise
						}, openSchemePromise)
					return openSchemePromise
				}

				return Promise.reject()
			},
			downloadPackage() {
				this.downloading = true;
				//下载包
				downloadTask = uni.downloadFile({
					url: this.url,
					success: res => {
						if (res.statusCode == 200) {
							this.downloadSuccess = true;
							this.tempFilePath = res.tempFilePath
							// 强制更新，直接安装
							if (this.isMandatory) {
								this.installPackage();
							}
						}
					},
					complete: () => {
						this.downloading = false;

						this.downLoadPercent = 0
						this.downloadedSize = 0
						this.packageFileSize = 0

						downloadTask = null;
					}
				});

				downloadTask.onProgressUpdate(res => {
					this.downLoadPercent = res.progress;
					this.downloadedSize = (res.totalBytesWritten / Math.pow(1024, 2)).toFixed(2);
					this.packageFileSize = (res.totalBytesExpectedToWrite / Math.pow(1024, 2)).toFixed(2);
				});
			},
			installPackage() {
				// #ifdef APP-PLUS
				// wgt资源包安装
				if (this.isWGT) {
					this.installing = true;
				}
				plus.runtime.install(this.tempFilePath, {
					force: false
				}, async res => {
					this.installing = false;
					this.installed = true;

					// wgt包，安装后会提示 安装成功，是否重启
					if (this.isWGT) {
						// 强制更新安装完成重启
						if (this.isMandatory) {
							uni.showLoading({
								icon: 'none',
								title: '安装成功，正在重启……'
							})

							setTimeout(() => {
								uni.hideLoading()
								this.restart();
							}, 1000)
						}
					} else {
						const localFilePathRecord = uni.getStorageSync(localFilePathKey)
						uni.setStorageSync(localFilePathKey, {
							...localFilePathRecord,
							installed: true
						})
					}
				}, async err => {
					// 如果是安装之前的包，安装失败后删除之前的包
					if (this.installForBeforeFilePath) {
						await this.deleteSavedFile(this.installForBeforeFilePath)
						this.installForBeforeFilePath = '';
					}

					// 安装失败需要重新下载安装包
					this.installing = false;
					this.installed = false;

					uni.showModal({
						title: '更新失败，请重新下载',
						content: err.message,
						showCancel: false
					});
				});

				// 非wgt包，安装跳出覆盖安装，此处直接返回上一页
				if (!this.isWGT && !this.isMandatory) {
					this.goBack()
				}
				// #endif
			},
			restart() {
				this.installed = false;
				// #ifdef APP-PLUS
				//更新完重启app
				plus.runtime.restart();
				// #endif
			},
			saveFile(tempFilePath, version) {
				return new Promise((resolve, reject) => {
					uni.saveFile({
						tempFilePath,
						success({
							savedFilePath
						}) {
							uni.setStorageSync(localFilePathKey, {
								version,
								savedFilePath
							})
						},
						complete() {
							resolve()
						}
					})
				})
			},
			deleteSavedFile(filePath) {
				uni.removeStorageSync(localFilePathKey)
				return uni.removeSavedFile({
					filePath
				})
			},
			jumpToAppStore() {
				plus.runtime.openURL(this.url);
			}
		}
	}
</script>

<style>
	page {
		background: transparent;
	}

	.flex-center {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
	}

	.mask {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, .65);
	}

	.botton-radius {
		border-radius: 30rpx;
	}

	.content {
		position: relative;
		top: 0;
		width: 600rpx;
		background-color: #fff;
		box-sizing: border-box;
		padding: 0 50rpx;
		font-family: Source Han Sans CN;
	}

	.text {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		line-height: 200px;
		text-align: center;
		color: #FFFFFF;
	}

	.content-top {
		position: absolute;
		top: -195rpx;
		left: 0;
		width: 600rpx;
		height: 270rpx;
	}

	.content-top-text {
		font-size: 45rpx;
		font-weight: bold;
		color: #F8F8FA;
		position: absolute;
		top: 120rpx;
		left: 50rpx;
		z-index: 1;
		.content-top-text-version{
			font-size: 24rpx;
		}
	}
	.no-imgae .content-top{
		padding-top:30px;
		height: auto;
	}
	.no-imgae .content-top,.no-imgae .content-top .content-top-text{
		position: relative;
		top:0;
		left:0;
		color:#000;
		width:100%;
	}
	.content-header {
		height: 70rpx;
	}

	.title {
		font-size: 33rpx;
		font-weight: bold;
		color: #3DA7FF;
		line-height: 38px;
	}

	.footer {
		height: 150rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.box-des-scroll {
		box-sizing: border-box;
		min-height: 100rpx;
		max-height: 400rpx;
		text-align: left;
	}

	.box-des {
		font-size: 26rpx;
		color: #000000;
		line-height: 50rpx;
	}

	.progress-box {
		width: 100%;
	}

	.progress {
		width: 90%;
		height: 40rpx;
		border-radius: 35px;
	}

	.close-img {
		width: 70rpx;
		height: 70rpx;
		z-index: 1000;
		position: absolute;
		bottom: -120rpx;
		left: calc(50% - 70rpx / 2);
		font-size: 60rpx;
		color:#fff;
	}

	.content-button {
		text-align: center;
		flex: 1;
		font-size: 30rpx;
		font-weight: 400;
		color: #FFFFFF;
		border-radius: 40rpx;
		margin: 0 18rpx;
		height: 80rpx;
		line-height: 80rpx;
		background: linear-gradient(to right, #1785ff, #3DA7FF);
	}
	.content-button.button-hover {
	  transform: translate(1rpx, 1rpx);
	}
	.flex-column {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>