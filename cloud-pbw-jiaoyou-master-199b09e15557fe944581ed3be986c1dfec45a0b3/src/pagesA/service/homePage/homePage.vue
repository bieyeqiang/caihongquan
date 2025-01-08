<template>
  <view class="phCenten">
    <view class="ph-myphoto" v-if="UserData && UserData.user">
      <swiper class="ph-myphoto-swiper" :autoplay="true" v-bind:style="[{ width: '100%', height: '750rpx' }]" @change="myphotoSwiperChange">
        <swiper-item v-for="(img, index) of UserData.photoList" :key="index">
          <image :src="img.imgPath" class="slide-image zwyHeight" mode="aspectFill" v-bind:style="[{ width: '100%', height: '750rpx' }]" @click.stop="previewImage(img.imgPath)" />
        </swiper-item>
      </swiper>
      <view class="ph-myphoto-text">
        {{ UserData.user.signature ? '✎ ' + UserData.user.signature : '' }}
      </view>
      <view class="ph-myphoto-dots">
        <text v-for="(img, current) of UserData.photoList" :key="current" class="ph-myphoto-dot" v-bind:class="[current === myphotoCurrentSwiper ? 'ph-myphoto-active' : '']"></text>
      </view>
    </view>

    <view style="height: 550rpx; pointer-events: none" v-if="UserData && UserData.user"></view>
    <view class="ph-basicInfo" v-if="UserData && UserData.user">
      <view class="ph-basicInfo-box1">
        <view class="online" v-if="timeLog(UserData.user.last_login_date ? UserData.user.last_login_date : UserData.user.register_date) != ''">
          <text></text>
          {{ timeLog(UserData.user.last_login_date ? UserData.user.last_login_date : UserData.user.register_date) }}
        </view>
        <image :src="UserData.user.avatar" class="ph-basicInfo-img" />
        <view class="ph-basicInfo-info">
          <view class="ph-basicInfo-info-item1">
            <text class="ph-basicInfo-info-name" v-if="UserData">{{ UserData.user.nickname }}</text>
            <text class="ph-basicInfo-info-icon ph-basicInfo-info-sex" v-if="UserData.user.gender == 2">
              <text class="iconfont">&#xe640;</text>
              {{ UserData.user.birthdayText || '' }}
            </text>
            <text class="ph-basicInfo-info-icon ph-basicInfo-info-sex_name" v-if="UserData.user.gender == 1">
              <text class="iconfont">&#xe638;</text>
              {{ UserData.user.birthdayText || '' }}
            </text>
            <!-- 举报-拉黑 -->
            <text class="dynNearInfocard-header-item-focus-btn" style="float: right" @click.stop="nameSel(UserData.user._id)"><text class="iconfont">&#xe6be;</text></text>
            <!-- 关注 -->
            <text class="dynNearInfocard-header-item-focus-btn" style="float: right" v-if="attention == false" @click.stop="attentionBtn(UserData.user._id)">
              <text class="iconfont">&#xe6bd;</text>
            </text>
            <text class="dynNearInfocard-header-item-focus-btn" style="float: right" v-if="attention" @click.stop="attentionBtn(UserData.user._id)">
              <text class="iconfont">&#xe6bd;</text>
            </text>
            <u-picker :show="fansShow" :columns="columns" keyName="label" closeOnClickOverlay @close="closeFans" @confirm="confirm($event, UserData.user._id)" @cancel="fansShow = false"></u-picker>
          </view>
          <view class="ph-basicInfo-info-item2">
            <text class="ph-basicInfo-info-addr" v-if="UserData.user.constellation">{{ UserData.user.constellation || '未描述' }}</text>
            <text class="ph-basicInfo-info-addr" v-if="UserData.user.emotion">{{ UserData.user.emotion || '情感保密' }}</text>
            <text class="ph-basicInfo-info-addr" v-if="!UserData.user.emotion" style="margin-left: 30rpx">情感保密</text>
          </view>
          <view v-if="UserData.user.homeCity" class="citylFont">
            {{ UserData.user.homeCity.province.label + '-' + UserData.user.homeCity.city.label + '-' + UserData.user.homeCity.area.label }}
          </view>
          <view v-if="!UserData.user.homeCity" class="citylFont">来自快乐星球</view>
        </view>
      </view>
      <view class="ph-basicInfo-box2">
        <text class="ph-basicInfo-box2-icon" v-for="item of UserData.user.label" :key="item"><text class="globalFontColor iconfont">&#xe604;</text>{{ item }}</text>
      </view>

      <view class="ph-basicInfo-box2" v-if="UserData.user && UserData.user.language"> 语言：{{ UserData.user.language.length == 0 ? '中文普通话' : UserData.user.language.join(',') }} </view>
      <view class="ph-basicInfo-box3" v-if="UserData && UserData.proofs">
        <text
          v-if="UserData.proofs.proofImgPath != null && UserData.proofs.proofImgPath != ''"
          :class="UserData.proofs.proofImgPath != null && UserData.proofs.proofImgPath != '' ? 'ph-basicInfo-box3-icon' : 'ph-basicInfo-box3-icon selIcon'"
        >
          <text class="iconfont">&#xe692;</text>
          {{ UserData.proofs.proofImgPath != null && UserData.proofs.proofImgPath != '' ? '身份认证' : '身份认证' }}
        </text>
        <text
          v-if="UserData.proofs.userImgPath != null && UserData.proofs.userImgPath != ''"
          :class="UserData.proofs.userImgPath != null && UserData.proofs.userImgPath != '' ? 'ph-basicInfo-box3-icon' : 'ph-basicInfo-box3-icon selIcon'"
        >
          <text class="iconfont">&#xe6fa;</text>
          {{ UserData.proofs.userImgPath != null && UserData.proofs.userImgPath != '' ? '形象认证' : '形象认证' }}
        </text>
        <text
          v-if="UserData.proofs.guideImgPath != null && UserData.proofs.guideImgPath != ''"
          :class="UserData.proofs.guideImgPath != null && UserData.proofs.guideImgPath != '' ? 'ph-basicInfo-box3-icon' : 'ph-basicInfo-box3-icon selIcon'"
        >
          <text class="iconfont">&#xe693;</text>
          {{ UserData.proofs.guideImgPath != null && UserData.proofs.guideImgPath != '' ? '导游证' : '导游证' }}
        </text>
        <text
          :class="UserData.proofs.otherImgPath != null ? 'ph-basicInfo-box3-icon' : 'ph-basicInfo-box3-icon selIcon'"
          v-if="UserData.proofs.otherImgPath != null && UserData.proofs.otherImgPath != ''"
        >
          <text class="iconfont">&#xe694;</text>
          {{ UserData.proofs.otherImgPath != null && UserData.proofs.otherImgPath != '' ? '其它证' : '' }}
        </text>
      </view>
    </view>
    <wrap :height="16"></wrap>
    <view class="ph-infoService" v-if="UserData && UserData.user">
      <view class="ph-infoService-title" v-if="UserServes && UserServes.length > 0">
        <scroll-view id="tab-bar" class="uni-swiper-tab" style="border: none" scroll-x :scroll-left="scrollLeft">
          <text
            v-for="(tab, index) in tabBars"
            :key="tab.id"
            class="ph-infoService-title-item"
            v-bind:class="[tabIndex === index ? 'ph-infoService-title-active' : '']"
            :id="tab.id"
            :data-current="index"
            @tap="tapTab"
          >
            {{ tab.name }}
          </text>
        </scroll-view>
      </view>
      <view class="allorders-content" :style="'height:' + (ListHei + 200) + 'px'">
        <swiper :current="tabIndex" style="height: 100%" class="swiper-box" duration="300" @change="changeTab">
          <swiper-item class="swiper-box" v-for="(tab, key) in newsitems" :key="key" v-if="(UserServes && UserServes.length > 0) || key == 0">
            <!-- 资料 -->
            <view class="ph-infoService-info" v-show="infoService === 'info' && tabIndex == 0">
              <view>
                <!--他的介绍-->
                <view class="ph-infoService-info-title">
                  <text class="globalFontColor iconfont">&#xe660;</text>
                  Ta的介绍
                </view>
                <view class="ph-infoService-info-contnent">
                  <view class="ph-infoService-info-contnent-text">
                    {{ UserData.user.introduce || '~我的秘密很多~' }}
                  </view>
                </view>
                <view class="ph-infoService-info-title">
                  <text class="globalFontColor iconfont">&#xe660;</text>
                  Ta的故事
                </view>
                <view class="ph-infoService-info-contnent">
                  <view class="ph-infoService-info-contnent-text">
                    {{ UserData.user.story || '~故事很多，你想听吗？~' }}
                  </view>
                </view>
                <view class="ph-infoService-info-title" v-if="UserData.nearbyList && UserData.nearbyList.length != 0">
                  <text class="globalFontColor iconfont">&#xe660;</text>
                  Ta的显摆
                  <text style="float: right; font-size: 13px; color: #9b9b9b" @click="nearbyList()">全部>></text>
                </view>
                <view class="ph-infoService-info-contnent" v-if="UserData.nearbyList && UserData.nearbyList.length != 0">
                  <scroll-view scroll-x class="ph-infoService-info-contnent-scroll">
                    <image
                      mode="aspectFill"
                      class="lookImg"
                      v-for="(item, index) in UserData.nearbyList"
                      :key="index"
                      :src="item.dynamicImg[0] || UserData.user.avatar"
                      v-if="index < 3"
                      @click="nearbyInfo(item._id)"
                    />
                  </scroll-view>
                </view>

                <!--相册-->
                <view class="ph-infoService-info-title">
                  <text class="globalFontColor iconfont">&#xe660;</text>
                  Ta的相册
                  <text style="float: right; font-size: 13px; color: #9b9b9b" @click="photoList(UserData.user._id)">全部>></text>
                </view>
                <view class="ph-infoService-info-contnent" v-if="UserData.photoList">
                  <scroll-view scroll-y class="ph-infoService-info-contnent-scroll">
                    <view class="lookImg zwyHeight" v-for="(item, index) of UserData.photoList" :key="index">
                      <image mode="aspectFill" :src="item.imgPath" :class="item.secret ? 'lookImg look' : 'lookImg'" v-if="index < 9" @click="photoBtnList(item)" />
                      <view v-if="item.secret" class="title4" @click="lookBtn(item.imgPath)"><text>阅后即焚</text></view>
                    </view>
                  </scroll-view>
                </view>
                <view class="ph-infoService-info-contnent" v-if="UserData.photoList && UserData.photoList.length == 0">
                  <not-item :text="'暂未上传照片'"></not-item>
                </view>
                <!-- 蹲单-->
                <view class="ph-infoService-info-title" @click="toMoreHelp" v-if="helpList && helpList.data && helpList.data.length != 0">
                  <text class="globalFontColor iconfont">&#xe660;</text>
                  Ta的蹲单
                  <text class="ph-infoService-info-title-more iconfont icon-you"></text>
                </view>
                <view class="ph-infoService-info-contnent" v-if="helpList && helpList.data && helpList.data.length != 0">
                  <view
                    class="ph-infoService-info-contnent-text"
                    style="margin: 10rpx 0; word-break: break-all; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden"
                    v-for="(item, index) of helpList.data"
                    :key="index"
                    v-if="index <= 5"
                    @click="nearbyBtn(item.code)"
                  >
                    <text class="ph-infoService-info-contnent-helpIcon iconfont">&#xe631;</text>
                    {{ item.dynamicContext }}
                  </view>
                </view>
                <!-- <view class="ph-infoService-info-contnent" v-if="helpList.data.length == 0">
			                            <not-item :text="'暂无蹲单'"></not-item>
			                          </view> -->
                <!--          偶遇-->
                <view class="ph-infoService-info-title">
                  <text class="globalFontColor iconfont">&#xe660;</text>
                  Ta的偶遇
                </view>
                <view class="ph-infoService-info-contnent" v-if="DynamicList && DynamicList.data.length != 0">
                  <view class="ph-infoService-info-contnent-meet" v-for="(item, index) of DynamicList.data" :key="index" v-if="DynamicList.data && index <= 2" @click="nearbyBtn(item.code)">
                    <text class="ph-infoService-info-contnent-meet-icon iconfont">&#xe650;</text>
                    <view class="ph-infoService-info-contnent-meet-item">
                      <view class="ph-infoService-info-contnent-meet-address">
                        偶遇：{{ item.startCity }}
                        <text class="iconfont">&#xe608;</text>
                        {{ item.endCity }}
                      </view>
                      <view class="ph-infoService-info-contnent-meet-time">
                        {{ GetTime(item.dynamicStart) }}出发 -
                        {{ GetTime(item.dynamicEnd) }}
                      </view>
                    </view>
                  </view>
                  <!-- <view class="ph-infoService-info-contnent-meet" v-if="DynamicList && DynamicList.data.length == 0">
			                  <text class="ph-infoService-info-contnent-meet-icon iconfont">&#xe650;</text>
			                  <view class="ph-infoService-info-contnent-meet-item">
			                    <view class="ph-infoService-info-contnent-meet-address">暂未发布偶遇</view>
			                    <view class="ph-infoService-info-contnent-meet-time">......</view>
			                  </view>
			                </view> -->
                </view>
                <view class="ph-infoService-info-contnent">
                  <not-item :text="'暂无偶遇'"></not-item>
                </view>
                <!--          代言旅行-->
                <view class="ph-infoService-info-title">
                  <text class="globalFontColor iconfont">&#xe660;</text>
                  Ta的旅行
                </view>
                <view class="ph-infoService-info-contnent" v-if="TravelList && TravelList.length != 0">
                  <view class="Travel_item" v-for="(item, index) of TravelList" :key="index" @click="TravelBtn(item.code)">
                    <text class="ph-infoService-info-contnent-meet-icon iconfont">&#xe691;</text>
                    <view class="ph-infoService-info-contnent-meet-item">
                      <view class="ph-infoService-info-contnent-meet-address"> 愿望：{{ item.title }} </view>
                      <progress
                        :percent="item.travelMoney > item.travelMappingMoney ? Math.floor((item.travelMappingMoney / item.travelMoney) * 100) : 100"
                        activeColor="#fa436a"
                        active
                        stroke-width="6"
                      />
                      <view>
                        <text class="explore-content-item-contnent-3-content-item-price-time">已筹{{ item.travelMappingMoney }}元 / 愿望{{ item.travelMoney }}元</text>
                      </view>
                      <view>
                        <view style="text-align: right; color: #fff">
                          已完成{{ item.travelMoney > item.travelMappingMoney ? Math.floor((item.travelMappingMoney / item.travelMoney) * 100) : 100 }}%
                        </view>
                      </view>
                    </view>
                  </view>
                  <!-- <view class="ph-infoService-info-contnent-meet" v-if="TravelList && TravelList.length == 0">
			                  <text class="ph-infoService-info-contnent-meet-icon iconfont">&#xe650;</text>
			                  <view class="ph-infoService-info-contnent-meet-item">
			                    <view class="ph-infoService-info-contnent-meet-address">暂未发布代言旅行</view>
			                    <view class="ph-infoService-info-contnent-meet-time">......</view>
			                  </view>
			                </view> -->
                </view>
                <view class="ph-infoService-info-contnent" v-if="TravelList && TravelList.length == 0">
                  <not-item :text="'暂无旅行'"></not-item>
                </view>

                <view class="ph-infoService-info-title">
                  <text class="globalFontColor iconfont">&#xe660;</text>
                  个人信息
                </view>
                <view class="ph-infoService-info-contnent">
                  <view class="ph-infoService-info-contnent-text-item">
                    <text class="ph-infoService-info-contnent-text-label">ID账号</text>
                    <text class="floatR">{{ UserData.user.uid }}</text>
                  </view>
                  <view class="ph-infoService-info-contnent-text-item">
                    <text class="ph-infoService-info-contnent-text-label">情感状态</text>
                    <text class="floatR">{{ UserData.user.emotion == null ? '保密' : UserData.user.emotion }}</text>
                  </view>
                  <view class="ph-infoService-info-contnent-text-item">
                    <text class="ph-infoService-info-contnent-text-label">星座</text>
                    <text class="floatR">{{ UserData.user.constellation == null ? '保密' : UserData.user.constellation }}</text>
                  </view>
                  <view class="ph-infoService-info-contnent-text-item">
                    <text class="ph-infoService-info-contnent-text-label">职业</text>
                    <text class="floatR">{{ UserData.user.job || '保密' }}</text>
                  </view>
                  <view class="ph-infoService-info-contnent-text-item">
                    <text class="ph-infoService-info-contnent-text-label">微信号</text>
                    <text class="floatR">{{ UserData.user.openWechat ? UserData.user.wechat : '保密' }}</text>
                  </view>
                  <view class="ph-infoService-info-contnent-text-item">
                    <text class="ph-infoService-info-contnent-text-label">QQ号</text>
                    <text class="floatR">{{ UserData.user.openQQ ? UserData.user.qq : '保密' }}</text>
                  </view>
                  <view class="ph-infoService-info-contnent-text-item">
                    <text class="ph-infoService-info-contnent-text-label">微博</text>
                    <text class="floatR">{{ UserData.user.openWeibo ? UserData.user.weibo : '保密' }}</text>
                  </view>
                </view>
                <!-- 广告 -->
                <!-- #ifdef MP-WEIXIN || APP-PLUS -->
                <!-- <ad
                  adpid="1681245700"
                  unit-id="adunit-695d16bef1d1ebaf"
                  ad-intervals="30"
                ></ad> -->
                <!-- #endif -->
              </view>
            </view>
            <!-- 技能 -->
            <!--服务-->
            <view class="ph-infoService-info-jineng">
              <view style="padding: 10px" class="ph-infoService-info-title" v-if="UserServes && UserServes.length > 0">
                <text class="globalFontColor iconfont">&#xe660;</text>
                Ta提供的技能服务
                <text style="float: right; font-size: 13px; color: #9b9b9b"></text>
              </view>
              <view v-for="(item, index) of UserServes" :key="index" v-if="UserServes && UserServes.length > 0">
                <view class="ph-infoService-service-item" @click="serviceBtn(item.code)">
                  <image mode="aspectFill" :src="item.serveCoverImg.indexOf(',') > -1 ? item.serveCoverImg.split(',')[0] : item.serveCoverImg" class="ph-infoService-service-item-image" />
                  <text class="strCor">{{ item.pushTypeStr }}</text>
                  <view class="service-item">
                    <view class="ph-infoService-service-item-text"> 📢{{ item.title }} </view>
                    <view class="ph-infoService-service-item-bottom">
                      <text class="ph-infoService-service-item-service">{{ item.pushTypeStr }}</text>
                      <view class="ph-infoService-service-item-price">
                        ￥{{ item.pushPrice }}元
                        <text class="ph-infoService-service-item-price-time">/{{ item.servePriceName }}</text>
                      </view>
                    </view>
                  </view>
                </view>
                <wrap :height="3"></wrap>
              </view>
              <!-- <view class="ph-infoService-info-contnent" v-if=" UserServes && UserServes.length == 0">
			            <not-item :text="'暂未发布服务'"></not-item>
			          </view> -->
              <wrap :height="16"></wrap>
              <view class="evaluation">
                <!--          评价-->
                <view class="ph-infoService-info-title" v-if="UserServes && UserServes.length > 0">
                  <text class="globalFontColor iconfont">&#xe660;</text>
                  Ta的评价
                </view>
                <view class="ph-infoService-info-contnent" v-if="UserServes && UserServes.length > 0 && infoData.data.length > 0">
                  <evaluate v-for="(item, index) of infoData.data" :key="index" v-if="index < 6" :showComments="false" :showStar="true" :showTime="false" :nameData="item"></evaluate>
                </view>
                <view class="ph-infoService-info-contnent" v-if="UserServes && UserServes.length > 0 && infoData.data.length == 0">
                  <not-item :text="'暂无评价'"></not-item>
                </view>
              </view>
              <!--右侧服务-->
              <!-- <view class="ph-infoService-service" v-if="infoService === 'service' ">
			            <view v-for="(item,index) of UserServes.serves" :key="index">
			              <view class="ph-infoService-service-item" @click="serviceBtn(item.code)">
			                <image :src="item.serveCoverImg" class="ph-infoService-service-item-image" />
			                <p class="ph-infoService-service-item-text">📢{{item.title}}</p>
			                <view class="ph-infoService-service-item-bottom">
			                  <text class="ph-infoService-service-item-service">{{item.pushTypeStr}}</text>
			                  <p class="ph-infoService-service-item-price">
			                    ￥{{item.pushPrice}}元<text class="ph-infoService-service-item-price-time">/{{item.servePriceName}}</text>
			                  </p>
			                </view>
			              </view>
			              <wrap :height="3"></wrap>
			            </view>
			          </view>
			          <view class="ph-infoService-info-contnent" v-if="infoService === 'service'  && UserServes && UserServes.serves.length == 0 ">
			            <not-item :text="'未发布服务'"></not-item>
			          </view> -->
            </view>
          </swiper-item>
        </swiper>
      </view>
      <view style="height: 150rpx"></view>
      <view v-if="!openExamineWx">
        <wrap :height="16"></wrap>
        <view class="ph-infoService-info-btns">
          <!-- #ifdef APP-PLUS -->
          <!-- <view class="ph-infoService-info-btns-item">
			        <text class="ph-infoService-info-btn globalCololr" @click="shareShow = !shareShow">分享名片</text>
			      </view> -->
          <!-- #endif -->
          <!-- #ifdef MP-WEIXIN -->
          <!-- <button class="ph-infoService-info-btns-item globalCololr" @onShareAppMessage="onShareAppMessage" open-type="share">分享名片</button> -->
          <!-- #endif -->
          <view class="ph-infoService-info-btns-item" @click="openbtn()" v-if="!openExamineWx">
            <text class="ph-infoService-info-btn globalCololr">
              <text class="iconfont">&#xe72f;</text>
              房间
            </text>
          </view>
          <view class="ph-infoService-info-btns-item" @click="attentionBtn(UserData.user._id)">
            <text class="ph-infoService-info-btn globalG">
              <text class="iconfont">&#xe66b;</text>
              关注
            </text>
          </view>
          <view class="ph-infoService-info-btns-item">
            <text class="ph-infoService-info-btn globalDa" @click="msgSo">
              <text class="iconfont">&#xe802;</text>
              私聊Ta
            </text>
          </view>
        </view>
      </view>
    </view>
    <!--分享-->
    <share :shareData="shareData" v-if="shareData.Name != ''" :shareShow="shareShow"></share>
    <jw-loading v-if="!UserData" :type="2"></jw-loading>
    <previewImage ref="previewImage" :secret="secret" :imgs="lookimgs" @longPress="longPress"></previewImage>
  </view>
