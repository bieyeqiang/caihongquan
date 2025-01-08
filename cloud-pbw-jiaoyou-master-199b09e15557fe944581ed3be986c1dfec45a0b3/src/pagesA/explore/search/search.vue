<template>
  <view class="container">
    <!-- 城市搜索 -->
    <view class="city-search-wrap" v-if="isReach">
      <view class="search">
        <view class="l-search">
          <text class="iconfont icon-search"></text>
          <input class="input-search" type="text" :value="inputValue" placeholder="输入城市名或拼音" placeholder-style="color:#8E8F97" :focus="searchFocus" @input="searchChange" />
          <text class="clear-input iconfont icon-icon-test" v-if="isClearBtn" @click="inputValue = ''"></text>
        </view>
        <button class="r-cancel" open-type="navigateBack" delta="1" @click="isReach = false">
          取消
        </button>
      </view>
      <!-- 搜索列表  -->
      <view class="reach-content" v-show="inputValue">
        <block v-show="searchData.length">
          <view class="li borderBottom" v-for="item in searchData" :key="item.cityId" @click="citySearchList(item)">{{ item.city }}</view>
        </block>
        <view class="has-no-data" v-show="hasNoData">没有找到匹配数据~</view>
      </view>
    </view>
    <!-- 城市列表 -->
    <view v-show="!isReach">
      <view class="top-search">
        <button class="item" @click="isReach = true">
          <text class="iconfont icon-search"></text>
          <text>输入城市名或拼音</text>
        </button>
      </view>
      <scroll-view class="scroll-view" scroll-y scroll-with-animation="true" enable-back-to-top="true" :scroll-into-view="toIndex" @scroll="scrollHandle">
        <view class="block">
          <!-- 当前城市 -->
          <view class="area borderBottom list-item" id="area">
            <view class="title-wrapp">
              <view class="title">
                <text class="l">
                  当前：
                  <text>{{ cityName }}</text>
                </text>

              </view>
            </view>
          </view>
          <view class="area borderBottom list-item" id="area">
            <view class="title-wrapp">
              <view class="title">
                <text class="l">
                  定位/最近访问
                </text>
                <text class="r " @tap="location" :class="{ isHide: isToggle }" @click="location">
                  {{locationShow}}
                  <text class="iconfont" :class="isToggle ? 'icon-arrow-up' : 'icon-arrow-down'"></text>
                </text>
              </view>
            </view>
            <view class="ul" v-if="isToggle">
              <view class="li oneEllipsis" hover-class="hover" :class="{ active: city == item.city }" v-for="item in regionList" :key="item.areaId" @click="selectRegion(item)">
                {{ item.city }}
              </view>
            </view>
          </view>
          <!-- 热门城市 -->
          <view class="area list-item" id="hot">
            <view class="title-wrapp">
              <view class="title">
                <text class="l">热门城市</text>
              </view>
            </view>
            <view class="ul" v-if="hotcites.length">
              <view class="li" hover-class="hover" v-for="item in hotcites" :key="item.cityId" @click="selectCity(item)">{{ item.city }}</view>
            </view>
          </view>
        </view>
        <!-- 城市列表  -->
        <view class="city-list">
          <view class="list list-item" v-for="(item, key) of cities" :key="key" :id="key">
            <view class="title">{{ key }}</view>
            <view class="item borderBottom" hover-class="hover" v-for="innerItem in item" :key="innerItem.cityId" @click="selectCity(innerItem)">
              {{ innerItem.city }}
            </view>
          </view>
        </view>
      </scroll-view>

      <!-- 字母列表 -->
      <view class="alphabet" @touchstart="touchStart" @touchend="touchEnd" @touchmove.stop="touchMove">
        <view v-for="(item, index) in alphabet" :key="index" @touchstart="getLetter" @touchend="setLetter" :id="item">
          <view class="item" :class="{ active: currentLetter == item }">
            {{ item == "area" ? "区县" : item == "hot" ? "热门" : item }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import City from "./city.json";
export default {
  data () {
    return {
      isIPX: null,
      regionId: null, //区域ID
      isToggle: true,
      isReach: false,
      inputValue: "",
      searchData: [], //搜索的数据
      isClearBtn: false,
      regionList: [], //区域列表,模拟数据请自行修改
      cityId: null, //城市ID
      city: '', //区域名,模拟数据请自行修改
      hotcites: [{ "city": "北京", "cityId": 2 }, { "city": "上海", "cityId": 22 }, { "city": "广州", "cityId": 424 }, { "city": "武汉", "cityId": 1321 }], //热门城市，模拟数据请自行修改
      cities: City.data.cities, //城市列表,拟数据请自行修改
      alphabet: [
        "area",
        "hot",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "J",
        "K",
        "L",
        "M",
        "N",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "W",
        "X",
        "Y",
        "Z"
      ], //字母列表
      toIndex: "", //跳转的索引的字母
      tipsLetter: "", //滑动显示字母
      timer: null,
      hasNoData: false,
      searchFocus: false,
      letterDetails: [],
      currentLetter: "area", //默认选择hot
      locationShow: '📌重新定位',
      cityName: ''
    };
  },
  watch: {
    // 城市搜索输入框
    inputValue (newVal) {
      this.isClearBtn = newVal ? true : false;
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (!this.inputValue) {
        this.searchData = [];
        return;
      }
      this.timer = setTimeout(() => {
        const result = [];
        for (let i in this.cities) {
          this.cities[i].forEach(item => {
            if (
              item.spell.includes(this.inputValue) ||
              item.city.includes(this.inputValue)
            ) {
              result.push(item);
            }
          });
        }
        this.searchData = result;
        if (this.searchData.length === 0) {
          this.hasNoData = true;
        } else {
          this.hasNoData = false;
        }
      }, 500);
    },
    isReach (val) {
      this.searchFocus = val;
    }
  },
  computed: {

  },
  async created () {
    // 获取旧城市城市
    this.city = this.$store.state.location.city
    this.cityName = this.$store.state.location.city
    this.regionList.push({ "city": this.$store.state.location.city, "areaId": this.$store.state.location.cityCode })
    //  获定位城市
    let res = await this.$common.getMap()
    console.log(res, "22222222")
    if (res.location) {
      console.log("1", res.map.result.ad_info.city)
      this.regionList.push({ "city": res.map.result.ad_info.city, "areaId": res.map.result.ad_info.city_code })
    } else {
      console.log("2")
    }

  },
  methods: {
    async setCity (item) {
      // console.log("解析地址", item)
      let res = await this.$common.mapAddress(item.city)
      // console.log(res, "city")
      if (res.status == 0) {
        let location = {
          longitude: res.result.location.lng, //经度
          latitude: res.result.location.lat, //纬度
          province: res.result.address_components.province,
          city: res.result.address_components.city, //城市
          cityCode: '',//城市id
          area: res.result.address_components.district, //城市名称
          areaCode: '', //城市code
          address: res.result.address_components.city //地址
        }
        uni.setStorageSync('userMap', location);
        this.$store.commit('setStateAttr', {
          key: 'location',
          val: location
        });
        // 获取页面栈
        let pages = getCurrentPages()
        let page = pages[pages.length - 2]
        // 对上一个页面传参    上一个页面做setPatient监听
        page.$vm.getPositionNew(item)
        // 传完参 用后退即可
        uni.navigateBack({
          delta: 1,
        })

      }


    },
    // 定位操作
    async location () {
      this.locationShow = '定位中...'
      let res = await this.$common.getMap()
      // console.log(res, "7777777777")
      if (res.location) {
        this.regionList[0] = { "city": res.map.result.ad_info.city, "areaId": res.map.result.ad_info.city_code }
        this.city = res.map.result.ad_info.city

        this.cityName = res.map.result.ad_info.city
        let location = {
          longitude: res.map.result.ad_info.location.lng, //经度
          latitude: res.map.result.ad_info.location.lat, //纬度
          province: res.map.result.ad_info.province,
          city: res.map.result.ad_info.city, //城市
          cityCode: res.map.result.ad_info.city_code,//城市id
          area: res.map.result.ad_info.district, //城市名称
          areaCode: res.map.result.ad_info.adcode, //城市code
          address: res.map.result.ad_info.address //地址
        }



        uni.setStorageSync('userMap', location);
        this.$store.commit('setStateAttr', {
          key: 'location',
          val: location
        });
        this.locationShow = '📌重新定位'

      } else {
        this.locationShow = '定位失败'
      }

      return
      var that = this
      that.locationShow = '定位中...'
      uni.getLocation({
        type: 'gcj02',
        geocode: true,
        success: async function (res) {
          console.log(res)
          that.locationShow = '📌重新定位'

          return
          that.longitude = res.longitude
          that.latitude = res.latitude
          let map = await that.$api.mapLocation(res.longitude, res.latitude)
          that.mapLocation = map
          that.position = map.result.address_component.province
          that.show = true
          that.location = {
            longitude: map.result.ad_info.location.lng,
            latitude: map.result.ad_info.location.lat,
            city: map.result.ad_info.city,
            cityCode: map.result.ad_info.areaCode,
            address: map.result.ad_info.province,
          }
        },
      })
      // let That = this;
      // uni.chooseLocation({
      //     success(res){
      // 		console.log(res);
      // 		That.locationCity = res && res.address;
      // 		That.locationName = res && res.name;
      // 		That.selectedCity({city:That.locationCity,name:That.locationName});
      //     },
      // 	fail(){
      // 		That.locationCity = "定位失败，请点击重试";
      // 		That.locationName = "";
      // 	}
      // });
    },
    //列表滚动，和右边字母表对应
    scrollHandle (e) {
      let view = uni.createSelectorQuery().in(this).selectAll(".list-item");
      view.boundingClientRect(d => {
        let top = d[0].top;
        d.forEach(item => {
          item.top = item.top - top;
          item.bottom = item.bottom - top;
          this.letterDetails.push({
            id: item.id,
            top: item.top,
            bottom: item.bottom
          });
        });
      }).exec();
      const scrollTop = e.detail.scrollTop;
      this.letterDetails.some(item => {
        if (scrollTop >= item.top && scrollTop <= item.bottom - 20) {
          this.currentLetter = item.id;
          //当前固定用的是粘性定位，如果不用粘性定位，在这里设置
          return true;
        }
      });
    },
    //搜索
    searchChange (e) {
      let {
        value
      } = e.detail;
      this.inputValue = value;
    },
    //搜索结果列表数据
    citySearchList (item) {
      console.log('选择的城市：', item)
      this.setCity(item)
    },
    selectCity (item) {
      console.log('选择的城市：', item)
      this.setCity(item)
      //当前项目是需要选择到区域，所以选择城市后回到区县的地方
      this.toIndex = "area";
      setTimeout(() => {
        this.toIndex = "";
      }, 1000)
    },
    //区域选择
    selectRegion (item) {
      console.log('选择的区域是：', item)
      this.setCity(item)
    },
    //触发开始
    touchStart (e) {
      // console.log(e);
    },
    //移动时
    touchMove (e) {
      uni.vibrateShort();
      let y = e.touches[0].clientY;
      let offsettop = e.currentTarget.offsetTop;
      //判断选择区域,只在选择区才会生效
      if (y > offsettop) {
        let num = parseInt((y - offsettop) / 15); //右边每个字母元素的高度
        let letter = this.alphabet[num];
        this.tipsLetter = letter;
        let curentLetter = this.letterTransform(letter);
        uni.showToast({
          title: curentLetter,
          icon: "none",
          duration: 1000
        });
      }
    },
    //触发结束
    touchEnd () {
      this.toIndex = this.tipsLetter;
    },
    //移动开始获取字母，并放大提示
    getLetter (e) {
      uni.vibrateShort();
      let {
        id
      } = e.currentTarget;
      this.tipsLetter = id;
      let curentLetter = this.letterTransform(id);
      uni.showToast({
        title: curentLetter,
        icon: "none",
        duration: 1000
      });
    },
    //移动结束设置字母，赋值到toIndex
    setLetter () {
      this.toIndex = this.tipsLetter;
    },
    //提示字母转换
    letterTransform (letter) {
      let str = "";
      if (letter == "area") {
        str = "区县";
      } else if (letter == "hot") {
        str = "热门";
      } else {
        str = letter;
      }
      return str;
    }
  }
};
</script>

<style lang="scss" scoped>
.borderBottom {
  position: relative;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background: #c1c2cd;
    transform: scaleY(0.5);
  }
}
.city-search-wrap {
  width: 100%;
  padding: 0 30rpx;
  box-sizing: border-box;
  .search {
    width: 100%;
    height: 60rpx;
    display: flex;
    align-items: center;
    font-size: 24rpx;
    color: #222;
    padding: 0 30rpx;
    box-sizing: border-box;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;
    background: #fff;
    .l-search {
      flex: 1;
      background: #f4f5f9;
      border-radius: 50rpx;
      position: relative;
      .icon-search {
        font-size: 26rpx;
        position: absolute;
        left: 30rpx;
        top: 50%;
        transform: translateY(-50%);
        color: #8e8f97;
        font-weight: 700;
      }
      .input-search {
        height: 60rpx;
        box-sizing: border-box;
        padding: 0 100rpx 0 100rpx;
        text-align: center;
      }
      .clear-input {
        font-size: 30rpx;
        position: absolute;
        right: 10rpx;
        top: 50%;
        transform: translateY(-50%);
        padding: 10rpx;
        color: #8e8f97;
      }
    }
    .r-cancel {
      margin-left: 28rpx;
      padding-right: 30rpx;
      padding: 0;
      font-size: 30rpx;
      background: transparent;
    }
  }
}
.reach-content {
  padding-top: 60rpx;
  .li {
    font-size: 32rpx;
    color: #333;
    padding: 20rpx 0;
    position: relative;
  }
}
.block {
  padding: 0 30rpx;
  box-sizing: border-box;
}
.borderBottom {
  position: relative;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: calc(100% - 50rpx);
    height: 1px;
    background: #c1c2cd;
    transform: scaleY(0.5);
  }
}
.top-search {
  height: 60rpx;
  line-height: 60rpx;
  padding: 0 30rpx;
  box-sizing: border-box;
  margin-bottom: 20rpx;
  .item {
    background: #f4f5f9;
    border-radius: 50rpx;
    font-size: 24rpx;
    text-align: center;
    color: #8e8f97;
    text {
      padding-left: 20rpx;
      color: #c1c2cd;
    }
    .icon-search {
      font-size: 26rpx;
      color: #8e8f97;
      font-weight: 700;
    }
  }
}
.scroll-view {
  width: 100%;
  height: calc(100vh - 80rpx);
  box-sizing: border-box;
}
.area {
  padding-bottom: 20rpx;
  margin-bottom: 20rpx;
  .title-wrapp {
    position: sticky;
    top: 0;
    left: 0;
    background: #fff;
  }
  .title {
    width: 100%;
    box-sizing: border-box;
    font-size: 40rpx;
    font-weight: 500;
    color: #222;
    font-size: 30rpx;
    font-weight: 500;
    margin: 20rpx 0;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 40rpx;
    .r {
      font-size: 24rpx;
      color: #8e8f97;
      display: inline-block;
      align-items: center;
      .iconfont {
        font-size: 24rpx;
      }
    }
  }
  .ul {
    display: flex;
    flex-wrap: wrap;
    .li {
      width: 202rpx;
      padding: 0 10rpx;
      box-sizing: border-box;
      height: 70rpx;
      line-height: 70rpx;
      text-align: center;
      font-size: 26rpx;
      color: #222;
      border-radius: 10rpx;
      margin: 20rpx 20rpx 0 0;
      background: #f4f5f9;
      &.active {
        font-weight: 500;
        background: #ffde45;
      }
    }
    .hover {
      background: #ffde45;
    }
  }
}
.city-list {
  width: 677rpx;
  padding-bottom: 50rpx;
  .title {
    height: 60rpx;
    line-height: 60rpx;
    font-size: 30rpx;
    font-weight: 500;
    color: #272636;
    background: #f4f5f9;
    margin-bottom: 20rpx;
    padding-left: 30rpx;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 2;
  }
  .item {
    padding: 24rpx 0 24rpx 30rpx;
    color: #333;
    font-size: 32rpx;
    font-weight: 500;
    &::after {
      left: 30rpx;
      width: calc(100% - 30rpx);
      background: #d2d2d2;
    }
  }
  .hover {
    background: #f4f5f9;
    &::after {
      background: #f4f5f9;
    }
  }
}
.alphabet {
  position: fixed;
  right: 0;
  bottom: 20%;
  width: calc(750rpx - 680rpx);
  text-align: center;
  font-size: 20rpx;
  font-weight: 700;
  color: #8e8f97;
  .item {
    height: 15px;
    line-height: 15px;
  }
  .active {
    color: #222;
  }
}
.has-no-data {
  font-size: 24rpx;
  text-align: center;
  color: #8e8f97;
  margin-top: 50rpx;
}
</style>
