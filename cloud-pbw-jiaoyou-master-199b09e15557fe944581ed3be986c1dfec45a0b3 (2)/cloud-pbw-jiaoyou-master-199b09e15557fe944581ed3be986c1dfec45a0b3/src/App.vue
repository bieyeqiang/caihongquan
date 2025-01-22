<script>
import Vue from 'vue'
import store from './store'
let __timerId = 0 //全局定时器
//1. 导入uniIm的Utils工具类
import uniImUtils from '@/common/im/utils.js'
import uniIdPagesinit from '@/uni_modules/uni-id-pages/init.js'
import SDK from 'easemob-websdk/uniApp/Easemob-chat';

export default {
  globalData: {
	  userInfo: null,
	  tabBar: [],
	  homePage: '/pages/video/login',
	  pages: ['/pages/video/login', '/pages/video/upload_detail', '/pages/video/index', '/pages/video/dynamic_detail'],
	  userData: {},
    //2. 初始化uniIm全局变量
    uniIm: {
      msgManagers: {},
      //app是否显示在前台
      appIsShow: false
    }
  },
  onLaunch() {
	
    // 获取用户本地城市
    this.getUserCity()
    // 获取设备信息
    uni.getSystemInfo({
      success: e => {
		  console.log(e,"***************")
        this.initSize(e)
      }
    })
    // 同步客户端push_clientid至device表
    uniIdPagesinit()
    //3.初始化uniIm
    // uniImUtils.init()
  },
  methods: {
    // 获取用户本地储存城市
    async getUserCity() {
      // 用户是否有定位
      let userMap = uni.getStorageSync('userMap')
      if (userMap) {
        this.$store.commit('setStateAttr', {
          key: 'location',
          val: userMap
        })
      } else {
        let res = await this.$common.getMap()
        let location = {
          longitude: res.map.result.ad_info.location.lng, //经度
          latitude: res.map.result.ad_info.location.lat, //纬度
          province: res.map.result.ad_info.province,
          city: res.map.result.ad_info.city, //城市
          cityCode: res.map.result.ad_info.city_code, //城市id
          area: res.map.result.ad_info.district, //城市名称
          areaCode: res.map.result.ad_info.adcode, //城市code
          address: res.map.result.ad_info.address //地址
        }
        uni.setStorageSync('userMap', location)
        this.$store.commit('setStateAttr', {
          key: 'location',
          val: location
        })
      }
    },
    //登录状态
    async initLogin() {
      const token = uni.getStorageSync('token')
	  // 实例化 SDK 对象
	  const WebIM = wx.WebIM = SDK;
	  const conn = new WebIM.connection({
	      appKey: '1117220111134873#demo', //注意这里的 "K" 需大写
	      url: 'wss://im-api-wechat.easemob.com/websocket', // websocket 连接地址
	      apiUrl: 'https://a1.easemob.com',// REST API 连接地址
	      useOwnUploadFun: true // 是否使用自己的上传方式（如将图片文件等上传到自己的服务器，构建消息时只传 URL）
	  });
	  Vue.prototype.$conn = conn;
	  conn.addEventHandler("connectionListener", {
	    onConnected: () => {
	      console.log("连接成功");
	    },
	    // 自 4.8.0 版本，`onDisconnected` 事件新增断开原因回调参数, 告知用户触发 `onDisconnected` 的原因。
	    onDisconnected: () => {
	      console.log("连接断开");
	    },
	    onReconnecting: () => {
	      console.log("重连中");
	    }
	  });

      // console.log(conn,"*********");
      if (token) {
        this.$store.commit('setToken', { token })
      }else{
		 conn
		   .open({
		     user: "miitangxtfqbkap4413",
		     accessToken: "YWMtL56-mMypEe-Hl18YIMp3ixmwQd1NMEgopGzc6WbPl6_sWGOwa-IR7bLptU0zLgLJAwMAAAGUPtnOyAWP1AAa0h0eI79l0rYDT5Bzp8K-kegWZcJmxjQinPR1e0Vtrw",
		   })
		   .then(() => {
		     console.log("login success");
		   })
		   .catch((reason) => {
		     console.log("login fail", reason);
		   });


		uni.showToast({
		  title: '请先登录',
		  icon: 'none'
		});
		setTimeout(() => {
		  uni.navigateTo({
		    url: '/pages/video/login'
		  });
		}, 1000);  
	  }
    },
    /**
     * 存储设备信息
     * @param {Object}
     */
    initSize(e) {
      const systemInfo = e
      let navigationBarHeight
      let custom = {}
      // #ifndef MP
      custom = {
        height: 36,
        width: 88
      }
      navigationBarHeight = 44
      // #endif
      // #ifdef MP-WEIXIN
      custom = wx.getMenuButtonBoundingClientRect()
      navigationBarHeight = custom.bottom + custom.top - e.statusBarHeight * 2
      // #endif
      systemInfo.custom = custom
      systemInfo.navigationBarHeight = navigationBarHeight
      Vue.prototype.systemInfo = systemInfo
    }
  },
  onShow() {
    console.log('app show')
    this.initLogin() // 登录状态及IM状态
    this.getUserCity() // 获取用户本地城市

    //4.在onShow生命周期，更改全局变量中app是否显示在前台为true
    this.globalData.uniIm.appIsShow = true
    //5.清理角标
    uniImUtils.clearPushNotify()
  },
  onHide() {
    //6.在onHide生命周期，更改全局变量中app是否显示在前台为false
    this.globalData.uniIm.appIsShow = false
  },
  // 捕获error
  onError(err) {
    console.log(err, 'app出错了')
  }
}
</script>

<style lang="scss">
// 只在vue页面中生效的css
/* #ifndef APP-PLUS-NVUE */
// common通用样式
@import './common/css/common.css'; // uni icon
@import './common/css/icon.css';
/* iconfont 阿里图标 */
@import './common/css/iconfont.css'; // uview-ui 基础样式
@import 'uview-ui/index.scss';
/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
@import './common/css/uni.css';
// css动画
@import '/common/css/animationUser.css';
@import './common/diygw-ui/iconfont.scss';
@import './common/diygw-ui/animate.css';
@import './common/diygw-ui/index.scss';

@import '@/uni_modules/diy-uview-ui/index.scss';

@import './common/diygw-ui/uview.scss';
// 滚动条隐藏
::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
  -webkit-appearance: none !important;
  background: transparent !important;
}
/* #endif*/
</style>


