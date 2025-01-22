<template>
  <view class="spellDetail">
    <!-- 文章类型 -->
    <view v-if="contentData">
      <!-- 顶部封面图 -->
      <view class="top-img">
        <image :src="contentData.dynamicImg[0] || contentData.userInfo.avatar" mode="widthFix"></image>
      </view>
      <!-- 内容区 -->
      <view class="content" v-if="contentData">
        <view class="author u-flex" id="author">
          <image
            :src="contentData.userInfo.avatar"
            mode="aspectFit"
            lazy-load
            @click="navTo('/pagesA/service/homePage/homePage?code=' + contentData.userInfo._id)"
          ></image>
          <text class="nickname" @click="navTo('/pagesA/service/homePage/homePage?code=' + contentData.userInfo._id)">{{
            contentData.userInfo.nickname
          }}</text>
          <view class="attention u-flex" @click="attentionBtn" :class="{ attentioned: attention }">
            <text>{{ attention == false ? '关注' : '已关注' }}</text>
          </view>
        </view>
        <view class="title" v-if="poiData">拼单拼玩：{{ contentData.dynamicLabel }}</view>
        <view class="title" v-if="!poiData && contentData.typesDetail"
          >电台呼叫：{{ contentData.typesDetail.title }}</view
        >
        <view class="rich-text">
          <view class="goods-card u-flex" v-if="poiData" @click="goToGoodsDetail(poiData.id)">
            <image
              v-if="poiData.photos && poiData.photos[0] && poiData.photos[0].url"
              :src="poiData.photos[0].url"
            ></image>
            <image v-else src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/pin.png"></image>
            <view class="detail u-flex-col u-row-between">
              <text class="name u-line-2">{{ poiData.name }}</text>
              <view class="price u-flex u-row-between">
                <text style="font-size: 25rpx">[{{ poiData.business.keytag }}]</text>
              </view>
              <view class="price u-flex u-row-between">
                <text style="font-size: 25rpx">{{ poiData.business.rating }}</text>
                <view class="btn">拼玩中</view>
              </view>
            </view>
          </view>
          <view class="lists">
            <view class="left">
              <view class="list" v-if="poiData.name">
                <view class="black">
                  <u-icon name="map-fill" color="#E47470" size="40"></u-icon>
                </view>
                <text>地点：{{ poiData.name }}</text>
              </view>

              <view class="list" v-if="contentData.time">
                <view class="black">
                  <u-icon name="hourglass-half-fill" color="#E47470" size="40"></u-icon>
                </view>
                <text>周三</text>
                <text>21:00-22:00</text>
              </view>

              <view class="list" v-if="contentData.joinNum">
                <view class="black">
                  <u-icon name="man-add-fill" color="#E47470" size="40"></u-icon>
                </view>
                <text>人数：{{ contentData.joinNum }}</text>
              </view>

              <view class="list" v-if="contentData.price_voluntarily">
                <view class="black">
                  <u-icon name="man-add-fill" color="#E47470" size="40"></u-icon>
                </view>
                <text>我出费用：{{ contentData.price_voluntarily || 0 }}元</text>
              </view>

              <view class="list">
                <view class="black">
                  <u-icon name="file-text-fill" color="#E47470" size="40"></u-icon>
                </view>
                <text>已报名：</text>
                <text>{{ contentData.spell.length || 0 }}</text>
              </view>
            </view>
            <view class="right">
              <u-avatar-group :urls="urls" size="60" gap="0.4"></u-avatar-group>
            </view>
          </view>
          <text class="text">📢拼单内容：{{ contentData.dynamicContext }}</text>
          <image
            class="img"
            v-if="contentData.dynamicImg.length > 0"
            v-for="(item, index) of contentData.dynamicImg"
            :key="index"
            :src="item"
            mode="widthFix"
            lazy-load
            @click="previewImg(item)"
          ></image>
        </view>
      </view>
    </view>
    <!-- 话题 -->
    <view class="topic" v-if="contentData.dynamicLabel">
      <text class="sign">#</text>
      <text>{{ contentData.dynamicLabel }}</text>
    </view>
    <!-- 已报名 -->
    <view class="signUp" v-if="contentData && contentData.spell">
      <view>已报名（{{ contentData.spell.length }}人）</view>
      <view>
        <view v-for="(item, index) of contentData.spell" :key="index" class="confirmList">
          <image
            :src="item.userInfo.avatar"
            mode=""
            @click="navTo('/pagesA/service/homePage/homePage?code=' + item.userInfo._id)"
          />
          <view class="confirm" :class="userInfo._id == contentData.uid ? 'cor' : ''" @click="confirm(item)">
            {{ item.confirm ? '已同意' : '等待确认' }}
          </view>
        </view>

        <jw-empty v-if="contentData.spell.length == 0" text="暂无报名"></jw-empty>
      </view>
    </view>
    <u-gap height="16" bg-color="#f7f8fa"></u-gap>
    <!-- 评论区 -->
    <view class="comment card" v-if="contentData">
      <view class="head u-flex">
        <view class="title">
          全部评论
          <text v-if="contentData.reply.length > 0">({{ contentData.reply.length }})</text>
        </view>
        <view class="edit u-flex" @click="commentPop = true">
          <text>写评论</text>
        </view>
      </view>
      <view class="have-comment">
        <view class="item-box">
          <view class="item u-flex" v-for="(item, index) of contentData.reply" :key="index">
            <view
              style="align-self: flex-start"
              @click="navTo('/pagesA/service/homePage/homePage?code=' + item.userInfo._id)"
            >
              <image class="avatar" :src="item.userInfo.avatar"></image>
            </view>
            <view style="flex: 1">
              <view class="user u-flex">
                <text class="nick-name" @click="navTo('/pagesA/service/homePage/homePage?code=' + item.userInfo._id)">{{
                  item.userInfo.nickname
                }}</text>
                <text class="date">{{ item.add_time | friendDate('mm/dd') }}</text>
                <image
                  v-if="!item.support"
                  class="zan"
                  src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/icon/feed_pinwei_not_fav.png"
                  @click="giveLike(item)"
                ></image>
                <image
                  v-if="item.support"
                  class="zan"
                  src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/icon/feed_pinwei_fav.png"
                  @click="giveLike(item)"
                ></image>
              </view>
              <view class="text u-line-1">{{ item.comment }}</view>
            </view>
          </view>
        </view>
        <view class="all u-flex" v-if="contentData.reply.length > 5" @click="commentPop = true">
          <text>查看全部{{ contentData.reply.length }}条评论</text>
        </view>
      </view>
      <jw-empty v-if="contentData.reply.length == 0" text="还没有人评论~"></jw-empty>
    </view>
    <u-gap height="160" bg-color="#f7f8fa"></u-gap>

    <!-- 底部按钮 -->
    <view class="bottom-menu u-flex" v-if="contentData">
      <view class="function u-flex">
        <view class="item u-flex" @click="give()">
          <view class="icon-box">
            <image
              v-if="!contentData.userLike"
              src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/icon/feed_pinwei_not_fav.png"
            ></image>
            <image
              v-if="contentData.userLike"
              src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/icon/feed_pinwei_fav.png"
            ></image>
            <text :style="{ color: contentData.like ? '#FE1F1D' : '#292A2D' }" v-if="contentData.like.length != 0">{{
              contentData.like.length
            }}</text>
          </view>
        </view>
        <view class="item u-flex" v-if="comment.switch" @click.stop="commentPop = true">
          <view class="icon-box">
            <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/icon/feed_pinwei_comment.png"></image>
            <text v-if="contentData.reply">{{ contentData.reply.length }}</text>
          </view>
        </view>
        <view class="item u-flex" @click.stop="shareShow = true">
          <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/icon/feed_pinwei_share.png"></image>
          <button class="share-btn" open-type="share">分享</button>
        </view>
      </view>
      <!-- 报名 -->
      <view class="goods-box u-flex">
        <view class="btn u-flex" @click="showGoods">
          <view class="goods-count">
            <u-icon name="calendar" color="#ffffff" size="40rpx"></u-icon>
            <text v-if="contentData && contentData.spell">{{ contentData.spell.length }}</text>
          </view>
          <view class="text">{{ contentData.userJoin ? '取消报名' : '立即报名' }}</view>
        </view>
      </view>
    </view>
    <!-- 评论弹窗 -->
    <u-popup
      :show="commentPop"
      closeOnClickOverlay
      @close="commentPop = false"
      v-if="contentData"
      mode="bottom"
      length="60%"
      border-radius="18"
      class="comment-pop"
    >
      <view class="title">
        全部评论
        <u-icon
          class="close"
          custom-prefix="custom-icon"
          color="#333"
          name="close"
          size="28"
          @click="commentPop = false"
        ></u-icon>
      </view>
      <view class="no-comment u-flex-col" v-if="contentData.reply.length == 0">
        <jw-empty text="沙发还空着，快来抢吧~"></jw-empty>
      </view>

      <scroll-view scroll-y class="comment-scroll" v-else>
        <view class="item u-flex" v-for="(item, index) of contentData.reply" :key="index">
          <view
            style="align-self: flex-start"
            @click="navTo('/pagesA/service/homePage/homePage?code=' + item.userInfo._id)"
          >
            <image class="avatar" :src="item.userInfo.avatar"></image>
          </view>
          <view style="flex: 1">
            <view class="user u-flex">
              <text class="nick-name" @click="navTo('/pagesA/service/homePage/homePage?code=' + item.userInfo._id)">{{
                item.userInfo.nickname
              }}</text>
              <text class="date">{{ item.userInfo.add_time | friendDate('mm/dd') }}</text>
              <image
                v-if="!item.support"
                class="zan"
                src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/icon/feed_pinwei_not_fav.png"
                @click="giveLike(item)"
              ></image>
              <image
                v-if="item.support"
                class="zan"
                src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/icon/feed_pinwei_fav.png"
                @click="giveLike(item)"
              ></image>
            </view>
            <view class="text u-line-1">{{ item.comment }}</view>
          </view>
        </view>
      </scroll-view>
      <view class="input-box u-flex">
        <input type="text" v-model="comment.text" placeholder="发表你的评论" />
        <view class="send" @click="commitComment">发送</view>
      </view>
    </u-popup>
    <!-- 分享 -->
    <jw-share v-if="shareShow" :shareShow="shareShow"></jw-share>
  </view>
