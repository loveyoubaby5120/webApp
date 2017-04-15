import { get as getPath } from 'object-path';
import { siteConfig } from 'saas/common/siteConfig';

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
  phone_number: '^1[34578]\d{9}$',
  // 整数
  integer: '^-?[1-9]\d*$',
  // 小数
  decimal: '^(-?\d+)(.\d+)?$',
  // 网址
  url: '([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+',
  // 汉字
  chinese_words: '^[\u4e00-\u9fa5]{0,}$',
  // 英文
  english_words: '^[A-Za-z]+$',
};

export const unique = (source) => {
  let res = [source[0]];
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
  return res;
};

export const clone = (origin) => {
  let originProto = Object.getPrototypeOf(origin);
  return Object.assign(Object.create(originProto), origin);
};

export const swapItems = (arr, index1, index2) => {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0];
  return arr;
};

export const getSiteConfig = (site, arg) => {
  let data = getPath(siteConfig, `${site}.${arg}`);
  if (data === undefined) {
    data = getPath(siteConfig, `saas.${arg}`);
  }
  return data;
};

export interface Choices {
  content?: string;
  can_edit?: boolean;
  tip?: string;
  jump_mark_id?: string;
  position?: number;
  score?: number;
  required?: boolean;
  data_type?: string;
  max_value?: number;
  min_value?: number;
}

export class Choice {
  can_edit: boolean;
  tip: string;
  jump_mark_id: string;
  score: number;
  max_value?: number;
  min_value?: number;
  position: number;
  content: string;
  required: boolean;
  data_type: string;

  constructor(arg?: Choices) {
    this.can_edit = arg && arg.can_edit !== undefined ? arg.can_edit : false;
    this.tip = arg && arg.tip !== undefined ? arg.tip : '';
    this.jump_mark_id = arg && arg.jump_mark_id !== undefined ? arg.jump_mark_id : '';
    this.position = arg && arg.position !== undefined ? arg.position : 0;
    this.score = arg && arg.score !== undefined ? arg.score : 0;
    this.max_value = arg && arg.max_value !== undefined ? arg.max_value : 0;
    this.min_value = arg && arg.min_value !== undefined ? arg.min_value : 0;
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
  orientation?: string;
  required?: boolean;
  max_value?: number;
  min_value?: number;
  max_choice?: number;
  min_choice?: number;
  is_question?: boolean;
  data_type?: string;
  sampling_free_answer?: boolean;
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
  orientation: string;
  required: boolean;
  max_value: number;
  min_value: number;
  max_choice: number;
  min_choice: number;
  is_question: boolean;
  data_type: string;
  sampling_free_answer: boolean;
  choice: Choices[];

  constructor(arg?: QueryArguments) {
    this.mark_id = this.getUuid(15);

    this.title_number = arg && arg.title_number !== undefined ? arg.title_number : '';
    this.kind = arg && arg.kind !== undefined ? arg.kind : '';
    this.title = arg && arg.title !== undefined ? arg.title : '';
    this.label = arg && arg.label !== undefined ? arg.label : [];
    this.tip = arg && arg.tip !== undefined ? arg.tip : [];
    this.sub_title = arg && arg.sub_title !== undefined ? arg.sub_title : [];
    this.sub_title_number = arg && arg.sub_title_number !== undefined ? arg.sub_title_number : [];
    this.orientation = arg && arg.orientation !== undefined ? arg.orientation : 'vertical';
    this.required = arg && arg.required !== undefined ? arg.required : true;
    this.max_value = arg && arg.max_value !== undefined ? arg.max_value : 0;
    this.min_value = arg && arg.min_value !== undefined ? arg.min_value : 0;
    this.max_choice = arg && arg.max_choice !== undefined ? arg.max_choice : 0;
    this.min_choice = arg && arg.min_choice !== undefined ? arg.min_choice : 0;
    this.sampling_free_answer = arg && arg.sampling_free_answer !== undefined ? arg.sampling_free_answer : false;
    this.is_question = arg && arg.is_question !== undefined ? arg.is_question : true;
    this.data_type = arg && arg.data_type !== undefined ? arg.data_type : '';
    this.choice = arg && arg.choice !== undefined ? arg.choice : [];
  }

  getUuid = (len?, radix?) => {
    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    let uuid = [];
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
  }
}
