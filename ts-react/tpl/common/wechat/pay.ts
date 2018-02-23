declare let WeixinJSBridge: any;
declare let document: any;

export const wechatPay = (payJson: any, callBack?: any) => {
    if (typeof WeixinJSBridge === 'undefined') {
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', () => {
                onBridgeReady(payJson, callBack);
            }, false);
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', () => {
                onBridgeReady(payJson, callBack);
            });
            document.attachEvent('onWeixinJSBridgeReady', () => {
                onBridgeReady(payJson, callBack);
            });
        }
    } else {
        onBridgeReady(payJson, callBack);
    }
};

const onBridgeReady = (payJson: any, callBack?: any) => {
    // {
    //     appId: 'wx2421b1c4370ec43b',     // 公众号名称，由商户传入
    //     timeStamp: '1395712654',         // 时间戳，自1970年以来的秒数
    //     nonceStr: 'e61463f8efa94090b1f366cccfbbb444', // 随机串
    //     package: 'prepay_id=u802345jgfjsdfgsdg888',
    //     signType: 'MD5',         // 微信签名方式：
    //     paySign: '70EA570631E4BB79628FBCA90534C63FF7FADD89', // 微信签名
    // }

    WeixinJSBridge.invoke(
        'getBrandWCPayRequest', payJson,
        (res: any) => {
            // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
            if (res.err_msg === 'get_brand_wcpay_request:ok') {
                console.log('成功');
                callBack && callBack({ kind: 'success', msg: res.err_msg });
            } else {
                console.log('失败');
                callBack && callBack({ kind: 'success', msg: res.err_msg });
            }
        },
    );
};