</template>

<script>
export default {
  data () {
    return {
      shareShow: false,
      article: {
        id: 0
      },
      urls: [],
      swiperCurrent: 0,
      content: [],
      gids: [],
      goodsList: [],
      likeInfo: {},
      comment: {
        switch: 1,
        text: '',
        data: {}
      },
      recommendList: [],
      isAttention: false,
      isReading: false,
      authorTop: 0,
      videoMask: true,
      showPoster: true,
      commentPop: false,
      goodsPop: false,
      skeletonLoading: true,
      scrollTop: 0,
      option: '',
      contentData: '',
      spellData: '',
      poiData: '',
      attention: false,
      userInfo: uni.getStorageSync('userInfo')
    }
  },
  onLoad (option) {
    this.option = option
  },
  onShow () {
    this.getDetail()
  },
  methods: {
    confirm (item) {
      if (this.userInfo._id == this.contentData.uid) {
        let val = {
          title: '同意Ta',
          text: '要同意该用户加入吗？'
        }
        if (item.confirm == 1) {
          val.title = '取消Ta'
          val.text = '确认取消Ta加入吗'
        }
        uni.showModal({
          title: val.title,
          content: val.text,
          success: async res => {
            if (res.confirm) {
              this.$request('nearby', 'spellConfirm', {
                dynamicId: this.option.id
              }).then(res => {
                if (res) {
                  if (item.confirm == 1) {
                    this.msg('取消成功')
                  } else {
                    this.msg('确认成功')
                  }
                  this.getDetail()
                }
              })
            }
          }
        })
      } else {
        this.msg('你不是发起人,等待对方确认')
      }
    },
    attentionBtn (id) {
      if (this.attention === true) {
        uni.showModal({
          title: '关注',
          content: '要取消关注该用户吗？',
          success: async res => {
            if (res.confirm) {
              const res = await this.$request('fans', 'removeFollow', {
                id: this.contentData.uid
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
    async fansSel () {
      uni.showActionSheet({
        itemList: ['普通关注', '悄悄关注', '特别关注'],
        success: async res => {
          const data = await this.$request('fans', 'addFollow', {
            fansId: this.contentData.uid,
            status: res.tapIndex // 0  1 2
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
        }
      })
    },
    // 点赞
    async give (code) {
      this.giveIndex = code
      if (this.contentData.userLike == 0) {
        const res = await this.$request('nearby', 'addLike', {
          id: this.contentData._id,
          toUid: this.contentData.uid
        })
      } else {
        const res = await this.$request('nearby', 'removeLike', {
          id: this.contentData._id
        })
      }
      // 获取详情
      this.getDetail()
    },
    async getDetail () {
      // 获取详情
      const res = await this.$request('nearby', 'nearbyText', {
        id: this.option.id
      })
      if (res.data) {
        this.contentData = res.data[0]
      }

      if (res.data[0].spellId) {
        // 获取poi详情
        let resData = await this.$request('poi', 'getPoiDetail', {
          id: res.data[0].spellId
        })
        this.poiData = resData.pois[0]
      }

      // 获取拼单列表
      let nearbyData = await this.$request('nearby', 'nearbyList', {
        dynamicType: 2,
        spellType: 1,
        offset: 0,
        limit: 10,
        state: 0
      })
      this.spellData = nearbyData.data

      // 获取用户关注
      const item = await this.$request('fans', 'isFollow', {
        fansId: this.contentData.uid
      })
      if (item === 1) {
        this.attention = true
      } else {
        this.attention = false
      }
    },
    async commitComment () {
      if (this.comment.text.trim() == '') {
        this.showToast('请填写内容后再提交', 'warning')
      } else {
        const res = await this.$request('nearby', 'nearbyReply', {
          dynamicId: this.option.id,
          comment: this.comment.text,
          toUid: ''
        })
        //console.log(res);
        if (res.status == 1) {
          uni.showToast({
            title: '已发送',
            icon: 'none',
            duration: 3000
          })
          // 获取列表
          this.getDetail()
          uni.hideKeyboard()
          this.comment.text = ''
        }
      }
    },
    giveLike (item) {
      item.support = !item.support
      const msg = ['你点赞的样子真有品~', '品质生活，从赞开始', '每一个赞都让我们更有品味']
      if (item.support) {
        item.supportNum++
        this.showToast(msg[this.$u.random(0, 2)], 'success')
      } else {
        item.supportNum--
      }
    },
    showToast (msg, type) {},

    showGoods () {
      let val = {
        title: '是否报名',
        text: '确认要此报名吗？'
      }
      if (this.contentData.userJoin == 1) {
        val.title = '取消报名'
        val.text = '确认取消报名吗'
      }
      uni.showModal({
        title: val.title,
        content: val.text,
        success: async res => {
          if (res.confirm) {
            this.$request('nearby', 'spellAdd', {
              toUid: this.contentData.uid,
              dynamicId: this.option.id
            }).then(res => {
              if (res) {
                if (this.contentData.userJoin == 1) {
                  this.msg('取消成功')
                } else {
                  this.msg('报名成功')
                }

                this.getDetail()
              }
            })
          }
        }
      })
    },
    swiperChange (e) {
      this.swiperCurrent = e.target.current
    },
    playVideo () {
      this.showPoster = false
      this.videoMask = false
      this.videoContext.play()
    },
    videoEnd () {
      this.showPoster = true
      this.videoMask = true
    },
    getAuthorTop () {
      setTimeout(() => {
        uni
          .createSelectorQuery()
          .select('#author')
          .boundingClientRect(data => {
            this.authorTop = data.top
          })
          .exec()
      }, 500)
    },

    back () {
      uni.navigateBack({
        delta: '1'
      })
    },
    goToGoodsDetail (id) {
      uni.navigateTo({
        url: '/travel/scenic-spot/details?id=' + id
      })
    },
    // 预览大图
    previewImg (url) {
      if (typeof url == 'string') {
        url = url.split()
      }
      uni.previewImage({
        urls: url,
        fail () {
          this.showToast('图片预览失败，请稍后再试', 'error')
        }
      })
    }
  },
  onPageScroll (e) {
    if (e.scrollTop > this.authorTop) {
      this.isReading = true
    } else {
      this.isReading = false
    }
    this.scrollTop = e.scrollTop
  },
  onShareAppMessage (res) {
    return {}
  },
  onNavigationBarButtonTap () {
    this.shareShow = true
  }
}
</script>

<style lang="scss">
.spellDetail {
  .lists {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 36rpx;
    border-bottom: 2rpx dashed #e1e1e1;
    .left {
      .list {
        display: flex;
        margin-top: 40rpx;
        .black {
          width: 44rpx;
          height: 44rpx;
          margin-right: 20rpx;
        }
        > text {
          font-family: GenJyuuGothic-Regular;
          font-size: 32rpx;
          font-weight: normal;
          line-height: 44rpx;
          letter-spacing: 0rpx;
          color: #202020;
          margin-right: 20rpx;
        }
      }
    }
  }
  .u-flex-col {
    display: flex;
    flex-direction: column;
  }
  .u-flex {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .u-row-between {
    display: flex;
    justify-content: space-between;
  }
  .signUp {
    padding: 20rpx;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    .confirmList {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 10rpx 0;
      width: 160rpx;
      image {
        width: 120rpx;
        height: 120rpx;
        border-radius: 50%;
        position: relative;
        left: 10rpx;
      }
      .cor {
        background: #5cc9f5 !important;
      }
      .confirm {
        width: 140rpx;
        height: 50rpx;
        background: #dddddd;
        color: #ffffff;
        border-radius: 10rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10rpx;
      }
    }
  }
}

.top {
  position: fixed;
  top: 0;
  width: 750rpx;
  z-index: 100;

  .back {
    justify-content: center;
    margin-left: 16rpx;
    padding-right: 4rpx;
    width: 60rpx;
    height: 60rpx;
    border-radius: 30rpx;
    background-color: rgba($color: #000000, $alpha: 0.2);
  }
  .author {
    image {
      width: 60rpx;
      height: 60rpx;
      border-radius: 30rpx;
      margin: 0 20rpx;
    }
    .nickname {
      font-size: 28rpx;
      font-weight: bold;
    }
  }
}
.top-img {
  width: 750rpx;
  image {
    width: inherit;
    height: inherit;
  }
}
.swiper {
  position: relative;
  width: 750rpx;
  height: 750rpx;
  swiper {
    width: 100%;
    height: 100%;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .count {
    position: absolute;
    bottom: 54rpx;
    right: 0;
    padding: 0 10rpx;
    width: 80rpx;
    height: 36rpx;
    line-height: 36rpx;
    border-radius: 18rpx 0 0 18rpx;
    font-size: 20rpx;
    text-align: center;
    color: #ffffff;
    background-color: rgba(0, 0, 0, 0.2);
    span:nth-child(1) {
      font-size: 26rpx;
      margin-left: 4rpx;
    }
    span:nth-child(2) {
      margin: 0 4rpx;
    }
  }
}
.content {
  padding: 0 30rpx;
  .author {
    padding: 30rpx 0;
    image {
      width: 80rpx;
      height: 80rpx;
      border-radius: 40rpx;
      margin-right: 22rpx;
    }
    .nickname {
      font-size: 28rpx;
      font-weight: bold;
    }
    .attention {
      margin-left: auto;
      justify-content: center;
      width: 128rpx;
      height: 56rpx;
      color: #fff;
      font-size: 24rpx;
      border-radius: 28rpx;
      background: linear-gradient(to right, #ffba34, #ff9a40);
      text {
        margin-left: 6rpx;
      }
      &:active {
        opacity: 0.8;
      }
    }
    .attentioned {
      color: #b3b1b6 !important;
      background: #f8f6f9 !important;
    }
  }
  .title {
    margin: 10rpx 0 20rpx 0;
    font-size: 40rpx;
    font-weight: bold;
  }
  .rich-text {
    font-size: 30rpx;
    margin-bottom: 20rpx;
    line-height: 54rpx;
    .text {
      display: inline-block;
      background-color: transparent;
      margin: 40rpx 0;
      line-height: 60rpx;
    }
    .img {
      width: 100%;
      border-radius: 18rpx;
    } // text-indent: 1.2em;
  }
  .basic-text {
    font-size: 30rpx;
    margin-bottom: 20rpx;
    text {
      display: inline-block;
      padding: 16rpx 0;
      line-height: 54rpx;
    }
  }
  .video-box {
    position: relative;
    margin-bottom: 30rpx;
    width: 100%;
    height: 452rpx;
    border-radius: 16rpx;
    overflow: hidden;
    video {
      width: 100%;
      height: 100%;
    }
    .poster,
    .video-mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .poster {
      z-index: 1;
    }
    .video-mask {
      background-color: rgba($color: #000000, $alpha: 0.2);
      z-index: 2;
      .play-btn {
        image {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 88rpx;
          height: 88rpx;
          transform: translate(-50%, -50%);
          z-index: 2;
        }
      }
    }
  }
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
      width: 440rpx;
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
        color: #ff1b1b;
        border: 2rpx solid rgba($color: #ff1b1b, $alpha: 0.5);
        border-radius: 10rpx;
      }
    }
    .price {
      margin-top: auto;
      width: 440rpx;
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
        background-color: #ff1b1b;
        &:active {
          opacity: 0.8;
        }
      }
    }
  }
}
.topic {
  display: inline-block;
  margin: 30rpx;
  padding: 4rpx 18rpx;
  width: auto;
  font-size: 26rpx;
  color: #986c2a;
  background-color: #fff5d5;
  border-radius: 6rpx;
  .sign {
    margin-right: 10rpx;
  }
}
.card {
  padding: 32rpx 28rpx;
  .head {
    font-size: 28rpx;
    color: #292a2c;
    font-weight: bold;
  }
}
.comment {
  .edit {
    margin-left: auto;
    color: #996b3d;
    text {
      margin-left: 6rpx;
    }
  }
  .no-comment {
    align-items: center;
    margin: 20rpx 0;
    font-size: 24rpx;
    color: #9d9fa5;
    image {
      width: 200rpx;
      height: 200rpx;
    }
  }
  .have-comment {
    .item-box {
      max-height: 520rpx;
      overflow: hidden;
    }
    .item {
      padding: 32rpx 0;
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
    .all {
      justify-content: center;
      margin-top: 20rpx;
      text-align: center;
      font-weight: bold;
      color: #956535;
    }
  }
}
.left {
  padding: 0 14rpx 0 0;
}
.right {
  padding: 0 0 0 14rpx;
}
.recommend {
  background-color: #fdfdfd;
  .content {
    margin-top: 20rpx;
    .item {
      width: 100%;
      padding-bottom: 20rpx;
      margin-bottom: 30rpx;
      background-color: #fff;
      border-radius: 12rpx;
      border: 1rpx solid #f3f3f3;
      overflow: hidden;
      .img {
        width: 100%;
        border-radius: 12rpx 12rpx 0 0;
      }
      .title {
        font-size: 24rpx;
        color: #333;
        font-weight: bold;
        padding: 10rpx 20rpx;
      }
      .author {
        margin-top: 20rpx;
        padding: 0 20rpx;
        color: #666;
        font-size: 22rpx;
        image {
          width: 36rpx;
          height: 36rpx;
          min-width: 36rpx;
          border-radius: 18rpx;
          margin-right: 12rpx;
        }
        .name {
          max-width: 160rpx;
        }
        .reading {
          margin-left: auto;
        }
      }
    }
  }
}
.bottom-menu {
  position: fixed;
  bottom: 0;
  height: 130rpx;
  width: 750rpx;
  padding-bottom: 30rpx;
  background-color: #fff;
  box-shadow: 0rpx -2rpx 6rpx rgba($color: #eee, $alpha: 0.6);
  z-index: 100;
  .function {
    flex: 1;
    height: 100%; // background-color: salmon;
    .item {
      position: relative;
      flex: 1;
      height: 100%;
      justify-content: center;
      .icon-box {
        position: relative;
      }
      image {
        width: 48rpx;
        height: 48rpx;
      }
      text {
        position: absolute;
        top: -12rpx;
        left: 46rpx;
        font-size: 26rpx;
        color: #292a2d;
      }
      .share-btn {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 101;
        opacity: 0;
      }
    }
  }
  .goods-box {
    width: 40%;
    height: 100%;
    padding: 16rpx 32rpx; // background-color: skyblue;
    .btn {
      justify-content: space-between;
      width: 100%;
      height: 100%;
      padding: 14rpx 32rpx;
      border-radius: 60rpx;
      background: linear-gradient(to right, #fb7527, #e65301);
      .goods-count {
        position: relative;
        width: 40rpx;
        height: 40rpx;
        text-align: center;
        display: flex;
        align-items: center;

        image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
        text {
          position: relative;
          line-height: 46rpx;
          font-size: 24rpx;
          font-weight: bold;
          color: #fff;
          z-index: 1;
        }
      }
      .text {
        color: #fff;
        font-size: 28rpx;
        font-weight: bold;
      }
    }
  }
}
.goods-pop,
.comment-pop {
  position: relative;
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
}
.comment-pop {
  .no-comment {
    align-items: center;
    margin: 200rpx 0;
    font-size: 24rpx;
    color: #9d9fa5;
    image {
      width: 200rpx;
      height: 200rpx;
    }
  }
  .comment-scroll {
    height: 1010rpx;
    .item {
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
  .input-box {
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    padding: 26rpx 28rpx 50rpx 26rpx;
    width: 100%;
    height: 145rpx;
    border-top: 1rpx solid #f3f3f3;
    input {
      width: 86%;
      height: 100%;
      padding-left: 20rpx;
      border-radius: 8rpx;
      background-color: #eee;
    }
    .send {
      color: #956535;
      font-weight: bold;
      font-size: 28rpx;
    }
  }
}
.goods-pop {
  .title {
    border-bottom: none;
  }
  .goods-scroll {
    height: 710rpx;
    .scroll-wrap {
      padding: 0 24rpx 0;
    }
  }
}
.container {
  .top-img {
    height: 560rpx;
  }
  .box {
    padding: 0 30rpx;
    .author {
      margin: 30rpx 0;
      .avatar {
        width: 80rpx;
        height: 80rpx;
        margin-right: 20rpx;
      }
      .nickname {
        height: 42rpx;
        width: 200rpx;
      }
    }
    .title {
      margin: 30rpx 0;
      height: 64rpx;
      width: 80%;
    }
    .text {
      margin: 30rpx 0 300rpx;
      view {
        margin: 50rpx 0;
        height: 50rpx;
      }
    }
  }
}
.u-back-top {
  image {
    width: 80rpx;
    height: 80rpx;
  }
}
</style>
