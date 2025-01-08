<template>
  <view class="certification-wrapper" v-bind:style="[{ height: windowHeight + 'px' }]">
    <!--    未认证 -->
    <view v-if="checkStatus.auth_status == 0 ">
      <view class="certification-info">
        <view class='certification-info-item'>
          <text class='certification-info-item-label'>真实姓名:</text>
          <input class='certification-info-item-input' placeholder-style='color:#C6C6C6' type="text" placeholder="请输入真实姓名(必填*)" @input='changeName' :value="userName">
        </view>
        <view class='certification-info-item' @click='selectedCertificateType'>
          <text class='certification-info-item-label'>证件类型:</text>
          <text class='certification-info-item-placeholder' v-bind:style="{ color: certificateType ? '#333' : '#C6C6C6'}">{{certificateType ? certificateType : '证件类型(必选*)'}}</text>
          <text class='certification-info-item-icon iconfont icon-you'></text>
        </view>
        <view class='certification-info-item'>
          <text class='certification-info-item-label'>证件号码:</text>
          <input class='certification-info-item-input' placeholder-style='color:#C6C6C6' maxlength="26" type="number" placeholder="请输入证件号码(必填*)" @input='changeNum' :value="certificateNum">
        </view>
      </view>
      <wrap :height='16'></wrap>
      <view class="certification-upload">
        <view class="certification-upload-title cor">
          <view class="certification-upload-title-txt ">本人形象照(必传)</view>
          <view class="certification-upload-title-wraning"> *上传1张自己最好看的形象照片，见右图示例</view>
        </view>
        <view class='certification-upload-box'>
          <view class='certification-upload-box-item certification-upload-box-add' @click='posterSrcBtn'>
            <image :src='posterSrc_base' class='certification-upload-box-item-img' v-if="posterSrc != ''" />
            <text class='iconfont' v-if="posterSrc == ''">&#xe65c;</text>
          </view>
          <view class='certification-upload-box-item'>
            <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/pcIcon/xuanchuan.jpg" class='certification-upload-box-item-img' />
          </view>
        </view>
      </view>
      <wrap :height='16'></wrap>
      <view class="certification-upload">
        <view class="certification-upload-title cor">
          <view class="certification-upload-title-txt ">自拍照片3张(必传)</view>
          <view class="certification-upload-title-wraning"> *上传3张自己的真实自拍照片</view>
        </view>
        <view class='certification-upload-box'>
          <view class='certification-upload-box-item certification-upload-box-add' style="position: relative" v-for="(item,index) in selfie_base" :key="index">
            <image :src='item' style="width: 100%;height: 100%" />
            <text class="iconfont listdel" @click='selfieDel(index)'>&#xe68b;</text>
          </view>
          <view class='certification-upload-box-item certification-upload-box-add' @click='selfieBtn' v-if="selfie_base.length <= 2">
            <text class='iconfont'>&#xe65c;</text>
          </view>
        </view>
      </view>
      <wrap :height='16' v-if="allShow == false" @click="allShow = true"></wrap>
      <view v-if="allShow == false" @click="allShow = true">
        <view class="all_text" style="color:#999">友情提示：补充更多资料，可为您带来更丰厚的下单率，及审核通过率！~</view>
        <view class="all_text">补充更多资料+ >>></view>
      </view>
      <!--      <text>友情提示：如补充更多资料，可为您带来更大的下单率及审核通过率！~</text>-->
      <wrap :height='16'></wrap>
      <view v-if="allShow">
        <view class="certification-upload">
          <view class="certification-upload-title">
            <view class="certification-upload-title-txt">上传证件照片(可选) </view>
            <view class="certification-upload-title-wraning"> *照片仅用于认证，请确保文字清晰可见，见右图示例</view>
          </view>
          <view class='certification-upload-box'>
            <view class='certification-upload-box-item certification-upload-box-add' @click='IDCardBtn'>
              <image :src='IDCardSrc_base' class='certification-upload-box-item-img' v-if="IDCardSrc != ''" />
              <text class='iconfont' v-if="IDCardSrc == ''">&#xe65c;</text>
            </view>
            <view class='certification-upload-box-item'>
              <image v-if="certificateIndex == 0 || certificateIndex == ''" src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/pcIcon/shenfenzheng.jpg" class='certification-upload-box-item-img' />
              <image v-if="certificateIndex == 1" src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/pcIcon/xueshengzheng.jpg" class='certification-upload-box-item-img' />
              <image v-if="certificateIndex == 2" src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/pcIcon/huzhao.jpg" class='certification-upload-box-item-img' />
            </view>
          </view>
        </view>
        <wrap :height='16'></wrap>
        <view class="certification-upload">
          <view class="certification-upload-title cor">
            <view class="certification-upload-title-txt ">上传导游证(可选)</view>
            <view class="certification-upload-title-wraning"> *如您有导游证(新版旧版证均可)，见右图新版示例</view>
          </view>
          <view class='certification-upload-box'>
            <view class='certification-upload-box-item certification-upload-box-add' @click='nameSrcBtn'>
              <image :src='nameSrc_base' class='certification-upload-box-item-img' v-if="nameSrc != ''" />
              <text class='iconfont' v-if="nameSrc == ''">&#xe65c;</text>
            </view>
            <view class='certification-upload-box-item'>
              <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/pcIcon/daoyou.jpg" class='certification-upload-box-item-img' />
            </view>
          </view>
        </view>
        <wrap :height='16'></wrap>
        <view class='certification-info-item cor'>
          <text class='certification-info-item-label '>导游证号:</text>
          <input class='certification-info-item-input' placeholder-style='color:#C6C6C6' type="number" placeholder="请输入导游证号(可选)" @input='tourchangeNum' :value="tourNum">
        </view>
        <wrap :height='16'></wrap>
        <view class="certification-upload">
          <view class="certification-upload-title cor">
            <view class="certification-upload-title-txt ">其他证件(可选)</view>
            <view class="certification-upload-title-wraning"> *如您有其他证件，可上传增加审核通过率和客户下单率</view>
          </view>
          <view class='certification-upload-box'>
            <view class='certification-upload-box-item certification-upload-box-add' style="position: relative" v-for="(item,index) in ListSrc_base" :key="index">
              <image :src='item' style="width: 100%;height: 100%" />
              <text class="iconfont listdel" @click='ListSrcDel(index)'>&#xe68b;</text>
            </view>
            <view class='certification-upload-box-item certification-upload-box-add' @click='ListSrcBtn' v-if="ListSrc_base.length <= 2">
              <text class='iconfont'>&#xe65c;</text>
            </view>
          </view>
        </view>
        <wrap :height='16'></wrap>
        <view class="all_text" v-if="allShow" @click="allShow = false">收起更多资料>>></view>
      </view>
      <view class="observe">
        <checkbox-group @change="checkboxChange">
          <label>
            <checkbox :value="true" :checked="checkShow" style="transform:scale(0.7)" color="#FF6600" />我已阅读并同意<text @click.stop="tcp" style="color:#92def7">《技能服务协议》</text><text @click.stop="tcp" style="color:#92def7">《内容服务协议》</text>等服务协议的内容
          </label>
        </checkbox-group>
      </view>
      <view class='certification-vifify'>
        <view class='certification-vifify-btn' @click="approve">立即认证大神</view>
      </view>
    </view>
    <view class="titleImg" v-if="checkStatus.auth_status == 1 ">
      <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/empty/default.png"></image>
      <view>认证正在审核中，客服正在加紧处理...</view>
      <view>可加派单官(小舞)：wu758vip 进行接单</view>
      <view>(您可先前往-个人中心，发布技能)</view>
      <text @click="goPage('/pagesA/service/serviceList/serviceList')">去发布技能</text>
    </view>
    <view class="titleImg" v-if="checkStatus.auth_status == 2">
      <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/empty/default.png"></image>
      <view>您已实名认证成功，可前往-个人中心，发布服务技能！</view>
      <view>可加派单官(小舞)：wu758vip 进行接单</view>
      <view>(您可先前往-个人中心，发布技能)</view>
      <text @click="goPage('/pagesA/service/serviceList/serviceList')">去发布技能</text>
    </view>
    <view class="titleImg" v-if="checkStatus.auth_status == 3">
      <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/empty/default.png"></image>
      <view>您的认证审核失败，请您重新认证...</view>
      <view>如有疑问，请加审核官(小舞)：wu758vip 进行资讯</view>
      <view v-if="checkStatus.refuseText != null">（原因：{{checkStatus.refuseText}}）</view>
      <text @click="checkStatus.auth_status = 0">重新认证</text>
    </view>

    <!-- 工作台 -->
    <view class="workBench" v-if="checkStatus.auth_status == 2 && option.type == 'workBench'">
      <view class="cell row b-b" @click="navTo('/pagesA/service/serviceList/serviceList')">
        <text class="tit">管理所有技能</text>
        <text class="jw-icon icon-you"></text>
      </view>
      <view class="cell row b-b" @click="navTo('/pagesA/service/service/service')">
        <text class="tit">发布技能</text>
        <text class="jw-icon icon-you"></text>
      </view>
      <view class="cell row b-b">
        <text class="tit">接单状态(是否开启)</text>
        <view v-if="orderStatus" class="loading">
          <jw-icon-loading size="32rpx" color="#5856D5"></jw-icon-loading>
        </view>
        <switch :checked="receivePush" :disabled="switchDisabled" color="#5856D5" @change="onSwitchChange" />
      </view>
      <view class="cell row b-b">
        <text class="tit">派单接单通知(是否开启)</text>
        <view v-if="orderNotification" class="loading">
          <jw-icon-loading size="32rpx" color="#5856D5"></jw-icon-loading>
        </view>
        <switch :checked="receivePush" :disabled="switchDisabled" color="#5856D5" @change="onSwitchChange" />
      </view>
    </view>
  </view>
