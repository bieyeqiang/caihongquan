<template>
	<view class="u-upload">
		<view
			v-if="showUploadList"
			class="u-list-item u-preview-wrap"
			v-for="(item, index) in lists"
			:key="index"
			:style="{
				marginTop: 0,
				marginLeft: 0,
				marginRight: $u.addUnit(margin),
				marginBottom: $u.addUnit(margin),
				width: $u.addUnit(width),
				height: $u.addUnit(height)
			}"
		>
			<view
				v-if="deletable&&!disabled"
				class="u-delete-icon"
				@tap.stop="deleteItem(index)"
				:style="{
					background: delBgColor
				}"
			>
				<u-icon class="u-icon" :name="delIcon" size="20" :color="delColor"></u-icon>
			</view>
			<!-- <view
				v-if="item.progress >= 100"
				class="u-success-icon"
			>
				<u-icon class="u-icon" :name="successIcon" size="20" :color="successColor"></u-icon>
			</view> -->
			<u-line-progress
				v-if="showProgress && item.progress > 0 && item.progress != 100 && !item.error"
				:show-percent="false"
				height="16"
				class="u-progress"
				:percent="item.progress"
			></u-line-progress>
			<view @tap.stop="retry(index)" v-if="item.error" class="u-error-btn">点击重试</view>
			<image @tap.stop="doPreviewImage(item.url || item.path, index)" class="u-preview-image" v-if="!item.isImage" :src="item.url || item.path" :mode="imageMode"></image>
		</view>
		<slot name="file" :file="lists"></slot>
		<view style="display: inline-block;" @tap="selectFile" v-if="maxCount > lists.length&&!disabled">
			<slot name="addBtn"></slot>
			<view
				v-if="!customBtn"
				class="u-list-item u-add-wrap"
				hover-class="u-add-wrap__hover"
				hover-stay-time="150"
				:style="{
					marginTop: 0,
					marginLeft: 0,
					marginRight: $u.addUnit(margin),
					marginBottom: $u.addUnit(margin),
					width: $u.addUnit(width),
					height: $u.addUnit(height)
				}"
			>
				<u-icon name="camera" class="u-add-btn" size="60"></u-icon>
				<!-- <view class="u-add-tips">{{ uploadText }}</view> -->
			</view>
		</view>
	</view>
</template>

