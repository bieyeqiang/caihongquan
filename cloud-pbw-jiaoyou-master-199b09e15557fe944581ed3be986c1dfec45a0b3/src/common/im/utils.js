import md5 from './md5.min.js'
import $store from '@/store/index.js'
import formatTime from './formatTime.js';


export default {
	init () {
		//目前功能还比较简单，只有启用监听聊天数据和时间戳心跳（定时器）
		//监听im消息
		this.listenImMsg()
		//时间戳心跳（定时器）用于刷新：消息或会话与当前的时间差
		setInterval(() => {
			$store.commit('uniIm/updateHeartbeat')
		}, 1000)
	},
	getConversationId (param, type = 'single') { //single,group
		if (type == 'single') {
			let current_uid = uniCloud.getCurrentUserInfo().uid
			if (!current_uid) {
				console.error('错误current_uid不能为空', current_uid);
			}
			param = [param, current_uid]
			return 'single_' + md5(param.sort().toString())
		} else {
			throw ('群聊功能暂未开发完成')
		}
	},
	listenImMsg () {
		uni.onPushMessage(async res => {
			const { currentConversationId } = $store.state.uniIm
			// console.log('收到消息 onPushMessage===================',res.type, res.data,currentConversationId );
			const { payload } = res.data
			if (payload.type == 'im') {
				const msg = payload.data
				// console.log({msg});
				if (res.type == 'receive') {
					// console.log(777);
					const { conversation_id } = msg
					// console.log('msgmsgmsgmsgmsg.msg',msg);
					// #ifdef APP
					let currentPages = getCurrentPages()
					let topViewRoute = currentPages[currentPages.length - 1].route
					console.log('topViewRoute', topViewRoute);
					let isShow = getApp().globalData.uniIm.appIsShow
					if (!isShow || !['uni_modules/uni-im/pages/index/index', 'uni_modules/uni-im/pages/chat/chat'].includes(topViewRoute)) {
						console.log('payload', payload);
						let { content, data, title, avatar_file } = payload
						let url = avatar_file ? avatar_file.url : ''
						let icon = '_www/uni_modules/uni-im/static/avatarUrl.png'
						//安卓才有头像功能，再执行下载
						if (uni.getSystemInfoSync().platform == "android") {
							if (avatar_file) {
								let downloadFileRes = await uni.downloadFile({ url: avatar_file.url });
								icon = downloadFileRes[1]?.tempFilePath
							}
						}
						plus.push.createMessage(content, payload, { title, icon })
					} else if (conversation_id != currentConversationId) {
						// uni.showToast({
						// 	title: '收到新消息请注意查看',
						// 	icon: 'none'
						// });
					}
					// #endif
					$store.dispatch('uniIm/setMsgList', {
						conversation_id,
						action: 'unshift',
						data: msg
					})
				} else {
					console.log(666);
					uni.navigateTo({
						url: '/uni_modules/uni-im/pages/chat/chat?conversation_id=' + msg.conversation_id,
						complete (e) {
							console.log(e);
						}
					})
				}
			}
		})
	},
	formatTime (timestamp) {
		timestamp +
			// 加上一个*0的数,用于刷新视图中的时间 （超过5小时的直接显示具体年月日）
			(timestamp - Date.now() < 3600 * 5 * 1000 ? $store.state.uniIm.heartbeat * 0 : 0);
		if (!timestamp) {
			return '';
		}
		return formatTime(timestamp)
	},
	clearPushNotify () {
		// #ifdef APP
		plus.push.clear()
		plus.runtime.setBadgeNumber(0)
		// #endif
	}
}
