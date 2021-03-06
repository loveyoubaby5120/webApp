const en = {
    'Glance': 'Glance',
    'Dig-Up': 'Dig-Up',
    'Brief Introduction': 'Brief Introduction',
    'Requirements': 'Requirements',
    'Degree Distribution': 'Degree Distribution',
    'High-School': 'High-School',
    'Junior-College': 'Junior-College',
    'Bachelor':'Bachelor',
    'Master': 'Master',
    'Doctorate': 'Doctorate',
    'Relevant Majors': 'Relevant Majors',
    'Position Examples': 'Position Examples',
    'Entry-Level': 'Entry-Level',
    'Mid-Level': 'Mid-Level',
    'Senior': 'Senior',
    'Salary': 'Salary',
    'Salary after Bachelor': 'Salary after Bachelor',
    'Recent-5-year Average Salary': 'Recent-5-year Average Salary',
    'Relevant Careers': 'Relevant Careers',
    'Company Examples': 'Company Examples',
    'Career Interpretation': 'Career Interpretation',
    'Career Cycle': 'Career Cycle',
    'Tasks': 'Tasks',
    'Abilities': 'Abilities',
    'Certifications': 'Certifications',
    'Courses': 'Courses',
    'Books': 'Books',
    'Equipments': 'Equipments',
    'Paragons': 'Paragons',
    'Expand': 'Expand',
    'Collapse': 'Collapse',
    'Added': 'Added',
    company_info: 'Company Info',
    company_full_name: 'Full Name',
    company_website: 'Website',
    company_headquarters: 'Headquarters',
    company_size: 'Size',
    company_industry: 'Industry',
    company_address: 'Address',
    company_tel: 'Tel No.',
    company_email: 'Email',
    company_introduction: 'Introduction',
    company_culture: 'Culture',
    company_opening: 'Openings',
    check_for_outdated: 'Check for Outdated',
    previous_page: 'Previous Page',
    next_page: 'Next Page',
    internship: 'Internship',
    full_time_job: 'Full-time Job',
    conference: '',
};

const cn: typeof en = {
    'Glance': '初识 ',
    'Dig-Up': '深究',
    'Brief Introduction': '职业简介',
    'Requirements': '职业需求',
    'Degree Distribution': '学历分布',
    'High-School': '高中',
    'Junior-College': '专科',
    'Bachelor': '本科',
    'Master': '硕士',
    'Doctorate': '博士',
    'Relevant Majors': '相关专业',
    'Position Examples': '典型职位',
    'Entry-Level': '初级',
    'Mid-Level': '中级',
    'Senior': '高级',
    'Salary': '薪资状况',
    'Salary after Bachelor': '资历与年薪',
    'Recent-5-year Average Salary': '近五年平均年薪',
    'Relevant Careers': '相近职业',
    'Company Examples': '对口公司',
    'Career Interpretation': '职业解读',
    'Career Cycle': '职业周期',
    'Tasks': '职业内容',
    'Abilities': '职业能力',
    'Certifications': '职业证书',
    'Courses': '相关课程',
    'Books': '相关书籍',
    'Equipments': '职业工具',
    'Paragons': '职业达人',
    'Expand': '查看全部',
    'Collapse': '收起',
    'Added': '已添加',
    company_info: '公司信息',
    company_full_name: '全称',
    company_website: '网址',
    company_headquarters: '总部',
    company_size: '规模',
    company_industry: '类型',
    company_address: '地址',
    company_tel: '电话',
    company_email: '邮箱',
    company_introduction: '企业介绍',
    company_culture: '企业文化',
    company_opening: '在招职位',
    check_for_outdated: '显示过期',
    previous_page: '上一页',
    next_page: '下一页',
    internship: '实习机会',
    full_time_job: '全职工作',
    conference: '讲座论坛',
};

export const LanguageCode = (() => {
    const v = document.documentElement.lang;
    if (v === 'en-us' || v === 'en') {
        return 'en';
    }
    return 'cn';
})();

export const S: typeof en = (() => {
    if (LanguageCode === 'en') {
        return en;
    }
    return cn;
})();


