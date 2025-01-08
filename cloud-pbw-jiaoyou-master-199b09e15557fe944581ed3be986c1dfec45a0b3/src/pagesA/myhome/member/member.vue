<template>
  <view class="service">
    <view class="card">
      <image class="img" src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/travel/vip/card.png"></image>
      <view class="info">
        <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/travel/vip/head.png"></image>
        <view class="name">
          <text class="name">{{ userInfo.nickname }}</text>
          <text class="vip" v-if="vipStatus.vip_status == 0 && vipStatus.svip_status == 0">您还不是会员哦~</text>
          <text class="vip" v-if="vipStatus.vip_status == 1">VIP会员 到期时间：{{ vipStatus.vip_time | friendDate }}</text>
          <text class="vip" v-if="vipStatus.svip_status == 1">SVIP会员 到期时间：{{ vipStatus.svip_time | friendDate }}</text>
        </view>
      </view>
    </view>
    <view class="cont">
      <view class="title">
        <view v-for="(item, index) in title" :key="index" @click="getVipInfo(index, item.type)">
          <image :src="num == index ? imgAct : img"></image>
          <text :class="num == index ? 'active' : ''">{{ item.text }}</text>
          <view class="line" v-if="num == index"></view>
        </view>
      </view>
      <view class="vip">
        <view class="meal">
          <view v-for="(item, index) in vipList" :key="index" :class="vipNum == index ? 'item itemAct' : 'item'" @click="selectVip(index)">
            <text>{{ item.long }}</text>
            <text>平均每月¥{{ getAverage(item) }}</text>
            <view class="money">
              <text>¥{{ item.price }}</text>
              <text>¥{{ item.orginPrice }}</text>
            </view>
          </view>
        </view>
        <!-- <view class="tip">
          <view class="icon">
            <view></view>
          </view>
          <text>到期后自动续费一年 可随时取消</text>
        </view> -->
        <view class="privilege" v-if="svipPrivilege">
          <swiper class="swiper" :current="current" @change="change">
            <swiper-item v-for="index in svipCurrent" class="list">
              <view v-for="(item, i) in svipPrivilege" :key="i">
                <image :src="item.image"></image>
                <text>SVIP</text>
                <text>{{ item.title }}</text>
              </view>
            </swiper-item>
          </swiper>
          <view class="indicator">
            <view v-for="index in svipCurrent" :key="index" :class="currentNum == index - 1 ? 'active' : ''"></view>
          </view>
        </view>
        <view class="lists" v-if="vipPrivilege">
          <swiper class="swiper" :current="lists" @change="changeList">
            <swiper-item v-for="index in vipCurrent" class="item">
              <view v-for="(item, i) in vipPrivilege" :key="i">
                <image :src="item.image"></image>
                <text>{{ item.title }}</text>
              </view>
            </swiper-item>
          </swiper>
          <view class="indicator">
            <view v-for="index in vipCurrent" :key="index" :class="listsNum == index - 1 ? 'active' : ''"></view>
          </view>
        </view>
      </view>
      <view class="read">
        <text>温馨提示：</text>
        <view>
          <text>确认购买前请仔细阅读</text>
          <text>《会员服务条款》、《会员续费条款》</text>
          <text>，如有任何问题，可联系官方客服，点击购买后即视为您已同意前述协议。</text>
        </view>
      </view>
      <view class="pay" @click="addVip" v-if="money">
        <text>{{ money.type }}会员（{{ money.price }}/{{ money.long }}）立即支付</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      vipList: [],
      vipPrivilege: [], //VIP特权列表
      svipPrivilege: [], //SVIP特权列表
      num: 0,
      vipNum: 0, //选择会员
      img: 'https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/travel/vip/icon1.png',
      imgAct: 'https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/travel/vip/icon2.png',
      title: [
        {
          type: 'VIP',
          text: 'VIP会员'
        },
        {
          type: 'SVIP',
          text: 'SVIP超级会员'
        }
      ],
      money: '',
      // svip特权切换
      svipCurrent: 1,
      current: 0,
      currentNum: 0,
      svipLimit: 4,
      svip: 1,
      // vip特权切换
      vipCurrent: 1,
      listsNum: 0,
      lists: 0,
      vipLimit: 8,
      vip: 1,
      vipStatus: '',
      userInfo: ''
    }
  },
  computed: {},
  async onLoad() {
    this.getVipInfo(this.num, this.title[0].type)
    this.getVipPrivilege()
    this.getSvipPrivilege()
    // 获取会员状态
    this.getVipStatus()
    this.getUserInfo()
  },
  methods: {
    // 获取用户信息
    async getUserInfo() {
      const res = await this.$request('user', 'get')
      this.userInfo = res.data
    },
    async getVipStatus() {
      const vip = await this.$request('vipOrder', 'getVipStatus', {})
      this.vipStatus = vip
    },
    async addVip() {
      const res = await this.$request('vipOrder', 'addVipOrder', {
        vip_type: this.num == 0 ? 'vip' : 'svip',
        vip_historyData: this.vipList[this.vipNum],
        vipId: this.vipList[this.vipNum]._id
      })
      if (res.data.order_id) {
        let order = {
          order_id: res.data.order_id,
          pay_price: this.vipList[this.vipNum].price,
          sourcePage: 'vipOrder'
        }
        this.goPage('/pagesA/wallet/pay?order_type=3&data=' + JSON.stringify(order), true, 'redirectTo')
      }
    },
    // 获取VIP
    async getVipInfo(index, type) {
      this.num = index
      this.vipNum = 0
      const res = await this.$request('member', 'getVipList', {
        type: type
      })
      this.vipList = res.data
      this.money = this.vipList[0]
    },
    // 获取VIP的特权
    async getVipPrivilege() {
      const { vip, vipLimit } = this
      const sendData = {
        offset: (vip - 1) * vipLimit,
        limit: vipLimit,
        type: 'VIP'
      }
      const vipList = await this.$request('member', 'getPrivilege', sendData)
      this.vipPrivilege = vipList.data
      this.vipCurrent = Math.ceil(vipList.affectedDocs / vipLimit)
    },
    // 获取VIP的特权
    async getSvipPrivilege() {
      const { svip, svipLimit } = this
      const sendData = {
        offset: (svip - 1) * svipLimit,
        limit: svipLimit,
        type: 'SVIP'
      }
      const svipList = await this.$request('member', 'getPrivilege', sendData)
      this.svipPrivilege = svipList.data
      this.svipCurrent = Math.ceil(svipList.affectedDocs / svipLimit)
    },
    // 选择VIP
    selectVip(index) {
      this.vipNum = index
      this.money = this.vipList[index]
    },
    // 平均每月多少钱
    getAverage(item) {
      if (item.long === '包月') {
        if (Number.isInteger(item.price)) {
          return item.price
        } else {
          return Math.floor(item.price * 100) / 100
        }
      } else if (item.long === '包季') {
        if (Number.isInteger(item.price / 3)) {
          return item.price / 3
        } else {
          return Math.floor((item.price / 3) * 100) / 100
        }
      } else if (item.long === '包年') {
        if (Number.isInteger(item.price / 12)) {
          return item.price / 12
        } else {
          return Math.floor((item.price / 12) * 100) / 100
        }
      }
    },
    // 获取SVIP的特权切换
    change(event) {
      this.current = event.detail.current
      this.currentNum = this.current
      this.svip = this.current + 1
      this.svipPrivilege = []
      this.getSvipPrivilege()
    },
    // 获取VIP的特权切换
    changeList(event) {
      this.lists = event.detail.current
      this.listsNum = this.lists
      this.vip = this.lists + 1
      this.vipPrivilege = []
      this.getVipPrivilege()
    }
  },
  onNavigationBarButtonTap() {
    this.goPage('/pagesA/myhome/member/memberOrder')
  }
}
</script>