</template>

<script>
import share from '@/components/share'
import star from '@/components/star'
import evaluate from '@/components/evaluate'
import wrap from '@/components/wrap'
import notItem from '@/components/notItem'
import previewImage from '@/components/kxj-previewImage/kxj-previewImage.vue'
import { mapActions } from 'vuex'

export default {
  components: {
    star,
    evaluate,
    wrap,
    notItem,
    share,
    previewImage
  },
  data() {
    return {
      fansShow: false,
      columns: [
        [
          {
            label: '普通关注',
            index: 0
          },
          {
            label: '悄悄关注',
            index: 1
          },
          {
            label: '特别关注',
            index: 2
          }
        ]
      ],
      lookimgs: [],
      scrollLeft: '',
      tabBars: [
        {
          name: '个人资料',
          id: 'ziliao'
        },
        {
          name: '技能服务',
          id: 'jineng'
        }
      ],
      newsitems: [],
      tabIndex: 0,
      shareShow: false,
      shareData: {
        Name: '',
        NameImg: '',
        Title: '',
        Text: '',
        TitleImg: '',
        Money: '',
        Type: '',
        Path: '',
        Url: '',
        nameData: '',
        attention: false
      },
      // #ifdef APP-PLUS
      myProfileX: 1,
      // #endif
      //#ifdef MP-WEIXIN
      myProfileX: 0,
      // #endif
      windowWidth: 0,
      myphotoCurrentSwiper: 0,
      infoService: 'info',
      imgList: [],
      UserData: '',
      labelData: '',
      UserServes: '',
      photoBook: [],
      photoBookIndex: '',
      userCode: '',
      attention: false,
      DynamicList: '',
      helpList: '',
      dynamic: [],
      TravelList: [],
      infoData: '',
      ListHei: '',
      online: false,
      imUser: '',
      optionData: '',
      secret: true
    }
  },
  computed: {
    openExamineWx() {
      return this.$store.state.openExamineWx
    }
  },
  methods: {
    ...mapActions({
      getConversation: 'uniIm/getConversation'
    }),
    async history(e) {
      const todayStartTime = new Date(new Date().setHours(0, 0, 0, 0)).getTime()
      const todayEndTime = new Date(new Date().setHours(23, 59, 59, 999)).getTime()
      const res = await this.$request('look', 'addLook', {
        fansId: this.UserData.user._id,
        startTime: todayStartTime,
        endTime: todayEndTime
      })
    },
    timeLog(time) {
      if (!time) return ''
      var publishTime = Date.parse(new Date(time)) / 1000
      var d_seconds,
        d_minutes,
        d_hours,
        d_days,
        timeNow = parseInt(new Date().getTime() / 1000),
        d,
        date = new Date(time),
        Y = date.getFullYear(),
        M = date.getMonth() + 1,
        D = date.getDate(),
        H = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds()

      //小于10的在前面补0
      if (M < 10) {
        M = '0' + M
      }
      if (D < 10) {
        D = '0' + D
      }
      if (H < 10) {
        H = '0' + H
      }
      if (m < 10) {
        m = '0' + m
      }
      if (s < 10) {
        s = '0' + s
      }
      d = timeNow - publishTime
      d_days = parseInt(d / 86400)
      d_hours = parseInt(d / 3600)
      d_minutes = parseInt(d / 60)
      d_seconds = parseInt(d)
      if (d_days > 0 && d_days < 24) {
        return d_days + '小时前'
      }
      if (d_days <= 0 && d_hours > 10) {
        return d_hours + '分钟前'
      }
      if (d_hours <= 10 && d_hours > 0) {
        return d_hours + '分钟前'
      }
      if (d_hours <= 0 && d_minutes > 0) {
        return '在线'
      }
      if (d_seconds < 60) {
        if (d_seconds <= 0) {
          return '在线'
        } else {
          return '在线'
        }
      }

      if (d_days >= 24 && d_days < 364) {
        return ''
      }
      if (d_days >= 365) {
        return ''
      }
    },
    lookBtn(img) {
      let a = []
      a.push(img)
      this.lookimgs = a
      this.previewOpen(img)
    },
    //打开预览e
    previewOpen(img) {
      this.$refs.previewImage.open(img) // 传入当前选中的图片地址或序号
    },
    //长按事件
    longPress(data) {
      this.secret = false
      setTimeout(() => {
        this.secret = true
      }, 3000)
    },
    async getUser() {
      const res = await this.$request('home', 'getUserHome', {
        uid: this.optionData.code,
        state: 0
      })
      if (res) {
        this.UserData = res
        if (res.user) {
          if (res.user.photoWall && res.user.photoWall.length > 0) {
            res.user.photoWall.forEach((item) => {
              this.UserData.photoList.push({
                imgPath: item
              })
            })
          }
          if (this.UserData.photoList.length == 0) {
            this.UserData.photoList = [
              {
                imgPath: res.user.avatar
              }
            ]
          }
          this.isLoading = true
          if (res.user.status && res.user.status === 1) {
            uni.showToast({
              title: '该用户已被封禁！！！',
              duration: 9999999,
              icon: 'error'
            })
          }
        }

        setTimeout(() => {
          uni
            .createSelectorQuery()
            .select('.ph-infoService-info')
            .fields(
              {
                size: true
              },
              (data) => {
                if (data.height) {
                  this.ListHei = data.height
                }
              }
            )
            .exec()
        }, 100)
        this.history()
      }
    },

    onShareAppMessage(res) {
      if (res.from === 'button') {
        // 来自页面内分享按钮
      }
      return {
        title: '[' + this.UserData.name + '] 的小房子 - 快进来做客吧~',
        path: '/pagesA/house/house1/open/open?code=' + this.UserData.user._id
      }
    },
    previewImage(img) {
      let list = []
      this.UserData.photoList.forEach((item) => {
        list.push(item.imgPath)
      })
      uni.previewImage({
        current: img,
        urls: list
      })
    },
    nameSel(e) {
      uni.showActionSheet({
        itemList: ['举报', '拉黑'],
        success: (res) => {
          ////console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
          if (res.tapIndex + 1 == 1) {
            this.report(e)
          }
          if (res.tapIndex + 1 == 2) {
            this.shield(e)
          }
        },
        fail: function (res) {}
      })
    },
    shield(e) {
      uni.showModal({
        title: '拉黑',
        content: '要拉黑该用户吗？',
        success: async (res) => {
          if (res.confirm) {
            ////console.log('用户点击确定');
            const item = await this.$request('block', 'addBlock', {
              blockId: e
            })
            uni.showToast({
              title: '该用户已拉黑',
              icon: 'none',
              duration: 3000
            })
          } else if (res.cancel) {
            ////console.log('用户点击取消');
          }
        }
      })
    },
    report(e) {
      uni.showModal({
        title: '举报',
        content: '要举报该用户吗？',
        success: async (res) => {
          if (res.confirm) {
            uni.navigateTo({
              url: '/pagesA/report/report?id=' + e
            })
          } else if (res.cancel) {
            ////console.log('用户点击取消');
          }
        }
      })
    },
    async msgSo() {
      // 查看是否是vip会员
      const vip = await this.$request('vipOrder', 'getVipStatus', {})
      if (vip.vip_status == 0 && vip.svip_status == 0) {
        uni.showToast({
          title: '您还不是会员，当前是演示系统直接跳过会员，进入~',
          icon: 'none',
          duration: 3000
        })

        // 真实用请打开
        // uni.showModal({
        //   title: '开通会员',
        //   content: '您还不是会员哦，请先开通~',
        //   success: (res) => {
        //     if (res.confirm) {
        //       uni.navigateTo({
        //         url: '/pagesA/myhome/member/member'
        //       })
        //     }
        //   }
        // })
        // return
      }

      //创建会话
      const currentConversation = await this.getConversation({
        user_id: this.UserData.user._id
      })
      console.log('currentConversation', currentConversation)
      // 当前用户给对方发个消息
      uni.navigateTo({
        url: '/im/chat/chat?conversation_id=' + currentConversation.id
      })
    },
    TravelBtn(code) {
      uni.navigateTo({
        url: '/pagesA/sponsor/sponsor/sponsor?code=' + code
      })
    },
    nearbyBtn(code) {
      uni.navigateTo({
        url: '/pagesA/nearby/nearbyText/nearbyText?code=' + code
      })
    },
    attentionBtn(code) {
      if (!uni.getStorageSync('uniIdToken')) {
        uni.navigateTo({
          url: '/pagesA/login/auth/login'
        })
        return
      }
      this.fansShow = true
      // uni.showToast({
      //   title: "已关注",
      //   icon: "none",
      //   duration: 3000,
      // });
    },
    // 关注
    async confirm(e, id) {
      const res = await this.$request('fans', 'addFollow', {
        fansId: id,
        status: e.value[0].index //关注
      })
      if (res.state === 0) {
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
      this.fansShow = false
    },
    closeFans() {
      this.fansShow = false
    },
    openbtn() {
      uni.navigateTo({
        url: '/pagesA/house/house1/open/open?code=' + this.UserData.user._id
      })
    },
    nearbyList() {
      uni.navigateTo({
        url: '/pagesA/myhome/nearbtList/nearbtList?code=' + this.UserData.user._id
      })
    },
    nearbyInfo(code) {
      uni.navigateTo({
        url: '/pagesA/nearby/nearbyText/nearbyText?code=' + code
      })
    },
    serviceBtn(code) {
      uni.navigateTo({
        url: '/pagesA/service/serviceInfo/serviceInfo?code=' + code
      })
    },
    photoList(code) {
      uni.navigateTo({
        url: '/pagesA/myhome/photoSort/photoSort?code=' + code
      })
    },
    photoBtnList(img) {
      let imgList = []
      for (let item of this.UserData.photoList) {
        imgList.push(item.imgPath)
      }
      uni.previewImage({
        current: img.imgPath,
        urls: imgList
      })
    },
    myphotoSwiperChange(e) {
      this.myphotoCurrentSwiper = e.target.current
    },
    changeTitle(title) {
      this.infoService = title
    },
    toMoreMeet() {
      //////console.log("meet");
    },
    toMoreHelp() {
      //////console.log("help");
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
    },
    // 时间过滤
    GetTime(value) {
      var time = new Date(value * 1000)
      function add0(m) {
        return m < 10 ? '0' + m : m
      }
      var y = time.getFullYear()
      var m = time.getMonth() + 1
      var d = time.getDate()
      var h = time.getHours()
      var mm = time.getMinutes()
      var s = time.getSeconds()
      var timeResult = add0(m) + '月' + add0(d) + '日'
      if (timeResult == '1970-01-01' || timeResult == '1970-01-02') {
        return '--'
      } else {
        return timeResult
      }
    },
    ListTab(index) {
      setTimeout(() => {
        if (index == 0) {
          uni
            .createSelectorQuery()
            .select('.ph-infoService-info')
            .fields(
              {
                size: true
              },
              (data) => {
                ////console.log(data);
                this.ListHei = data.height
                uni
                  .createSelectorQuery()
                  .select('.ph-infoService-info-jineng')
                  .fields(
                    {
                      size: true
                    },
                    (data) => {
                      ////console.log(data);
                      this.ListHei = this.ListHei + data.height
                    }
                  )
                  .exec()
              }
            )
            .exec()
        } else {
          uni
            .createSelectorQuery()
            .select('.ph-infoService-info-jineng')
            .fields(
              {
                size: true
              },
              (data) => {
                this.ListHei = data.height
              }
            )
            .exec()
        }
      }, 100)
    },
    // 滑动tab
    async changeTab(e) {
      let index = e.target.current
      if (this.isClickChange) {
        this.tabIndex = index
        this.isClickChange = false
        return
      }
      // this.ListTab(e.target.current);
      ////console.log(e, '切换了');
      let tabBar = await this.getElSize('tab-bar'),
        tabBarScrollLeft = tabBar.scrollLeft
      let width = 0
      for (let i = 0; i < index; i++) {
        let result = await this.getElSize(this.tabBars[i].id)
        width += result.width
      }
      let winWidth = uni.getSystemInfoSync().windowWidth,
        nowElement = await this.getElSize(this.tabBars[index].id),
        nowWidth = nowElement.width
      if (width + nowWidth - tabBarScrollLeft > winWidth) {
        this.scrollLeft = width + nowWidth - winWidth
      }
      if (width < tabBarScrollLeft) {
        this.scrollLeft = width
      }
      this.isClickChange = false
      this.tabIndex = index //一旦访问data就会出问题
    },
    getElSize(id) {
      //得到元素的size
      return new Promise((res, rej) => {
        uni
          .createSelectorQuery()
          .select('#' + id)
          .fields(
            {
              size: true,
              scrollOffset: true
            },
            (data) => {
              res(data)
            }
          )
          .exec()
      })
    },
    async tapTab(e) {
      //点击tab-bar
      if (this.tabIndex === e.currentTarget.dataset.current) {
        return false
      } else {
        //console.log(e);
        // this.ListTab(e.currentTarget.dataset.current);
        let tabBar = await this.getElSize('tab-bar'),
          tabBarScrollLeft = tabBar.scrollLeft //点击的时候记录并设置scrollLeft
        this.scrollLeft = tabBarScrollLeft
        this.isClickChange = true
        this.tabIndex = e.currentTarget.dataset.current
      }
    },
    randomfn() {
      let ary = []
      for (let i = 0, length = this.tabBars.length; i < length; i++) {
        let aryItem = {
          loadingType: 0,
          data: []
        }
        for (let j = 1; j <= 10; j++) {
          aryItem.data.push(this['data' + Math.floor(Math.random() * 5)])
        }
        ary.push(aryItem)
      }
      return ary
    }
  },
  onLoad(option) {
    this.newsitems = this.randomfn()
    this.tabIndex = 0
    this.optionData = option
    this.getUser()
    // this.ListTab(1);
    // this.ListTab(0);
  },
  onNavigationBarButtonTap() {
    this.shareShow = !this.shareShow
  }
}
</script>

<style lang="scss" scoped>
.citylFont {
  font-size: 25rpx;
}
.title4 {
  width: 200rpx;
  height: 140rpx;
  position: absolute;
  top: -8rpx;
  left: -8rpx;
  overflow: hidden;
}
.title4::before {
  position: absolute;
  left: 124rpx;
  border-radius: 8rpx 8rpx 0 0;
  width: 16rpx;
  height: 8rpx;
  background: $grad;
  content: '';
}
.title4::after {
  position: absolute;
  left: 0;
  top: 124rpx;
  border-radius: 0 8px 8px 0;
  width: 8rpx;
  height: 16rpx;
  background: $grad;
  content: '';
}
.title4 text {
  display: inline-block;
  text-align: center;
  width: 200rpx;
  height: 40rpx;
  line-height: 40rpx;
  position: absolute;
  top: 30rpx;
  left: -50rpx;
  z-index: 2;
  overflow: hidden;
  -ms-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
  border: 1rpx dashed #fff;
  box-shadow: 0 0 0 3rpx $cor, 0 14rpx 7rpx -9rpx rgba(0, 0, 0, 0.6);
  background: $grad;
  color: #fff;
}
.userPhBg {
  position: relative;
  width: 100%;
}
.allorders-content {
  width: 100%;
  height: 100vh;
  transition: all 0.2s;
}
button::after {
  border: none;
}
button {
  background-color: transparent;
  padding-left: 0;
  padding-right: 0;
  line-height: 2.2;
}
.button-hover {
  background-color: transparent;
}
button {
  border-radius: 35px;
}
button.empty::after {
  border: none;
}
.globalCololr {
  background: $fontColorE !important;
  color: #474763 !important;
}
.globalG {
  background: $fontColorG !important;
  color: #fff !important;
}
.globalDa {
  background: $fontColorD !important;
  color: #fff !important;
}
.evaluation {
  padding: 0 20rpx;
}
.selIcon {
  color: #c6c6c6 !important;
  background: #f5f5f5 !important;
}
.ph-basicInfo-box3-icon {
  font-size: 22rpx;
  margin-right: 30rpx;
  background: #e7ebf1;
  padding: 5rpx 22rpx;
  border-radius: 24rpx;
  text {
    font-size: 22rpx;
  }
}
.floatR {
  color: #999999 !important;
  font-size: 27rpx;
}
.dynNearInfocard-header-item-focus-btn {
  font-size: 26rpx;
  border-radius: 30rpx;
  background: $fontColorC;
  margin-left: 15px;
  width: 55rpx;
  color: #fff;
  border-radius: 50%;
  height: 55rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  text {
    font-size: 26rpx;
  }
}
.phCenten {
  color: #333;
  position: relative;
  width: 100vw;
  height: 100%;
  box-sizing: border-box;
}
.ph-myphoto {
  position: fixed;
  box-sizing: border-box;
  width: 100%;
  height: auto;
}
.ph-myphoto-swiper .slide-image {
  width: 100%;
  height: 100%;
}
.ph-myphoto-text {
  position: absolute;
  left: 32rpx;
  bottom: 16rpx;
  width: 60%;
  height: 36rpx;
  line-height: 36rpx;
  font-size: 25rpx;
  color: #fff;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.ph-myphoto-dots {
  width: 40%;
  height: 28rpx;
  line-height: 28rpx;
  display: flex;
  flex-direction: row;
  position: absolute;
  right: 32rpx;
  bottom: 16rpx;
  justify-content: flex-end;
}
.ph-myphoto-dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  margin-left: 20rpx;
  background-color: #fff;
}
.ph-myphoto-active {
  width: 16rpx;
  height: 16rpx;
  background-color: #fdd149;
}
.ph-basicInfo {
  width: 92%;
  padding: 20rpx;
  position: relative;
  background: #ffffff;
  margin: 4%;
  box-sizing: border-box;
  border-radius: 30rpx;
  box-shadow: 2rpx 6rpx 18rpx rgba(0, 0, 0, 0.3);
}
.ph-basicInfo-box1 {
  display: flex;
  align-items: center;
  position: relative;
}
.online {
  position: absolute;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  border-radius: 20rpx;
  padding: 1rpx 10rpx;
  font-size: 20rpx;
  display: flex;
  text-align: center;
  align-items: center;
  z-index: 999999;
  text {
    width: 15rpx;
    height: 15rpx;
    display: inline-block;
    background: #4cd964;
    border-radius: 50%;
    margin-right: 6rpx;
  }
}
.ph-basicInfo-img {
  flex: 0 140rpx;
  width: 140rpx;
  height: 140rpx;
  border-radius: 50%;
  display: inline-block;
  margin-right: 20rpx;
  vertical-align: top;
}
.ph-basicInfo-info {
  flex: 1;
  position: relative;
}

