/*
 * @Author: Jin Biao
 * @Date: 2019-03-25 10:47:45
 * @Title: 请求外部的api组件
 * @Description: 用于请求uniCloud以为 外部的接口
 * flyio组件官网https://wendux.github.io/dist/#/doc/flyio/wx
 */

import base from './base.js'

//#ifdef APP-PLUS
plus.screen.unlockOrientation(); //解除锁定
plus.screen.lockOrientation('portrait-primary'); //锁定
//#endif

import Fly from 'flyio/dist/npm/wx'
const fly = new Fly()
const host = base.baseUrl


let timer = {}
let that = this
//添加请求拦截器
fly.interceptors.request.use((request) => {
  clearTimeout(timer)
  uni.hideLoading();
  uni.hideLoading();
  timer = setTimeout(function () {
    uni.showLoading({
      title: '请稍后...'
    });
  }, 800)
  request.headers['token'] = uni.getStorageSync('pbw_user_token');
  request.headers['uid'] = uni.getStorageSync('pbw_user_uid');
  return request;
});

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use((response) => {
  //只将请求结果的data字段返回
  clearTimeout(timer)
  uni.hideLoading();
  if (response.data.code === '777777') {
    uni.removeStorageSync('pbw_user_uid');
    uni.removeStorageSync('pbw_user_token');
    let pages = getCurrentPages() //获取加载的页面
    let currentPage = pages[pages.length - 1] //获取当前页面的对象
    let UrlData = currentPage.route //当前页面url

    if (UrlData.indexOf("pagesA/login/auth/login") > -1) {
      return false
    } else {
      uni.navigateTo({
        url: '/pagesA/login/auth/login?login=login',
        animationType: 'slide-in-bottom',
      });
    }
  }
  return response.data
}, (err) => {
  //发生网络错误后会走到这里
  // clearTimeout(timer)
  // uni.hideLoading();
  uni.showLoading({
    title: '您的网络不稳定，请刷新再试',
  });
  if (err) {
    return "您的网络不稳定，请稍后再试";
  };
}
)

//设置超时
fly.config.timeout = 15000;
//设置请求基地址
fly.config.baseURL = host;

export default fly;
