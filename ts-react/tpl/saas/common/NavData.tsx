import * as _ from 'lodash';
import { BuildFullKey, KnownCustomKeysForRole } from './custom_permissions';
import PermissionTags from './permission_tags';
import { Role } from './types';

function isPhone() {
    return window.innerWidth < 768;
}

export interface Item {
    key?: string;
    title?: any;
    link?: string;
    query?: { [key: string]: any };
    openWindow?: boolean;
    windowRouter?: boolean;
    icon?: string;
    describe?: string;
    disabled?: boolean;
    permissions?(site?: string, tags?: string[], that?: any): boolean;
    ifRenderTab?(apps?: string[]): boolean;
}

export interface Childer extends Item {
    toolNav?: Item;
    childer?: Childer[];
}

export interface Nav extends Item {
    childer?: Childer[];
}

const isAdmin = (site, tags) => {
    return PermissionTags.GetRole(tags, site) === Role.Admin || PermissionTags.GetRole(tags, site) === Role.SuperAdmin;
};

export const toolNav: { [key: string]: Item[] } = {
    gaokaoScore: [
        {
            title: '高考报考测评分析',
            link: isPhone() ? '/gaokao-score-m/place' : '/gaokao-score/ceping/analysis',
            openWindow: true,
        },
        {
            title: '模拟志愿填报工具',
            link: isPhone() ? `/gaokao-score-m/my-volunteer` : `/gaokao-score/ceping/nceeApply/list`,
            openWindow: true,
        },
    ],
    gaokaoMajor: [
        {
            title: '高考专业测评分析',
            link: '/gaokao-major/',
            windowRouter: true,
        },
    ],
    gaokaoCareer: [
        {
            title: '高考职业测评分析',
            link: '/gaokao-career/',
            windowRouter: true,
        },
    ],
    userManagement: [
        {
            title: '学生账号',
            link: '/userManagement/student',
            windowRouter: true,
            permissions: (site, tags) => {
                const role = PermissionTags.GetRole(tags, site);
                return _.includes([Role.SuperAdmin, Role.Admin], role);
            },
        },
        {
            title: '教师账号',
            link: '/userManagement/admin',
            windowRouter: true,
            permissions: (site, tags) => {
                return PermissionTags.GetRole(tags, site) === Role.SuperAdmin;
            },
        },
        {
            title: '年级信息',
            link: '/userManagement/grade',
            windowRouter: true,
        },
        {
            title: '教室信息',
            link: '/userManagement/classroom',
            windowRouter: true,
            permissions: (site, tags) => {
                const role = PermissionTags.GetRole(tags, site);
                return _.includes([Role.SuperAdmin, Role.Admin], role);
            },
        },
        {
            title: '班级信息',
            link: '/userManagement/class',
            windowRouter: true,
        },
    ],
    stuArchiveManagement: [
        {
            title: '学生档案管理',
            link: '/stuArchiveManagement',
            windowRouter: true,
        },
    ],
    stuNceeScoreReport: [
        {
            title: '高考功能管理',
            link: '/gaokaoManagement',
            windowRouter: false,
        },
        {
            title: '学生高考统计分析报告',
            link: '/stu-ncee-score-report',
            windowRouter: true,
        },
    ],
    gaokaoManagement: [
        {
            title: '高考功能管理',
            link: '/gaokaoManagement',
            windowRouter: true,
        },
        {
            title: '学生高考统计分析报告',
            link: '/stu-ncee-score-report',
            windowRouter: false,
        },
    ],
    survey: [
        {
            title: '问卷中心',
            link: '/survey/project',
            windowRouter: true,
            permissions: (site, tags) => {
                const role = PermissionTags.GetRole(tags, site);
                return (
                    (
                        (role === Role.Teacher || role === Role.SuperAdmin || role === Role.Admin || role === Role.GradeAdmin) &&
                        site !== 'fangfang'
                    ) ||
                    site === 'fangfang'
                );
            },
        },
        {
            title: '试卷中心',
            link: '/survey/paper',
            windowRouter: true,
            permissions: (site, tags) => {
                return site === 'fangfang';
            },
        },
    ],
    coursePlanning: [
        {
            title: '选修科目规划',
            link: '/course-planning',
        },
    ],
    stuEvaluationMgmt: [
        {
            title: '成绩分析报告',
            link: '/stuEvaluationMgmt/report',
            windowRouter: true,
        },
        {
            title: '专业规划测评',
            link: '/stuEvaluationMgmt/manage',
            windowRouter: true,
        },
    ],
    stuEvaluation: [
        {
            title: '学业测评库',
            link: '/stuEvaluation/list',
            windowRouter: true,
        },
        {
            title: '高考测评库',
            link: '/stuEvaluation/gaokao',
            windowRouter: true,
            ifRenderTab: (apps: string[]) => {
                if (!apps) {
                    return false;
                }
                return apps.includes('gaokaoScore');
            },
        },
    ],
    stuCourseSelMgmt: [
        {
            title: '学生选课管理',
            link: '/course-sel-mgmt',
            windowRouter: true,
        },
    ],
    schoolCurriculumArrangement: [
        {
            title: '学校排课走班',
            link: '/curriculum-arrangement',
            windowRouter: true,
        },
    ],
    courseArrangement: [
        {
            title: '基础信息',
            link: '/course-arrangement/base-info',
            windowRouter: true,
            permissions: (site, tags) => {
                return isAdmin(site, tags);
            },
        },
        {
            title: '选课管理',
            link: '/course-arrangement/elective',
            windowRouter: true,
            permissions: (site, tags) => {
                return isAdmin(site, tags);
            },
        },
        {
            title: '排课管理',
            link: '/course-arrangement/curriculummgmt',
            windowRouter: true,
            permissions: (site, tags) => {
                return isAdmin(site, tags);
            },
        },
        {
            title: '课表管理',
            link: '/course-arrangement/schedule',
            windowRouter: true,
            permissions: (site, tags) => {
                return isAdmin(site, tags);
            },
        },
        {
            title: '学生选课系统',
            link: '/course-arrangement/stu-elective/details',
            windowRouter: true,
            permissions: (site, tags) => {
                return PermissionTags.GetRole(tags, site) === Role.Student;
            },
        },
        {
            title: '查看课表',
            link: '/course-arrangement/schedule/current/student',
            windowRouter: true,
            permissions: (site, tags) => {
                return PermissionTags.GetRole(tags, site) === Role.Student;
            },
        },
        {
            title: '查看课表',
            link: '/course-arrangement/schedule/current/teacher',
            windowRouter: true,
            permissions: (site, tags) => {
                return PermissionTags.GetRole(tags, site) === Role.Teacher;
            },
        },
    ],
    stuGrowthAnalyzing: [
        {
            title: '学生成长档案',
            link: '/stuGrowthAnalyzing/analyzing',
            windowRouter: true,
            permissions: (site, tags) => {
                return PermissionTags.GetRole(tags, site) === Role.Student;
            },
        },
    ],
    courseArrangementApply: [
        {
            title: '走班排课',
            link: '/course-arrangement-apply/apply',
            windowRouter: true,
            permissions: (site, tags) => {
                return isAdmin(site, tags);
            },
        },
    ],
};

