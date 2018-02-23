
import { Item, qkyToolNav, toolNav } from 'saas/common/NavData';
export interface Config {
    // base layout
    baseLayout?: {
        // 菜单栏
        nav?: { [key: string]: Item[] },
        // logo 样式
        logo?: boolean,
        // 是否显示退出按钮
        logout?: boolean,
    };
    // 判断是否是用window
    windowLocation?: boolean;
    // 判断填答页面显示样式 getSiteConfig(this.props.data.siteConfigState, 'style')
    style?: boolean;
    // 判断修改密码页面跳转显示
    usercenter?: boolean;
    // 判断logo-content显示文案
    logoContent?: {
        top?: string,
        bottom?: string,
    };
    // 判断logo显示及跳转路径
    img?: {
        show?: boolean,
        url?: string,
    };
    // 问卷app相关判断
    survey?: {
        // 问卷跳转根路径
        link?: string,
        // 填答相关判断
        answer?: {
            // 分享试填答 getSiteConfig(this.props.data.siteConfigState, 'survey.answer.share.show')
            share?: {
                show?: boolean,
                login?: boolean,
                unlogin?: boolean,
            },
            // 跳转方式
            windowLocation?: boolean,
            styles?: boolean,
            other?: boolean,
            toolNav?: boolean,
            // save title
            saveTitle?: string,
            // send url
            send?: string,
            // back url
            back?: string,
            // reload url
            reload?: string,
        },
        // 问卷列表
        project?: {
            // 分享问卷填答
            share?: {
                show?: boolean,
                login?: boolean,
                unlogin?: boolean,
            },
            indicators?: boolean,
            // 问卷设计
            edit?: {
                // 是否填写分数
                score?: boolean,
                // 是否显示题项统计
                report?: boolean,
                // 是否显示年级
                grades?: boolean,
                fillNumber?: boolean,
                // 是否显示其他信息
                otherInfo?: boolean,
                // 是否需要往期抽样免填
                samplingFreeAnswer?: boolean,
                // 是否需要答案
                answerAnalysis?: {
                    paper?: boolean,
                    project?: boolean,
                },
            },
        },
        // 问卷中心
        questionnaire?: {
            // 问卷报告
            report?: {
                // 是否显示交叉分析
                crosstab?: boolean,
            },
        },
    };
    // 高考分数测评
    gaokaoScore?: {
        // 根路径
        link?: string,
        // 是否显示高考分数线
        FractionalLine?: boolean,
        // 是否需要志愿表评价
        evaluate?: boolean,
    };
    // 学生档案管理
    stuArchiveManagement?: {
        // 是否显示标题
        title?: boolean,
    };
    // 测评库
    stuEvaluation?: {
        // 是否显示成绩报告列表
        scoreReport?: boolean,
    };
    // 排课
    courseArrangement?: {
        // 基础信息
        baseInfo?: {
            // 是否需要同步
            sync?: boolean,
            // 年级班级
            gradeClass?: {
                // 更换教师
                editClass?: boolean,
            },
        },
        // 选课管理
        elective?: {
            // 课程信息
            course?: {
                // 下载范例
                downloadUrl?: string,
            },
            // 手工调整
            adjust?: {
                // 下载范例
                downloadUrl?: string,
                // 手工调整结果搜索学号提示文案
                searchPlaceholder?: string,
            },
        },
    };
}

export const defaultSiteConfig: Config = {
    baseLayout: {
        nav: toolNav,
        logo: false,
        logout: true,
    },
    windowLocation: true,
    style: false,
    usercenter: true,
    logoContent: {
        top: 'SAAS',
        bottom: '学生学业发展与规划培养数据平台',
    },
    img: {
        show: false,
        url: 'https://cdn.applysquare.net/static/img/a2/logo3.png',
    },
    survey: {
        link: 'survey',
        answer: {
            share: {
                show: false,
                login: false,
                unlogin: true,
            },
            windowLocation: false,
            styles: false,
            other: false,
            toolNav: false,
            saveTitle: '问卷已经保存成功',
            send: '/survey/fill',
            back: '/survey/fill',
            reload: 'survey/fill',
        },
        project: {
            share: {
                show: true,
                login: false,
                unlogin: true,
            },
            indicators: false,
            edit: {
                score: false,
                report: false,
                grades: true,
                fillNumber: false,
                otherInfo: false,
                samplingFreeAnswer: false,
                answerAnalysis: {
                    paper: true,
                    project: false,
                },
            },
        },
        questionnaire: {
            report: {
                crosstab: true,
            },
        },
    },
    gaokaoScore: {
        link: '/gaokao-score/ceping',
        FractionalLine: true,
        evaluate: false,
    },
    stuArchiveManagement: {
        title: true,
    },
    stuEvaluation: {
        scoreReport: true,
    },
    courseArrangement: {
        baseInfo: {
            sync: false,
            gradeClass: {
                editClass: true,
            },
        },
        elective: {
            course: {
                downloadUrl: 'http://cdn.applysquare.net/a2/saas/course_arrangement_sample/students_list_example.xlsx',
            },
            adjust: {
                downloadUrl: 'http://cdn.applysquare.net/a2/saas/course_arrangement_sample/course_result_example.xlsx',
                searchPlaceholder: '请输入加选学号，加选多名学生用英文逗号隔开,例如：10000,10001',
            },
        },
    },
};

