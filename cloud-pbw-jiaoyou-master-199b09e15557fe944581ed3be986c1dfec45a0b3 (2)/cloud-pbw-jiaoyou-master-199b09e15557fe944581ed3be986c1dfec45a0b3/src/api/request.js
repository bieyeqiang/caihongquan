/*
 * @Author: Jin Biao
 * @Date: 2020-08-10 08:33:46
 * @Title: 云函数映射请求
 */

import store from '@/store'
import cache from '@/common/js/cache'
import { msg } from '@/common/js/util'

//云函数映射
const moduleMap = {
  user: 'jw-user',
  attest: 'jw-user',
  payment: 'jw-order',
  order: 'jw-order',
  smsCode: 'jw-sms',
  address: 'jw-address',
  live: 'jw-live',
  service: 'jw-service',
  travel: 'jw-travel',
  vip: 'jw-vip',
  jd: 'jw-travel',
  poi: 'jw-poi',
  security: 'jw-security',
  vipOrder: 'jw-order',
}

/**
 * @param {String} module
 * @param {String} operation
 * @param {Object} data 请求参数
 * @param {Object} ext 附加参数
 * @param {Number} ext.cache 数据缓存时间，秒
 */
export const request = (module, operation, data = {}, ext = {}) => {
  return new Promise((resolve, reject) => {
    const cloudFnName = moduleMap[module] || 'jw-function';
    if (ext.cache > 0) {
      const cacheResult = cache.get(cloudFnName + '-' + module + '-' + operation);
      if (cacheResult !== false && cacheResult.status !== 0) {
        resolve(cacheResult);
        return;
      }
    }
    // uniCloud.callFunction({
    //   name: cloudFnName,
    //   data: {
    //     module,
    //     operation,
    //     data
    //   }
    // }).then(res => {

    //   // #ifdef  MP-WEIXIN
    //   if (res.result && typeof res.result.openExamineWx !== 'undefined') {
    //     store.commit('setStateAttr', {
    //       key: 'openExamineWx',
    //       val: res.result.openExamineWx
    //     });
    //     store.commit('setStateAttr', {
    //       key: 'openExamineApp',
    //       val: false
    //     });
    //   }
    //   // #endif

    //   // #ifdef  APP-PLUS
    //   if (res.result && typeof res.result.openExamineApp !== 'undefined') {
    //     store.commit('setStateAttr', {
    //       key: 'openExamineApp',
    //       val: res.result.openExamineApp
    //     });
    //     store.commit('setStateAttr', {
    //       key: 'openExamineWx',
    //       val: false
    //     });
    //   }
    //   // #endif

    //   // #ifdef  H5
    //   store.commit('setStateAttr', {
    //     key: 'openExamineApp',
    //     val: false
    //   });
    //   store.commit('setStateAttr', {
    //     key: 'openExamineWx',
    //     val: false
    //   });
    //   // #endif

    //   // 功能模块
    //   if (res.result && typeof res.result.openModule !== 'undefined') {
    //     store.commit('setStateAttr', {
    //       key: 'openModule',
    //       val: res.result.openModule
    //     });
    //   }

    //   if (res.result) {
    //     const code = res.result.code;
    //     //token无效
    //     if (code === 30201 || code === 30202 || code === 30203 || code === 30204) {
    //       msg('登录信息已过期，请重新登录');
    //       store.commit('logout');

    //       setTimeout(() => {
    //         let pages = getCurrentPages() //获取加载的页面
    //         let currentPage = pages[pages.length - 1] //获取当前页面的对象
    //         let UrlData = currentPage.route //当前页面url

    //         if (UrlData.indexOf("pagesA/login/auth/login") > -1) {
    //           return false
    //         } else {
    //           uni.navigateTo({
    //             url: '/pagesA/login/auth/login',
    //             animationType: 'slide-in-bottom',
    //           });
    //         }
    //       }, 1000)
    //       reject('无效的登录信息');
    //       return;
    //     } else if (code === 10001) {
    //       msg('用户已被禁用，请联系客服处理');
    //       if (operation !== 'login' && operation !== 'loginByWeixin') {
    //         store.commit('logout');
    //       }
    //       setTimeout(() => {
    //         uni.switchTab({
    //           url: '/pages/tabbar/home'
    //         })
    //       }, 1200)
    //       reject('用户被禁用');
    //       return;
    //     }
    //   }
    //   if (ext.cache > 0) {
    //     cache.put(cloudFnName + '-' + module + '-' + operation, res.result, ext.cache);
    //   }

    //   resolve(res.result);
    // }).catch((err) => {
    //     msg('网络连接超时，请检查网络设置');
    //   reject(err);
    // })
  })
}
