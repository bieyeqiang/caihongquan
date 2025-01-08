<template>
  <view class="page">
    <view class="uni-card">
      <view class="uni-list">
        <!--照片墙-->
        <view class="img_list" v-if="photoWall">
          <ul>
            <li v-for="(item, index) in photoWall" :key="index">
              <image :src="item" height="200" width="200" mode="aspectFill" lazy-load></image>
              <span @click="delList(index)" class="delList iconfont">&#xe639;</span>
            </li>
            <li class="list_add" @click="ListSrcBtn(8 - photoWall.length)" v-if="photoWall.length <= 7">
              <span class="iconfont">&#xe65c;</span>
            </li>
          </ul>
        </view>
        <view class="title">^_^照片墙上传几张你的自拍，来显摆炫耀一下~</view>
        <!--头像-->
        <view class="title_name_img">
          <view class="u-avatar-wrap">
            <image class="u-avatar-demo" @tap="chooseAvatar" :src="avatar" mode="aspectFill"></image>
          </view>
        </view>
        <!--基本资料-->
        <view class="uni-list-cell-divider">
          <span class="title_left"></span>基本资料
        </view>
        <view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="titleBtn('nickname')">
          <view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
            昵称
            <span>{{ nickname }}</span>
          </view>
        </view>
        <view class="uni-list-cell" hover-class="uni-list-cell-hover">
          <view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
            性别
            <picker class="picker-item" style="line-height: normal" mode="selector" :range="sexList" range-key="text" @change="sexChange">
              <span class="bar_text">{{
                gender == 1 ? '男' : gender == 2 ? '女' : '保密'
              }}</span>
            </picker>
          </view>
        </view>
        <view class="uni-list-cell" hover-class="uni-list-cell-hover">
          <view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
            出生日期
            <picker class="picker-item" style="line-height: normal; height: 100%" mode="date" @change="birthBtn" start="1960-01-01" end="2010-01-01" value="1990-01-01">
              <span class="bar_text">{{ birthday }}</span>
            </picker>
          </view>
        </view>
        <view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="showLinkCity">
          <view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
            家乡
            <span v-if="hometown && hometown.province">{{
              hometown.province.label +
              hometown.city.label +
              hometown.area.label
            }}</span>
          </view>
        </view>
        <view class="uni-list-cell" hover-class="uni-list-cell-hover">
          <view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
            情感状态
            <picker class="picker-item" style="line-height: normal" mode="selector" :range="emotionList" range-key="affectionName" @change="emotionChange">
              <span class="bar_text">{{ emotion }}</span>
            </picker>
          </view>
        </view>
        <view class="uni-list-cell" hover-class="uni-list-cell-hover">
          <view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
            星座
            <picker class="picker-item" style="line-height: normal" mode="selector" :range="constellationList" range-key="ConstellationName" @change="constellationBtn">
              <span class="bar_text">{{ constellation }}</span>
            </picker>
          </view>
        </view>
        <!--个人信息-->
        <view class="uni-list-cell-divider">
          <span class="title_left"></span>个人信息
        </view>
        <view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="dwellonPicker">
          <view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
            现居地
            <span v-if="homeCity && homeCity.province">{{
              homeCity.province.label +
              homeCity.city.label +
              homeCity.area.label
            }}</span>
          </view>
        </view>
        <view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="showRightDrawer">
          <view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
            职业
            <span>{{ job }}</span>
          </view>
        </view>
        <view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="titleBtn('language')">
          <view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
            语言能力
            <span>{{ language }}</span>
          </view>
        </view>
        <view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="titleBtn('label')">
          <view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
            个人标签
            <span>{{ label.join(',') }} </span>
          </view>
        </view>
        <view class="uni-list-cell" hover-class="uni-list-cell-hover" @click.stop="openShow(1)">
          <view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
            微信
            <span>{{ wechat }}</span>
            <span>
              <u-switch active-color="#76CE80" size="20" v-model="openWechat"></u-switch>
            </span>
          </view>
        </view>
        <view class="uni-list-cell" hover-class="uni-list-cell-hover" @click.stop="openShow(2)">
          <view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
            Q Q
            <span>{{ qq }}</span>
            <span>
              <u-switch active-color="#76CE80" size="20" v-model="openQQ"></u-switch>
            </span>
          </view>
        </view>
        <view class="uni-list-cell" hover-class="uni-list-cell-hover" @click.stop="openShow(3)">
          <view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
            微博
            <span>{{ weibo }}</span>
            <span>
              <u-switch active-color="#76CE80" size="20" v-model="openWeibo"></u-switch>
            </span>
          </view>
        </view>

        <!-- 个人描述 -->
        <view class="uni-list-cell-divider">
          <span class="title_left"></span>个人描述
        </view>
        <view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="titleBtn('signature')">
          <view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
            个性签名
            <span>{{ signature != '' ? '已填写' : '无' }}</span>
          </view>
        </view>
        <view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="titleBtn('introduce')">
          <view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
            个人介绍
            <span>{{ introduce != '' ? '已填写' : '无' }}</span>
          </view>
        </view>
        <view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="titleBtn('story')">
          <view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
            我的故事
            <span>{{ story != '' ? '已填写' : '无' }}</span>
          </view>
        </view>
      </view>
    </view>
    <view class="name_full" @click="information">
      <span>保存资料</span>
    </view>
    <!--职业 侧边栏-->
    <uni-drawer :visible="rightDrawerVisible" mode="left" @close="closeRightDrawer">
      <div class="label_content clear">
        <div>
          <ul v-for="(item, index) of professionData" :key="index">
            <li :class="professionIndex == index ? 'tab_label' : ''" @click="professionBtn(index)">
              {{ item.title }}
            </li>
          </ul>
        </div>
        <div v-if="professionData && professionData[professionIndex]">
          <ul v-for="(key, num) of professionData[professionIndex].Children" :key="num">
            <li @click="proBtn(key)">{{ key.careerName }}</li>
          </ul>
        </div>
      </div>
    </uni-drawer>
    <!-- 录入微信号 -->
    <u-modal v-model="wxShow" :show-cancel-button="true" @confirm="wxCon" @cancel="wxCancel" ref="uModal" :async-close="true">
      <view class="slot-content">
        <view v-if="wxIndex == 1" class="wxBg">
          <u--input v-model="wechat" label="微信号：" placeholder="请填写微信号">
          </u--input>
          <view>
            公开：<u-switch active-color="#76CE80" size="40" v-model="openWechat"></u-switch>
          </view>
        </view>
        <view v-if="wxIndex == 2" class="wxBg">
          <u--input v-model="qq" label="QQ号：" placeholder="请填写QQ号">
          </u--input>
          <view>
            公开：<u-switch active-color="#76CE80" size="40" v-model="openQQ"></u-switch>
          </view>
        </view>
        <view v-if="wxIndex == 3" class="wxBg">
          <u--input v-model="weibo" label="微博号：" placeholder="请填写微博号">
          </u--input>
          <view>
            公开：<u-switch active-color="#76CE80" size="40" v-model="openWeibo"></u-switch>
          </view>
        </view>
      </view>
    </u-modal>

    <!-- 城市 -->
    <u-picker v-model="cityShowUp" mode="region" @confirm="cityShowUpOn"></u-picker>
    <u-picker v-model="cityShowDown" mode="region" @confirm="cityShowDownOn"></u-picker>
    <!-- 弹窗显示 -->
    <u-popup v-model="popupShow" mode="bottom" height="65%">
      <view class="popupBg">
        <!-- 昵称 -->
        <view v-if="userIndex == 'nickname'">
          <u--input v-model="nickname" label="昵称：" placeholder="请输入昵称"></u--input>
        </view>
        <!-- 语言能力 -->
        <view v-if="userIndex == 'language'">
          <p>
            已选语言能力<span style="color: #eb5248">{{ language.length }}</span>（最多5种）
          </p>

          <checkbox-group @change="languageChange">
            <view class="label_title"></view>
            <label :class="item.checked ? 'checkbox selectBox' : 'checkbox '" v-for="(item, index) in languageData" :key="item" @click="languageBtn(item.name, index)">
              <checkbox :value="item.name" :checked="item.checked" v-show="false" />{{ item.name }}
            </label>
          </checkbox-group>
        </view>
        <!-- 个人标签 -->
        <view v-if="userIndex == 'label'">
          <view>
            <view>
              已选标签<span style="color: #eb5248">{{ label.length }}</span>（最多5个）
            </view>
          </view>
          <checkbox-group>
            <view v-for="(data, key) in labelData" :key="key">
              <view class="label_title">{{ data.title }}</view>
              <label :class="item.checked ? 'checkbox selectBox' : 'checkbox '" v-for="(item, index) in data.Children" :key="index" @click="labelBtn(item, index, key)">
                <checkbox :value="item.value" :checked="item.checked" v-show="false" />{{ item.name }}
              </label>
            </view>
          </checkbox-group>
        </view>
        <!-- 个性签名 -->
        <view v-if="userIndex == 'signature'" class="viewFull">
          <view style="padding: 10px 0">请输入您的个性签名：（最多30字）</view>
          <view class="text_bor" style="height: 100px">
            <textarea @input="signatureBlur" style="height: 100px" placeholder="输入您的个性签名-最多30字" maxlength="30" :value="signature" auto-height="true" />
          </view>
        </view>
        <!--我的介绍-->
        <view v-if="userIndex == 'introduce'" class="viewFull">
          <view style="padding: 10px 0">请输入您的个人介绍：（最多500字）</view>
          <view class="text_bor" style="height: 200px">
            <textarea @input="introduceBlur" style="height: 200px" placeholder="输入您的个人介绍-最多500字" maxlength="500" :value="introduce" auto-height="true" />
          </view>
        </view>

        <!--我的故事-->
        <view v-if="userIndex == 'story'" class="viewFull">
          <view style="padding: 10px 0">请输入您的个人故事：（最多1000字）</view>
          <view class="text_bor" style="height: 200px">
            <textarea @input="storyBlur" style="height: 200px" placeholder="输入您的个人故事-最多1000字" maxlength="1000" :value="story" auto-height="true" />
          </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import uniDrawer from '@/components/uni-drawer.vue'