<script>
import Emitter from "../../libs/util/emitter.js";
function arraysEqual(arr1, arr2) {  
    if (arr1 === arr2) return true;  
    if (arr1 == null || arr2 == null) return false;  
    if (arr1.length !== arr2.length) return false;  
  
    for (let i = 0; i < arr1.length; ++i) {  
        if (arr1[i] !== arr2[i]) {  
            return false;  
        }  
    }  
    return true;  
}  
/**
 * upload 图片上传
 * @description 该组件用于上传图片场景
 * @tutorial https://www.uviewui.com/components/upload.html
 * @property {String} action 服务器上传地址
 * @property {String Number} max-count 最大选择图片的数量（默认99）
 * @property {Boolean} custom-btn 如果需要自定义选择图片的按钮，设置为true（默认false）
 * @property {Boolean} show-progress 是否显示进度条（默认true）
 * @property {Boolean} disabled 是否启用(显示/移仓)组件（默认false）
 * @property {String} image-mode 预览图片等显示模式，可选值为uni的image的mode属性值（默认aspectFill）
 * @property {String} del-icon 右上角删除图标名称，只能为uView内置图标
 * @property {String} del-bg-color 右上角关闭按钮的背景颜色
 * @property {String | Number} index 在各个回调事件中的最后一个参数返回，用于区别是哪一个组件的事件
 * @property {String} del-color 右上角关闭按钮图标的颜色
 * @property {Object} header 上传携带的头信息，对象形式
 * @property {Object} form-data 上传额外携带的参数
 * @property {String} name 上传文件的字段名，供后端获取使用（默认file）
 * @property {Array<String>} size-type original 原图，compressed 压缩图，默认二者都有（默认['original', 'compressed']）
 * @property {Array<String>} source-type 选择图片的来源，album-从相册选图，camera-使用相机，默认二者都有（默认['album', 'camera']）
 * @property {Boolean} preview-full-image	是否可以通过uni.previewImage预览已选择的图片（默认true）
 * @property {Boolean} multiple	是否开启图片多选，部分安卓机型不支持（默认true）
 * @property {Boolean} deletable 是否显示删除图片的按钮（默认true）
 * @property {String Number} max-size 选择单个文件的最大大小，单位B(byte)，默认不限制（默认Number.MAX_VALUE）
 * @property {Array<Object>} file-list 默认显示的图片列表，数组元素为对象，必须提供url属性
 * @property {Boolean} upload-text 选择图片按钮的提示文字（默认“选择图片”）
 * @property {Boolean} auto-upload 选择完图片是否自动上传，见上方说明（默认true）
 * @property {Boolean} show-tips 特殊情况下是否自动提示toast，见上方说明（默认true）
 * @property {Boolean} show-upload-list 是否显示组件内部的图片预览（默认true）
 * @event {Function} on-oversize 图片大小超出最大允许大小
 * @event {Function} on-preview 全屏预览图片时触发
 * @event {Function} on-remove 移除图片时触发
 * @event {Function} on-success 图片上传成功时触发
 * @event {Function} on-change 图片上传后，无论成功或者失败都会触发
 * @event {Function} on-error 图片上传失败时触发
 * @event {Function} on-progress 图片上传过程中的进度变化过程触发
 * @event {Function} on-uploaded 所有图片上传完毕触发
 * @event {Function} on-choose-complete 每次选择图片后触发，只是让外部可以得知每次选择后，内部的文件列表
 * @event {Function} on-list-change 当内部文件列表被加入文件、移除文件，或手动调用clear方法时触发
 * @event {Function} on-choose-fail 选择文件出错时触发，比如选择文件时取消了操作，只在微信和APP有效
 * @example <u-upload :action="action" :file-list="fileList" ></u-upload>
 */
