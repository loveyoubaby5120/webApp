import { ajaxPost } from 'common/ajax';

let isAppend = false;
let attempt = 5;

declare let window: any;

export const wechatShare = {
  isInWechat() {
    return /micromessenger/i.test(navigator.userAgent.toLowerCase());
  },
  dataForWeixin: {
    imgUrl: 'http://cdn.applysquare.net/static/img/a2/share_logo_opaque.png',
    link: location.href,
    title: '',
    desc: '',
    dataUrl: '',
    success() { return; },
    cancel() { return; },
  },
  update(arg: any) {
    this.dataForWeixin = Object.assign(this.dataForWeixin, arg || {});
  },
  _addListener() {
    window.wx.onMenuShareAppMessage(this.dataForWeixin);
    window.wx.onMenuShareTimeline(this.dataForWeixin);
    window.wx.onMenuShareQQ(this.dataForWeixin);
    window.wx.onMenuShareWeibo(this.dataForWeixin);
  },
  addGetLocation(success: any, fail: any) {
    let timer = setInterval(() => {
      if (window.wx) {
        clearInterval(timer);
        window.wx.ready(() => {
          window.wx.getLocation({
            type: 'wgs84',
            success: success,
            cancel: fail,
          });
        });
        window.wx.error((err: any) => {
          console.error('wechat error: ', err);
        });
      }
    }, 1000);
  },
  bind() {
    const that = this;
    window.wx.error(function (res: any) {
      if (attempt > 0) {
        attempt--;
        that.init();
      }
    });
    window.wx.ready(function () {
      that._addListener();
    });
  },
  init(arg: any) {
    if (!this.isInWechat()) { return; }
    this.update(arg);
    let signature: string;
    let timestamp: string;
    let nonceStr: string;
    let appId: string;
    ajaxPost('/ajax/go/post/', {
      path: '/graphql',
      query: `{
        wechat {
          GetShareSignature(url: "${location.href}")
        }
      }`,
    }, (r) => {
      const data = JSON.parse(r.data.wechat.GetShareSignature);
      signature = data.signature;
      timestamp = data.timestamp;
      nonceStr = data.noncestr;
      appId = data.appid;
      this._setWechatShare(appId, nonceStr, timestamp, signature);
    }, (err) => {
      console.error(err);
    });
  },
  _setWechatShare(appId: any, nonceStr: any, timestamp: any, signature: any) {
    if (typeof signature === 'undefined' ||
      typeof timestamp === 'undefined' ||
      typeof nonceStr === 'undefined' ||
      typeof appId === 'undefined') { return; }

    if (!this.isInWechat()) { return; }

    const that = this;
    if (!window.wx && !isAppend) {
      const s = document.createElement('script');
      s.src = '//res.wx.qq.com/open/js/jweixin-1.0.0.js';
      document.body.appendChild(s);
      isAppend = true;
    }

    if (!window.wx) {
      setTimeout(function () {
        that._setWechatShare(appId, nonceStr, timestamp, signature);
      }, 1000);
    } else {
      window.wx.config({
        debug: false,
        appId: appId,
        timestamp: timestamp,
        nonceStr: nonceStr,
        signature: signature,
        jsApiList: [
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'onMenuShareQZone',
          'getLocation',
        ],
      });
      this.bind();
    }
  },
};
