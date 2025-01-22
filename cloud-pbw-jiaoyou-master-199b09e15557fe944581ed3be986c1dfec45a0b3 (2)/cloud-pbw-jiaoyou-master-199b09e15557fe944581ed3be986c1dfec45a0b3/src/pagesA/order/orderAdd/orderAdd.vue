<template>
  <div class="pay-wrapper"  >
    <statusLine :curStatu='1' :warningMsg='false'></statusLine>
    <!--订单-->
    <div>
      <view class="uni-title uni-common-pl">服务时间</view>
      <view class="uni-list">
        <view class="uni-list-cell">
          <view class="uni-list-cell-left">
            开始时间
          </view>
          <view class="uni-list-cell-db">
            <picker mode="date" :value="startTime" @change="startTimeBtn">
              <view class="timeText">{{startTime}}</view>
            </picker>
            <picker mode="time" v-if="startTime != '请选择日期'" :value="startss" @change="startssBtn">
              <view class="timeText">{{startss}}</view>
            </picker>
          </view>
        </view>
      </view>
      <view class="uni-list">
        <view class="uni-list-cell">
          <view class="uni-list-cell-left">
            结束时间
          </view>
          <view class="uni-list-cell-db">
            <picker mode="date" :value="endTime" @change="endTimeBtn">
              <view class="timeText">{{endTime}}</view>
            </picker>
            <!--            <picker mode="time" :value="endss"   @change="endssBtn">-->
            <!--              <view class="timeText">{{endss}}</view>-->
            <!--            </picker>-->
          </view>
        </view>
      </view>
      <view class="uni-title uni-common-pl">服务人数</view>
      <view class="uni-list">
        <view class="uni-list-cell">
          <view class="uni-list-cell-left">
            服务人数
          </view>
          <view class="uni-list-cell-db">
            <view class="uni-input-row">
              <uni-number-box v-model="number" :min="1" :max="9"></uni-number-box>
            </view>
          </view>
        </view>
      </view>
      <!-- <view class="uni-title uni-common-pl">服务信息</view>
      <view class="uni-list" v-for="(item,index) of setListData" :key="index">
        <view class="uni-list-cell">
          <view class="uni-list-cell-left" style="color: #f60">
            第{{index+1}}次 (D.{{index+1}})
          </view>
          <view class="uni-list-cell-db">
            <view class="uni-input" style="height: auto">[{{servesData.pushTypeStr}}] {{servesData.title}} ({{servesData.pushPrice}}/{{servesData.servePriceName}}) </view>
          </view>
        </view>
      </view> -->
      <view class="uni-title uni-common-pl">服务次数</view>
         <view class="uni-list" v-for="(item,index) of setListData" :key="index">
        <view class="uni-list-cell">
          <view class="uni-list-cell-left" style="color: #f60">
            第{{index+1}}次 (D.{{index+1}})
          </view>
          <view class="uni-list-cell-db">
            <!--<picker @change="bindPickerChange" :value="index" :range="array">-->
            <!--<view class="uni-input">【{{array[index]}}】125元/天</view>-->
            <!--</picker>-->
            <view class="uni-input" style="height: auto">[{{servesData.pushTypeStr}}] {{servesData.title}} ({{servesData.pushPrice}}/{{servesData.servePriceName}}) </view>
          </view>
        </view>
      </view>
      <view class="uni-list">
        <view class="uni-list-cell">
          <view class="uni-list-cell-left">
            服务次数
          </view>
          <view class="uni-list-cell-db">
            <view class="uni-input-row">
              <uni-number-box v-model="timeData" @change="bindChange" :min="1" :max="999"></uni-number-box>
            </view>
          </view>
        </view>
      </view>
      <view class="pro">服务{{timeData}}次，共计：{{servesData.pushPrice * timeData}}元(CNY)</view>
      <view class="uni-title uni-common-pl">备注</view>
      <view class="uni-list">
        <view class="uni-list-cell">
          <view class="uni-list-cell-left">
            特殊需求
          </view>
          <view class="uni-list-cell-db">
            <textarea auto-height v-model="remark" placeholder="如有需求及留言，可备注；没有，可不填~" />
          </view>
        </view>
      </view>
      <view class="uni-list">
        <view class="uni-list-cell">
          <view class="uni-list-cell-left">
            联系方式:
          </view>
          <view class="uni-list-cell-db">
            <input class="uni-input" v-model="iphone" type="number" maxlength="11" placeholder="请输入手机号(必填)" />
          </view>
        </view>
      </view>
      <view class="uni-list">
        <view class="uni-list-cell">
          <view class="uni-list-cell-left">
            微信号码:
          </view>
          <view class="uni-list-cell-db">
            <input class="uni-input" v-model="wechat" placeholder="输入微信号(选填)" />
          </view>
        </view>
      </view>
      <!--      <view class="bg_cocor">-->
      <!--        <view style="text-align: center;padding: 10px 0">◉提交订单即表示阅读并同意 <span style="">用户服务条款</span></view>-->
      <!--      </view>-->
      <div class="bg_cocor bg_btn" @click="addBtn()">
        <span>提交订单</span>
      </div>
    </div>
  </div>
