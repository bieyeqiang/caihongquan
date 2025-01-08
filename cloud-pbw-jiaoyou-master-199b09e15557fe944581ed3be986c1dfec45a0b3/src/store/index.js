import Vue from 'vue'
import Vuex from 'vuex'
import { request } from '@/api/request'
import uniIm from './uniIm'
Vue.use(Vuex)


const store = new Vuex.Store({
  modules: {
    uniIm
  },
  state: {
    openExamineWx: true,//是否开启状态
    openExamineApp: true,//是否开启状态
    openModule: {//是否开启功能模块
      toLogin: false,//是否登录
      mapOrderShow: false,//是否开启地图的预约下单功能
      groupChat: false,//群聊开关
      groupChatBeginTime: '',//群聊显示开始的时间
      explore: [//陪伴轮播图
        {
          title: '',//标题
          describe: '',//描述
          image: '',//图片
        }
      ]
    },
    hasLogin: false,//账号是否登录
    hasImLogin: false,//小程序-IM是否登录
    hasAppImLogin: false,//APP-IM是否登录
    imBadge: 0,//im的未读消息数量
    timerIdent: false,//全局1s定时器，只在全局开启一个，所有需要定时执行的任务监听该值即可，无需额外开启
    loginProvider: "", // 用户名或其他唯一值
    nickname: "", // 昵称
    signature: "", // 签名
    avatar: "https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/image/face.jpg", // 头像
    gender: "", // 性别，0未知，1男，2女
    token: '', //用户token
    userInfo: {}, //用户信息
    sexType: 2,//匹配性别取向 0未知 1男  2女  3不限
    myLongitude: '',//我的定位坐标
    myLatitude: '',//我的定位坐标
    location: { //城市信息
      longitude: 0,//经度
      latitude: 0,//纬度
      province: '',//省份
      provinceId: '',//省份id
      city: '定位中...',//城市名称
      cityCode: '',//城市id
      area: '',//城市名称
      areaCode: '',//城市id
      address: '',//地址
    },
    cartCount: 0, //购物车数量
    orderCount: {}, //订单数量
    poiMovie: '电影院',//电影poi搜索
    poiTravel: '旅游景点',//旅行poi搜索
    poiFood: '火锅店|综合酒楼|海鲜酒楼|外国餐厅',//美食poi搜索
    poiHotel: '五星级宾馆|四星级宾馆|三星级宾馆',//酒店poi搜索
    receiveMessage: {}, // 接收新消息
    loginStateChanged: {}, // 登录状态变更
    sendMessageResponse: {}, // 消息发送结果回执
    receiveApplyJoinGroupApproval: [],// 入群通知列表
    friendInvitiaon: [], // 好友事件本地存储
    newFriendInvitiaon: 0, // 待处理的好友事件数量
    newReceiveApplyJoinGroupApproval: 0,//待处理的入群申请
    retractMessage: {},	// 撤回消息
    receiveChatRoomMessage: {},	// 接收聊天室新消息
    receiveMessageTransparent: {}, // 接收透传消息
    receiveMessageRefresh: {},// 同步漫游消息通知，注意：当 SDK 触发此函数时，说明该会话有同步下漫游消息，并且已经存储到本地数据库中
  },
  getters: {
    // 是否登录
    hasLogin (state) {
      return !!state.token;
    }
  },
  mutations: {
    login (state, val) {
      // 这里不去登录接口获取用户资料并赋值，是因为信息同步是异步的，可能还没同步下来（官方答案）
      state.hasLogin = true;
      state.loginProvider = val; // 用户名
    },
    //更新state的数据
    setStateAttr (state, param) {
      if (param instanceof Array) {
        for (let item of param) {
          state[item.key] = item.val;
        }
      } else {
        state[param.key] = param.val;
      }
    },
    //更新state obj对象的数据
    setStateObj (state, param) {
      for (let item of param) {
        state[item.obj][item.key] = item.val;
      }
    },
    //更新token
    setToken (state, data) {
      const { token, tokenExpired, uid } = data;
      state.token = token;

      if (data.token) uni.setStorageSync('uniIdToken', data.token);
      if (data.tokenExpired) uni.setStorageSync('tokenExpired', data.tokenExpired);
      this.dispatch('getUserInfo'); //更新用户信息
    },
    //退出登录
    logout (state) {
      console.log('退出登录', state)
      state.token = '';
      state.hasLogin = false
      uni.removeStorageSync('uniIdToken');
      uni.removeStorageSync('userUid');
      uni.removeStorageSync('userInfo');
      uni.removeStorageSync('tokenExpired');
      setTimeout(() => {
        state.userInfo = {};
      }, 1100)
    },
    // 极光im登录
    async imLogin () {

    },
    setOpenid (state, openid) {
      state.openid = openid
    },
    // 赋值登录名或唯一登录值
    setLoginProvider (state, val) {
      state.loginProvider = val
    },
    // 赋值昵称
    setNickname (state, val) {
      state.nickname = val
    },
    // 赋值性别
    setGender (state, val) {
      state.gender = val
    },
    // 赋值个人签名
    setSignature (state, val) {
      state.signature = val
    },
    // 赋值头像
    setAvatar (state, val) {
      state.avatar = val
    },
    // 赋值接收到的消息
    setReceiveMessage (state, param) {
      state.receiveMessage = param;
    },
    setReceiveChatRoomMessage (state, param) {
      state.receiveChatRoomMessage = param;
    },
    // 用户登录状态
    setLoginStateChanged (state, param) {
      state.loginStateChanged = param;
    },
    // 消息发送结果回执
    setSendMessageResponse (state, param) {
      state.sendMessageResponse = param;
    },
    // 新增好友消息事件
    addFriendInvitiaonChange (state, param) {
      state.newFriendInvitiaon++;
      var items = state.friendInvitiaon;
      items.unshift(param); // 保存在缓存中,此处应该配合API存在服务器上
      items = imUtils.combineObjectInList(items, "fromUsername");// 数组去除重复，item为重复判定项
      state.friendInvitiaon = items;	// 去重,重新赋值
    },
    setNewFriendInvitiaon (state, num) {
      state.newFriendInvitiaon = num; // 设置需要处理的好友数量
    },
    setFriendInvitiaon (state, param) {
      state.friendInvitiaon = param;
      state.newFriendInvitiaon = param.length;
    },
    // 新增入群消息事件
    addReceiveApplyJoinGroupApproval (state, param) {
      state.newReceiveApplyJoinGroupApproval++;
      var items = state.receiveApplyJoinGroupApproval;
      items.unshift(param); // 保存在缓存中,此处应该配合API存在服务器上
      state.receiveApplyJoinGroupApproval = items;// 重新赋值
    },
    addReceiveGroupAdminRejectListener (state, param) {
      state.newReceiveApplyJoinGroupApproval++;
      var items = state.receiveApplyJoinGroupApproval;
      items.unshift(param); // 保存在缓存中,此处应该配合API存在服务器上
      state.receiveApplyJoinGroupApproval = items;// 重新赋值
    },
    setReceiveApplyJoinGroupApproval (state, param) {
      state.receiveApplyJoinGroupApproval = param;
      state.newReceiveApplyJoinGroupApproval = param.length;
    },
    // 撤回消息事件
    setMessageRetract (state, param) {
      state.retractMessage = param;
    },
    // 新的透传消息
    setReceiveMessageTransparent (state, param) {
      state.receiveMessageTransparent = param;
    },
    // 同步漫游消息通知
    setReceiveMessageRefresh (state, param) {
      state.receiveMessageRefresh = param
    }
  },
  actions: {
    //更新用户信息
    async getUserInfo ({ state, commit }) {
      const res = await request('user', 'get', {}, {
        checkAuthInvalid: false
      });
      // console.log('vuex个人信息：', res);
      if (res.status == 1) {
        // console.log('个人信息-成功：', res);
        uni.setStorageSync('userUid', res.data._id)
        uni.setStorageSync('userInfo', res.data)
        const userInfo = res.data;
        commit('setStateAttr', {
          key: 'userInfo',
          val: userInfo
        })
        // 设置性别取向
        if (res.data.gender == 1) {
          state.sexType = 2
        }
        if (res.data.gender == 2) {
          state.sexType = 1
        }
      }
      if (res.status == 0) {
        console.log('个人信息-失败：', res);
        // commit('logout')
      }
    },
    // 提交聊天文字信息
    submitChatMsg: async function ({
      commit,
      state,
      rootState
    }, params) {
      return await new Promise((resolve, reject) => {
        // if (!state.hasLogin) {
        // 	reject("请先登录")
        // } else {
        switch (params.msgType) {
          case "text":
            // 文本消息
            delete (params["msgType"]);
            params.messageSendingOptions = {
              "isCustomNotificationEnabled": false, //是否开启自定义接收方通知栏功能，设置为 true 后可设置下面的 notificationTitle 和 notificationText。默认false,
              "notificationTitle": "我是自定义通知的标题",
              "notificationText": "我是自定义通知的内容",
              "needReadReceipt": true,	//设置是否需要对方发送已读回执
            }
            jpushIM.sendTextMessage(params, (res) => {
              if (res.errorCode == 0) {
                // uni.showModal({
                // 	title: '发送消息返回',
                // 	content: '',
                // 	showCancel: false,
                // 	cancelText: '',
                // 	confirmText: '',
                // 	success: res => {},
                // 	fail: () => {},
                // 	complete: () => {}
                // });
                resolve(res.data);
              } else {
                reject(res.errorMsg);
              }
            })
            break;
          case "image":
            // 图片消息
            // 将本地URL路径转换成绝对路径
            params.path = plus.io.convertLocalFileSystemURL(params.path);
            delete (params["msgType"]);
            jpushIM.sendImageMessage(params, (res) => {
              if (res.errorCode == 0) {
                console.log("JMessagePlugin sendImageMessage:" + JSON.stringify(res));
                resolve(res.data);
              } else {
                reject(res.errorMsg);
              }
            });
            break;
          case "video":
            // 视频消息
            // 将本地URL路径转换成绝对路径
            let localPath = params.videoFilePath;
            params.videoFilePath = plus.io.convertLocalFileSystemURL(params.videoFilePath);
            params.videoImagePath = plus.io.convertLocalFileSystemURL(params.videoImagePath);
            delete (params["msgType"]);
            // uni.showModal({
            // 	title: '发送视频消息',
            // 	content: JSON.stringify(params),
            // 	showCancel: false,
            // 	cancelText: '',
            // 	confirmText: '确定',
            // 	success: res => {},
            // 	fail: () => {},
            // 	complete: () => {}
            // });
            jpushIM.sendVideoMessage(params, (res) => {
              if (res.errorCode == 0) {
                // console.log("JMessagePlugin sendVideoMessage:" + JSON.stringify(res));
                // 刚发送完成之时，是没有文件url地址的
                resolve(res.data);
              } else {
                reject(res.errorMsg);
              }
            });
            break;
          case "voice":
            // 语音消息
            params.path = plus.io.convertLocalFileSystemURL(params.path);
            delete (params["msgType"]);
            // console.log("JMessagePlugin 发送语音消息:" + JSON.stringify(params));
            jpushIM.sendVoiceMessage(params, (res) => {
              if (res.errorCode == 0) {
                // console.log("JMessagePlugin sendVoiceMessage:" + JSON.stringify(res));
                resolve(res.data);
              } else {
                reject(res.errorMsg);
              }
            });
            break;
          case "file":
            // 文件消息
            params.path = plus.io.convertLocalFileSystemURL(params.path);
            delete (params["msgType"]);
            // console.log("JMessagePlugin 发送文件消息:" + JSON.stringify(params));
            jpushIM.sendFileMessage(params, (res) => {
              if (res.errorCode == 0) {
                // console.log("JMessagePlugin sendFileMessage:" + JSON.stringify(res));
                resolve(res.data);
              } else {
                reject(res.errorMsg);
              }
            });
            break;
          case "location":
            // 地理位置消息
            delete (params["msgType"]);
            // console.log("JMessagePlugin 发送文件消息:" + JSON.stringify(params));
            jpushIM.sendLocationMessage(params, (res) => {
              if (res.errorCode == 0) {
                console.log("JMessagePlugin sendLocationMessage:" + JSON.stringify(res));
                resolve(res.data);
              } else {
                reject(res.errorMsg);
              }
            });
            break;
          default:
            break;
          // }

        }
      })
    },
    // 获取当前IM用户信息是否存在，存在则登录commit, state,rootState
    // 不用传参
    checkCurrentIMUser: async function ({
      dispatch,
      commit
    }, params) {
      return await new Promise((resolve, reject) => {
        jpushIM.getMyInfo((res) => {
          if (res.errorCode == 0) {
            var data = res.data;
            commit('setLoginProvider', data.username);
            commit('setNickname', data.nickname);
            commit('setGender', data.gender);
            commit('setSignature', data.signature);
            commit('setAvatar', data.avatar);
            resolve(data);
          } else {
            reject(res.errorMsg);
          }
        })
      })
    },
    /**
     * 更新我的头像
     * @param {object} params = {
     *  imgPath: string // 相册/拍照后的图片路径。
     * }
     * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息',data:null}) {}
     */
    updateMyAvatar: async function ({
      commit,
      state,
      rootState
    }, params) {
      return await new Promise((resolve, reject) => {
        var origin = params.imgPath;
        if (origin) {
          // 将本地URL路径转换成平台绝对路径
          params.imgPath = plus.io.convertLocalFileSystemURL(params.imgPath);
        }
        jpushIM.updateMyAvatar(params, (res) => {
          if (res.errorCode == 0) {
            // var path = plus.io.convertAbsoluteFileSystem(params.imgPath);
            commit('setAvatar', origin);
            resolve(res);
          } else {
            reject(res.errorMsg);
          }
        })
      })
    },
  }
})

export default store
