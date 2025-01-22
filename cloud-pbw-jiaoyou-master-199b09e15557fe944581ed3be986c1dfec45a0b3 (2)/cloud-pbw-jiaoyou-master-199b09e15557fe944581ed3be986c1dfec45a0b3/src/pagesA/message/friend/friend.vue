<template>
  <view id="friend_page">
    <view class="friend_wp clear">
      <scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
        <view v-bind:class="tabIndex == index ? 'active': '' " :id="tab.id" :data-current="index" @tap="tapTab" v-for="(tab,index) in tabBars" :key="tab.id">
          {{tab.name}}
        </view>
      </scroll-view>
    </view>
    <view class="allorders-content">
      <swiper :current="tabIndex" style="height: 100%" class="swiper-box" duration="300" @change="changeTab">
        <swiper-item class="swiper-box" v-for="(tab,key) in newsitems" :key="key">
          <scroll-view class="list" scroll-y>
            <view v-if="key == 1" class="content_wp">
              <view class="xt_msg" v-if="UserList &&　UserList.data">
                <view class="li_cls clear" v-for="(item,index) of UserList.data" :key="index" @click="nameBtn(item.user.uid)">
                  <view class="text_left block floatL">
                    <image :src="item.user.headImg" width='52' alt="">
                  </view>
                  <view class="text_right block floatL">
                    <view class="clear">
                      <text class="font_16">{{item.user.name}}</text>
                    </view>
                    <view>
                      <text class="woman_wp " v-if="item.user.sex == 2">
                        <text class="iconfont font_color">&#xe640;</text><text class="p_left_2">{{item.user.dateBirthStr ? item.user.dateBirthStr : ''}}</text>
                      </text>
                      <text class="man_wp " v-if="item.user.sex == 1">
                        <text class="iconfont font_color">&#xe638;</text><text class="p_left_2">{{item.user.dateBirthStr  ? item.user.dateBirthStr : ''}}</text>
                      </text>

                      <!--<text class="p_left_7">程序猿</text>-->
                      <!-- <text class="delete_rt" @click.stop="delName(item.attentionCode)">取消关注</text> -->
                    </view>
                    <view class="font_13 over_hidden">{{ item.user.signature ||'Ta很懒,没有签名...'}}</view>
                  </view>
                </view>
                <not-list v-if="UserList.data.length == 0" :text="'暂无关注'"></not-list>
              </view>
            </view>
            <view v-if="key == 0" class="content_wp">
              <view class="xt_msg" v-if="UserList">
                <view class="li_cls clear" v-for="(item,index) of UserList.data" :key="index" @click="nameBtn(item.usered.uid)">
                  <view class="text_left block floatL">
                    <image :src="item.usered.headImg" width='52' alt="">
                  </view>
                  <view class="text_right block floatL">
                    <view class="clear">
                      <text class="font_16">{{item.usered.name}}</text>
                    </view>
                    <view>
                      <text class="woman_wp " v-if="item.usered.sex == 2">
                        <text class="iconfont font_color">&#xe640;</text><text class="p_left_2">{{item.usered.dateBirthStr || ''}}</text>
                      </text>
                      <text class="man_wp " v-if="item.usered.sex == 1">
                        <text class="iconfont font_color">&#xe638;</text><text class="p_left_2">{{item.usered.dateBirthStr || ''}}</text>
                      </text>

                      <!--<text class="p_left_7">程序猿</text>-->
                      <text class="delete_rt" @click.stop="delName(item.attentionCode)">取消关注</text>
                    </view>
                    <view class="font_13 over_hidden">{{item.usered.signature || 'Ta很懒,没有签名...'}}</view>
                  </view>
                </view>
                <not-list v-if="UserList.data.length == 0" :text="'暂无粉丝'"></not-list>
                <!--<view class="li_cls clear">-->
                <!--<view class="text_left block floatL">-->
                <!--<image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/img/01.jpg" width='52' alt="">-->
                <!--</view>-->
                <!--<view class="text_right block floatL">-->
                <!--<view class="clear">-->
                <!--<text class="font_16">小秘密123123</text>-->
                <!--</view>-->
                <!--<view>-->
                <!--<text class="man_wp ">-->
                <!--<text  class="iconfont icon-guanzhu font_color"></text><text class="p_left_2">24</text>-->
                <!--</text>-->
                <!--<text class="p_left_7">程序猿</text>-->
                <!--</view>-->
                <!--<view class="font_13 over_hidden">记得给手机充满电 …</view>-->
                <!--</view>-->
                <!--</view>-->
              </view>
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
import notList from '@/components/notList'


