declare let PRODUCTION: boolean;

let STATIC_ROOT;
if (PRODUCTION) {
	STATIC_ROOT = '//cdn.applysquare.net'
} else {
	STATIC_ROOT = '';
}
const STATIC_BASE_URL = STATIC_ROOT + '/static/img/'

export const staticBaseURL = (img: string) => {
	return STATIC_BASE_URL + img
}