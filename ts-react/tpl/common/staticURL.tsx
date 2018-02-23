declare let PRODUCTION: boolean;

let STATIC_ROOT;
if (PRODUCTION) {
  STATIC_ROOT = '//cdn.applysquare.net';
} else {
  STATIC_ROOT = '';
}
const STATIC_BASE_URL = STATIC_ROOT + '/static/img/';

export const staticBaseURL = (img: string) => {
  return STATIC_BASE_URL + img;
};

export const storageBaseURL = (img: string) => {
  return '//cdn.applysquare.net/storage/' + img;
};

export const avatarURL = (avatarKey: string) => {
  if (!avatarKey) {
    return staticBaseURL(`a2/avatar/avatar-128x128.png`);
  }
  return storageBaseURL(`${avatarKey}-128x128.png`);
};

export const cdnBaseURL = (img: string) => {
  return '//cdn.applysquare.net' + img;
};

export const companyLogoURL = (logoURL: string) => {
  if (logoURL) {
    return cdnBaseURL(`/a2/company/logo/${logoURL}`);
  }
  return staticBaseURL('a2/company/default_logo.png');
};
