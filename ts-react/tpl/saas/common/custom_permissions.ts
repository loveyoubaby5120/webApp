import * as _ from 'lodash';
import { Role } from './types';

const AllKnownKeys = {
    // 综合报告
    SummaryReport: 'summaryReport',
    // 学生综合素质档案管理
    StuQualityMgmt: 'stuQualityMgmt',
    // 学业测评管理
    StuEvaluationMgmt: 'stuEvaluationMgmt',
    // 学生档案管理
    StuArchiveManagement: 'stuArchiveManagement',
    // 问卷中心
    Survey: 'survey',
    // 课堂成绩报告档案
    ClassScoreReportArchive: 'classScoreReportArchive',
    // 学生成长报告档案
    StuGrowReportArchive: 'stuGrowReportArchive',
    // 综合素质档案
    StuQualityArchive: 'stuQualityArchive',
    // 德育处
    StuQualityDeyuchu: 'stuQualityDeyuchu',
    // 高考报考档案
    GaokaoBaokaoArchive: 'gaokaoBaokaoArchive',
    // 学生测评报告档案
    StuCepingReportArchive: 'stuCepingReportArchive',
    // 学生选课管理
    StuCourseSelMgmt: 'stuCourseSelMgmt',
    // 学校排课走班
    SchoolCurriculumArrangement: 'schoolCurriculumArrangement',
    // 学校排课走班
    courseArrangement: 'courseArrangement',
    // 学校排课走班
    courseArrangementApply: 'courseArrangementApply',
    // 学校排课走班列表
    courseArrangementApplyList: 'courseArrangementApplyList',
    // 排课管理权限
    CurriculumMgmt: 'curriculumMgmt',
    // 查看课表权限
    ViewClassSchedule: 'viewClassSchedule',
    // 院校数据库
    InstituteDB: 'instituteDB',
    // 专业数据库
    MajorDB: 'majorDB',
    // 职业数据库
    CareerDB: 'careerDB',
    // 课程数据库
    CourseDB: 'courseDB',
    // 学生高考专业选择分析报告
    StuNceeMajorReport: 'stuNceeMajorReport',
    // 学生高考成绩分析报告
    StuNceeScoreReport: 'stuNceeScoreReport',
    // 高考模拟志愿填报系统
    GaokaoManagement: 'gaokaoManagement',
    // 学生高考职业倾向分析报告
    StuNceeCareerTendency: 'stuNceeCareerTendency',
};

function MustRequireGradeCustomTags() {
    return [
        AllKnownKeys.SummaryReport, AllKnownKeys.StuArchiveManagement, AllKnownKeys.ClassScoreReportArchive,
        AllKnownKeys.StuGrowReportArchive, AllKnownKeys.StuQualityArchive, AllKnownKeys.GaokaoBaokaoArchive,
        AllKnownKeys.StuCepingReportArchive,
    ];
}

function BuildFullKey(site: string, key: string) {
    if (!site || !key) {
        return null;
    }
    return site + ':saas:' + key;
}

function BuilderForSite(site: string) {
    return function (...keys: string[]) {
        return keys.map(k => BuildFullKey(site, k));
    };
}

function KnownCustomKeysForRole() {
    return {
        [Role.SuperAdmin]: _.values(AllKnownKeys),
        [Role.Admin]: _.values(AllKnownKeys),
        [Role.GradeAdmin]: [
            AllKnownKeys.SummaryReport,

            AllKnownKeys.StuQualityMgmt,
            AllKnownKeys.courseArrangement,
            AllKnownKeys.courseArrangementApply,

            AllKnownKeys.StuArchiveManagement,
            AllKnownKeys.ClassScoreReportArchive,
            AllKnownKeys.StuGrowReportArchive,
            AllKnownKeys.StuCepingReportArchive,

            AllKnownKeys.InstituteDB,
            AllKnownKeys.MajorDB,
            AllKnownKeys.CareerDB,
            AllKnownKeys.CourseDB,
        ],
        [Role.Teacher]: [

            AllKnownKeys.StuQualityMgmt,
            AllKnownKeys.courseArrangement,
            AllKnownKeys.courseArrangementApply,

            AllKnownKeys.InstituteDB,
            AllKnownKeys.MajorDB,
            AllKnownKeys.CareerDB,
            AllKnownKeys.CourseDB,
        ],
    };
}

export {
    AllKnownKeys,
    BuildFullKey,
    BuilderForSite,
    KnownCustomKeysForRole,
    MustRequireGradeCustomTags,
};
