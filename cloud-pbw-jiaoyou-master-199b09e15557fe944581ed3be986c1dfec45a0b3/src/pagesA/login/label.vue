<template>
  <view class="labelBg">
    <view class="title">选择你的标签</view>
    <view class="label_num">
      <view>
        已选标签
        <span style="color: #eb5248;">{{ labelDataList.length }}</span>
        （最多5个）
      </view>
    </view>
    <checkbox-group @change="labelChange">
      <view class="labelList" v-for="(data, key) in labelData" :key="key">
        <view class="label_title">{{ data.title }}</view>
        <label :class="item.checked ? 'checkbox selectBox' : 'checkbox '" v-for="(item, index) in data.Children" :key="index" @click="labelBtn(item, index, key)">
          <checkbox :value="item.value" :checked="item.checked" v-show="false" />
          {{ item.name }}
        </label>
      </view>
    </checkbox-group>
    <view class="nextBg">
      <u-button type="primary" ripple shape="circle" @click="next">下一步</u-button>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      labelDataList: [],
      labelData: [],
      constellation: [
        {
          code: 1,
          constellationName: "白羊座",
        },
        {
          code: 2,
          constellationName: "金牛座",
        },
        {
          code: 3,
          constellationName: "双子座",
        },
        {
          code: 4,
          constellationName: "巨蟹座",
        },
        {
          code: 5,
          constellationName: "狮子座",
        },
        {
          code: 6,
          constellationName: "处女座",
        },
        {
          code: 7,
          constellationName: "天秤座",
        },
        {
          code: 8,
          constellationName: "天蝎座",
        },
        {
          code: 9,
          constellationName: "射手座",
        },
        {
          code: 10,
          constellationName: "摩羯座",
        },
        {
          code: 11,
          constellationName: "水瓶座",
        },
        {
          code: 12,
          constellationName: "双鱼座",
        },
      ],
      labelList: [
        {
          "code": 1,
          "labelsName": "专一",
          "labelsSort": 1,
          "sortName": "性格"
        },
        {
          "code": 2,
          "labelsName": "浪漫",
          "labelsSort": 1,
          "sortName": "性格"
        },
        {
          "code": 3,
          "labelsName": "理性",
          "labelsSort": 1,
          "sortName": "性格"
        },
        {
          "code": 7,
          "labelsName": "感性",
          "labelsSort": 1,
          "sortName": "性格"
        },
        {
          "code": 8,
          "labelsName": "善变",
          "labelsSort": 1,
          "sortName": "性格"
        },
        {
          "code": 9,
          "labelsName": "热情",
          "labelsSort": 1,
          "sortName": "性格"
        },
        {
          "code": 10,
          "labelsName": "乐观",
          "labelsSort": 1,
          "sortName": "性格"
        },
        {
          "code": 11,
          "labelsName": "内向",
          "labelsSort": 1,
          "sortName": "性格"
        },
        {
          "code": 12,
          "labelsName": "中二",
          "labelsSort": 1,
          "sortName": "性格"
        },
        {
          "code": 13,
          "labelsName": "居家",
          "labelsSort": 1,
          "sortName": "性格"
        },
        {
          "code": 14,
          "labelsName": "爱冒险",
          "labelsSort": 1,
          "sortName": "性格"
        },
        {
          "code": 15,
          "labelsName": "控制狂",
          "labelsSort": 1,
          "sortName": "性格"
        },
        {
          "code": 16,
          "labelsName": "工作狂",
          "labelsSort": 1,
          "sortName": "性格"
        },
        {
          "code": 17,
          "labelsName": "偏执狂",
          "labelsSort": 1,
          "sortName": "性格"
        },
        {
          "code": 18,
          "labelsName": "讨好型",
          "labelsSort": 1,
          "sortName": "性格"
        },
        {
          "code": 19,
          "labelsName": "理想主义",
          "labelsSort": 1,
          "sortName": "性格"
        },
        {
          "code": 20,
          "labelsName": "完美主义",
          "labelsSort": 1,
          "sortName": "性格"
        },
        {
          "code": 21,
          "labelsName": "性感",
          "labelsSort": 2,
          "sortName": "自我描述"
        },
        {
          "code": 22,
          "labelsName": "逗比",
          "labelsSort": 2,
          "sortName": "自我描述"
        },
        {
          "code": 23,
          "labelsName": "吃货",
          "labelsSort": 2,
          "sortName": "自我描述"
        },
        {
          "code": 24,
          "labelsName": "霸气",
          "labelsSort": 2,
          "sortName": "自我描述"
        },
        {
          "code": 25,
          "labelsName": "暖男",
          "labelsSort": 2,
          "sortName": "自我描述"
        },
        {
          "code": 26,
          "labelsName": "夜猫子",
          "labelsSort": 2,
          "sortName": "自我描述"
        },
        {
          "code": 27,
          "labelsName": "话唠",
          "labelsSort": 2,
          "sortName": "自我描述"
        },
        {
          "code": 28,
          "labelsName": "宅",
          "labelsSort": 2,
          "sortName": "自我描述"
        },
        {
          "code": 29,
          "labelsName": "腹黑",
          "labelsSort": 2,
          "sortName": "自我描述"
        },
        {
          "code": 30,
          "labelsName": "选择恐惧症",
          "labelsSort": 2,
          "sortName": "自我描述"
        },
        {
          "code": 31,
          "labelsName": "数码控",
          "labelsSort": 2,
          "sortName": "自我描述"
        },
        {
          "code": 32,
          "labelsName": "颜值控",
          "labelsSort": 2,
          "sortName": "自我描述"
        },
        {
          "code": 33,
          "labelsName": "好奇心",
          "labelsSort": 2,
          "sortName": "自我描述"
        },
        {
          "code": 34,
          "labelsName": "情商高",
          "labelsSort": 2,
          "sortName": "自我描述"
        },
        {
          "code": 35,
          "labelsName": "聪明伶俐",
          "labelsSort": 2,
          "sortName": "自我描述"
        },
        {
          "code": 36,
          "labelsName": "拖延症",
          "labelsSort": 2,
          "sortName": "自我描述"
        },
        {
          "code": 37,
          "labelsName": "性感",
          "labelsSort": 3,
          "sortName": "外型"
        },
        {
          "code": 38,
          "labelsName": "前卫",
          "labelsSort": 3,
          "sortName": "外型"
        },
        {
          "code": 39,
          "labelsName": "文艺",
          "labelsSort": 3,
          "sortName": "外型"
        },
        {
          "code": 40,
          "labelsName": "清新",
          "labelsSort": 3,
          "sortName": "外型"
        },
        {
          "code": 41,
          "labelsName": "小鲜肉",
          "labelsSort": 3,
          "sortName": "外型"
        },
        {
          "code": 42,
          "labelsName": "大叔",
          "labelsSort": 3,
          "sortName": "外型"
        },
        {
          "code": 43,
          "labelsName": "纹身",
          "labelsSort": 3,
          "sortName": "外型"
        },
        {
          "code": 44,
          "labelsName": "肌肉男",
          "labelsSort": 3,
          "sortName": "外型"
        },
        {
          "code": 45,
          "labelsName": "理工男",
          "labelsSort": 3,
          "sortName": "外型"
        },
        {
          "code": 46,
          "labelsName": "潮男",
          "labelsSort": 3,
          "sortName": "外型"
        },
        {
          "code": 47,
          "labelsName": "潮女",
          "labelsSort": 3,
          "sortName": "外型"
        },
        {
          "code": 48,
          "labelsName": "自驾",
          "labelsSort": 4,
          "sortName": "兴趣"
        },
        {
          "code": 49,
          "labelsName": "游戏",
          "labelsSort": 4,
          "sortName": "兴趣"
        },
        {
          "code": 50,
          "labelsName": "逛街",
          "labelsSort": 4,
          "sortName": "兴趣"
        },
        {
          "code": 51,
          "labelsName": "烘焙",
          "labelsSort": 4,
          "sortName": "兴趣"
        },
        {
          "code": 52,
          "labelsName": "摄影",
          "labelsSort": 4,
          "sortName": "兴趣"
        },
        {
          "code": 53,
          "labelsName": "读书",
          "labelsSort": 4,
          "sortName": "兴趣"
        },
        {
          "code": 54,
          "labelsName": "铲屎官",
          "labelsSort": 4,
          "sortName": "兴趣"
        },
        {
          "code": 55,
          "labelsName": "旅行",
          "labelsSort": 4,
          "sortName": "兴趣"
        },
        {
          "code": 56,
          "labelsName": "酒",
          "labelsSort": 4,
          "sortName": "兴趣"
        },
        {
          "code": 57,
          "labelsName": "收藏",
          "labelsSort": 4,
          "sortName": "兴趣"
        },
        {
          "code": 58,
          "labelsName": "手工",
          "labelsSort": 4,
          "sortName": "兴趣"
        },
        {
          "code": 59,
          "labelsName": "运动",
          "labelsSort": 4,
          "sortName": "兴趣"
        },
        {
          "code": 60,
          "labelsName": "LOL",
          "labelsSort": 4,
          "sortName": "兴趣"
        },
        {
          "code": 61,
          "labelsName": "王者荣耀",
          "labelsSort": 4,
          "sortName": "兴趣"
        },
        {
          "code": 62,
          "labelsName": "麻将",
          "labelsSort": 4,
          "sortName": "兴趣"
        },
        {
          "code": 63,
          "labelsName": "动漫",
          "labelsSort": 4,
          "sortName": "兴趣"
        },
        {
          "code": 64,
          "labelsName": "绘画",
          "labelsSort": 4,
          "sortName": "兴趣"
        },
        {
          "code": 65,
          "labelsName": "唱歌",
          "labelsSort": 4,
          "sortName": "兴趣"
        },
        {
          "code": 66,
          "labelsName": "桌游",
          "labelsSort": 4,
          "sortName": "兴趣"
        },
        {
          "code": 67,
          "labelsName": "追剧",
          "labelsSort": 4,
          "sortName": "兴趣"
        },
        {
          "code": 68,
          "labelsName": "二次元",
          "labelsSort": 4,
          "sortName": "兴趣"
        },
        {
          "code": 69,
          "labelsName": "写作",
          "labelsSort": 4,
          "sortName": "兴趣"
        },
        {
          "code": 70,
          "labelsName": "音乐",
          "labelsSort": 4,
          "sortName": "兴趣"
        },
        {
          "code": 71,
          "labelsName": "轮滑",
          "labelsSort": 5,
          "sortName": "运动"
        },
        {
          "code": 72,
          "labelsName": "滑板",
          "labelsSort": 5,
          "sortName": "运动"
        },
        {
          "code": 73,
          "labelsName": "舞蹈",
          "labelsSort": 5,
          "sortName": "运动"
        },
        {
          "code": 74,
          "labelsName": "跆拳道",
          "labelsSort": 5,
          "sortName": "运动"
        },
        {
          "code": 75,
          "labelsName": "垂钓",
          "labelsSort": 5,
          "sortName": "运动"
        },
        {
          "code": 76,
          "labelsName": "骑行",
          "labelsSort": 5,
          "sortName": "运动"
        },
        {
          "code": 77,
          "labelsName": "篮球",
          "labelsSort": 5,
          "sortName": "运动"
        },
        {
          "code": 78,
          "labelsName": "足球",
          "labelsSort": 5,
          "sortName": "运动"
        },
        {
          "code": 79,
          "labelsName": "乒乓球",
          "labelsSort": 5,
          "sortName": "运动"
        },
        {
          "code": 80,
          "labelsName": "健身",
          "labelsSort": 5,
          "sortName": "运动"
        },
        {
          "code": 81,
          "labelsName": "跑步",
          "labelsSort": 5,
          "sortName": "运动"
        },
        {
          "code": 82,
          "labelsName": "瑜伽",
          "labelsSort": 5,
          "sortName": "运动"
        },
        {
          "code": 83,
          "labelsName": "爬山",
          "labelsSort": 5,
          "sortName": "运动"
        },
        {
          "code": 84,
          "labelsName": "射击",
          "labelsSort": 5,
          "sortName": "运动"
        },
        {
          "code": 85,
          "labelsName": "射箭",
          "labelsSort": 5,
          "sortName": "运动"
        },
        {
          "code": 86,
          "labelsName": "高尔夫",
          "labelsSort": 5,
          "sortName": "运动"
        },
        {
          "code": 87,
          "labelsName": "游泳",
          "labelsSort": 5,
          "sortName": "运动"
        },
        {
          "code": 88,
          "labelsName": "台球",
          "labelsSort": 5,
          "sortName": "运动"
        },
        {
          "code": 89,
          "labelsName": "露营",
          "labelsSort": 5,
          "sortName": "运动"
        },
        {
          "code": 90,
          "labelsName": "徒步",
          "labelsSort": 5,
          "sortName": "运动"
        },
        {
          "code": 91,
          "labelsName": "羽毛球",
          "labelsSort": 5,
          "sortName": "运动"
        },
        {
          "code": 92,
          "labelsName": "街舞",
          "labelsSort": 5,
          "sortName": "运动"
        }
      ]
    };
  },
  methods: {
    getAges (str) {
      var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
      if (r == null) return false;
      var d = new Date(r[1], r[3] - 1, r[4]);
      if (
        d.getFullYear() == r[1] &&
        d.getMonth() + 1 == r[3] &&
        d.getDate() == r[4]
      ) {
        var Y = new Date().getFullYear();
        return (Y - r[1]);
      }
      return "输入的日期格式错误！";
    },
    async userName () {
      // 保存资料
      let birthday = uni.getStorageSync("login_dateBirthStr")
      const res = await this.$request("user", "update", {
        avatar: uni.getStorageSync("login_headImg"), // 头像
        nickname: uni.getStorageSync("login_name"), // 昵称
        gender: uni.getStorageSync("login_sex"), // 1男 2女 0保密
        photoWall: uni.getStorageSync("login_files"), // 照片墙
        birthday: birthday, // 生日
        birthdayText: this.getAges(birthday),
        constellation: uni.getStorageSync("login_constellation"), // 星座
        label: this.labelDataList, // 标签
      });
      if (res) {
        console.log(res)
        uni.navigateTo({
          url: '/pagesA/login/mask?type=login&uid=' + uni.getStorageSync('userInfo')._id,
        });
      }
    },
    next () {
      if (this.labelDataList.length == 0) {
        uni.showToast({
          title: "请至少选择1个标签",
          icon: "none",
          duration: 3000,
        });
        return;
      }
      this.userName();
    },
    labelBtn (item, index, key) {
      if (this.labelDataList.join(",").indexOf(item.name) > -1) {
        for (let label in this.labelDataList) {
          if (this.labelDataList[label] == item.name) {
            this.labelDataList.splice(label, 1);
          }
        }
        this.labelData[key].Children[index].checked = false;
        return;
      }
      if (this.labelDataList.length >= 5) {
        uni.showToast({
          title: "个人标签最多5个",
          icon: "none",
          duration: 3000,
        });
        return;
      }
      this.labelData[key].Children[index].checked = true;
      this.labelDataList.push(item.name);
    },
    labelChange (e) { },
  },
  mounted () {
    // 格式化标签
    let labelData = [],
      lab = 1;
    for (let item in this.labelList) {
      if (this.labelList[item].labelsSort == lab) {
        let data = {
          title: this.labelList[item].sortName,
          sort: this.labelList[item].labelsSort,
          Children: [],
        };
        for (let index in this.labelList) {
          if (this.labelList[index].labelsSort == lab) {
            let key = {
              name: this.labelList[index].labelsName,
              value: this.labelList[index].code,
              checked: false,
            };
            data.Children.push(key);
          }
        }
        labelData.push(data);
        lab++;
      }
    }
    this.labelData = labelData;
  },
};
</script>

<style lang="scss" scoped>
.labelList {
  border-bottom: 1rpx solid #f5f5f5;
}
.nextBg {
  position: fixed;
  bottom: 50rpx;
  left: 50%;
  width: 60%;
  margin-left: -30%;
}
.label_num {
  text-align: center;
  margin-bottom: 20rpx;
}
.labelBg {
  padding: 20rpx 20rpx 150rpx 20rpx;
}
.title {
  font-size: 50rpx;
  font-weight: bold;
  margin: 20rpx 0;
  text-align: center;
}
.label_title {
  padding: 10rpx 20rpx;
  font-size: 30rpx;
}
.selectBox {
  background: #5856d5 !important;
  color: #fff !important;
}
.checkbox {
  padding: 10rpx 20rpx;
  margin: 20rpx;
  border-radius: 7rpx;
  color: #434343;
  display: inline-block;
  background: #f2f2f2;
}
</style>