export const qkyToolNav: { [key: string]: Item[] } = {
    gaokaoScore: [
        {
            title: '高考报考测评分析',
            link: '/gaokao-score/ceping/analysis',
            openWindow: true,
        },
        {
            title: '模拟志愿填报工具',
            link: '/gaokao-score/ceping/nceeApply/list',
            openWindow: true,
        },
    ],
    gaokaoMajor: [
        {
            title: '高考专业测评分析',
            link: '/gaokao-major/',
            windowRouter: true,
        },
    ],
    gaokaoCareer: [
        {
            title: '高考职业测评分析',
            link: '/gaokao-career/',
            windowRouter: true,
        },
    ],
    userManagement: [
        {
            title: '教室管理',
            link: '/userManagement/classroom',
            windowRouter: true,
            permissions: (site, tags) => {
                const role = PermissionTags.GetRole(tags, site);
                return _.includes([Role.SuperAdmin, Role.Admin], role);
            },
        },
        {
            title: '学生账号',
            link: '/userManagement/student',
            windowRouter: true,
            permissions: (site, tags) => {
                const role = PermissionTags.GetRole(tags, site);
                return _.includes([Role.SuperAdmin, Role.Admin], role);
            },
        },
        {
            title: '教师账号',
            link: '/userManagement/admin',
            windowRouter: true,
            permissions: (site, tags) => {
                return PermissionTags.GetRole(tags, site) === Role.SuperAdmin;
            },
        },
    ],
    stuArchiveManagement: [
        {
            title: '专业规划测评档案',
            link: '/stuArchiveManagement/file/plan',
            windowRouter: true,
        },
    ],
    stuNceeScoreReport: [
        {
            title: '高考功能管理',
            link: '/gaokaoManagement',
            windowRouter: false,
        },
        {
            title: '学生高考统计分析报告',
            link: '/stu-ncee-score-report',
            windowRouter: true,
        },
    ],
    gaokaoManagement: [
        {
            title: '高考功能管理',
            link: '/gaokaoManagement',
            windowRouter: true,
        },
        {
            title: '学生高考统计分析报告',
            link: '/stu-ncee-score-report',
            windowRouter: false,
        },
    ],
    survey: [
        {
            title: '问卷中心',
            link: '/survey/project',
            windowRouter: true,
            permissions: (site, tags) => {
                const role = PermissionTags.GetRole(tags, site);
                return (
                    (
                        (role === Role.Teacher || role === Role.SuperAdmin || role === Role.Admin || role === Role.GradeAdmin) &&
                        site !== 'fangfang'
                    ) ||
                    site === 'fangfang'
                );
            },
        },
        {
            title: '试卷中心',
            link: '/survey/paper',
            windowRouter: true,
            permissions: (site, tags) => {
                return site === 'fangfang';
            },
        },
    ],
    coursePlanning: [
        {
            title: '选修科目规划',
            link: '/course-planning',
        },
    ],
    stuEvaluationMgmt: [
        {
            title: '专业规划测评',
            link: '/stuEvaluationMgmt/manage',
            windowRouter: true,
        },
    ],
    stuEvaluation: [
        {
            title: '学业测评库',
            link: '/stuEvaluation/list',
            windowRouter: true,
        },
        {
            title: '高考测评库',
            link: '/stuEvaluation/gaokao',
            windowRouter: true,
            ifRenderTab: (apps: string[]) => {
                if (!apps) {
                    return false;
                }
                return apps.includes('gaokaoScore');
            },
        },
    ],
    stuCourseSelMgmt: [
        {
            title: '学生选课管理',
            link: '/course-sel-mgmt',
            windowRouter: true,
        },
    ],
    schoolCurriculumArrangement: [
        {
            title: '学校排课走班',
            link: '/curriculum-arrangement',
            windowRouter: true,
        },
    ],
    courseArrangement: [
        {
            title: '基础信息',
            link: '/course-arrangement/base-info',
            windowRouter: true,
            permissions: (site, tags) => {
                return isAdmin(site, tags);
            },
        },
        {
            title: '选课管理',
            link: '/course-arrangement/elective',
            windowRouter: true,
            permissions: (site, tags) => {
                return isAdmin(site, tags);
            },
        },
        {
            title: '排课管理',
            link: '/course-arrangement/curriculummgmt',
            windowRouter: true,
            permissions: (site, tags) => {
                return isAdmin(site, tags);
            },
        },
        {
            title: '课表管理',
            link: '/course-arrangement/schedule',
            windowRouter: true,
            permissions: (site, tags) => {
                return isAdmin(site, tags);
            },
        },
        {
            title: '学生选课系统',
            link: '/course-arrangement/stu-elective/details',
            windowRouter: true,
            permissions: (site, tags) => {
                return PermissionTags.GetRole(tags, site) === Role.Student;
            },
        },
        {
            title: '查看课表',
            link: '/course-arrangement/schedule/current/student',
            windowRouter: true,
            permissions: (site, tags) => {
                return PermissionTags.GetRole(tags, site) === Role.Student;
            },
        },
        {
            title: '查看课表',
            link: '/course-arrangement/schedule/current/teacher',
            windowRouter: true,
            permissions: (site, tags) => {
                return PermissionTags.GetRole(tags, site) === Role.Teacher;
            },
        },
    ],
    courseArrangementApply: [
        {
            title: '走班排课',
            link: '/course-arrangement-apply/apply',
            windowRouter: true,
            permissions: (site, tags) => {
                return isAdmin(site, tags);
            },
        },
    ],
};

