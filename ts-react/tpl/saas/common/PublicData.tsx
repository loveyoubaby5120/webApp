import { staticBaseURL } from 'common/staticURL';
import { get as getPath } from 'object-path';
import { defaultSiteConfig, platformConfig, saasSiteConfig } from 'saas/common/siteConfig';

export const regionalListData = {
    hb: [
        {
            key: 'beijing',
            value: '北京',
            apply: true,
        },
        {
            key: 'tianjin',
            value: '天津',
            apply: true,
        },
        {
            key: 'hebei',
            value: '河北',
            apply: true,
        },
        {
            key: 'shan1xi',
            value: '山西',
            apply: true,
        },
        {
            key: 'neimenggu',
            value: '内蒙古',
            apply: true,
        },
    ],
    db: [
        {
            key: 'liaoning',
            value: '辽宁',
            apply: true,
        },
        {
            key: 'heilongjiang',
            value: '黑龙江',
            apply: true,
        },
        {
            key: 'jilin',
            value: '吉林',
            apply: true,
        },
    ],
    hd: [
        {
            key: 'shanghai',
            value: '上海',
            apply: true,
        },
        {
            key: 'jiangsu',
            value: '江苏',
            apply: true,
        },
        {
            key: 'zhejiang',
            value: '浙江',
            apply: false,
        },
        {
            key: 'anhui',
            value: '安徽',
            apply: true,
        },
        {
            key: 'fujian',
            value: '福建',
            apply: true,
        },
        {
            key: 'jiangxi',
            value: '江西',
            apply: true,
        },
        {
            key: 'shandong',
            value: '山东',
            apply: true,
        },
    ],
    hz: [
        {
            key: 'henan',
            value: '河南',
            apply: true,
        },
        {
            key: 'hubei',
            value: '湖北',
            apply: true,
        },
        {
            key: 'hunan',
            value: '湖南',
            apply: true,
        },
    ],
    hn: [
        {
            key: 'guangdong',
            value: '广东',
            apply: true,
        },
        {
            key: 'guangxi',
            value: '广西',
            apply: true,
        },
        {
            key: 'hainan',
            value: '海南',
            apply: true,
        },
    ],
    xn: [
        {
            key: 'chongqing',
            value: '重庆',
            apply: true,
        },
        {
            key: 'sichuan',
            value: '四川',
            apply: true,
        },
        {
            key: 'guizhou',
            value: '贵州',
            apply: true,
        },
        {
            key: 'yunnan',
            value: '云南',
            apply: true,
        },
        {
            key: 'xizang',
            value: '西藏',
            apply: false,
        },
    ],
    xb: [
        {
            key: 'gansu',
            value: '甘肃',
            apply: true,
        },
        {
            key: 'ningxia',
            value: '宁夏',
            apply: true,
        },
        {
            key: 'qinghai',
            value: '青海',
            apply: true,
        },
        {
            key: 'shan3xi',
            value: '陕西',
            apply: true,
        },
        {
            key: 'xinjiang',
            value: '新疆',
            apply: true,
        },
    ],
};

export const regionalData = [
    {
        key: 'hb',
        value: '华北地区',
    },
    {
        key: 'db',
        value: '东北地区',
    },
    {
        key: 'hd',
        value: '华东地区',
    },
    {
        key: 'hz',
        value: '华中地区',
    },
    {
        key: 'hn',
        value: '华南地区',
    },
    {
        key: 'xn',
        value: '西南地区',
    },
    {
        key: 'xb',
        value: '西北地区',
    },
];

export const checkList = {
    unlimited: '无限制',
    email: '邮箱',
    phone_number: '手机号',
    integer: '整数',
    decimal: '小数',
    url: '网址',
    chinese_words: '汉字',
    english_words: '英文',
};

