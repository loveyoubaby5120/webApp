import * as ReactGA from 'react-ga';

declare var PRODUCTION: boolean;
let GA_INITIALIZED = false;
let BAIDU_INITIALIZED = false;

declare global {
    interface Window { _hmt: any; }
}

export const sendLocationPageView = () => {
    sendPageView(window.location.href);
};

export const sendLocationPageViewWithSite = (site?: string) => {
    sendPageView(window.location.href, site);
};

export const sendPageView = (pageName: string, site?: string) => {
    let GA_ID = '';
    let BAIDU_ID = '';
    switch (site) {
        case 'ccss':
            BAIDU_ID = '40781ad2452ac0f22f4322eac555e1ae';
            GA_ID = 'UA-98388728-1';
            break;
        case 'tsinghua':
            BAIDU_ID = '206d31d168e4e6e8e46fd91a094958f1';
            GA_ID = 'UA-41044126-1';
            break;
        default:
            BAIDU_ID = '50058a93dcd49a44afcea1dccb89a8e1';
            GA_ID = 'UA-41044126-1';
    }

    if (GA_INITIALIZED !== true) {
        const options = Object.assign(
            {
                debug: PRODUCTION,
            },
            {
                gaOptions: {
                    cookieDomain: 'www.applysquare.com',
                },
            }) as ReactGA.InitializeOptions;
        ReactGA.initialize(GA_ID, options);
        GA_INITIALIZED = true;
    }
    ReactGA.set({ page: pageName });
    ReactGA.pageview(pageName);

    if (BAIDU_INITIALIZED !== true) {
        window['_hmt'] = window['_hmt'] || [];
        let hm = document.createElement('script');
        hm.src = 'https://hm.baidu.com/hm.js?' + BAIDU_ID;
        let s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(hm, s);
    }

    if (window['_hmt']) {
        window['_hmt'].push(['_trackPageview', location.pathname + location.search]);
    }
};
