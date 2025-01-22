<!--模板-->
<template>
  <view class="qiuzhu">
    <!-- swiper中的transfrom会使fixed失效,此时需设置fixed为false,而top会自动使用padding-top -->
    <mescroll-uni style="width: 100%; height: 100%;" top="0" :fixed="true" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @emptyclick="emptyClick" @init="mescrollInit">
      <mood-list :nearbyList="nearbyList"></mood-list>
    </mescroll-uni>
  </view>
</template>

<!--JS-->
<script>
import moodList from './moodList'
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
export default {
  components: {
    MescrollUni,
    moodList
  },
  props: {
    index: "",
    tabTime: "",
  },
  data () {
    return {
      userCode: "",
      giveIndex: "",
      nearbyList: [],
      latitude: "",
      longitude: "",
      downOption: {
        auto: false, // 不自动加载
        bgColor: "#FFFFFF",
      },
      mescroll: null,
      upOption: {
        auto: false, // 不自动加载
        page: {
          num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
          size: 6, // 每页数据的数量
        },
        noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
        empty: {
          tip: "~ 空空如也 ~", // 提示
          btnText: "去看看",
        },
      },

      isInit: false,
    };
  },
  watch: {
    index (index) {
      if (index == 4) {
        if (!this.isInit) {
          this.mescroll.triggerDownScroll();
          this.isInit = true;
        }
      }
    },
    tabTime (val) {
      this.mescroll.triggerDownScroll();
      this.isInit = true;
    },
  },
  methods: {
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit (mescroll) {
      this.mescroll = mescroll;
    },
    /*下拉刷新的回调 */
    downCallback (mescroll) {
      // 这里加载你想下拉刷新的数据, 比如刷新轮播数据
      // loadSwiper();
      // 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
      mescroll.resetUpScroll();
    },
    /*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
    async upCallback (mescroll) {
      // 获取列表
      const res = await this.$request("nearby", "nearbyList", {
        dynamicType: 3,
        offset: (mescroll.num - 1) * mescroll.size,
        limit: mescroll.size,
        state:0
      });
      if (res.data) {
        if (mescroll.num == 1) this.nearbyList = []; //第一页清空
        this.nearbyList = this.nearbyList.concat(res.data);//追加新数据
        mescroll.endSuccess(res.data.length); //结束加载状态
      } else {
        mescroll.endErr();//失败
      }
    },
    //点击空布局按钮的回调
    emptyClick () {
      uni.showToast({
        title: "点击了按钮,具体逻辑自行实现",
      });
    },
  },

};
</script>

<!--css样式-->
<style lang="scss">
.qiuzhu {
  width: 100%;
  height: 100vh;
}
</style>
