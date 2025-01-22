<!--模板-->
<template>
  <view class="faxian">
    <!-- swiper中的transfrom会使fixed失效,此时需设置fixed为false,而top会自动使用padding-top -->
    <mescroll-uni style="width: 100%; height: 100%; background: #ffffff;" :fixed="true" bottom="150" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @emptyclick="emptyClick" @init="mescrollInit">
      <view class="pubu">
        <view class="yg yg_l clear">
          <view class="item" v-for="(item, index) of fallsList" :key="index" v-if="index % 2 == 0 && item.dynamicImg.length != 0" @tap.stop="tab_content(item._id)">
            <view style="position: relative;">
              <image lazy-load class="pu_img" mode="widthFix" :src="item.dynamicImg[0]" alt=""></image>
              <view class="u_xinx">
                <image :src="item.userInfo.avatar" alt="" />
                <text>{{ item.userInfo.nickname }}</text>
              </view>
            </view>
            <view class="u_text">{{ item.dynamicContext }}</view>
          </view>
        </view>
        <view class="yg yg_r clear">
          <view class="item" v-for="(item, index) of fallsList" :key="index" v-if="index % 2 == 1 && item.dynamicImg.length != 0" @tap.stop="tab_content(item._id)">
            <view style="position: relative;">
              <image lazy-load class="pu_img" mode="widthFix" :src="item.dynamicImg[0]" alt=""></image>
              <view class="u_xinx">
                <image :src="item.userInfo.avatar" alt="" />
                <text>{{ item.userInfo.nickname }}</text>
              </view>
            </view>
            <view class="u_text">{{ item.dynamicContext }}</view>
          </view>
        </view>
        <view style="clear: both; height: 150px;"></view>
      </view>
    </mescroll-uni>
    <view style="height: 500px;"></view>
  </view>
</template>

<!--JS-->
<script>
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
export default {
  components: {
    MescrollUni,
  },
  props: {
    index: "",
  },
  data() {
    return {
      fallsList: [],
      latitude: "",
      longitude: "",
      downOption: {
        auto: false, // 不自动加载
      },
      mescroll: null,
      upOption: {
        auto: false, // 不自动加载
        page: {
          num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
          size: 20, // 每页数据的数量
        },
        noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
        empty: {
          tip: "~ 空空如也 ~", // 提示
          btnText: "去看看",
        }
      },
      isInit: false,
    };
  },
  watch: {
    index(index) {
      if (index == 2) {
        if (!this.isInit) {
          this.mescroll.triggerDownScroll();
          this.isInit = true;
        }
      }
    },
  },
  methods: {
    // 内容
    tab_content(code) {
      uni.navigateTo({
        url: "/pagesA/nearby/nearbyText/nearbyText?code=" + code,
      });
    },
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    /*下拉刷新的回调 */
    downCallback(mescroll) {
      // 这里加载你想下拉刷新的数据, 比如刷新轮播数据
      // loadSwiper();
      // 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
      mescroll.resetUpScroll();
    },
    /*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
    async upCallback(mescroll) {
      const res = await this.$request("nearby", "nearbyList", {
        offset: (mescroll.num - 1) * mescroll.size,
        limit: mescroll.size,
        state: 0
      });
      if (res.data) {
        if (mescroll.num == 1) this.fallsList = []; //第一页清空
        this.fallsList = this.fallsList.concat(res.data);//追加新数据
        mescroll.endSuccess(res.data.length); //结束加载状态
      } else {
        mescroll.endErr();//失败
      }
    },
    //点击空布局按钮的回调
    emptyClick() {
      uni.showToast({
        title: "点击了按钮,具体逻辑自行实现",
      });
    },
  },
  created() {

  },
};
</script>

<!--css样式-->
<style  lang="scss" scoped>
.faxian {
  width: 100%;
  height: 100vh;
}
.clear:after {
  content: "";
  display: block;
  clear: both;
}

.pu_img {
  width: 100.2%;
  border-radius: 10rpx 10rpx 0 0;
}

.pubu {
  width: calc(100% - 16px);
  height: 100%;
  margin-left: 8px;
  margin-top: 20px;
}
.yg image {
  width: 100%;
  border-radius: 8px 8px 0 0;
}
.yg .u_text {
  font-size: 24rpx;
  padding: 30rpx 20rpx;
  box-sizing: border-box;
  color: #959595;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /*autoprefixer: on */
}
.yg_l,
.yg_r {
  width: calc(50% - 5px);
  height: 100%;
}
.yg .item {
  background: #ffffff;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 4rpx 6rpx 10rpx #999;
}
.yg_l {
  float: left;
}
.yg_r {
  float: right;
}
.u_xinx {
  position: absolute;
  bottom: -11px;
}
.u_xinx image {
  margin-left: 10upx;
  background: rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  width: 50upx;
  height: 50upx;
  border-radius: 50%;
  display: inline-block;
  margin-right: 10upx;
}
.u_xinx text {
  position: relative;
  text-shadow: 0 1px 1px #333;
  top: -8px;
  color: #fff;
  font-size: 25rpx;
}
</style>
