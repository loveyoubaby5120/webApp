import * as _ from 'lodash';
import { Role } from './types';

const roleNames = {
    [Role.Student]: '学生',
    [Role.SuperAdmin]: '超级管理员',
    [Role.Admin]: '管理员',
    [Role.GradeAdmin]: '年级管理员',
    [Role.Teacher]: '老师',
    [Role.CustomAdmin]: '自定义',
};

function BuildGradesTag(site: string, grades: string[]) {
    if (!grades || grades.length === 0) {
        return null;
    }
    return site + ':saas:grades:' + grades.join(':');
}

function GetGradesFromTags(site: string, tags: string[]) {
    if (!site || !tags || tags.length === 0) {
        return null;
    }
    const gradesTag = tags.find(tag => tag && tag.indexOf(site + ':saas:grades:') > -1);
    if (!gradesTag) {
        return null;
    }
    return gradesTag.replace(site + ':saas:grades:', '').split(':');
}

function ReplaceGradesTag(site: string, tags: string[], newGrades: string[]) {
    if (!site || !tags || tags.length === 0) {
        return;
    }
    const idx = tags.findIndex(tag => tag && tag.indexOf(site + ':saas:grades:') > -1);
    if (idx === -1) {
        if (!newGrades || newGrades.length === 0) {
            return;
        }
        tags.push(BuildGradesTag(site, newGrades.slice()));
        return;
    }
    tags[idx] = BuildGradesTag(site, newGrades);
}

function GetAllPermissionTags(site: string, grades: string[]) {
    return {
        Student: [site + ':saas:student'],
        SuperAdmin: [site + ':saas:admin:superadmin', site + ':admin', site + ':saas:staff'],
        Admin: [site + ':saas:admin:admin', site + ':admin', site + ':saas:staff'],
        Teacher: [site + ':saas:teacher', site + ':saas:staff', BuildGradesTag(site, grades)].filter(t => !!t),
        CustomAdminRequired: [site + ':saas:staff', BuildGradesTag(site, grades)].filter(t => !!t),
        GradeAdmin: [site + ':saas:staff', site + ':saas:admin:gradeadmin', BuildGradesTag(site, grades)].filter(t => !!t),
    };
}

function GetRole(permissionTags: string[], site: string) {
    if (!permissionTags || permissionTags.length === 0) {
        throw new Error('permission tags should not be empty.');
    }
    if (_.includes(permissionTags, site + ':saas:admin:superadmin')) {
        return Role.SuperAdmin;
    }
    if (_.includes(permissionTags, site + ':saas:admin:admin')) {
        return Role.Admin;
    }
    if (_.includes(permissionTags, site + ':saas:admin:gradeadmin')) {
        return Role.GradeAdmin;
    }
    if (_.includes(permissionTags, site + ':saas:teacher')) {
        return Role.Teacher;
    }
    if (_.includes(permissionTags, site + ':saas:staff')) {
        return Role.CustomAdmin;
    }
    if (_.includes(permissionTags, site + ':saas:student')) {
        return Role.Student;
    }
    // maybe a fangfang account
}

function GetRoleName(role: string) {
    return roleNames[role] || '未知';
}

export default {
    GetAllPermissionTags,
    GetRole,
    GetRoleName,
    BuildGradesTag,
    GetGradesFromTags,
    ReplaceGradesTag,
};