export const regularList = {
    // 无限制
    unlimited: undefined,
    // 邮箱
    email: '^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$',
    // 手机号码
    phone_number: '^1[34578]\\d{9}$',
    // 整数
    integer: '^-?[1-9]\\d*$',
    // 小数
    decimal: '^(-?\\d+)(.\\d+)?$',
    // 网址
    url: '[A-Za-z0-9_]+(\\\.[A-Za-z0-9_]+)+',
    // 汉字
    chinese_words: '^[\\u4e00-\\u9fa5]{0,}$',
    // 英文
    english_words: '^[A-Za-z]+$',
};

export const unique = (source) => {
    const res = [];
    if (source.length > 0) {
        res.push(source[0]);
        for (let i = 1; i < source.length; i++) {
            let repeat = false;
            for (let j = 0; j < res.length; j++) {
                if (source[i] === res[j]) {
                    repeat = true;
                    break;
                }
            }
            if (!repeat) {
                res.push(source[i]);
            }
        }
    }
    return res;
};

export const clone = (origin) => {
    const originProto = Object.getPrototypeOf(origin);
    return Object.assign(Object.create(originProto), origin);
};

export const swapItems = (arr, index1, index2) => {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
};

export const staticSaasURL = (img: string) => {
    return (`https://cdn.applysquare.net/a2/saasinstitute/${img}/logo.png`);
};

export const staticInstituteURL = (img: string) => {
    return (`https://cdn.applysquare.net/a2/institute/${img}/logo.png`);
};

export const staticInstituteURLCoverApp = (img: string) => {
    return (`https://cdn.applysquare.net/a2/institute/${img}/cover_app.jpg`);
};

export const staticDifficultyURL = (img: string) => {
    return (`https://cdn.applysquare.net/static/img/a2/ceping/position_0${img}.png`);
};

export const staticFieldOfStudyURL = (img: string) => {
    if (!img) {
        return `https://cdn.applysquare.net/static/img/a2/ceping/fos.png`;
    }
    return (`https://cdn.applysquare.net/a2/field_of_study/icons/ic_${img}.png`);
};

export const staticURL = (img: string) => {
    return staticBaseURL('saas/' + img);
};

export const JSONLength = (obj) => {
    let size = 0;
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            size++;
        }
    }
    return size;
};

export const jsonToArray = (json): Array<{ key: string, data: { [key: string]: any } }> => {
    const array = [];
    for (const obj in json) {
        if (json.hasOwnProperty(obj)) {
            const j = {
                key: obj,
                data: json[obj],
            };
            array.push(j);
        }
    }

    return array;
};

export const getSiteConfig = (siteConfigState, arg) => {
    const { site, platform } = siteConfigState;
    let siteConfigData = defaultSiteConfig;
    if (platformConfig[platform]) {
        if (platformConfig[platform][site]) {
            siteConfigData = platformConfig[platform][site];
        } else {
            if (platformConfig[platform]['default']) {
                siteConfigData = platformConfig[platform]['default'];
            }
        }
    }

    let data: any = getPath(siteConfigData, arg);
    if (data === undefined) {
        data = getPath(defaultSiteConfig, arg);
    }
    return data;
};

export interface Choices {
    id?: string;
    content?: string;
    can_edit?: boolean;
    tip?: string;
    jump_mark_id?: string;
    relevance_mark_ids?: string[];
    position?: number;
    score?: number;
    required?: boolean;
    data_type?: string;
    max_value?: number;
    min_value?: number;
    max_score?: number;
    min_score?: number;
}

export class Choice {
    id: string;
    can_edit: boolean;
    tip: string;
    jump_mark_id: string;
    relevance_mark_ids: string[];
    score: number;
    max_value?: number;
    min_value?: number;
    max_score?: number;
    min_score?: number;
    position: number;
    content: string;
    required: boolean;
    data_type: string;

