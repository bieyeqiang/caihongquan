
import uniImStorage from './uni-im-storage.js'
export default class Message {
	constructor(currentConversation) {
		this.currentConversation = currentConversation
		this.conversation_id = this.currentConversation.id
		// this.msgList = this.currentConversation.msgList
		// this.isInit = this.currentConversation.isInit
		Object.defineProperty(this, 'msgList', {
			get () {
				return this.currentConversation.msgList
			}
		})
		Object.defineProperty(this, 'isInit', {
			get () {
				return this.currentConversation.isInit
			}
		})
	}
	isInit = false
	msgList = []
	pageLimit = uniImStorage.pageLimit
	storage = uniImStorage
	async getMore () {
		const that = this
		let res = {
			data: []
		}
		//未加载过数据，先将storage中的第一页取出
		// console.error('this.isInit',this.isInit);
		if (this.isInit === false) {
			let {
				data
			} = await this.storageMsg.get()
			if (data.length) {
				res.data = [...data]
				// that.msgList = data
				// console.log(that.msgList);
				this.storageMsg.maxTime = data[0].create_time
			} else {
				this.storageMsg.maxTime = 0
			}
			// console.log('init storageMsg res', res);
		}
		// return res.data
		//加载比storage时间更后的数据
		if (this.afterStorageMsg.hasMore) {
			let {
				data
			} = await this.afterStorageMsg.get()
			if (data.length) {
				if (this.isInit === false) {
					res.data = []
				}
				// console.log('1await this.afterStorageMsg.get()', data);
				res.data.unshift(...data)
				return res.data
			}
			// console.log('1await this.afterStorageMsg.get()',data);
		} else {
			// console.error('this.afterStorageMsg.hasMore',this.afterStorageMsg.hasMore)
		}

		// 加载storage中的数据
		if (this.storageMsg.hasMore) {
			//console.error('this.storageMsg.hasMore',this.storageMsg.hasMore)
			// console.log('resresresresres',res);
			let {
				data
			} = await this.storageMsg.get(res)
			if (data.length) {
				// console.log('2await this.storageMsg.get()', data);
				res.data.push(...data)
				return res.data
			}
		} else {
			// console.error('this.storageMsg.hasMore',this.storageMsg.hasMore)
		}

		//加载比storage时间更早的数据
		if (this.beforeStorageMsg.hasMore) {
			// console.error('this.beforeStorageMsg.hasMore',this.beforeStorageMsg.hasMore)
			let {
				data
			} = await this.beforeStorageMsg.get(res)
			if (data.length) {
				// console.log('3await this.beforeStorageMsg.get()', data);
				res.data.push(...data)
				return res.data
			}
		} else {
			// console.error('this.beforeStorageMsg.hasMore',this.beforeStorageMsg.hasMore)
		}

		return res.data
	}
	async getCloudMsg ({
		minTime,
		maxTime,
		limit = this.pageLimit
	}) {
		// console.log('this',this);
		let where = `"conversation_id" == "${this.conversation_id}"`
		if (minTime) {
			where += `&& "create_time" > ${minTime}`
		}
		if (maxTime) {
			where += `&& "create_time" < ${maxTime}`
		}
		// console.log('where', where);
		const db = uniCloud.database();
		const msgTable = db.collection('uni-im-msg')
		let data;
		try {
			let res = await msgTable.where(where)
				.orderBy('create_time', 'desc')
				.limit(limit)
				.get()
			data = res.result.data
		} catch (e) {
			data = []
			//TODO handle the exception
		}
		//存到本地
		uniImStorage.insert([...data], minTime != 0)
		return {
			data
		}
	}
	async getStorageMsg (e = {}) {
		let res = uniImStorage.getData({
			conversation_id: (e.conversationId || this.conversation_id),
			page: e.page || 0,
			maxTime: e.maxTime
		})
		return {
			data: res,
			hasMore: 0
		}
	}
	storageMsg = {
		get: async (e) => {
			let maxTime = Date.now()
			let data = this.msgList
			if (data.length == 0 && e) {
				data = e.data
			}
			if (data.length) {
				const {
					create_time,
					client_create_time
				} = data[data.length - 1]
				maxTime = create_time || client_create_time
				// console.log('maxTime',maxTime,);
			}
			let res = await this.getStorageMsg({
				maxTime
			});
			// console.log('res',res);
			this.storageMsg.hasMore = res.data.length != 0
			return res
		},
		hasMore: true,
		maxTime: false
	}
	afterStorageMsg = {
		//时间大于storage中最大时间的服务端数据
		get: async () => {
			let where = {
				minTime: this.storageMsg.maxTime
			}
			if (this.msgList && this.msgList.length) {
				where.maxTime = this.msgList[this.msgList.length - 1].create_time
			}
			let res = await this.getCloudMsg(where)
			//console.log(res)
			const dataLength = res.data.length
			if (dataLength) {
				//因为本地存储了新数据，所以本地最大时间戳需要变更
				// this.storageMsg.maxTime = res.data[0].create_time
			}
			this.afterStorageMsg.hasMore = dataLength != 0
			return res
		},
		hasMore: true
	}
	beforeStorageMsg = {
		get: async (e) => {
			let maxTime = Date.now()
			let data = this.msgList
			if (data.length == 0 && e) {
				data = e.data
			}
			if (data.length) {
				maxTime = data[data.length - 1].create_time
			}
			// console.log('maxTime',maxTime);
			let res = await this.getCloudMsg({
				minTime: 0,
				maxTime
			})
			this.beforeStorageMsg.hasMore = res.data.length != 0
			return res
		},
		hasMore: true
	}
}