export default {
  components: {
    notList
  },
  data () {
    return {
      msg: '132',
      type: 0,
      tabBars: [{
        name: '关注',
        id: 'guanzhu'
      }, {
        name: '粉丝',
        id: 'fensi'
      }],
      tabIndex: 0,
      newsitems: [],
      isClickChange: false,
      UserList: {},
      scrollLeft: ''
    }
  },
  watch: {
    tabIndex (val) {
      this.UserList = {}
      // 获取列表
      this.getList(val)
    }
  },
  methods: {
    nameBtn (code) {
      uni.navigateTo({
        url: '/pagesA/service/homePage/homePage?code=' + code
      });
    },
    // 取消关注
    delName (code) {
      let vm = this
      uni.showModal({
        title: '提示',
        content: '取消关注该用户吗？',
        success: function (res) {
          if (res.confirm) {
            ////console.log('用户点击确定');

          } else if (res.cancel) {
            ////console.log('用户点击取消');
          }
        }
      });

    },
    // 滑动tab
    async changeTab (e) {
      ////console.log(e)
      let index = e.target.current;
      ////console.log(index)
      if (this.isClickChange) {
        this.tabIndex = index;
        this.isClickChange = false;
        return;
      }
      let tabBar = await this.getElSize("tab-bar"),
        tabBarScrollLeft = tabBar.scrollLeft;
      let width = 0;

      for (let i = 0; i < index; i++) {
        let result = await this.getElSize(this.tabBars[i].id);
        width += result.width;
      }
      let winWidth = uni.getSystemInfoSync().windowWidth,
        nowElement = await this.getElSize(this.tabBars[index].id),
        nowWidth = nowElement.width;
      if (width + nowWidth - tabBarScrollLeft > winWidth) {
        this.scrollLeft = width + nowWidth - winWidth;
      }
      if (width < tabBarScrollLeft) {
        this.scrollLeft = width;
      }
      this.isClickChange = false;
      this.tabIndex = index; //一旦访问data就会出问题
      ////console.log(index,"777777777777777777777777")
    },
    getElSize (id) { //得到元素的size
      return new Promise((res, rej) => {
        uni.createSelectorQuery().select("#" + id).fields({
          size: true,
          scrollOffset: true
        }, (data) => {
          res(data);
        }).exec();
      })
    },
    async tapTab (e) { //点击tab-bar
      if (this.tabIndex === e.currentTarget.dataset.current) {
        return false;
      } else {
        let tabBar = await this.getElSize("tab-bar"),
          tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
        this.scrollLeft = tabBarScrollLeft;
        this.isClickChange = true;
        this.tabIndex = e.currentTarget.dataset.current
      }
    },
    randomfn () {
      let ary = [];
      for (let i = 0, length = this.tabBars.length; i < length; i++) {
        let aryItem = {
          loadingType: 0,
          data: []
        };
        for (let j = 1; j <= 10; j++) {
          aryItem.data.push(this['data' + Math.floor(Math.random() * 5)]);
        }
        ary.push(aryItem);
      }
      return ary;
    },
    changeType (type) {
      if (type == 0) {
        this.type = 0
      } else {
        this.type = 1
      }
    },
    // 年龄过滤
    ages (str) {
      var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
      if (r == null) return false;
      var d = new Date(r[1], r[3] - 1, r[4]);
      if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {
        var Y = new Date().getFullYear();
        // return("年龄   =   "+   (Y-r[1])   +"   周岁");
        return ((Y - r[1]));
      }
      return ("输入的日期格式错误！");
    },
    // 获取列表
    getList (index) {
      let vm = this
      vm.UserList.data = []
      // fly.post('/user/dynamic/selectUserAttention', {
      //   attentionCodeType:index == 1 ? 1 : 0,
      // },{headers:{"content-type":"application/x-www-form-urlencoded"}}).then(function(res) {
      //   if (res.code == '000000') {
      //     vm.UserList = res
      //   }
      // })
    }
  },
  onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
    this.newsitems = this.randomfn()
    this.tabIndex = Number(option.index)
    // 获取列表
    this.getList(0)
  },
  onPullDownRefresh () {
    // 获取列表
    this.getList(this.tabIndex)
    setTimeout(function () {
      uni.stopPullDownRefresh();
    }, 300);
  }

}
</script>