</template>

<script>
  import wrap from '@/components/wrap'
  import statusLine from '@/components/statusLine'
  import uniNumberBox from '@/components/uni-number-box.vue'
  import fly from '@/api/fly'
  export default {
    components: {
      wrap,
      statusLine,
      uniNumberBox
    },
    data() {
      return {
        startTime: '请选择日期',
        startss: '18:00',
        endTime: '请选择日期',
        endss: '23:59',
        array: ['中国', '美国', '巴西', '日本'],
        index: 0,
        number: 1,
        servesData: '',
        servesList: '',
        setListData: [],
        timeData: 1,
        service: '',
        startTimeData: '',
        endTimeData: '',
        iphone: '',
        remark: '',
        wechat: ''
      }
    },
    watch: {
      timeData(val, item) {
        console.log(val, item)
      }
    },
    methods: {
      bindChange(val) {
        let contData = []
        for (let i = 0; i < val; i++) {
          let text = {
            code: this.servesData.code,
            text: ''
          }
          contData.push(text)
        }
        this.setListData = contData
        this.timeData = val
      },
      addBtn() {
        let vm = this
        if (vm.startTimeData == '') {
          wx.showToast({
            title: '请选择开始时间',
            icon: 'none',
            duration: 3000
          })
          return false
        }
        if (vm.endTimeData == '') {
          wx.showToast({
            title: '请选择结束时间',
            icon: 'none',
            duration: 3000
          })
          return false
        }
        if (vm.startTimeData == '') {
          wx.showToast({
            title: '请选择开始时间',
            icon: 'none',
            duration: 3000
          })
          return false
        }
        if (vm.iphone == '') {
          wx.showToast({
            title: '请填写联系手机号',
            icon: 'none',
            duration: 3000
          })
          return false
        }
        // 提交订单
        fly.post('/user/server/order/insertServeOrder', {
          servesCode: Number(vm.service),
          orderStart: Number(vm.startTimeData),
          orderEnd: Number(vm.endTimeData),
          serveNum: vm.timeData,
          servePeople: vm.number,
          telphone: vm.iphone,
          remark: vm.remark,
          weChat: vm.wechat
        }).then(function(res) {
          if (res.code == '000000') {
            uni.redirectTo({
              url: '/pagesB/order/orderInfo/orderInfo?type=servename&orderNum=' + res.data.serverNum
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
      },
      bindPickerChange: function(e) {
        //console.log('picker发送选择改变，携带值为', e.target)
        this.index = e.target.value
      },
      startTimeBtn: function(e) {
        console.log(e)
        this.startTime = (e.target.value).replace(/-/g, '/')
        this.endTime = (e.target.value).replace(/-/g, '/')
        this.timeList()
        // //console.log(this.startTime,'this.startTime')
      },
      startssBtn: function(e) {
        this.startss = e.target.value
        console.log(e)
        this.timeList()
      },
      endTimeBtn: function(e) {
        console.log(new Date(this.startTime).getTime())
        console.log(new Date(e.target.value).getTime())
        if (new Date(e.target.value).getTime() < new Date(this.startTime).getTime()) {
          // 提示
          wx.showToast({
            title: '结束时间必须大于开始时间',
            icon: 'none',
            duration: 3000
          })
          return
        }
        this.endTime = (e.target.value).replace(/-/g, '/')
        this.timeList()
      },
      endssBtn: function(e) {
        this.endss = e.target.value
        this.timeList()
      },
      timeList() {
        let vm = this
        vm.setListData = []
        // 赋值时间
        let start = new Date(vm.startTime + ' ' + vm.startss).getTime()
        let end = new Date(vm.endTime + ' ' + vm.endss).getTime()
        //console.log(new Date(vm.startTime + ' ' + vm.startss),"11")
        //console.log(new Date(vm.endTime + ' ' + vm.endss),"22")
        if (!start) {
          wx.showToast({
            title: '请继续选择开始时间',
            icon: 'none',
            duration: 3000
          })
        }
        if (!end) {
          wx.showToast({
            title: '请继续选择结束时间',
            icon: 'none',
            duration: 3000
          })
        }
        vm.startTimeData = start / 1000
        vm.endTimeData = end / 1000

let contData = []
           for (let i = 0; i < vm.timeData; i++) {
          let text = {
            code: this.servesData.code,
            text: ''
          }
          contData.push(text)
        }
        this.setListData = contData
        // 获取时间 天数
        // let timeKey = (Number(end/1000) - Number(start/1000)) / 86400
        // let dataNum = timeKey.toFixed(0)
        // vm.timeData = Number(dataNum)
        // for(let i=0;i<vm.timeData;i++){
        //   let text = {
        //     code:vm.servesData.code,
        //     text:''
        //   }
        //   vm.setListData.push(text)
        // }
      }
    },
    onLoad(option) {
      let vm = this
      vm.service = option.service
      let text = {
        code: this.servesData.code,
        text: ''
      }
      this.setListData.push(text)
      // 获取信息
      fly.post('/user/oneself/server/selectUserServesByCode', {
        code: option.service,
        role: 2
      }, {
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        }
      }).then(function(res) {
        if (res.code == '000000') {
          vm.servesData = res.data
          //console.log(vm.servesData,"777777777777")
        }
      })
      // 获取服务列表
      fly.post('/user/oneself/server/selectUserServes', {
        userCode: option.nameCode,
        role: 2
      }, {
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        }
      }).then(function(res) {
        if (res.code == '000000') {
          vm.servesList = res.data
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
.timeText{
  height: 80rpx;
  line-height: 80rpx;
}
  .pro {
    font-size: 40rpx;
    color: #f60;
    font-weight: bold;
    text-align: right;
    padding: 20px 20px 0;
  }
  .bg_btn {
    text-align: center;
    padding: 20px 0;
  }
  .bg_btn span {
    padding: 5px 28px;
    background: #f60;
    border-radius: 5px;
    color: #fff;
  }
  .bg_cocor {
    background: #fff;
  }
  textarea {
    border: 1px solid #ddd;
    padding: 10px;
    width: 80%;
    min-height: 100px;
  }
  .pay-wrapper {
    color: #222;
    background: #EAEEF7;
    position: relative;
  }
  .pay-content {
    height: 400rpx;
    width: 100%;
    background: #fff;
  }
  .pay-content-msg {
    text-align: center;
    padding: 90rpx 0 70rpx;
  }
  .pay-content-msg .iconfont {
    font-size: 90rpx;
    color: #0DCA28;
    vertical-align: middle;
    padding-right: 20rpx;
  }
  .pay-content-msg-txt {
    font-size: 36rpx;
  }
  .pay-content-time {
    text-align: center;
  }
  .pay-content-time-msg {
    font-size: 28rpx;
    padding-bottom: 20rpx;
  }
  .pay-content-time-time {
    font-size: 30rpx;
    color: #FEB925;
  }
  .pay-methods {
    background: #fff;
  }
  .pay-methods-title {
    font-size: 24rpx;
    color: #999;
    padding: 20rpx;
    border-bottom: 1rpx solid #F8FBFF;
  }
  .pay-methods-content-item {
    display: flex;
    padding: 20rpx;
    border-bottom: 1rpx solid #F8FBFF;
  }
  .pay-methods-content-item-part1 {
    flex: 1;
  }
  .pay-methods-content-item-part1 .iconfont {
    vertical-align: middle;
    padding-right: 10rpx;
  }
  .pay-methods-content-item-part1 .icon-iconfontrectangle390 {
    color: #009FE8;
    font-size: 50rpx;
  }
  .pay-methods-content-item-part1 .icon-weixin {
    color: #6CC539;
    font-size: 46rpx;
  }
  .pay-methods-content-item-part1-txt {
    font-size: 28rpx;
    color: #333;
  }
  .pay-methods-content-item-part2 {
    flex: 0 100rpx;
    text-align: right;
  }
  .pay-methods-content-item-part2 .iconfont {
    color: #DEDEDE;
    font-size: 36rpx;
  }
  .pay-methods-content-item-part2 .icon-Radiobutton-xuanzhongxuanxiang {
    color: #6CC539;
  }
  .pay-footer {
    position: absolute;
    bottom: 0;
    background: #fff;
    padding: 20rpx;
    display: flex;
    width: 100%;
    box-sizing: border-box;
  }
  .pay-footer-part1 {
    flex: 1;
  }
  .pay-footer-part1-txt {
    font-size: 24rpx;
  }
  .pay-footer-part1-price {
    font-size: 28rpx;
    padding-left: 20rpx;
  }
  .pay-footer-part2 {
    flex: 0 200rpx;
    text-align: right;
  }
  .pay-footer-part2-btn {
    background: #FDD149;
    font-size: 28rpx;
    display: inline-block;
    width: 152rpx;
    height: 46rpx;
    line-height: 46rpx;
    text-align: center;
    border-radius: 6rpx;
  }
</style>
