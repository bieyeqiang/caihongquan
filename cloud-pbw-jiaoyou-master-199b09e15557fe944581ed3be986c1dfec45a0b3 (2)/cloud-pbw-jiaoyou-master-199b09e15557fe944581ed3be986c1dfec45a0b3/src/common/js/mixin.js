/*
 * @Author: Jin Biao
 * @Date: 2020-08-08 13:31:46
 * @Title: 通用mixin
 */

import { request } from '@/api/request';

export default {
  data() {
    return {
      page: 0, //页码
      pageNum: 6, //每页加载数据量
      loadingType: 1, //0加载前 1加载中 2没有更多
      isLoading: false, //刷新数据
      loaded: false, //加载完毕
    };
  },
  methods: {
    /**
     * toast提示
     * @param {String} title
     * @param {Object} icon
     * @param {Object} duration
     */
    msg(title, icon = 'none', duration = 3000) {
      setTimeout(() => {
        uni.showToast({
          title: title,
          duration: duration,
          icon: icon,
        });
      }, 1000);
    },
    goBack(val = 1) {
      uni.navigateBack({
        delta: val,
      });
    },
    /**
     * goPage跳转页面
     * @param {String} url
     * @param {Object} options
     * @param {Boolean} options.login 是否检测登录
     */
    goPage(url, login = false, type = 'navigateTo') {
      this.$util.throttle(() => {
        if (login) {
          if (!uni.getStorageSync('uniIdToken') || !uni.getStorageSync('userInfo')) {
            url = '/pagesA/login/auth/login';
          }
        }
        if (!url) {
          return;
        }
        // 跳转类型
        if (type == 'navigateTo') uni.navigateTo({ url });
        if (type == 'redirectTo') uni.redirectTo({ url });
        if (type == 'reLaunch') uni.reLaunch({ url });
        if (type == 'switchTab') uni.switchTab({ url });
      }, 300);
    },
    goUrl(url, login = false) {
      if (login) {
        if (!uni.getStorageSync('uniIdToken') || !uni.getStorageSync('userInfo')) {
          url = '/pagesA/login/auth/login';
        }
      }
      // 外链
      if (url.indexOf('http') > -1) {
        this.goPage('/pagesA/open/url?url=' + url);
        return;
      }
      // 内链
      this.goPage(url);
    },
    /**
       * 云储存文件上传 all全部文件类型
       */
    async cloudUploadFile(count = 1, type = 'image', sourceType = ['album', 'camera']) {
      try {
        let cloudUrl = await uniCloud.chooseAndUploadFile({
          type: type,
          count: count,
          sizeType: 'compressed',
          sourceType: sourceType,
          onChooseFile: async (res) => {
            console.log(res,'结果1')
            const processAll = []
            for (let i = 0; i < res.tempFiles.length; i++) {
              console.log(cropImg(res.tempFiles[i]))
              processAll.push(cropImg(res.tempFiles[i]))
            }
            console.log(processAll,'processAll')
            return Promise.all(processAll).then((fileList) => {
              console.log(fileList,'fileListfileList')
              let result = {
                tempFilePaths: []
              }
              result.tempFiles = fileList.map((fileItem, index) => {
                result.tempFilePaths.push(fileItem.path)
                return {
                  path: fileItem.path,
                  cloudPath: '' + Date.now() + index + '.' + fileItem.ext, // 云端路径，这里随便生成了一个
                  fileType: fileItem.fileType
                }
              })
              return result
            })
          }
        })
         console.log(cloudUrl,'结果2')

        let cloudArr = []
        cloudUrl.tempFiles.forEach((item) => {
          if (item.url) {
            cloudArr.push(item.url)
          }
        })
        let tempFiles = {}
        if (cloudArr.length != 0) {
          tempFiles = await uniCloud.getTempFileURL({
            fileList: cloudArr
          })
        }
        let fileUrl = []
        tempFiles.fileList.forEach((item) => {
          // 腾讯云
          if (item.download_url) {
            fileUrl.push(item.download_url)
          } else if (item.tempFileURL) {
            // 阿里云
            fileUrl.push(item.tempFileURL)
          }
        })
        tempFiles.fileUrl = fileUrl
        uni.hideLoading()
        return tempFiles
      } catch {
        uni.hideLoading()
      }

      // cropImg 辅助
      function cropImg(file) {
        return new Promise((resolve, reject) => {
          let ext
          let filePathProcessed = file.path // 处理结果
          // #ifdef H5
          ext = file.name.split('.').pop()
          resolve({
            path: filePathProcessed,
            ext,
            fileType: file.fileType
          })
          // #endif
          // #ifndef H5
          console.log(file.path,'file.path')
          uni.getImageInfo({
            src: file.path,
            success(info) {
              ext = info.type.toLowerCase()
              resolve({
                path: filePathProcessed,
                ext,
                fileType: file.fileType
              })
            },
            fail(err) {
              reject(new Error(err.errMsg || '未能获取图片类型'))
            }
          })
          // #endif
        })
      }

      // 日期
      function formatDate(date) {
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        m = m < 10 ? '0' + m : m
        var d = date.getDate()
        d = d < 10 ? '0' + d : d
        return y + '-' + m + '-' + d
      }
    },
      /**
       * 云储存文件上传
       */
      cloudSetFile(count = 1, type = 'image') {
        if (type == 'image') {
          uni.chooseImage({
            count: count,
            success: async res => {
              console.log(res, 'res');
              if (res.tempFilePaths.length > 0) {
                let filePath = res.tempFilePaths[0];
                const result = await uniCloud.uploadFile({
                  filePath: filePath,
                  cloudPath: 'a.jpg',
                  onUploadProgress: function (progressEvent) {
                    console.log(progressEvent, 'progressEvent');
                  },
                });
                console.log(result, 'result');
                if (!result.fileID) {
                  this.$util.msg('上传失败');
                  return;
                }
                const tempFiles = await uniCloud.getTempFileURL({
                  fileList: [result.fileID],
                });
                console.log(tempFiles, 'tempFiles');
                const tempFile = tempFiles.fileList[0];
                if (tempFile.code === 'SUCCESS') {
                  console.log(tempFile.download_url, 'download_url');
                  return tempFile.download_url;
                } else if (tempFile.tempFileURL) {
                  return tempFile.tempFileURL;
                } else {
                  this.$util.msg('上传失败');
                }
              }
            },
          });
        }
      },
		/**
     * msg提示
     */
    msg(title, icon = 'none', duration = 3000) {
      uni.showToast({
        title: title,
        duration: duration,
        icon: icon,
      });
    },
    /**
     * navigatorTo跳转页面
     * @param {String} url
     * @param {Object} options
     * @param {Boolean} options.login 是否检测登录
     */
    navTo(url, options = {}, type = 'navigateTo') {
      this.$util.throttle(() => {
        if (options.login && !this.$store.getters.hasLogin) {
          url = '/pagesA/login/auth/login';
        }
        if (!url) {
          return;
        }
        // 跳转类型
        if (type == 'navigateTo') uni.navigateTo({ url });
        if (type == 'redirectTo') uni.redirectTo({ url });
        if (type == 'reLaunch') uni.reLaunch({ url });
        if (type == 'switchTab') uni.switchTab({ url });
      }, 300);
    },
    /**
     * $request云函数请求
     * @param {String} module
     * @param {String} operation
     * @param {Boolean} data 请求参数
     * @param {Boolean} ext 附加参数
     * @param {Boolean} ext.showLoading 是否显示loading状态，默认不显示
     * @param {Boolean} ext.hideLoading 是否关闭loading状态，默认关闭
     * @param {Boolean} ext.login 未登录拦截
     * @param {Boolean} ext.setLoaded 加载完成是设置页面加载完毕
     */
    $request(module, operation, data = {}, ext = {}) {
      // 打印请求
      // console.log('请求发起：' + module + '/' + operation + '参数：' + JSON.stringify(data) + '附加参数' + JSON.stringify(ext));
      if (ext.login && !this.$util.isLogin()) {
        return;
      }
      if (ext.showLoading) {
        this.isLoading = true;
      }
      return new Promise((resolve, reject) => {
        request(module, operation, data, ext)
          .then(result => {
            // 打印返回参数
            // console.log('请求返回参数：'+JSON.stringify(result))
            if (ext.hideLoading !== false) {
              this.isLoading = false;
            }
            setTimeout(() => {
              if (this.setLoaded !== false) {
                this.loaded = true;
              }
            }, 100);
            this.$refs.confirmBtn && this.$refs.confirmBtn.stop();
            resolve(result);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    imageOnLoad(data, key) {
      setTimeout(() => {
        this.$set(data, 'loaded', true);
      }, 100);
    },
    showPopup(key) {
      this.$util.throttle(() => {
        this.$refs[key].open();
      }, 200);
    },
    hidePopup(key) {
      this.$refs[key].close();
    },
    stopPrevent() {},
  },
};
