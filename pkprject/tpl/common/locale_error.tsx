const en = {
  'user_does_not_exist': 'User does not exist',
  'user_does_not_exist_wrong_password': 'User does not exist or password incorrect',
};

const cn: typeof en = {
  'user_does_not_exist': '用户不存在',
  'user_does_not_exist_wrong_password': '密码错误',
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


