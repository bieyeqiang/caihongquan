/*
 * @Author: Jin Biao
 * @Description: 公用api方法
 * @Description: 使用：  this.$common.XXX    例如:this.$common.mapAddress()
 */

import Vue from 'vue'
import { jsonp } from 'vue-jsonp'
import base from '@/api/base'

var vm = new Vue()
export default {
  /**
   * @description:  获取经纬度位置坐标
   * @return {*}
   */
  getMap () {
    let vm = this
    return new Promise((resolve, reject) => {
      uni.getLocation({
        type: 'gcj02',
        geocode: true,
        success: async function (res) {
          console.log(res, 'map坐标')
          let map = await vm.mapLocation(res.longitude, res.latitude);
          console.log(map, "坐标解析")
          let location = {
            location: res,
            map: map,
            longitude: res.longitude,
            latitude: res.latitude,
            city: map.result.address_component.province,
            address: map.result.address
          }
          resolve(location)
        },
        fail: (err) => {
          console.log('error', err)
        }
      });
    })
  },
  /**
   * @description:  地址 解析成经纬度
   * @param {*} address  地址信息
   * @return {*}
   */
  mapAddress (address) {
    return new Promise((resolve, reject) => {
      //#ifdef  MP-WEIXIN || APP-PLUS
      uni.request({
        url: "https://apis.map.qq.com/ws/geocoder/v1/?coord_type=5&get_poi=1&key=" + base.wxmapKey + "&address=" + address, //仅为示例，并非真实接口地址。
        data: {},
        success: (res) => {
          resolve(res.data)
        }
      });
      //#endif
      //#ifdef  H5
      jsonp(
        "https://apis.map.qq.com/ws/geocoder/v1/?coord_type=5&get_poi=1&output=jsonp&key=" + base.wxmapKey + "&address=" + address
      ).then((res) => {
        resolve(res)
      });
      //#endif
    })
  },
  /**
 * @description:  坐标地址 解析成地址名称
 * @param {*} longitude  经度
 * @param {*} latitude  纬度
 * @return {*}
 */
  mapLocation (longitude, latitude) {
    return new Promise((resolve, reject) => {
      let location = latitude + ',' + longitude
      console.log(location)
      //#ifdef  MP-WEIXIN || APP-PLUS
      uni.request({
        url: "https://apis.map.qq.com/ws/geocoder/v1/?get_poi=1&key=" + base.wxmapKey + "&location=" + location,
        data: {},
        success: (res) => {
          resolve(res.data)
        }
      });
      //#endif
      //#ifdef  H5
      jsonp(
        "https://apis.map.qq.com/ws/geocoder/v1/?get_poi=1&output=jsonp&key=" + base.wxmapKey + "&location=" + location
      ).then((res) => {
        resolve(res)
      });
      //#endif
    })
  },
generateUniqueFileName(fileName) {
	const extension = fileName.split('.').pop();
  const timestamp = Date.now(); // 获取当前时间戳
  const randomNum = Math.floor(Math.random() * 10000); // 生成一个随机数
 // const extension = file.split('/')[1];
  return `${timestamp}_${randomNum}.${extension}`; // 组合时间戳和随机数，确保唯一
},
  /**
 * 设置系统剪贴板的内容
 * @param {string} data 需要设置的内容
 * @returns {Promise} 设置状态
 */
  setClipboardData (data) {
    return new Promise((success, fail) => {
      // #ifndef H5
      uni.setClipboardData({ data, success, fail });
      // #endif

      // #ifdef H5
      const textarea = document.createElement('textarea');
      textarea.value = data;
      textarea.readOnly = 'readOnly';
      document.body.appendChild(textarea);
      textarea.select();
      textarea.setSelectionRange(0, data.length);
      document.execCommand('copy');
      textarea.remove();
      success(data);
      // #endif
    });
  },

  /**
   * 获取系统剪贴板内容
   * @returns {Promise} 剪贴板内容
   */
  getClipboardData () {
    return new Promise((success, fail) => {
      // #ifndef H5
      uni.getClipboardData({ success, fail });
      // #endif

      // #ifdef H5
      navigator.clipboard.readText().then(success).catch(fail);
      // #endif
    });
  }
}
