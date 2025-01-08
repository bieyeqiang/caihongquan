<!--模板-->
<template>
  <view class="mianjuList">
    <mescroll-uni style="width: 100%; height: 100%" top="0" bottom="230" :fixed="true" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @emptyclick="emptyClick" @init="mescrollInit">
      <view class="userList" v-for="(item, index) of nearbyList" :key="index" v-if="item.avatar">
        <view class="userBg" @tap="tab_name(item._id)">
          <view class="name">
            <u--image width="140rpx" height="140rpx" radius="50%" loadingIcon="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/lazy/goods-lazy-load.png" :src="item.secret || item.avatar" :lazy-load="true" mode="aspectFill"></u--image>
            <view class="num">
              <text class="iconfont">&#xe632;</text>
              <text v-if="item.photoWall">{{ item.photoWall.length }}</text>
            </view>
          </view>
          <view class="userText">
            <view v-if="item.nickname">
              {{ item.nickname }}
              <image class="zwyHeight" src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/appIcon/j.png"></image>
            </view>
            <view class="age">
              <text v-if="item.currentCityStr">{{ item.currentCityStr }}</text>
              <text v-if="item.gender != 1 && item.gender != 2">保密</text>
              <image v-if="item.gender == 1" src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/man.png" mode="" />
              <image v-if="item.gender == 2" src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/wuman.png" mode="" />
              <text v-if="item.birthdayText">
                {{ item.birthdayText }}岁
                <text v-if="item.constellation">·{{ item.constellation }}</text>
              </text>
              <text v-if="!item.birthdayText && item.birthday">
                {{ getAges(item.birthday) }}岁
                <text v-if="item.constellation">·{{ item.constellation }}</text>
              </text>
              <text v-if="item.homeCity">{{ item.homeCity.province.label }}</text>
              <text>{{ item.emotion || '单身' }}</text>
              <text v-if="item.job">{{ item.job }}</text>
            </view>
            <view>
              <text style="background: #edeff0; color: #788385" v-if="item.distance != null">{{ item.distance | distance }}</text>
              <text style="color: #61ca77; background: #dff3e7" v-if="timeLog(item.last_login_date ? item.last_login_date : item.register_date) != ''">{{ timeLog(item.last_login_date ? item.last_login_date : item.register_date) }}</text>
              <!-- #ifdef APP-PLUS || H5 -->
              <template v-if="item.label">
                <text style="background: #edeff0; color: #788385" v-for="(list, num) of item.label" :key="num" v-if="num < 3">{{ list }}</text>
              </template>
              <!-- #endif -->
              <!-- #ifdef MP-WEIXIN -->
              <text style="background: #edeff0; color: #788385" v-for="(list, num) of item.label" :key="num" v-if="num < 3">{{ list }}</text>
              <!-- #endif -->
              <text style="background: #edeff0; color: #788385" v-if="!item.label">推荐</text>
            </view>
          </view>
        </view>
      </view>
    </mescroll-uni>
  </view>
</template>