export default {
	name: "u-upload",
	mixins: [Emitter],
	emits: ["update:modelValue", "change","update:file-list", "on-oversize", "on-list-change", "on-preview", "on-remove", "on-success", "on-change", "on-error", "on-progress", "on-uploaded", "on-choose-complete", "on-choose-fail"],
	props: {
		value: {
			type: [String, Array],
			default: ""
		},
		modelValue: {
			type: [String, Array],
			default: ""
		},
		//是否显示组件自带的图片预览功能
		showUploadList: {
			type: Boolean,
			default: true
		},
		// 后端地址
		action: {
			type: String,
			default: ""
		},
		// 最大上传数量
		maxCount: {
			type: [String, Number],
			default: 52
		},
		//  是否显示进度条
		showProgress: {
			type: Boolean,
			default: true
		},
		// 是否启用
		disabled: {
			type: Boolean,
			default: false
		},
		// 预览上传的图片时的裁剪模式，和image组件mode属性一致
		imageMode: {
			type: String,
			default: "aspectFill"
		},
		// 头部信息
		header: {
			type: Object,
			default() {
				return {};
			}
		},
		// 额外携带的参数
		formData: {
			type: Object,
			default() {
				return {};
			}
		},
		// 上传的文件字段名
		name: {
			type: String,
			default: "file"
		},
		// 所选的图片的尺寸, 可选值为original compressed
		sizeType: {
			type: Array,
			default() {
				return ["original", "compressed"];
			}
		},
		sourceType: {
			type: Array,
			default() {
				return ["album", "camera"];
			}
		},
		// 是否在点击预览图后展示全屏图片预览
		previewFullImage: {
			type: Boolean,
			default: true
		},
		// 是否开启图片多选，部分安卓机型不支持
		multiple: {
			type: Boolean,
			default: true
		},
		// 是否展示删除按钮
		deletable: {
			type: Boolean,
			default: true
		},
		// 文件大小限制，单位为byte
		maxSize: {
			type: [String, Number],
			default: Number.MAX_VALUE
		},
		// 显示已上传的文件列表
		fileList: {
			type: Array,
			default() {
				return [];
			}
		},
		// 上传区域的提示文字
		uploadText: {
			type: String,
			default: "选择图片"
		},
		// 是否自动上传
		autoUpload: {
			type: Boolean,
			default: true
		},
		//是否图片转base64
		base64:{
			type: Boolean,
			default: false
		},
		// 是否显示toast消息提示
		showTips: {
			type: Boolean,
			default: true
		},
		// 是否通过slot自定义传入选择图标的按钮
		customBtn: {
			type: Boolean,
			default: false
		},
		quality: {
			type: Number,
			default: 100
		},
		// 内部预览图片区域和选择图片按钮的区域宽度
		width: {
			type: [String, Number],
			default: 200
		},
		// 内部预览图片区域和选择图片按钮的区域高度
		height: {
			type: [String, Number],
			default: 200
		},
		// 右上角关闭按钮的背景颜色
		delBgColor: {
			type: String,
			default: "#fa3534"
		},
		// 右上角关闭按钮的叉号图标的颜色
		delColor: {
			type: String,
			default: "#ffffff"
		},
		// 右上角删除图标名称，只能为uView内置图标
		delIcon: {
			type: String,
			default: "close"
		},
		// 右下角成功图标名称，只能为uView内置图标
		successIcon: {
			type: String,
			default: "checkbox-mark"
		},
		// 右下角成功的叉号图标的颜色
		successColor: {
			type: String,
			default: "#ffffff"
		},
		// 如果上传后的返回值为json字符串，是否自动转json
		toJson: {
			type: Boolean,
			default: true
		},
		// 上传前的钩子，每个文件上传前都会执行
		beforeUpload: {
			type: Function,
			default: null
		},
		// 移除文件前的钩子
		beforeRemove: {
			type: Function,
			default: null
		},
		// 允许上传的图片后缀
		limitType: {
			type: Array,
			default() {
				// 支付宝小程序真机选择图片的后缀为"image"
				// https://opendocs.alipay.com/mini/api/media-image
				return ["png", "jpg", "jpeg", "webp", "gif", "image"];
			}
		},
		// 在各个回调事件中的最后一个参数返回，用于区别是哪一个组件的事件
		index: {
			type: [Number, String],
			default: ""
		},
		margin:{
			type: [Number, String],
			default: "10"
		}
	},
	mounted() {
		let parent = this.$u.$parent.call(this, 'u-form');
		if (parent) {
			Object.keys(this.uForm).map(key => {
				this.uForm[key] = parent[key];
			});
		}
	},
	data() {
		return {
			lists: [],
			isInCount: true,
			uploading: false,
			uForm:{
				inputAlign: "",
				clearable: ""
			}
		};
	},
	computed: {
		valueCom() {
			// #ifndef VUE3
			return this.value;
			// #endif
		
			// #ifdef VUE3
			return this.modelValue;
			// #endif
		}
	},
	watch: {
		valueCom(nVal, oVal) {
			if(nVal){
				if(this.base64){
					if(!arraysEqual(nVal,oVal)){
						this.initValue(nVal)
					}
				}else{
					if(nVal!=oVal){
						this.initValue(nVal)
					}
				}
			}else{
				this.lists = []
			}
		},
		fileList: {
			immediate: true,
			handler(val) {
				let that = this;
				let lists = JSON.parse(JSON.stringify(that.lists));
				val.map(value => {
					// 首先检查内部是否已经添加过这张图片，因为外部绑定了一个对象给fileList的话(对象引用)，进行修改外部fileList
					// 时，会触发watch，导致重新把原来的图片再次添加到this.lists
					// 数组的some方法意思是，只要数组元素有任意一个元素条件符合，就返回true，而另一个数组的every方法的意思是数组所有元素都符合条件才返回true
					let tmp = lists.some(val => {
						return val.url == value.url;
					});
					// 如果内部没有这个图片(tmp为false)，则添加到内部
					if (!tmp) {
						let url = '';
						if(value.url.indexOf(";base64,")>0){
							url = value.url;
						}else{
							url = getApp().globalData.currentPage && getApp().globalData.currentPage.$tools? getApp().globalData.currentPage.$tools.renderImage(value.url):value.url
						}
					}
				});
				that.lists = JSON.parse(JSON.stringify(lists));
			}
		},
		// 监听lists的变化，发出事件
		lists: {
			deep: true,
			handler(n) {
				this.$emit("update:file-list", n);
				let datas = n
					.filter((item) => {
						return item && item.url;
					})
					.map((item) => {
						return item.url;
					});
					
				let value = this.base64 && this.maxCount > 1? datas :datas.join(",")
				
				this.$emit("update:modelValue", value);
				this.$emit("change", value);
				setTimeout(() => {
					// 将当前的值发送到 u-form-item 进行校验
					this.dispatch("u-form-item", "onFieldChange");
				}, 40);
				this.$emit("on-list-change", n, this.index);
			}
		}
	},
	created() {
		// 监听u-form-item发出的错误事件，将输入框边框变红色
		// #ifndef VUE3
		this.$on("onFormItemError", this.onFormItemError);
		// #endif
	    if(this.valueCom){
			this.initValue(this.valueCom)
		}
	},
	methods: {
		initValue(nVal){
			if(!nVal){
				this.lists = []
			}else if(this.base64){
				if(Array.isArray(nVal)){
					if(nVal.length==0){
						this.lists = []
					}else{
						this.lists = nVal.map(item=>{
							return {url:item}
						})
					}
					
				}else{
					this.lists = [{url:nVal}]
				}
			}else{
				this.lists = nVal.split(",").map(item=>{
					return {url:item}
				})
			}
		},
		// 清除列表
		clear() {
			this.lists = [];
		},
		// 重新上传队列中上传失败的所有文件
		reUpload() {
			this.uploadFile();
		},
		// 选择图片
		selectFile() {
			let that = this;
			if (that.disabled) return;
			const { name = "", maxCount, multiple, maxSize, sizeType, camera, compressed, maxDuration, sourceType } = that;
			let chooseFile = null;
			let lists = JSON.parse(JSON.stringify(that.lists));
			const newMaxCount = maxCount - lists.length;
			// 设置为只选择图片的时候使用 chooseImage 来实现
			chooseFile = new Promise((resolve, reject) => {
				uni.chooseImage({
					count: multiple ? (newMaxCount > 9 ? 9 : newMaxCount) : 1,
					sourceType: sourceType,
					sizeType,
					success: resolve,
					fail: reject
				});
			});
			chooseFile
				.then(res => {
					let file = null;
					let listOldLength = that.lists.length;
					res.tempFiles.map((val, index) => {
						// 检查文件后缀是否允许，如果不在that.limitType内，就会返回false
						if (!that.checkFileExt(val)) return;

						// 如果是非多选，index大于等于1或者超出最大限制数量时，不处理
						if (!multiple && index >= 1) return;
						if (val.size > maxSize) {
							that.$emit("on-oversize", val, that.lists, that.index);
							that.showToast("超出允许的文件大小");
						} else {
							if (maxCount <= lists.length) {
								that.$emit("on-exceed", val, that.lists, that.index);
								that.showToast("超出最大允许的文件个数");
								return;
							}
							lists.push({
								type:val.type,
								url: val.path,
								progress: 0,
								error: false,
								file: val
							});
						}
					});

					// 这样实现深拷贝会导致在H5中file为空对象
					// that.lists = JSON.parse(JSON.stringify(lists));
					that.deepClone(lists, that.lists);
					// 每次图片选择完，抛出一个事件，并将当前内部选择的图片数组抛出去
					that.$emit("on-choose-complete", that.lists, that.index);
					// else{
						if (that.autoUpload) that.uploadFile(listOldLength);
					// }
				})
				.catch(error => {
					that.$emit("on-choose-fail", error);
				});
		},
		// 提示用户消息
		showToast(message, force = false) {
			if (this.showTips || force) {
				uni.showToast({
					title: message,
					icon: "none"
				});
			}
		},
		// 该方法供用户通过ref调用，手动上传
		upload() {
			this.uploadFile();
		},
		// 对失败的图片重新上传
		retry(index) {
			this.lists[index].progress = 0;
			this.lists[index].error = false;
			this.lists[index].response = null;
			uni.showLoading({
				title: "重新上传"
			});
			this.uploadFile(index);
		},
		
		/**
		 * 压缩图片
		 * @param {array} tempFilePaths 临时路径数组
		 * @return {array} 被压缩过的路径数组
		 * */
		async compressImage(tempFilePaths,type) {
			const that = this;
		
			return new Promise((resolve, reject) => {
		
				if (typeof tempFilePaths !== 'string') {
					console.error('压缩路径错误')
					reject([])
				}
		
				// uni.showLoading({
				// 	title: '压缩中...',
				// 	icon: 'loading',
				// })
		
				// #ifdef H5
				this.canvasDataURL(tempFilePaths, {
					quality: that.quality/ 100,
					type: type
				}, (base64Codes) => {
					resolve(base64Codes);
					// uni.hideLoading();
				})
				// #endif
		
				// #ifndef H5
				uni.compressImage({
					src: tempFilePaths,
					quality: that.quality || 80,
					success: async (res) => {
						let url = await this.imageToBase64(res.tempFilePath,type,100)
						resolve(url);
						// uni.hideLoading();
					},
					fail(err) {
						reject(err);
						uni.hideLoading();
					}
				})
				// #endif
			})
		},
		
		/**
		 * H5压缩图片质量
		 * @param {string} path 图片路径
		 * @param {object} obj 压缩配置
		 * @param {function} callback 回调函数
		 * @return {string} base64
		 * */
		canvasDataURL(path, obj, callback) {
			var img = new Image();
			img.src = path;
			img.onload = function () {
				var that = this;
				// 默认按比例压缩
				var w = that.width,
					h = that.height,
					scale = w / h;
				w = obj.width || w;
				h = obj.height || (w / scale);
				var quality = 0.8; // 默认图片质量为0.8
				//生成canvas
				var canvas = document.createElement('canvas');
				var ctx = canvas.getContext('2d');
				// 创建属性节点
				var anw = document.createAttribute("width");
				anw.nodeValue = w;
				var anh = document.createAttribute("height");
				anh.nodeValue = h;
				canvas.setAttributeNode(anw);
				canvas.setAttributeNode(anh);
				ctx.drawImage(that, 0, 0, w, h);
				// 图像质量
				if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
					quality = obj.quality;
				}
				// quality值越小，所绘制出的图像越模糊
				var base64 = canvas.toDataURL(obj.type, quality);
				// 回调函数返回base64的值
				callback(base64);
			}
		},
		imageToBase64(path,type,quality=100) {
			if(uni.getFileSystemManager){
				if(quality==100){
					return new Promise((resolve, reject) => {
						uni.getFileSystemManager().readFile({
							filePath: path, // 要读取的文件路径
							encoding: 'base64', // 编码格式
							success: res => {
								let base64 = 'data:'+type+';base64,'+res.data
								 resolve(base64);
							},
							fail: err => {
								reject(err)
							}
						})
					})
				}else{
					return this.compressImage(path,type,quality)
				}
			}else{
				// #ifdef APP-PLUS
				if(quality==100){
					return new Promise((resolve, reject) => {
						plus.io.resolveLocalFileSystemURL(path, function(entry) {
							entry.file(function(file) {
								var fileReader = new plus.io.FileReader();
								//alert("getFile:" + JSON.stringify(file));
								fileReader.readAsDataURL(file);
								fileReader.onloadend = function(evt) {
									// base64字符串
									resolve(evt.target.result);
								}
							})
						})
					})
				}else{
					return this.compressImage(path,type,quality)
				}
				// #endif
				
				// #ifdef H5
				if(quality==100){
					return new Promise((resolve, reject) => {
						uni.request({
							url: path,
							method: 'GET',
							responseType: 'arraybuffer',
							success: res => {
								let base64 = uni.arrayBufferToBase64(res.data); //把arraybuffer转成base64
								base64 = 'data:'+type+';base64,' + base64 //不加上这串字符，在页面无法显示的
								resolve(base64)
							},
							fail: err => {
								reject(err)
							}
						})
					})
				}else{
					return this.compressImage(path,type,quality)
				}
				// #endif
			}
		},		

		// 上传图片
		async uploadFile(index = 0) {
			if (this.disabled) return;
			if (this.uploading) return;
			// 全部上传完成
			if (index >= this.lists.length) {
				this.$emit("on-uploaded", this.lists, this.index);
				return;
			}
			// 检查是否是已上传或者正在上传中
			if (this.lists[index].progress == 100) {
				if (this.autoUpload == false) this.uploadFile(index + 1);
				return;
			}
			
			// 执行before-upload钩子
			if (this.beforeUpload && typeof this.beforeUpload === "function") {
				// 执行回调，同时传入索引和文件列表当作参数
				// 在微信，支付宝等环境(H5正常)，会导致父组件定义的customBack()函数体中的this变成子组件的this
				// 通过bind()方法，绑定父组件的this，让this.customBack()的this为父组件的上下文
				// 因为upload组件可能会被嵌套在其他组件内，比如u-form，这时this.$parent其实为u-form的this，
				// 非页面的this，所以这里需要往上历遍，一直寻找到最顶端的$parent，这里用了this.$u.$parent.call(this)
				// 明白意思即可，无需纠结this.$u.$parent.call(this)的细节
				let beforeResponse = this.beforeUpload.bind(this.$u.$parent.call(this))(index, this.lists);
				// 判断是否返回了promise
				if (!!beforeResponse && typeof beforeResponse.then === "function") {
					await beforeResponse
						.then(res => {
							// promise返回成功，不进行动作，继续上传
						})
						.catch(err => {
							// 进入catch回调的话，继续下一张
							return this.uploadFile(index + 1);
						});
				} else if (beforeResponse === false) {
					// 如果返回false，继续下一张图片的上传
					return this.uploadFile(index + 1);
				} else {
					// 此处为返回"true"的情形，这里不写代码，就跳过此处，继续执行当前的上传逻辑
				}
			}
			if(this.base64){
				// 上传成功
				let url = await this.imageToBase64(this.lists[index].url,this.lists[index].type?this.lists[index].type:"image/png",this.quality)
				let data = {url:url};
				this.lists[index].url  = url
				this.lists[index].response = data;
				this.lists[index].progress = 100;
				this.lists[index].error = false;
				this.$emit("on-success", data, index, this.lists, this.index);
				this.uploading = false;
				this.$emit("on-change", data, index, this.lists, this.index);
				return this.uploadFile(index + 1);
			}
			// 检查上传地址
			if (!this.action) {
				this.showToast("请配置上传地址", true);
				return;
			}
			this.lists[index].error = false;
			this.uploading = true;
			
			if(getApp().globalData.currentPage && getApp().globalData.currentPage.$session){
				this.header.Authorization =  getApp().globalData.currentPage.$session.getToken()||''
			}
			
			// 创建上传对象
			const task = uni.uploadFile({
				url: getApp().globalData.currentPage && getApp().globalData.currentPage.$http?getApp().globalData.currentPage.$http.setUrl(this.action,{}):this.action,
				filePath: this.lists[index].url,
				name: this.name,
				formData: this.formData,
				header: this.header,
				success: res => {
					// 判断是否json字符串，将其转为json格式
					let data = this.toJson && this.$u.test.jsonString(res.data) ? JSON.parse(res.data) : res.data;
					//如果是非空或者
					if(!data|| (data&&data.code==401)){
						console.log("请返回正确结构数据比如:{code:200,data:{url:'图片路径'}}")
						this.uploadError(index, data);
						//如果返回的code是401表示登录超时，跳到首页
						if(data&&data.code==401){
							getApp().globalData.currentPage.$session.clearUser();
							uni.reLaunch({
								url: getApp().globalData.homePage
							});
						}
						return;
					}
					// 兼容diygw可视化
					if(!data.url && data.data){
						data = data.data
					}
					
					if (![200, 201, 204].includes(res.statusCode)) {
						this.uploadError(index, data);
					} else {
					    if(!data.url){
							console.log("请返回正确结构数据比如:{code:200,data:{url:'图片路径'}}")
							this.uploadError(index, data);
							return;
						}
						// 上传成功
						this.lists[index].url = getApp().globalData.currentPage && getApp().globalData.currentPage.$tools? getApp().globalData.currentPage.$tools.renderImage(data.url):data.url
						this.lists[index].response = data;
						this.lists[index].progress = 100;
						this.lists[index].error = false;
						this.$emit("on-success", data, index, this.lists, this.index);
					}
				},
				fail: e => {
					this.uploadError(index, e);
				},
				complete: res => {
					uni.hideLoading();
					this.uploading = false;
					this.uploadFile(index + 1);
					this.$emit("on-change", res, index, this.lists, this.index);
				}
			});
			task.onProgressUpdate(res => {
				if (res.progress > 0) {
					this.lists[index].progress = res.progress;
					this.$emit("on-progress", res, index, this.lists, this.index);
				}
			});
		},
		// 上传失败
		uploadError(index, err) {
			this.lists[index].progress = 0;
			this.lists[index].error = true;
			this.lists[index].response = null;
			this.$emit("on-error", err, index, this.lists, this.index);
			this.showToast("上传失败，请重试");
		},
		// 删除一个图片
		deleteItem(index) {
			uni.showModal({
				title: "提示",
				content: "您确定要删除此项吗？",
				success: async res => {
					if (res.confirm) {
						// 先检查是否有定义before-remove移除前钩子
						// 执行before-remove钩子
						if (this.beforeRemove && typeof this.beforeRemove === "function") {
							// 此处钩子执行 原理同before-remove参数，见上方注释
							let beforeResponse = this.beforeRemove.bind(this.$u.$parent.call(this))(index, this.lists);
							// 判断是否返回了promise
							if (!!beforeResponse && typeof beforeResponse.then === "function") {
								await beforeResponse
									.then(res => {
										// promise返回成功，不进行动作，继续上传
										this.handlerDeleteItem(index);
									})
									.catch(err => {
										// 如果进入promise的reject，终止删除操作
										this.showToast("已终止移除");
									});
							} else if (beforeResponse === false) {
								// 返回false，终止删除
								this.showToast("已终止移除");
							} else {
								// 如果返回true，执行删除操作
								this.handlerDeleteItem(index);
							}
						} else {
							// 如果不存在before-remove钩子，
							this.handlerDeleteItem(index);
						}
					}
				}
			});
		},
		// 执行移除图片的动作，上方代码只是判断是否可以移除
		handlerDeleteItem(index) {
			// 如果文件正在上传中，终止上传任务，进度在0 < progress < 100则意味着正在上传
			if (this.lists[index].progress < 100 && this.lists[index].progress > 0) {
				typeof this.lists[index].uploadTask != 'undefined' && this.lists[index].uploadTask.abort();
			}
			this.lists.splice(index, 1);
			this.$forceUpdate();
			this.$emit("on-remove", index, this.lists, this.index);
			//this.showToast('移除成功');
		},
		// 用户通过ref手动的形式，移除一张图片
		remove(index) {
			// 判断索引的合法范围
			if (index >= 0 && index < this.lists.length) {
				this.lists.splice(index, 1);
			}
		},
		// 预览图片
		doPreviewImage(url, index) {
			if (!this.previewFullImage) {
				this.$emit("on-preview", url, this.lists, this.index);
				return;
			}
			const images = this.lists.map(item => item.url || item.path);
			uni.previewImage({
				urls: images,
				current: url,
				success: () => {
					this.$emit("on-preview", url, this.lists, this.index);
				},
				fail: () => {
					uni.showToast({
						title: "预览图片失败",
						icon: "none"
					});
				}
			});
		},
		// 判断文件后缀是否允许
		checkFileExt(file) {
			// 检查是否在允许的后缀中
			let noArrowExt = false;
			// 获取后缀名
			let fileExt = "";
			const reg = /.+\./;
			// 如果是H5，需要从name中判断
			// #ifdef H5
			fileExt = file.name.replace(reg, "").toLowerCase();
			// #endif
			// 非H5，需要从path中读取后缀
			// #ifndef H5
			fileExt = file.path.replace(reg, "").toLowerCase();
			// #endif
			// 使用数组的some方法，只要符合limitType中的一个，就返回true
			noArrowExt = this.limitType.some(ext => {
				// 转为小写
				return ext.toLowerCase() === fileExt;
			});
			if (!noArrowExt) this.showToast(`不允许选择${fileExt}格式的文件`);
			return noArrowExt;
		},
		// 深拷贝
		deepClone(obj, newObj) {
			for (let k in obj) {
				const value = obj[k];

				if (Array.isArray(value)) {
					newObj[k] = [];
					this.deepClone(value, newObj[k]);
				} else if (value !== null && typeof value === "object") {
					newObj[k] = {};
					this.deepClone(value, newObj[k]);
				} else {
					newObj[k] = value;
				}
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../libs/css/style.components.scss";

.u-upload {
	@include vue-flex;
	flex-wrap: wrap;
	align-items: center;
}

.u-list-item {
	width: 200rpx;
	height: 200rpx;
	overflow: hidden;
	margin: 10rpx;
	background: rgb(244, 245, 246);
	position: relative;
	border-radius: 10rpx;
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	align-items: center;
	justify-content: center;
}

.u-preview-wrap {
	border: 1px solid rgb(235, 236, 238);
}

.u-add-wrap {
	flex-direction: column;
	color: $u-content-color;
	font-size: 26rpx;
}

.u-add-tips {
	margin-top: 20rpx;
	line-height: 40rpx;
}

.u-add-wrap__hover {
	background-color: rgb(235, 236, 238);
}

.u-preview-image {
	display: block;
	width: 100%;
	height: 100%;
	border-radius: 10rpx;
}

.u-delete-icon {
	position: absolute;
	top: 6rpx;
	right: 6rpx;
	z-index: 10;
	background-color: $u-type-error;
	border-radius: 100rpx;
	width: 36rpx;
	height: 36rpx;
	@include vue-flex;
	align-items: center;
	justify-content: center;
}

.u-icon {
	@include vue-flex;
	align-items: center;
	justify-content: center;
}

.u-success-icon {
	position: absolute;
	bottom: 6rpx;
	right: 6rpx;
	z-index: 10;
	background-color: #5ac725;
	border-radius: 100rpx;
	width: 36rpx;
	height: 36rpx;
	@include vue-flex;
	align-items: center;
	justify-content: center;
}

.u-progress {
	position: absolute;
	bottom: 10rpx;
	left: 8rpx;
	right: 8rpx;
	z-index: 9;
	width: auto;
}
.u-add-btn{
	color:#dcdee0
}
.u-error-btn {
	color: #ffffff;
	background-color: $u-type-error;
	font-size: 20rpx;
	padding: 4px 0;
	text-align: center;
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 9;
	line-height: 1;
}
</style>