export const studentNav: Nav[] = [
    {
        title: '成长报告',
        childer: [
            {
                title: '学生成长档案',
                key: 'stuGrowthAnalyzing',
                link: '/stuGrowthAnalyzing',
                icon: 'studentGrowArchives.png',
                describe: '从入校到毕业，从学业成绩到课外发展，展示你的全程成长档案',
            },
            {
                title: '学生综合素质档案',
                key: 'stuQuality',
                link: '/stu-quality',
                icon: 'stuQuality.png',
                describe: '省教育厅要求的高中学生综合素质档案填写和历史存档',
            },
        ],
    },
    {
        title: '生涯规划',
        childer: [
            {
                title: '学业测评',
                key: 'stuEvaluation',
                link: '/stuEvaluation',
                icon: 'stuEvaluation.png',
                describe: '分析历次考试状态，解读自身特长特点，给你最全面的高中评测报告',
            },
            {
                title: '专业规划',
                key: 'majorPlanning',
                link: '/major-planning',
                icon: 'majorPlanning.png',
                describe: '根据所选专业，提供个性化的专业发展建议和学习资源',
            },
            {
                title: '选修科目规划',
                key: 'coursePlanning',
                link: '/course-planning',
                icon: 'coursePlanning.png',
                describe: '推荐适合的选修科目组合，展示科目组合下高校和专业覆盖情况',
            },
            {
                title: '选课系统',
                key: 'courseSelectionSys',
                link: '/course-selection-sys',
                openWindow: true,
                icon: 'courseSelectionSys.png',
                describe: '推荐适合的选修科目组合，展示科目组合下高校和专业覆盖情况',
            },
            {
                title: '学生选课系统',
                key: 'courseArrangement',
                link: '/course-arrangement/stu-elective/details',
                openWindow: true,
                icon: 'courseSelectionSys.png',
                describe: '推荐适合的选修科目组合，展示科目组合下高校和专业覆盖情况',
            },
        ],
    },
    {
        title: '开放资源',
        childer: [
            {
                title: '院校数据库',
                key: 'instituteDB',
                link: 'https://www.applysquare.com/ranking-cn/?country=cn&china_degree=本科',
                openWindow: true,
                icon: 'instituteDB.png',
                describe: '拥有5000多所国内外院校信息，全面了解高校情况',
            },
            {
                title: '专业数据库',
                key: 'majorDB',
                link: 'https://www.applysquare.com/fos-cn/',
                openWindow: true,
                icon: 'dataBase.png',
                describe: '90个大类专业数据和点评，深入浅出介绍各类专业',
            },
            {
                title: '职业数据库',
                key: 'careerDB',
                link: 'https://www.applysquare.com/a2career-cn/home',
                openWindow: true,
                icon: 'dataBase.png',
                describe: '精解150种常见职业，全面知晓职业概况',
            },
            {
                title: '课程数据库',
                key: 'courseDB',
                link: 'https://www.applysquare.com/course_core-cn/',
                openWindow: true,
                icon: 'courseDB.png',
                describe: '汇集1500多门高校开设课程，提前认知大学课程设置',
            },
        ],
    },
    {
        title: '调查系统',
        childer: [
            {
                title: '问卷中心',
                key: 'survey',
                link: '/survey/fill',
                icon: 'survey.png',
                describe: '需要填答的问卷',
            },
        ],
    },
    {
        title: '高考报考',
        childer: [
            {
                title: '高考报考专业测评',
                key: 'gaokaoMajor',
                link: '/gaokao-major',
                icon: 'gaokao.png',
                describe: '通过匹配测试者的兴趣、性格、知识、能力、技能与不同专业入学要求，推荐适合的大学专业',
            },
            {
                title: '高考报考分数测评',
                key: 'gaokaoScore',
                link: isPhone() ? '/gaokao-score-m/place' : '/gaokao-score/ceping/analysis/recommend',
                icon: 'gaokaoScore.png',
                describe: '根据考生高考分数，基于学校近十年分数线和录取情况，融合学校实力等因素，预测考生录取概率',
            },
            {
                title: '模拟志愿填报工具',
                key: 'simulateNceeApply',
                link: isPhone() ? '/gaokao-score-m/my-volunteer' : '/gaokao-score/ceping/nceeApply/list',
                icon: 'simulateNceeApply.png',
                describe: '考生在正式高考报考前，可以基于高考成绩和自身偏好等因素，进行模拟高考志愿填报。',
            },
            {
                title: '高考报考职业测评',
                key: 'gaokaoCareer',
                link: '/gaokao-career',
                icon: 'gaokao.png',
                describe: '通过匹配测试者的兴趣、知识、能力、技能、认证与不同职业的要求，推荐将来可能合适的职业和相应的学习规划',
            },
            {
                title: '同分考生去向',
                key: 'sameScoreDir',
                link: isPhone() ? `/gaokao-score-m/more-institute?select=history_samescore` : '/gaokao-score/ceping/analysis/history_samescore',
                icon: 'sameScoreDir.png',
                describe: '往年相同分数考生被录取的大学和专业，可作为报考参考依据',
            },
            {
                title: '同位考生去向',
                key: 'samePositionDir',
                link: isPhone() ? `/gaokao-score-m/more-institute?select=history_samewei` : '/gaokao-score/ceping/analysis/history_samewei',
                icon: 'samePositionDir.png',
                describe: '往年相同位次考生被录取的大学和专业，可作为报考参考依据',
            },
        ],
    },
    {
        title: '个人信息',
        childer: [
            {
                title: '个人课程表',
                key: 'personalSchedule',
                link: '/personal-schedule/student',
                icon: 'courseArrangement.png',
                describe: '用于查看各学期的个人课程表',
            },
            {
                title: '学生课表',
                key: 'courseArrangement',
                link: '/course-arrangement/schedule/current/student',
                openWindow: true,
                icon: 'courseArrangement.png',
                describe: '用于查看各学期的个人课程表',
            },
            {
                title: '用户中心',
                key: 'entrance',
                link: '/usercenter',
                icon: 'entrance.png',
                describe: '管理个人资料和密码等个人信息',
            },
        ],
    },
];

