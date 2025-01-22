<template>
  <view class="app">
    <z-paging ref="paging" v-model="list" show-refresher-update-time @query="loadList" width="100%">
      <view class="item b-b" :class="{ income: item.money > 0 }" v-for="(item, index) in list" :key="index">
        <text
            class="jw-icon"
            :class="
            item.type === 'recharge'
              ? 'icon-chongzhi'
              : item.type === 'withdraw'
              ? 'icon-tixian1'
              : 'icon-zhangdanmingxi01'
          "
        ></text>
        <view class="left column">
          <text class="tit clamp">{{ item.title }}</text>
          <text class="time">{{ item.add_time | friendDate('y-m-d h:i:s') }}</text>
        </view>
        <text v-if="item.money > 0" class="price">+</text>
        <!-- 余额 -->
        <text class="price" v-if="item.order_type == 'money'">{{ item.money | price }}元</text>
        <!-- 币 -->
        <text class="price" v-if="item.order_type == 'currency'">{{ item.currency }}个币</text>
      </view>
    </z-paging>

    <jw-loading v-if="isLoading" :type="2"></jw-loading>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  methods: {
    async loadList(pageNo, pageSize) {
      const res = await this.$request('payment', 'getMoneyLog', {
        offset: (pageNo - 1) * pageSize,
        limit: pageSize
      })
      const curList = res.data
      if (res.data) {
        this.$refs.paging.complete(curList)
      } else {
        this.$refs.paging.complete(false)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.item {
  display: flex;
  padding: 30rpx 30rpx 30rpx 24rpx;
  background-color: #fff;

  &:after {
    left: 30rpx;
    border-color: #e8e8e8;
  }

  .jw-icon {
    flex-shrink: 0;
    width: 72rpx;
    font-size: 52rpx;
    transform: translateY(-6rpx);
  }

  .icon-tixian1 {
    color: #fd6663;
  }

  .icon-zhangdanmingxi01 {
    color: #ff893a;
  }

  .icon-chongzhi {
    color: #39c585;
  }

  .left {
    flex: 1;
    overflow: hidden;
  }

  .tit {
    font-size: 30rpx;
    color: #333;
    line-height: 1.4;
    margin-bottom: 20rpx;
  }

  .time {
    font-size: 24rpx;
    color: #999;
  }

  .price {
    font-size: 32rpx;
    color: $color-price;
    font-weight: 700;
  }

  &.income {
    .price {
      color: #00c700;
    }

    .icon-zhangdanmingxi01 {
      color: #39c585;
    }
  }
}
</style>
