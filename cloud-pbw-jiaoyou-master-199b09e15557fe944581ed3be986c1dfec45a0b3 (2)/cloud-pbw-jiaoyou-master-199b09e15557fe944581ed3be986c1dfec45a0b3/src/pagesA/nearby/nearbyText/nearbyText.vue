<template>
  <view class="dynNearInfo-wrapper" @click="textTap">
    <view class="dynNearInfocard-wrapper" v-if="contentData">
      <!--头像-->
      <view class="dynNearInfocard-header-wrapper">
        <view class="dynNearInfocard-header-item" v-if="contentData.userInfo" @click="namePage(contentData.uid)">
          <image :src="contentData.userInfo.avatar" alt="" class="dynNearInfocard-header-img zwyHeight" />
          <view class="dynNearInfocard-header-nearInfo">
            <view class="dynNearInfocard-header-nearInfo-item">
              <text class="dynNearInfocard-header-name">{{ contentData.userInfo.nickname }}</text>
              <image class="zwyHeight" src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/appIcon/j.png"></image>
            </view>
            <view class="dynNearInfocard-header-nearInfo-item dynNearInfocard-header-time">
              <text v-if="contentData.userInfo.gender == 2">
                <text class="iconfont" style="color: #fe6ed0">&#xe640;</text>
                {{ contentData.userInfo.birthdayText ? contentData.userInfo.birthdayText + '岁' : '' }}
              </text>
              <text v-if="contentData.userInfo.gender == 1">
                <text class="iconfont" style="color: #00c7ff">&#xe638;</text>
                {{ contentData.userInfo.birthdayText ? contentData.userInfo.birthdayText + '岁' : '' }}
              </text>
              <text v-if="contentData.userInfo.emotionStr != null && contentData.userInfo.emotionStr != ''">| {{ contentData.userInfo.emotionStr }}</text>
              <text v-if="contentData.userInfo.constellationStr != null && contentData.userInfo.constellationStr != ''">| {{ contentData.userInfo.constellationStr }}</text>
              <text v-if="contentData.userInfo.constellation">· {{ contentData.userInfo.constellation }}</text>
              <text v-for="(list, index) of contentData.userInfo.label" :key="index" v-if="contentData.userInfo.label && index < 2">· {{ list }}</text>
              <text>{{ contentData.add_time | getTimeText }}</text>
            </view>
          </view>
        </view>
        <view class="dynNearInfocard-header-item dynNearInfocard-header-item-focus">
          <text class="dynNearInfocard-header-item-focus-btn" v-if="attention == false" @click.stop="attentionBtn(contentData.userCode)">+关注</text>
          <text class="dynNearInfocard-header-item-focus-btn" v-if="attention" @click.stop="attentionBtn(contentData.userCode)">取消关注</text>
          <text class="dynNearInfocard-header-item-focus-btn" @click.stop="nameSel(contentData.userCode)">
            <text class="iconfont">&#xe6be;</text>
            举报
          </text>
          <!-- <text class="dynNearInfocard-header-item-focus-btn "   @click.stop="report(contentData.userCode)"><text class="iconfont">&#xe6bc;</text>举报</text> -->
        </view>
      </view>
      <!--旅行日期-->
      <view class="dynNearcard-path-wrapper" v-if="contentData && contentData.startCity">
        <view class="dynNearcard-path-address" v-if="contentData.startCity">
          {{ contentData.startCity }}
          <text class="iconfont chengIcon">&#xe64a;</text>
          {{ contentData.endCity }}
        </view>
        <view class="dynNearcard-path-time" v-if="contentData.dynamicStart">{{ contentData.dynamicStart | getTime }} - {{ contentData.dynamicEnd | getTime }}</view>
        <image class="chengshiBg" src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/appIcon/chengshi.png"></image>
      </view>
      <!-- 拼单 -->
      <view class="rich-text" v-if="contentData && contentData.spellId">
        <view class="goods-card u-flex" @click.stop="navTo('/pagesA/explore/spellDetail?id=' + contentData._id + '&poi=' + contentData.spellId)">
          <image
            v-if="contentData.spell && contentData.spell.length > 0 && contentData.spell[0] && contentData.spell[0].photos && contentData.spell[0].photos.length > 0"
            :src="contentData.spell && contentData.spell.length > 0 ? contentData.spell[0].photos[0].url : 'https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/pin.png'"
          ></image>
          <image v-else src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/pin.png"></image>
          <view class="detail u-flex-col u-row-between">
            <text class="name u-line-2">{{ contentData.spell && contentData.spell.length > 0 ? contentData.spell[0].name : '一起拼单拼玩吗？' }}</text>
            <view class="price u-flex u-row-between">
              <text style="font-size: 25rpx">{{ contentData.spell && contentData.spell.length > 0 ? contentData.spell[0].cityname + '-' + contentData.spell[0].adname : '我在这里等你...' }}</text>
            </view>
            <view class="price u-flex u-row-between">
              <text style="font-size: 25rpx">[拼单]、[拼玩]</text>
              <view class="btn">拼游中...</view>
            </view>
          </view>
        </view>
      </view>
      <!-- 图片 -->
      <view class="dynNearcard-imgList-wrapper" v-if="contentData && contentData.dynamicImg != ''">
        <!--一张二张-->
        <view class="leng1" v-if="contentData.dynamicImg != '' && contentData.dynamicImg.length == 1">
          <image mode="aspectFill" v-for="(img, imgIndex) of contentData.dynamicImg" :key="imgIndex" :data-src="img" :src="img" alt="" @tap="previewImage"></image>
        </view>
        <view class="leng2" v-if="contentData.dynamicImg != '' && contentData.dynamicImg.length == 2">
          <image mode="aspectFill" v-for="(img, imgIndex) of contentData.dynamicImg" :key="imgIndex" :data-src="img" :src="img" alt="" @tap="previewImage"></image>
        </view>
        <!--三张-->
        <view class="leng3" v-if="contentData.dynamicImg != '' && contentData.dynamicImg.length == 3">
          <view>
            <image mode="aspectFill" :src="contentData.dynamicImg[0]" :data-src="contentData.dynamicImg[0]" @tap="previewImage"></image>
          </view>
          <view class="leng3_lf">
            <image mode="aspectFill" :src="contentData.dynamicImg[1]" :data-src="contentData.dynamicImg[1]" @tap="previewImage"></image>
            <image mode="aspectFill" :src="contentData.dynamicImg[2]" :data-src="contentData.dynamicImg[2]" @tap="previewImage"></image>
          </view>
        </view>
        <!--四张-->
        <view class="leng4" v-if="contentData.dynamicImg != '' && contentData.dynamicImg.length == 4">
          <view>
            <image mode="aspectFill" :src="contentData.dynamicImg[0]" :data-src="contentData.dynamicImg[0]" @tap="previewImage"></image>
          </view>
          <view class="leng4_lf">
            <image mode="aspectFill" :src="contentData.dynamicImg[1]" :data-src="contentData.dynamicImg[1]" @tap="previewImage"></image>
          </view>
        </view>
        <view class="leng4_bot clear" v-if="contentData.dynamicImg != '' && contentData.dynamicImg.length == 4">
          <image mode="aspectFill" :src="contentData.dynamicImg[2]" :data-src="contentData.dynamicImg[2]" @tap="previewImage"></image>
          <image mode="aspectFill" :src="contentData.dynamicImg[3]" :data-src="contentData.dynamicImg[3]" @tap="previewImage"></image>
        </view>
        <!--五张-->
        <view class="leng5" v-if="contentData.dynamicImg != '' && contentData.dynamicImg.length == 5">
          <view>
            <image mode="aspectFill" :src="contentData.dynamicImg[0]" :data-src="contentData.dynamicImg[0]" @tap="previewImage"></image>
          </view>
          <view class="leng5_lf">
            <image mode="aspectFill" :src="contentData.dynamicImg[1]" :data-src="contentData.dynamicImg[1]" @tap="previewImage"></image>
          </view>
        </view>
        <view class="leng5_bot clear" v-if="contentData.dynamicImg != '' && contentData.dynamicImg.length == 5">
          <image mode="aspectFill" :src="contentData.dynamicImg[2]" :data-src="contentData.dynamicImg[2]" @tap="previewImage"></image>
          <image mode="aspectFill" :src="contentData.dynamicImg[3]" :data-src="contentData.dynamicImg[3]" @tap="previewImage"></image>
          <image mode="aspectFill" :src="contentData.dynamicImg[4]" :data-src="contentData.dynamicImg[4]" @tap="previewImage"></image>
        </view>
        <!--六张-->
        <view class="leng6" v-if="contentData.dynamicImg != '' && contentData.dynamicImg.length > 5">
          <view>
            <image mode="aspectFill" :src="contentData.dynamicImg[0]" :data-src="contentData.dynamicImg[0]" @tap="previewImage"></image>
          </view>
          <view class="leng6_lf">
            <image mode="aspectFill" :src="contentData.dynamicImg[1]" :data-src="contentData.dynamicImg[1]" @tap="previewImage"></image>
            <image mode="aspectFill" :src="contentData.dynamicImg[2]" :data-src="contentData.dynamicImg[2]" @tap="previewImage"></image>
          </view>
        </view>
        <view class="leng6_bot clear" v-if="contentData.dynamicImg != '' && contentData.dynamicImg.length > 5">
          <image mode="aspectFill" :src="contentData.dynamicImg[3]" :data-src="contentData.dynamicImg[3]" @tap="previewImage"></image>
          <image mode="aspectFill" :src="contentData.dynamicImg[4]" :data-src="contentData.dynamicImg[4]" @tap="previewImage"></image>
          <image mode="aspectFill" :src="contentData.dynamicImg[5]" :data-src="contentData.dynamicImg[5]" @tap="previewImage"></image>
          <view class="photoNum" v-if="contentData.dynamicImg.length > 6" @tap="previewImage">+{{ contentData.dynamicImg.length - 6 }}</view>
        </view>
      </view>
      <view :class="contentData.dynamicImg[0] != '' ? 'dynNearcard-content-wrapper' : 'dynamicContext'">
        <rich-text :nodes="parseComments(contentData.dynamicContext)"></rich-text>
        <text v-for="(list, key) of contentData.topicTitle" :key="key" @click.stop="huatiItem(list)" class="huaBg">#{{ list }}#</text>
      </view>
      <view class="positionDesc" v-if="contentData.positionDesc">
        <text class="iconfont">&#xe69d;</text>
        {{ contentData.positionDesc }}
      </view>
      <view class="dynNearcard-markList-wrapper" v-if="contentData.dynamicLabel != '' && contentData.dynamicLabel != null">
        <text class="dynNearcard-markList-item">{{ contentData.dynamicLabel }}</text>
      </view>
      <view class="topicBg" v-if="contentData.topicCode">
        <text>#{{ contentData.topicCode }}#</text>
      </view>

      <!--点赞-->
      <view class="dianzan">
        <text @tap.stop="give(contentData._id)" :class="giveChage(contentData._id) ? 'zwyHover2' : ''">
          <text class="iconfont">&#xe69f;</text>
          点赞{{ contentData.like.length != 0 ? contentData.like.length : '' }}
        </text>
        <text @tap.stop="commentPop = true">
          <text class="iconfont">&#xe71a;</text>
          私密评论
          <text v-if="contentData.secret">{{ contentData.secret != null ? contentData.secret.length : '0' }}</text>
        </text>
      </view>
    </view>
    <wrap :height="16" v-if="contentData"></wrap>
    <view class="addList" v-if="contentData">
      <view class="add">全部评论</view>
      <view class="num">（{{ contentData.reply != null ? contentData.reply.length : '0' }}）</view>
      <view class="kan">{{ contentData.look }}次浏览</view>
    </view>
    <!--回复-->
    <view v-if="contentData" class="dynNearInfocard-common-wrapper">
      <view v-show="contentData && contentData.reply != null">
        <view v-for="(item, nameIndex) of contentData.reply" :key="nameIndex" class="evaluate-wrapper">
          <image :src="item.userInfo.avatar" class="evaluate-photo" @click="namePage(item.uid)" />
          <view class="evaluate-content">
            <view class="evaluate-content-top">
              <!--<text>{{item.userInfo.name}}</text>-->
              <view class="dynNearInfocard-header-nearInfo-item" @click="addToText(item)">
                <text class="dynNearInfocard-header-name">{{ item.userInfo.nickname }}</text>
                <!-- <text class='dynNearInfocard-header-sex' v-if="item.userInfo.sex == 0"><text class='iconfont '>&#xe640;</text>{{item.userInfo.dateBirthStr ? item.userInfo.dateBirthStr : ''}}</text> -->
                <!-- <text class='dynNearInfocard-header-sexname' v-if="item.userInfo.sex == 1"><text class='iconfont '>&#xe638;</text>{{item.userInfo.dateBirthStr ? item.userInfo.dateBirthStr : ''}}</text> -->
                <text v-if="item.userInfo.sex == 0" class="nearInfo-item-huifu">
                  <text class="iconfont" style="color: #fe6ed0">&#xe640;</text>
                  {{ item.userInfo.dateBirthStr ? item.userInfo.dateBirthStr + '岁' : '' }}
                </text>
                <text v-if="item.userInfo.sex == 1" class="nearInfo-item-huifu">
                  <text class="iconfont" style="color: #00c7ff">&#xe638;</text>
                  {{ item.userInfo.dateBirthStr ? item.userInfo.dateBirthStr + '岁' : '' }}
                </text>
              </view>
              <view class="dynNearInfocard-header-nearInfo-item dynNearInfocard-header-time">
                {{ item.add_time | getTimeText }}
              </view>
              <!--<view class='evaluate-content-top-star' v-if='showStar'><star :score = '4.5' :fontSize='32'></star></view>-->
            </view>
            <view class="evaluate-content-middle">
              <view class="evaluate-content-middle-text">{{ item.comment }}</view>
            </view>
            <view v-if="item.replySubclass.length > 0" class="evaluate-content-comments">
              <view class="evaluate-content-comment">
                <view v-for="(text, num) of item.replySubclass" v-if="num < 5" :key="num">
                  <view class="evaluate-content-comment-item">
                    <text class="evaluate-content-comment-label">{{ text.userInfo.nickname }}：</text>
                    <text class="comment-text">{{ text.comment }}</text>
                    <!-- <text style="padding-left: 10px; color: #5597f9" @click="addToText()">(回复Ta)</text> -->
                  </view>
                </view>
              </view>
              <view v-if="item.replySubclass.length > 5" class="evaluate-content-comment-item" @click="showAll">查看全部{{ item.replySubclass.length }}条回复&nbsp;&gt;</view>
            </view>
            <view class="To_add_text">
              <text @click="addToText(item)"> 回复Ta</text>
            </view>
            <!-- <view class="evaluate-content-bottom" v-if='showTime'>
                <text class='valuate-content-bottom-time'>10分钟前</text>
                <text class='valuate-content-bottom-zan'><text class='iconfont icon-zan'></text></text>
              </view> -->
          </view>
        </view>
      </view>
      <!--无回复-->
      <view v-if="contentData && contentData.reply.length == 0" class="kong_bg">
        <view class="listNot">
          <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/empty/default.png"></image>
          <view>暂无回复~</view>
        </view>
      </view>
    </view>
    <!--发送消息-->
    <view class="set_fixed" v-if="contentData">
      <view class="set_text_bg">
        <view class="set_lf">
          <view class="iconfont set_lf">&#xe664;</view>
        </view>
        <view class="set_text">
          <input type="text" v-model="setVal" confirm-type="send" adjust-position="false" @focus="text_focus" />
        </view>
        <view class="set_rt">
          <!--<view class="iconfont set_rt">&#xe65f;</view>-->
          <text class="set_rt" style="font-size: 16px" @click="textAll">发送</text>
        </view>
      </view>
    </view>
    <!-- 底部输入栏 -->
    <view class="input-box" @click.stop="discard" v-if="contentData">
      <view class="textbox">
        <view class="text-mode">
          <view class="box">
            <textarea auto-height="true" v-model="setVal" @focus="text_focus" />
          </view>
          <!-- <view class="em" @tap="chooseEmoji">
              <view class="icon biaoqing"></view>
            </view> -->
        </view>
      </view>
      <view class="send">
        <view class="btn" @click="textAll">发送</view>
      </view>
    </view>
    <jw-loading v-if="!contentData" :type="2"></jw-loading>
    <!-- 评论弹窗 -->
    <u-popup :show="commentPop" border-radius="18" closeOnClickOverlay length="60%" mode="bottom" @close="commentPop = false">
      <view v-if="contentData" class="comment-pop">
        <view class="title">私密评论</view>
        <view v-if="contentData.secret && contentData.secret.length == 0" class="no-comment u-flex-col">
          <jw-empty text="你还没私密过~"></jw-empty>
        </view>
        <scroll-view v-else class="comment-scroll" scroll-y>
          <view v-for="(item, index) of contentData.secret" v-if="item.uid == userInfo._id" :key="index" class="item u-flex">
            <view style="align-self: flex-start" @click="navTo('/travel/experience/personalDetails?id=' + item.userInfo._id)">
              <image :src="item.userInfo.avatar" class="avatar"></image>
            </view>
            <view style="flex: 1">
              <view class="user u-flex">
                <text class="nick-name" @click="navTo('/travel/experience/personalDetails?id=' + item.userInfo._id)">{{ item.userInfo.nickname }}</text>
                <text class="date">{{ item.add_time | getTimeText }}</text>
              </view>
              <view class="text u-line-1">{{ item.comment }}</view>
            </view>
          </view>
        </scroll-view>
        <view class="input-box-simi u-flex">
          <input v-model="comment.text" placeholder="发表你的私密评论" type="text" />
          <view class="send" @click="commitComment">私密发送</view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import wrap from '@/components/wrap'
