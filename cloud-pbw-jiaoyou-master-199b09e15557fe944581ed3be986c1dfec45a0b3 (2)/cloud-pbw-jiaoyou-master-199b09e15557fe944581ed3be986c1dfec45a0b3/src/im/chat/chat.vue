<template>
  <view>
    <view class="content" @touchstart="hideDrawer">
      <scroll-view class="msg-list" scroll-y="true" :scroll-with-animation="scrollAnimation" :scroll-top="scrollTop" :scroll-into-view="scrollToView" @scrolltoupper="loadHistory" upper-threshold="20">
        <!-- 加载历史数据waitingUI -->
        <view class="loading" v-if="hasMoreLoading">
          <view class="spinner">
            <view class="rect1"></view>
            <view class="rect2"></view>
            <view class="rect3"></view>
            <view class="rect4"></view>
            <view class="rect5"></view>
          </view>
        </view>
        <!-- 加载更多 -->
        <view class="moreTitle">
          <text v-if="msgList.length">
            {{ hasMore ? '' : '没有更多历史消息~' }}
          </text>
        </view>
        <!-- 消息列表 -->
        <view class="row" v-for="(row, index) in msgList" :key="index" :id="'msg' + row.create_time">
          <view class="rowTime">{{ formatTimeMsg(index) }}</view>
          <!-- 系统消息 -->
          <block v-if="row.type == 'system'">
            <view class="system">
              <!-- 文字消息 -->
              <view v-if="row.type == 'text'" class="text">
                {{ row.body }}
              </view>
              <!-- 领取红包消息 -->
              <view v-if="row.type == 'redEnvelope'" class="red-envelope">
                <image src="../static/image/im/red-envelope-chat.png"></image>
                {{ row.body }}
              </view>
            </view>
          </block>

          <!-- 用户消息 -->
          <block v-if="row.type">
            <!-- 自己发出的消息 -->
            <view class="my" v-if="current_uid == row.from_uid">
              <!-- 左-消息 -->
              <view class="left">
                <!-- 文字消息 -->
                <view v-if="row.type == 'text'" class="bubble">
                  <rich-text :nodes="row.body"></rich-text>
                </view>
                <!-- 语音消息 -->
                <view v-if="row.type == 'sound'" class="bubble voice" @tap="playVoice(row)" :class="playMsgid == row.id ? 'play' : ''">
                  <view class="length">{{ row.body.length }}</view>
                  <view class="icon my-voice"></view>
                </view>
                <!-- 图片消息 -->
                <view v-if="row.type == 'image'" class="bubble img" @tap="showPic(row.body)">
                  <image
                    :src="row.body"
                    :style="{
                      width: '400rpx',
                      height: '250rpx'
                    }"
                  ></image>
                </view>
                <!-- 视频消息 -->
                <view v-if="row.type == 'video'">
                  <video
                    :src="row.body"
                    :style="{
                      width: '400rpx',
                      height: '250rpx'
                    }"
                  ></video>
                </view>
                <!-- 文件消息 -->
                <view v-if="row.type == 'file'" class="bubble">发送了文件[文件地址]：{{ row.body }}</view>
                <!-- 红包 -->
                <view v-if="row.type == 'redEnvelope'" class="bubble red-envelope" @tap="openRedEnvelope(row.body, index)">
                  <image src="../static/image/im/red-envelope.png"></image>
                  <view class="tis">
                    <!-- 点击开红包 -->
                  </view>
                  <view class="blessing" v-if="row.body.content">
                    {{ row.body.content.blessing }}
                  </view>
                </view>
              </view>
              <!-- 右-头像 -->
              <view class="right" @click="goPage('/pagesA/service/homePage/homePage?code=' + row.from_uid)">
                <image :src="userInfo.avatar || '../static/image/im/avatarUrl.png'"></image>
              </view>
            </view>
            <!-- 别人发出的消息 -->
            <view class="other" v-if="current_uid != row.from_uid">
              <!-- 左-头像 -->
              <view class="left" @click="goPage('/pagesA/service/homePage/homePage?code=' + row.from_uid)">
                <image :src="ownerInfo.avatar || '../static/image/im/avatarUrl.png'"></image>
              </view>
              <!-- 右-用户名称-时间-消息 -->
              <view class="right">
                <view class="username">
                  <view class="name">{{ ownerInfo.nickname }}</view>
                  <view class="time">{{ row.time }}</view>
                </view>
                <!-- 文字消息 -->
                <view v-if="row.type == 'text'" class="bubble">
                  <rich-text :nodes="row.body"></rich-text>
                </view>
                <!-- 语音消息 -->
                <view v-if="row.type == 'sound'" class="bubble voice" @tap="playVoice(row)" :class="playMsgid == row.id ? 'play' : ''">
                  <view class="icon other-voice"></view>
                  <view class="length">{{ row.body.length }}</view>
                </view>
                <!-- 图片消息 -->
                <view v-if="row.type == 'image'" class="bubble img" @tap="showPic(row.body)">
                  <image
                    :src="row.body"
                    :style="{
                      width: '400rpx',
                      height: '250rpx'
                    }"
                  ></image>
                </view>
                <!-- 视频消息 -->
                <view v-if="row.type == 'video'">
                  <video
                    :src="row.body"
                    :style="{
                      width: '400rpx',
                      height: '250rpx'
                    }"
                  ></video>
                </view>
                <!-- 文件消息 -->
                <view v-if="row.type == 'file'" class="bubble">发送了文件[文件地址]：{{ row.body }}</view>
                <!-- 红包 -->
                <view v-if="row.type == 'redEnvelope'" class="bubble red-envelope" @tap="openRedEnvelope(row.body, index)">
                  <image src="../static/image/im/red-envelope.png"></image>
                  <view class="tis">
                    <!-- 点击开红包 -->
                  </view>
                  <view class="blessing" v-if="row.body.content">
                    {{ row.body.content.blessing }}
                  </view>
                </view>
              </view>
            </view>
          </block>
        </view>
      </scroll-view>
    </view>
    <!-- 抽屉栏 -->
    <view class="popup-layer" :class="popupLayerClass" @touchmove.stop.prevent="discard">
      <!-- 表情 -->
      <swiper class="emoji-swiper" :class="{ hidden: hideEmoji }" indicator-dots="true" duration="150">
        <swiper-item v-for="(page, pid) in emojiList" :key="pid">
          <view v-for="(em, eid) in page" :key="eid" @tap="addEmoji(em)">
            <image mode="widthFix" :src="'../static/image/im/emoji/' + em.url"></image>
          </view>
        </swiper-item>
      </swiper>
      <!-- 更多功能 相册-拍照-红包 -->
      <view class="more-layer" :class="{ hidden: hideMore }">
        <view class="list">
          <view class="box" @tap="sendImg('album')">
            <image class="tabImg" src="../static/image/im/dialogue/dialogue1.png"></image>
            图片
          </view>
          <view class="box" @tap="sendImg('camera')">
            <image class="tabImg" src="../static/image/im/dialogue/dialogue2.png"></image>
            拍照
          </view>
          <view class="box" @tap="sendVideo()">
            <image class="tabImg" src="../static/image/im/dialogue/dialogue4.png"></image>
            视频
          </view>
          <view class="box" @tap="sendFile()">
            <image class="tabImg" src="../static/image/im/dialogue/dialogue8.png"></image>
            文件
          </view>
          <view class="box" @tap="handRedEnvelopes">
            <image class="tabImg" src="../static/image/im/dialogue/dialogue7.png"></image>
            红包
          </view>
        </view>
      </view>
    </view>
    <!-- 底部输入栏 -->
    <view class="input-box" :class="popupLayerClass" @touchmove.stop.prevent="discard">
      <!-- H5下不能录音，输入栏布局改动一下 -->
      <!-- #ifndef H5 -->
      <view class="voice">
        <image v-if="!isVoice" @tap="switchVoice" class="tabIcon" src="../static/image/im/dialogue/icon1.png"></image>
        <image v-if="isVoice" @tap="switchVoice" class="tabIcon" src="../static/image/im/dialogue/icon4.png"></image>
      </view>
      <!-- #endif -->
      <!-- #ifdef H5 -->
      <view class="more" @tap="showMore">
        <image class="tabIcon" src="../static/image/im/dialogue/icon3.png"></image>
      </view>
      <!-- #endif -->
      <view class="textbox">
        <view
          class="voice-mode"
          :class="[isVoice ? '' : 'hidden', recording ? 'recording' : '']"
          @touchstart="voiceBegin"
          @touchmove.stop.prevent="voiceIng"
          @touchend="voiceEnd"
          @touchcancel="voiceCancel"
          >{{ voiceTis }}</view
        >
        <view class="text-mode" :class="isVoice ? 'hidden' : ''">
          <view class="box">
            <textarea auto-height="true" v-model="chatText" @focus="textareaFocus" />
          </view>
          <view class="em" @tap="chooseEmoji">
            <image class="tabIcon" src="../static/image/im/dialogue/icon2.png"></image>
          </view>
        </view>
      </view>
      <!-- #ifndef H5 -->
      <view class="more" @tap="showMore">
        <image class="tabIcon" src="../static/image/im/dialogue/icon3.png"></image>
      </view>
      <!-- #endif -->
      <view class="send" :class="isVoice ? 'hidden' : ''" @tap="sendText">
        <view class="btn">发送</view>
      </view>
    </view>
    <!-- 录音UI效果 -->
    <view class="record" :class="recording ? '' : 'hidden'">
      <view class="ing" :class="willStop ? 'hidden' : ''">
        <view class="icon luyin2"></view>
      </view>
      <view class="cancel" :class="willStop ? '' : 'hidden'">
        <view class="icon chehui"></view>
      </view>
      <view class="tis" :class="willStop ? 'change' : ''">{{ recordTis }}</view>
    </view>
    <!-- 红包弹窗 -->
    <view class="windows" :class="windowsState">
      <!-- 遮罩层 -->
      <view class="mask" @touchmove.stop.prevent="discard" @tap="closeRedEnvelope"></view>
      <view class="layer" @touchmove.stop.prevent="discard">
        <view class="open-redenvelope">
          <view class="top">
            <view class="close-btn">
              <view class="icon close" @tap="closeRedEnvelope"></view>
            </view>
            <image src="../static/image/im/face_1.jpg"></image>
          </view>
          <view class="from">来自{{ redenvelopeData.from }}</view>
          <view class="blessing">{{ redenvelopeData.blessing }}</view>
          <view class="money">{{ redenvelopeData.money }}</view>
          <view class="showDetails" @tap="toDetails(redenvelopeData.rid)">
            查看领取详情
            <view class="icon to"></view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
