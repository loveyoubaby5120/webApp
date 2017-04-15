export const siteConfig = {
  saas: {
    windowLocation: true,
    style: false,
    survey: {
      link: 'survey',
      answer: {
        styles: false,
        saveTitle: '问卷已经保存成功',
        send: '/',
      },
      project: {
        create: {
          is_owner: true,
        },
        indicators: false,
        edit: {
          score: false,
          report: false,
          fillNumber: false,
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
        styles: true,
        saveTitle: '问卷已经保存成功，可以在问卷中心继续填答此问卷',
        send: '/onlineSurvey/questionnaireClient',
      },
      project: {
        create: {
          is_owner: false,
        },
        indicators: true,
        edit: {
          score: true,
          report: true,
          fillNumber: true,
        },
      },
    },
  },
};