export default {
  data() {
    return {
      comment: {
        switch: 1,
        text: '',
        data: {}
      },
      commentPop: false,
      giveIndex: '',
      contentData: '',
      secretData: '',
      show: false,
      setVal: '',
      optionData: '',
      addCode: '',
      addCodeShow: false,
      imageList: [],
      userCode: '',
      attention: false,
      isLoading: true,
      userInfo: uni.getStorageSync('userInfo')
    }
  },
  components: {
    wrap
  },
  watch: {
    // 是否子回复
    setVal(val) {
      let vm = this
      if (/^[@]/.test(val)) {
        vm.addCodeShow = true
      } else {
        vm.addCodeShow = false
      }
    }
  },
  methods: {
    async commitComment() {
      if (!this.$store.getters.hasLogin) {
        uni.navigateTo({
          url: '/pagesA/login/auth/login'
        })
        return
      }
      if (this.comment.text == '') {
        uni.showToast({
          title: '请填写发送内容',
          icon: 'none',
          duration: 3000
        })
        return
      }
      uni.showLoading({
        title: '回复中...',
        mask: true
      })
      const getContentLog = await this.$request('security', 'textDetection', {
        content: this.comment.text
      })
      if (getContentLog.state != 0) {
        uni.showToast({
          title: '发布内容涉嫌不文明用语，请修改',
          icon: 'none',
          duration: 3000
        })
        return
      }

      const res = await this.$request('nearby', 'nearbyReplySecret', {
        dynamicId: this.contentData._id,
        comment: this.comment.text,
        toUid: this.contentData.uid
      })
      uni.hideLoading()
      if (res.status == 1) {
        this.comment.text = ''
        uni.showToast({
          title: '已发送',
          icon: 'none',
          duration: 3000
        })
        // 获取列表
        this.getList(this.contentData._id)
        uni.hideKeyboard()
      }
    },
    huatiItem(text) {
      uni.navigateTo({
        url: '/pagesA/nearby/nearbyText/topicList?title=' + text
      })
    },
    giveChage(index) {
      if (this.giveIndex == index) {
        setTimeout(() => {
          this.giveIndex = ''
        }, 500)
        return true
      }
      return false
    },
    parseComments(value) {
      if (!value) return false
      var exp
      exp = /(#|＃)((?!#).)*(#|＃)/g // 这里中文#和英文#都会识别
      value = value
        .replace(/<[^>]*?>(.*?)/gi, '')
        .replace(/(.*?)<\/[^>]*?>/gi, '')
        .replace(exp, (item) => {
          let newVal = '<text class="huati-body text-blue" bindtap="huatiItem()">' + item + '</text>'
          return newVal
        })
      return value
    },

    nameSel() {
      let vm = this
      uni.showActionSheet({
        itemList: ['举报', '拉黑'],
        success: function (res) {
          //console.log("选中了第" + (res.tapIndex + 1) + "个按钮");
          if (res.tapIndex + 1 == 1) {
            vm.report()
          }
          if (res.tapIndex + 1 == 2) {
            vm.shield()
          }
        },
        fail: function (res) {
          //console.log(res.errMsg);
        }
      })
    },
    shield() {
      uni.showModal({
        title: '拉黑',
        content: '要拉黑该用户吗？',
        success: function (res) {
          if (res.confirm) {
            uni.showToast({
              title: '该用户已拉黑',
              icon: 'none',
              duration: 3000
            })
          } else if (res.cancel) {
            //console.log("用户点击取消");
          }
        }
      })
    },
    report() {
      uni.showModal({
        title: '举报',
        content: '要举报该用户吗？',
        success: function (res) {
          if (res.confirm) {
            //console.log("用户点击确定");
            uni.showToast({
              title: '已收到您的举报，我们马上审查',
              icon: 'none',
              duration: 3000
            })
          } else if (res.cancel) {
            //console.log("用户点击取消");
          }
        }
      })
    },
    chooseEmoji() {},
    discard() {
      return
    },
    textTap() {
      uni.hideKeyboard()
    },
    attentionBtn(code, id) {
      if (!this.$store.getters.hasLogin) {
        uni.navigateTo({
          url: '/other/login/auth/login'
        })
        return
      }
      if (this.attention === true) {
        uni.showModal({
          title: '关注',
          content: '要取消关注该用户吗？',
          success: async (res) => {
            if (res.confirm) {
              const res = await this.$request('fans', 'removeFollow', {
                id: id
              })
              uni.showToast({
                title: '已取消',
                icon: 'none',
                duration: 3000
              })
              this.attention = false
            }
          }
        })
      } else {
        this.fansSel()
      }
    },
    async fansSel() {
      const data = await this.$request('fans', 'addFollow', {
        fansId: this.contentData.uid,
        status: 0
      })
      if (data.state === 0) {
        uni.showToast({
          title: '已关注',
          icon: 'none',
          duration: 3000
        })
      } else {
        uni.showToast({
          title: '关注成功',
          icon: 'none',
          duration: 3000
        })
      }
      this.attention = true
    },
    text_focus(H) {
      uni.pageScrollTo({
        scrollTop: H.height,
        duration: 300
      })
    },
    previewImage: function (e) {
      var current = e.target.dataset.src
      uni.previewImage({
        current: current,
        urls: this.contentData.dynamicImg
      })
    },
    namePage(code) {
      uni.navigateTo({
        url: '/pagesA/service/homePage/homePage?code=' + code
      })
    },
    // 子回复
    addToText(item) {
      let name = '@' + item.userInfo.nickname + '：'
      this.addCode = item._id
      this.setVal = name
      this.addCodeShow = true
    },
    showAll() {
      this.show = true
    },
    async textAll() {
      if (!this.$store.getters.hasLogin) {
        uni.navigateTo({
          url: '/pagesA/login/auth/login'
        })
        return
      }
      if (this.setVal == '') {
        uni.showToast({
          title: '请填写发送内容',
          icon: 'none',
          duration: 3000
        })
        return
      }
      const getContentLog = await this.$request('security', 'textDetection', {
        content: this.setVal
      })
      if (getContentLog.state == 0) {
        this.text_btn()
      } else {
        uni.showToast({
          title: '发布内容涉嫌不文明用语，请修改',
          icon: 'none',
          duration: 3000
        })
      }
    },
    // 回复
    async text_btn() {
      let data = {
        dynamicId: this.contentData._id,
        comment: this.setVal,
        toUid: this.contentData.uid
      }
      if (this.addCodeShow) {
        // 子回复
        data.toId = this.addCode
      }
      const res = await this.$request('nearby', 'nearbyReply', data)
      if (res.status == 1) {
        uni.showToast({
          title: '已发送',
          icon: 'none',
          duration: 3000
        })
        // 获取列表
        this.getList(this.contentData._id)
        this.setVal = ''
        this.textTap()
        uni.hideKeyboard()
      }
    },
    async getList(code) {
      // 获取详情
      const res = await this.$request('nearby', 'nearbyText', {
        id: code
      })
      if (res.data) {
        this.contentData = res.data[0]
      }
      this.isLoading = true
      const item = await this.$request('fans', 'isFollow', {
        fansId: this.contentData.uid
      })
      if (item === 1) {
        this.attention = true
      } else {
        this.attention = false
      }
      uni.hideLoading()
    },
    // 点赞
    async give(code) {
      this.giveIndex = code
      if (this.contentData.userLike == 0) {
        const res = await this.$request('nearby', 'addLike', {
          id: code
        })
      } else {
        const res = await this.$request('nearby', 'removeLike', {
          id: code
        })
      }
      // 获取详情
      this.getList(this.contentData._id)
    },
    // 年龄过滤
    ages(str) {
      var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/)
      if (r == null) return false
      var d = new Date(r[1], r[3] - 1, r[4])
      if (d.getFullYear() == r[1] && d.getMonth() + 1 == r[3] && d.getDate() == r[4]) {
        var Y = new Date().getFullYear()
        // return("年龄   =   "+   (Y-r[1])   +"   周岁");
        return Y - r[1]
      }
      return '输入的日期格式错误！'
    }
  },
  computed: {},
  onLoad(option) {
    this.optionData = option
    // 获取详情
    this.getList(option.code)
  },
  onShow() {}
}
</script>

