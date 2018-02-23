import { LanguageCode } from 'common/languageCode';

const en = {
    user_does_not_exist: 'User does not exist',
    user_does_not_exist_wrong_password: 'User does not exist or password incorrect',
    phone_exists: 'Phone already exists',
    phone_not_registered: 'Phone not registered',
    send_code_error: 'Failed to send verification code, please try again later',
};

const cn: typeof en = {
    user_does_not_exist: '用户不存在',
    user_does_not_exist_wrong_password: '密码错误',
    phone_exists: '用户已存在',
    phone_not_registered: '此账号未注册',
    send_code_error: '验证码发送失败，请稍后再试',
};

export const S: typeof en = (() => {
    console.log(LanguageCode);
    if (LanguageCode === 'en') {
        return en;
    }
    return cn;
})();

Object.defineProperty(exports, 'S', {
    get: () => {
        if (LanguageCode === 'en') {
            return en;
        }
        return cn;
    },
});
