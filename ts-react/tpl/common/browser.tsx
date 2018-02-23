export const IsMobile = () => {
    const ua = navigator.userAgent.toLowerCase();
    return /iphone/i.test(ua) || /ipad/i.test(ua) || /android/i.test(ua);
};

export const IsDeviceApp = () => {
    const ua = navigator.userAgent.toLowerCase();
    return /applysquare/i.test(ua);
};

export const browser = {
    versions: () => {
        const u = navigator.userAgent;
        const app = navigator.appVersion;
        return {         // 移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, // IE内核
            presto: u.indexOf('Presto') > -1, // opera内核
            webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
            android: u.indexOf('Android') > -1, // android终端
            uc: u.indexOf('Linux') > -1, // uc浏览器
            iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, // 是否iPad
            webApp: u.indexOf('Safari') === -1, // 是否web应该程序，没有头部与底部
            wechat: /MicroMessenger/i.test(u), // 是否是微信浏览器
        };
    },
};