export const saasSiteConfig: { [key: string]: Config } = {
    fangfang: {
        usercenter: false,
        logoContent: {
            top: 'ApplySquare',
            bottom: '申请方在线调查系统',
        },
        img: {
            show: true,
            url: 'https://cdn.applysquare.net/static/img/a2/logo3.png',
        },
        survey: {
            answer: {
                share: {
                    login: true,
                },
                windowLocation: true,
                other: true,
                toolNav: false,
                styles: false,
                saveTitle: '问卷已经保存成功',
                send: '/',
                back: '/',
                reload: 'questionnaire-client/fill',
            },
            project: {
                share: {
                    login: true,
                },
                edit: {
                    grades: false,
                },
            },
        },
    },
    ccss: {
        windowLocation: false,
        style: true,
        survey: {
            link: 'onlineSurvey',
            answer: {
                share: {
                    show: false,
                },
                windowLocation: false,
                other: false,
                toolNav: true,
                styles: true,
                saveTitle: '问卷已经保存成功，可以在问卷中心继续填答此问卷',
                send: '/onlineSurvey/questionnaireClient',
                back: '/onlineSurvey/questionnaireClient',
                reload: 'questionnaireClient',
            },
            project: {
                share: {
                    show: false,
                },
                indicators: true,
                edit: {
                    score: true,
                    report: true,
                    grades: false,
                    fillNumber: true,
                    otherInfo: true,
                    samplingFreeAnswer: true,
                    answerAnalysis: {
                        paper: false,
                        project: false,
                    },
                },
            },
            questionnaire: {
                report: {
                    crosstab: false,
                },
            },
        },
    },
    a2ApplySquare: {
        usercenter: false,
        gaokaoScore: {
            link: '/ceping-cn/gaokao-score',
            FractionalLine: true,
            evaluate: true,
        },
        survey: {
            answer: {
                share: {
                    login: true,
                },
                windowLocation: true,
                other: true,
                toolNav: false,
                styles: false,
                saveTitle: '问卷已经保存成功',
                send: '/',
                back: '/',
                reload: 'questionnaire-client/fill',
            },
            project: {
                share: {
                    login: true,
                },
                edit: {
                    grades: false,
                    answerAnalysis: {
                        paper: false,
                        project: false,
                    },
                },
            },
        },
    },
};

export const qtoneSiteConfig: { [key: string]: Config } = {
    default: {
        baseLayout: {
            nav: qkyToolNav,
            logo: true,
            logout: false,
        },
        stuArchiveManagement: {
            title: false,
        },
        stuEvaluation: {
            scoreReport: false,
        },
        courseArrangement: {
            baseInfo: {
                sync: true,
                gradeClass: {
                    editClass: false,
                },
            },
            elective: {
                course: {
                    downloadUrl: 'http://cdn.applysquare.net/a2/saas/course_arrangement_sample/qky_students_list_example.xlsx',
                },
                adjust: {
                    downloadUrl: 'http://cdn.applysquare.net/a2/saas/course_arrangement_sample/qky_course_result_example.xlsx',
                    searchPlaceholder: '请输入“年级+班级+姓名”加选多名学生请使用英文逗号隔开',
                },
            },
        },
    },
};

export const platformConfig: { [key: string]: Config } = {
    default: defaultSiteConfig,
    saas: saasSiteConfig,
    qtone: qtoneSiteConfig,
};