.ph-basicInfo-info-item2 {
  height: 60rpx;
  line-height: 60rpx;
  margin-top: 10rpx;
}
.ph-basicInfo-info-star {
  position: absolute;
  right: 0;
  top: 0;
}
.info-time {
  position: absolute;
  right: 30rpx;
  bottom: 16rpx;
  color: #999;
  font-size: 22rpx;
}
.ph-basicInfo-info-name {
  font-size: 30rpx;
  font-weight: 580;
  color: #000;
}
.ph-basicInfo-info-addr {
  font-size: 26rpx;
  color: #333;
}
.ph-basicInfo-info-icon {
  font-size: 25rpx;
  margin: 0 20rpx;
  border-radius: 8rpx;
  color: #fff;
  text {
    font-size: 25rpx;
    margin-right: 10rpx;
  }
}
.ph-basicInfo-info-sex {
  color: #fe6ed0;
  font-weight: bold;
  padding: 0 10rpx;
  position: relative;
  top: -5rpx;
}
.ph-basicInfo-info-sex_name {
  color: #00c7ff;
  font-weight: bold;
  padding: 0 10rpx;
  position: relative;
  top: -5rpx;
}
.ph-basicInfo-box2 {
  height: 40rpx;
  line-height: 40rpx;
  margin-top: 20rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /*autoprefixer: on */
}
.ph-basicInfo-box2-icon {
  font-size: 26rpx;
  margin-right: 30rpx;
}
.ph-basicInfo-box2-icon .iconfont {
  padding-right: 4rpx;
}
.ph-basicInfo-box3 {
  margin-top: 30rpx;
}
.ph-infoService {
  padding-bottom: 40rpx;
  width: 100%;
  background: #ffffff;
  position: relative;
  // box-shadow: -10rpx 6rpx 20rpx rgba(0,0,0,0.6);
}
.ph-infoService-title {
  box-sizing: border-box;
  width: 100%;
  padding: 20rpx 0 20rpx;
  text-align: center;
  font-size: 32rpx;
  color: #000;
}
.ph-infoService-title-item {
  margin: 0 70rpx;
  color: #fff;
  background: #c6c6c6;
  border-radius: 30rpx;
  padding: 8rpx 40rpx;
  font-size: 25rpx;
  box-shadow: 2rpx 6rpx 10rpx rgba(0, 0, 0, 0.6);
}
.ph-infoService-title-active {
  color: #fff;
  background: $fontLinear;
  border-radius: 30rpx;
  padding: 8rpx 40rpx;
  font-size: 25rpx;
}
.ph-infoService-info {
  padding: 0 20rpx;
}
.ph-infoService-service {
  padding: 20rpx 0;
}
.ph-infoService-info-title {
  font-size: 30rpx;
  font-weight: 500;
  // height: 40rpx;
  // line-height: 40rpx;
  padding: 39rpx 0 20rpx 0;
}
.ph-infoService-info-title-more {
  float: right;
  font-size: 28rpx;
  color: #9b9b9b;
}
.globalFontColor {
  color: #fdd149;
}
.ph-infoService-info-title .globalFontColor .iconfont {
  font-size: 36rpx;
  vertical-align: middle;
  margin-right: 4rpx;
  color: #fdd149;
}
.ph-infoService-info-contnent {
  color: #333;
  padding-left: 40rpx;
}
.ph-infoService-info-contnent-text {
  font-size: 27rpx;
  line-height: 40rpx;
}
.ph-infoService-info-contnent-text-item {
  font-size: 30rpx;
  line-height: 40rpx;
  height: 60rpx;
  display: flex;
  justify-content: space-between;
}
.ph-infoService-info-contnent-text-label {
  display: inline-block;
  width: 120rpx;
  text-align: justify;
  font-size: 27rpx;
}
.ph-infoService-info-contnent-text-label:after {
  content: ' ';
  display: inline-block;
  width: 100%;
}
.ph-infoService-info-contnent-scroll {
  // height: 1200rpx;
  width: 100%;
  // white-space: nowrap;
  margin-left: -10rpx;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.lookImg {
  display: inline-block;
  height: 160rpx;
  width: 158rpx;
  margin: 0 4rpx;
  border-radius: 10rpx;
}
.look {
  filter: blur(6px);
}
.Travel_item {
  margin-bottom: 20rpx;
  padding: 30rpx;
  border-radius: 16rpx;
  font-size: 34rpx;
  color: #fff;
  background: linear-gradient(to right, #f1c81c, #ff6600);
  display: flex;
  align-items: flex-start;
}
.ph-infoService-info-contnent-meet {
  margin-bottom: 20rpx;
  padding: 30rpx;
  border-radius: 16rpx;
  font-size: 34rpx;
  color: #fff;
  background: linear-gradient(to right, #eb5dff, #a16cfa);
  display: flex;
  align-items: flex-start;
}
.ph-infoService-info-contnent-meet-icon {
  flex: 0 60rpx;
  line-height: 50rpx;
  font-size: 40rpx;
  padding-top: 2rpx;
}
.ph-infoService-info-contnent-meet-item {
  flex: 1;
  p {
    color: #fff;
  }
}
.ph-infoService-info-contnent-meet-address {
  font-weight: 700;
  line-height: 50rpx;
  color: #fff;
}
.ph-infoService-info-contnent-meet-time {
  font-size: 28rpx;
  margin-top: 10rpx;
  color: #fff;
}
.ph-infoService-info-contnent-helpIcon {
  color: #22b529;
  font-size: 28rpx;
  margin-right: 12rpx;
  vertical-align: middle;
}
.ph-infoService-info-btns {
  display: flex;
  padding: 40rpx 0;
  position: fixed;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  border-top: 1px solid #f5f5f5;
  z-index: 100;
}
.ph-infoService-info-btns-item {
  flex: 1;
  text-align: center;
  font-size: 30rpx;
}
.ph-infoService-info-btn {
  display: inline-block;
  width: 70%;
  padding: 14rpx 0;
  border-radius: 8rpx;
  background: #fdd149;
  color: #fff;
}
.ph-infoService-service-item {
  padding: 0 20rpx;
  margin: 20rpx 0;
  display: flex;
  position: relative;
  .service-item {
    flex: 1;
    padding: 20rpx;
    justify-content: center;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
}
.ph-infoService-service-item-image {
  width: 100%;
  height: 230rpx;
  border-radius: 12rpx;
  flex: 1;
}
.ph-infoService-service-item-text {
  font-size: 28rpx;
  font-weight: bold;
  line-height: 40rpx;
  margin-bottom: 15rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /*autoprefixer: on */
}
.strCor {
  position: absolute;
  left: 30rpx;
  top: 10rpx;
  font-size: 22rpx;
  padding: 4rpx 15rpx;

  border-radius: 20rpx 3rpx;
  color: #fff;
  background: linear-gradient(to right, #fe586b, #8636f8);
  box-shadow: 2px 2px 5px #999;
}
.ph-infoService-service-item-service {
  font-size: 20rpx;
  color: #8636f8;
  border: 2rpx solid #8636f8;
  padding: 4rpx 10rpx;
  border-radius: 5rpx;
  margin-right: 20rpx;
  font-weight: bold;
}
.ph-infoService-service-item-price {
  float: right;
  color: $fontColor;
  font-weight: bold;
  font-size: 30rpx;
}
.ph-infoService-service-item-price-time {
  font-size: 30rpx;
}
</style>