<script>
import MescrollUni from '@/components/mescroll-uni/mescroll-uni.vue'
export default {
  components: {
    MescrollUni
  },
  props: {
    sexType: '',
    tabIndex: '',
    index: ''
  },
  data() {
    return {
      uid: '',
      nearbyList: [],
      latitude: '',
      longitude: '',
      downOption: {
        auto: false // 不自动加载
      },
      mescroll: null,
      upOption: {
        auto: false, // 不自动加载
        page: {
          num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
          size: 25 // 每页数据的数量
        },
        noMoreSize: 2, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
        empty: {
          tip: '~ 空空如也 ~', // 提示
          btnText: '去看看'
        }
      },
      isInit: false
    }
  },
  computed: {},
  watch: {
    tabIndex(tabIndex) {
      if (tabIndex == this.index) {
        if (!this.isInit) {
          this.mescroll.triggerDownScroll()
          this.isInit = true
        }
      }
    },
    sexType(index) {
      this.isInit = false
      if (this.tabIndex == this.index) {
        this.$nextTick(() => {
          this.mescroll.triggerDownScroll()
          this.isInit = true
        })
      }
    }
  },
  methods: {
    getList() {
      this.mescroll.triggerDownScroll()
      this.isInit = true
    },
    getAges(str) {
      if (!str) return
      var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/)
      if (r == null) return false
      var d = new Date(r[1], r[3] - 1, r[4])
      if (d.getFullYear() == r[1] && d.getMonth() + 1 == r[3] && d.getDate() == r[4]) {
        var Y = new Date().getFullYear()
        return Y - r[1]
      }
      return '输入的日期格式错误！'
    },
    // 距离时间
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
    previewImage(e, img) {
      let vm = this
      vm.imageList = img
      var current = e.target.dataset.src
      uni.previewImage({
        current: current,
        urls: vm.imageList
      })
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
    /*下拉刷新的回调 */
    downCallback(mescroll) {
      // 这里加载你想下拉刷新的数据, 比如刷新轮播数据
      // 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
      mescroll.resetUpScroll()
    },
    /*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
    async upCallback(mescroll) {
      let res = await this.$request('nearby', 'maskUser', {
        skip: (mescroll.num - 1) * mescroll.size,
        limit: mescroll.size,
        type: this.tabIndex,
        gender: this.$store.state.sexType,
        latitude: this.$store.state.location.latitude,
        longitude: this.$store.state.location.longitude
      })

      if (res.data) {
        if (mescroll.num == 1) this.nearbyList = [] //第一页清空
        this.nearbyList = this.nearbyList.concat(res.data) //追加新数据
        mescroll.endSuccess(res.data.length) //结束加载状态
      } else {
        mescroll.endErr() //失败因此
      }
    },
    //点击空布局按钮的回调
    emptyClick() {
      uni.showToast({
        title: '点击了按钮,具体逻辑自行实现'
      })
    }
  },
  mounted() {
    if (this.index == 2 && !this.isInit) {
      this.$nextTick(() => {
        this.mescroll.triggerDownScroll()
        this.isInit = true
      })
    }
  }
}
</script>

<!--css样式-->
<style lang="scss" scoped>
.mianjuList {
  .dynNearcard-header-img {
    width: 150rpx;
    height: 150rpx;
    margin-right: 30rpx;
    z-index: 9999;
    display: inline-block;
  }
  .userBg {
    display: flex;
    padding: 20rpx 30rpx;
    border-bottom: 1rpx solid #f5f5f5;
    .name {
      width: 150rpx;
      height: 150rpx;
      margin-right: 30rpx;
      position: relative;
      .num {
        background: rgba(0, 0, 0, 0.7);
        padding: 5rpx 13rpx;
        position: absolute;
        left: 0;
        bottom: 0;
        border-radius: 0 15rpx 0 20rpx;
        z-index: 99999;
        text {
          color: #fff;
          font-size: 24rpx;
          margin-right: 5rpx;
        }
      }
    }
    .userText {
      color: #666;
      font-size: 22rpx;
      display: flex;
      padding: 10rpx 0;
      flex-direction: column;
      justify-content: space-between;
      view {
        font-size: 28rpx;
        font-weight: bold;
        color: #333;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
 
        image {
          width: 30rpx;
          height: 30rpx;
        }
      }
      .age {
        display: flex;
        align-items: center;
        > text {
          background: #edebf4 !important;
          color: #867b98 !important;
          font-weight: 300;
          font-size: 21rpx;
        }
        image {
          width: 25rpx;
          height: 25rpx;
          margin-right: 10rpx;
        }
      }
      > view {
        > text {
          background: #edeef0;
          padding: 6rpx 15rpx;
          border-radius: 50rpx;
          font-weight: 300;
          margin-right: 10rpx;
          font-size: 21rpx;
                  margin-bottom: 10rpx;
        }
      }
    }
  }
}
</style>
