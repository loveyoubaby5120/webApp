import { S } from 'common/locale_to_b';
import { staticBaseURL } from 'common/staticURL';
import { Item, Nav } from 'saas/common/NavData';

export const ToolNav: Item[] = [
    {
        title: 'Home Page',
        link: '/home',
        windowRouter: true,
    },
    {
        title: 'University Project',
        link: '/project',
        windowRouter: true,
    },
];

export const staticURL = (img: string) => {
    return staticBaseURL('confucius/' + img);
};

export const ProjectNav: Nav = {
    title: 'University Project',
    describe: 'University Project',
    link: '/project',
    childer: [
        {
            title: 'University Project',
            describe: '${describe}项目',
            link: '/project/info/${id}',
            permissions: () => true,
        },
        {
            title: 'Apply',
            describe: '${describe}项目申请表',
            link: '/project/apply/${id}',
            permissions: () => true,
        },
        {
            title: 'Apply',
            describe: '${describe}项目申请表',
            link: '/project/success/${id}',
            permissions: () => true,
        },
    ],
};

export const Province = [
    {
        key: 'beijing',
        value: '北京',
    },
    {
        key: 'tianjin',
        value: '天津',
    },
    {
        key: 'shanghai',
        value: '上海',
    },
    {
        key: 'liaoning',
        value: '辽宁',
    },
    {
        key: 'jilin',
        value: '吉林',
    },
    {
        key: 'heilongjiang',
        value: '黑龙江',
    },
    {
        key: 'shandong',
        value: '山东',
    },
    {
        key: 'shan1xi',
        value: '山西',
    },
    {
        key: 'zhejiang',
        value: '浙江',
    },
    {
        key: 'jiangsu',
        value: '江苏',
    },
    {
        key: 'hubei',
        value: '湖北',
    },
    {
        key: 'anhui',
        value: '安徽',
    },
    {
        key: 'guangdong',
        value: '广东',
    },
    {
        key: 'sichuan',
        value: '四川',
    },
    {
        key: 'chongqing',
        value: '重庆',
    },
    {
        key: 'shan3xi',
        value: '陕西',
    },
    {
        key: 'gansu',
        value: '甘肃',
    },
    {
        key: 'guizhou',
        value: '贵州',
    },
    {
        key: 'fujian',
        value: '福建',
    },
];

export const Rank = [
    {
        key: 'cn_china15',
        value: '本科排名',
    },
    {
        key: 'cn_zonghelei15',
        value: '综合类排名',
    },
    {
        key: 'cn_ligonglei15',
        value: '理工类排名',
    },
    {
        key: 'cn_shifanlei15',
        value: '师范类排名',
    },
    {
        key: 'cn_yuyanlei15',
        value: '语言类排名',
    },
    {
        key: 'qs',
        value: 'QS',
    },
    {
        key: 'times',
        value: 'TIMES',
    },
    {
        key: 'arwu',
        value: 'ARWU',
    },
    {
        key: 'usnews_global',
        value: 'US NEWS GLOBAL',
    },
];
