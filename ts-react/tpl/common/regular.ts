export const regular: {
    [key: string]: {
        name: string,
        reg?: any,
    },
} = {
        unlimited: {
            name: '无限制',
        },
        email: {
            name: '邮箱',
            reg: '^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$',
        },
        phone_number: {
            name: '手机号',
            reg: '^1[3456789]\\d{9}$',
        },
        integer: {
            name: '整数',
            reg: '^-?[1-9]\\d*$',
        },
        decimal: {
            name: '小数',
            reg: '^(-?\\d+)(.\\d+)?$',
        },
        url: {
            name: '网址',
            reg: '[A-Za-z0-9_]+(\\\.[A-Za-z0-9_]+)+',
        },
        chinese_words: {
            name: '汉字',
            reg: '^[\\u4e00-\\u9fa5]{0,}$',
        },
        english_words: {
            name: '英文',
            reg: '^[A-Za-z]+$',
        },
        certification_id: {
            name: '身份证',
            reg: '^\\d{17}[\\dXx]$',
        },
    };
