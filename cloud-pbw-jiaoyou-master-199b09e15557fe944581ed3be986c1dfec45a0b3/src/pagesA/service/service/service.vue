<template>
  <view class="service">
    <view class="title_tab" @click="tabShow = true">
      <span>选择类型：</span>
      <span class="title_mar">{{ typeName }}</span>
      <span class="iconfont tab_rt">&#xe623;</span>
    </view>
    <view class="uni-form-item uni-column title_full">
      <view class="tab_lf">服务标题：</view>
      <view class="with-fun">
        <input class="uni-input" placeholder="请输入服务标题" v-model="titleVal" @input="bindClearInput" />
      </view>
    </view>
    <view class="uni-form-item uni-column title_full">
      <view class="tab_lf">服务售价：</view>
      <view class="with-fun">
        <input class="uni-input" placeholder="请输入售价金额" type="number" v-model="moneyVal" />
      </view>
      <view style="color: #5856d5; font-weight: bold">元/</view>
      <picker class="picker-item" style="line-height: normal" mode="selector" :range="unitList" range-key="serveUnit" @change="unitBtn">
        <view style="color: #fff; background: #5856d5; padding: 10rpx 0; border-radius: 10rpx; margin: 0 19px">（{{ unitText }}）</view>
      </picker>
    </view>
    <view class="uni-form-item uni-column title_full_tab">
      <view class="title">服务方式：(可多选)</view>
      <view class="week">
        <checkbox-group @change="labelListChange">
          <label :class="item.checked ? 'checkbox selectBox' : 'checkbox '" @click="labelBtn(item.name, index)" v-for="(item, index) in labelList" :key="index">
            <checkbox :value="item.name" :checked="item.checked" v-show="false" />
            {{ item.name }}
          </label>
        </checkbox-group>
      </view>
    </view>
    <view class="uni-form-item uni-column title_full_tab">
      <view class="title">服务时间：(可多选)</view>
      <view class="week">
        <checkbox-group @change="weekChange">
          <label :class="item.checked ? 'checkbox selectBox' : 'checkbox '" @click="weekBtn(item.name, index)" v-for="(item, index) in weekList" :key="index">
            <checkbox :value="item.name" :checked="item.checked" v-show="false" />
            {{ item.name }}
          </label>
        </checkbox-group>
      </view>
    </view>
    <view class="title_tab" @click="cityShow = true">
      <span>服务城市：</span>
      <span class="title_mar">{{ cityText }}</span>
      <span class="iconfont tab_rt">&#xe623;</span>
    </view>
    <!--    <view>-->
    <!--      <view class="title_tab">-->
    <!--        <view style="display: flex;flex-direction: row">-->
    <!--          <span class="tab_lf">费用包含：</span>-->
    <!--          <picker  style="line-height:normal;flex: 1" mode="selector" :range="costList" range-key="priceUnit" @change="costBtn">-->
    <!--            <span class="title_mar">请选择费用包含项</span>-->
    <!--          </picker>-->
    <!--          <span class="iconfont tab_rt">&#xe623;</span>-->
    <!--        </view>-->
    <!--        <view class="list_tab_money" v-for="(item,index) of includeList">-->
    <!--          <view class="uni-form-item uni-column title_list" >-->
    <!--            <view class="tab_lf">{{item.unitName}}：</view>-->
    <!--            <view class="with-fun">-->
    <!--              <input class="uni-input" placeholder="请输入数额"  v-model="item.price" />-->
    <!--            </view>-->
    <!--            <view class="tab_lf">（天）</view>-->
    <!--            <view class="tab_lf" style="color: #5856D5;"  @click="includeDel(index)"><span class="iconfont">&#xe639;</span>删除</view>-->
    <!--          </view>-->
    <!--        </view>-->
    <!--      </view>-->
    <!--    </view>-->
    <!--照片墙-->
    <view class="uni-form-item uni-column title_full_tab">
      <view class="title">封面图片：(上传多张自拍，更有利于老板下单呀~)</view>
      <view class="img_list">
        <ul>
          <li v-for="(item, index) in ListSrc_base" :key="index">
            <image :src="item" height="200" width="200"></image>
            <span @click="delList(index)" class="delList iconfont">&#xe639;</span>
          </li>
          <li class="list_add" @click="ListSrcBtn" v-if="ListSrc_base.length < 8">
            <span class="iconfont">&#xe65c;</span>
          </li>
        </ul>
      </view>
    </view>
    <view class="uni-form-item uni-column title_full_tab">
      <view class="title">服务内容描述：</view>
      <view class="week">
        <view class="page-body" v-if="citypickShow == false">
          <ly-markdown :showPreview="showPreview" :textareaData.sync="textareaData" :textareaHtml.sync="textareaHtml"></ly-markdown>
        </view>
        <view v-if="textareaHtml != ''" style="color: #999">
          预览服务内容：
          <br />
        </view>
        <rich-text :nodes="textareaHtml" style="font-size: 16px"></rich-text>
      </view>
    </view>
    <view class="uni-form-item uni-column title_full_tab">
      <view class="title">费用包含：(选填)</view>
      <view class="week">
        <textarea v-if="citypickShow == false" v-model="servePrice" auto-height placeholder="请输入费用不包含项" />
      </view>
    </view>
    <view class="uni-form-item uni-column title_full_tab">
      <view class="title">费用不包含：(选填)</view>
      <view class="week">
        <textarea v-if="citypickShow == false" v-model="include" auto-height placeholder="请输入费用不包含项" />
      </view>
    </view>
    <view class="uni-form-item uni-column title_full_tab">
      <view class="title">补充说明：(选填)</view>
      <view class="week">
        <textarea v-if="citypickShow == false" v-model="notInclude" auto-height placeholder="请输入补充说明" />
      </view>
    </view>
    <p class="clause">
      <checkbox-group @change="checkboxChange">
        <label>
          <checkbox :value="true" :checked="checkShow" style="transform: scale(0.7)" color="#5856D5" />
          我已阅读并同意
          <span @click.stop="tcpBtn()" style="color: #92def7">《技能服务协议》</span>
        </label>
      </checkbox-group>
    </p>
    <view class="btn_color" @click="serviceBtn()" v-preventReClick>
      <span>发布服务</span>
    </view>
    <!-- 分类 -->
    <u-popup v-model="tabShow" mode="bottom" height="80%">
      <view class="app column">
        <view class="content row">
          <scroll-view class="left-side" scroll-y>
            <view class="item center" :class="{ active: item._id === current._id }" v-for="(item, index) in tabList" v-if="index != 0" :key="item._id" @click="changeCate(item)">
              <text>{{ item.name }}</text>
            </view>
          </scroll-view>
          <scroll-view class="right-side" scroll-y>
            <image class="cate-image" :src="current.image" mode="aspectFill"></image>
            <view class="wrap">
              <view class="item column" v-for="item in current.child" :key="item._id" @click="navToList(item)">
                <image class="icon" :src="item.image" mode="aspectFill"></image>
                <text class="tit">{{ item.name }}</text>
              </view>
            </view>
          </scroll-view>
        </view>
      </view>
    </u-popup>
    <u-picker v-model="cityShow" mode="region" @confirm="onCancel"></u-picker>
  </view>
