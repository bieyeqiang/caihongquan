import __config from '../siteinfo'
var SESSION_SUFFIX = "session_com_"
var SESSION_KEY = 'user_session'
var REDIRECT_SESSION_KEY = 'redirect_session';

var Session = {
	getRedirecturl() {
		return uni.getStorageSync(SESSION_SUFFIX+__config.appid+"_"+REDIRECT_SESSION_KEY) || null;
	},

	setRedirecturl(url) {
		if(url==null){
			uni.removeStorageSync(SESSION_SUFFIX+__config.appid+"_"+REDIRECT_SESSION_KEY)
		}else{
			uni.setStorageSync(SESSION_SUFFIX+__config.appid+"_"+REDIRECT_SESSION_KEY, url);
		}
		
	},
	//获取用户信息
	getUser() {
		return uni.getStorageSync(SESSION_SUFFIX+__config.appid+SESSION_KEY) || null;
	},

	//设置用户登录token用户名等信息，用对像写进云{token:'****',username:'***'}
	setUser(session) {
	    let user = this.getUser();
		if(!user){
			user = {}
		}
		user = Object.assign(user,session);
		uni.setStorageSync(SESSION_SUFFIX+__config.appid+SESSION_KEY, session);
	},

	//增加用户信息进存储值里键值
	setUserValue(key,value){
		let user = this.getUser();
		if(!user){
			user = {}
		}
		user[key] = value
		uni.setStorageSync(SESSION_SUFFIX+__config.appid+SESSION_KEY, user);
	},
	
	//获取用户某个健值
	getUserValue(key){
		let user = this.getUser();
		if(!user){
			user = {}
		}
		return user[key]||null;
	},
	
	//清空用户值
	clearUser() {
		uni.removeStorageSync(SESSION_KEY+__config.appid);
		const res = uni.getStorageInfoSync();	
		res.keys.forEach(key=>{
			if(key.startsWith(SESSION_SUFFIX+__config.appid)){
				uni.removeStorageSync(key);
			}
		})
	},
	getToken() {
		var userInfo = this.getUser();
		return userInfo ? userInfo.token : null
	},
	
	getOpenId() {
		var userInfo = this.getUser();
		return userInfo ? userInfo.openid : null
	},
	
	setValue(key,value) {
		if(value==null){
			uni.removeStorageSync(SESSION_SUFFIX+__config.appid+key)
		}else{
			uni.setStorageSync(SESSION_SUFFIX+__config.appid+key, value);
		}
	},
	
	getValue(key){
		return uni.getStorageSync(SESSION_SUFFIX+__config.appid+key) || null;
	}
	
}

export default Session
