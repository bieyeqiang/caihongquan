/*
 * @Author: Jin Biao
 * @Date: 2020-08-08 13:31:46
 * @Title: 通用util便捷
 */

let _debounceTimeout = null,
  _throttleRunning = false

// 距离时间多久
export const getTimeText = (time) => {
  var publishTime = Date.parse(new Date(time)) / 1000
  var d_seconds,
    d_minutes,
    d_hours,
    d_days,
    timeNow = parseInt(new Date().getTime() / 1000),
    d,
    date = new Date(time),
    Y = date.getFullYear(),
    M = date.getMonth() + 1,
    D = date.getDate(),
    H = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds()
  //小于10的在前面补0
  if (M < 10) {
    M = '0' + M
  }
  if (D < 10) {
    D = '0' + D
  }
  if (H < 10) {
    H = '0' + H
  }
  if (m < 10) {
    m = '0' + m
  }
  if (s < 10) {
    s = '0' + s
  }
  d = timeNow - publishTime
  d_days = parseInt(d / 86400)
  d_hours = parseInt(d / 3600)
  d_minutes = parseInt(d / 60)
  d_seconds = parseInt(d)
  if (d_days > 0 && d_days < 3) {
    return d_days + '天前'
  }
  if (d_days <= 0 && d_hours > 0) {
    return d_hours + '小时前'
  }
  if (d_hours <= 0 && d_minutes > 0) {
    return d_minutes + '分钟前'
  }
  if (d_seconds < 60) {
    if (d_seconds <= 0) {
      return '刚刚'
    } else {
      return d_seconds + '秒前'
    }
  }
  if (d_days >= 3 && d_days < 364) {
    return M + '-' + D + '   ' + H + ':' + m
  }
  if (d_days >= 365) {
    return Y + '-' + M + '-' + D + '   ' + H + ':' + m
  }
}

// 深拷贝
export const deepClone = (values) => {
  var copy
  // Handle the 3 simple types, and null or undefined
  if (null == values || 'object' != typeof values) return values
  // Handle Date
  if (values instanceof Date) {
    copy = new Date()
    copy.setTime(values.getTime())
    return copy
  }
  // Handle Array
  if (values instanceof Array) {
    copy = []
    for (var i = 0, len = values.length; i < len; i++) {
      copy[i] = this.deepClone(values[i])
    }
    return copy
  }
  // Handle Object
  if (values instanceof Object) {
    copy = {}
    for (var attr in values) {
      if (values.hasOwnProperty(attr)) copy[attr] = this.deepClone(values[attr])
    }
    return copy
  }
  throw new Error("Unable to copy values! Its type isn't supported.")
}

// 距离过滤
export const distance = (num) => {
  if (num == 0) {
    return ''
  } else if (num == '0.0') {
    return '10米'
  } else {
    if (num <= 1000) {
      if (num.indexOf('.') > -1) {
        num = Number(num).toFixed(0)
      }
      return num + '米'
    } else {
      return (Number(num) / 1000).toFixed(0) + '公里'
    }
  }
}

/**
 * 防抖
 * @param {Function} 执行函数
 * @param {Number} delay 延时ms
 */
export const debounce = (fn, delay = 500) => {
  clearTimeout(_debounceTimeout)
  _debounceTimeout = setTimeout(() => {
    fn()
  }, delay)
}

/**
 * 节流
 * @param {Function} 执行函数
 * @param {Number} delay 延时ms
 */
export const throttle = (fn, delay = 500) => {
  if (_throttleRunning) {
    return
  }
  _throttleRunning = true
  fn()
  setTimeout(() => {
    _throttleRunning = false
  }, delay)
}

/**
 * toast
 */
export const msg = (title = '', param = {}) => {
  if (!title) return
  uni.showToast({
    title,
    duration: param.duration || 1500,
    mask: param.mask || false,
    icon: param.icon || 'none'
  })
}

/**
 * 判断ios还是安卓
 */
export const getIsAppClient = () => {
  var u = navigator.userAgent,
    app = navigator.appVersion
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 //g
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
  if (isAndroid) {
    return 'andriod'
  }
  if (isIOS) {
    return 'ios'
  }
}
/**
 * 检查登录
 * @return {Boolean}
 */
export const isLogin = (options = {}) => {
  const token = uni.getStorageSync('uniIdToken')
  if (token) {
    return true
  }
  if (options.nav !== false) {
    uni.navigateTo({
      url: '/pagesA/login/auth/login'
    })
  }
  return false
}

/**
 * 获取页面栈
 * @param {Number} preIndex为1时获取上一页
 * @return {Object}
 */
export const prePage = (preIndex = 1) => {
  const pages = getCurrentPages()
  const prePage = pages[pages.length - (preIndex + 1)]

  return prePage.$vm
}

/**
 * 格式化时间戳 Y-m-d H:i:s
 * @param {String} format Y-m-d H:i:s
 * @param {Number} timestamp 时间戳
 * @return {String}
 */
export const date = (timeStamp, format) => {
  if (timeStamp.toString().length <= 10) {
    timeStamp = +timeStamp * 1000
  } else {
    timeStamp = +timeStamp
  }
  let _date = new Date(timeStamp),
    y = _date.getFullYear(),
    m = _date.getMonth() + 1,
    d = _date.getDate(),
    h = _date.getHours(),
    i = _date.getMinutes(),
    s = _date.getSeconds()

  m = m < 10 ? '0' + m : m
  d = d < 10 ? '0' + d : d
  h = h < 10 ? '0' + h : h
  i = i < 10 ? '0' + i : i
  s = s < 10 ? '0' + s : s
  return format.replace(/[ymdhis]/g, (key) => {
    return { y, m, d, h, i, s }[key]
  })
}
//二维数组去重
export const getUnique = (array) => {
  let obj = {}
  return array.filter((item, index) => {
    let newItem = item + JSON.stringify(item)
    return obj.hasOwnProperty(newItem) ? false : (obj[newItem] = true)
  })
}

// 判断类型集合
export const checkStr = (str, type) => {
  switch (type) {
    case 'mobile': //手机号码
      return /^[1]([3-9])[0-9]{9}$/.test(str)
    case 'tel': //座机
      return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str)
    case 'card': //身份证
      return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str)
    case 'mobileCode': //6位数字验证码
      return /^[0-9]{6}$/.test(str)
    case 'pwd': //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
      return /^([a-zA-Z0-9_]){6,18}$/.test(str)
    case 'payPwd': //支付密码 6位纯数字
      return /^[0-9]{6}$/.test(str)
    case 'postal': //邮政编码
      return /[1-9]\d{5}(?!\d)/.test(str)
    case 'QQ': //QQ号
      return /^[1-9][0-9]{4,9}$/.test(str)
    case 'email': //邮箱
      return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str)
    case 'money': //金额(小数点2位)
      return /^\d*(?:\.\d{0,2})?$/.test(str)
    case 'URL': //网址
      return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str)
    case 'IP': //IP
      return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str)
    case 'date': //日期时间
      return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str)
    case 'number': //数字
      return /^[0-9]$/.test(str)
    case 'english': //英文
      return /^[a-zA-Z]+$/.test(str)
    case 'chinese': //中文
      return /^[\\u4E00-\\u9FA5]+$/.test(str)
    case 'lower': //小写
      return /^[a-z]+$/.test(str)
    case 'upper': //大写
      return /^[A-Z]+$/.test(str)
    case 'HTML': //HTML标记
      return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str)
    default:
      return true
  }
}
