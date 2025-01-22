<template>
  <view class="vipOrder">
    <view class="list" v-for="(item, index) of list" :key="index">
      <view class="time">{{ item.add_time | friendDate }}</view>
      <view class="type">{{ item.vip_type }}</view>
      <view class="type">{{ item.vip_historyData.long }}</view>
      <view class="price">￥{{ item.vip_historyData.price }}元</view>
      <view class="price">{{ item.status == 1 ? '成功' : '取消' }}</view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  onLoad () {
    this.getList()
  },
  methods: {
    async getList () {
      const res = await this.$request('vipOrder', 'getVipOrderList', {})
      this.list = res.data
    }
  }
}
</script>

<style lang="scss" scoped>
.vipOrder {
  padding: 50rpx;
  .list {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20rpx;
    background: #f5f5f5;
    padding: 20rpx;
    view {
      font-size: 37rpx;
    }
  }
}
</style>
