import Vue from 'vue'
import App from './App'
import {
	setCurrentPage,
	Validate,
	setData,
	navigateTo,
	showModal,
	showToast,
	getPickerChildren,
	uploadImage,
	getOption,
	setAuthorize
} from '@/common/Page.js'
import Tools from '@/common/Tools.js'
import HttpService from '@/common/HttpService.js'
import Session from '@/common/Session.js'
import uView1 from './uni_modules/diy-uview-ui';
import AWS from 'aws-sdk';
AWS.config.update({
			  accessKeyId: 'AKIAWPPO6CJ55BGVYYX3',
			  secretAccessKey: '4S8U7OjBiMhKT3YjSNOo5c80cyF5TXc1ocZo/ipF',
			  region: 'ap-southeast-1' // e.g., 'us-west-2'
			});
			
			const s3 = new AWS.S3();

Vue.use(uView1);
Vue.config.productionTip = false
Vue.prototype.$tools = new Tools()
Vue.prototype.s3 = s3;
Vue.prototype.$http = new HttpService()
Vue.prototype.$session = Session
Vue.prototype.Validate = Validate
Vue.prototype.setData = setData
Vue.prototype.navigateTo = navigateTo
Vue.prototype.showModal = showModal
Vue.prototype.setAuthorize = setAuthorize
Vue.prototype.showToast = showToast
Vue.prototype.getPickerChildren = getPickerChildren
Vue.prototype.uploadImage = uploadImage
Vue.prototype.setCurrentPage = setCurrentPage
Vue.prototype.getOption = getOption
uni.getSystemInfo({
	success: function(e) {
		// #ifndef MP
		Vue.prototype.StatusBar = e.statusBarHeight;
		if (e.platform == 'android') {
			Vue.prototype.CustomBar = e.statusBarHeight + 50;
		} else {
			Vue.prototype.CustomBar = e.statusBarHeight + 45;
		};
		// #endif

		// #ifdef MP-WEIXIN
		Vue.prototype.StatusBar = e.statusBarHeight;
		let custom = wx.getMenuButtonBoundingClientRect();
		Vue.prototype.Custom = custom;
		Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
		// #endif

		// #ifdef MP-ALIPAY
		Vue.prototype.StatusBar = e.statusBarHeight;
		Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
		// #endif
	}
})

// 引入vuex
import store from './store'
Vue.prototype.$store = store

// 引入函数库
import { msg, isLogin, debounce, throttle, prePage, date, getIsAppClient } from '@/common/js/util'
Vue.prototype.$util = { msg, isLogin, debounce, throttle, prePage, date, getIsAppClient }

// 引入JS过滤器
import filter from './common/js/filter'
Vue.prototype.$filter = filter

// 引入mixin
import mixin from './common/js/mixin'
Vue.mixin(mixin)

// 引入uView ui组件 uviewui.com
import uView from "uview-ui";
Vue.use(uView);

// 引入mescroll-uni下拉刷新 注册全局组件
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)

// 引入API函数JS
import common from './common/js/common'
Vue.prototype.$common = common



Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
// #ifdef VUE3
import { createSSRApp } from 'vue';
//Pinia
import * as Pinia from 'pinia';
export function createApp() {
  const app = createSSRApp(App);
  app.use(Pinia.createPinia());
  return {
    app,
    Pinia,
  };
}
// #endif