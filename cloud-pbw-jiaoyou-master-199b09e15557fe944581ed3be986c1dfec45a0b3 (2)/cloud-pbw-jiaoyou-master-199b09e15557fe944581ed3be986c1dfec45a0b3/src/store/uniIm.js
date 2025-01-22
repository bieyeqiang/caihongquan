import uniImStorage from '@/common/im/uni-im-storage.js'
import utils from '@/common/im/utils.js'

//获取会话数据的页码
let getConversationDatasPage = 0


function current_uid () {
	return uniCloud.getCurrentUserInfo().uid
}

export default {
	namespaced: true,
	state: {
		conversationDatas: {},//uni.getStorageSync('uni-im-conversation' + '_uid:' + current_uid()) ||{},
		currentConversationId: false,
		heartbeat: ''
	},
	getters: {
		unread_count (state, getters) {
			return getters.conversationList.reduce((sum, item, index, array) => sum + item.unread_count, 0)
		},
		conversationList (state) {
			const {
				conversationDatas
			} = state
			uni.setStorage({
				key: 'uni-im-conversation' + '_uid:' + current_uid(),
				data: conversationDatas
			})
			let conversationList = []
			for (let key in conversationDatas) {
				let item = JSON.parse(JSON.stringify(conversationDatas[key]))
				// console.log('item-----------',item);
				let msg = item.msgList && item.msgList[0]
				if (item.chatText && state.currentConversationId != key) {
					msg = {
						body: "[uni-im-draft]" + item.chatText,
						type: 'text',
						create_time: Date.now()
					}
				}
				if (msg) {
					let last_msg_note = ''
					if (msg.type == 'text') {
						last_msg_note = msg.body.toString()
						let result = last_msg_note.replace(/<img id="biaoqing"(.*?)\">/g, '[表情]')
						result = result.replace(/[\r\n]/g, "");
						last_msg_note = result.slice(0, 30)
						item.last_msg_note = last_msg_note
					}
					if (msg.type == 'image') {
						item.last_msg_note = '[图片]'
					}
					if (msg.type == 'video') {
						item.last_msg_note = '[视频]'
					}
					if (msg.type == 'sound') {
						item.last_msg_note = '[语音]'
					}
					if (msg.type == 'file') {
						item.last_msg_note = '[文件]'
					}
					if (msg.type == 'redEnvelope') {
						item.last_msg_note = '[红包]'
					}

					if (msg.create_time) {
						item.update_time = msg.create_time
					}
					// console.log('item.update_time',item.update_time);
				}
				if (item.chatText && state.currentConversationId == key) {
					item.update_time = Date.now()
				}

				if (!item.update_time) {
					// 插件市场项目补丁 时间字段错误
					item.update_time = item.last_time
				}
				conversationList.push(item)
			}
			conversationList = conversationList.sort(function (a, b) {
				// if(b.id == state.currentConversationId){
				// 	return false
				// }
				return b.update_time - a.update_time
			})
			return conversationList
		},
		conversation: (state) => (id) => {
			return state.conversationDatas[id]
		}
	},
	mutations: {
		updateHeartbeat (state) {
			state.heartbeat = Date.now()
		},
		setCurrentConversationId (state, id) {
			state.currentConversationId = id
			// console.log('state.currentConversationId',state.currentConversationId);
		},
		mergeConversationDatas (state, val) {
			state.conversationDatas = Object.assign({}, state.conversationDatas, val)
		},
		updateConversation (state, [id, data, cover = false]) {
			let conversationDatas = state.conversationDatas
			let conversation = conversationDatas[id] || {}
			conversationDatas[id] = Object.assign(cover ? {} : conversation, data)
			state.conversationDatas = Object.assign({}, conversationDatas)
		}
	},
	actions: {
		async setMsgList (context, {
			conversation_id,
			action = 'set',
			data,
			id,
			save
		}) {
			// console.log('setMsgList',{conversation_id,action,data,id},this);
			let conversationData = context.getters.conversation(conversation_id)
			if (!conversationData) {
				conversationData = await context.dispatch('getConversation', { user_id: data.from_uid })
			}
			let { msgList } = conversationData
			msgList = JSON.parse(JSON.stringify(msgList))
			if (!Array.isArray(data)) {
				data = [data]
			}
			if (save) {
				if (data.length > 1) {
					throw Error('save 不能保存数组')
				}
				data = [uniImStorage.append(data[0])]
			}
			// console.log(action);
			switch (action) {
				case 'set':
					msgList = data
					break;
				case 'push':
					msgList.push(...data)
					break;
				case 'unshift':
					msgList.unshift(...data)
					break;
				case 'update':
					let index = msgList.findIndex(msg => msg.id == data[0].id)
					// console.log(6, msgList[index])
					// console.log(6, data[0])
					msgList[index] = Object.assign(msgList[index], data[0])
					break;
				default:
					break;
			}

			let val = {
				msgList
			}
			if (action == 'unshift' && context.state.currentConversationId != conversationData.id) {
				val.unread_count = conversationData.unread_count + 1
			}

			context.commit('updateConversation', [conversation_id, val])
			if (save) {
				return data[0]
			}
			return data
		},
		async clearUnreadCount (context, conversation_id) {
			context.commit('updateConversation', [conversation_id, {
				unread_count: 0
			}])
			uniCloud.database()
				.collection('uni-im-conversation')
				.where({
					owner_uid: current_uid(),
					id: conversation_id
				})
				.update({
					"unread_count": 0
				}).then(e => {
					console.log('设置为已读', e.result.updated);
				})
		},
		async loadMoreConversation (context, conversation_id) {
			console.log(conversation_id, 'conversation_id')
			const uniImCo = uniCloud.importObject("uni-im-co")
			console.log(getConversationDatasPage)
			let res = await uniImCo.getConversationList({
				page: getConversationDatasPage,
				limit: this.limit,
				conversation_id
			})
			console.log('loadMoreConversation', conversation_id, res.data);
			console.log('loadMoreConversationList', res);
			console.log(res.data.length, '总条数');
			if (res.data.length) {
				getConversationDatasPage++
				//查到会话列表数据后转化格式
				let datas = {} // this.datas
				res.data.forEach(item => {
					const user_info = item
					//避免用户被删除后引起的报错阻塞
					console.log('user_info-------', user_info);
					if (user_info) {
						// delete item.user_info email
						item.title = user_info.nickname || user_info.username || user_info.email
						item.avatar_file = user_info.avatar_file
						item.msgList = []
						item.chatText = ''
						item.isInit = false
						datas[item.id] = item
					} else {
						console.error('会话列表失效，疑似关联用户/群被删除（请改为软删除避免系统异常）：', item);
					}
				})
				// console.log('datas',datas);
				context.commit('mergeConversationDatas', datas)
			}
			return res.data.length != 0
		},
		async getConversation (context, {
			from_uid,
			to_uid,
			group_id,
			conversation_id,
			type,
			body,
			user_id,
			user_info
		}) {
			if (!user_id) {
				user_id = (from_uid == current_uid() ? to_uid : from_uid)
			}
			if (!conversation_id) {
				conversation_id = utils.getConversationId(user_id)
			}
			let conversation = context.getters.conversation(conversation_id)
			if (conversation) {
				console.log('已经有了直接返回', conversation);
				// console.log('conversation.msg.msgList',conversation.msg.msgList);
				return conversation
			}
			if (!user_info) {
				let res = await uniCloud.database().collection('jw-uni-id-users').doc(user_id)
					.field('_id,nickname,username,avatar_file')
					.get()
				user_info = res.result.data[0]
				console.error('user_info', user_info);
				if (!user_info) {
					uni.showModal({
						content: '用户id错误',
						showCancel: false
					});
					throw ('用户id错误')
				}
			}
			const conversationData = {
				id: conversation_id,
				title: user_info.nickname || user_info.username,
				avatar_file: user_info.avatar_file,
				owner_uid: current_uid(),
				total_num: 0,
				unread_count: 0,
				user_id,
				group_id,
				msgList: [],
				update_time: Date.now(),
				chatText: ''
			}
			context.commit('updateConversation', [conversation_id, conversationData, true])
			return conversationData
		}
	}
}