</template>

<script>
import wrap from '@/components/wrap'

export default {
  data () {
    return {
      orderStatus:true,
      orderNotification:true,
      btnShow: true,
      certificateTypeList: ['身份证', '学生证', '护照'],
      userName: '',
      certificateType: '',
      certificateNum: '',
      IDCardSrc: '',
      IDCardSrc_base: '',
      posterSrc: '',
      posterSrc_base: '',
      nameSrc: '',
      nameSrc_base: '',
      ListSrc: [],
      ListSrc_base: [],
      selfie: [],
      selfie_base: [],
      windowHeight: 0,
      tourNum: '',
      checkStatus: '',
      certificateIndex: '',
      checkShow: false,
      tcpShow: false,
      tcpId: 1,
      allShow: false,
      option: ''
    }
  },
  components: {
    wrap,
  },
  methods: {

    tcp (id) {
      this.navTo('/pagesA/public/article?param=' + JSON.stringify({ module: 'article', operation: 'getAgreement', data: { type: 1 } }))
    },
    checkboxChange (e) {
      if (e.detail.value.length > 0) {
        this.checkShow = true
      } else {
        this.checkShow = false
      }
    },
    // 提交认证
    approve () {
      let vm = this
      ////console.log(vm.certificateIndex ,"5555555555555555555")
      if (vm.userName == '') {
        uni.showToast({
          title: '请填写真实姓名',
          icon: 'none',
          duration: 3000
        })
        return
      }
      if (vm.certificateIndex == '') {
        uni.showToast({
          title: '请选择证件类型',
          icon: 'none',
          duration: 3000
        })
        return
      }
      if (vm.certificateNum == '') {
        uni.showToast({
          title: '请输入正确证件号码',
          icon: 'none',
          duration: 3000
        })
        return
      }

      if (vm.posterSrc == '') {
        uni.showToast({
          title: '请上传形象照',
          icon: 'none',
          duration: 3000
        })
        return
      }
      if (vm.selfie == '' || vm.selfie.length < 3) {
        uni.showToast({
          title: '请上传自拍照3张',
          icon: 'none',
          duration: 3000
        })
        return
      }
      if (!vm.checkShow) {
        uni.showToast({
          title: '请先阅读并同意《技能服务协议》',
          icon: 'none',
          duration: 3000
        })
        return
      }
      uni.showLoading({
        title: '认证提交中'
      });
      // 认证
      this.$request('attest', 'setAuth', {
        id_card_front: vm.IDCardSrc,
        id_card_in_hand: vm.posterSrc,
        guide_img: vm.nameSrc,
        other_img: vm.ListSrc,
        selfie_img: vm.selfie,
        real_name: vm.userName,
        certificate_type: vm.certificateIndex,
        identity: vm.certificateNum,
        guide_number: vm.tourNum,
      }).then((res) => {
        if (res.status == 0) {
          uni.hideLoading();
          uni.showToast({
            title: '认证已提交，正在审核，您现在可以先发布技能了...',
            icon: 'none',
            duration: 5000
          })
          // 查询审核状态
          vm.getuserProof()
        } else {
          uni.hideLoading();
          // 提示
          uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 3000
          })
        }
      })

    },
    selectedCertificateType () {
      let that = this
      wx.showActionSheet({
        itemList: that.certificateTypeList,
        success: function (res) {
          ////console.log(res.tapIndex,"666666")
          that.certificateType = that.certificateTypeList[res.tapIndex]
          that.certificateIndex = res.tapIndex + ''
        },
        fail: function (res) {
          ////console.log(res.errMsg)
        }
      })
    },
    changeName (event) {
      this.userName = event.target.value
    },
    changeNum (event) {
      this.certificateNum = event.target.value
    },
    tourchangeNum (event) {
      this.tourNum = event.target.value
    },
    selfieDel (index) {
      this.selfie.splice(index, 1)
      this.selfie_base.splice(index, 1)
    },
    async selfieBtn () {
      let file = await this.cloudUploadFile(1)
      if (file == undefined) {
        return
      } else {
        uni.showLoading({
          title: '上传中...'
        });
      }
      file.fileUrl.forEach(async (item, index) => {
        const getImageLog = await this.$request("security", "imageDetection", {
          image: item
        });
        // console.log(getImageLog,'getImageLog')
        if (getImageLog.state == 0) {

          this.selfie.push(item)
          this.selfie_base.push(item)
          uni.showToast({
            title: "上传成功",
            icon: "success",
            duration: 3000,
          });

        } else {
          uni.showToast({
            title: "该图片涉嫌内容不适，请更换一个",
            icon: "none",
            duration: 3000,
          });
        }
      });

    },
    ListSrcDel (index) {
      this.ListSrc.splice(index, 1)
      this.ListSrc_base.splice(index, 1)
    },

    async ListSrcBtn () {
      let file = await this.cloudUploadFile(1)
      if (file == undefined) {
        return
      } else {
        uni.showLoading({
          title: '上传中...'
        });
      }
      file.fileUrl.forEach(async (item, index) => {
        const getImageLog = await this.$request("security", "imageDetection", {
          image: item
        });
        // console.log(getImageLog,'getImageLog')
        if (getImageLog.state == 0) {

          this.ListSrc.push(item)
          this.ListSrc_base.push(item)
          uni.showToast({
            title: "上传成功",
            icon: "success",
            duration: 3000,
          });

        } else {
          uni.showToast({
            title: "该图片涉嫌内容不适，请更换一个",
            icon: "none",
            duration: 3000,
          });
        }
      });

    },
    async nameSrcBtn () {
      let file = await this.cloudUploadFile(1)
      if (file == undefined) {
        return
      } else {
        uni.showLoading({
          title: '上传中...'
        });
      }
      file.fileUrl.forEach(async (item, index) => {
        const getImageLog = await this.$request("security", "imageDetection", {
          image: item
        });
        // console.log(getImageLog,'getImageLog')
        if (getImageLog.state == 0) {

          this.nameSrc = item
          this.nameSrc_base = item
          uni.showToast({
            title: "上传成功",
            icon: "success",
            duration: 3000,
          });

        } else {
          uni.showToast({
            title: "该图片涉嫌内容不适，请更换一个",
            icon: "none",
            duration: 3000,
          });
        }
      });

    },
    async posterSrcBtn () {
      // 上传照片
      let file = await this.cloudUploadFile(1)
      if (file == undefined) {
        return
      } else {
        uni.showLoading({
          title: '上传中...'
        });
      }
      file.fileUrl.forEach(async (item, index) => {
        const getImageLog = await this.$request("security", "imageDetection", {
          image: item
        });
        // console.log(getImageLog,'getImageLog')
        if (getImageLog.state == 0) {

          this.posterSrc = item
          this.posterSrc_base = item
          uni.showToast({
            title: "上传成功",
            icon: "success",
            duration: 3000,
          });

        } else {
          uni.showToast({
            title: "该图片涉嫌内容不适，请更换一个",
            icon: "none",
            duration: 3000,
          });
        }
      });

    },
    async IDCardBtn () {
      let file = await this.cloudUploadFile(1)
      if (file == undefined) {
        return
      } else {
        uni.showLoading({
          title: '上传中...'
        });
      }
      file.fileUrl.forEach(async (item, index) => {
        const getImageLog = await this.$request("security", "imageDetection", {
          image: item
        });
        // console.log(getImageLog,'getImageLog')
        if (getImageLog.state == 0) {

          this.IDCardSrc = item
          this.IDCardSrc_base = item
          uni.showToast({
            title: "上传成功",
            icon: "success",
            duration: 3000,
          });

        } else {
          uni.showToast({
            title: "该图片涉嫌内容不适，请更换一个",
            icon: "none",
            duration: 3000,
          });
        }
      });

    },
    addPoster () {
      let that = this
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          that.posterSrc = res.tempFilePaths[0]
        }
      })
    },
    getuserProof () {
      this.$request('attest', 'getAuth').then((res) => {
        this.checkStatus = res
      })
    }
  },
  onLoad (option) {
    this.option = option
    // 查询审核状态
    this.getuserProof()
  }
}
</script>

