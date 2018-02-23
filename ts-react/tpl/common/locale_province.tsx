import { LanguageCode } from 'common/languageCode';

const en = {
    beijing: 'beijing',
    tianjin: 'tianjin',
    hebei: 'hebei',
    shan1xi: 'shan1xi',
    neimenggu: 'neimenggu',
    liaoning: 'liaoning',
    heilongjiang: 'heilongjiang',
    jilin: 'jilin',
    shanghai: 'shanghai',
    jiangsu: 'jiangsu',
    zhejiang: 'zhejiang',
    anhui: 'anhui',
    fujian: 'fujian',
    jiangxi: 'jiangxi',
    shandong: 'shandong',
    henan: 'henan',
    hubei: 'hubei',
    hunan: 'hunan',
    guangdong: 'guangdong',
    guangxi: 'guangxi',
    hainan: 'hainan',
    chongqing: 'chongqing',
    sichuan: 'sichuan',
    guizhou: 'guizhou',
    yunnan: 'yunnan',
    xizang: 'xizang',
    gansu: 'gansu',
    ningxia: 'ningxia',
    qinghai: 'qinghai',
    shan3xi: 'shan3xi',
    xinjiang: 'xinjiang',
};

const cn: typeof en = {
    beijing: '北京',
    tianjin: '天津',
    hebei: '河北',
    shan1xi: '山西',
    neimenggu: '内蒙古',
    liaoning: '辽宁',
    heilongjiang: '黑龙江',
    jilin: '吉林',
    shanghai: '上海',
    jiangsu: '江苏',
    zhejiang: '浙江',
    anhui: '安徽',
    fujian: '福建',
    jiangxi: '江西',
    shandong: '山东',
    henan: '河南',
    hubei: '湖北',
    hunan: '湖南',
    guangdong: '广东',
    guangxi: '广西',
    hainan: '海南',
    chongqing: '重庆',
    sichuan: '四川',
    guizhou: '贵州',
    yunnan: '云南',
    xizang: '西藏',
    gansu: '甘肃',
    ningxia: '宁夏',
    qinghai: '青海',
    shan3xi: '陕西',
    xinjiang: '新疆',
};

export const S: typeof en = (() => {
    if (LanguageCode === 'en') {
        return en;
    }
    return cn;
})();

Object.defineProperty(exports, 'S', {
    get: () => {
        if (LanguageCode === 'en') {
            return en;
        }
        return cn;
    },
});