// #ifdef APP-PLUS
// 定义weex的dom模块（https://doc.weex.io/zh/docs/modules/dom.html#scrolltoelement）
const dom = weex.requireModule('dom') || {}
// #endif
let oldScrollTop

import { store as uniIdStore } from '@/store/index.js'

import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

import MsgManager from '@/common/im/msgManager.js'
import uniImUtils from '@/common/im/utils.js'

export default {
  data() {
    return {
      hasMoreLoading: false,
      //文字消息
      chatText: '',
      //消息列表
      isHistoryLoading: false,
      scrollAnimation: false,
      scrollTop: 0,
      scrollToView: '',
      msgImgList: [],
      myuid: 0,
      //录音相关参数
      // #ifndef H5
      //H5不能录音
      RECORDER: uni.getRecorderManager(),
      // #endif
      isVoice: false,
      voiceTis: '按住 说话',
      recordTis: '手指上滑 取消发送',
      recording: false,
      willStop: false,
      initPoint: { identifier: 0, Y: 0 },
      recordTimer: null,
      recordLength: 0,

      //播放语音相关参数
      AUDIO: uni.createInnerAudioContext(),
      playMsgid: null,
      VoiceTimer: null,
      // 抽屉参数
      popupLayerClass: '',
      // more参数
      hideMore: true,
      //表情定义
      hideEmoji: true,
      emojiList: [
        [
          { url: '100.png', alt: '[开心]' },
          { url: '101.png', alt: '[伤心]' },
          { url: '102.png', alt: '[酷酷]' },
          { url: '103.png', alt: '[生气]' }
        ]
      ],
      //表情图片图床名称 ，由于我上传的第三方图床名称会有改变，所以有此数据来做对应，您实际应用中应该不需要
      onlineEmoji: {
        '100.png': '100.png',
        '101.png': '101.png',
        '102.png': '102.png',
        '103.png': '103.png'
      },
      //红包相关参数
      windowsState: '',
      redenvelopeData: {
        rid: null, //红包ID
        from: null,
        face: null,
        blessing: null,
        money: null
      },
      //消息列表数据
      msgList: [],
      //当前会话对象id
      conversation_id: false,
      //聊天输入框高度
      textareaHeight: 26,
      //正在加载更多聊天数据
      loadMoreIng: true,
      //收到正在对话的用户发来新消息，时悬浮按钮提示
      hasNews: true,
      //是否为pc宽屏（width>960px）
      isWidescreen: false,
      hasMore: true,
      //长按消息气泡显示的组件位置内容等信息
      controlData: {
        top: '',
        left: '',
        right: '',
        msg: {},
        isShow: false
      },
      //系统信息
      systemInfo: {},
      userInfo: uni.getStorageSync('userInfo'),
      ownerInfo: '',
      ownerId: ''
    }
  },
  computed: {
    ...mapState({
      currentConversationId: (state) => state.uniIm.currentConversationId
    }),
    ...mapGetters({
      conversation: 'uniIm/conversation',
      //未读消息数量
      unread_count: 'uniIm/unread_count'
    }),
    currentConversation() {
      let conversation_id = this.conversation_id //|| this.currentConversationId
      // console.log('this.currentConversationId',this.currentConversationId,this.conversation_id);
      return this.conversation(conversation_id) || {}
    },
    isSafariPc() {
      return this.systemInfo.browserName == 'safari' && this.isWidescreen
    },
    msg() {
      let conversation_id = this.conversation_id //|| this.currentConversationId
      if (conversation_id) {
        const msgManagers = getApp().globalData.uniIm.msgManagers
        let msgManager = msgManagers[conversation_id]
        if (!msgManager) {
          msgManagers[conversation_id] = new MsgManager(this.currentConversation)
        }
        return msgManagers[conversation_id]
      }
      return {}
    },
    //聊天数据
    //当前会话的聊天框文字内容
    // chatText2: {
    //   get () {
    //     return this.currentConversation?.chatText
    //   },
    //   set (chatText) {
    //     this.updateConversation([
    //       this.conversation_id,
    //       {
    //         chatText
    //       }
    //     ])
    //   }
    // },
    //当前用户自己的uid
    current_uid() {
      const uid = uni.getStorageSync('userUid')
      return uid
    }
  },
  watch: {
    async ownerId(val) {
      const res = await this.$request('user', 'getUid', {
        uid: val
      })
      this.ownerInfo = res.data
      console.log(this.ownerInfo, '555555555')
      uni.setNavigationBarTitle({
        title: res.data.nickname
      })
    },
    'currentConversation.msgList'(data) {
      console.log('watch currentConversation.msgList', data)
      if (data.length > 0) {
        const userUid = uni.getStorageSync('userUid')
        if (userUid == data[0].to_uid) {
          this.ownerId = data[0].from_uid
        } else {
          this.ownerId = data[0].to_uid
        }
      }
      let msgList = JSON.parse(JSON.stringify(data))

      if (this.msgList.length == 0 && msgList.length > 10) {
        this.$nextTick(() => {
          this.msgList = msgList.slice(0, 10).reverse()
          setTimeout(() => {
            this.msgList.unshift(...msgList.slice(10, -1).reverse())
          }, 1000)
        })
      } else {
        this.msgList = msgList.reverse()
      }
    },

    // #ifdef APP-PLUS
    // 设置原生标题栏按钮角标值 = 非当前正在聊的用户，发来的未读消息数量
    unread_count(unread_count) {
      plus.webview.currentWebview().setTitleNViewButtonStyle(0, {
        text: unread_count == 0 ? '' : unread_count,
        background: '#E5E5E5'
      })
    },
    // #endif
    currentConversation(data) {
      // console.log(11231133123213,data);
      if (data && data.title) {
        //设置标题栏文字
        uni.setNavigationBarTitle({
          title: data.title
        })
      }
    }
  },
  created() {
    this.systemInfo = uni.getSystemInfoSync()
    // #ifndef H5
    // 监听键盘高度变化显示最后一条消息
    uni.onKeyboardHeightChange(({ height }) => {
      this.showLast(0)
    })
    // #endif

    // 监听推送消息
    uni.onPushMessage((res) => {
      console.log(res, '监听到推送消息')
      //获取透传内容
      const { type, data } = res.data.payload
      //判断消息类型是否为im
      if (type == 'im' && data.conversation_id == this.currentConversationId) {
        //已经打开的页面收到对应的聊天记录，状态设置为已读
        this.clearUnreadCount(this.currentConversationId)
        // console.log('聊天页面-收到消息: ', JSON.stringify(res));
        this.hasNews = true
        //滚动
        setTimeout(() => {
          this.scrollToView = 'msg' + res.data.payload.data.create_time //跳转上次的第一行信息位置
          this.scrollAnimation = true //恢复滚动动画
        }, 1000)
      }
    })

    // #ifdef H5
    //上传图片并发送
    let uploadAndSend = (blobUrl, type) => {
      console.log(blobUrl)
      uni.showLoading()
      uniCloud
        .uploadFile({
          filePath: blobUrl,
          cloudPath: '/chatImg/' + this.currentConversationId + Date.now() + '.jpg'
        })
        .then(({ fileID }) => {
          uni.hideLoading()
          console.log({
            fileID
          })
          let data = {}
          data[type] = fileID
          this.beforeSendMsg(data)
        })
    }

    // 以下为实现拖拽或粘贴图片至聊天页面，直接发送的逻辑
    // 阻止默认事件
    document.addEventListener(
      'dragover',
      function (event) {
        event.preventDefault()
      },
      false
    )

    // 拖拽结束时触发
    document.addEventListener(
      'drop',
      (e) => {
        //取消默认浏览器拖拽效果
        e.preventDefault()
        //获取文件对象
        let fileList = e.dataTransfer.files
        if (fileList.length == 0) {
          return false
        }

        if (fileList[0].type.indexOf('image') === -1) {
          return uni.showToast({
            title: '暂时仅支持发送图片',
            icon: 'none'
          })
        }
        let blobUrl = window.URL.createObjectURL(fileList[0])
        uploadAndSend(blobUrl, fileList[0].type.indexOf('image') === -1 ? 'file' : 'img')
      },
      false
    )

    // 粘贴时触发
    document.addEventListener('paste', (event) => {
      if (event.clipboardData || event.originalEvent) {
        //某些chrome版本使用的是event.originalEvent
        let clipboardData = event.clipboardData || event.originalEvent.clipboardData
        let text = clipboardData.getData('text')
        if (text) {
          console.log(text)
          if (text.length > 400) {
            uni.showModal({
              content: '你粘贴的文本长度超过400，将被截断。',
              complete: (e) => {
                if (!e.confirm) {
                  setTimeout(() => {
                    this.chatText = ''
                  }, 10)
                }
              }
            })
          }
        }

        if (clipboardData.items) {
          let items = clipboardData.items,
            len = items.length,
            blob = null
          for (let i = 0; i < len; i++) {
            // console.log(items[i]);
            if (items[i].type.indexOf('image') !== -1) {
              //getAsFile() 此方法只是living standard firefox ie11 并不支持
              blob = items[i].getAsFile()
            }
          }
          if (blob !== null) {
            let blobUrl = URL.createObjectURL(blob)
            console.log(blobUrl)
            uploadAndSend(blobUrl, 'img')
          }
        }
      }
    })
    // #endif
  },
  mounted() {
    // #ifdef H5
    //实现（shift ctrl alt windows/mac） + enter 是换行输入而不是直接发送
    //定义adjunct建未被按下
    let adjunctKeydown = false
    //获得消息输入框对象
    const inputBox = document.querySelector('.input-box .pc textarea')
    if (inputBox) {
      //键盘按下时
      inputBox.onkeydown = (e) => {
        // console.log('onkeydown', e.keyCode)
        if ([16, 17, 18, 93].includes(e.keyCode)) {
          //按下了shift ctrl alt windows键
          adjunctKeydown = true
        }
        // console.log('onkeydown：', e,'adjunctKeydown：', adjunctKeydown);
        // 宽屏 且 按下了enter键 且没按下adjunct键 时直接发送消息
        if (this.isWidescreen && e.keyCode == 13 && !adjunctKeydown) {
          this.beforeSendMsg()
        }
      }
      inputBox.onkeyup = (e) => {
        //松开adjunct键
        if ([16, 17, 18, 93].includes(e.keyCode)) {
          adjunctKeydown = false
          console.log('adjunctKeydown', adjunctKeydown)
        }
      }
    }
    // #endif
  },
  beforeDestroy() {
    //页面销毁之前销毁 全局变量 正在聊天的用户的id
    this.setCurrentConversationId(false)
    // console.log('beforeDestroy');
  },
  onPageScroll(e) {
    console.log('onPageScroll', e)
    // 监听窗口滚动。500毫秒内滚动条高度值一致，即滚动结束时。触发加载更多消息前置方法
    setTimeout(() => {
      if (oldScrollTop == e.scrollTop) {
        // console.log('滚动结束', oldScrollTop);
        this.beforeLoadMore(e.scrollTop)
      }
    }, 500)
    oldScrollTop = e.scrollTop
  },
  async onLoad(e) {
    //语音自然播放结束
    this.AUDIO.onEnded((res) => {
      this.playMsgid = null
    })
    // #ifndef H5
    //录音开始事件
    this.RECORDER.onStart((e) => {
      this.recordBegin(e)
    })
    //录音结束事件
    this.RECORDER.onStop((e) => {
      this.recordEnd(e)
    })
    // #endif

    // 获取消息列表
    if (!e.conversation_id && e.user_id) {
      e.conversation_id = uniImUtils.getConversationId(e.user_id)
    }
    //调用load方法，因为pc宽屏时本页面是以组件形式展示。如$refs.chatView.loadconversation_id()执行
    await this.load(e.conversation_id)
  },
  onShow() {
    // 加载初始页面消息
    this.getMsgList()

    if (this.currentConversation.id) {
      // 窗口显示时（因为可能是有其他app切换进已打开的本窗口，所以是onshow而不只是onload）设置全局变量 正在聊天的用户的会话id
      this.setCurrentConversationId(this.currentConversation.id)
    }
  },
  methods: {
    formatTimeMsg(key) {
      const index = key
      const msg = this.msgList[index]
      let timestamp = msg.create_time || msg.client_create_time
      // console.log(index,'body:'+msg.body)
      if (index && index != this.msgList.length - 1) {
        // console.log(index)
        let PrevMsg = this.msgList[index - 1]
        let PrevTimestamp = PrevMsg.create_time || PrevMsg.client_create_time
        //两条消息之间间隔低于1分钟不显示
        // console.log(PrevTimestamp - timestamp)
        if (PrevTimestamp - timestamp < 60 * 1000) {
          return ''
        }
      }
      // return timeSpanStr;
      return uniImUtils.formatTime(timestamp)
    },
    async load(conversation_id) {
      this.loadMoreIng = true

      //设置当前会话id
      //设置全局的app当前正在聊天的会话id
      this.setCurrentConversationId(conversation_id)

      this.conversation_id = conversation_id
      if (!this.currentConversation.id) {
        //如果内存中取不到再从云端拉取，当用户直接访问或刷新本页面时需要
        if (!(await this.loadConversation(conversation_id))) {
          return uni.showToast({
            title: '无效的conversation_id',
            icon: 'none'
          })
        }
      }
      //清除未读数
      if (this.currentConversation.unread_count) {
        this.clearUnreadCount(this.conversation_id)
      }
      if (!this.msg.isInit) {
        //加载数据
        let data = await this.msg.getMore()
        // console.log('msgManagers',getApp().globalData.uniIm.msgManagers);
        this.setMsgList({
          conversation_id: this.conversation_id,
          data
        })
        this.hasMore = !!data.length
        this.updateConversation([
          this.conversation_id,
          {
            isInit: true
          }
        ])
        if (this.msgList.length < this.msg.pageLimit && this.hasMore) {
          let data = await this.loadMore()
          // console.log('data', data);
          this.hasMore = !!data.length
        }
      }

      // #ifndef APP-PLUS
      //滚动列表直至显示一屏
      this.$nextTick(() => {
        this.showLast(0)
      })
      // #endif

      setTimeout(() => {
        this.loadMoreIng = false
      }, 1000)

      //debug用模拟一次性自动发送100条数据
      // for (var i = 0; i < 20; i++) {
      // 	this.chatText = '这是第'+i+'条消息'
      // 	this.beforeSendMsg()
      // }*/
    },
    async beforeLoadMore(scrollTop) {
      if (this.isSafariPc) {
        return
      }
      // console.log(' beforeLoadMore scrollTop', scrollTop, scrollTop !== false);
      if (scrollTop !== false) oldScrollTop = scrollTop

      //滚动条高度小于500且并不是正在加载中 且还有更多数据 就执行加载更多
      if (this.currentConversationId && oldScrollTop < 100 && !this.loadMoreIng && this.hasMore) {
        this.loadMoreIng = true
        const res = await this.loadMore(oldScrollTop)
        //这段代码很重要，不然每次加载历史数据都会跳到顶部
        console.log(res, '上拉数据')
        console.log(res[res.length - 1], '最后一条')
        this.scrollAnimation = false
        setTimeout(() => {
          this.scrollToView = 'msg' + res[0].create_time //跳转上次的第一行信息位置
          this.isHistoryLoading = false
          setTimeout(() => {
            this.scrollAnimation = true //恢复滚动动画
          }, 500)
        }, 500)
      } else {
        this.loadMoreIng = false
        // console.log('不能loadMore', this.currentConversationId, oldScrollTop < 100, !this.loadMoreIng, this.hasMore);
      }
    },
    async loadMore(oldScrollTop) {
      let data = await this.msg.getMore()
      console.log('加载到' + data + '条新数据')
      if (data.length) {
        // #ifndef APP-PLUS
        if (this.isWidescreen) {
          // this.$emit('setScroll', 150)
        } else {
          uni.pageScrollTo({
            scrollTop: 1,
            duration: 0,
            complete: (e) => {
              // console.log(e);
            }
          })
        }
        // #endif
        this.setMsgList({
          conversation_id: this.conversation_id,
          action: 'push',
          data
        })
        uni.hideLoading()
        this.loadMoreIng = false
      } else {
        this.hasMore = false
        uni.hideLoading()
        this.loadMoreIng = false
      }
      return data
    },
    // 发送图片
    async sendImg(sourceType) {
      uniCloud.chooseAndUploadFile({
        type: 'image',
        count: 1,
        sizeType: ['compressed'],
        sourceType: [sourceType],
        success: (e) => {
          console.log(e)
          e.tempFiles.forEach((event) => {
            let { url, type, fileType } = event
            console.log('event', event)
            console.log({
              url,
              type,
              fileType
            })
            // #ifndef APP || MP-WEIXIN
            fileType = type.split('/')[0]
            // #endif
            // console.log('fileType', fileType);
            switch (fileType) {
              case 'image':
                this.beforeSendMsg({
                  img: url
                })
                break
              case 'video':
                this.beforeSendMsg({
                  video: url
                })
                break
              default:
                break
            }
            uni.showLoading()
          })
        },
        fail(e) {
          console.error(e)
          // uni.showToast({
          // 	title: JSON.stringify(e),
          // 	icon: 'none'
          // });
        },
        complete() {
          uni.hideLoading()
        }
      })
    },
    // 发送视频
    async sendVideo(sourceType) {
      uniCloud.chooseAndUploadFile({
        type: 'video',
        compressed: true,
        success: (e) => {
          console.log(e)
          e.tempFiles.forEach((event) => {
            let { url, type, fileType } = event
            // console.log('event',event);
            // console.log({
            // 	url,
            // 	type,
            // 	fileType
            // });
            // #ifndef APP
            fileType = type.split('/')[0]
            // #endif
            // console.log('fileType', fileType);
            this.beforeSendMsg({
              video: url
            })
            uni.showLoading()
          })
        },
        fail(e) {
          console.error(e)
          // uni.showToast({
          // 	title: JSON.stringify(e),
          // 	icon: 'none'
          // });
        },
        complete() {
          uni.hideLoading()
        }
      })
    },
    // 发送文件
    async sendFile() {
      console.log('123213')
      uniCloud.chooseAndUploadFile({
        type: 'all',
        count: 1,
        success: (e) => {
          console.log(e, 'success')
          e.tempFiles.forEach((event) => {
            let { url, type, fileType } = event
            // console.log('event',event);
            // console.log({
            // 	url,
            // 	type,
            // 	fileType
            // });
            // #ifndef APP
            fileType = type.split('/')[0]
            // #endif
            // console.log('fileType', fileType);
            this.beforeSendMsg({
              file: url
            })
            uni.showLoading()
          })
        },
        fail(e) {
          console.error(e, 'error')
          // uni.showToast({
          // 	title: JSON.stringify(e),
          // 	icon: 'none'
          // });
        },
        complete() {
          uni.hideLoading()
        }
      })
    },
    touchList() {
      uni.hideKeyboard()
    },
    input() {
      // 此事件仅非宽屏设备才会调用 非 Android端一旦输入换行符合直接发送消息
      if (this.systemInfo.platform != 'android' && this.chatText.indexOf('\n') >= 0) {
        // console.log("有\n",this.chatText, this.chatText.length);
        this.chatText = this.chatText.substring(0, this.chatText.length - 1)
        //检查去除换行符后是否为空
        if (ClearBr(this.chatText).length) {
          this.beforeSendMsg()
        } else {
          uni.showToast({
            title: '不能发送空消息',
            icon: 'none'
          })
          this.chatText = ''
          this.$nextTick(() => {
            this.chatText = ''
            this.textareaHeight = 26
          })
        }

        function ClearBr(key) {
          key = key.replace(/<\/?.+?>/g, '')
          key = key.replace(/[\r\n]/g, '')
          return key
        }
      }
    },
    async beforeSendMsg(param = {}) {
      if (this.chatText) {
        this.chatText = this.chatText.trim()
      }
      const chatText = this.chatText
      let { img, voice, video, file, redEnvelope } = param
      console.log('param', param)
      if (!(file || img || voice || video || redEnvelope || chatText)) {
        //输入空格后trim发送失败，应当清除空格
        setTimeout((e) => {
          this.chatText = ''
        }, 0)
        return uni.showToast({
          title: '不能发送空消息',
          icon: 'none'
        })
      }
      //如果是发图片则不要清空文本框内容
      if (!(file || img || voice || video)) {
        setTimeout((e) => {
          this.chatText = ''
        }, 0)
      }
      let data = {
        type: 'text',
        body: chatText
      }
      if (img) {
        data.type = 'image'
        data.body = img
      }
      if (voice) {
        data.type = 'sound'
        data.body = voice
      }
      if (video) {
        data.type = 'video'
        data.body = video
      }
      if (file) {
        data.type = 'file'
        data.body = file
      }
      if (redEnvelope) {
        data.type = 'redEnvelope'
        data.body = redEnvelope
      }
      data = Object.assign(data, {
        to_uid: this.currentConversation.user_id,
        conversation_id: this.currentConversation.id,
        group_id: this.currentConversation.group_id,
        client_create_time: Date.now(),
        from_uid: this.current_uid,
        state: 0
      })
      // console.log('beforeSendMsg', 3);
      let resMsg = await this.setMsgList({
        conversation_id: this.conversation_id,
        action: 'unshift',
        save: true,
        data
      })
      data = {
        ...data
      }
      data.id = resMsg.id
      this.sendMsg(data)
      setTimeout(() => {
        this.textareaHeight = 26
      }, 100)
      this.showLast()
    },
    sendMsg(data, callback) {
      console.log('sendMsg-sendMsg-sendMsg', data)

      const uniImCo = uniCloud.importObject('uni-im-co', {
        customUI: true
      })
      // 接收消息的appId，默认为当前应用的appId。如果你是2个不同appId的应用相互发，请修改此值为相对的appId
      data.appId = this.systemInfo.appId

      uniImCo
        .sendMsg(data)
        .then((e) => {
          data = JSON.parse(JSON.stringify(data))
          let state = e.errCode === 0 ? 1 : -100
          data.state = state
          data.create_time = e.data.create_time
          this.chatText = ''

          this.setMsgList({
            conversation_id: this.conversation_id,
            action: 'update',
            data
          })
          // console.log(`第${JSON.stringify(data.id)}条消息发送回调事件`, e);
          // 更新用户列表上的时间与消息内容

          // 滚动到底
          setTimeout(() => {
            this.scrollToView = 'msg' + e.data.create_time
          }, 200)
        })
        .catch((e) => {
          console.log(63963, e.errCode, e.message)
          data.state = -200
          console.log(`第${JSON.stringify(data.id)}条消息发送回调事件`, e)
          //更新用户列表上的时间与消息内容
        })
        .finally((e) => {
          if (callback) {
            callback(e)
          }
        })
    },
    retries(data) {
      uni.showLoading({
        mask: true
      })
      console.log('retries', data)
      this.sendMsg(data, (e) => {
        uni.hideLoading()
      })
    },
    showLast(duration = 300) {
      if (this.isWidescreen) {
        uni.$emit('uni-im-showLast')
      } else {
        this.hasNews = false
        // console.log(this.msgList.length);
        if (this.msgList && this.msgList.length) {
          setTimeout(() => {
            // #ifdef APP-PLUS
            let target = this.$refs['uni-im-msg'][this.msgList.length - 1]
            // console.log('滚动到', this.msgList[this.msgList.length - 1].body);
            dom.scrollToElement(target, {
              animated: duration != 0,
              offset: 500
            })
            // #endif

            // #ifndef APP-PLUS
            // 获取容器高度，使页面滚动到容器底部
            uni
              .createSelectorQuery()
              .select('.msg-list')
              .boundingClientRect((rect) => {
                // console.log('容器高度',rect);
                if (rect) {
                  // 使页面滚动到底部
                  // console.log('showLast',rect.height);
                  uni.pageScrollTo({
                    scrollTop: rect.height,
                    duration,
                    complete: (e) => {
                      // console.log(e);
                    }
                  })
                }
              })
              .exec()
            // #endif
          }, 500)
        }
      }
    },

    async showControl({ index, msgContentDomInfo }) {
      console.log('index', index, this.msgList, this.msgList[index])
      let isSelf = this.msgList[index].from_uid == this.current_uid
      let controlData = {
        msg: this.msgList[index],
        msgIndex: index,
        isInTop: false
      }

      console.log('msgContentDomInfo', JSON.stringify(msgContentDomInfo))
      let { top, bottom, left, right, width, height } = msgContentDomInfo
      controlData.width = width
      if (isSelf) {
        controlData.right = width / 3 + 'px'
        controlData.left = ''
      } else {
        controlData.left = width / 3 + 'px'
        controlData.right = ''
      }

      // #ifdef H5
      if (top < 60) {
        controlData.top = bottom + 55 + 'px'
      } else {
        controlData.top = top - 20 + 'px'
      }
      // #endif

      // #ifndef H5
      if (top < 60) {
        controlData.top = bottom + 8 + 'px'
      } else {
        controlData.top = top - 65 + 'px'
      }
      // #endif
      controlData.isInTop = top > 60
      this.controlData = controlData
      this.$refs['uni-im-control'].isShow = true
      console.log(index)
    },
    tapUnreadCount() {
      //点击未读消息文字按钮事件
      if (this.isWidescreen) {
        // this.$emit('tapUnreadCount') //点击后会话列表自动滚动 置顶 待读项
        console.log('tapUnreadCount')
      } else {
        uni.navigateBack()
      }
    },
    stop(event) {
      event.stopPropagation()
    },
    ...mapActions({
      // 加载更多会话数据
      getConversation: 'uniIm/getConversation',
      clearUnreadCount: 'uniIm/clearUnreadCount',
      setMsgList: 'uniIm/setMsgList',
      getMsgManager: 'uniIm/getMsgManager',
      loadConversation: 'uniIm/loadMoreConversation'
    }),
    ...mapMutations({
      setCurrentConversationId: 'uniIm/setCurrentConversationId',
      updateConversation: 'uniIm/updateConversation',
      updateMsgManager: 'uniIm/updateMsgManager',
      addMsgManager: 'uniIm/addMsgManager'
    }),

    // 接受消息(筛选处理)
    screenMsg(msg) {
      //从长连接处转发给这个方法，进行筛选处理
      if (msg.type == 'system') {
        // 系统消息
        switch (msg.msg.type) {
          case 'text':
            this.addSystemchatText(msg)
            break
          case 'redEnvelope':
            this.addSystemRedEnvelopeMsg(msg)
            break
        }
      } else if (msg.type == 'user') {
        // 用户消息
        switch (msg.msg.type) {
          case 'text':
            this.addchatText(msg)
            break
          case 'voice':
            this.addVoiceMsg(msg)
            break
          case 'img':
            this.addImgMsg(msg)
            break
          case 'redEnvelope':
            this.addRedEnvelopeMsg(msg)
            break
        }
        console.log('用户消息')
        //非自己的消息震动
        if (msg.msg.userinfo.uid != this.myuid) {
          console.log('振动')
          uni.vibrateLong()
        }
      }
      setTimeout(() => {
        // 滚动到底
        this.scrollToView = 'msg' + msg.client_create_time
      }, 200)
    },

    //触发滑动到顶部(加载历史信息记录)
    async loadHistory(e) {
      console.log(e, '触发滑动到顶部')
      this.hasMoreLoading = true
      if (this.isHistoryLoading) {
        return
      }
      this.isHistoryLoading = true //参数作为进入请求标识，防止重复请求
      this.scrollAnimation = false //关闭滑动动画
      if (this.hasMore) {
        this.beforeLoadMore(0)
      } else {
        this.isHistoryLoading = false
      }
      setTimeout(() => {
        this.hasMoreLoading = false
      }, 1000)
    },
    // 加载初始页面消息
    getMsgList() {
      // 滚动到底部
      this.$nextTick(function () {
        //进入页面滚动到底部
        setTimeout(() => {
          this.scrollToView = 'msg' + this.msgList[this.msgList.length - 1].create_time
          this.$nextTick(function () {
            this.scrollAnimation = true
          })
        }, 2000)
      })
    },
    //处理图片尺寸，如果不处理宽高，新进入页面加载图片时候会闪
    setPicSize(content) {
      // 让图片最长边等于设置的最大长度，短边等比例缩小，图片控件真实改变，区别于aspectFit方式。
      let maxW = uni.rpx2px(350) //350是定义消息图片最大宽度
      let maxH = uni.rpx2px(350) //350是定义消息图片最大高度
      if (content.w > maxW || content.h > maxH) {
        let scale = content.w / content.h
        content.w = scale > 1 ? maxW : maxH * scale
        content.h = scale > 1 ? maxW / scale : maxH
      }
      return content
    },

    //更多功能(点击+弹出)
    showMore() {
      this.isVoice = false
      this.hideEmoji = true
      if (this.hideMore) {
        this.hideMore = false
        this.openDrawer()
      } else {
        this.hideDrawer()
      }
    },
    // 打开抽屉
    openDrawer() {
      this.popupLayerClass = 'showLayer'
    },
    // 隐藏抽屉
    hideDrawer() {
      this.popupLayerClass = ''
      setTimeout(() => {
        this.hideMore = true
        this.hideEmoji = true
      }, 150)
    },

    //发红包
    handRedEnvelopes() {
      uni.showToast({
        title: '暂未开放,敬请期待',
        duration: 3000,
        icon: 'none'
      })
      return
      uni.navigateTo({
        url: '/im/hand/hand'
      })
      this.hideDrawer()
    },
    // 选择表情
    chooseEmoji() {
      this.hideMore = true
      if (this.hideEmoji) {
        this.hideEmoji = false
        this.openDrawer()
      } else {
        this.hideDrawer()
      }
    },
    //添加表情
    addEmoji(em) {
      console.log(em.alt)
      this.chatText += em.alt
    },

    //获取焦点，如果不是选表情ing,则关闭抽屉
    textareaFocus() {
      if (this.popupLayerClass == 'showLayer' && this.hideMore == false) {
        this.hideDrawer()
      }
    },
    // 发送文字消息
    async sendText(param) {
      let { img, voice, video, file } = param
      this.hideDrawer() //隐藏抽屉
      if (!this.chatText) {
        return
      }

      //如果是发图片则不要清空文本框内容
      if (!(file || img || voice || video)) {
        setTimeout((e) => {
          this.chatText = ''
        }, 1)
      }
      let data = {
        type: 'text',
        body: this.replaceEmoji(this.chatText)
      }
      if (img) {
        data.type = 'image'
        data.body = img
      }
      if (voice) {
        data.type = 'sound'
        data.body = voice
      }
      if (video) {
        data.type = 'video'
        data.body = video
      }
      if (file) {
        data.type = 'file'
        data.body = file
      }
      data = Object.assign(data, {
        to_uid: this.currentConversation.user_id,
        conversation_id: this.currentConversation.id,
        group_id: this.currentConversation.group_id,
        client_create_time: Date.now(),
        from_uid: this.current_uid,
        state: 0
      })
      // console.log('beforeSendMsg', 3);
      let resMsg = await this.setMsgList({
        conversation_id: this.conversation_id,
        action: 'unshift',
        save: true,
        data
      })
      data = {
        ...data
      }
      data.id = resMsg.id
      this.sendMsg(data)
      this.chatText = '' //清空输入框
    },
    //替换表情符号为图片
    replaceEmoji(str) {
      let replacedStr = str.replace(/\[([^(\]|\[)]*)\]/g, (item, index) => {
        console.log('item: ' + item)
        for (let i = 0; i < this.emojiList.length; i++) {
          let row = this.emojiList[i]
          for (let j = 0; j < row.length; j++) {
            let EM = row[j]
            if (EM.alt == item) {
              //在线表情路径，图文混排必须使用网络路径，请上传一份表情到你的服务器后再替换此路径
              //比如你上传服务器后，你的100.gif路径为https://www.xxx.com/emoji/100.gif 则替换onlinePath填写为https://www.xxx.com/emoji/
              let onlinePath = 'https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/emoji/'
              let imgstr = '<img id="biaoqing" style="width:16px;height:16px;padding:0 3px;" src="' + onlinePath + this.onlineEmoji[EM.url] + '">'
              console.log('imgstr: ' + imgstr)
              return imgstr
            }
          }
        }
      })
      return replacedStr
    },

    // 添加文字消息到列表
    addchatText(msg) {
      this.msgList.push(msg)
    },
    // 添加语音消息到列表
    addVoiceMsg(msg) {
      this.msgList.push(msg)
    },
    // 添加图片消息到列表
    addImgMsg(msg) {
      msg.msg.content = this.setPicSize(msg.msg.content)
      this.msgImgList.push(msg.msg.content.url)
      this.msgList.push(msg)
    },
    addRedEnvelopeMsg(msg) {
      this.msgList.push(msg)
    },
    // 添加系统文字消息到列表
    addSystemchatText(msg) {
      this.msgList.push(msg)
    },
    // 添加系统红包消息到列表
    addSystemRedEnvelopeMsg(msg) {
      this.msgList.push(msg)
    },
    setRedEnvelope(data) {
      console.log(data, 'datadatadata')
      var nowDate = new Date()
      let val = {
        time: nowDate.getHours() + ':' + nowDate.getMinutes(),
        userinfo: {
          uid: 0,
          username: '大黑哥',
          face: '@/static/image/face_1/face_1.jpg'
        },
        content: {
          blessing: data.blessing,
          rid: Math.floor(Math.random() * 1000 + 1),
          isReceived: false
        }
      }
      this.beforeSendMsg({
        redEnvelope: val
      })
      uni.removeStorage({ key: 'redEnvelopeData' })
    },
    // 打开红包
    openRedEnvelope(msg, index) {
      let rid = msg.id
      uni.showLoading({
        title: '加载中...'
      })
      console.log('index: ' + index)
      //模拟请求服务器效果
      setTimeout(() => {
        //加载数据
        if (rid == 0) {
          this.redenvelopeData = {
            rid: 0, //红包ID
            from: '大黑哥',
            face: '../static/image/im/face_1.jpg',
            blessing: '恭喜发财，大吉大利',
            money: '已领完'
          }
        } else {
          this.redenvelopeData = {
            rid: 1, //红包ID
            from: '售后客服008',
            face: '../static/image/im/face_1.jpg',
            blessing: '恭喜发财',
            money: '0.01'
          }
          if (!msg.content.isReceived) {
            // {type:"system",msg:{id:8,type:"redEnvelope",content:{text:"你领取了售后客服008的红包"}}},
            this.sendSystemMsg(
              {
                text: '你领取了' + (msg.userinfo.uid == this.myuid ? '自己' : msg.userinfo.username) + '的红包'
              },
              'redEnvelope'
            )
            console.log('this.msgList[index]: ' + JSON.stringify(this.msgList[index]))
            this.msgList[index].body.content.isReceived = true
          }
        }
        uni.hideLoading()
        this.windowsState = 'show'
      }, 200)
    },
    // 关闭红包弹窗
    closeRedEnvelope() {
      this.windowsState = 'hide'
      setTimeout(() => {
        this.windowsState = ''
      }, 200)
    },
    sendSystemMsg(content, type) {
      let lastid = this.msgList[this.msgList.length - 1].id
      lastid++
      let row = {
        type: 'system',
        msg: { id: lastid, type: type, content: content }
      }
      this.screenMsg(row)
    },
    //领取详情
    toDetails(rid) {
      uni.navigateTo({
        url: '/im/details/details?rid=' + rid
      })
    },
    // 预览图片
    showPic(msg) {
      uni.previewImage({
        indicator: 'none',
        current: msg,
        urls: [msg]
      })
    },
    // 播放语音
    playVoice(msg) {
      this.playMsgid = msg.id
      this.AUDIO.src = msg.body.url
      this.$nextTick(function () {
        this.AUDIO.play()
      })
    },
    // 录音开始
    voiceBegin(e) {
      if (e.touches.length > 1) {
        return
      }
      this.initPoint.Y = e.touches[0].clientY
      this.initPoint.identifier = e.touches[0].identifier
      this.RECORDER.start({ format: 'mp3' }) //录音开始,
    },
    //录音开始UI效果
    recordBegin(e) {
      this.recording = true
      this.voiceTis = '松开 结束'
      this.recordLength = 0
      this.recordTimer = setInterval(() => {
        this.recordLength++
      }, 1000)
    },
    // 录音被打断
    voiceCancel() {
      this.recording = false
      this.voiceTis = '按住 说话'
      this.recordTis = '手指上滑 取消发送'
      this.willStop = true //不发送录音
      this.RECORDER.stop() //录音结束
    },
    // 录音中(判断是否触发上滑取消发送)
    voiceIng(e) {
      if (!this.recording) {
        return
      }
      let touche = e.touches[0]
      //上滑一个导航栏的高度触发上滑取消发送
      if (this.initPoint.Y - touche.clientY >= uni.rpx2px(100)) {
        this.willStop = true
        this.recordTis = '松开手指 取消发送'
      } else {
        this.willStop = false
        this.recordTis = '手指上滑 取消发送'
      }
    },
    // 结束录音
    voiceEnd(e) {
      if (!this.recording) {
        return
      }
      this.recording = false
      this.voiceTis = '按住 说话'
      this.recordTis = '手指上滑 取消发送'
      this.RECORDER.stop() //录音结束
    },
    //录音结束(回调文件)
    async recordEnd(e) {
      const result = await uniCloud.uploadFile({
        filePath: e.tempFilePath,
        cloudPath: Date.parse(new Date()) / 1000 + '.mp3',
        onUploadProgress: function (progressEvent) {}
      })
      console.log(result.fileID, 'resultresult')
      clearInterval(this.recordTimer)
      if (!this.willStop) {
        console.log('e: ' + JSON.stringify(e))
        let msg = {
          length: 0,
          url: result.fileID
        }
        let min = parseInt(this.recordLength / 60)
        let sec = this.recordLength % 60
        min = min < 10 ? '0' + min : min
        sec = sec < 10 ? '0' + sec : sec
        msg.length = min + ':' + sec
        // this.sendMsg(msg, 'voice')
        this.beforeSendMsg({
          voice: msg
        })
      } else {
        console.log('取消发送录音')
      }
      this.willStop = false
    },
    // 切换语音/文字输入
    switchVoice() {
      this.hideDrawer()
      this.isVoice = this.isVoice ? false : true
    },
    discard() {
      return
    }
  }
}
</script>
<style lang="scss" scoped>
page {
  background-color: #e5e5e5;
}
@font-face {
  font-family: 'HMfont-home';
  src: url('data:application/x-font-woff2;charset=utf-8;base64,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')
    format('woff2');
}
.icon {
  font-family: 'HMfont-home' !important;
  font-size: 56upx;
  font-style: normal;
  color: #333;
  &.biaoqing:before {
    content: '\e797';
  }
  &.jianpan:before {
    content: '\e7b2';
  }
  &.yuyin:before {
    content: '\e805';
  }
  &.tupian:before {
    content: '\e639';
  }
  &.chehui:before {
    content: '\e904';
  }
  &.luyin:before {
    content: '\e905';
  }
  &.luyin2:before {
    content: '\e677';
  }
  &.other-voice:before {
    content: '\e667';
  }
  &.my-voice:before {
    content: '\e906';
  }
  &.hongbao:before {
    content: '\e626';
  }
  &.tupian2:before {
    content: '\e674';
  }
  &.paizhao:before {
    content: '\e63e';
  }
  &.add:before {
    content: '\e655';
  }
  &.close:before {
    content: '\e607';
  }
  &.to:before {
    content: '\e675';
  }
}