<style lang="scss" scoped>
.workBench {
  margin-top: 100rpx;
  padding: 0 20rpx;
}
.row {
  display: flex;
  align-items: center;
}

.cell {
  height: 106rpx;
  .tit {
    flex: 1;
    font-size: 30rpx;
    color: #333;
  }
  .tip {
    margin-right: 10rpx;
    font-size: 26rpx;
    color: #999;
  }
  .icon-you {
    font-size: 24rpx;
    color: #aaa;
  }
  .icon-xuanzhong {
    font-size: 36rpx;
    color: #d8d8d8;

    &.active {
      color: $cor;
    }
  }
  switch {
    transform: scale(0.8) translateX(10rpx);
    transform-origin: center right;
  }
  .loading {
    transform: translateX(8rpx);
  }
}
.all_text {
  text-align: center;
  padding: 30rpx 0;
  color: $cor;
  font-weight: bold;
}
.observe {
  margin: 20px;
  text-align: center;
  color: #333;
}
.cor {
  color: #909399 !important;
  view,
  text,
  input {
    color: #909399 !important;
  }
}
.titleImg text {
  margin-top: 40rpx;
  background: $fontLinear;
  color: #fff;
  padding: 15rpx 45rpx;
  font-size: 30rpx;
  border-radius: 6rpx;
  display: inline-block;
}
.titleImg {
  text-align: center;
}
.titleImg image {
  width: 400rpx;
  height: 287rpx;
  padding: 30rpx 0;
}
.listdel {
  position: absolute;
  top: 0;
  right: 0;
  color: $cor;
  display: inline-block;
  font-size: 50rpx !important;
}
.certification-wrapper {
  background: #eaeef7;
  color: #333;
  width: 100%;
  height: 100%;
}
.certification-info {
  width: 100%;
  height: 100%;
  background: #fff;
}
.certification-info-item {
  padding: 20rpx;
  display: flex;
  align-items: center;
  border-bottom: 1rpx solid #eaeef7;
}
.certification-info-item-label {
  flex: 0 150rpx;
  color: #2d2d2d;
  font-size: 32rpx;
}
.certification-info-item-input {
  flex: 1;
  font-size: 30rpx;
  color: #333;
}
.certification-info-item-placeholder {
  flex: 0 520rpx;
  font-size: 30rpx;
}
.certification-info-item-icon {
  flex: 0 40rpx;
  text-align: right;
  color: #999;
}
.certification-upload {
  background: #fff;
  padding: 20rpx 0;
}
.certification-upload-title {
  padding: 20rpx;
}
.certification-upload-title-txt {
  font-size: 32rpx;
  color: #2d2d2d;
}
.certification-upload-title-wraning {
  font-size: 24rpx;
  color: #9b9b9b;
  margin-top: 10rpx;
}
.certification-upload-box {
  display: flex;
  justify-content: space-around;
  height: 190rpx;
  width: 730rpx;
  margin: 0 10rpx;
  padding-bottom: 20rpx;
}
.certification-upload-box-add {
  background: #f4f9ff;
  text-align: center;
  line-height: 190rpx;
  color: #c5cdd8;
  font-weight: bold;
}
.certification-upload-box-add .iconfont {
  font-size: 100rpx;
}
.certification-upload-box-item {
  flex: 0 340rpx;
  height: 190rpx;
  width: 340rpx;
}
.certification-upload-box-item-img {
  width: 340rpx;
  height: 190rpx;
}
.certification-vifify {
  padding: 40rpx 0;
  text-align: center;
}
.certification-vifify-btn {
  width: 80%;
  margin-left: 10%;
  background: $fontLinear;
  font-size: 36rpx;
  border-radius: 10rpx;
  padding: 10rpx 0;
  color: #fff;
}
</style>