<style lang="scss" scoped>
.service {
  & text {
    font-family: PingFangSC-Regular, PingFang SC;
  }
  .card {
    width: 90%;
    margin: auto;
    height: 320rpx;
    overflow: hidden;
    display: flex;
    position: relative;
    z-index: 5;
    border-radius: 0 0 50% 50%/0 0 5% 5%;
    .img {
      width: 100%;
      height: 366rpx;
    }
    .info {
      display: flex;
      align-items: center;
      position: absolute;
      left: 40rpx;
      top: 60rpx;
      > image {
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
        margin-right: 24rpx;
      }
      .name {
        display: flex;
        flex-direction: column;
        .name {
          font-size: 28rpx;
          color: #f4c87d;
          margin-bottom: 10rpx;
        }
        .vip {
          font-size: 20rpx;
          color: #af9a74;
          line-height: 28rpx;
          margin-bottom: 10rpx;
        }
      }
    }
  }
  .cont {
    width: 100%;
    margin-top: -16rpx;
    background: #ffffff;
    box-shadow: 0rpx 0rpx 16rpx 0rpx rgba(0, 0, 0, 0.12);
    padding-bottom: 200rpx;
    .title {
      height: 84rpx;
      display: flex;
      margin-top: 20rpx;
      > view {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        > image {
          width: 50rpx;
          height: 50rpx;
          z-index: 3;
        }
        > text {
          font-size: 24rpx;
          font-weight: 600;
          color: #352800;
          line-height: 34rpx;
          z-index: 3;
        }
        .active {
          color: #b45600;
        }
        .line {
          width: 100%;
          height: 84rpx;
          background: linear-gradient(180deg, #fff0d3 60%, #fff8eb 40%);
          filter: blur(10rpx);
          position: absolute;
        }
      }
    }
    .vip {
      padding: 0 5%;
      .meal {
        margin-top: 36rpx;
        display: flex;
        .item {
          width: 210rpx;
          height: 248rpx;
          margin-right: 24rpx;
          background: 100% 100% url('https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/travel/vip/month.png');
          background-size: cover;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly;

          > text:nth-child(1) {
            font-size: 24rpx;
            font-weight: 600;
            color: #462201;
            line-height: 34rpx;
          }
          > text:nth-child(2) {
            font-size: 24rpx;
            color: #666666;
            line-height: 34rpx;
          }
          .money {
            display: flex;
            align-items: center;
            > text:nth-child(1) {
              font-size: 40rpx;
              font-weight: 600;
              color: #b45600;
              line-height: 34rpx;
            }
            > text:nth-child(2) {
              font-size: 24rpx;
              color: #e9b88c;
              line-height: 34rpx;
              text-decoration: line-through;
              margin-left: 14rpx;
            }
          }
          &:last-child {
            margin-right: 0rpx;
          }
        }
        .itemAct {
          background: 100% 100% url('https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/travel/vip/year.png');
          > text:nth-child(2) {
            color: #b45600;
          }
        }
      }
      .tip {
        display: flex;
        margin: 26rpx 0 50rpx 32rpx;
        .icon {
          width: 26rpx;
          height: 26rpx;
          border-radius: 50%;
          border: 2rpx solid #e82626;
          display: flex;
          justify-content: center;
          align-items: center;
          > view {
            width: 16rpx;
            height: 16rpx;
            border-radius: 50%;
            background: #e82626;
          }
        }
        > text {
          font-size: 24rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #999999;
          line-height: 34rpx;
          margin-left: 24rpx;
        }
      }
      .privilege {
        width: 100%;
        height: 258rpx;
        background: #ffffff;
        box-shadow: 0rpx 0rpx 12rpx 2rpx rgba(0, 0, 0, 0.08);
        border-radius: 10rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-top: 20px;
        .swiper {
          height: 182rpx;
        }
        .list {
          display: flex;
          align-items: center;
          > view {
            width: 25%;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            & image {
              width: 80rpx;
              height: 80rpx;
              border-radius: 50%;
            }
            & text:nth-child(2) {
              width: 56rpx;
              height: 26rpx;
              background: linear-gradient(270deg, #fa9d9f 0%, #ffb0a6 100%);
              border-radius: 13rpx;
              font-size: 18rpx;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #ffffff;
              line-height: 28rpx;
              position: absolute;
              margin: -14rpx 0 0 40rpx;
            }
            & text:nth-child(3) {
              font-size: 24rpx;
              color: #999999;
              line-height: 34rpx;
              margin-top: 24rpx;
            }
          }
        }
        .indicator {
          display: flex;
          justify-content: center;
          > view {
            width: 18rpx;
            height: 8rpx;
            background: #d8d8d8;
            border-radius: 5rpx;
            margin-left: 6rpx;
          }
          .active {
            background: #929292;
          }
        }
      }
      .lists {
        width: 100%;
        height: 412rpx;
        background: #ffffff;
        box-shadow: 0rpx 0rpx 12rpx 2rpx rgba(0, 0, 0, 0.08);
        border-radius: 10rpx;
        margin-top: 24rpx;
        padding-top: 48rpx;
        .swiper {
          .item {
            display: flex;
            flex-wrap: wrap;
            height: 122rpx;
            > view {
              width: 25%;
              height: 122rpx;
              display: flex;
              flex-direction: column;
              align-items: center;
              & image {
                width: 80rpx;
                height: 80rpx;
                border-radius: 50%;
                margin-bottom: 14rpx;
              }
              & text {
                font-size: 22rpx;
                color: #666666;
                line-height: 32rpx;
              }
            }
          }
        }
        .indicator {
          display: flex;
          justify-content: center;
          margin-top: 12rpx;
          > view {
            width: 18rpx;
            height: 8rpx;
            background: #d8d8d8;
            border-radius: 5rpx;
            margin-left: 6rpx;
          }
          .active {
            background: #929292;
          }
        }
      }
    }
    .read {
      padding: 0 5%;
      margin-top: 32rpx;
      > text {
        display: block;
        font-size: 24rpx;
        color: #666666;
        line-height: 34rpx;
        margin-bottom: 14rpx;
      }
      > view {
        > text {
          font-size: 22rpx;
          color: #666666;
          line-height: 32rpx;
          &:nth-child(2) {
            font-weight: 600;
            color: #333333;
          }
        }
      }
    }
    .pay {
      width: 100%;
      height: 160rpx;
      background: #ffffff;
      box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(0, 0, 0, 0.33);
      padding: 0 116rpx;
      margin-top: 36rpx;
      display: flex;
      align-items: center;
      text-align: center;
      position: fixed;
      left: 0;
      bottom: 0;
      > text {
        width: 100%;
        height: 72rpx;
        background: linear-gradient(180deg, #fbe5ae 0%, #fbe5ae 0%, #ffc764 100%);
        border-radius: 36rpx;
        font-size: 28rpx;
        font-weight: 600;
        color: #500b0b;
        line-height: 72rpx;
      }
    }
  }
}
</style>
