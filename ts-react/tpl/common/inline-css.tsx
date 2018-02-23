// https://github.com/RickWong/react-inline-css
import * as React from 'react';

interface Props {
    stylesheet: string;
    namespace?: string;
}

const transformSheet = (stylesheet: string, namespace: string) => {
    return stylesheet.
        // Prettier output.
        replace(/}\s*/ig, '\n}\n').
        // Regular rules are namespaced.
        replace(
        /(^|}|;|,)\s*([&a-z0-9\-_\.:#\(\),>*\s]+)\s*(\{)/ig,
        (matched) => {
            return matched.replace(/&/g, '#' + namespace);
        },
    );
};

let refCounter = 0;
export class InlineCss extends React.Component<Props, {}> {
    namespace = this.props.namespace || 'InlineCss-' + refCounter++;
    transformedSheet = transformSheet(this.props.stylesheet, this.namespace);
    render() {
        return React.createElement(
            'div',
            { id: this.namespace },
            this.props.children,
            React.createElement('style', {
                scoped: true,
                dangerouslySetInnerHTML: { __html: this.transformedSheet },
            }),
        );
    }
}
