/*
 * @Author: Jin Biao
 * @Date: 2021-03-06 14:30:56
 * @Title: 环境文件
 */

// 当前环境设置
// 环境：dev(开发)、release(生产正式)

let baseUrl,
  imKey,
  wxAppID,
  xcxAppID,
  amapKey,
  wxmapKey,
  shareUrl,
  JimAppkey,
  JimSecret,
  base = 'dev';

if (base === 'dev') {
  baseUrl = '无'; //外部第三方接口地址 没有可不填
  wxmapKey = 'ZJOBZ-P3M3I-STQGG-5CW56-LCAFQ-3NFKE'; // 腾讯map地图 key
  amapKey = 'TFZBZ-5IZWJ-VANFV-FO2H5-LHGPO-LRFRG'; // 高德map地图 key
  wxAppID = 'wxe1e09b20a3d784c2'; // 公众号 AppID
  xcxAppID = 'wxe1e09b20a3d784c2'; // 小程序 AppID
  shareUrl = '无'; //分享url  没有H5可不填
  JimAppkey = '205ed5bbcbd227cb04110542'; //极光im Appid
  JimSecret = '7718608f719a2255ec139037'; //极光im key
}
if (base === 'release') {
  baseUrl = '';
  wxmapKey = '';
  amapKey = '';
  wxAppID = '';
  xcxAppID = '';
  shareUrl = '';
  JimAppkey = '';
  JimSecret = '';
}

export default {
  base,
  baseUrl,
  wxmapKey,
  wxAppID,
  xcxAppID,
  amapKey,
  shareUrl,
  JimAppkey,
  JimSecret,
};
