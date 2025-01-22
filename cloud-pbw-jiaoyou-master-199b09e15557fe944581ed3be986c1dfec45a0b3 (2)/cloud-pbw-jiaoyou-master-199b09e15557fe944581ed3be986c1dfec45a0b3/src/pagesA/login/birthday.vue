<template>
  <view>
    <view class="setUp">
      <view class="title">请完善生日</view>
      <br />
      <view class="sr" @tap="timeShow = true">{{ dateBirthStr }}</view>
      <view class="sr" @tap="timeShow = true">{{ constellationStr }}</view>
      <br />
      <br />
      <view class="btncor">
        <u-button type="primary" ripple shape="circle" @click="next"
          >下一步</u-button
        >
      </view>
    </view>
    <u-datetime-picker
      :show="timeShow"
      @cancel="timeShow = false"
      @close="timeShow = false"
      mode="date"
      v-model="timeDate"
      closeOnClickOverlay
      @confirm="timePick"
      :minDate="-28800000"
    ></u-datetime-picker>
  </view>
</template>

<script>
import { date } from '@/common/js/util.js'
export default {
  data () {
    return {
      timeShow: false,
      dateBirthStr: '请选择',
      constellationStr: '请选择',
      timeDate: 631123200000
    }
  },
  methods: {
    async next () {
      if (this.dateBirthStr == '请选择' || this.constellationStr == '请选择') {
        uni.showToast({
          title: '请选择出生日期',
          icon: 'none',
          duration: 3000
        })
        return
      }
      uni.setStorageSync('login_dateBirthStr', this.dateBirthStr)
      uni.setStorageSync('login_constellation', this.constellationStr)
      uni.navigateTo({
        url: '/pagesA/login/photoWall'
      })
    },
    timePick (val) {
      console.log(val)
      this.timeShow = false
      const time = date(val.value, 'y-m-d')
      this.dateBirthStr = time
      this.constellationStr = this.getAstro(
        time.split('-')[1],
        time.split('-')[2]
      )
    },
    getAstro (m, d) {
      return (
        '魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯'.substr(
          m * 2 - (d < '102223444433'.charAt(m - 1) - -19) * 2,
          2
        ) + '座'
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.setUp {
  padding-top: 200rpx;
  text-align: center;
  margin: 20rpx 15%;
  .sex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 50rpx 0;
    image {
      width: 150rpx;
      height: 150rpx;
      border-radius: 50%;
      border: 1px solid #999999;
      margin: 50rpx;
      background: #f1f1f1;
    }
    .cor {
      background: $fontColorB;
      border: 1px solid $fontColorB;
    }
  }
  .title {
    font-size: 50rpx;
    font-weight: bold;
    margin: 20rpx 0;
  }
  .sr {
    font-size: 50rpx;
    font-weight: bold;
    margin: 40rpx 0;
    background: #f1f1f1;
    height: 80rpx;
    line-height: 80rpx;
  }
  .row {
    background: #f1f1f1;
    margin: 50rpx 0;
    border-radius: 40rpx;
  }
  .btncor {
    width: 60%;
    margin: 30rpx auto;
  }
}
</style>
