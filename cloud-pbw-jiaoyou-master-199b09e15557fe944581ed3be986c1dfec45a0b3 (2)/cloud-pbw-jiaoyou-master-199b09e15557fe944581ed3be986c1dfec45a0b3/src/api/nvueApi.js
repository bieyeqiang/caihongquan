/*
 * @Author: Jin Biao
 * @Date: 2020-10-18 10:50:10
 * @Title: nvue文件的api请求
 */

import { request } from './request'

export const $request = (module, operation, data = {}, ext = {}) => {
  // 打印请求
  // console.log('请求发起：' + module + '/' + operation + '参数：' + JSON.stringify(data) + '附加参数' + JSON.stringify(ext));
  if (ext.login && !this.$util.isLogin()) {
    return;
  }
  if (ext.showLoading) {
    this.isLoading = true;
  }
  return new Promise((resolve, reject) => {
    request(module, operation, data, ext).then(result => {
      // 打印返回参数
      // console.log('请求返回参数：' + JSON.stringify(result))
      resolve(result);
    }).catch((err) => {
      reject(err);
    })
  })
}

export default $request;