.tabIcon {
  width: 48rpx;
  height: 48rpx;
}
.tabImg {
  width: 120rpx;
  height: 120rpx;
  margin-bottom: 16rpx;
}
.hidden {
  display: none !important;
}
.popup-layer {
  &.showLayer {
    transform: translate3d(0, -42vw, 0);
  }
  transition: all 0.15s linear;
  width: 100%;
  height: 42vw;
  padding: 20rpx 2%;
  background-color: #f3f3f3;
  border-top: solid 1rpx #ddd;
  position: fixed;
  z-index: 20;
  top: 100%;
  .emoji-swiper {
    height: 40vw;
    swiper-item {
      display: flex;
      align-content: flex-start;
      flex-wrap: wrap;
      view {
        width: 12vw;
        height: 12vw;
        display: flex;
        justify-content: center;
        align-items: center;
        image {
          width: 8.4vw;
          height: 8.4vw;
        }
      }
    }
  }
  .more-layer {
    width: 100%;
    height: 42vw;
    .list {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .box {
        width: 18vw;
        border-radius: 20rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0 3vw 2vw 3vw;
        font-size: 24rpx;
        color: #999999;
        image {
          width: 85rpx;
          height: 85rpx;
        }
        .icon {
          font-size: 70rpx;
        }
      }
    }
  }
}
.input-box {
  width: 100%;
  min-height: 100rpx;
  padding: 0 1% 40rpx;
  background-color: #ffffff;
  display: flex;
  position: fixed;
  z-index: 20;
  bottom: -2rpx;
  &.showLayer {
    transform: translate3d(0, -42vw, 0);
  }
  transition: all 0.15s linear;
  border-bottom: solid 1rpx #ddd;
  .voice,
  .more {
    flex-shrink: 0;
    width: 90rpx;
    height: 100rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .send {
    //H5发送按钮左边距
    /* #ifdef H5 */
    margin-left: 20rpx;
    /* #endif */
    flex-shrink: 0;
    width: 100rpx;
    height: 100rpx;
    display: flex;
    align-items: center;
    .btn {
      width: 90rpx;
      height: 56rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(to right, #9779f1, #5677fc);
      color: #fff;
      border-radius: 6rpx;
      font-size: 24rpx;
    }
  }
  .textbox {
    width: 100%;
    min-height: 70rpx;
    margin-top: 15rpx;
    .voice-mode {
      width: calc(100% - 2rpx);
      height: 68rpx;
      border-radius: 70rpx;
      border: solid 1rpx #f2f2f2;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28rpx;
      background-color: #fff;
      color: #555;
      &.recording {
        background-color: #e5e5e5;
      }
    }
    .text-mode {
      width: 100%;
      min-height: 70rpx;
      display: flex;
      background-color: rgb(235, 234, 234);
      border-radius: 40rpx;
      .box {
        width: 100%;
        padding-left: 30rpx;
        min-height: 70rpx;
        display: flex;
        align-items: center;
        textarea {
          width: 100%;
        }
      }
      .em {
        flex-shrink: 0;
        width: 80rpx;
        padding-left: 10rpx;
        height: 70rpx;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
.record {
  width: 40vw;
  height: 40vw;
  position: fixed;
  top: 55%;
  left: 30%;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 20rpx;
  .ing {
    width: 100%;
    height: 30vw;
    display: flex;
    justify-content: center;
    align-items: center;
    // 模拟录音音效动画
    @keyframes volatility {
      0% {
        background-position: 0% 130%;
      }
      20% {
        background-position: 0% 150%;
      }
      30% {
        background-position: 0% 155%;
      }
      40% {
        background-position: 0% 150%;
      }
      50% {
        background-position: 0% 145%;
      }
      70% {
        background-position: 0% 150%;
      }
      80% {
        background-position: 0% 155%;
      }
      90% {
        background-position: 0% 140%;
      }
      100% {
        background-position: 0% 135%;
      }
    }
    .icon {
      background-image: linear-gradient(to bottom, #f09b37, #fff 50%);
      background-size: 100% 200%;
      animation: volatility 1.5s ease-in-out -1.5s infinite alternate;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 150rpx;
      color: #f09b37;
    }
  }
  .cancel {
    width: 100%;
    height: 30vw;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon {
      color: #fff;
      font-size: 150rpx;
    }
  }
  .tis {
    width: 100%;
    height: 10vw;
    display: flex;
    justify-content: center;
    font-size: 28rpx;
    color: #fff;
    &.change {
      color: #f09b37;
    }
  }
}
.content {
  width: 100%;
  .msg-list {
    width: 100%;
    padding: 0 2%;
    position: absolute;
    top: 0;
    bottom: 140rpx;
    background: #e5e5e5;
    .moreTitle {
      display: flex;
      text-align: center;
      font-size: 24rpx;
      color: #999;
      justify-content: center;
      padding: 20rpx 0;
    }
    .loading {
      //loading动画
      display: flex;
      justify-content: center;
      @keyframes stretchdelay {
        0%,
        40%,
        100% {
          transform: scaleY(0.6);
        }
        20% {
          transform: scaleY(1);
        }
      }
      .spinner {
        margin: 20rpx 0;
        width: 60rpx;
        height: 100rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        view {
          background-color: #5677fc;
          height: 50rpx;
          width: 6rpx;
          border-radius: 6rpx;
          animation: stretchdelay 1.2s infinite ease-in-out;
        }
        .rect2 {
          animation-delay: -1.1s;
        }
        .rect3 {
          animation-delay: -1s;
        }
        .rect4 {
          animation-delay: -0.9s;
        }
        .rect5 {
          animation-delay: -0.8s;
        }
      }
    }
    .row {
      .rowTime {
        display: flex;
        justify-content: center;
        padding: 20rpx 0;
        font-size: 20rpx;
      }
      .system {
        display: flex;
        justify-content: center;
        view {
          padding: 0 30rpx;
          height: 50rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #c9c9c9;
          color: #fff;
          font-size: 24rpx;
          border-radius: 40rpx;
        }
        .red-envelope {
          image {
            margin-right: 5rpx;
            width: 30rpx;
            height: 30rpx;
          }
        }
      }
      &:first-child {
        margin-top: 20rpx;
      }
      padding: 20rpx 0;
      .my .left,
      .other .right {
        width: 100%;
        display: flex;
        .bubble {
          max-width: 70%;
          min-height: 50rpx;
          border-radius: 10rpx;
          padding: 15rpx 20rpx;
          display: flex;
          align-items: center;
          font-size: 32rpx;
          word-break: break-word;
          &.img {
            background-color: transparent;
            padding: 0;
            overflow: hidden;
            image {
              max-width: 350rpx;
              max-height: 350rpx;
            }
          }
          &.red-envelope {
            background-color: transparent;
            padding: 0;
            overflow: hidden;
            position: relative;
            justify-content: center;
            align-items: flex-start;
            image {
              width: 250rpx;
              height: 313rpx;
            }
            .tis {
              position: absolute;
              top: 6%;
              font-size: 26rpx;
              color: #9c1712;
            }
            .blessing {
              position: absolute;
              bottom: 14%;
              color: #e9b874;
              width: 80%;
              text-align: center;
              overflow: hidden;
              // 最多两行
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
            }
          }
          &.voice {
            .icon {
              font-size: 40rpx;
              display: flex;
              align-items: center;
            }
            .icon:after {
              content: ' ';
              width: 53rpx;
              height: 53rpx;
              border-radius: 100%;
              position: absolute;
              box-sizing: border-box;
            }
            .length {
              font-size: 28rpx;
            }
          }
        }
      }
      .my .right,
      .other .left {
        flex-shrink: 0;
        width: 80rpx;
        height: 80rpx;
        image {
          width: 80rpx;
          height: 80rpx;
          border-radius: 10rpx;
        }
      }
      .my {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        .left {
          min-height: 80rpx;

          align-items: center;
          justify-content: flex-end;
          .bubble {
            background-color: #5677fc;
            color: #fff;
            border-radius: 38rpx 0rpx 38rpx 38rpx;
            &.voice {
              .icon {
                color: #fff;
              }
              .length {
                margin-right: 20rpx;
              }
            }
            &.play {
              @keyframes my-play {
                0% {
                  transform: translateX(80%);
                }
                100% {
                  transform: translateX(0%);
                }
              }
              .icon:after {
                border-left: solid 10rpx rgba(240, 108, 122, 0.5);
                animation: my-play 1s linear infinite;
              }
            }
          }
        }
        .right {
          margin-left: 15rpx;
        }
      }
      .other {
        width: 100%;
        display: flex;
        .left {
          margin-right: 15rpx;
        }
        .right {
          flex-wrap: wrap;
          .username {
            width: 100%;
            height: 45rpx;
            font-size: 24rpx;
            color: #999;
            display: flex;
            .name {
              margin-right: 50rpx;
            }
          }
          .bubble {
            background-color: #fff;
            color: #333;
            border-radius: 0rpx 38rpx 38rpx 38rpx;
            &.voice {
              .icon {
                color: #333;
              }
              .length {
                margin-left: 20rpx;
              }
            }
            &.play {
              @keyframes other-play {
                0% {
                  transform: translateX(-80%);
                }
                100% {
                  transform: translateX(0%);
                }
              }
              .icon:after {
                border-right: solid 10rpx rgba(255, 255, 255, 0.8);

                animation: other-play 1s linear infinite;
              }
            }
          }
        }
      }
    }
  }
}
.windows {
  .mask {
    position: fixed;
    top: 100%;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.6);
    opacity: 0;
    transition: opacity 0.2s ease-out;
  }
  .layer {
    position: fixed;
    width: 80%;
    height: 70%;
    left: 10%;
    z-index: 1001;
    border-radius: 20rpx;
    overflow: hidden;
    top: 100%;
    transform: scale3d(0.5, 0.5, 1);
    transition: all 0.2s ease-out;
  }
  &.show {
    display: block;
    .mask {
      top: 0;
      opacity: 1;
    }
    .layer {
      transform: translate3d(0, -85vh, 0) scale3d(1, 1, 1);
    }
  }
  &.hide {
    display: block;
    .mask {
      top: 0;
      opacity: 0;
    }
    .layer {
      //transform: translate3d(0,-85vh,0) scale3d(.5,.5,1);
    }
  }
}
.open-redenvelope {
  width: 100%;
  height: 70vh;
  background-color: #cf3c35;
  position: relative;
  .top {
    width: 100%;
    background-color: #fe5454;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    border-radius: 0 0 100% 100%;
    box-shadow: inset 0 -20rpx 0 #9c1712;
    .close-btn {
      width: 100%;
      height: 80rpx;
      display: flex;
      justify-content: flex-end;
      margin-bottom: 30rpx;
      .icon {
        color: #9c1712;
        margin-top: 10rpx;
        margin-right: 10rpx;
      }
    }
    image {
      width: 130rpx;
      height: 130rpx;
      border: solid 12rpx #cf3c35;
      border-radius: 100%;

      margin-bottom: -65rpx;
    }
    margin-bottom: 65rpx;
  }
  .from,
  .blessing,
  .money,
  .showDetails {
    width: 90%;
    padding: 5rpx 5%;
    display: flex;
    justify-content: center;
    font-size: 32rpx;
    color: #fff;
  }
  .money {
    font-size: 100rpx;
    color: #f8d757;
    display: flex;
    padding-top: 20rpx;
  }
  .showDetails {
    position: absolute;
    bottom: 20rpx;
    align-items: center;
    font-size: 28rpx;
    color: #f8d757;
    .icon {
      font-size: 26rpx;
      color: #f8d757;
    }
  }
}
</style>