import cropper from '@/components/cropper.vue'
export default {
  components: {
    uniDrawer,
    cropper,
  },
  data() {
    return {
      signature: '',
      introduce: '',
      story: '',
      cityText: '请选择',
      cityTextTo: '请选择',
      homeCity: {},
      hometown: {},
      label: [],
      labelData: [],
      signature: '',
      language: [],
      nickname: '',
      userIndex: '',
      popupShow: false,
      cityShowUp: false,
      cityShowDown: false,
      wechat: '',
      qq: '',
      weibo: '',
      wxShow: false,
      wxIndex: '',
      openWechat: false,
      openQQ: false,
      openWeibo: false,
      languageText: '',
      languageVal: '',
      languageData: [],
      labelVal: '',
      labelText: '',
      labelData: '',
      proCode: '',
      job: '请选择',
      professionShow: false,
      professionData: '',
      userData: '',
      professionIndex: 0,
      rightDrawerVisible: false,
      cityShow: false,
      dwellShow: false,
      citydataList: {
        province: [],
        city: [],
        area: [],
      },
      photoWall: [],
      nameImg: '',
      avatar:
        'https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/name.jpg',
      nameVal: '',
      sexList: [
        {
          text: '男',
        },
        {
          text: '女',
        },
      ],
      emotionList: '',
      emotionVal: '',
      emotion: '请选择',
      gender: 0,
      birthday: '请选择',
      themeColor: '#007AFF',
      cityPickerValueDefault: [0, 0, 1],
      cityVal: '',
      getCityData: '',
      constellation: '请选择',
      constellationList: [],
      constellationVal: '',
      dwellonText: '请选择',
      cityFull: {},
      dwellonFull: {},
      careersData: '',
      tempFilePath: '',
      cropFilePath: '',
      idCardImageReverse: '',
      uploadImageDir: 'haha/',
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    },
  },

  methods: {
    chooseAvatar() {
      uni.chooseImage({
        count: 1,
        success: (res) => {
          uni.navigateTo({
            url: `/pagesA/login/cutImage/cut?src=${res.tempFilePaths[0]}`,
          })
        },
      })
    },
    //裁剪回调
    async setAvatar(filePath) {
      this.uploadProgress = 0
      const result = await uniCloud.uploadFile({
        filePath: filePath,
        cloudPath:
          'image/' +
          formatDate(new Date()) +
          '/' +
          Date.parse(new Date()) +
          '.jpg',
        onUploadProgress: (e) => {
          this.uploadProgress = Math.round((e.loaded * 100) / e.total)
        },
      })
      if (!result.fileID) {
        this.$util.msg('头像上传失败')
        return
      }
      const tempFiles = await uniCloud.getTempFileURL({
        fileList: [result.fileID],
      })
      const tempFile = tempFiles.fileList[0]
      if (tempFile.code == 'SUCCESS') {
        // 图片检测 阿里
        const getImageLog = await this.$request('security', 'imageDetection', {
          image: tempFile.download_url,
        })
        if (getImageLog.state == 0) {
          this.nameImg = tempFile.download_url
          this.avatar = tempFile.download_url
        } else {
          this.$util.msg('头像涉嫌内容不适，请重新上传')
        }
      } else if (tempFile.tempFileURL) {
        // 图片检测 腾讯
        const getImageLog = await this.$request('security', 'imageDetection', {
          image: tempFile.tempFileURL,
        })
        if (getImageLog.state == 0) {
          this.nameImg = tempFile.tempFileURL
          this.avatar = tempFile.tempFileURL
        } else {
          this.$util.msg('头像涉嫌内容不适，请重新上传')
        }
      } else {
        this.$util.msg('头像上传失败')
      }
      // 日期
      function formatDate(date) {
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        m = m < 10 ? '0' + m : m
        var d = date.getDate()
        d = d < 10 ? '0' + d : d
        return y + '-' + m + '-' + d
      }
    },
    cityShowDownOn(val) {
      this.homeCity = val
    },
    cityShowUpOn(val) {
      this.hometown = val
    },
    labelBtn(item, index, key) {
      if (this.label.join(',').indexOf(item.name) > -1) {
        for (let label in this.label) {
          if (this.label[label] == item.name) {
            this.label.splice(label, 1)
          }
        }
        this.labelData[key].Children[index].checked = false

        return
      }
      if (this.label.length >= 5) {
        uni.showToast({
          title: '个人标签最多5个',
          icon: 'none',
          duration: 3000,
        })
        return
      }
      this.labelData[key].Children[index].checked = true
      this.label.push(item.name)
    },
    storyBlur: function (e) {
      this.story = e.detail.value
    },
    introduceBlur: function (e) {
      this.introduce = e.detail.value
    },
    signatureBlur: function (e) {
      this.signature = e.detail.value
    },
    languageChange: function (e) {
      if (e.detail.value.length > 5) {
        uni.showToast({
          title: '语言种类最多5种',
          icon: 'none',
          duration: 3000,
        })
        return
      }
      this.language = e.detail.value
    },
    languageBtn(name, index, key) {
      if (this.language.length > 5) {
        uni.showToast({
          title: '语言种类最多5种',
          icon: 'none',
          duration: 3000,
        })
        return
      }
      if (this.language.join(',').indexOf(name) > -1) {
        this.languageData[index].checked = true
      } else {
        this.languageData[index].checked = false
      }
    },
    getAges(str) {
      var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/)
      if (r == null) return false
      var d = new Date(r[1], r[3] - 1, r[4])
      if (
        d.getFullYear() == r[1] &&
        d.getMonth() + 1 == r[3] &&
        d.getDate() == r[4]
      ) {
        var Y = new Date().getFullYear()
        return Y - r[1]
      }
      return '输入的日期格式错误！'
    },
    wxCancel() {},
    wxCon() {
      //console.log("确认");
      this.$refs.uModal.clearLoading()
      if (this.wxIndex == 1 && this.wechat == '') {
        this.wxchecked = false
        this.wxShow = false
      }
      if (this.wxIndex == 2 && this.qq == '') {
        this.qqchecked = false
        this.wxShow = false
      }
      if (this.wxIndex == 3 && this.weibo == '') {
        this.wbchecked = false
        this.wxShow = false
      }
      this.wxShow = false
    },
    openShow(index) {
      this.wxShow = true
      this.wxIndex = index
      if (index == 1) {
        this.wxchecked = true
      }
      if (index == 2) {
        this.qqchecked = true
      }
      if (index == 3) {
        this.wbchecked = true
      }
    },

    // 保存资料
    async information() {
      let vm = this
      if (vm.avatar == '') {
        uni.showToast({
          title: '请上传头像',
          icon: 'none',
          duration: 3000,
        })
        return
      }
      if (vm.nickname == '') {
        uni.showToast({
          title: '昵称不能为空',
          icon: 'none',
          duration: 3000,
        })
        return
      }
      if (vm.birthday == '请选择') {
        uni.showToast({
          title: '请选择出生日期',
          icon: 'none',
          duration: 3000,
        })
        return
      }
      if (vm.emotion == '请选择') {
        uni.showToast({
          title: '请选择情感状态',
          icon: 'none',
          duration: 3000,
        })
        return
      }
      if (vm.constellation == '请选择') {
        uni.showToast({
          title: '请选择星座',
          icon: 'none',
          duration: 3000,
        })
        return
      }
      if (vm.job == '请选择') {
        uni.showToast({
          title: '请选择职业',
          icon: 'none',
          duration: 3000,
        })
        return
      }
      uni.showLoading({
        title: '保存中...',
        mask: true,
      })
      // 保存资料
      const res = await vm.$request('user', 'update', {
        avatar: vm.avatar, // 头像
        nickname: vm.nickname, // 昵称
        gender: vm.gender, // 1男 2女 0保密
        photoWall: vm.photoWall, // 照片墙
        birthday: vm.birthday, // 生日
        birthdayText: vm.getAges(vm.birthday),
        hometown: vm.hometown, // 家乡
        homeCity: vm.homeCity, // 居住地
        emotion: vm.emotion, // 情感
        constellation: vm.constellation, // 星座
        job: vm.job, // 职业
        language: vm.language, //  语言
        label: vm.label, // 标签
        wechat: vm.wechat, // 微信
        qq: vm.qq, // qq
        weibo: vm.weibo, // 微博
        openWechat: vm.openWechat,
        openQQ: vm.openQQ,
        openWeibo: vm.openWeibo,
        signature: vm.signature, // 签名
        introduce: vm.introduce, // 介绍
        story: vm.story, // 故事
      })
      uni.hideLoading()
      if (res) {
        uni.switchTab({
          url: '/pages/myhome/myhome',
        })
        uni.showToast({
          title: '保存资料成功',
          duration: 3000,
        })

        // IM更新资料
        vm.JIM.updateSelfInfo({
          nickname: vm.nickname,
        })
          .onSuccess(function (data) {
            //console.log(data, "IM更新资料成功");
          })
          .onFail(function (data) {
            //console.log(data, "IM更新资料失败");
          })
        //  IM更新头像
        vm.JIM.updateSelfAvatar({
          avatar: vm.avatar,
        })
          .onSuccess(function (data) {
            //console.log(data, "IM更新头像成功");
          })
          .onFail(function (data) {
            //console.log(data, "IM更新头像失败");
          })
      }
    },
    proBtn(key) {
      this.proCode = key.code
      this.job = key.careerName
      this.rightDrawerVisible = false
    },
    professionBtn(index) {
      this.professionIndex = index
    },
    showRightDrawer() {
      this.rightDrawerVisible = true
    },
    closeRightDrawer() {
      this.rightDrawerVisible = false
    },
    showLinkCity() {
      // 获取城市 公共数据
      this.cityShowUp = true
    },
    dwellonPicker() {
      // 获取城市 公共数据
      this.cityShowDown = true
    },
    birthBtn(evt) {
      this.birthday = evt.detail.value
    },
    constellationBtn(evt) {
      this.constellationVal = this.constellationList[evt.detail.value].code
      this.constellation =
        this.constellationList[evt.detail.value].ConstellationName
    },
    emotionChange(evt) {
      this.emotionVal = this.emotionList[evt.detail.value].code
      this.emotion = this.emotionList[evt.detail.value].affectionName
    },
    sexChange(evt) {
      //console.log(evt);
      // 男
      if (evt.detail.value == 0) {
        this.gender = 1
      }
      // 女
      if (evt.detail.value == 1) {
        this.gender = 2
      }
    },
    titleBtn(text) {
      this.userIndex = text
      this.popupShow = true
    },
    delList(index) {
      this.photoWall.splice(index, 1)
    },
    async ListSrcBtn(count) {
      let file = await this.cloudUploadFile(8)
      if (file == undefined) {
        return
      } else {
        uni.showLoading({
          title: '上传中...',
        })
      }
      file.fileUrl.forEach(async (item, index) => {
        const getImageLog = await this.$request('security', 'imageDetection', {
          image: item,
        })
        // console.log(getImageLog,'getImageLog')
        if (getImageLog.state == 0) {
          uni.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 3000,
          })
          this.photoWall.push(getImageLog.image)
        } else {
          uni.showToast({
            title: '该图片涉嫌内容不适，请更换一个',
            icon: 'none',
            duration: 3000,
          })
        }
      })
    },
  },
  async onLoad(option) {
    this.$store.dispatch('getUserInfo')
    for (let index in this.userInfo) {
      this[index] = this.userInfo[index]
    }
    const res = await this.$request('other', 'getCommon', {})
    // 婚姻状态
    this.emotionList = res.emotion.data
    // 星座
    this.constellationList = res.constellation.data
    // 格式化职业
    let profession = [],
      num = 1
    for (var item in res.profession.data) {
      if (res.profession.data[item].careerSort == num) {
        var data = {
          title: res.profession.data[item].sortName,
          sort: res.profession.data[item].careerSort,
          Children: [],
        }
        for (var index in res.profession.data) {
          if (res.profession.data[index].careerSort == num) {
            data.Children.push(res.profession.data[index])
          }
        }
        profession.push(data)
        num++
      }
    }
    this.professionData = profession

    // 语言
    for (let item of res.language.data) {
      let key = {
        name: item.languageName,
        value: item.code,
        checked: false,
      }
      for (let list of this.userInfo.language) {
        if (item.languageName == list) {
          key.checked = true
        }
      }
      this.languageData.push(key)
    }

    // 个人标签
    let labelData = [],
      lab = 1
    for (let item in res.disposition.data) {
      if (res.disposition.data[item].labelsSort == lab) {
        let data = {
          title: res.disposition.data[item].sortName,
          sort: res.disposition.data[item].labelsSort,
          Children: [],
        }
        for (let index in res.disposition.data) {
          if (res.disposition.data[index].labelsSort == lab) {
            let key = {
              name: res.disposition.data[index].labelsName,
              value: res.disposition.data[index].code,
              checked: false,
            }
            for (let list of this.userInfo.label) {
              if (res.disposition.data[index].labelsName == list) {
                key.checked = true
              }
            }
            data.Children.push(key)
          }
        }

        labelData.push(data)
        lab++
      }
    }
    this.labelData = labelData
  },
  onShow() {},
  onBackPress(options) {
    // if (options.from === "backbutton") {
    //   uni.showModal({
    //     title: "提示",
    //     content: "确定要保存资料吗？",
    //     success: (res) => {
    //       if (res.confirm) {
    //         this.information();
    //       } else if (res.cancel) {
    //         uni.navigateBack();
    //       }
    //     },
    //   });
    //   return true;
    // }
  },
  onUnload(val) {
    //console.log("卸载", val);
  },
}
</script>

