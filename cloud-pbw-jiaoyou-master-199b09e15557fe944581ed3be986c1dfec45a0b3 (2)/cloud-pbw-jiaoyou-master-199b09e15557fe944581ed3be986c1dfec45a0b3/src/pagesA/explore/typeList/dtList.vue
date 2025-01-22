<template>
  <view class="explore-wrapper">
    <sl-filter :themeColor="themeColor" :menuList="menuList" @result="result"></sl-filter>
    <!-- swiper中的transfrom会使fixed失效,此时需设置fixed为false,而top会自动使用padding-top -->
    <mescroll-uni style="width: 100%; height: 100%" top="90" :fixed="true" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @emptyclick="emptyClick" @init="mescrollInit">
      <view class="dtcontent">
        <ul>
          <li v-for="(item, index) of expList" :key="index" @click="goto('/pagesA/nearby/nearbyText/nearbyText?code=' + item._id)">
            <view class="dtuser">
              <image :src="item.userInfo.avatar" @tap.stop="tab_name(item.userInfo._id)"></image>
              <view @tap.stop="tab_name(item.userInfo._id)">
                <view class="user">{{ item.userInfo.nickname }}</view>
                <view>{{ timeText(item.add_time) }}</view>
              </view>
            </view>
            <view class="dttext">
              <view v-if="item.subtype && item.subtype[0]"><span class="iconfont">&#xe734;</span>【{{ item.subtype[0].title }}】</view>
              <view v-if="item && item.dynamicStart"><span class="iconfont">&#xe91a;</span>{{ GetTime(item.dynamicStart) }}-{{ GetTime(item.dynamicEnd) }}</view>
              <view v-if="item.startCity"><span class="iconfont">&#xe738;</span>{{ item.startCity }}-{{ item.endCity }} </view>
              <view v-if="item.dynamicLabel"><span class="iconfont">&#xe737;</span>期望对象：{{ item.dynamicLabel }} </view>
              <view style="margin-top: 15px"
                ><span class="iconfont">&#xe735;</span><text>电台呼叫：{{ item.dynamicContext }}</text></view
              >
              <view class="dtimgList" v-if="item.dynamicImg.length">
                <view v-for="(img, imgIndex) of item.dynamicImg" :key="imgIndex">
                  <image :src="img" @tap.stop="previewImage(img, item.dynamicImg)"></image>
                </view>
              </view>
            </view>
            <view class="dtdz">
              <view @tap.stop="give(item, index, item._id)">
                <span class="iconfont">&#xe73a;</span>
                <text>点赞{{ item.like.length != 0 ? item.like.length : '' }}</text>
              </view>
              <view @tap.stop="spell(item, index, item._id)">
                <span class="iconfont">&#xe736;</span>
                <text>报名{{ item.spell.length }}</text>
              </view>
              <view @click.stop="msgSo(item.userInfo.nickname, item.userInfo._id)">
                <span class="iconfont">&#xe733;</span>
                <text>私聊</text>
              </view>
            </view>
            <!-- 小程序广告 -->
            <!-- #ifdef MP-WEIXIN -->
            <!-- <view class="xcx-ad-view" v-if="index>0 && index%8==0">
              <ad unit-id="adunit-c6817e9b0563765e" ad-intervals="30"></ad>
            </view> -->
            <!-- #endif -->
          </li>
        </ul>
      </view>
    </mescroll-uni>
  </view>
</template>

<script>
import wrap from '@/components/wrap'
import slFilter from '@/components/sl-filter/sl-filter.vue'
import MescrollUni from '@/components/mescroll-uni/mescroll-uni.vue'
import { mapActions } from 'vuex'

