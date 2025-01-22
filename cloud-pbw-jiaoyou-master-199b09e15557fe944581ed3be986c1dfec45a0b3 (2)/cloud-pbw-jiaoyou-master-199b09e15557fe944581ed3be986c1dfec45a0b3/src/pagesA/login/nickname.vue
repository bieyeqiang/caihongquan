<!--
 * @Author: Jin Biao
 * @Date: 2021-06-15 11:16:55
 * @LastEditTime: 2023-02-12 21:50:09
 * @Description:  起名
-->
<template>
  <view>
    <view class="setUp">
      <text class="title">起一个好听的名字</text>
      <view class="row">
        <u--input v-model="name" shape="circle" placeholder="请输入昵称" label-width="0" type="text" clearable input-align="center"></u--input>
      </view>
      <view class="random" @click="randomBtn">
        <text class="iconfont">&#xe743;</text>
        随机起一个
      </view>
      <view class="btncor">
        <u-button type="primary" ripple shape="circle" @click="next">下一步</u-button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      name: ''
    }
  },
  methods: {
    next() {
      if (this.name == '' || this.name.length > 8) {
        uni.showToast({
          title: '请给自己起个名字（最多8个字）',
          icon: 'none',
          duration: 3000
        })
        return
      }
      uni.setStorageSync('login_name', this.name)
      uni.navigateTo({
        url: '/pagesA/login/sex'
      })
    },
    randomBtn() {
      let vm = this
      var xing = '辞林,冰岸,诗雪,云欣,云舒,清指,陌昌,竹君,寒云,言志,雪瑶,杨深,风泉,秋寒,百里,上官,慕容,端木,公,范,小,慕容,曲风,阿,情,郎,昭,悟依,翠芙,靖雁,雅蓉,安卉'
      var ming =
        '承天,维新,海明,晓游,雪智,怀仕,绮梅,度季,幽倚,晓白,风,清,飘飘,花小,朵,孤单,桓,月,媛,从烁,璟,雨蔚,章翱材,褚莲贤,边斌,雪,禹璟,菲,向晨琛,墨哈,楠逸,郎昭骏,淑逸,韦钰航,巴,良晨,😗,💕,万美,气烈,黛亦,达志,兰昕,雪瑶,泉流,屈铁,神誓,夕改,丹嘉,玄刚,江苑,同善,弘毅,兴恭,健余,推明,珊兰,月明,佩雅,以亦,洪波,思琦,诗华,晓然,自怡,含烟,乐姗,壤功,乐松,平安'
      function namea(c, d) {
        var xinga = c.split(',')
        var minga = d.split(',')
        return xinga[Math.floor(Math.random() * xinga.length)] + minga[Math.floor(Math.random() * minga.length)]
      }
      vm.name = namea(xing, ming) + ''
    }
  },
  onLoad() {
    if (uni.getStorageSync('login_name')) {
      this.name = uni.getStorageSync('login_name')
    }
  }
}
</script>

<style lang="scss" scoped>
.setUp {
  padding-top: 200rpx;
  text-align: center;
  margin: 20rpx 15%;
  .random {
    margin: 60rpx 0;
    text-align: center;
    color: #9c5cff;
    text {
      margin-right: 10rpx;
    }
  }
  .title {
    font-size: 50rpx;
    font-weight: bold;
    margin: 20rpx 0;
  }
  .row {
    background: #f1f1f1;
    margin: 50rpx 0;
    border-radius: 40rpx;
  }
  .btncor {
    width: 60%;
    margin: auto;
  }
}
</style>