<style lang="scss" scpped>
.u-avatar-wrap {
  margin-top: 40rpx;
  overflow: hidden;
  margin-bottom: 40rpx;
  text-align: center;
  display: flex;
  justify-content: center;
}
.u-avatar-demo {
  width: 300rpx;
  height: 300rpx;
  background: #f1f1f1;
  border-radius: 50%;
}
.text_bor {
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 10px;
  height: 200px;
  textarea {
    width: 100%;
  }
}
.label_title {
  border-top: 2px solid #ddd;
  padding-top: 5px;
  margin-top: 5px;
}
.selectBox {
  background: #eb5248 !important;
  color: #fff !important;
}
.checkbox {
  padding: 5px 10px;
  margin: 10px;
  border-radius: 7upx;
  color: #9b9b9b;
  display: inline-block;
  background: #e7eaed;
}
.popupBg {
  width: 100%;
  height: 100%;
  padding: 20rpx 10rpx;
  > view {
    width: 100%;
  }
}
.wxBg {
  > view {
    margin: 20rpx 26rpx;
    display: flex;
    font-size: 28rpx;
  }
}
.status_bar {
  height: var(--status-bar-height);
  width: 100%;
}
.label_content li {
  padding: 15px 0;
  border-bottom: 1px solid #c6c6c6;
}
.label_content > div:first-child {
  background: #fff !important;
}
.label_content > div {
  width: 130px;
  background: #ddd;
  float: left;
  border-right: 1px solid #ddd;
  text-align: center;
  font-size: 15px;
}
.label_content {
  width: 70vw;
  height: 100%;
  background: #fff;
  position: relative;
}
.bar_text {
  width: 400upx;
  display: inline-block;
  text-align: right;
}
.name_full {
  width: 100%;
  height: 70px;
  span {
    background: $fontLinear;
    color: #fff;
    border-radius: 15px;
    padding: 5px 15px;
    text-align: center;
    margin: 20px auto;
    width: 50%;
    position: fixed;
    left: 50%;
    bottom: 0;
    margin-left: -25%;
    z-index: 100;
    box-shadow: 3rpx 6rpx 9rpx #666666;
  }
}
.title {
  color: #535370;
  font-size: 12px;
  margin: 0 20px;
}
.delList {
  position: absolute;
  right: -10rpx;
  top: -10rpx;
  color: #fe586b;
  font-weight: bold;
  background: #fff;
  border-radius: 50%;
  padding: 10rpx;
}
.list_add span {
  width: 100%;
  height: 100%;
  background: #f4f9ff;
  font-size: 30px;
  box-sizing: border-box;
  border-radius: 5px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.list_add {
  width: 25%;
  height: 200upx;
}
.img_list li {
  width: 25%;
  height: 200upx;
  padding: 10upx 5upx;
  box-sizing: border-box;
  position: relative;
}
.img_list ul {
  display: flex;
  flex-wrap: wrap;
}
.img_list image {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.title_name_img {
  text-align: center;
  margin: 10px;
}
.title_name_img image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.title_left {
  display: inline-block;
  width: 6upx;
  margin: 10upx 0;
  background: $fontLinear;
  color: #fff;
  border-radius: 10upx;
  margin-right: 20upx;
}
</style>
