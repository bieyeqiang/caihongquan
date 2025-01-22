<template>
  <view class="moddList">
    <view class="dynNearSwiper-item" v-for="(item, index) of nearbyList" :key="index">
      <view class="dynNearcard-wrapper" @tap.stop="tab_content(item._id)">
        <view class="dynNearcard-header-wrapper">
          <view class="dynNearcard-header-item">
            <image :src="item.userInfo.avatar" alt="" class="dynNearcard-header-img zwyHeight" @tap.stop="tab_name(item.uid)" />
            <view class="dynNearcard-header-nearInfo" @tap.stop="tab_name(item.uid)">
              <view class="dynNearcard-header-nearInfo-item">
                <text class="dynNearcard-header-name" :style="item.uid == '766902' ? 'color:#fe586b' : ''">{{ item.userInfo.nickname }}</text>
                <image class="zwyHeight" src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/appIcon/j.png"></image>
              </view>
              <view class="dynNearcard-header-nearInfo-item dynNearcard-header-time">
                <text>
                  <text class="iconfont" :style="item.userInfo.gender == 1 ? 'color: #00c7ff;' : 'color: #fe6ed0;'">{{ item.userInfo.gender == 1 ? '&#xe638;' : '&#xe640;' }}</text>
                  {{ item.userInfo.birthdayText ? item.userInfo.birthdayText + '岁' : '' }}
                </text>
                <text v-if="item.userInfo.constellation">· {{ item.userInfo.constellation }}</text>
                <text v-for="(list, index) of item.userInfo.label" :key="index" v-if="item.userInfo.label && index < 2">· {{ list }}</text>
                <text>{{ item.add_time | getTimeText }}</text>
              </view>
            </view>
          </view>
          <view class="dynNearcard-header-item-focus">
            <!--<text class='dynNearcard-header-item-focus-btn globalCololr'>+关注</text>-->
          </view>
        </view>
        <view class="dynNearcard-path-wrapper" v-if="item.startCity">
          <span class="dynNearcard-path-address" v-if="item.startCity">
            {{ item.startCity }}
            <span class="iconfont chengIcon">&#xe64a;</span>
            {{ item.endCity }}
          </span>
          <span class="dynNearcard-path-time" v-if="item.dynamicStart && item.dynamicEnd">{{ item.dynamicStart | getTime }}-{{ item.dynamicEnd | getTime }}</span>
        </view>
        <!-- 拼单 -->
        <view class="rich-text" v-if="item.spellId && item.spell">
          <view class="goods-card u-flex" @click.stop="navTo('/pagesA/explore/spellDetail?id=' + item._id + '&poi=' + item.spellId)">
            <image
              v-if="item.spell && item.spell.length > 0 && item.spell[0] && item.spell[0].photos && item.spell[0].photos.length > 0"
              :src="item.spell && item.spell.length > 0 ? item.spell[0].photos[0].url : 'https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/pin.png'"
            ></image>
            <image v-else src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/pin.png"></image>
            <view class="detail u-flex-col u-row-between">
              <text class="name u-line-2">{{ item.spell && item.spell.length > 0 ? item.spell[0].name : '一起拼单拼玩吗？' }}</text>
              <view class="price u-flex u-row-between">
                <text style="font-size: 25rpx">{{ item.spell && item.spell.length > 0 ? item.spell[0].cityname + '-' + item.spell[0].adname : '我在这里等你...' }}</text>
              </view>
              <view class="price u-flex u-row-between">
                <text style="font-size: 25rpx">[拼单]、[拼玩]</text>
                <view class="btn">拼游中...</view>
              </view>
            </view>
          </view>
        </view>
        <!-- 图片 -->
        <view class="dynNearcard-imgList-wrapper">
          <!--一张二张-->
          <view class="leng1" v-if="item.dynamicImg != '' && item.dynamicImg.length == 1">
            <image
              mode="aspectFill"
              lazy-load
              v-for="(img, imgIndex) of item.dynamicImg"
              :key="imgIndex"
              :src="img"
              alt=""
              :data-src="img"
              @tap.stop="previewImage($event, item.dynamicImg, item)"
            ></image>
          </view>
          <view class="leng2" v-if="item.dynamicImg != '' && item.dynamicImg.length == 2">
            <image
              mode="aspectFill"
              lazy-load
              v-for="(img, imgIndex) of item.dynamicImg"
              :key="imgIndex"
              :src="img"
              alt=""
              :data-src="img"
              @tap.stop="previewImage($event, item.dynamicImg, item)"
            ></image>
          </view>
          <!--三张-->
          <view class="leng3" v-if="item.dynamicImg != '' && item.dynamicImg.length == 3">
            <view>
              <image mode="aspectFill" lazy-load :src="item.dynamicImg[0]" :data-src="item.dynamicImg[0]" @tap.stop="previewImage($event, item.dynamicImg, item)"></image>
            </view>
            <view class="leng3_lf">
              <image mode="aspectFill" lazy-load :src="item.dynamicImg[1]" :data-src="item.dynamicImg[1]" @tap.stop="previewImage($event, item.dynamicImg, item)"></image>
              <image mode="aspectFill" lazy-load :src="item.dynamicImg[2]" :data-src="item.dynamicImg[2]" @tap.stop="previewImage($event, item.dynamicImg, item)"></image>
            </view>
          </view>
          <!--四张-->
          <view class="leng4" v-if="item.dynamicImg != '' && item.dynamicImg.length == 4">
            <view>
              <image mode="aspectFill" lazy-load :src="item.dynamicImg[0]" :data-src="item.dynamicImg[0]" @tap.stop="previewImage($event, item.dynamicImg, item)"></image>
            </view>
            <view class="leng4_lf">
              <image mode="aspectFill" lazy-load :src="item.dynamicImg[1]" :data-src="item.dynamicImg[1]" @tap.stop="previewImage($event, item.dynamicImg, item)"></image>
            </view>
          </view>
          <view class="leng4_bot clear" v-if="item.dynamicImg != '' && item.dynamicImg.length == 4">
            <image mode="aspectFill" lazy-load :src="item.dynamicImg[2]" :data-src="item.dynamicImg[2]" @tap.stop="previewImage($event, item.dynamicImg, item)"></image>
            <image mode="aspectFill" lazy-load :src="item.dynamicImg[3]" :data-src="item.dynamicImg[3]" @tap.stop="previewImage($event, item.dynamicImg, item)"></image>
          </view>
          <!--五张-->
          <view class="leng5" v-if="item.dynamicImg != '' && item.dynamicImg.length == 5">
            <view>
              <image mode="aspectFill" lazy-load :src="item.dynamicImg[0]" :data-src="item.dynamicImg[0]" @tap.stop="previewImage($event, item.dynamicImg, item)"></image>
            </view>
            <view class="leng5_lf">
              <image mode="aspectFill" lazy-load :src="item.dynamicImg[1]" :data-src="item.dynamicImg[1]" @tap.stop="previewImage($event, item.dynamicImg, item)"></image>
            </view>
          </view>
          <view class="leng5_bot clear" v-if="item.dynamicImg != '' && item.dynamicImg.length == 5">
            <image mode="aspectFill" lazy-load :src="item.dynamicImg[2]" :data-src="item.dynamicImg[2]" @tap.stop="previewImage($event, item.dynamicImg, item)"></image>
            <image mode="aspectFill" lazy-load :src="item.dynamicImg[3]" :data-src="item.dynamicImg[3]" @tap.stop="previewImage($event, item.dynamicImg, item)"></image>
            <image mode="aspectFill" lazy-load :src="item.dynamicImg[4]" :data-src="item.dynamicImg[4]" @tap.stop="previewImage($event, item.dynamicImg, item)"></image>
          </view>
          <!--六张-->
          <view class="leng6" v-if="item.dynamicImg != '' && item.dynamicImg.length > 5">
            <view>
              <image mode="aspectFill" lazy-load :src="item.dynamicImg[0]" :data-src="item.dynamicImg[0]" @tap.stop="previewImage($event, item.dynamicImg, item)"></image>
            </view>
            <view class="leng6_lf">
              <image mode="aspectFill" lazy-load :src="item.dynamicImg[1]" :data-src="item.dynamicImg[1]" @tap.stop="previewImage($event, item.dynamicImg, item)"></image>
              <image mode="aspectFill" lazy-load :src="item.dynamicImg[2]" :data-src="item.dynamicImg[2]" @tap.stop="previewImage($event, item.dynamicImg, item)"></image>
            </view>
          </view>
          <view class="leng6_bot clear" v-if="item.dynamicImg != '' && item.dynamicImg.length > 5">
            <image mode="aspectFill" lazy-load :src="item.dynamicImg[3]" :data-src="item.dynamicImg[3]" @tap.stop="previewImage($event, item.dynamicImg, item)"></image>
            <image mode="aspectFill" lazy-load :src="item.dynamicImg[4]" :data-src="item.dynamicImg[4]" @tap.stop="previewImage($event, item.dynamicImg, item)"></image>
            <image mode="aspectFill" lazy-load :src="item.dynamicImg[5]" :data-src="item.dynamicImg[5]" @tap.stop="previewImage($event, item.dynamicImg, item)"></image>
            <view class="photoNum" v-if="item.dynamicImg.length > 6" @tap.stop="previewImage($event, item.dynamicImg, item)">+{{ item.dynamicImg.length - 6 }}</view>
          </view>
        </view>
        <view :class="item.dynamicImg[0] != '' ? 'dynNearcard-content-wrapper' : 'dynamicContext'">
          <text>{{ item.dynamicContext }}</text>
          <view>
            <text v-for="(list, key) of item.topicTitle" :key="key" @click.stop="huatiItem(list)" class="huaBg">#{{ list }}#</text>
          </view>
        </view>
        <view class="positionDesc" v-if="item.positionDesc || item.distance != null">
          <text class="iconfont" v-if="item.positionDesc || item.distance != null">&#xe69d;</text>
          <text v-if="item.distance != null">{{ item.distance | distance }}</text>
          <text v-if="item.positionDesc">{{ item.positionDesc }}</text>
        </view>
        <view class="dynNearcard-markList-wrapper" v-if="item.dynamicLabel != '' && item.dynamicLabel != null">
          <span class="dynNearcard-markList-item">{{ item.dynamicLabel }}</span>
        </view>
        <view class="topicBg" v-if="item.topicCode">
          <text>#{{ item.topicCode }}#</text>
        </view>
        <view class="dianzan">
          <text @tap.stop="give(item, index, item._id)" :class="giveChage(index) ? 'zwyHover2' : ''">
            <text class="iconfont">&#xe69f;</text>
            {{ item.like.length == 0 ? '抢首赞' : '点赞' + item.like.length }}
          </text>
          <text>
            <text class="iconfont">&#xe69c;</text>
            评论{{ item.reply.length != 0 ? item.reply.length : '' }}
          </text>
          <text @tap.stop="secretBtn(item)">
            <text class="iconfont">&#xe71a;</text>
            私密评论{{ item.secret.length != 0 ? item.secret.length : '' }}
          </text>
          <text>
            <text class="iconfont">&#xe646;</text>
            阅{{ item.look }}
          </text>
        </view>
      </view>
      <!-- 小程序广告 -->
      <!-- #ifdef MP-WEIXIN -->
      <view class="xcx-ad-view" v-if="index > 0 && index % 6 == 0">
        <!-- <ad adpid="1091989394" unit-id="adunit-c6817e9b0563765e" ad-intervals="30"></ad> -->
        <!-- <ad
          unit-id="adunit-c6817e9b0563765e"
          ad-type="video"
          ad-theme="white"
        ></ad> -->
      </view>
      <!-- #endif -->
    </view>
    <!-- 评论弹窗 -->
    <u-popup :show="commentPop" border-radius="18" closeOnClickOverlay height="60%" mode="bottom" @close="commentPop = false">
      <view v-if="secretData" class="comment-pop">
        <view class="title">私密评论</view>
        <view v-if="secretData.secret.length == 0" class="no-comment u-flex-col">
          <jw-empty text="你还没私密过~"></jw-empty>
        </view>
        <scroll-view v-else class="comment-scroll" scroll-y>
          <view v-for="(item, index) of secretData.secret" v-if="item.uid == userInfo._id" :key="index" class="item u-flex">
            <view style="align-self: flex-start" @click="navTo('/travel/experience/personalDetails?id=' + item.userInfo._id)">
              <image :src="item.uid == userInfo._id ? userInfo.avatar : item.userInfo.avatar" class="avatar"></image>
            </view>
            <view style="flex: 1">
              <view class="user u-flex">
                <text class="nick-name">{{ item.uid == userInfo._id ? '我' : item.userInfo.nickname }}</text>
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
export default {
  props: {
    nearbyList: {
      type: Array,
      defalut: []
    }
  },
  data() {
    return {
      comment: {
        switch: 1,
        text: '',
        data: {}
      },
      commentPop: false,
      userCode: '',
      giveIndex: '',
      latitude: '',
      longitude: '',
      downOption: {
        auto: false, // 不自动加载
        bgColor: '#FFFFFF'
      },
      mescroll: null,
      upOption: {
        auto: false, // 不自动加载
        page: {
          num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
          size: 6 // 每页数据的数量
        },
        noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
        empty: {
          tip: '~ 空空如也 ~', // 提示
          btnText: '去看看'
        }
      },
      isInit: false,
      userInfo: uni.getStorageSync('userInfo'),
      secretData: {
        secret: []
      }
    }
  },
  methods: {
    async commitComment() {
      if (!this.$store.getters.hasLogin) {
        uni.navigateTo({
          url: '/other/login/auth/login'
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
        uni.hideLoading()
        return
      }

      const res = await this.$request('nearby', 'nearbyReplySecret', {
        dynamicId: this.secretData._id,
        comment: this.comment.text,
        toUid: this.secretData.uid
      })
      uni.hideLoading()
      if (res.status == 1) {
        uni.showToast({
          title: '已发送',
          icon: 'none',
          duration: 3000
        })
        this.secretData.secret.push({
          add_time: new Date().getTime(),
          comment: this.comment.text,
          uid: this.userInfo._id
        })
        this.comment.text = ''
        uni.hideKeyboard()
      }
    },
    secretBtn(item) {
      this.secretData = item
      this.commentPop = true
    },
    huatiItem(text) {
      uni.navigateTo({
        url: '/pagesA/nearby/nearbyText/topicList?title=' + text
      })
    },
    giveChage(index) {
      if (this.giveIndex === index) {
        setTimeout(() => {
          this.giveIndex = ''
        }, 500)
        return true
      }
      return false
    },
    previewImage(e, img, item) {
      this.imageList = img
      var current = e.target.dataset.src
      uni.previewImage({
        current: current,
        urls: this.imageList
      })
      this.$request('nearby', 'nearbyText', { id: item._id })
    },
    // 点赞
    async give(item, index, code) {
      this.giveIndex = index
      const res = await this.$request('nearby', 'addLike', {
        id: code
      })
      if (res.status == 1) {
        this.nearbyList[index].like.push({ uid: 'null' })
      }
      if (res.status == 2) {
        this.nearbyList[index].like.splice(0, 1)
      }
    },
    // 内容
    tab_content(code) {
      uni.navigateTo({
        url: '/pagesA/nearby/nearbyText/nearbyText?code=' + code
      })
    },
    // 头像
    tab_name(userCode) {
      uni.navigateTo({
        url: '/pagesA/service/homePage/homePage?code=' + userCode
      })
    },
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit(mescroll) {
      this.mescroll = mescroll
    },

    //点击空布局按钮的回调
    emptyClick() {
      uni.showToast({
        title: '点击了按钮,具体逻辑自行实现'
      })
    }
  }
}
</script>

<!--css样式-->
<style lang="scss" scoped>
.xcx-ad-view {
  padding: 20rpx 0 0 100rpx;
  border-bottom: 20rpx solid #eeeeee;
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
    padding-bottom: 360rpx;
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
    bottom: 40rpx;
    padding: 26rpx 28rpx 50rpx 26rpx;
    width: 100%;
    height: 145rpx;
    border-top: 1rpx solid #f3f3f3;
    background: #4c87f898;
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
  color: #fff;
  margin-right: 10rpx;
  background: #4c87f898;
  padding: 2rpx 22rpx;
  border-radius: 30rpx;
  font-size: 24rpx;
}

.leng1 image {
  width: 100%;
  height: 400upx;
  border-radius: 10upx;
}
.leng2 {
  display: flex;
  flex-flow: row;
}
.leng2 image {
  display: inline-block;
  flex: 2;
  width: 50%;
  height: 400upx;
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
  height: 400upx;
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
  height: 300upx;
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
  height: 170upx;
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
  height: 300upx;
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
  height: 170upx;
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
  height: 300upx;
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
  height: 170upx;
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

.dynNearSwiper-item {
  flex: 0 750rpx;
  background: #fff;
  padding: 20upx 0;
}

.dynNearcard-wrapper {
  border-bottom: 20rpx solid #eeeeee;
  padding: 0 20rpx;
  color: #333;
  background: #fff;
}

.dynNearcard-header-wrapper {
  box-sizing: border-box;
  height: 100rpx;
  line-height: 100rpx;
  display: flex;
  vertical-align: center;
  margin-top: 20rpx;
}
.dynNearcard-header-item {
  flex: 1;
  display: flex;
  align-items: center;
}
.dynNearcard-header-img {
  display: inline-block;
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
}
.dynNearcard-header-nearInfo {
  display: inline-block;
  vertical-align: top;
  margin-left: 16rpx;
}
.dynNearcard-header-nearInfo-item {
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
}
.dynNearcard-header-nearInfo-item .iconfont {
  font-size: 20rpx;
  font-weight: bold;
}
.dynNearcard-header-item-focus {
  text-align: right;
}
.dynNearcard-header-item-focus-btn {
  font-size: 28rpx;
  padding: 12rpx 24rpx;
  border-radius: 30rpx;
  background: #fdd149;
}
.dynNearcard-header-time {
  color: #7a7997;
  font-size: 21rpx !important;
  font-weight: 300;
  > text {
    padding-right: 10rpx;
  }
}
.dynNearcard-path-wrapper {
  margin: 30rpx 0 20rpx 95rpx;
  line-height: 60rpx;
  border: 1px solid #9d9db3;
  padding: 20rpx;
  border-radius: 10rpx;
  position: relative;
  display: flex;
  flex-direction: column;
}
.dynNearcard-path-address {
  font-size: 26rpx;
  font-weight: 500;
  color: $fontColorC;
  text-align: center;
}
.chengIcon {
  margin: 0 50rpx;
}
.dynNearcard-path-address .iconfont {
  font-size: 34rpx;
  padding: 0 6rpx 0 4rpx;
}
.dynNearcard-path-time {
  font-size: 26rpx;
  font-weight: 500;
  color: $fontColorC;
  text-align: center;
}

.dynNearcard-header-name {
  color: #f4742c;
  font-weight: 500;
}

.dynNearcard-imgList-wrapper {
  margin-top: 10rpx;
  padding-left: 95rpx;
  image {
    background: #f5f5f5;
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
.dianzan {
  padding: 30rpx 0 30rpx 95rpx;
  > text {
    display: inline-block;
    background: #f2f2f4;
    border-radius: 5rpx;
    color: #9d9db3;
    padding: 8rpx 20rpx;
    font-size: 22rpx;
    font-weight: 400;
    > text {
      padding-right: 10rpx;
      font-size: 22rpx;
      font-weight: 400;
    }
  }
  > text:not(:last-child) {
    margin-right: 15rpx;
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

.clear:after {
  content: '';
  display: block;
  clear: both;
}

.yg img {
  width: 100%;
  border-radius: 8px 8px 0 0;
}
.yg p {
  width: 100%;
  font-size: 0.75rem;
  padding: 3px 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #999;
  text-align: left;
  box-sizing: border-box;
}
.yg_l,
.yg_r {
  width: calc(50% - 5px);
}
.yg li {
  background: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 0 5px #999;
}
.yg_l {
  float: left;
}
.yg_r {
  float: right;
}
.u_xinx {
  position: absolute;
  bottom: -11px;
}
.u_xinx img {
  margin-left: 5px;
  background: rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: inline-block;
}
.u_xinx text {
  position: relative;
  text-shadow: 0 1px 1px #333;
  top: -8px;
  color: #fff;
  font-size: 0.6rem;
}
</style>