function appCheck(key: string, site: string, tags: string[]) {
    const role = PermissionTags.GetRole(tags, site);
    if (role === Role.CustomAdmin) {
        return _.includes(tags, BuildFullKey(site, key));
    }
    return _.includes(KnownCustomKeysForRole()[role], key);
}

export const teacherNav: Nav[] = [
    {
        title: '成长报告与生涯规划管理',
        childer: [
            {
                title: '综合报告',
                key: 'summaryReport',
                link: '/',
                icon: 'summaryReport.png',
                describe: '从学生入校到毕业，学业成绩到课外发展，展示本院校综合学业发展状况',
                permissions(site, tags) {
                    return appCheck(this.key, site, tags);
                },
            },
            {
                title: '学生综合素质档案管理',
                key: 'stuQuality',
                link: '/stu-quality',
                icon: 'stuQuality.png',
                describe: '省教育厅要求的高中学生综合素质档案填写和历史存档',
            },
            {
                title: '学业测评管理',
                key: 'stuEvaluationMgmt',
                link: '/stuEvaluationMgmt',
                icon: 'stuEvaluation.png',
                describe: '管理发布学生测试，分析历次考试状态，解读学生自身特长特点，生成全面高中评测报告',
                permissions(site, tags) {
                    return appCheck(this.key, site, tags);
                },
            },
            {
                title: '学生档案管理',
                key: 'stuArchiveManagement',
                link: '/stuArchiveManagement',
                icon: 'majorPlanning.png',
                describe: '用于查看各类场景下学生的个人报告档案',
                permissions(site, tags) {
                    return appCheck(this.key, site, tags);
                },
            },
        ],
    },
    {
        title: '选课排课',
        childer: [
            {
                title: '学生选课管理',
                key: 'stuCourseSelMgmt',
                link: '/course-sel-mgmt',
                icon: 'courseSelectionSys.png',
                describe: '基于学生选课，结合学校实际情况，智能安排学校课程表',
                permissions(site, tags) {
                    return appCheck(this.key, site, tags);
                },
            },
            {
                title: '学校排课走班',
                key: 'schoolCurriculumArrangement',
                link: '/curriculum-arrangement',
                icon: 'courseSelectionSys.png',
                describe: '基于学生选课，结合学校实际情况，智能安排学校课程表',
                permissions(site, tags) {
                    return appCheck(this.key, site, tags);
                },
            },
            {
                title: '学校选课排课系统',
                key: 'courseArrangement',
                link: '/course-arrangement',
                icon: 'courseSelectionSys.png',
                describe: '基于学生选课，结合学校实际情况，智能安排学校课程表',
                permissions(site, tags) {
                    return appCheck(this.key, site, tags) && isAdmin(site, tags);
                },
            },
            {
                title: '学校选课排课系统',
                key: 'courseArrangementApply',
                link: '/course-arrangement-apply',
                icon: 'courseSelectionSys.png',
                describe: '基于学生选课，结合学校实际情况，智能安排学校课程表',
                permissions(site, tags) {
                    return appCheck(this.key, site, tags) && isAdmin(site, tags);
                },
            },
            // {
            //     title: '学校选课排课系统申请列表',
            //     key: 'courseArrangementApplyList',
            //     link: '/course-arrangement-apply-list',
            //     icon: 'courseSelectionSys.png',
            //     describe: '',
            //     permissions(site, tags) {
            //         return appCheck(this.key, site, tags) && isAdmin(site, tags);
            //     },
            // },
        ],
    },
    {
        title: '开放资源',
        childer: [
            {
                title: '院校数据库',
                key: 'instituteDB',
                link: 'https://www.applysquare.com/ranking-cn/?country=cn&china_degree=本科',
                openWindow: true,
                icon: 'instituteDB.png',
                describe: '拥有5000多所国内外院校信息，全面了解高校情况',
                permissions(site, tags) {
                    return appCheck(this.key, site, tags);
                },
            },
            {
                title: '专业数据库',
                key: 'majorDB',
                link: 'https://www.applysquare.com/fos-cn/',
                openWindow: true,
                icon: 'dataBase.png',
                describe: '90个大类专业数据和点评，深入浅出介绍各类专业',
                permissions(site, tags) {
                    return appCheck(this.key, site, tags);
                },
            },
            {
                title: '职业数据库',
                key: 'careerDB',
                link: 'https://www.applysquare.com/a2career-cn/home',
                openWindow: true,
                icon: 'dataBase.png',
                describe: '精解150种常见职业，全面知晓职业概况',
                permissions(site, tags) {
                    return appCheck(this.key, site, tags);
                },
            },
            {
                title: '课程数据库',
                key: 'courseDB',
                link: 'https://www.applysquare.com/course_core-cn/',
                openWindow: true,
                icon: 'courseDB.png',
                describe: '汇集1500多门高校开设课程，提前认知大学课程设置',
                permissions(site, tags) {
                    return appCheck(this.key, site, tags);
                },
            },
        ],
    },
    {
        title: '高考报考',
        childer: [
            {
                title: '高考模拟志愿填报系统',
                key: 'gaokaoManagement',
                link: '/gaokaoManagement',
                icon: 'simulateNceeApply.png',
                describe: '用于开启学生端的高考模块，展示模拟志愿填报分析报告和高考录取分析报告',
                permissions(site, tags) {
                    return appCheck(this.key, site, tags);
                },
            },
            {
                title: '学生高考统计分析报告',
                key: 'stuNceeScoreReport',
                link: '/stu-ncee-score-report',
                icon: 'gaokaoScore.png',
                describe: '根据学生高考成绩，统计分析学生的高考情况',
                permissions(site, tags) {
                    return appCheck(this.key, site, tags);
                },
            },
            {
                title: '学生高考专业选择报告',
                key: 'stuNceeMajorReport',
                link: '/',
                icon: 'major.png',
                describe: '根据高考专业测评的结果，结合学生的自主选择，生成学生专业选择分析报告',
                permissions(site, tags) {
                    return appCheck(this.key, site, tags);
                },
            },
            {
                title: '学生高考职业倾向分析报告',
                key: 'stuNceeCareerTendency',
                link: '/',
                icon: 'stuNceeCareerTendency.png',
                describe: '根据高考职业测评的结果，生成学生职业倾向分析报告',
                permissions(site, tags) {
                    return appCheck(this.key, site, tags);
                },
            },
        ],
    },
    {
        title: '调查系统',
        childer: [
            {
                title: '问卷中心',
                key: 'survey',
                link: '/survey/project',
                icon: 'survey.png',
                describe: '创建、编辑、发布问卷并查看调查结果',
            },
        ],
    },
    {
        title: '账户中心',
        childer: [
            {
                title: '教师个人课表',
                key: 'personalSchedule',
                link: '/personal-schedule/teacher',
                icon: 'courseArrangement.png',
                describe: '显示教师本学期的个人排课表',
                permissions: () => true,
            },
            {
                title: '教师课表',
                key: 'courseArrangement',
                link: '/course-arrangement/schedule/current/teacher',
                openWindow: true,
                icon: 'courseArrangement.png',
                describe: '显示教师本学期的个人排课表',
                permissions(site, tags) {
                    return appCheck(this.key, site, tags);
                },
            },
            {
                title: '用户中心',
                key: 'entrance',
                link: '/usercenter',
                icon: 'entrance.png',
                describe: '管理个人资料和密码等个人信息',
                permissions: () => true,
            },
            {
                title: '学校管理',
                key: 'userManagement',
                link: '/userManagement',
                icon: 'userManagement.png',
                describe: '用于管理学校账号和基本信息',
                permissions(site, tags) {
                    const role = PermissionTags.GetRole(tags, site);
                    return _.includes([Role.SuperAdmin, Role.Admin], role);
                },
            },
        ],
    },
];

export const fangfangNav: Nav[] = [
    {
        title: '在线调查系统',
        childer: [
            {
                title: '问卷中心',
                key: 'survey',
                link: '/survey/project',
                icon: 'survey.png',
                describe: '创建、编辑、发布问卷并查看调查结果',
            },
            {
                title: '试卷中心',
                key: 'survey',
                link: '/survey/paper',
                icon: 'survey.png',
                describe: '创建、编辑、发布试卷并查看调查结果',
            },
        ],
    },
    {
        title: '个人中心',
        childer: [
            {
                title: '个人中心',
                key: 'entrance',
                link: '/resetPassword',
                icon: 'userInfo.png',
                describe: '修改密码',
            },
        ],
    },
];