export default {
  components: {
    MescrollUni,
    wrap,
    slFilter
  },
  data() {
    return {
      windowWidth: 0,
      windowHeight: 0,
      optionData: '',
      themeColor: '#000000',
      filterResult: '',
      menuList: [
        {
          title: '类型',
          detailTitle: '请选择服务类型（单选）',
          isMutiple: true,
          key: 'jobType',
          detailList: [
            {
              title: '不限',
              value: ''
            }
          ]
        },
        {
          title: '性别',
          key: 'salary',
          isMutiple: true,
          detailTitle: '请选择服务人员性别（单选）',
          detailList: [
            {
              title: '不限',
              value: ''
            },
            {
              title: '男孩',
              value: '1'
            },
            {
              title: '女孩',
              value: '1'
            }
          ]
        },
        {
          title: '年龄',
          key: 'single',
          isMutiple: false,
          detailTitle: '请选择服务人员年龄段（单选）',
          detailList: [
            {
              title: '不限',
              value: ''
            },
            {
              title: '70后',
              value: 'test_1'
            },
            {
              title: '80后',
              value: 'test_2'
            },
            {
              title: '90后',
              value: 'test_3'
            },
            {
              title: '95后',
              value: 'test_4'
            },
            {
              title: '00后',
              value: 'test_5'
            }
          ]
        },
        {
          title: '排序',
          key: 'sort',
          isSort: true,
          detailList: [
            {
              title: '默认排序',
              value: ''
            },
            {
              title: '发布时间',
              value: 'add_time'
            },
            {
              title: '离我最近',
              value: 'location'
            },
            {
              title: '价格最低',
              value: 'wages_up'
            },
            {
              title: '价格最高',
              value: 'wages_up'
            }
          ]
        }
      ],
      downOption: {
        auto: false // 不自动加载
      },
      mescroll: null,
      upOption: {
        auto: false, // 不自动加载
        page: {
          num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
          size: 5 // 每页数据的数量
        },
        noMoreSize: 1, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
        empty: {
          tip: '~ 空空如也 ~', // 提示
          btnText: '去看看'
        }
      },
      nowPage: 1,
      nowPageDataNum: 5,
      isInit: false,
      expList: [],
      typeId: ''
    }
  },
  watch: {
    index(index) {
      //console.log(index);
      if (index == 2) {
        if (!this.isInit) {
          this.mescroll.triggerDownScroll()
          this.isInit = true
        }
      }
    }
  },
  methods: {
    ...mapActions({
      getConversation: 'uniIm/getConversation'
    }),
    spell(item, index, id) {
      this.$request('nearby', 'spellAdd', {
        toUid: item.uid,
        dynamicId: id
      }).then((res) => {
        if (res.status === 2) {
          this.msg('已取消报名')
          item.spell.splice(0, 1)
        } else {
          this.msg('报名成功')
          item.spell.push({ uid: 'null' })
        }
      })
    },
    goto(url) {
      uni.navigateTo({
        url: url
      })
    },
    previewImage(img, list) {
      uni.previewImage({
        current: img,
        urls: list
      })
    },
    // 时间过滤
    GetTime(value) {
      var time = new Date(value * 1000)
      function add0(m) {
        return m < 10 ? '0' + m : m
      }
      var y = time.getFullYear()
      var m = time.getMonth() + 1
      var d = time.getDate()
      var h = time.getHours()
      var mm = time.getMinutes()
      var s = time.getSeconds()
      var timeResult = add0(m) + '月' + add0(d) + '日'
      if (timeResult == '1970-01-01' || timeResult == '1970-01-02') {
        return '--'
      } else {
        return timeResult
      }
    },
    // 头像
    tab_name(userCode) {
      uni.navigateTo({
        url: '/pagesA/service/homePage/homePage?code=' + userCode
      })
    },
    async msgSo(name, uid) {
      if (!uni.getStorageSync('userInfo')) {
        uni.navigateTo({
          url: '/pagesA/login/auth/login'
        })
        return
      }
      //创建会话
      const currentConversation = await this.getConversation({
        user_id: uid
      })
      console.log('currentConversation', currentConversation)
      // 当前用户给对方发个消息
      uni.navigateTo({
        url: '/im/chat/chat?conversation_id=' + currentConversation.id
      })
    },
    // 点赞
    async give(item, index, code) {
      const res = await this.$request('nearby', 'addLike', {
        id: code
      })
      if (res.status == 1) {
        this.expList[index].like.push({ uid: 'null' })
      }
      if (res.status == 2) {
        this.expList[index].like.splice(0, 1)
      }
    },
    nameBtn(code) {
      uni.navigateTo({
        url: '/pagesA/service/homePage/homePage?code=' + code
      })
    },
    result(val) {
      this.filterResult = JSON.stringify(val, null, 2)
    },
    servesBtn(code) {
      uni.navigateTo({
        url: '/pagesA/service/serviceInfo/serviceInfo?code=' + code
      })
    },
    iconList() {
      uni.navigateTo({
        url: '/pagesA/explore/iconList/iconList'
      })
    },
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit(mescroll) {
      //console.log(mescroll, "mescroll组件初始化的回调");
      this.mescroll = mescroll
    },
    // 距离时间
    timeText(time) {
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
      if (d_days > 0 && d_days < 3) {
        return d_days + '天前'
      }
      if (d_days <= 0 && d_hours > 0) {
        return d_hours + '小时前'
      }
      if (d_hours <= 0 && d_minutes > 0) {
        return d_minutes + '分钟前'
      }
      if (d_seconds < 60) {
        if (d_seconds <= 0) {
          return '刚刚'
        } else {
          return d_seconds + '秒前'
        }
      }
      if (d_days >= 3 && d_days < 364) {
        return M + '-' + D + '   ' + H + ':' + m
      }
      if (d_days >= 365) {
        return Y + '-' + M + '-' + D + '   ' + H + ':' + m
      }
    },
    /*下拉刷新的回调 */
    downCallback(mescroll) {
      // 这里加载你想下拉刷新的数据, 比如刷新轮播数据
      // loadSwiper();
      // 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
      mescroll.resetUpScroll()
    },
    /*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
    async upCallback(mescroll) {
      ////console.log("上啦",mescroll)
      this.nowPage = mescroll.num
      // 获取列表
      const res = await this.$request('nearby', 'nearbyList', {
        dynamicType: 4,
        types: this.typeId,
        offset: 0,
        limit: 10
      })
      //console.log(res);
      if (res.data) {
        if (mescroll.num == 1) this.expList = []
        this.expList = this.expList.concat(res.data)
        setTimeout(() => {
          mescroll.endSuccess(res.data.length, res.totalPageNum != res.nowPage)
        }, 500)
      } else {
        //联网失败的回调,隐藏下拉刷新的状态
        mescroll.endErr()
      }
    },
    //点击空布局按钮的回调
    emptyClick() {
      uni.showToast({
        title: '点击了按钮,具体逻辑自行实现'
      })
    }
  },
  onLoad(option) {
    let vm = this
    vm.optionData = option
    vm.typeId = option.id
    // 设置导航文本
    uni.setNavigationBarTitle({
      title: '" ' + option.text + ' " - 电台'
    })
  },
  onReady() {
    this.mescroll.triggerDownScroll()
    this.isInit = false
  },
  onShow() {}
}
</script>

<style scoped lang="scss">
.explore-wrapper {
  border-top: 1px solid #ddd;
  background: #f5f5f5;
  width: 100%;
  position: fixed;
  height: 100%;
  box-sizing: border-box;
}
.dtcontent {
  background: #fff;
  ul {
    li {
      padding: 40rpx;
      border-bottom: 10rpx solid #f6f6f6;
      .dtuser {
        display: flex;
        image {
          width: 60rpx;
          height: 60rpx;
          margin-right: 10rpx;
          border-radius: 10rpx;
        }
        > view {
          display: flex;
          flex-direction: column;
          justify-content: center;
          .user {
            font-size: 25rpx;
            font-weight: 500;
          }
          view {
            font-size: 20rpx;
          }
        }
      }
      .dttext {
        margin: 20rpx 0;
        background: #f5f4f9;
        padding: 20rpx;
        border-radius: 5rpx;
        view {
          display: flex;
          flex-wrap: wrap;
          font-weight: 500;
          line-height: 45rpx;
          font-size: 24rpx;
          align-items: center;
          span {
            margin-right: 10rpx;
            color: #755fe0;
          }
          image {
            width: 100rpx;
            height: 100rpx;
            border-radius: 10rpx;
          }
        }
      }
      .dtimgList {
        padding: 20rpx 30rpx 0 30rpx;
      }
      .dtdz {
        display: flex;
        justify-content: space-between;
        margin-top: 40rpx;
        > view {
          width: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          font-size: 23rpx;
        }
      }
    }
  }
}
</style>
