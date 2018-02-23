import * as React from 'react';
import { browserHistory, Router as RouterOrig, RouterProps } from 'react-router';
export { RouteComponentProps as WithRouter } from 'react-router';

function hashLinkScroll() {
    const { hash } = window.location;
    if (hash !== '') {
        // Push onto callback queue so it runs after the DOM is updated,
        // this is required when navigating from a different page so that
        // the element is rendered on the page before trying to getElementById.
        setTimeout(() => {
            const id = hash.replace('#', '');
            const elements = document.getElementsByName(id);
            let element = elements && elements[0];
            element = element || document.getElementById(id);
            if (element) {
                element.scrollIntoView();
            }
        }, 1000);
    }
}

export const Router = (props: RouterProps) => {
    // This is a workaround for react-router v3 hot-module-reload support.
    const key = process.env.NODE_ENV === 'production' ? 'router_key' : Math.random();
    return <RouterOrig key={key} history={browserHistory} onUpdate={hashLinkScroll} {...props} />;
};