    constructor(arg?: Choices) {
        this.id = arg && arg.id !== undefined ? arg.id : undefined;
        this.can_edit = arg && arg.can_edit !== undefined ? arg.can_edit : false;
        this.tip = arg && arg.tip !== undefined ? arg.tip : '';
        this.jump_mark_id = arg && arg.jump_mark_id !== undefined ? arg.jump_mark_id : '';
        this.relevance_mark_ids = arg && arg.relevance_mark_ids !== undefined ? arg.relevance_mark_ids : [];
        this.position = arg && arg.position !== undefined ? arg.position : 0;
        this.score = arg && arg.score !== undefined ? arg.score : 0;
        this.max_value = arg && arg.max_value !== undefined ? arg.max_value : 0;
        this.min_value = arg && arg.min_value !== undefined ? arg.min_value : 0;
        this.max_score = arg && arg.max_score !== undefined ? arg.max_score : 0;
        this.min_score = arg && arg.min_score !== undefined ? arg.min_score : 0;
        this.content = arg && arg.content !== undefined ? arg.content : '';
        this.required = arg && arg.required !== undefined ? arg.required : false;
        this.data_type = arg && arg.data_type !== undefined ? arg.data_type : '';
    }
}

export interface QueryArguments {
    id?: string;
    year?: string;
    group?: string;
    mark_id?: string;
    kind?: string;
    title?: string;
    title_number?: string;
    label?: string[];
    tip?: string[];
    sub_title?: string[];
    sub_title_number?: string[];
    sub_title_total?: number;
    orientation?: string;
    required?: boolean;
    max_value?: number;
    min_value?: number;
    max_choice?: number;
    min_choice?: number;
    is_question?: boolean;
    data_type?: string;
    sampling_free_answer?: boolean;
    answer_analysis?: string;
    choice?: Choices[];
}

export class Query {
    id: string;
    year: string;
    group: string;
    mark_id: string;
    kind: string;
    title: string;
    title_number: string;
    label: string[];
    tip: string[];
    sub_title: string[];
    sub_title_number: string[];
    sub_title_total?: number;
    orientation: string;
    required: boolean;
    max_value: number;
    min_value: number;
    max_choice: number;
    min_choice: number;
    is_question: boolean;
    data_type: string;
    sampling_free_answer: boolean;
    answer_analysis: string;
    choice: Choices[];

    constructor(arg?: QueryArguments) {
        this.mark_id = GetUuid(15);

        this.title_number = arg && arg.title_number !== undefined ? arg.title_number : '';
        this.kind = arg && arg.kind !== undefined ? arg.kind : '';
        this.title = arg && arg.title !== undefined ? arg.title : '';
        this.label = arg && arg.label !== undefined ? arg.label : [];
        this.tip = arg && arg.tip !== undefined ? arg.tip : [];
        this.sub_title = arg && arg.sub_title !== undefined ? arg.sub_title : [];
        this.sub_title_number = arg && arg.sub_title_number !== undefined ? arg.sub_title_number : [];
        this.sub_title_total = arg && arg.sub_title_total !== undefined ? arg.sub_title_total : 0;
        this.orientation = arg && arg.orientation !== undefined ? arg.orientation : 'vertical';
        this.required = arg && arg.required !== undefined ? arg.required : true;
        this.max_value = arg && arg.max_value !== undefined ? arg.max_value : 0;
        this.min_value = arg && arg.min_value !== undefined ? arg.min_value : 0;
        this.max_choice = arg && arg.max_choice !== undefined ? arg.max_choice : 0;
        this.min_choice = arg && arg.min_choice !== undefined ? arg.min_choice : 0;
        this.sampling_free_answer = arg && arg.sampling_free_answer !== undefined ? arg.sampling_free_answer : false;
        this.answer_analysis = arg && arg.answer_analysis !== undefined ? arg.answer_analysis : '';
        this.is_question = arg && arg.is_question !== undefined ? arg.is_question : true;
        this.data_type = arg && arg.data_type !== undefined ? arg.data_type : '';
        this.choice = arg && arg.choice !== undefined ? arg.choice : [];
    }
}

export const GetUuid = (len?, radix?) => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    const uuid = [];
    let i;
    radix = radix || chars.length;

    if (len) {
        for (i = 0; i < len; i++) {
            uuid[i] = chars[0 | (Math.random() * radix)];
        }
    } else {
        let r;
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | (Math.random() * 16);
                uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }
    return uuid.join('');
};
