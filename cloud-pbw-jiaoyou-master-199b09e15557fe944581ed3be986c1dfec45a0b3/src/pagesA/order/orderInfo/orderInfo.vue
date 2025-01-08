<template>
  <div class="orderInfo-wrapper" v-if="servesData">
    <statusLine :curStatu='2' :warningMsg='true'></statusLine>
    <div class="orderInfo-content-wrapper">
      <div class="orderInfo-content">
        <div class="orderInfo-content-title">
          <p class="orderInfo-content-title-part" @click="userName(servesData.userInfo.uid)">
            买家：
            <image :src="servesData.userInfo.headImg" class='orderInfo-content-title-part-img' />
            <span class='orderInfo-content-title-part-name'>{{servesData.userInfo.name}}</span>
            <span class="iconfont icon-you"></span>
          </p>
        </div>
        <div class="orderInfo-content-content" v-for="(item,index) in servesData.serveNum" :key="index">
          <div>
            <image :src="servesData.serves.serveCoverImg" class='orderInfo-content-content-img' />
            <div style="width:100%">
              <p class='orderInfo-content-content-txt'>[{{servesData.serves.pushTypeStr}}] {{servesData.serves.title}}</p>
            <div class='orderInfo-content-content-price'>
              <p class='orderInfo-content-content-money'>￥{{servesData.serves.pushPrice}}元/{{servesData.serves.servePriceName}}</p>
            </div>
            </div>
          </div>
          <p class='orderInfo-content-content-num'>（当前第{{index+1}}次）- 需服务总次数 {{servesData.serveNum}}次</p>
        </div>
      </div>
      <div class="orderInfo-info" v-if="servesData != ''">
        <p style="text-align: center;color: #333;font-size: 30rpx;padding: 20rpx 0;"><span class='orderInfo-info-item-label'>订单详情</span>
          <!--<span class='orderInfo-info-item-txt'><span class='orderInfo-info-item-btn'>复制编号</span></span>-->
        </p>
        <p class="orderInfo-info-item"><span class='orderInfo-info-item-label'>订单编号</span><span class='orderInfo-info-item-txt'>{{servesData.orderNum}}</span></p>
        <p class="orderInfo-info-item"><span class='orderInfo-info-item-label'>服务分类</span><span class='orderInfo-info-item-txt'>[{{servesData.serves.pushTypeStr}}] {{servesData.serves.title}}</span></p>
        <p class="orderInfo-info-item"><span class='orderInfo-info-item-label'>服务日期</span><span class='orderInfo-info-item-txt'>{{servesData.orderStart}} - {{servesData.orderEnd}}</span></p>
        <p class="orderInfo-info-item"><span class='orderInfo-info-item-label'>服务价格</span><span class='orderInfo-info-item-txt'>单次(￥{{servesData.serves.pushPrice}}元/{{servesData.serves.servePriceName}})</span></p>
        <p class="orderInfo-info-item"><span class='orderInfo-info-item-label'>服务次数</span><span class='orderInfo-info-item-txt'>{{servesData.serveNum}}次</span></p>
        <p class="orderInfo-info-item"><span class='orderInfo-info-item-label'>目的地</span><span class='orderInfo-info-item-txt'>{{servesData.serves.serveCityStr}}</span></p>
        <p class="orderInfo-info-item"><span class='orderInfo-info-item-label'>服务人数</span><span class='orderInfo-info-item-txt'>{{servesData.servePeople}}人</span></p>
        <p><br></p>
        <p class="orderInfo-info-item"><span class='orderInfo-info-item-label'>预订人</span><span class='orderInfo-info-item-txt'>{{servesData.serves.user.name}}</span></p>
        <p class="orderInfo-info-item"><span class='orderInfo-info-item-label'>手机号</span><span class='orderInfo-info-item-txt'>{{servesData.telphone}} </span></p>
        <p class="orderInfo-info-item"><span class='orderInfo-info-item-label'>微信</span><span class='orderInfo-info-item-txt'>{{servesData.weChat || '无'}}  </span></p>
        <p class="orderInfo-info-item"><span class='orderInfo-info-item-label'>备注留言</span><span class='orderInfo-info-item-txt'>({{servesData.remark || '无备注'}})</span></p>
      </div>
    </div>
    <wrap :height='16'></wrap>
    <div class="orderInfo-service">
      <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/static/img/renzhengbg.jpg" class='orderInfo-service-bg' />
      <span class="orderInfo-service-label">提供服务者：</span>
      <div class="orderInfo-service-info"  @click="userName(servesData.serves.userCode)">
        <image :src="servesData.serves.user.headImg" class='orderInfo-service-img' />
        <p class='orderInfo-service-name'>{{servesData.serves.user.name}}</p>
      </div>
    </div>
    <wrap :height='16'></wrap>
    <div class="weMoney" v-if="servename == 'servename'">
      <p>支付方式：<span style="color: #f60"><span class="iconfont ">&#xe73e;</span>微信支付</span>
      </p>
      <!--      <p class="top"><span  style="color: #f60"> <span class="iconfont ">&#xe73e;</span>微信支付</span><span style="color: #f60">◉</span></p>-->
    </div>
    <wrap :height='16'></wrap>
    <!--    <p class='orderInfo-agreement-txt' v-if="servename != 'servename'">◉您支付既代表您同意遵守<span class='orderInfo-agreement-txt-a'>《服务协议》</span></p>-->
    <div class='orderInfo-btns' v-if="servename == 'servename'">
      <p class="orderInfo-btns-part1">总价：{{servesData.orderPrice}}元</p>
      <p class="orderInfo-btns-part2">
        <span class="orderInfo-btns-item" @click="notAdd">取消订单</span>
        <span class="orderInfo-btns-item orderInfo-btns-special" @click="addMoney">微信支付</span>
      </p>
    </div>
  </div>