<style lang="scss" scoped>
.dynNearInfo-wrapper {
  width: 100%;
  height: 100vh;
  position: relative;
}
.goods-card {
  margin-bottom: 30rpx;
  padding: 23rpx 22rpx 23rpx 32rpx;
  width: 100%;
  height: 206rpx;
  border: 2rpx solid #e9ebf0;
  border-radius: 18rpx;
  image {
    width: 160rpx;
    height: 160rpx;
    border-radius: 12rpx;
  }
  .detail {
    margin-left: 28rpx;
    height: 160rpx;
    font-weight: bold;
    .name {
      // width: 100%;
      width: 370rpx;
      line-height: 42rpx;
    }
    .label {
      margin-top: 10rpx;
      text {
        display: inline-block;
        padding: 0 8rpx;
        margin-right: 10rpx;
        height: 32rpx;
        line-height: 32rpx;
        font-weight: normal;
        font-size: 20rpx;
        color: $cor;
        border: 2rpx solid rgba($color: $cor, $alpha: 0.5);
        border-radius: 10rpx;
      }
    }
    .price {
      margin-top: auto;
      width: 370rpx;
      .market-price {
        margin-left: 6rpx;
        font-weight: normal;
        font-size: 24rpx;
        color: #999;
        text-decoration: line-through;
      }
      .btn {
        margin-left: auto;
        padding: 0 18rpx;
        height: 48rpx;
        line-height: 48rpx;
        color: #fff;
        font-size: 24rpx;
        border-radius: 24rpx;
        font-weight: normal;
        background: $grad;
        &:active {
          opacity: 0.8;
        }
      }
    }
  }
}
.rich-text {
  font-size: 30rpx;
  margin-bottom: 20rpx;
  line-height: 54rpx;
  padding-left: 95rpx;
  .text {
    display: inline-block;
    padding: 16rpx 0;
    background-color: transparent;
  }
  .img {
    width: 100%;
    border-radius: 18rpx;
  }
}
.dynNearcard-content-wrapper {
  font-size: 28rpx;
  line-height: 50rpx;
  color: #333;
  padding-left: 95rpx;
  margin-top: 20rpx;
}
.dynamicContext {
  font-size: 28rpx;
  min-height: 100rpx;
  line-height: 50rpx;
  color: #333;
  padding-left: 95rpx;
}
.comment-pop {
  position: relative;
  width: 100%;
  height: 800rpx;

  .title {
    position: relative;
    height: 88rpx;
    text-align: center;
    line-height: 88rpx;
    font-size: 28rpx;
    font-weight: bold;
    color: #333;
    border-bottom: 1rpx solid #f3f3f3;

    .close {
      position: absolute;
      right: 48rpx;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .no-comment {
    align-items: center;
    margin: 40rpx 0;
    font-size: 24rpx;
    color: #9d9fa5;
    display: flex;
    flex-direction: column;

    image {
      width: 200rpx;
      height: 200rpx;
    }
  }

  .comment-scroll {
    height: 800rpx;
    padding-bottom: 220rpx;

    .item {
      display: flex;
      padding: 32rpx 20rpx;
      font-size: 26rpx;
      color: #333;
      border-bottom: 1rpx solid #f0f0f0;

      .avatar {
        width: 56rpx;
        height: 56rpx;
        border-radius: 28rpx;
        margin-right: 20rpx;
      }

      .user {
        flex: 1;

        .nick-name {
          font-size: 28rpx;
          font-weight: bold;
        }

        .date {
          margin-left: 10rpx;
          font-size: 22rpx;
          color: #c1c3c9;
        }

        .zan {
          margin-left: auto;
          margin-right: 6rpx;
          height: 32rpx;
          width: 32rpx;
        }
      }

      .text {
        margin-top: 20rpx;
      }
    }
  }

  .input-box-simi {
    justify-content: space-between;
    position: absolute;
    bottom: 0rpx;
    padding: 26rpx 28rpx 50rpx 26rpx;
    width: 100%;
    height: 145rpx;
    border-top: 1rpx solid #f3f3f3;
    background: #1a8cff;
    display: flex;
    align-items: center;

    input {
      width: 82%;
      height: 100%;
      padding-left: 20rpx;
      border-radius: 8rpx;
      background-color: #eee;
    }

    .send {
      color: #ffffff;
      font-weight: bold;
      font-size: 25rpx;
    }
  }
}
.huaBg {
  color: #4c87f8;
  margin-right: 10rpx;
}
.topicBg {
  margin: 20rpx 0;
  padding-left: 95rpx;
  text {
    background: #87d6e8;
    color: #fff;
    border-radius: 30rpx;
    margin-right: 20rpx;
    padding: 4rpx 20rpx;
    box-shadow: 2rpx 5rpx 9rpx #f5f5f5;
  }
}

.dynNearInfocard-header-name {
  color: #f4742c;
}
.input-box {
  border-top: 1px solid #f5f5f5;
  width: 100%;
  height: 150rpx;
  padding: 5rpx 1%;
  background-color: #ffffff;
  display: flex;
  position: fixed;
  z-index: 20;
  bottom: -2rpx;
  .send {
    flex-shrink: 0;
    width: 140rpx;
    padding: 0 10rpx;
    height: 100rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    .btn {
      width: 90rpx;
      height: 56rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #1a8cff;
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
      border: solid 1rpx #cdcdcd;
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
      width: 99%;
      min-height: 70rpx;
      display: flex;
      background-color: #f2f2f2;
      border-radius: 40rpx;
      box-sizing: border-box;
      .box {
        width: 100%;
        padding-left: 30rpx;
        min-height: 70rpx;
        display: flex;
        align-items: center;
        textarea {
          width: 100%;
          padding-left: 10rpx;
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
.dynNearcard-markList-wrapper {
  height: 50rpx;
  line-height: 50rpx;
  margin-top: 10px;
  padding-left: 95rpx;
}
.dynNearcard-markList-item {
  color: #71d076;
  border: 1rpx solid #71d076;
  font-size: 24rpx;
  padding: 6rpx 10rpx;
  border-radius: 10rpx;
  margin-right: 12rpx;
}
.listNot {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 30rpx;
  image {
    width: 400rpx;
    height: 287rpx;
    margin-top: 60rpx;
  }
  p {
    color: #c6c6c6;
  }
}
.dynNearcard-path-wrapper {
  margin: 30rpx 0 20rpx 95rpx;
  height: 170rpx;
  line-height: 60rpx;
  border: 1px solid #dddddd;
  padding: 20rpx;
  border-radius: 10rpx;
  position: relative;
  display: flex;
  flex-direction: column;
}
.chengshiBg {
  position: absolute;
  left: 50%;
  bottom: 0rpx;
  width: 530rpx;
  height: 210rpx;
  margin-left: -265rpx;
}
.dynNearcard-path-address {
  font-size: 26rpx;
  font-weight: 500;
  color: $fontColorC;
  text-align: center;
}
.dynNearcard-path-address .iconfont {
  font-size: 34rpx;
  padding: 0 6rpx 0 4rpx;
}
.chengIcon {
  margin: 0 50rpx;
}
.dynNearcard-path-time {
  z-index: 99;
  font-size: 26rpx;
  font-weight: 500;
  color: $fontColorC;
  text-align: center;
}
.To_add_text {
  text-align: right;
  font-size: 22rpx;
}
.To_add_text text {
  color: #9b9b9b;
  font-size: 22rpx;
}
.leng1 image {
  width: 100%;
  height: 400rpx;
  border-radius: 10rpx;
}
.leng2 {
  display: flex;
  flex-flow: row;
}
.leng2 image {
  display: inline-block;
  flex: 2;
  width: 50%;
  height: 400rpx;
}
.leng2 image:first-child {
  border-radius: 5px 0 0 5px;
  margin-right: 2px;
}
.leng2 image:last-child {
  border-radius: 0 5px 5px 0;
  margin-left: 2px;
}
.leng3 {
  display: flex;
  flex-flow: row;
  height: 400rpx;
}
.leng3 view:first-child {
  width: 70%;
}
.leng3 view:first-child image {
  width: 100%;
  height: 100%;
  border-radius: 5px 0 0 5px;
}
.leng3 view:last-child {
  flex: 1;
}
.leng3 view:last-child image {
  width: 100%;
  height: 50%;
  display: inline-block;
  float: left;
  padding-left: 2px;
  box-sizing: border-box;
  border-radius: 0 5px 5px 0;
}
.leng3_lf image:first-child {
  padding-bottom: 1px;
}
.leng3_lf image:last-child {
  padding-top: 1px;
}
.leng4 {
  display: flex;
  flex-flow: row;
  height: 300rpx;
}
.leng4 view:first-child {
  width: 70%;
}
.leng4 view:first-child image {
  width: 100%;
  height: 100%;
  border-radius: 5px 0 0 0;
}
.leng4 view:last-child {
  flex: 1;
}
.leng4 view:last-child image {
  width: 100%;
  height: 100%;
  display: inline-block;
  float: left;
  padding-left: 2px;
  box-sizing: border-box;
  border-radius: 0 5px 0 0;
}
.leng4_bot {
  margin-top: 2px;
}
.leng4_bot image {
  width: 50%;
  height: 170rpx;
  float: left;
  box-sizing: border-box;
}
.leng4_bot image:first-child {
  border-radius: 0 0 0 5px;
  padding-right: 1px;
}
.leng4_bot image:last-child {
  border-radius: 0 0 5px 0;
  padding-left: 1px;
}
.leng5 {
  display: flex;
  flex-flow: row;
  height: 300rpx;
}
.leng5 view:first-child {
  width: 70%;
}
.leng5 view:first-child image {
  width: 100%;
  height: 100%;
  border-radius: 5px 0 0 0;
}
.leng5 view:last-child {
  flex: 1;
}
.leng5 view:last-child image {
  width: 100%;
  height: 100%;
  display: inline-block;
  float: left;
  padding-left: 2px;
  box-sizing: border-box;
  border-radius: 0 5px 0 0;
}
.leng5_bot {
  margin-top: 2px;
}
.leng5_bot image {
  width: 33.333%;
  height: 170rpx;
  float: left;
  box-sizing: border-box;
}
.leng5_bot image:first-child {
  border-radius: 0 0 0 5px;
  padding-right: 2px;
}
.leng5_bot image:last-child {
  border-radius: 0 0 5px 0;
  padding-left: 2px;
}
.leng6 {
  display: flex;
  flex-flow: row;
  height: 300rpx;
}
.leng6 view:first-child {
  width: 70%;
}
.leng6 view:first-child image {
  width: 100%;
  height: 100%;
  border-radius: 5px 0 0 0;
}
.leng6 view:last-child {
  flex: 1;
}
.leng6 view:last-child image {
  width: 100%;
  height: 50%;
  display: inline-block;
  float: left;
  padding-left: 2px;
  box-sizing: border-box;
  border-radius: 0 5px 0 0;
}
.leng6_lf image:first-child {
  padding-bottom: 1px;
}
.leng6_lf image:last-child {
  padding-top: 1px;
}
.leng6_bot {
  margin-top: 2px;
  position: relative;
  display: flex;
}
.leng6_bot image {
  width: 33.333%;
  height: 170rpx;
  float: left;
  box-sizing: border-box;
}
.leng6_bot image:first-child {
  border-radius: 0 0 0 5px;
  padding-right: 2px;
}
.leng6_bot image:last-child {
  border-radius: 0 0 5px 0;
  padding-left: 2px;
}
.photoNum {
  color: #fff;
  font-size: 90rpx;
  position: absolute;
  z-index: 999;
  right: 50rpx;
  bottom: 30rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.set_fixed {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
.set_text {
  flex: 1;
  height: 40px;
  line-height: 40px;
  padding: 5px 0;
  box-sizing: border-box;
}
.set_text input {
  width: 100%;
  height: 100%;
  border: 1px solid #ddd;
  border-radius: 2px;
  box-sizing: border-box;
  padding: 5px;
}
.set_lf,
.set_rt {
  width: 50px;
  display: flex;
  justify-content: center;
  justify-items: center;
  height: 40px;
  line-height: 40px;
  font-size: 25px;
}
.set_text_bg {
  display: flex;
  flex-direction: row;
  background: #fff;
  height: 40px;
  line-height: 40px;
  border-top: 1px solid #ddd;
  padding-bottom: 15px;
}
.dynNearInfocard-wrapper {
  padding: 10rpx 20rpx 0;
  color: #333;
  background: #fff;
}
.dynNearInfocard-header-wrapper {
  box-sizing: border-box;
  height: 100rpx;
  line-height: 100rpx;
  display: flex;
  vertical-align: center;
  margin-top: 20rpx;
  justify-content: space-between;
}
.dynNearInfocard-header-item {
  /*flex: 1;*/
}
.dynNearInfocard-header-img {
  display: inline-block;
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
}
.dynNearInfocard-header-nearInfo {
  display: inline-block;
  vertical-align: top;
  margin-left: 16rpx;
}
.nearInfo-item-huifu {
  padding-right: 10rpx;
  font-size: 21rpx !important;
  font-weight: 300;
  color: #7a7997;
}
.dynNearInfocard-header-nearInfo-item {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  height: 40rpx;
  line-height: 40rpx;
  font-size: 26rpx;
  display: flex;
  align-items: center;
  image {
    width: 30rpx;
    height: 30rpx;
  }
  > text {
    padding-right: 10rpx;
  }
}
.dynNearInfocard-header-nearInfo-item .iconfont {
  font-size: 20rpx;
  font-weight: bold;
}
.dynNearInfocard-header-item-focus {
  position: absolute;
  right: 0;
}
.dynNearInfocard-header-item-focus-btn {
  font-size: 23rpx;
  padding: 8rpx 24rpx;
  border-radius: 30rpx;
  background: $fontColorC;
  color: #fff;
  margin-right: 10rpx;
  text {
    font-size: 23rpx;
  }
}
.dynNearInfocard-header-time {
  color: #7a7997;
  font-size: 21rpx !important;
  font-weight: 300;
  > text {
    padding-right: 10rpx;
  }
}

.dynNearcard-imgList-wrapper {
  padding-left: 95rpx;
}

.dianzan {
  padding: 30rpx 0 30rpx 95rpx;
  > text {
    background: #f2f2f4;
    border-radius: 5rpx;
    margin-right: 20rpx;
    color: #9d9db3;
    padding: 8rpx 30rpx;
    font-size: 22rpx;
    font-weight: 400;
    > text {
      padding-right: 10rpx;
      font-size: 22rpx;
      font-weight: 400;
    }
  }
}
.positionDesc {
  color: #9d9db3;
  font-size: 20rpx;
  font-weight: 300;
  padding-left: 95rpx;
  margin-top: 40rpx;
  text {
    color: #9d9db3;
    font-weight: 300;
    font-size: 20rpx;
  }
}

.dynNearInfocard-footer-functions-item .iconfont {
  font-size: 32rpx;
  vertical-align: text-bottom;
  padding-right: 6rpx;
}
.addList {
  padding: 20rpx;
  .add {
    font-size: 27rpx;
    color: #333;
    display: inline-block;
  }
  .num {
    font-size: 24rpx;
    color: #999;
    display: inline-block;
  }
  .kan {
    float: right;
    font-size: 24rpx;
    color: #999;
  }
}
.dynNearInfocard-common-wrapper {
  padding: 20rpx;
  padding-bottom: 200rpx;
}
/*内容*/
.evaluate-wrapper {
  width: 100%;
  display: flex;
  border-bottom: 1px solid #f5f5f5;
  margin-bottom: 10px;
}
.evaluate-photo {
  flex: 0 80rpx;
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
}
.evaluate-content {
  flex: 1;
  padding-left: 10rpx;
  position: relative;
  margin-bottom: 20rpx;
}
.evaluate-content-top {
  font-size: 28rpx;
  height: 40tpx;
  line-height: 40rpx;
  margin: 10rpx 0;
}

.evaluate-content-middle {
  font-size: 27rpx;
  color: #666666;
}

.valuate-content-bottom-zan .iconfont {
  padding-right: 6rpx;
}
.evaluate-content-comment {
  margin: 10rpx 0;
  padding: 10rpx;
  background: #f9fcff;
}
.evaluate-content-comment-item {
  font-size: 25rpx;
}
.evaluate-content-comment-label {
  color: #9b9b9b;
}
.comment-text {
  color: #666666;
}
</style>