</template>

<script>
import uniDrawer from '@/components/uni-drawer.vue';
import lyMarkdown from '@/components/ly-markdown/ly-markdown.vue';
import mpvueCityPicker from '@/components/cityPicker.vue';

export default {
  components: {
    uniDrawer,
    lyMarkdown,
    mpvueCityPicker,
  },
  watch: {
    textareaData: function () {
      this.showPreview = true;
    },
  },
  data() {
    return {
      themeColor: '#007AFF',
      scrollTop: '',
      citypickShow: false,
      ListSrc: [],
      ListSrc_base: [],
      notInclude: '',
      include: '',
      textareaData: '',
      textareaHtml: '',
      showPreview: false,
      rightDrawerVisible: false,
      professionShow: false,
      professionData: '',
      professionIndex: 0,
      titleVal: '',
      showClearIcon: false,
      moneyVal: '',
      moneyValIcon: false,
      labelName: '',
      labelDataList: '',
      labelList: [
        {
          name: '线上服务',
          value: '0',
          checked: false,
        },
        {
          name: '线下服务',
          value: '1',
          checked: false,
        },
        {
          name: '电话咨询',
          value: '2',
          checked: false,
        },
        {
          name: 'Ta来找我',
          value: '3',
          checked: false,
        },
        {
          name: '我去找Ta',
          value: '4',
          checked: false,
        },
      ],
      weekName: '',
      weekDataList: '',
      weekList: [
        {
          name: '周一',
          value: '1',
          checked: false,
        },
        {
          name: '周二',
          value: '2',
          checked: false,
        },
        {
          name: '周三',
          value: '3',
          checked: false,
        },
        {
          name: '周四',
          value: '4',
          checked: false,
        },
        {
          name: '周五',
          value: '5',
          checked: false,
        },
        {
          name: '周六',
          value: '6',
          checked: false,
        },
        {
          name: '周日',
          value: '7',
          checked: false,
        },
      ],
      typeCode: '',
      typeName: '请选择服务类型',
      unitList: [
        { code: 1, serveUnit: '天' },
        { code: 2, serveUnit: '小时' },
        { code: 3, serveUnit: '分钟' },
        { code: 4, serveUnit: '件' },
        { code: 5, serveUnit: '次' },
        { code: 6, serveUnit: '人' },
        { code: 7, serveUnit: '公里' },
        { code: 8, serveUnit: '张' },
        { code: 9, serveUnit: '场' },
        { code: 10, serveUnit: '副' },
        { code: 11, serveUnit: '单程' },
        { code: 12, serveUnit: '双程' },
        { code: 13, serveUnit: '详细咨询' },
        { code: 14, serveUnit: '免费' },
        { code: 15, serveUnit: '赠送' },
        { code: 16, serveUnit: '种' },
        { code: 17, serveUnit: '局' },
        { code: 18, serveUnit: '包天' },
        { code: 19, serveUnit: '包月' },
        { code: 20, serveUnit: '包年' },
        { code: 21, serveUnit: '买断' },
      ],
      unitVal: '',
      unitText: '请选择单位',
      citydataList: {
        province: [],
        city: [],
        area: [],
      },
      cityPickerValueDefault: [0, 0, 1],
      cityText: '请选择服务城市地区',
      cityVal: '',
      cityShow: false,
      cityAll: {},
      costList: '',
      costVal: '',
      costText: '请选择费用包含项',
      costData: [],
      includeList: [],
      posterSrc: '',
      posterSrc_base: '',
      servePrice: '',

      checkShow: false,
      tabList: [],
      current: {},
      tabShow: false,
      first_cate_id: '',
    };
  },
  methods: {
    tcpBtn() {
      this.navTo(
        '/pagesA/public/article?param=' +
          JSON.stringify({
            module: 'article',
            operation: 'getAgreement',
            data: { type: 1 },
          })
      );
    },
    changeCate(item) {
      this.current = item;
    },
    navToList(item) {
      //console.log(item)
      this.typeCode = item._id;
      this.typeName = item.name;
      this.first_cate_id = item.parent_id;
      this.tabShow = false;
    },
    async loadData() {
      //获取分类 缓存1小时
      const res = await this.$request(
        'product',
        'getCategory',
        {},
        {
          cache: 60 * 60 * 0,
        }
      );
      this.current = res;
      this.tabList = res;
    },

    delList(index) {
      this.ListSrc.splice(index, 1);
      this.ListSrc_base.splice(index, 1);
    },
    async ListSrcBtn() {
      let file = await this.cloudUploadFile(8);
      this.ListSrc = this.ListSrc.concat(file.fileUrl);
      this.ListSrc_base = this.ListSrc_base.concat(file.fileUrl);
    },
    onCancel(e) {
      this.cityAll = e;
      this.cityText = e.province.label + e.city.label + e.area.label;
    },
    showMulLinkageThreePicker() {
      // 获取城市 公共数据
      this.$refs.mpvueCityPicker.show();
      this.citypickShow = true;
    },
    costBtn(evt) {
      let text = {
        unitName: this.costList[evt.detail.value].priceUnit,
        price: '',
      };
      this.includeList.push(text);
    },
    unitBtn(evt) {
      this.unitVal = this.unitList[evt.detail.value].code;
      this.unitText = this.unitList[evt.detail.value].serveUnit;
    },

    serviceBtn() {
      if (this.typeCode == '') {
        uni.showToast({
          title: '请选择服务类型',
          icon: 'none',
          duration: 3000,
        });
        return;
      }
      if (this.titleVal == '') {
        uni.showToast({
          title: '请输入服务标题',
          icon: 'none',
          duration: 3000,
        });
        return;
      }
      if (this.moneyVal == '') {
        uni.showToast({
          title: '请输入服务售价',
          icon: 'none',
          duration: 3000,
        });
        return;
      }
      if (this.unitVal == '') {
        uni.showToast({
          title: '请选择售价单位',
          icon: 'none',
          duration: 3000,
        });
        return;
      }
      if (this.labelDataList.length <= 0) {
        uni.showToast({
          title: '请选择服务方式',
          icon: 'none',
          duration: 3000,
        });
        return;
      }
      if (this.weekDataList.length <= 0) {
        uni.showToast({
          title: '请选择服务时间',
          icon: 'none',
          duration: 3000,
        });
        return;
      }
      if (JSON.stringify(this.cityAll) == '{}') {
        uni.showToast({
          title: '请选择服务城市',
          icon: 'none',
          duration: 3000,
        });
        return;
      }
      if (this.ListSrc == '') {
        uni.showToast({
          title: '请上传封面图片',
          icon: 'none',
          duration: 3000,
        });
        return;
      }
      if (this.textareaHtml == '' || this.textareaHtml.length < 20) {
        uni.showToast({
          title: '请输入服务内容描述（最少20个字）',
          icon: 'none',
          duration: 3000,
        });
        return;
      }
      if (!this.checkShow) {
        uni.showToast({
          title: '请先阅读并同意《技能服务协议》',
          icon: 'none',
          duration: 3000,
        });
        return;
      }
      uni.showLoading({
        title: '发布中...',
        mask: true,
      });
      this.$request('service', 'addService', {
        typeId: this.typeCode,
        typeText: this.typeName,
        first_cate_id: this.first_cate_id,
        cate_id: this.typeCode,
        cate_name: this.typeName,
        title: this.titleVal,
        content: this.textareaHtml,
        price: Number(this.moneyVal).toFixed(2),
        priceType: this.unitVal,
        mode: this.labelDataList,
        serviceTime: this.weekDataList,
        thumb: this.ListSrc[0],
        images: this.ListSrc,
        cityAll: this.cityAll,
        priceTypeText: this.unitText,
        notContain: this.include,
        supplement: this.notInclude,
        contain: this.servePrice,
      }).then(res => {
        uni.hideLoading();
        if (res.status == 1) {
          uni.redirectTo({
            url: '/pagesA/service/serviceList/serviceList?code=' + uni.getStorageSync('uniIdToken'),
          });
          uni.showToast({
            title: '发布成功',
            icon: 'none',
            duration: 3000,
          });
        } else {
          // 提示
          uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 3000,
          });
        }
      });
    },
    weekBtn(name, index) {
      ////console.log(name,index,"nameindex")
      this.weekName = name;
      if (this.weekDataList.join(',').indexOf(name) > -1) {
        this.weekList[index].checked = true;
      } else {
        this.weekList[index].checked = false;
      }
    },
    weekChange: function (e) {
      this.weekDataList = e.detail.value;
      ////console.log(e)
      ////console.log('checkbox发生change事件，携带value值为：' + e.detail.value)
      ////console.log(this.weekDataList,"labelDataList")
    },
    labelBtn(name, index) {
      ////console.log(name,index,"nameindex")
      this.labelName = name;
      if (this.labelDataList.join(',').indexOf(name) > -1) {
        this.labelList[index].checked = true;
      } else {
        this.labelList[index].checked = false;
      }
    },
    checkboxChange(e) {
      if (e.detail.value.length > 0) {
        this.checkShow = true;
      } else {
        this.checkShow = false;
      }
    },
    labelListChange: function (e) {
      this.labelDataList = e.detail.value;
    },
    bindClearInput: function (e) {
      this.titleVal = e.target.value;
      if (e.target.value.length > 0) {
        this.showClearIcon = true;
      } else {
        this.showClearIcon = false;
      }
    },
    clearIcon: function () {
      this.titleVal = '';
      this.showClearIcon = false;
    },
    closeRightDrawer() {
      this.rightDrawerVisible = false;
    },
    proBtn(title) {
      this.typeCode = title.code;
      this.typeName = title.serveName;
      this.rightDrawerVisible = false;
    },
    professionBtn(index) {
      this.professionIndex = index;
    },
  },
  onShow() {
    // 获取分类
    this.loadData();
  },
  updated() {},
};
</script>

