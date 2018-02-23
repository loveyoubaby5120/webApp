import { inflightCount } from 'common/ajax';
import { autorun, observable } from 'mobx';
import { inject, Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactRouter from 'react-router';
import { Query } from 'saas/common/PublicData';

export interface UserInfo {
    id?: string;
    currentschool?: { key: string, value: string };
    location?: string;
    locationName?: string;
    discipline?: string;
    collegeKind?: string;
    total_score?: number;
    kind_score?: string;
    score_chinese?: number;
    score_math?: number;
    score_foreign_language?: number;
    xuankao?: any;
    recruit?: Array<{ kind: string, score: number, slug: string }>;
    awarded?: Array<{ kind: string, score: number, name: string }>;
    regional?: string[];
    regionalName?: string[];
    professional?: string[];
    professionalName?: string[];
    fill?: string;
}

export class AppStateStore {
    setTime: any;
    isMobile: boolean;
    disposers: Array<() => void> = [];

    @observable loading: {
        show?: boolean,
        tip?: string,
        title?: string,
    };

    @observable siteConfigState: {
        site?: string,
        uuid?: string,
        app?: string,
        platform?: string,
        config: {
            apps?: string[],
            name?: string,
            province?: string,
            slug?: string,
        },
    };

    @observable appState: {
        echartsTheme?: string,
        currentUser?: {
            id?: string,
            username?: string,
            name?: string,
            permissions?: string[],
            email?: string,
            gender?: string,
            phone?: string,
            entryyear?: string
            class?: string,
            stu_id?: string,
            previousSampling?: string[],
            position?: string,
            interested_fos?: any,
            interested_fos_keys?: string[],
            selected_elective_names?: string[],
            selected_electives?: any,
        },
        professionalListData?: { [key: string]: any };
    };

    @observable gaokaoScoreState: {
        edit?: boolean,
        userInfo?: UserInfo,
        move?: string,
        provinceConfig?: {
            all_baokao_risk?: Array<{ key: string, value: string }>,
            all_pici_ui?: Array<{ key: string, value: string }>,
            pici_ui_zhuanke?: Array<{ key: string, value: string }>,
            pici_ui_benke?: Array<{ key: string, value: string }>,
            all_shaixuan_type?: Array<{ key: string, value: string }>,
            all_luqugailv_in_moreinsts?: Array<{ key: string, value: string }>,
            need_qufen_sci_art?: boolean,
            need_usr_choose_zhuan_ben?: boolean,
            xuankao?: {
                art_must_select?: Array<{ ch_name?: string, key?: string }>,
                benke_xuankao?: boolean,
                kemu?: Array<{ ch_name?: string, key?: string }>,
                science_must_select?: Array<{ ch_name?: string, key?: string }>,
                sum_num?: number,
                xuanxiang?: string[],
                zhuanke_xuankao?: boolean,
            },
            zongfen?: {
                need_all_zongfen?: boolean,
                need_yushuwai_zongfen?: boolean,
                shuxuezongfen?: number,
                waiyuzongfen?: number,
                yuwenzongfen?: number,
                benkezongfen?: number,
                zhuankezongfen?: number,
            },
        },
        risk?: number,
        batch?: number,
        moreInstsSameScoreWei?: number,
        probability?: number,
    };

    @observable surveyState: {
        query: Query,
        showEdit: number,
        batch?: {
            save?: boolean,
            kind?: string,
            edit?: boolean,
            callback?: any,
            query: Query,
        },
    };

    constructor() {
        this.loading = {
            show: false,
            title: '提示',
            tip: 'loading...',
        };

        const ua = navigator.userAgent.toLowerCase();
        this.isMobile = /iphone/i.test(ua) || /ipad/i.test(ua) || /android/i.test(ua);

        this.siteConfigState = {
            site: 'saas',
            platform: 'saas',
            app: 'entrance',
            config: {
                apps: [
                    'entrance',
                ],
            },
        };

        this.appState = {
            echartsTheme: 'walden',
            currentUser: { permissions: [''] },
        };

        this.gaokaoScoreState = {
            edit: false,
            userInfo: {
                id: '',
                currentschool: { key: '', value: '' },
                location: 'beijing',
                locationName: '北京',
                collegeKind: '本科',
                discipline: '文科',
                total_score: 0,
                kind_score: 'estimated',
                score_chinese: 0,
                score_math: 0,
                score_foreign_language: 0,
                xuankao: {},
                recruit: [],
                awarded: [],
                regional: [],
                regionalName: [],
                professional: [],
                professionalName: [],
                fill: '学校',
            },
            provinceConfig: {
                need_qufen_sci_art: false,
                need_usr_choose_zhuan_ben: false,
                all_baokao_risk: [],
                all_pici_ui: [],
                pici_ui_zhuanke: [],
                pici_ui_benke: [],
                all_shaixuan_type: [],
                all_luqugailv_in_moreinsts: [],
                xuankao: {
                    art_must_select: [],
                    benke_xuankao: false,
                    kemu: [],
                    science_must_select: [],
                    sum_num: 0,
                    xuanxiang: [],
                    zhuanke_xuankao: false,
                },
                zongfen: {
                    need_all_zongfen: false,
                    need_yushuwai_zongfen: false,
                    shuxuezongfen: 0,
                    waiyuzongfen: 0,
                    yuwenzongfen: 0,
                    benkezongfen: 0,
                    zhuankezongfen: 0,
                },
            },
            risk: 1,
            batch: 0,
            moreInstsSameScoreWei: 0,
            probability: 0,
        };

        this.surveyState = {
            query: new Query(),
            showEdit: -1,
            batch: {
                save: false,
                kind: '',
                edit: false,
                callback: '',
                query: new Query(),
            },
        };
    }

    componentWillUnmount() {
        this.disposers.forEach(f => f());
        this.disposers = [];
    }

    showLoad = (tip: string, title: string) => {
        this.setTime = setInterval(
            () => {
                if (inflightCount.get() !== 0) {
                    this.loading.tip = tip;
                    this.loading.title = title;
                    this.loading.show = true;
                }
                clearTimeout(this.setTime);
            },
            500,
        );
    }

    closeLoading = (close?: boolean) => {
        clearTimeout(this.setTime);

        this.disposers.push(autorun(() => {
            if (inflightCount.get() === 0 || close) {
                inflightCount.set(0);
                this.loading.tip = '分析中';
                this.loading.title = '提示';
                this.loading.show = false;
            } else {
                this.loading.show = true;
            }
        }));
    }

}

export interface WithAppState {
    data: AppStateStore;
}

export class AppStateProvider extends React.Component<{}, {}> {
    private store: AppStateStore;
    constructor(props) {
        super(props);
        this.store = new AppStateStore();
    }
    render() {
        return (
            <Provider data={this.store}>
                {this.props.children}
            </Provider>
        );
    }
}

export function withAppState<P>(
    UnderlyingComponent: React.ComponentClass<P & WithAppState>
        | React.StatelessComponent<P & WithAppState>)
    : React.ComponentClass<P> {
    return inject('data')(UnderlyingComponent as any);
}