</template>

<script>
  import wrap from '@/components/wrap'
  import statusLine from '@/components/statusLine'
  import fly from '@/api/fly'
  export default {
    components: {
      wrap,
      statusLine
    },
    data() {
      return {
        curItem: 0,
        servesData: '',
        orderNum: '',
        servename: ''
      }
    },
    methods: {
      userName(user){
          uni.navigateTo({
          url: '/pagesB/service/homePage/homePage?code=' + user
        });
        

      },
      notAdd() {
        let vm = this
        uni.showModal({
          title: '提示',
          content: '确定要取消该订单吗？',
          success: function(res) {
            if (res.confirm) {
              //console.log('用户点击确定');
              fly.post('/user/server/order/canelOrderByUser', {
                orderNum: vm.orderNum,
                status: 1
              }, {
                headers: {
                  "content-type": "application/x-www-form-urlencoded"
                }
              }).then(function(res) {
                if (res.code == '000000') {
                  uni.showToast({
                    title: '订单已取消',
                    duration: 2000
                  });
                  uni.navigateBack({
                    delta: 2
                  });
                } else {
                  // 提示
                  wx.showToast({
                    title: res.msg,
                    icon: 'none',
                    duration: 3000
                  })
                }
              })
            } else if (res.cancel) {
              //console.log('用户点击取消');
            }
          }
        });
      },
      addMoney() {
        let vm = this
        console.log("1111")
        //#ifdef MP-WEIXIN
        fly.post('/pay/JSAPI/getData', {
          orderNum: vm.orderNum,
          openid: uni.getStorageSync('pbw_user_openid')
        }, {
          headers: {
            "content-type": "application/x-www-form-urlencoded"
          }
        }).then(function(res) {
          if (res.code == '000000') {
            console.log(res)
            uni.requestPayment({
              provider: 'wxpay',
              orderInfo: vm.orderNum,
              timeStamp: res.data.timeStamp,
              nonceStr: res.data.nonce_str,
              package: res.data.package,
              signType: 'MD5',
              paySign: res.data.paysign,
              success: function(res) {
                console.log('success:' + JSON.stringify(res));
                uni.redirectTo({
                  url: '/pagesB/order/orderPay/orderPay?orderNum=' + vm.orderNum
                });
              },
              fail: function(err) {
                wx.showToast({
                  title: '支付失败',
                  icon: 'none',
                  duration: 3000
                })
                console.log('fail:' + JSON.stringify(err));
              }
            });
          } else {
            // 提示
            wx.showToast({
              title: res.msg,
              icon: 'none',
              duration: 3000
            })
          }
        })
        //#endif
        //#ifdef APP-PLUS
        fly.post('/pay/APP/getData', {
          orderNum: vm.orderNum
        }, {
          headers: {
            "content-type": "application/x-www-form-urlencoded"
          }
        }).then(function(appData) {
          if (appData.code == '000000') {
            console.log(JSON.stringify(appData), "7777777777")
            console.log(vm.orderNum)
            console.log(appData.data.prepayid)
            console.log(appData.data.sign,"sign")
            uni.requestPayment({
              provider: 'wxpay',
              orderInfo: {
                appid: 'wx204f0f65d71e2291',
                noncestr: appData.data.nonce_str,
                package: 'Sign=WXPay',
                partnerid: '1553472031',
                prepayid: appData.data.prepayid,
                timestamp: appData.data.timeStamp,
                sign: appData.data.sign,
              },
              success: function(res) {
                console.log('success:' + JSON.stringify(res));
                 uni.redirectTo({
                  url: '/pagesB/order/orderPay/orderPay?orderNum=' + vm.orderNum
                });
              },
              fail: function(err) {
                  wx.showToast({
                  title: '支付失败',
                  icon: 'none',
                  duration: 3000
                })
                console.log('fail:' + JSON.stringify(err));
              }
            });
          } else {
            console.log(JSON.stringify(appData))
            // 提示
            wx.showToast({
              title: appData.msg,
              icon: 'none',
              duration: 3000
            })
          }
        })
        //#endif    
        console.log("555")
      },
      timeGet(value) {
        var time = new Date(value * 1000);
        function add0(m) {
          return m < 10 ? '0' + m : m
        }
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        var timeResult = y + '/' + add0(m) + '/' + add0(d) + ' ' + add0(h) + ':' + add0(mm);
        if (timeResult == '1970-01-01' || timeResult == '1970-01-02') {
          return '--'
        } else {
          return timeResult
        }
      }
    },
    onLoad(option) {
      let vm = this
      vm.orderNum = option.orderNum
      vm.servename = option.type
      //console.log(option.type,"6666666666")
      // 获取信息
      fly.post('/user/server/order/selectServeOrder', {
        orderNum: option.orderNum,
      }, {
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        }
      }).then(function(res) {
        if (res.code == '000000') {
          let data = res.data
          data.orderStart = vm.timeGet(data.orderStart)
          data.orderEnd = vm.timeGet(data.orderEnd)
          vm.servesData = data
        } else {
          // 提示
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 3000
          })
        }
      })
    }
  }
