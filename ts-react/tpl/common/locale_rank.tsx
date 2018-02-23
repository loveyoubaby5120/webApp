import { LanguageCode } from 'common/languageCode';

export const en = {
    cn_china15: 'UGRD Rank',
    cn_zonghelei15: 'Rank of Comprehensive Univ',
    cn_ligonglei15: 'Rank of Engineering Univ',
    cn_caijinglei15: 'Rank of Financial Univ',
    cn_shifanlei15: 'Rank of Normal Univ',
    cn_yiyaolei15: 'Rank of Medical Univ',
    cn_zhengfalei15: 'Rank of Political Univ',
    cn_yuyanlei15: 'Rank of Linguistic Univ',
    cn_nonglinlei15: 'Rank of Agricultural Univ',
    cn_minzulei15: 'Rank of Folk Univ',
    cn_yishulei15: 'Rank of Arts Univ',
    cn_tiyulei15: 'Rank of Sports Univ',
    qs: 'QS',
    times: 'TIMES',
    arwu: 'ARWU',
    usnews_global: 'US NEWS GLOBAL',
};

export const cn: typeof en = {
    cn_china15: '本科排名',
    cn_zonghelei15: '综合类排名',
    cn_ligonglei15: '理工类排名',
    cn_caijinglei15: '财经类排名',
    cn_shifanlei15: '师范类排名',
    cn_yiyaolei15: '医药类排名',
    cn_zhengfalei15: '政法类排名',
    cn_yuyanlei15: '语言类排名',
    cn_nonglinlei15: '农林类排名',
    cn_minzulei15: '民族类排名',
    cn_yishulei15: '艺术类排名',
    cn_tiyulei15: '体育类排名',
    qs: 'QS',
    times: 'TIMES',
    arwu: 'ARWU',
    usnews_global: 'US NEWS GLOBAL',
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
