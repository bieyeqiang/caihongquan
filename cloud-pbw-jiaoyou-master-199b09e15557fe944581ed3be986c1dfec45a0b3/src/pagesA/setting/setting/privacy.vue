<!--模板-->
<template>
  <view>
    <u-cell-group>
      <u-cell title="清除自己位置" isLink @click="cleaeMap"></u-cell>
      <u-cell title="更换地图头像" isLink @click="goPage('/pagesA/login/mask')"></u-cell>
    </u-cell-group>
  </view>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      map_auto: false,
      shielding: false
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    // 清除自己位置
    async cleaeMap() {
      uni.showModal({
        title: '提示',
        content: '确定要清除自己的位置吗？',
        success: async (res) => {
          if (res.confirm) {
            uni.showLoading({
              title: '清除中...'
            })
            const res = await this.$request('user', 'clearMapUse', {})
            if (res.status == 1) {
              uni.navigateBack()
              this.msg('清除成功')
            } else {
              uni.showToast({
                title: res.data.msg,
                icon: 'none'
              })
            }
          }
        }
      })
    },
    shieldingBtn(e) {
      uni.setStorageSync('shielding', e.target.value + '')
      uni.showToast({
        title: '已拒绝发现其他人',
        icon: 'none',
        duration: 2000
      })
    },
    automatic(e) {
      uni.setStorageSync('map_auto', e.target.value + '')
      uni.showToast({
        title: '已拒绝更新位置',
        icon: 'none',
        duration: 2000
      })
    }
  },
  onShow() {
    const mapData = uni.getStorageSync('map_auto')
    const shieldingData = uni.getStorageSync('shielding')
    if (mapData != '') {
      this.map_auto = JSON.parse(mapData)
    }
    if (shieldingData != '') {
      this.shielding = JSON.parse(shieldingData)
    }
  }
}
</script>

<!--css样式-->
<style lang="scss" scoped>
.font_icon {
  display: flex;
  justify-content: left;
}
.font_icon > span {
  padding-right: 10px;
}
</style>