</script>

<style scoped lang="scss">
  .weMoney {
    background: #fff;
    padding-bottom: 95px;
  }
  .weMoney p:first-child {
    color: #333;
    padding: 10px;
  }
  .weMoney .top {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #f5f5f5;
    padding: 10px;
    color: #333;
    font-weight: bold;
  }
  .weMoney .top span {
    width: 100px;
    text-align: center;
  }
  .orderInfo-content {
    border-bottom: 1rpx solid #E7EBF1;
  }
  .orderInfo-content-title {
    padding: 20rpx;
    display: flex;
    align-items: center;
    border-bottom: 1rpx solid #E7EBF1;
  }
  .orderInfo-content-title-part {
    flex: 1;
    font-size: 30rpx;
  }
  .orderInfo-content-title-part-img {
    display: inline-block;
    width: 50rpx;
    height: 50rpx;
    border-radius: 50%;
    vertical-align: top;
  }
  .orderInfo-content-title-part-name {
    color: #222;
    padding: 0 10rpx;
  }
  .orderInfo-content-title-part .iconfont {
    color: #CDD2DE;
    font-size: 24rpx;
  }
  .orderInfo-content-title-part2 {
    flex: 1;
    text-align: right;
    font-size: 24rpx;
  }
  .orderInfo-content-content>div {
    display: flex;
    padding: 20rpx;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
  }
  .orderInfo-content-content-img {
    flex: 0 100rpx;
    height: 100rpx;
    width: 100rpx;
  }
  .orderInfo-content-content-txt {
    flex: 0 470rpx;
    font-size: 28rpx;
    color: #222;
    text-align: right;
  }
  .orderInfo-content-content-price {
    flex: 0 140rpx;
    font-size: 28rpx;
    color: #222;
    text-align: right;
  }
  .orderInfo-content-content-money{
    color: $fontColor;
    font-weight: bold;
  }
  .orderInfo-content-content-num {
    padding: 20rpx ;
    color: $fontColor;
    text-align: right;
  }
  .orderInfo-info {
    padding: 10rpx 20rpx;
  }
  .orderInfo-info-item {
    display: flex;
    font-size: 26rpx;
    color: #888;
    height: 48rpx;
    line-height: 48rpx;
  }
  .orderInfo-info-item-label {
    flex: 0 200rpx;
  }
  .orderInfo-info-item-txt {
    flex: 1;
    text-align: right;
  }
  .orderInfo-info-title {
    color: #333;
  }
  .orderInfo-info-item-btn {
    font-size: 20rpx;
    border-radius: 6rpx;
    border: 1rpx solid #D7DADE;
    padding: 4rpx 8rpx;
  }
  .orderInfo-service {
    position: relative;
    width: 100%;
    height: 240rpx;
    color:#fff;
  }
  .orderInfo-service-bg {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 240rpx;
  }
  .orderInfo-service-info {
    position: absolute;
    z-index: 2;
    top: 64rpx;
    left: 329rpx;
    /*width:92rpx;*/
    /*height:92rpx;*/
    text-align: center;
  }
  .orderInfo-service-img {
    width: 92rpx;
    height: 92rpx;
    border-radius: 50%;
  }
  .orderInfo-service-name {
    color: #ffffff;
    font-size: 24rpx;
  }
  .orderInfo-service-label {
    position: absolute;
    z-index: 2;
    left: 20rpx;
    top: 20rpx;
    font-size: 24rpx;
  }
  .orderInfo-agreement {
    padding: 0 20rpx;
    background: #EAEEF7;
  }
  .orderInfo-agreement-txt {
    height: 50rpx;
    line-height: 50rpx;
    font-size: 24rpx;
    color: #222;
    text-align: center;
  }
  .orderInfo-agreement-txt-a {
    color: #37B0F6;
  }
  .orderInfo-btns {
    padding: 50rpx 30rpx;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    background: #fff;
    border-top: 1px solid #ddd;
    z-index: 999;
  }
  .orderInfo-btns-part1 {
    color: $fontColor;
    font-weight: bold;
    width: 300rpx;
    font-size: 17px;
  }
  .orderInfo-btns-part2 {
    flex: 1;
    text-align: right;
  }
  .orderInfo-btns-item {
    display: inline-block;
    padding: 3px 16px;
    text-align: center;
    line-height: 46rpx;
    font-size: 28rpx;
    border: 1rpx solid $fontColor;
    border-radius: 6rpx;
        color:#333;
  }
  .orderInfo-btns-special {
    background: $fontLinear;
    margin-left: 20rpx;
    color:#fff;
  }
</style>