<style lang="scss" scoped>
.uni-swiper-tab {
  display: inline-block;
  height: 95rpx !important;
}
.list {
  height: 100%;
}
.allorders-content {
  padding-top: 18px;
  width: 100%;
  height: 100vh;
}
.clear:after {
  content: '';
  display: block;
  clear: both;
}
#friend_page {
  background: #fff;
  min-height: 100vh;
  .uni-swiper-tab {
    border-bottom: 1px solid #eaeef7 !important;
  }
}
.friend_wp {
  width: 100%;
  background: #fff;
}
.friend_wp view {
  float: left;
  text-align: center;
  width: 50%;
  background: #fff;
  padding-bottom: 9 * 2rpx;
  font-size: 32rpx;
  color: #333;
}
.active {
  position: relative;
}
.active:after {
  content: '';
  width: 100rpx;
  height: 10rpx;
  border-radius: 20rpx;
  background: $fontLinear;
  display: block;
  position: absolute;
  top: 75rpx;
  left: 50%;
  margin-left: -50rpx;
}

.iconfont {
  font-size: 20 * 2rpx;
}
.color_orange {
  color: #fcdf55;
}

.content_wp {
  .li_cls {
    background: #fff;
    margin-bottom: 1 * 2rpx;
    padding: 13 * 2rpx;
    border-bottom: 3rpx solid #eaeef7;
  }
  .block {
    display: inline-block;
  }
  .floatL {
    float: left;
  }

  .font_16 {
    font-size: 15 * 2rpx;
    color: #222;
  }
  .floatR {
    float: right;
  }
  .font_13 {
    font-size: 11 * 2rpx;
    color: #888;
    line-height: 18 * 2rpx;
  }
  .over_hidden {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 300 * 2rpx;
  }
}

.man_wp {
  background: #00b4ff;
  border-radius: 3 * 2rpx;
  padding: 0 * 2rpx 4 * 2rpx;
  font-size: 11 * 2rpx;
}
.woman_wp {
  background: #fc7eef;
  border-radius: 3 * 2rpx;
  padding: 0 * 2rpx 4 * 2rpx;
  font-size: 11 * 2rpx;
}
.icon-nan {
  font-size: 12 * 2rpx;
  color: #888;
}
.p_left_7 {
  padding-left: 7 * 2rpx;
  font-size: 12 * 2rpx;
}
.p_left_2 {
  padding-left: 2 * 2rpx;
  font-size: 12 * 2rpx;
  color: #fff;
}
.text_right {
  width: 75%;
  line-height: 22 * 2rpx;
}
.text_left {
  width: 18%;
  height: 65 * 2rpx;
  line-height: 65 * 2rpx;
}
.text_left img {
  border-radius: 50%;
  width: 50 * 2rpx;
  height: 50 * 2rpx;
}
.delete_rt {
  float: right !important;
  background: $fontColorB;
  color: #fff;
  border-radius: 5px;
  padding: 3px 12px;
  font-size: 26rpx;
}
.font_color {
  color: #fff;
  font-size: 24rpx;
}
.aft_line {
  font-size: 28rpx;
}
</style>
