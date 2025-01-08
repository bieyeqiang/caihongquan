<!--
 * @Author: Jin Biao
 * @Date: 2022-03-27 21:09:39
 * @LastEditTime: 2022-10-22 15:14:02
 * @Description:  用户匹配卡片
-->
<template>
  <view class="card">
    <view class="title">推荐</view>
    <tantan :list="dataList" @onChange="change" @onClickImage="clickImage"></tantan>
  </view>
</template>

<script>
import tantan from './dgex-tantan/dgex-tantan.vue'
export default {
  components: {
    tantan
  },
  data() {
    return {
      list: [],
      dataList: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      let vm = this
      let dataGroup = []
      // 明显推荐
      const res = await this.$request('nearby', 'randomUser', {
        gender: this.$store.state.sexType,
        size: 30
      })
      if (res) {
        for (let item of res.data) {
          if (item.avatar) {
            let src = ''
            if (item.photoWall && item.photoWall.length > 0) {
              src = item.photoWall[0]
            } else {
              src = item.avatar
            }
            dataGroup.push({
              image: src,
              sex: item.gender,
              address:
                '(' + vm.timeLog(item.last_login_date ? item.last_login_date : item.register_date) + ' 附近推荐)',
              title: item.nickname,
              desc: item.constellation,
              number: '照片',
              old: item.birthdayText,
              emotionStr: item.emotion,
              uid: item._id,
              tags: item.label
            })
          }
        }
        vm.dataList = [...vm.dataList, ...dataGroup]
      }
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
    change(data) {
      this.getList()
    },
    clickImage(data) {
      uni.navigateTo({
        url: '/pagesA/service/homePage/homePage?code=' + data.currentItem.uid
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .card{
    position:fixed;
.title{
  font-size: 40rpx;
  font-weight: bold;
  color: #333;
  padding: 100rpx 0 50rpx 50rpx;
}
  }
</style>