<style lang="scss" scoped>
.row {
  /* #ifndef APP-PLUS-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  align-items: center;
}
.app {
  height: 100%;
}
.content {
  flex: 1;
  padding-top: 12rpx;
  overflow: hidden;
}
.left-side {
  flex-shrink: 0;
  width: 180rpx;
  height: 100%;
  overflow-y: hidden;
  background-color: #f2f2f2;
  .item {
    height: 90rpx;
    font-size: 26rpx;
    color: #555;
  }
  .active {
    font-size: 28rpx;
    color: $cor;
    font-weight: 700;
    background-color: #fff;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 30rpx;
      width: 6rpx;
      height: 30rpx;
      background-color: $cor;
      border-radius: 0 4rpx 4rpx 0;
    }
  }
}
.right-side {
  flex: 1;
  height: 100%;
  .cate-image {
    width: calc(100% - 40rpx);
    height: 200rpx;
    margin: 0 20rpx;
    border-radius: 8rpx;
  }
  .wrap {
    display: flex;
    flex-wrap: wrap;
    padding: 0 20rpx 20rpx;
  }
  .item {
    flex-shrink: 0;
    justify-content: flex-start;
    align-items: center;
    width: 30%;
    padding: 30rpx 0 0;
    &:nth-child(3n-1) {
      width: 40%;
    }
  }
  .icon {
    width: 108rpx;
    height: 108rpx;
    margin-bottom: 16rpx;
  }
  .tit {
    width: 140rpx;
    font-size: 24rpx;
    color: #333;
    text-align: center;
    line-height: 1.4;
  }
}
.service {
  background: #f5f5f5;
  padding: 20rpx;
  overflow-x: hidden;
}
.uni-form-item {
  background: #fff;
}
.delList {
  position: absolute;
  top: -10rpx;
  right: 0rpx;
  color: #eb5248;
  font-weight: bold;
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
.img_list {
  padding: 0 20rpx;
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
.tab_label {
  color: #fff;
  background-color: #eb5248;
}
.label_content li {
  padding: 30rpx 0;
  border-bottom: 1px solid #c6c6c6;
}
.label_content > div:first-child {
  background: #fff !important;
}
.label_content > div {
  width: 260rpx;
  background: #ddd;
  float: left;
  border-right: 1px solid #ddd;
  text-align: center;
  font-size: 30rpx;
  overflow-y: scroll;
}
.label_content {
  width: 70vw;
  height: 100%;
  background: #fff;
  position: relative;
  z-index: 99999;
}
.btn_color {
  text-align: center;
}
.btn_color span {
  width: 50%;
  display: inline-block;
  background: $fontLinear;
  border-radius: 15px;
  padding: 5px 15px;
  margin: 30px auto;
  color: #fff;
}
.icon_jia {
  width: 80%;
  height: 150px;
  border-radius: 2px;
  background: #ddd;
  text-align: center;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon_jia span {
  display: inline-block;
  font-size: 40px;
}
.img_title image {
  width: 80%;
  height: 150px;
  border-radius: 2px;
}
.img_title {
  text-align: center;
}
textarea {
  border: 1px solid #ddd;
  border-radius: 2px;
  width: 100%;
  min-height: 200rpx;
  padding: 20rpx;
  font-size: 24rpx;
  box-sizing: border-box;
  z-index: 1;
}
.title_full_tab {
  margin-bottom: 20rpx;
}
.selectBox {
  background: #eb5248 !important;
  color: #fff !important;
  border: 1px solid #eb5248 !important;
}
.checkbox {
  padding: 8rpx 18rpx;
  border: 2rpx solid #ddd;
  margin: 0 4rpx;
  border-radius: 12rpx;
  color: #000;
  padding-right: none !important;
}
.week {
  padding: 20rpx 10rpx;
  font-size: 20rpx;
}
.title_mar {
  padding-left: 18px;
  color: #666;
}
.title_tab {
  padding: 20px 10px;
  margin-bottom: 20rpx;
  background: #fff;
}
.tab_rt {
  float: right;
}
.title_full {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-bottom: 20rpx;
  box-sizing: border-box;
  background: #fff;
}
.title_list {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
}
.tab_lf {
  width: 150rpx;
}
.with-fun {
  flex: 1;
}
.clause {
  color: #999;
  font-size: 24upx;
  width: 99%;
  text-align: center;
  padding: 20upx 0;
}
.clause span {
  color: #92def7;
}
</style>
