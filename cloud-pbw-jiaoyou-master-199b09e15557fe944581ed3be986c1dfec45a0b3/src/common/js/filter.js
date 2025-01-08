/*
 * @Author: Jin Biao
 * @Date: 2021-03-26 19:16:00
 * @Title: 通用过滤器  使用： | date
 */

import Vue from 'vue'
import { date } from './util'

// 距离多少米过滤
Vue.filter('distance', (num) => {
  if (num == 0) {
    return '100米'
  } else if (num < 1000) {
    return Number(num).toFixed(0) + '米'
  } else {
    return (Number(num) / 1000).toFixed(0) + '公里'
  }
})

// 距离多久时间
Vue.filter('getTimeText', (time) => {
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
    return M + '-' + D + '   ' + H + ':' + m
  }
})

// 时间过滤
Vue.filter('getTime', (value) => {
  var time = new Date(value * 1000)
  function add0(m) {
    return m < 10 ? '0' + m : m
  }
  var y = time.getFullYear()
  var m = time.getMonth() + 1
  var d = time.getDate()
  var h = time.getHours()
  var mm = time.getMinutes()
  var s = time.getSeconds()
  var timeResult = add0(m) + '月' + add0(d) + '日'
  if (timeResult == '1970-01-01' || timeResult == '1970-01-02') {
    return '--'
  } else {
    return timeResult
  }
})

Vue.filter('date', (timeStamp, format = 'y-m-d h:i') => {
  if (!timeStamp) return ''
  return date(timeStamp, format)
})

Vue.filter('friendDate', (timeStamp, format = 'y-m-d h:i') => {
  if (!timeStamp) return ''
  return date(timeStamp, format)
})

Vue.filter('price', (price, fixed = 0) => {
  if (!price || isNaN(price)) {
    return 0
  }
  return fixed > 0 ? parseFloat(price).toFixed(fixed) : +parseFloat(price).toFixed(2)
})

Vue.directive('debounce', {
  inserted: function (el, binding) {
    let [fn, event = 'click', time = 300] = binding.value
    let timer
    el.addEventListener(event, () => {
      timer && clearTimeout(timer)
      timer = setTimeout(() => fn(), time)
    })
  }
})

/***
 * 防抖 单位时间只触发最后一次
 *  @param {?Number|300} time - 间隔时间
 *  @param {Function} fn - 执行事件
 *  @param {?String|"click"} event - 事件类型 例："click"
 *  @param {Array} binding.value - [fn,event,time]
 *  例：<el-button v-debounce="[reset,`click`,300]">刷新</el-button>
 *  也可简写成：<el-button v-debounce="[reset]">刷新</el-button>
 */
Vue.directive('debounce', {
  inserted: function (el, binding) {
    let [fn, event = 'click', time = 300] = binding.value
    let timer
    el.addEventListener(event, () => {
      timer && clearTimeout(timer)
      timer = setTimeout(() => fn(), time)
    })
  }
})

/***
 *  节流 每单位时间可触发一次
 *  第一次瞬间触发，最后一次不管是否达到间隔时间依然触发
 * 【考虑到input的change事件】
 *  @param {?Number|300} time - 间隔时间
 *  @param {Function} fn - 执行事件
 *  @param {?String|"click"} event - 事件类型 例："click"
 *  @param {Array} binding.value - [fn,event,time]
 *  例：<el-button v-throttle="[reset,`click`,300]">刷新</el-button>
 *  传递参数则：<el-button v-throttle="[()=>reset(param),`click`,300]">刷新</el-button>
 */
Vue.directive('throttle', {
  inserted: function (el, binding) {
    let [fn, event = 'click', time = 300] = binding.value
    let timer, timer_end
    el.addEventListener(event, () => {
      if (timer) {
        clearTimeout(timer_end)
        return (timer_end = setTimeout(() => fn(), time))
      }
      fn()
      timer = setTimeout(() => (timer = null), time)
    })
  }
})
