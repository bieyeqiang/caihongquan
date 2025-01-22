export default {
	pageLimit: 10,
	update (
		id,
		data
	) {
		let keyArray = id.split('-')
		let index = keyArray.length == 5 ? keyArray.pop() : false
		let key = keyArray.join('-')

		let res = uni.getStorageSync(key)
		res[index] = Object.assign(res[index], data)
		uni.setStorageSync(key, res)
	},
	getData ({
		conversation_id,
		page = 0,
		maxTime = false,
		miniTime = false,
		limit = this.pageLimit
	}) {
		let data = []
		let key_before = "uni-im-msg:" + conversation_id
		if (!conversation_id) {
			throw Error('无法指定')
		}
		let {
			keys,
			currentSize,
			limitSize
		} = uni.getStorageInfoSync()
		keys = keys.filter(k => k.indexOf(key_before) === 0)
		if (keys.length == 0) {
			return []
		}
		keys = keys.sort((a, b) => {
			return a.split('-')[3] - b.split('-')[3]
		})

		if (maxTime) {
			keys = keys.sort((a, b) => {
				return b.split('-')[3] - a.split('-')[3]
			})
			let key = keys.find(i => i.split('-')[3] < maxTime)
			if (!key) {
				return []
			}
			data = uni.getStorageSync(key) || []
			data = data.filter(item => item.create_time < maxTime)
		} else if (page != undefined) {
			if (page < 0) {
				page = keys.length + page
			}
			let key = keys[page]
			// console.log({key,keys,page});
			if (!key) {
				return []
			}
			data = uni.getStorageSync(key) || []
		}
		if (miniTime) {
			throw ('miniTime 暂未实现')
			keys = keys.sort((a, b) => {
				return a.split('-')[3] - b.split('-')[3]
			})
			key = keys.find(i => i.split('-')[3] > miniTime)
			if (!key) {
				return []
			}
			data = uni.getStorageSync(key) || []
			data = data.filter(item => item.create_time > miniTime)
		}
		return data
	},
	//防止测试时批量插入时，两次io的时间间隔低于1毫秒，索引值 = 时间戳+0.01 否则直接返回时间戳
	// 正常业务用不到，当前用户不可能在一毫秒内，发多条消息给同一个会话
	getUniqueIndex () {
		let t = Date.now()
		if (this.getUniqueIndex_data == undefined || this.getUniqueIndex_data[t] == undefined) {
			this.getUniqueIndex_data = {}
			this.getUniqueIndex_data[t] = 0
		} else {
			this.getUniqueIndex_data[t]++
		}
		// console.log(t + this.getUniqueIndex_data[t]/100);
		return t + this.getUniqueIndex_data[t] / 100
	},
	append (msg) {
		// console.log('appendData',msg);
		const { conversation_id } = msg
		// 收到消息后追加聊天记录到storage
		//查出最后一页数据
		let data = this.getData({
			conversation_id,
			page: -1
		})
		// console.log(111,data);
		//键前缀 uni-im-msg:	conversation_id	- 表索引id（一般为时间戳）-	index
		let key_before = 'uni-im-msg:' + conversation_id + '-'

		let key = ''
		if (data.length == 0 || data.length == this.pageLimit) {
			key = key_before + this.getUniqueIndex()
			data = []
		} else {
			key = key_before + data[0].id.split('-')[3]
		}
		msg.id = key + '-' + data.length
		data.push(msg)
		try {
			uni.setStorageSync(key, data)
		} catch (e) {
			console.error(e);
		}
		return msg
	},
	insert (msgList, isBefore) {
		const doFun = (msgList) => {
			// console.log('---------------------',msgList,msgList.length,JSON.stringify(msgList));
			let fistItem = msgList[0]
			if (!fistItem) {
				return
			}
			//查出最后一页数据
			let data = this.getData({
				conversation_id: fistItem.conversation_id,
				page: -1
			})
			let key = ''
			let key_before = 'uni-im-msg:' + fistItem.conversation_id + '-'
			if (data.length == 0 || data.length == this.pageLimit) {
				key = key_before + fistItem.create_time
				data = []
			} else {
				key = key_before + data[0].id.split('-')[3]
			}
			if (isBefore) {
				data.unshift(...msgList.splice(0, this.pageLimit - data.length))
			} else {
				data.push(...msgList.splice(0, this.pageLimit - data.length))
			}

			data = data.map((msg, index) => {
				msg.id = key + '-' + index
				return msg
			})
			uni.setStorageSync(key, data)
			if (msgList.length) {
				doFun(msgList)
			}
		}
		doFun(msgList)
	}
}
